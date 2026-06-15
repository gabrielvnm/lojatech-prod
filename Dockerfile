FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY database/package*.json ./database/
COPY lojatech/package*.json ./lojatech/

# Install all dependencies
RUN npm install
RUN cd database && npm install
RUN cd lojatech && npm install

# Build backend
COPY database ./database
RUN cd database && npm run build

# Build frontend
COPY lojatech ./lojatech
RUN cd lojatech && npm run build -- --configuration=production

# Create data directory for SQLite
RUN mkdir -p /data

EXPOSE 3000

# Start the server
CMD ["sh", "-c", "cd database && npm start"]