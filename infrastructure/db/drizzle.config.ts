import { defineConfig } from "drizzle-kit";
import { password, port, host, user, database } from "./db.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./infrastructure/db/schema.ts",
  out: "./infrastructure/db/drizzle",
  dbCredentials: {
    user,
    password,
    host,
    port,
    database,
  },
});
