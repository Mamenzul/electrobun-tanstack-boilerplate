import { BrowserWindow, Updater, BrowserView } from "electrobun/bun";
import { db, counters } from "../db";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { eq } from "drizzle-orm";
import type { MyRPCSchema } from "../shared/rpc";
import path from "path";

const DEV_SERVER_PORT = 5173;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

// Initialize database and run migrations
async function initDB() {
	console.log("Initializing database...");
	try {
		// Use absolute path relative to current file to find the migrations
		// drizzle is copied to bun/drizzle in electrobun.config.ts
		const migrationsFolder = path.join(import.meta.dirname, "drizzle");
		console.log(`Looking for migrations in: ${migrationsFolder}`);
		migrate(db, { migrationsFolder });

		// Seed initial counter if it doesn't exist
		await db
			.insert(counters)
			.values({ name: "main", value: 0 })
			.onConflictDoNothing();

		console.log("Database initialized and migrated.");
	} catch (error) {
		console.error("Failed to initialize database:", error);
	}
}

// Check if Vite dev server is running for HMR
async function getMainViewUrl(): Promise<string> {
	const channel = await Updater.localInfo.channel();
	if (channel === "dev") {
		try {
			await fetch(DEV_SERVER_URL, { method: "HEAD" });
			console.log(`HMR enabled: Using Vite dev server at ${DEV_SERVER_URL}`);
			return DEV_SERVER_URL;
		} catch {
			console.log(
				"Vite dev server not running. Run 'bun run dev:hmr' for HMR support.",
			);
		}
	}
	return "views://mainview/index.html";
}

// Initialize DB before starting the app
await initDB();

// Define RPC handlers
const rpc = BrowserView.defineRPC<MyRPCSchema>({
	handlers: {
		requests: {
			getCounter: () => {
				const result = db
					.select()
					.from(counters)
					.where(eq(counters.name, "main"))
					.get();
				return result?.value ?? 0;
			},
			incrementCounter: async () => {
				const current = db
					.select()
					.from(counters)
					.where(eq(counters.name, "main"))
					.get();
				const newValue = (current?.value ?? 0) + 1;

				await db
					.update(counters)
					.set({ value: newValue })
					.where(eq(counters.name, "main"));

				return newValue;
			},
			resetCounter: async () => {
				await db
					.update(counters)
					.set({ value: 0 })
					.where(eq(counters.name, "main"));
				return 0;
			},
		},
	},
});

// Create the main application window
const url = await getMainViewUrl();

new BrowserWindow({
	title: "React + Tailwind + Vite",
	url,
	frame: {
		width: 900,
		height: 700,
		x: 200,
		y: 200,
	},
	rpc,
});

console.log("React Tailwind Vite app started with Drizzle SQLite!");
