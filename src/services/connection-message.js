import fs from "node:fs/promises";
import path from "node:path";
import { config } from "../config.js";

export async function sendConnectionSuccess(sock, jid, userId) {
  const logo = path.resolve(process.cwd(), "assets", "bot-logo.jpg");
  const audio = path.resolve(process.cwd(), "assets", "connection-success.mp3");

  const caption =
`╭──────────────────────────────╮
│      🤖 ${config.botName}
│
│   🎉 CONNECTION SUCCESSFUL
╰──────────────────────────────╯

Your WhatsApp account is now connected successfully.

🟢 Status: Connected
🆔 User ID: ${userId}

📋 QUICK COMMANDS
• ${config.prefix}menu
• ${config.prefix}pair
• ${config.prefix}setprofile
• ${config.prefix}setstory
• ${config.prefix}freeze
• ${config.prefix}qr
• ${config.prefix}convert
• ${config.prefix}yt
• ${config.prefix}song
• ${config.prefix}sticker

🔐 Keep your pairing/session information private.

Thank you for using ${config.botName}!`;

  try {
    const logoBuf = await fs.readFile(logo);
    await sock.sendMessage(jid, { image: logoBuf, caption });
  } catch {
    await sock.sendMessage(jid, { text: caption });
  }

  try {
    const audioBuf = await fs.readFile(audio);
    await sock.sendMessage(jid, { audio: audioBuf, mimetype: "audio/mpeg", ptt: false });
  } catch {
    // Audio is optional: the bot never pretends an audio file exists.
  }
}
