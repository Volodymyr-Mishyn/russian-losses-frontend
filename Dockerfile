FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN rm -rf node_modules

EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
