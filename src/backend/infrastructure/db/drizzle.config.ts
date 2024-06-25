import { defineConfig } from "drizzle-kit";
import { database, host, password, port, user } from "./db.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/backend/infrastructure/db/schema.ts",
  out: "./src/backend/infrastructure/db/drizzle",
  dbCredentials: {
    user,
    password,
    host,
    port,
    database,
  },
});
