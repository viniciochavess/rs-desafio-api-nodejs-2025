CREATE TABLE `courses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`description` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `courses_title_unique` ON `courses` (`title`);