-- CreateTable
CREATE TABLE `favorite` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NULL,
    `userid` VARCHAR(50) NOT NULL,
    `date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
