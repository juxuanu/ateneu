import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
  boolean,
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// Users
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    publicName: text("public_mame").notNull(),
    imageUrl: text("image_url"),
  },
  (users) => ({ emailIndex: uniqueIndex("email_idx").on(users.email) }),
);
export const insertUserSchema = createInsertSchema(users);
export type InsertUser = z.infer<typeof insertUserSchema>;
export const selectUserSchema = createSelectSchema(users);
export type SelectUser = z.infer<typeof selectUserSchema>;

// Posts
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  creationTimestampUnixMs: timestamp("creation_ts_unix_ms", { mode: "date" })
    .notNull()
    .defaultNow(),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  threadId: integer("thread_id").notNull(),
});
export const insertPostSchema = createInsertSchema(posts);
export type InsertPost = z.infer<typeof insertPostSchema>;
export const selectPostSchema = createSelectSchema(posts);
export type SelectPost = z.infer<typeof selectPostSchema>;

export const postsRelations = relations(posts, ({ one }) => ({
  parentThread: one(threads, {
    fields: [posts.threadId],
    references: [threads.id],
  }),
}));

// Threads
export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  creationTimestampUnixMs: timestamp("creation_ts_unix_ms", { mode: "date" })
    .notNull()
    .defaultNow(),
  resolved: boolean("resolved").notNull().default(false),
  readOnly: boolean("read_only").notNull().default(false),
});
export const insertThreadSchema = createInsertSchema(threads);
export type InsertThread = z.infer<typeof insertThreadSchema>;
export const selectThreadSchema = createSelectSchema(threads);
export type SelectThread = z.infer<typeof selectThreadSchema>;

export const threadsRelations = relations(threads, ({ many }) => ({
  threadPosts: many(posts),
  tags: many(tags),
}));

// Tags
export const tags = pgTable("tags", {
  name: text("name").primaryKey(),
});
export const insertTagSchema = createInsertSchema(tags);
export type InsertTag = z.infer<typeof insertTagSchema>;
export const selectTagSchema = createSelectSchema(tags);
export type SelectTag = z.infer<typeof selectTagSchema>;

export const tagsRelations = relations(tags, ({ many }) => ({
  threadsTagged: many(threads),
}));

// Many-to-many relations
export const threadsToTags = pgTable(
  "threads_to_tags",
  {
    threadId: integer("thread_id")
      .notNull()
      .references(() => threads.id),
    tagName: text("tag_name")
      .notNull()
      .references(() => tags.name),
  },
  (table) => ({ pk: primaryKey({ columns: [table.threadId, table.tagName] }) }),
);
export const threadsToTagsRelations = relations(threadsToTags, ({ one }) => ({
  thread: one(threads, {
    fields: [threadsToTags.threadId],
    references: [threads.id],
  }),
  tags: one(tags, {
    fields: [threadsToTags.tagName],
    references: [tags.name],
  }),
}));
