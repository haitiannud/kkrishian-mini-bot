
FROM node:20-bookworm-slim

ENV DEBIAN_FRONTEND=noninteractive
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# System dependencies required by the bot
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    python3 \
    python3-pip \
    ca-certificates \
    git \
    && python3 -m pip install --no-cache-dir --break-system-packages -U yt-dlp \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js dependencies first for better Docker layer caching
COPY package*.json ./

RUN npm install --omit=dev

# Copy the bot source code
COPY . .

# Create required directories
RUN mkdir -p \
    /app/data \
    /app/data/sessions \
    /app/tmp

EXPOSE 3000

CMD ["npm", "start"]
