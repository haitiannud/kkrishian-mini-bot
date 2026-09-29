# Railway Variables

Required:
BOT_NAME=Kkrishian Mini Bot
BOT_PREFIX=.
PAIR_API_KEY=<long random secret>
PORT=3000
DATA_DIR=/app/data

Recommended:
DEFAULT_FREEZE_MINUTES=180
MAX_DOWNLOAD_MB=100
PUBLIC_BASE_URL=https://YOUR-RAILWAY-DOMAIN

Optional:
OWNER_NUMBER=<international digits without +>
LOG_LEVEL=info
AUTO_READ=false
AUTO_TYPING=false

IMPORTANT:
Create a Railway Volume and mount it at /app/data.
Do not commit .env or Baileys session files to GitHub.
