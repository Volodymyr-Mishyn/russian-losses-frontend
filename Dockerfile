# Build: docker build -t russian-losses .
# Run: docker run -p 4000:4000 russian-losses
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run build:copy-additional

RUN rm -rf node_modules

EXPOSE 4000

CMD ["npm", "run", "serve:ssr"]
