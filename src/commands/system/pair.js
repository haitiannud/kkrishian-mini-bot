import {config} from "../../config.js";export const command={name:"pair",async execute({reply}){await reply(`🔐 Pair your WhatsApp here:\n${config.publicBaseUrl||"Use your Railway domain"}/pair`)}};
