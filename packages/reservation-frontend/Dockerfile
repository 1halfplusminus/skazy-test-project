FROM node:16-alpine

# create dir
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# build dependencies
COPY package.json package-lock.json* ./
USER node
RUN npm ci

# copy in source code
COPY --chown=node:node ./dist/packages/reservation-frontend/ ./

# start express server
CMD [ "npm", "start" ]
