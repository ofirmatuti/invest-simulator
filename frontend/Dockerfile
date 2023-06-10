# Base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

RUN npm install
# Install dependencies
RUN npm ci --only=production

# Copy the entire app directory into the container
COPY . .

# Build the React app
RUN npm run build

# Expose the desired port (e.g., 3000)
EXPOSE 3000

# Run the React app
CMD ["npm", "start"]
