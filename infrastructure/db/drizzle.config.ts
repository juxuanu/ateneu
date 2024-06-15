import { defineConfig } from "drizzle-kit";
import { dbFullPath } from "./db.ts";

export default defineConfig({
  dialect: "postgresql",
  schema: "./infrastructure/db/schema.ts",
  out: "./infrastructure/db/drizzle",
  dbCredentials: { url: dbFullPath },
});
