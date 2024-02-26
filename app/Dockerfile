FROM node:16.13.0-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install --legacy-peer-deps

EXPOSE 3000

CMD ["yarn", "start"]