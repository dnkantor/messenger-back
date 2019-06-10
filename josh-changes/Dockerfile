FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Copies package.js and package-lock.json into docker's working directory
COPY package*.json ./

RUN npm install
# In production comment out the line above and uncomment the one below
# RUN npm ci --only=production

# Copies app code into docker's working directory
COPY . .

ENV NODE_ENV=development

EXPOSE 8080
CMD [ "npm", "start"]