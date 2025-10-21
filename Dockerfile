# Use Node.js 20 Alpine as base image
FROM node:20-alpine as builder

# Install dependencies for Prisma
RUN apk add --no-cache bash libc6-compat openssl

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy Prisma schema and source code before generating client and building
COPY prisma ./prisma/
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the Nest app
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "run", "start:dev"]
