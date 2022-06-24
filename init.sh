#!/bin/bash
cd ./packages/reservation-backend
npx prisma generate
npx prisma migrate dev --schema ./prisma/schema.prisma
cd ../../
npx nx run-many --target=serve --projects=reservation-backend,reservation-frontend --parallel 