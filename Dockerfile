# Use the official Node.js image from the Docker Hub with version 22.9.0
FROM node:22.9.0

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Define the command to run the app
CMD [ "npm", "start" ]
