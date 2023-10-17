ARG NODE_VERSION=18

FROM node:${NODE_VERSION}-alpine3.18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]