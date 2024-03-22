/*
  Warnings:

  - Added the required column `userId` to the `tasklist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasklist" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "tasklist" ADD CONSTRAINT "tasklist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
