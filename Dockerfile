FROM node:20

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3354

CMD ["npm", "run", "build"]

CMD ["npm", "run", "production"]