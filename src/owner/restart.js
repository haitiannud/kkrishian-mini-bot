import {config} from "../../config.js";
import {isOwner} from "../../utils/permissions.js";
export const command={name:"restart",description:"Restart bot process",
 async execute({msg,reply}){if(!isOwner(msg,config.ownerNumber))return reply("❌ Owner only.");await reply("♻️ Restarting...");setTimeout(()=>process.exit(0),500);}};
