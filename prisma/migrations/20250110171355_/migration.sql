/*
  Warnings:

  - You are about to drop the column `menuid` on the `offer` table. All the data in the column will be lost.
  - You are about to drop the `menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `menu` DROP FOREIGN KEY `menu_storeid_fkey`;

-- DropForeignKey
ALTER TABLE `offer` DROP FOREIGN KEY `offer_menuid_fkey`;

-- DropIndex
DROP INDEX `offer_menuid_fkey` ON `offer`;

-- AlterTable
ALTER TABLE `offer` DROP COLUMN `menuid`;

-- DropTable
DROP TABLE `menu`;

-- CreateTable
CREATE TABLE `currency` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NULL,
    `price` DOUBLE NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bulletin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeid` INTEGER NULL,
    `date` DATETIME(3) NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_bulletinTocurrency` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_bulletinTocurrency_AB_unique`(`A`, `B`),
    INDEX `_bulletinTocurrency_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bulletin` ADD CONSTRAINT `bulletin_storeid_fkey` FOREIGN KEY (`storeid`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_A_fkey` FOREIGN KEY (`A`) REFERENCES `bulletin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_B_fkey` FOREIGN KEY (`B`) REFERENCES `currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
