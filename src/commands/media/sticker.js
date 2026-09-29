import fs from "node:fs/promises";
import path from "node:path";
import {makeTempDir,runProcess,downloadMessageMedia} from "../../utils/media.js";
export const command={name:"sticker",aliases:["s"],description:"Create a WhatsApp sticker from replied media",
 async execute({sock,msg,reply}) {
  const ctx=msg.message?.extendedTextMessage?.contextInfo;
  const quoted=ctx?.quotedMessage;
  if(!quoted?.imageMessage && !quoted?.videoMessage) return reply("Reply to an image/video with .sticker");
  const fake={message:quoted};
  const type=quoted.imageMessage?"image":"video";
  const input=await downloadMessageMedia(sock,fake,type);
  const dir=await makeTempDir("sticker"), inFile=path.join(dir,`input.${type==="image"?"jpg":"mp4"}`), outFile=path.join(dir,"sticker.webp");
  await fs.writeFile(inFile,input);
  await runProcess("ffmpeg",["-y","-i",inFile,"-vf","scale=512:512:force_original_aspect_ratio=decrease,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=0x00000000,fps=15", "-vcodec","libwebp","-lossless","0","-q:v","60",outFile]);
  const buf=await fs.readFile(outFile);
  await sock.sendMessage(msg.key.remoteJid,{sticker:buf},{quoted:msg});
  await fs.rm(dir,{recursive:true,force:true});
 }};
