-- DropForeignKey
ALTER TABLE "Room_Reservation" DROP CONSTRAINT "Room_Reservation_reservationId_fkey";

-- AddForeignKey
ALTER TABLE "Room_Reservation" ADD CONSTRAINT "Room_Reservation_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
