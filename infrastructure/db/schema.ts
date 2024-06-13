import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

// Users
export const users = sqliteTable(
  "users",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
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
export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  creationTimestampUnixMs: integer("creation_ts_unix_ms", {
    mode: "timestamp_ms",
  })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
  content: text("content").notNull(),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  threadId: integer("thread_id").notNull(),
});
export const insertPostSchema = createInsertSchema(posts);
export type InsertPost = z.infer<typeof insertPostSchema>;
export const selectPostSchema = createSelectSchema(posts);
export type SelectPost = z.infer<typeof insertPostSchema>;

// Threads
export const threads = sqliteTable("threads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  closed: integer("closed", { mode: "boolean" }).notNull().default(false),
});
export const insertThreadSchema = createInsertSchema(threads);
export type InsertThread = z.infer<typeof insertThreadSchema>;
export const selectThreadSchema = createSelectSchema(threads);
export type SelectThread = z.infer<typeof insertPostSchema>;

// Relations
export const threadsRelations = relations(threads, ({ many }) => ({
  threadContent: many(posts, { relationName: "thread_content" }),
}));
export const postsRelations = relations(posts, ({ one }) => ({
  threadContent: one(threads, {
    fields: [posts.threadId],
    references: [threads.id],
    relationName: "thread_content",
  }),
}));
