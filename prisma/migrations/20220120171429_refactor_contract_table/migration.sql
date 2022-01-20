/*
  Warnings:

  - You are about to drop the column `clientId` on the `contracts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `contracts` DROP FOREIGN KEY `contracts_clientId_fkey`;

-- AlterTable
ALTER TABLE `contracts` DROP COLUMN `clientId`;
