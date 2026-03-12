// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import { eq } from "drizzle-orm";
import { counters } from "../db/schema";
import * as schema from "../db/schema";

describe("Counter DB Interactions", () => {
	let sqlite: Database;
	let db: ReturnType<typeof drizzle<typeof schema>>;

	beforeEach(() => {
		sqlite = new Database(":memory:");
		db = drizzle(sqlite, { schema });
		// Run initial migration/table creation manually for in-memory
		sqlite.run(`
      CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        value INTEGER NOT NULL DEFAULT 0
      )
    `);
	});

	afterEach(() => {
		sqlite.close();
	});

	function getCounter(name: string) {
		const result = db
			.select()
			.from(counters)
			.where(eq(counters.name, name))
			.get();
		return result;
	}

	it("should initialize a counter if it doesn't exist", async () => {
		const name = "main-counter";
		let counter = getCounter(name);
		expect(counter).toBeUndefined();

		await db.insert(counters).values({ name, value: 0 }).onConflictDoNothing();

		counter = getCounter(name);
		expect(counter).toBeDefined();
		expect(counter?.value).toBe(0);
	});

	it("should increment the counter", async () => {
		const name = "main-counter";
		await db.insert(counters).values({ name, value: 5 });

		const counter = getCounter(name);
		if (!counter) throw new Error("Counter not found");

		await db
			.update(counters)
			.set({ value: counter.value + 1 })
			.where(eq(counters.name, name));

		const updated = getCounter(name);
		expect(updated?.value).toBe(6);
	});

	it("should reset the counter", async () => {
		const name = "main-counter";
		await db.insert(counters).values({ name, value: 10 });

		await db.update(counters).set({ value: 0 }).where(eq(counters.name, name));

		const reset = getCounter(name);
		expect(reset?.value).toBe(0);
	});
});
