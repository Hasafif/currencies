/*
  Warnings:

  - You are about to drop the column `percentageChange` on the `price` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `price` DROP COLUMN `percentageChange`,
    ADD COLUMN `purchase_percentageChange` DOUBLE NULL DEFAULT 0,
    ADD COLUMN `sale_percentageChange` DOUBLE NULL DEFAULT 0;
