FROM node:alpine

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public
COPY ./.env ./

ENV -e PORT=8888
ENV -e REACT_APP_API_DOTNET=https://bravi-contact-list-api-dotnet.herokuapp.com
ENV -e REACT_APP_API_NODEJS=https://bravi-contact-list-api-nodejs.herokuapp.com

RUN npm run build && npm install -g serve

CMD ["serve", "-l", "$PORT", "-s", "build"]
