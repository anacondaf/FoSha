FROM node:16-alpine

WORKDIR /api

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3001

# CMD ["npm", "start"]