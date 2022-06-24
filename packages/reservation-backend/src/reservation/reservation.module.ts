import { ReservationService } from './reservation.service';
import { ReservationsResolver } from './reservation.resolver';
import { RoomService } from './room.service';
import { PriceService } from './price.service';
import { DynamicModule, Module, ModuleMetadata } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ReservationAvailabilityResolver } from './reservation-availability.resolver';

@Module({
  imports: [PrismaModule],
  providers: [
    ReservationAvailabilityResolver,
    ReservationService,
    ReservationsResolver,
    RoomService,
    PriceService,
  ],
})
export class ReservationModule {
  static forRoot(modules: ModuleMetadata): DynamicModule {
    return {
      module: ReservationModule,

      providers: [
        ReservationAvailabilityResolver,
        ReservationService,
        ReservationsResolver,
        RoomService,
        PriceService,
      ],
      ...modules,
    };
  }
}
