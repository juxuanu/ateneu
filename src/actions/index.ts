import { defineAction } from "astro:actions";
import { z } from "zod";
import { db } from "../../infrastructure/db/db.ts";

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
