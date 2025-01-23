/*
  Warnings:

  - You are about to drop the column `accessToken` on the `oauthuser` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `oauthuser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `oauthuser` DROP COLUMN `accessToken`,
    DROP COLUMN `refreshToken`,
    ADD COLUMN `access_token` TEXT NULL,
    ADD COLUMN `refresh_token` TEXT NULL;
