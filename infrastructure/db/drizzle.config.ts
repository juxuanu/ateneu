import { defineConfig } from "drizzle-kit";
import { dbPath } from "./db.ts";

export default defineConfig({
  dialect: "sqlite",
  schema: "./infrastructure/db/schema.ts",
  out: "./infrastructure/db/drizzle",
  dbCredentials: {
    url: dbPath,
  },
});
