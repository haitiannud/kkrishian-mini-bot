import {downloadVideo,cleanupDir,downloadAudio} from "../../services/downloader.js";
export const command={name:"youtube",aliases:["yt","video","play"],description:"Download a public YouTube-supported video",
 async execute({sock,msg,args,reply}){const url=args.find(x=>/^https?:\/\//i.test(x));if(!url)return reply("Usage: .yt <YouTube URL>");
  await reply("⏳ Downloading video...");
  const r=await downloadVideo(url); try{await sock.sendMessage(msg.key.remoteJid,{video:r.buffer,mimetype:"video/mp4",caption:`🎬 ${r.title}`},{quoted:msg});}finally{await cleanupDir(r.dir);}
 }};
