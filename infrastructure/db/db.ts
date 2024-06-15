import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

export const dbUrl = process.env.POSTGRE_URL;
export const dbPort = process.env.POSTGRE_PORT;
export const dbPassword = process.env.POSTGRE_PASSWORD;
export const dbUser = process.env.POSTGRE_USER;

if (!dbUser) {
  throw new Error("Missing DB user (POSTGRE_USER)");
}
if (!dbPassword) {
  throw new Error("Missing DB password (POSTGRE_PASSWORD)");
}
if (!dbUrl) {
  throw new Error("Missing DB URL (POSTGRE_URL)");
}
if (!dbPort) {
  console.warn("Missing DB port (POSTGRE_PORT)");
}

export const dbFullPath = `${dbUser}:${dbPassword}@${dbUrl}:${dbPort}`;

const queryClient = postgres(`postgres://${dbFullPath}`);
export const db = drizzle(queryClient);

export const migrationClient = postgres(`postgres://${dbFullPath}`, { max: 1 });
