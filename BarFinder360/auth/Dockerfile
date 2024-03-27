FROM node


# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./

RUN npm install

# Bundle app source
COPY ./src ./src/
# COPY ./app.js .

# Expose the port the app runs on
EXPOSE 5002

COPY .env .

CMD ["npm", "run","start"]   
