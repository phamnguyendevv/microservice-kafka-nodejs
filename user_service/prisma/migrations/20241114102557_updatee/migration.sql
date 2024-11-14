/*
  Warnings:

  - You are about to alter the column `balance` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "balance" SET DATA TYPE INTEGER;
