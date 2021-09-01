# syntax=docker/dockerfile:1

FROM node:16.8.0

ENV NODE_ENV=production

WORKDIR /polkadot-explorer

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

CMD [ "node", "server.js" ]

