CREATE TABLE "server_member" (
	"id" text PRIMARY KEY NOT NULL,
	"serverId" text NOT NULL,
	"userId" text NOT NULL,
	"role" varchar(50) NOT NULL,
	"joinedAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "server_member" ADD CONSTRAINT "server_member_serverId_server_id_fk" FOREIGN KEY ("serverId") REFERENCES "public"."server"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "server_member" ADD CONSTRAINT "server_member_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "password";