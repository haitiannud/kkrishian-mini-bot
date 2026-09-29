import { requireGroup, requireAdmin } from "../../utils/group.js";
export const command = { name:"unmute", description:"Open group chat",
  async execute({sock,msg,metadata,isGroup,reply}) {
    if(!await requireGroup(reply,isGroup) || !await requireAdmin(reply,msg,metadata)) return;
    await sock.groupSettingUpdate(msg.key.remoteJid,"not_announcement");
    await reply("🔊 Group unmuted.");
  }};
