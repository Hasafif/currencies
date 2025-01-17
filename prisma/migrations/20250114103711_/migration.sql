-- AlterTable
ALTER TABLE `price` ADD COLUMN `max_purchase_price` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `max_sale_price` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `min_purchase_price` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `min_sale_price` DOUBLE NULL DEFAULT 0;
