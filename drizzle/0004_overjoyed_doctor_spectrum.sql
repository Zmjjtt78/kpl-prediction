CREATE TABLE `battle_cache` (
	`id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`fetched_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `micro_windows` (
	`id` text PRIMARY KEY NOT NULL,
	`started_at` text NOT NULL,
	`evidence` text NOT NULL
);
