import { Test } from '@nestjs/testing';
import { Prisma, Room } from '@prisma/client';

import { ReservationService } from './reservation.service';
import { PrismaModule } from '../prisma/prisma.module';
import { RoomService } from './room.service';
import { PrismaService } from '../prisma/prisma.service';

describe('ReservationService', () => {
  let service: ReservationService;
  let roomService: RoomService;
  let prismaService: PrismaService;
  const period1 = {
    arrivalDate: new Date(2021, 5, 20),
    leavingDate: new Date(2021, 5, 22),
  };
  const period2 = {
    arrivalDate: new Date(2021, 5, 22),
    leavingDate: new Date(2021, 5, 24),
  };
  const period3 = {
    arrivalDate: new Date(2021, 5, 23),
    leavingDate: new Date(2021, 5, 24),
  };
  const period4 = {
    arrivalDate: new Date(2021, 5, 24),
    leavingDate: new Date(2021, 5, 26),
  };

  const period5 = {
    arrivalDate: new Date(2021, 5, 27),
    leavingDate: new Date(2021, 5, 29),
  };
  const period6 = {
    arrivalDate: new Date(2021, 5, 27),
    leavingDate: new Date(2021, 5, 29),
  };
  const createRoom: Prisma.RoomCreateInput = {
    price: 5000,
    price_weekend: 7000,
  };
  let room1: Room;
  let room2: Room;
  let room3: Room;
  beforeAll(async () => {
    const app = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [ReservationService, RoomService],
    }).compile();
    roomService = app.get<RoomService>(RoomService);
    service = app.get<ReservationService>(ReservationService);
    prismaService = app.get<PrismaService>(PrismaService);
    await prismaService.room_Reservation.deleteMany();
    await prismaService.room.deleteMany();
    await prismaService.reservation.deleteMany();
    room1 = await roomService.createRoom(createRoom);
    room2 = await roomService.createRoom(createRoom);
    room3 = await roomService.createRoom(createRoom);
  });
  afterAll(async () => {
    await roomService.deleteRoom({ id: room1.id });
    await roomService.deleteRoom({ id: room2.id });
    await roomService.deleteRoom({ id: room3.id });
  });

  describe('Reservation Service', () => {
    it('should check available rooms correctly', async () => {
      const reservationInput: Prisma.ReservationCreateInput = {
        numberOfAdult: 0,
        numberOfChild: 0,
        nbChamber: 1,
        arrivalDate: period2.arrivalDate,
        leavingDate: period2.leavingDate,
        Room: {
          create: {
            roomId: room1.id,
          },
        },
        user: {
          connectOrCreate: {
            create: {
              email: 'mail@mail.com',
              lastName: 'test',
              firstName: 'test',
              phoneNumber: '444444',
            },
            where: { email: 'mail@mail.com' },
          },
        },
      };
      // const reservation = await service.createReservation(reservationInput);
      // const availableRooms = await service.getAvailableRooms({
      //   ...reservation,
      //   arrivalDate: period1.arrivalDate,
      //   leavingDate: period1.leavingDate,
      // });
      const availability = await service.checkAvailability(reservationInput);
      expect(availability.available).toBe(true);
    });
    it('should get available rooms correctly', async () => {
      const reservationInput: Prisma.ReservationCreateInput = {
        numberOfAdult: 0,
        numberOfChild: 0,
        arrivalDate: period2.arrivalDate,
        leavingDate: period2.leavingDate,
        Room: {
          create: {
            roomId: room1.id,
          },
        },
        user: {
          connectOrCreate: {
            create: {
              email: 'mail@mail.com',
              lastName: 'test',
              firstName: 'test',
              phoneNumber: '444444',
            },
            where: { email: 'mail@mail.com' },
          },
        },
      };
      const reservation = await service.createReservation(reservationInput);
      const availableRooms = await service.getAvailableRooms({
        ...reservation,
        arrivalDate: period1.arrivalDate,
        leavingDate: period1.leavingDate,
      });
      await service.deleteReservation({ id: reservation.id });
      expect(availableRooms).toHaveLength(2);
    });
    it('should check overlaps correctly', async () => {
      const reservationInput: Prisma.ReservationCreateInput = {
        numberOfAdult: 0,
        numberOfChild: 0,
        arrivalDate: period2.arrivalDate,
        leavingDate: period2.leavingDate,
        Room: {
          create: {
            roomId: room1.id,
          },
        },
        user: {
          connectOrCreate: {
            create: {
              email: 'mail@mail.com',
              lastName: 'test',
              firstName: 'test',
              phoneNumber: '444444',
            },
            where: { email: 'mail@mail.com' },
          },
        },
      };
      const reservation = await service.createReservation(reservationInput);
      const overlapsPeriod1 = await service.getOverlappingReservations({
        ...reservation,
        arrivalDate: period1.arrivalDate,
        leavingDate: period1.leavingDate,
      });
      const overlapsPeriod3 = await service.getOverlappingReservations({
        ...reservation,
        arrivalDate: period3.arrivalDate,
        leavingDate: period3.leavingDate,
      });
      const overlapsPeriod4 = await service.getOverlappingReservations({
        ...reservation,
        arrivalDate: period4.arrivalDate,
        leavingDate: period4.leavingDate,
      });
      const overlapsPeriod5 = await service.getOverlappingReservations({
        ...reservation,
        arrivalDate: period5.arrivalDate,
        leavingDate: period5.leavingDate,
      });
      const overlapsPeriod6 = await service.getOverlappingReservations({
        ...reservation,
        arrivalDate: period6.arrivalDate,
        leavingDate: period6.leavingDate,
      });

      await service.deleteReservation({ id: reservation.id });

      expect(overlapsPeriod1).toHaveLength(1);
      expect(overlapsPeriod3).toHaveLength(1);
      expect(overlapsPeriod4).toHaveLength(1);
      expect(overlapsPeriod5).toHaveLength(0);
      expect(overlapsPeriod6).toHaveLength(0);
    });
  });
});
