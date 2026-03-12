import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
import path from "path";
import os from "os";
import fs from "fs";

// Create a persistent directory for the database
const defaultDbDir = path.join(os.homedir(), ".electrobun-react-tailwind-vite");
const defaultDbPath = path.join(defaultDbDir, "sqlite.db");

// Use SQLITE_DB_PATH from env if provided, otherwise use the default
const dbPath = process.env.SQLITE_DB_PATH || defaultDbPath;
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });

export * from "./schema";
