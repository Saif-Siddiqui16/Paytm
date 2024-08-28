/*
  Warnings:

  - Added the required column `status` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('SUCCESS', 'FAIL');

-- AlterTable
ALTER TABLE "Transactions" ADD COLUMN     "status" "Status" NOT NULL;
