import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Float,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import {
  CreateReservationArgs,
  Reservation,
  ReservationAvailability,
} from './reservation.model';
import { ReservationService } from './reservation.service';

@Resolver((of) => Reservation)
export class ReservationsResolver {
  constructor(private reservationService: ReservationService) {}

  @Query((returns) => ReservationAvailability)
  async checkAvailability(@Args() reservation: CreateReservationArgs) {
    console.log(reservation);
    const availability = await this.reservationService.checkAvailability(
      reservation
    );
    console.log(availability);
    return availability;
  }
  @Mutation((returns) => ReservationAvailability)
  async createReservation(@Args() reservation: CreateReservationArgs) {
    const availability = await this.reservationService.checkAvailability(
      reservation
    );
    if (availability.available) {
      const { email, ...reservationInput } = reservation;
      const createdReservation =
        await this.reservationService.createReservation({
          ...reservationInput,
          numberOfAdult: 0,
          numberOfChild: 0,
          user: {
            connectOrCreate: {
              create: {
                firstName: '',
                lastName: '',
                email: email,
                phoneNumber: '',
              },
              where: { email: email },
            },
          },
          Room: {
            createMany: {
              data: [
                ...availability.rooms.map((r) => ({
                  roomId: r.id,
                })),
              ],
            },
          },
        });
    }
    return availability;
  }
}
