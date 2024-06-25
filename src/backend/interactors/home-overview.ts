import { db } from "../infrastructure/db/db.ts";
import { type SelectThread, threads } from "../infrastructure/db/schema.ts";
import { desc } from "drizzle-orm";

export const homeOverview = {
  getThreadsWithLatestPosts: async (): Promise<SelectThread[]> =>
    db
      .select()
      .from(threads)
      .orderBy(desc(threads.creationTimestampUnixMs))
      .limit(10),
};
