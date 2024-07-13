import type { SelectThread, SelectUser } from "./db/schema.ts";
import type { Thread, User } from "../domain.ts";
import { DateTime } from "luxon";

export const Users = {
  unmarshal: (dbItem: SelectUser): User => ({
    email: dbItem.email,
    imageUrl: dbItem.imageUrl ?? undefined,
    publicName: dbItem.publicName,
  }),
} as const;

export const Threads = {
  unmarshal: (dbItem: SelectThread): Thread => ({
    readOnly: dbItem.readOnly,
    title: dbItem.title,
    resolved: dbItem.resolved,
    creation: DateTime.fromMillis(dbItem.creationTimestampUnixMs),
  }),
} as const;
