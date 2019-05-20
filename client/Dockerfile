FROM node:latest

RUN mkdir -p /usr/src/Dashboard/client
WORKDIR /usr/src/Dashboard/client

COPY package.json /usr/src/Dashboard/client

RUN npm install --silent

COPY . /usr/src/Dashboard/client

EXPOSE 3000

CMD [ "npm", "start:prod" ]