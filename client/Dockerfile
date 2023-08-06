FROM node:16-alpine

# Create app directory
WORKDIR /client

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent

# add app
COPY . ./

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

# start app
CMD ["serve", "-s", "build"]