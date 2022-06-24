/*
  Warnings:

  - Added the required column `price` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price_weekend` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "price_weekend" DOUBLE PRECISION NOT NULL;
