FROM node:20

RUN mkdir -p /app

COPY package* /app/
COPY tsconfig* /app/
COPY nest-cli.json /app/
COPY src /app/src

WORKDIR /app
RUN npm i --production --prune && \
    npm i -g @nestjs/cli && \
    npm run build