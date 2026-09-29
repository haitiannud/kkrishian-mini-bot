import {config} from "../../config.js";
export const command={name:"status",description:"Show bot status",
 async execute({reply}){await reply(`🟢 *${config.botName}*\\n\\nNode: ${process.version}\\nRuntime: ${Math.floor(process.uptime())}s\\nPrefix: ${config.prefix}`);}};
