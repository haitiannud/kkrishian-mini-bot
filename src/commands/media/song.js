import {downloadAudio,cleanupDir} from "../../services/downloader.js";
export const command={name:"song",aliases:["ytmp3","audio"],description:"Download audio from a supported public URL",
 async execute({sock,msg,args,reply}){const url=args.find(x=>/^https?:\/\//i.test(x));if(!url)return reply("Usage: .song <URL>");
  await reply("⏳ Extracting audio...");
  const r=await downloadAudio(url);try{await sock.sendMessage(msg.key.remoteJid,{audio:r.buffer,mimetype:"audio/mpeg",fileName:`${r.title.replace(/[^\w.-]+/g,"_")}.mp3`},{quoted:msg});}finally{await cleanupDir(r.dir);}
 }};
