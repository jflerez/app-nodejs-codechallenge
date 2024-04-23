FROM node:16.1-alpine3.13 as BUILD

ARG BASE_DIR="ms-transaction"

ADD ${BASE_DIR}/package*.json /tmp/

RUN cd /tmp && npm install

RUN mkdir /app && cp -a /tmp/node_modules /app

WORKDIR /app

ADD ${BASE_DIR}/. .

RUN npm run build

FROM node:16.1-alpine3.13

ARG BASE_DIR="ms-transaction"

WORKDIR /app

COPY --from=BUILD /app/node_modules ./node_modules
COPY --from=BUILD /app/dist ./dist
COPY ${BASE_DIR}/package.json .

CMD ["node", "dist/main"]