export const command={name:"runtime",aliases:["uptime"],description:"Show process uptime",
 async execute({reply}){const s=Math.floor(process.uptime()),h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;await reply(`⏱️ Runtime: ${h}h ${m}m ${sec}s`);}};
