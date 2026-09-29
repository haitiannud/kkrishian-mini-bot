# Kkrishian Mini Bot feature map

This project is a new implementation inspired by the public feature description of Knightbot-MD, not a copy of its source.

## Implemented now

Connection:
- Baileys multi-device session
- Pair Code API and web page
- persistent auth under /app/data/sessions
- connection-success message
- optional real bot logo and real MP3 connection audio
- user ID generation

Group:
- tagall
- hidetag
- kick
- promote
- demote
- admins
- groupinfo
- grouplink
- revoke
- open/close
- mute/unmute
- setname
- setdesc
- warn/warnings
- antilink setting
- freeze on/off/status
- automatic freeze on unauthorized links
- setstory/story/delstory custom group-story feature

Media:
- convert
- YouTube video/audio
- public Instagram/Facebook/TikTok downloads when yt-dlp supports the URL
- sticker conversion using FFmpeg
- QR generation

Fun:
- 8ball
- dice
- coin
- joke
- quote

System/owner:
- menu
- ping
- alive
- status
- runtime
- restart
- id
- setprefix guidance

## Not implemented as attack functionality

No WhatsApp crash/freeze payloads, malicious message payloads, fake likes, fake followers, or bulk-spam tooling are included. The `.freeze` command is group moderation only.

## External credentials

No API keys are embedded. Add secrets in Railway Variables.

## Real assets

Put these real files in `assets/` before deploying if desired:
- `bot-logo.jpg`
- `connection-success.mp3`

The code checks whether they exist before sending them.
