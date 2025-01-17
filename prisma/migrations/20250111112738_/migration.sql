-- CreateTable
CREATE TABLE `_bulletinTocurrency` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_bulletinTocurrency_AB_unique`(`A`, `B`),
    INDEX `_bulletinTocurrency_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_A_fkey` FOREIGN KEY (`A`) REFERENCES `bulletin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_bulletinTocurrency` ADD CONSTRAINT `_bulletinTocurrency_B_fkey` FOREIGN KEY (`B`) REFERENCES `currency`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
