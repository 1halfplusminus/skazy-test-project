import { PrismaClient, Prisma } from '@prisma/client';

const client = new PrismaClient();
async function main() {
  const roomCreateInput: Prisma.RoomCreateInput = {
    price: 5000,
    price_weekend: 7000,
  };
  await client.room.create({ data: roomCreateInput });
  await client.room.create({ data: roomCreateInput });
  await client.room.create({ data: roomCreateInput });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
