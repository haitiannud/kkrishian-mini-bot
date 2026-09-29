import {config} from "../../config.js";
import {isOwner,senderJid} from "../../utils/permissions.js";
export const command={name:"id",aliases:["userid"],description:"Show user/chat ID",
 async execute({msg,reply}){if(!isOwner(msg,config.ownerNumber))return reply("❌ Owner only.");await reply(`🆔 Chat ID: ${msg.key.remoteJid}\\n👤 Sender: ${senderJid(msg)}`);}};
