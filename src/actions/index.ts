import { defineAction } from "astro:actions";
import { z } from "zod";
import { db } from "../../infrastructure/db/db.ts";
import { threads } from "../../infrastructure/db/schema.ts";

export const server = {
  getPostsByThread: defineAction({
    input: z.number(),
    handler: async (threadId) => {
      return db.query.posts.findMany({
        where: (posts, { eq }) => eq(posts.threadId, threadId),
      });
    },
  }),
};

db.select().from(threads).limit(10).orderBy();
