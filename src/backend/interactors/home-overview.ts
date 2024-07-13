import { db } from "../infrastructure/db/db.ts";
import { type SelectThread, threads } from "../infrastructure/db/schema.ts";
import { desc } from "drizzle-orm";
import type { Thread } from "../domain.ts";
import { Threads } from "../infrastructure/marshalling.ts";

export const homeOverview = {
  getThreadsWithLatestPosts: async (): Promise<Thread[]> => {
    const dbItems: SelectThread[] = await db
      .select()
      .from(threads)
      .orderBy(desc(threads.creationTimestampUnixMs))
      .limit(10);

    return dbItems.map(Threads.unmarshal);
  },
};
