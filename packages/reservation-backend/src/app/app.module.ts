import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ReservationModule } from '../reservation/reservation.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      autoSchemaFile: join(__dirname, '../schema.gql'),
      sortSchema: true,
      introspection: true,
      driver: ApolloDriver,
      resolverValidationOptions: {
        requireResolversToMatchSchema: 'ignore',
      },
      cors: {
        origin: 'http://localhost:4200',
        credentials: true,
      },
    }),
    ReservationModule.forRoot({ imports: [PrismaModule] }),
  ],
  providers: [],
})
export class AppModule {}
