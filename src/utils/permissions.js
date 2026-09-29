import {normalizeJid} from "../config.js";
export const senderJid=msg=>normalizeJid(msg.key.participant||msg.key.remoteJid||"");
export const isGroup=msg=>msg.key.remoteJid?.endsWith("@g.us");
export function isAdmin(msg,meta){const s=senderJid(msg);const p=meta?.participants?.find(x=>normalizeJid(x.id||"")===s);return Boolean(p?.admin);}
export const mentionedJid=(text="",ctx={})=>[...new Set([...(ctx.mentionedJid||[]),...[...text.matchAll(/@(\d{5,16})/g)].map(x=>`${x[1]}@s.whatsapp.net`)])];
