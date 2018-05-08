FROM node:8-alpine

ADD . /build

WORKDIR /build

RUN yarn install

EXPOSE 4000

CMD yarn start