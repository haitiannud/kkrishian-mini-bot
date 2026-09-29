import {config} from "../../config.js";
import {isOwner} from "../../utils/permissions.js";
export const command={name:"setprefix",description:"Display configured prefix",
 async execute({msg,reply}){if(!isOwner(msg,config.ownerNumber))return reply("❌ Owner only.");await reply(`⚙️ Current prefix: ${config.prefix}\\nSet BOT_PREFIX in Railway Variables and redeploy.`);}};
