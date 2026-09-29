import fs from "node:fs/promises"; import path from "node:path"; import {config} from "../config.js";
const names={users:"users.json",groups:"groups.json",stories:"stories.json"}; const cache={users:{},groups:{},stories:{}};
export async function initStore(){await fs.mkdir(config.dataDir,{recursive:true});await fs.mkdir(config.sessionsDir,{recursive:true});await fs.mkdir(config.tmpDir,{recursive:true});for(const [k,f] of Object.entries(names)){try{cache[k]=JSON.parse(await fs.readFile(path.join(config.dataDir,f),"utf8"));}catch{cache[k]={};await fs.writeFile(path.join(config.dataDir,f),"{}");}}}
async function save(k){await fs.writeFile(path.join(config.dataDir,names[k]),JSON.stringify(cache[k],null,2));}
export const getUser=id=>cache.users[id]||null;
export async function upsertUser(id,p={}){cache.users[id]={...(cache.users[id]||{}),...p,id};await save("users");return cache.users[id];}
export const getGroup=id=>cache.groups[id]||null;
export async function upsertGroup(id,p={}){cache.groups[id]={...(cache.groups[id]||{}),...p,id};await save("groups");return cache.groups[id];}
export function getStory(id){const s=cache.stories[id];if(!s)return null;if(s.expiresAt<Date.now()){delete cache.stories[id];save("stories").catch(()=>{});return null}return s;}
export async function setStory(id,s){cache.stories[id]=s;await save("stories");}
export async function deleteStory(id){delete cache.stories[id];await save("stories");}
