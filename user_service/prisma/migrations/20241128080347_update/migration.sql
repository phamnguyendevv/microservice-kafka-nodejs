/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "phone" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,
    "used_balance" INTEGER NOT NULL,
    "total_deposit" INTEGER NOT NULL,
    "referral_code" TEXT,
    "referrer_id" TEXT,
    "code_bank" TEXT,
    "is_online" BOOLEAN NOT NULL,
    "qr_data" JSONB NOT NULL,
    "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_status" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_update" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "User_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "User_role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
