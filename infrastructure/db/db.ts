import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as process from "node:process";

export const host = process.env.STAGE === "pro" ? "db" : "127.0.0.1";
export const user = "ateneu";
export const password = "ateneu";
export const port = 5432;
export const database = "postgres";

const buildDbFullPath = () => {
  const fullUrl = `${user}:${password}@${host}:${port}`;
  console.info("DB PATH", fullUrl);
  return fullUrl;
};

const queryClient = postgres(`postgres://${buildDbFullPath()}`);
export const db = drizzle(queryClient);

export const migrationClient = postgres(`postgres://${buildDbFullPath()}`, {
  max: 1,
});
