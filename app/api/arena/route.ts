import {getArena,history} from '../../../lib/server-data';
export async function GET(req:Request){const data=await getArena();return Response.json({...data,...(new URL(req.url).searchParams.has("history")?{history:[...history.filter(x=>x.league!=='20260004'),...data.matches]}:{})},{headers:{'Cache-Control':'private, no-store'}});}
