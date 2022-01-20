/*
  Warnings:

  - A unique constraint covering the columns `[identifier_document]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `identifier_document` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` ADD COLUMN `identifier_document` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `clients_identifier_document_key` ON `clients`(`identifier_document`);
