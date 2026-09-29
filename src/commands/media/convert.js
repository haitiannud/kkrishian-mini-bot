import { downloadVideo, cleanupDir } from "../../services/downloader.js";

export const command = {
  name: "convert",
  aliases: ["download", "dl"],
  description: "Convert/download supported public media URLs",
  async execute({ sock, msg, text, args, reply }) {
    const url = args.find(x => /^https?:\/\//i.test(x));
    if (!url) return reply("Usage: .convert <public Instagram/YouTube/Facebook/TikTok URL>");

    const mode = (args.find(x => /^(video|mp4|audio|mp3)$/i.test(x)) || "video").toLowerCase();
    await reply("⏳ Resolving URL and preparing the media...");

    if (mode === "audio" || mode === "mp3") {
      const { downloadAudio } = await import("../../services/downloader.js");
      const r = await downloadAudio(url);
      try {
        await sock.sendMessage(msg.key.remoteJid, {
          audio: r.buffer, mimetype: "audio/mpeg", fileName: `${r.title.replace(/[^\w.-]+/g,"_")}.mp3`
        }, { quoted: msg });
      } finally { await cleanupDir(r.dir); }
      return;
    }

    const r = await downloadVideo(url);
    try {
      await sock.sendMessage(msg.key.remoteJid, {
        video: r.buffer, mimetype: "video/mp4", caption: ` ${r.title}`
      }, { quoted: msg });
    } finally { await cleanupDir(r.dir); }
  }
};
