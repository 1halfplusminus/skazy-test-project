FROM node:16
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
EXPOSE 4200
EXPOSE 3333
ENTRYPOINT ["/bin/bash", "/usr/src/app/init.sh"]