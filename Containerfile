FROM docker.io/library/node:16 AS frontend-builder
WORKDIR /app/frontend
COPY lojatech/package*.json ./
RUN npm install
COPY lojatech/ ./
RUN npm run build -- --configuration=production


FROM docker.io/library/node:22
WORKDIR /app


COPY database/package*.json ./
RUN npm install


COPY database/ ./


COPY --from=frontend-builder /app/frontend/dist/lojatech ./public


EXPOSE 3000


CMD ["npm", "run", "dev"]
