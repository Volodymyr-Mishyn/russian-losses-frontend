# Use an ARM-compatible base image
FROM node:alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build your app
RUN npm run build

RUN rm -rf node_modules

EXPOSE 4000

# Start the application
CMD ["npm", "run", "serve:ssr"]
