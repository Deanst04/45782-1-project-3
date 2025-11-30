# Base image
FROM node:22-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json + lock file
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY ./ ./

# Remove old dist (in case exists)
RUN rm -rf ./dist

# Build TypeScript → JavaScript
RUN npm run build

# Copy images folder into dist for seeding
RUN mkdir -p ./dist/images
COPY ./images ./dist/images

# Cleanup: remove src (we only need dist in container)
RUN rm -rf ./src

# Run app
CMD ["npm", "start"]