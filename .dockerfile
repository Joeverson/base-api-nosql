FROM node:latest

WORKDIR /home/api

COPY . .

RUN npm i nodemon -g && npm i
EXPOSE 3003

CMD [ "npm", "run", "dev" ]