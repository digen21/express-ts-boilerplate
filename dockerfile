# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install ALL deps (needed for TS build)
RUN npm ci

COPY . .

# Build TypeScript → dist
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install ONLY production deps
RUN npm ci --omit=dev

# Copy compiled code only
COPY --from=builder /app/build ./build

EXPOSE 5000

CMD ["node", "build/index.js"]