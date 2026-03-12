import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const counters = sqliteTable("counters", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull().unique(),
	value: integer("value").notNull().default(0),
});

export type Counter = typeof counters.$inferSelect;
export type NewCounter = typeof counters.$inferInsert;
