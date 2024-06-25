import { db } from "../infrastructure/db/db.ts";
import {
  type SelectPost,
  type SelectThread,
  threads,
} from "../infrastructure/db/schema.ts";

export const threadPage = {
  getThreadById: async (threadId: number): Promise<SelectThread | undefined> =>
    db.query.threads.findFirst({
      where: (threads, { eq }) => eq(threads.id, threadId),
    }),
  getPostsByThreadId: async (threadId: number): Promise<SelectPost[]> =>
    db.query.posts.findMany({
      where: (posts, { eq }) => eq(posts.threadId, threadId),
    }),
};
