CREATE TABLE `login_devices` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`device_id` text NOT NULL,
	`label` text NOT NULL,
	`created_at` text NOT NULL,
	`last_seen_at` text NOT NULL
);
