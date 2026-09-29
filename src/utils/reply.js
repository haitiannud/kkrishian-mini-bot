export const reply=(sock,msg,text,extra={})=>sock.sendMessage(msg.key.remoteJid,{text,...extra},{quoted:msg});
