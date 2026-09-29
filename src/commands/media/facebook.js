import {downloadVideo,cleanupDir} from "../../services/downloader.js";
export const command={name:"facebook",aliases:["fb"],description:"Download public Facebook media when yt-dlp supports it",
 async execute({sock,msg,args,reply}){const url=args.find(x=>/^https?:\/\//i.test(x));if(!url)return reply("Usage: .facebook <public URL>");
  await reply("⏳ Processing Facebook URL...");
  const r=await downloadVideo(url);try{await sock.sendMessage(msg.key.remoteJid,{video:r.buffer,mimetype:"video/mp4",caption:`📘 ${r.title}`},{quoted:msg});}finally{await cleanupDir(r.dir);}
 }};
