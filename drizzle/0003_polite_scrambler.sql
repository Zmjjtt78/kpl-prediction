CREATE TABLE `micro_predictions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`match_id` text NOT NULL,
	`seq` text NOT NULL,
	`payload` text NOT NULL,
	`submitted_at` text NOT NULL
);
