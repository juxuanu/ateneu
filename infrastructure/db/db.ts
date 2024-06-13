import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

export const dbPath = "./infrastructure/db/db.sqlite";
const sqlite = new Database(dbPath);
export const db = drizzle(sqlite, { schema });
