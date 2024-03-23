/*
  Warnings:

  - You are about to drop the column `userId` on the `tasklist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tasklist" DROP CONSTRAINT "tasklist_userId_fkey";

-- AlterTable
ALTER TABLE "tasklist" DROP COLUMN "userId";
