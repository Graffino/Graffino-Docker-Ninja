FROM node:lts-alpine

# NodeJS
RUN apk add --no-cache nodejs yarn --repository="http://dl-cdn.alpinelinux.org/alpine/edge/community"

COPY package.json /var/www/package.json
COPY yarn.lock /var/www/yarn.lock

RUN yarn

WORKDIR /var/www
