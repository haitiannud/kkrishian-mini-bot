export const hasUrl=t=>/(https?:\/\/|www\.|(?:^|\s)(?:instagram\.com|youtube\.com|youtu\.be|facebook\.com|fb\.watch|tiktok\.com)\b)/i.test(t);
export const randomId=p=>`${p}-${Math.random().toString(36).slice(2,8).toUpperCase()}`;
