CREATE TABLE IF NOT EXISTS "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"creation_ts_unix_ms" timestamp DEFAULT now() NOT NULL,
	"content" text NOT NULL,
	"author_id" integer NOT NULL,
	"thread_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "threads" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"creation_ts_unix_ms" timestamp DEFAULT now() NOT NULL,
	"resolved" boolean DEFAULT false NOT NULL,
	"read_only" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"public_mame" text NOT NULL,
	"image_url" text,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "email_idx" ON "users" ("email");