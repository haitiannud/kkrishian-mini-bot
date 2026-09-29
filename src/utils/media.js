import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { config } from "../config.js";

export async function downloadMessageMedia(sock, msg, messageType = "image") {
  const { downloadContentFromMessage } = await import("@whiskeysockets/baileys");
  const content = msg.message?.[messageType + "Message"];
  if (!content) throw new Error(`No ${messageType} media found.`);
  const stream = await downloadContentFromMessage(content, messageType);
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export function runProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { ...options });
    let stdout = "";
    let stderr = "";
    child.stdout?.on("data", d => stdout += d.toString());
    child.stderr?.on("data", d => stderr += d.toString());
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve(stdout) : reject(new Error(stderr || `${command} exited ${code}`)));
  });
}

export async function makeTempDir(prefix = "media") {
  const dir = path.join(config.tmpDir, `${prefix}-${crypto.randomBytes(6).toString("hex")}`);
  await fs.mkdir(dir, { recursive: true });
  return dir;
}
