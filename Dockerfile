FROM node:12-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

RUN apk add --no-cache bash

COPY . .

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh

EXPOSE 3333
CMD /usr/wait-for-it.sh adonis-mysql:3306 -- node ace migration:run && yarn start