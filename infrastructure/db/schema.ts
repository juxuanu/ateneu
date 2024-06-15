import { relations, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import {
  boolean,
  integer,
  pgTable,
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
  creationTimestampUnixMs: timestamp("creation_ts_unix_ms")
    .notNull()
    .default(sql`now()`),
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
export const postsRelations = relations(posts, ({ one }) => ({
  threadContent: one(threads, {
    fields: [posts.threadId],
    references: [threads.id],
    relationName: "thread_content",
  }),
}));

// Threads
export const threads = pgTable("threads", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  creationTimestampUnixMs: timestamp("creation_ts_unix_ms")
    .notNull()
    .default(sql`now()`),
  resolved: boolean("resolved").notNull().default(false),
  readOnly: boolean("read_only").notNull().default(false),
});
export const insertThreadSchema = createInsertSchema(threads);
export type InsertThread = z.infer<typeof insertThreadSchema>;
export const selectThreadSchema = createSelectSchema(threads);
export type SelectThread = z.infer<typeof insertPostSchema>;
export const threadsRelations = relations(threads, ({ many }) => ({
  threadContent: many(posts, { relationName: "thread_content" }),
}));
