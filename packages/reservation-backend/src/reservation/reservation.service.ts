import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Reservation, Prisma, Room } from '@prisma/client';
import { map, pipe, flatten, uniq } from 'lodash/fp';
import { isMonday, eachDayOfInterval } from 'date-fns';
import { ReservationAvailability } from './reservation.model';
import { parseDate } from './utils';

@Injectable()
export class ReservationService {
  constructor(private prisma: PrismaService) {}

  async post(
    reservationWhereUniqueInput: Prisma.ReservationWhereUniqueInput
  ): Promise<Reservation | null> {
    return this.prisma.reservation.findUnique({
      where: reservationWhereUniqueInput,
    });
  }
  private validateReservationDate(reservation: Prisma.ReservationCreateInput) {
    const { leavingDate, arrivalDate } = parseDate(reservation);
    const days = eachDayOfInterval({
      start: arrivalDate,
      end: leavingDate,
    });
    return !!days.find((d) => isMonday(d));
  }
  async checkAvailability(
    reservation: Prisma.ReservationCreateInput
  ): Promise<
    | (ReservationAvailability & { available: false })
    | (ReservationAvailability & { rooms: Room[]; available: true })
  > {
    const { nbChamber, arrivalDate, leavingDate } = reservation;
    if (this.validateReservationDate(reservation)) {
      return {
        message: 'Le gîte est fermé le lundi',
        available: false,
        nbChamber,
        arrivalDate,
        leavingDate,
      };
    }
    const availableRooms = await this.getAvailableRooms(reservation);
    if (availableRooms.length == 0) {
      return {
        message: 'Plus aucune chambre disponible',
        available: false,
        nbChamber,
        arrivalDate,
        leavingDate,
      };
    }
    if (reservation.nbChamber > availableRooms.length) {
      return {
        message: `Plus que ${availableRooms.length} de disponible`,
        available: false,
        nbChamber,
        arrivalDate,
        leavingDate,
      };
    }

    return {
      available: true,
      message: 'Chambre disponible !',
      rooms: availableRooms.slice(0, reservation.nbChamber),
      nbChamber,
      arrivalDate,
      leavingDate,
    };
  }
  async getAvailableRooms(reservation: Prisma.ReservationCreateInput) {
    const overlappingReservations = await this.getOverlappingReservations(
      reservation
    );
    const rooms = pipe(
      () => overlappingReservations,
      map((r) => r.Room),
      flatten,
      map((r) => r.roomId),
      uniq
    )();
    const availableRooms = await this.prisma.room.findMany({
      where: { id: { notIn: rooms } },
    });

    return availableRooms;
  }
  async getOverlappingReservations(reservation: Prisma.ReservationCreateInput) {
    const overlappingReservations = this.prisma.reservation.findMany({
      include: { Room: true },
      where: {
        OR: [
          {
            arrivalDate: {
              lte: reservation.leavingDate,
            },
            leavingDate: {
              gte: reservation.leavingDate,
            },
          },
          {
            leavingDate: {
              gte: reservation.arrivalDate,
              lte: reservation.leavingDate,
            },
          },
          {
            arrivalDate: {
              lte: reservation.arrivalDate,
            },
            leavingDate: {
              gte: reservation.leavingDate,
            },
          },
        ],
      },
    });
    return overlappingReservations;
  }

  async createReservation(
    data: Prisma.ReservationCreateInput
  ): Promise<Reservation> {
    return this.prisma.reservation.create({
      data,
    });
  }

  async deleteReservation(
    where: Prisma.ReservationWhereUniqueInput
  ): Promise<Reservation> {
    return this.prisma.reservation.delete({
      where,
    });
  }
}
