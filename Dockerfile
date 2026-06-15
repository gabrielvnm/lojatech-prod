FROM node:20-slim

WORKDIR /app

# Install build dependencies for better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./
COPY database/package*.json ./database/
COPY lojatech/package*.json ./lojatech/

# Install backend dependencies
RUN cd database && npm ci

# Install frontend dependencies
RUN cd lojatech && npm ci

# Copy source code
COPY database ./database
COPY lojatech ./lojatech

# Build backend
RUN cd database && npm run build

# Build frontend (output goes to database serving static files)
RUN cd lojatech && npm run build -- --configuration=production

# Create directory for SQLite database
RUN mkdir -p /data

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_PATH=/data/produtos.db

EXPOSE 3000

# Start the backend server
CMD ["sh", "-c", "cd database && npm start"]