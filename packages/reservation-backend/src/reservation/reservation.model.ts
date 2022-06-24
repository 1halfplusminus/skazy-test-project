import { ArgsType, Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Reservation {
  @Field((type) => ID!)
  id: string | number;

  @Field((type) => Date)
  arrivalDate: Date;

  @Field((type) => Date)
  leavingDate: Date;

  numberOfChild: number;

  numberOfAdult: number;
}

@ObjectType()
export class ReservationAvailability {
  @Field((type) => Boolean)
  available?: boolean;
  @Field((type) => String)
  message: string;
  @Field((type) => Date)
  arrivalDate: Date | string;
  @Field((type) => Date)
  leavingDate: Date | string;
  @Field(() => Int)
  nbChamber: number;
}

@ObjectType()
export class ReservationCreateResponse {
  @Field((type) => Boolean)
  success: boolean;
  @Field((type) => String)
  message: string;
}
@ArgsType()
export class CreateReservationArgs {
  @Field((type) => Date)
  arrivalDate: Date;

  @Field((type) => Date)
  leavingDate: Date;

  @Field((type) => String)
  email: string;

  @Field((type) => Int)
  nbChamber: number;

  numberOfChild: number;

  numberOfAdult: number;
}
