FROM node:20.12.2-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN npm install

RUN npm run build:backend

EXPOSE 3355

CMD ["node", "./dist/app.js"]