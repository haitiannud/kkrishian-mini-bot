# Kkrishian Mini Bot — Railway

Complete Railway-ready foundation for a modular WhatsApp bot.

## Included
- Baileys WhatsApp sessions
- Pair Code web page + API
- Persistent multi-session auth directories
- Modular command loader
- `.menu`, `.ping`, `.alive`, `.pair`
- `.tagall`, `.hidetag`, `.kick`, `.promote`, `.demote`
- `.warn`, `.warnings`
- `.freeze on/off/status` with 180-minute default admin-only lock after a non-admin link
- `.setstory`, `.story`, `.delstory`
- `.setprofile`, `.qr`, `.convert`
- Railway Dockerfile + healthcheck
- FFmpeg + yt-dlp in container

## Railway setup
1. Push this folder to GitHub.
2. Railway → New Project → Deploy from GitHub.
3. Add a Volume mounted at `/app/data`.
4. Add variables from `.env.example`.
5. Set a strong `PAIR_API_KEY`.
6. Generate a Railway domain and set `PUBLIC_BASE_URL=https://your-domain`.
7. Open `/pair.html` and use the pairing key.
8. Health endpoint: `/health`.

Do not commit `.env` or session credentials.

`.freeze` is moderation only; it does not attack or crash WhatsApp clients. `.convert` is intended for public/authorized media and must be used according to the source platform's terms.

Baileys is unofficial WhatsApp automation software; account restrictions are possible.
