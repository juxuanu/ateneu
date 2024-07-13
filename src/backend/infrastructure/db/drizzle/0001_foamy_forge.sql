CREATE TABLE IF NOT EXISTS "tags" (
	"name" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "threads_to_tags" (
	"thread_id" integer NOT NULL,
	"tag_name" text NOT NULL,
	CONSTRAINT "threads_to_tags_thread_id_tag_name_pk" PRIMARY KEY("thread_id","tag_name")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "threads_to_tags" ADD CONSTRAINT "threads_to_tags_thread_id_threads_id_fk" FOREIGN KEY ("thread_id") REFERENCES "public"."threads"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "threads_to_tags" ADD CONSTRAINT "threads_to_tags_tag_name_tags_name_fk" FOREIGN KEY ("tag_name") REFERENCES "public"."tags"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
