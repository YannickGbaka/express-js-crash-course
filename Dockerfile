from node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY src ./src

COPY db ./db

CMD ["npm", "run", "dev"]

EXPOSE 3002
