-- AlterTable
ALTER TABLE `currency` ADD COLUMN `city` VARCHAR(50) NULL,
    ADD COLUMN `state` VARCHAR(50) NULL;

-- CreateTable
CREATE TABLE `price` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL,
    `price` DOUBLE NOT NULL,
    `state` VARCHAR(50) NULL,
    `city` VARCHAR(50) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
