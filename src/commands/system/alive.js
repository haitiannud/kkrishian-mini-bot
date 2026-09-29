import {config} from "../../config.js";export const command={name:"alive",async execute({reply}){await reply(`🟢 *${config.botName} is online!*\n⚡ System: Online`)}};
