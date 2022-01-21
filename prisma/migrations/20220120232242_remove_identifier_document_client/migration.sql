/*
  Warnings:

  - You are about to drop the column `identifier_document` on the `clients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `clients_identifier_document_key` ON `clients`;

-- AlterTable
ALTER TABLE `clients` DROP COLUMN `identifier_document`;
