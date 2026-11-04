'use client';
import {Shield} from 'lucide-react';
export function TeamIcon({name,src}:{name:string,src?:string}){return <span className="team-icon">{src&&name!=='待定'?<img src={src} alt="" onError={e=>{e.currentTarget.style.display='none';}}/>:<Shield size={19}/>}</span>;}
export const short=(s:string)=>s.replace(/北京|广州|重庆|长沙|上海|杭州|成都|深圳|南通/g,'');
