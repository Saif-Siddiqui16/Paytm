/*
  Warnings:

  - You are about to drop the column `userId` on the `OnRampTransactions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[from]` on the table `OnRampTransactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `from` to the `OnRampTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OnRampTransactions" DROP CONSTRAINT "OnRampTransactions_userId_fkey";

-- DropIndex
DROP INDEX "OnRampTransactions_userId_key";

-- AlterTable
ALTER TABLE "OnRampTransactions" DROP COLUMN "userId",
ADD COLUMN     "from" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransactions_from_key" ON "OnRampTransactions"("from");

-- AddForeignKey
ALTER TABLE "OnRampTransactions" ADD CONSTRAINT "OnRampTransactions_from_fkey" FOREIGN KEY ("from") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
