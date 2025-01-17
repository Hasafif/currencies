/*
  Warnings:

  - You are about to drop the column `Address` on the `store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `currency` ADD COLUMN `date` DATETIME(3) NULL,
    ADD COLUMN `store_name` VARCHAR(50) NULL;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `Address`,
    ADD COLUMN `address` VARCHAR(50) NULL;
