FROM node:16-alpine

WORKDIR /usr/app

COPY package*.json ./

COPY . .

RUN cd /usr/app/app && npm install
RUN npm install

EXPOSE 3354

CMD ["npm", "run", "dev"]