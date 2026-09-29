import { config } from "../../config.js";

export const command = {
  name: "menu",
  aliases: ["help", "commands"],
  description: "Show all available commands",
  async execute({ reply }) {
    await reply(
`╭━━━〔 🤖 ${config.botName} 〕━━━╮
┃
┃ ⚡ SYSTEM
┃ • .menu
┃ • .ping
┃ • .alive
┃ • .status
┃ • .runtime
┃ • .pair
┃
┃ 👥 GROUP MANAGEMENT
┃ • .tagall
┃ • .hidetag
┃ • .admins
┃ • .groupinfo
┃ • .grouplink
┃ • .revoke
┃ • .kick @user
┃ • .promote @user
┃ • .demote @user
┃ • .open
┃ • .close
┃ • .mute
┃ • .unmute
┃ • .setname
┃ • .setdesc
┃ • .warn @user
┃ • .warnings @user
┃ • .antilink on/off
┃ • .freeze on/off/status
┃ • .setstory
┃ • .story
┃ • .delstory
┃
┃ 📥 MEDIA
┃ • .convert <URL>
┃ • .yt <URL>
┃ • .song <URL>
┃ • .instagram <URL>
┃ • .facebook <URL>
┃ • .tiktok <URL>
┃ • .sticker
┃ • .qr <text>
┃
┃ 🎮 FUN
┃ • .8ball
┃ • .dice
┃ • .coin
┃ • .joke
┃ • .quote
┃
┃ 👑 OWNER
┃ • .restart
┃ • .setprefix
┃ • .id
┃
╰━━━━━━━━━━━━━━━━━━━━╯`
    );
  }
};
