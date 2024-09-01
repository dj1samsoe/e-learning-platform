/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Chapter` table. All the data in the column will be lost.
  - You are about to drop the column `isPublished` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Chapter` DROP COLUMN `isPublished`;

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `isPublished`;
