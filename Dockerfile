# Use the official Node.js 14 as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container
COPY . .

ENV PORT 8080

# Install any needed packages specified in package.json
RUN "npm" "install"

# Make port 8080 available to the world outside this container
EXPOSE 8080

# Define environment variable
ENV NODE_ENV production

# Run the application when the container launches
CMD ["node", "index.js"]
