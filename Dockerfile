FROM node:12-alpine

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

RUN apk add --no-cache bash

RUN yarn global add @adonisjs/cli

COPY . .

COPY wait-for-it.sh /usr/wait-for-it.sh
RUN chmod +x /usr/wait-for-it.sh


EXPOSE 3333
CMD /usr/wait-for-it.sh adonis-mysql:3306 -- adonis migration:run && adonis serve --dev