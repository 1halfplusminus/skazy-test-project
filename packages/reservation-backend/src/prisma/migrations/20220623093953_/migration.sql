/*
  Warnings:

  - You are about to drop the column `roomId` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Reservation" DROP COLUMN "roomId",
ADD COLUMN     "nbChamber" INTEGER NOT NULL DEFAULT 0;
