import {history} from '../../../lib/server-data';
import {RIVALRY_TEAM_IDS} from '../../../lib/team-scope';
export async function GET(){const teams=new Map<string,{id:string,name:string,icon:string}>();for(const m of history.slice().sort((a,b)=>a.date.localeCompare(b.date))){if(RIVALRY_TEAM_IDS.includes(m.a))teams.set(m.a,{id:m.a,name:m.an,icon:m.ai});if(RIVALRY_TEAM_IDS.includes(m.b))teams.set(m.b,{id:m.b,name:m.bn,icon:m.bi})}return Response.json({teams:[...teams.values()]},{headers:{'Cache-Control':'public, max-age=3600'}})}
