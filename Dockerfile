FROM node:alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./src ./src
COPY ./public ./public
COPY ./.env ./

RUN npm install
RUN npm run build
RUN npm install -g serve

CMD ["serve", "-l", "8888", "-s", "build"]