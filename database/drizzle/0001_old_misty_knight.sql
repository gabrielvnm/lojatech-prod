ALTER TABLE `produtos` RENAME COLUMN "nome" TO "name";--> statement-breakpoint
ALTER TABLE `produtos` RENAME COLUMN "preco" TO "price";--> statement-breakpoint
ALTER TABLE `produtos` ADD `desc` text NOT NULL;