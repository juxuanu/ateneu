import {
  threads,
  type SelectThread,
  type SelectUser,
  type SelectTag,
} from "./schema.ts";
import type { Tag, Thread, User } from "../../domain.ts";
import { DateTime } from "luxon";
import { db } from "./db.ts";
import { desc } from "drizzle-orm";

export const unmarshallUser = (dbItem: SelectUser): User => ({
  email: dbItem.email,
  imageUrl: dbItem.imageUrl ?? undefined,
  publicName: dbItem.publicName,
});

export const unmarshallThread = (dbItem: SelectThread): Thread => ({
  readOnly: dbItem.readOnly,
  title: dbItem.title,
  resolved: dbItem.resolved,
  creation: DateTime.fromJSDate(dbItem.creationTimestamp),
});

export const unmarshallTag = (dbItem: SelectTag): Tag => ({
  name: dbItem.name,
  description: dbItem.description ?? "",
});
