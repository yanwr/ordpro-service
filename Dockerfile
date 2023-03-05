FROM node:16.13.2 AS builder

WORKDIR /app
COPY package.json ./

RUN npm install

COPY . .

FROM node:16.13.2-slim
COPY --from=builder /app /app
WORKDIR /app
EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]