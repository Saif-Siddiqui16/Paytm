/*
  Warnings:

  - A unique constraint covering the columns `[to]` on the table `OnRampTransactions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `to` to the `OnRampTransactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnRampTransactions" ADD COLUMN     "to" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransactions_to_key" ON "OnRampTransactions"("to");

-- AddForeignKey
ALTER TABLE "OnRampTransactions" ADD CONSTRAINT "OnRampTransactions_to_fkey" FOREIGN KEY ("to") REFERENCES "Merchant"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
