FROM node:18.18.0-alpine

WORKDIR /usr/app

COPY package.json .

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
