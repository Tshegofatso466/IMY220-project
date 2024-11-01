FROM node:20
WORKDIR /app
COPY . .
COPY .env .env
RUN npm install
CMD [ "npm", "start" ]
EXPOSE 1337