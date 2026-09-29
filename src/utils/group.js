import { isAdmin } from "./permissions.js";

export async function requireGroup(reply, isGroup) {
  if (!isGroup) {
    await reply("❌ This command can only be used in a group.");
    return false;
  }
  return true;
}

export async function requireAdmin(reply, msg, metadata) {
  if (!isAdmin(msg, metadata)) {
    await reply("❌ Admin only.");
    return false;
  }
  return true;
}

export function allParticipants(metadata) {
  return (metadata?.participants || []).map(p => p.id || p.jid).filter(Boolean);
}
