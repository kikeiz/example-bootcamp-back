FROM --platform=linux/amd64 node:16-alpine3.17

WORKDIR /app

ENV TWILIO_ACCOUNT_SID=ACoñaJSDKAND \
    TWILIO_AUTH_TOKEN=1234567 \
    JWT_SECRET=secretojwt \
    MYSQL_USER=admin \
    MYSQL_PASS=12345678 \
    MYSQL_USER_VOLUNTEER=volunteer \
    MYSQL_PASS_VOLUNTEER=password \
    MYSQL_NAME=mysqldb \
    MYSQL_HOST=database-1.cqjpydkuzasu.us-west-2.rds.amazonaws.com


COPY package*.json ./

RUN npm ci

COPY . . 

EXPOSE 80

CMD ["npm", "start"]

