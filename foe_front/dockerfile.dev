FROM node:14.4.0-alpine

WORKDIR /usr/src/app

ENV PATH $PATH:/usr/src/app/node_modules/.bin

RUN apk update \
    && apk add --no-cache \
    bash \
    musl-dev

COPY ./package.json /usr/src/app/package.json

RUN npm install --no-optional && npm cache clean --force

COPY ./entrypoint.sh /usr/src/app/entrypoint.sh

RUN chmod 700 /usr/src/app/entrypoint.sh

COPY . /usr/src/app/

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]