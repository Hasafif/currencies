/*
  Warnings:

  - You are about to drop the column `price` on the `currency` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `currency` DROP COLUMN `price`,
    ADD COLUMN `purchase_price` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `sale_price` DOUBLE NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `price` DROP COLUMN `price`,
    ADD COLUMN `purchase_price` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `sale_price` DOUBLE NOT NULL DEFAULT 0;
