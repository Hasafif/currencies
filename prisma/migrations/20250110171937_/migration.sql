/*
  Warnings:

  - The primary key for the `bulletin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `employees` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `offer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `store` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `_bulletintocurrency` DROP FOREIGN KEY `_bulletinTocurrency_A_fkey`;

-- DropForeignKey
ALTER TABLE `_bulletintocurrency` DROP FOREIGN KEY `_bulletinTocurrency_B_fkey`;

-- DropForeignKey
ALTER TABLE `bulletin` DROP FOREIGN KEY `bulletin_storeid_fkey`;

-- DropIndex
DROP INDEX `bulletin_storeid_fkey` ON `bulletin`;

-- AlterTable
ALTER TABLE `_bulletintocurrency` MODIFY `A` VARCHAR(191) NOT NULL,
    MODIFY `B` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `bulletin` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `storeid` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `currency` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `employees` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `offer` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `store` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `bulletin` ADD CONSTRAINT `bulletin_storeid_fkey` FOREIGN KEY (`storeid`) REFERENCES `store`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_A_fkey` FOREIGN KEY (`A`) REFERENCES `bulletin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_B_fkey` FOREIGN KEY (`B`) REFERENCES `currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
