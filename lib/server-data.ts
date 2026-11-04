import legacy from './legacy-history.json';
import {getDb} from '../db';
import {battleCache} from '../db/schema';
import {eq} from 'drizzle-orm';
import leagues from './leagues.json';
import snapshotMeta from './snapshot-meta.json';
import raw from './history.json';
import {normalize,SCHEDULE_URL,type Match} from './arena';
const titles=new Map((leagues as any[]).map(l=>[String(l.league_id),l.league_name]));
export const history=[...(raw as any[]),...legacy].map(r=>normalize({...r,league_name:r.league_name||titles.get(String(r.league_id))}));
let cache:{at:number,matches:Match[],live:boolean}|undefined,pending:Promise<{at:number,matches:Match[],live:boolean}>|undefined,retryAfter=0,lastSaved=0;
const fallback=()=>cache?{...cache,live:false}:{at:snapshotMeta.at,matches:history.filter(x=>x.league==='20260004'),live:false};
async function bounded<T>(work:Promise<T>,ms:number):Promise<T|undefined>{let timer:ReturnType<typeof setTimeout>;try{return await Promise.race([work,new Promise<undefined>(r=>{timer=setTimeout(()=>r(undefined),ms)})])}finally{clearTimeout(timer!)}}
export async function getArena(){
 if(cache&&Date.now()-cache.at<10000)return cache;
 if(Date.now()<retryAfter)return fallback();
 if(pending)return (await bounded(pending,4000))||fallback();
 pending=(async()=>{try{
  const r=await fetch(SCHEDULE_URL,{signal:AbortSignal.timeout(2500)});if(!r.ok)throw Error('upstream');
  const j:any=await r.json();if(j.code!==200||!Array.isArray(j.results)||!j.results.length)throw Error('shape');
  cache={at:Date.now(),matches:j.results.map(normalize),live:true};retryAfter=0;
  if(Date.now()-lastSaved>30000){lastSaved=Date.now();try{await bounded(getDb().insert(battleCache).values({id:'arena:20260004',payload:JSON.stringify(cache.matches),fetchedAt:String(cache.at)}).onConflictDoUpdate({target:battleCache.id,set:{payload:JSON.stringify(cache.matches),fetchedAt:String(cache.at)}}).run(),500)}catch{}}
  return cache;
 }catch{
  retryAfter=Date.now()+15000;
  try{const row=await bounded(getDb().select().from(battleCache).where(eq(battleCache.id,'arena:20260004')).get(),700);if(row&&Number(row.fetchedAt)>(cache?.at||snapshotMeta.at))cache={at:Number(row.fetchedAt),matches:JSON.parse(row.payload),live:false}}catch{}
  return fallback();
 }})().finally(()=>pending=undefined);
 // A total deadline also covers slow response bodies or storage. Never report a snapshot as live.
 return (await bounded(pending,4000))||fallback();
}
