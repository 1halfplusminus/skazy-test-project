import { Injectable } from '@nestjs/common';
import { Room, Prisma } from '@prisma/client';
import { eachDayOfInterval, eachWeekendOfInterval, addDays } from 'date-fns/fp';

import { pipe, map, reduce, add } from 'lodash/fp';
import { parseDate } from './utils';

@Injectable()
export class PriceService {
  calculatePrice(
    reservation: Pick<
      Prisma.ReservationCreateInput,
      'arrivalDate' | 'leavingDate' | 'nbChamber'
    >,
    rooms: Room[]
  ) {
    return pipe(
      () => rooms,
      map((r) => this.calculatePriceRoom(reservation, r)),
      reduce(add, 0)
    )();
  }
  calculatePriceRoom(
    reservation: Pick<
      Prisma.ReservationCreateInput,
      'arrivalDate' | 'leavingDate' | 'nbChamber'
    >,
    room: Room
  ) {
    const parsedReservation = parseDate(reservation);
    const period = {
      start: addDays(1)(parsedReservation.arrivalDate),
      end: parsedReservation.leavingDate,
    };
    const nbWeekEnd = eachWeekendOfInterval(period).length;
    const nbNight = eachDayOfInterval(period).length - nbWeekEnd;
    return room.price_weekend * nbWeekEnd + room.price * nbNight;
  }
}
