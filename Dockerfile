FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

# Install all dependencies including devDependencies for development
RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "dev:docker"]
