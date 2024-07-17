import { db } from "../infrastructure/db/db.ts";
import type { Tag } from "../domain.ts";
import { unmarshallTag } from "../infrastructure/db/marshalling.ts";

export const homeOverview = {
  getAllTags: async (): Promise<Tag[]> => {
    const tags = await db.query.tags.findMany();

    return tags.map(unmarshallTag);
  },
};
