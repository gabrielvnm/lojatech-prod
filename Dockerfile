FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY database/package*.json ./database/
COPY lojatech/package*.json ./lojatech/

# Install dependencies
RUN npm install --prefix database
RUN npm install --prefix lojatech

# Build backend
COPY database ./database
RUN npm run build --prefix database

# Build frontend
COPY lojatech ./lojatech
RUN npm run build --prefix lojatech -- --configuration=production

# Create data directory for SQLite
RUN mkdir -p /data

EXPOSE 3000

# Start the server
CMD ["sh", "-c", "cd database && npm start"]