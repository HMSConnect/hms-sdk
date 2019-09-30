FROM node:10.15-alpine

# Create app directory
WORKDIR /app/hms-sdk

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apk update \
    && apk add --no-cache openssl \
    && npm install

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE $APP_PORT