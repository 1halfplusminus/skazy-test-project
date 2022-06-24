import { Test } from '@nestjs/testing';
import { Prisma, Room, Reservation } from '@prisma/client';

import { ReservationService } from './reservation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomService } from './room.service';
import { PriceService } from './price.service';

describe('PriceService', () => {
  let service: PriceService;

  const period1 = {
    arrivalDate: new Date(2021, 5, 24),
    leavingDate: new Date(2021, 5, 26),
  };
  const createRoom: Prisma.RoomCreateInput = {
    price: 5000,
    price_weekend: 7000,
  };
  const room1: Room = {
    id: 1,
    ...createRoom,
  };
  const room2: Room = {
    id: 2,
    ...createRoom,
  };

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ReservationService, RoomService, PriceService],
    }).compile();
    service = app.get<PriceService>(PriceService);
  });

  describe('Price Service', () => {
    it('should calculate price correctly', async () => {
      const reservation: Reservation = {
        numberOfAdult: 0,
        numberOfChild: 0,
        arrivalDate: period1.arrivalDate,
        leavingDate: period1.leavingDate,
        id: 0,
        nbChamber: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 0,
      };
      expect(service.calculatePrice(reservation, [room1])).toEqual(5000 + 7000);
      expect(
        service.calculatePrice(
          {
            ...reservation,
            arrivalDate: new Date(2021, 5, 23),
            leavingDate: new Date(2021, 5, 24),
          },
          [room1]
        )
      ).toEqual(5000);
      expect(
        service.calculatePrice(
          {
            ...reservation,
            arrivalDate: new Date(2021, 5, 22),
            leavingDate: new Date(2021, 5, 24),
          },
          [room1]
        )
      ).toEqual(10000);
    });
  });
});
