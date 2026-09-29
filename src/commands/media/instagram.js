import {downloadVideo,cleanupDir} from "../../services/downloader.js";
export const command={name:"instagram",aliases:["ig"],description:"Download public Instagram media when yt-dlp supports it",
 async execute({sock,msg,args,reply}){const url=args.find(x=>/^https?:\/\//i.test(x));if(!url)return reply("Usage: .instagram <public URL>");
  await reply("⏳ Processing Instagram URL...");
  const r=await downloadVideo(url);try{await sock.sendMessage(msg.key.remoteJid,{video:r.buffer,mimetype:"video/mp4",caption:`📸 ${r.title}`},{quoted:msg});}finally{await cleanupDir(r.dir);}
 }};
