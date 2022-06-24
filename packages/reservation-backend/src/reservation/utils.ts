import { Prisma } from '@prisma/client';

export const parseDate = (
  reservation: Pick<
    Prisma.ReservationCreateInput,
    'leavingDate' | 'arrivalDate'
  >
) => {
  const leavingDate =
    reservation.leavingDate instanceof Date ? reservation.leavingDate : 0;
  const arrivalDate =
    reservation.arrivalDate instanceof Date ? reservation.arrivalDate : 0;
  return { ...reservation, leavingDate, arrivalDate };
};
