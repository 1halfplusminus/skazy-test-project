
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Room, Prisma } from '@prisma/client';

@Injectable()
export class RoomService {
  constructor(private prisma: PrismaService) {}

  async post(
    roomWhereUniqueInput: Prisma.RoomWhereUniqueInput,
  ): Promise<Room | null> {
    return this.prisma.room.findUnique({
      where: roomWhereUniqueInput,
    });
  }

  async rooms(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoomWhereUniqueInput;
    where?: Prisma.RoomWhereInput;
    orderBy?: Prisma.RoomOrderByWithRelationInput;
  }): Promise<Room[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.room.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createRoom(data: Prisma.RoomCreateInput): Promise<Room> {
    return this.prisma.room.create({
      data,
    });
  }
  
  async deleteRoom(where: Prisma.RoomWhereUniqueInput): Promise<Room> {
    return this.prisma.room.delete({
      where,
    });
  }
}