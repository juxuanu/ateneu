import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { log } from "../../../utils/log.ts";
import * as schema from "./schema.ts";

export const host = process.env.STAGE === "pro" ? "db" : "127.0.0.1";
export const user = "ateneu";
export const password = "ateneu";
export const port = 5432;
export const database = "ateneu";

const buildDbFullPath = () =>
  log(`${user}:${password}@${host}:${port}`, "DB FULL PATH");

const queryClient = postgres(`postgres://${buildDbFullPath()}`);
export const db = drizzle(queryClient, {
  schema,
  logger: process.env.STAGE !== "pro",
});

export const migrationClient = postgres(`postgres://${buildDbFullPath()}`, {
  max: 1,
});
