FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN mkdir -p /app/node_modules

RUN chown -R node:node /app/node_modules

RUN npm install --silent

COPY ./ ./

CMD ["npm", "run", "dev"]