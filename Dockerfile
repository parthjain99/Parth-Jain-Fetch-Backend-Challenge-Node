FROM node:18

# Create app directory
WORKDIR /parthjain/fetch-backend


COPY package*.json ./

RUN npm install

RUN npm install frisby
 
COPY . .
EXPOSE 5001

# FROM base as prod
CMD [ "node", "./server.js" ]
