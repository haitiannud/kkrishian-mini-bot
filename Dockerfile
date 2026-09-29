FROM node:20-bookworm-slim
ENV DEBIAN_FRONTEND=noninteractive
WORKDIR /app
RUN apt-get update && apt-get install -y --no-install-recommends ffmpeg python3 python3-pip ca-certificates && python3 -m pip install --no-cache-dir --break-system-packages -U yt-dlp && rm -rf /var/lib/apt/lists/*
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN mkdir -p /app/data /app/data/sessions /app/tmp
ENV NODE_ENV=production PORT=3000
EXPOSE 3000
CMD ["npm","start"]
