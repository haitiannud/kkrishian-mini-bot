import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import { config } from "../config.js";

function runYtDlp(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(config.ytDlpPath, args, { env: process.env });
    let stdout = "", stderr = "";
    child.stdout.on("data", d => stdout += d.toString());
    child.stderr.on("data", d => stderr += d.toString());
    child.on("error", reject);
    child.on("close", code => code === 0 ? resolve(stdout.trim()) :
      reject(new Error(stderr.slice(-4000) || `yt-dlp exited with ${code}`)));
  });
}

export async function mediaInfo(url) {
  return JSON.parse(await runYtDlp(["--dump-single-json","--no-playlist","--no-warnings",url]));
}

export async function downloadVideo(url, maxMb = config.maxDownloadMb) {
  const dir = path.join(config.tmpDir, crypto.randomBytes(8).toString("hex"));
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "media.mp4");
  try {
    const info = await mediaInfo(url);
    await runYtDlp([
      "--no-playlist","--no-warnings","--max-filesize",`${maxMb}M`,
      "-f","bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4]/b",
      "--merge-output-format","mp4","-o",file,url
    ]);
    const stat = await fs.stat(file);
    if (stat.size > maxMb * 1024 * 1024) throw new Error("Media exceeds configured size limit.");
    return { buffer: await fs.readFile(file), title: info.title || "Video", duration: info.duration || null, dir };
  } catch (e) {
    await fs.rm(dir,{recursive:true,force:true}).catch(()=>{});
    throw e;
  }
}

export async function downloadAudio(url, maxMb = config.maxDownloadMb) {
  const dir = path.join(config.tmpDir, crypto.randomBytes(8).toString("hex"));
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, "audio.mp3");
  try {
    const info = await mediaInfo(url);
    await runYtDlp([
      "--no-playlist","--no-warnings","--max-filesize",`${maxMb}M`,
      "-x","--audio-format","mp3","--audio-quality","0","-o",file,url
    ]);
    const stat = await fs.stat(file);
    if (stat.size > maxMb * 1024 * 1024) throw new Error("Audio exceeds configured size limit.");
    return { buffer: await fs.readFile(file), title: info.title || "Audio", dir };
  } catch (e) {
    await fs.rm(dir,{recursive:true,force:true}).catch(()=>{});
    throw e;
  }
}

export async function cleanupDir(dir) {
  if (dir) await fs.rm(dir, { recursive: true, force: true }).catch(() => {});
}
