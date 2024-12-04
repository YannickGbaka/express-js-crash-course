FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY db ./db

EXPOSE 3002


CMD ["npm", "run", "dev"]

