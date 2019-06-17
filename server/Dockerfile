FROM node:latest

RUN mkdir -p /usr/src/Dashboard/server
WORKDIR /usr/src/Dashboard/server

COPY package.json /usr/src/Dashboard/server

RUN npm install --silent
RUN npm install -g nodemon dotenv --silent

COPY . /usr/src/Dashboard/server

EXPOSE 8080

CMD [ "npm", "start" ]