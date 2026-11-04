CREATE TABLE `peak_predictions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`match_id` text NOT NULL,
	`payload` text NOT NULL,
	`submitted_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `peak_sessions` (
	`match_id` text PRIMARY KEY NOT NULL,
	`opened_at` text NOT NULL,
	`closes_at` text NOT NULL,
	`closed_at` text
);
