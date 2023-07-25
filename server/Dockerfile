FROM node:16-alpine

# Create app directory
WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "run", "serve"]