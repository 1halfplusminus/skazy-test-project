import { Resolver, ResolveField, Parent, Float } from '@nestjs/graphql';
import { ReservationAvailability } from './reservation.model';

import { PriceService } from './price.service';
import { Room } from '.prisma/client';

@Resolver((of) => ReservationAvailability)
export class ReservationAvailabilityResolver {
  constructor(private priceService: PriceService) {}

  @ResolveField('price', () => Float)
  async price(
    @Parent()
    reservation:
      | (ReservationAvailability & { available: false })
      | (ReservationAvailability & { rooms: Room[]; available: true })
  ) {
    if (reservation.available) {
      return this.priceService.calculatePrice(reservation, reservation.rooms);
    }
    return 0;
  }
}
