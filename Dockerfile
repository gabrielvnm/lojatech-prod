FROM node:20-slim

WORKDIR /app

# Install build tools for better-sqlite3
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY database/package*.json ./database/
COPY lojatech/package*.json ./lojatech/

# Install dependencies
RUN cd database && npm ci --omit=dev
RUN cd lojatech && npm ci --omit=dev

# Copy source code
COPY database ./database
COPY lojatech ./lojatech

# Build backend
RUN cd database && npm run build

# Build frontend
RUN cd lojatech && npm run build -- --configuration=production

# Create data directory for SQLite
RUN mkdir -p /data

ENV NODE_ENV=production
ENV DATABASE_PATH=/data/produtos.db
ENV PORT=3000

EXPOSE 3000

CMD ["node", "database/dist/index.js"]