import "dotenv/config";
import path from "node:path";
const dataDir = process.env.DATA_DIR || path.resolve(process.cwd(), "data");
export const config={botName:process.env.BOT_NAME||"Kkrishian Mini Bot",prefix:process.env.BOT_PREFIX||".",ownerNumber:(process.env.OWNER_NUMBER||"").replace(/\D/g,""),pairApiKey:process.env.PAIR_API_KEY||"",port:Number(process.env.PORT||3000),dataDir,sessionsDir:path.join(dataDir,"sessions"),tmpDir:path.resolve(process.cwd(),"tmp"),publicBaseUrl:process.env.PUBLIC_BASE_URL||"",defaultFreezeMinutes:Number(process.env.DEFAULT_FREEZE_MINUTES||180),maxDownloadMb:Number(process.env.MAX_DOWNLOAD_MB||100),ytDlpPath:process.env.YT_DLP_PATH||"yt-dlp",logLevel:process.env.LOG_LEVEL||"info"};
export const normalizeJid=(jid="")=>jid.replace(/:\d+(?=@)/,"");
export const numberToJid=n=>`${String(n).replace(/\D/g,"")}@s.whatsapp.net`;
