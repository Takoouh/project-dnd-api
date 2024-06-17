FROM node:18-alpine
WORKDIR /usr/src/app
# A wildcard ensures package.json AND package-lock.json are copied
COPY package*.json ./

# Install project dependencies
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001/tcp

CMD [ "node", "dist/main.js" ]