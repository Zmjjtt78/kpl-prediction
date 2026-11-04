import {env} from 'cloudflare:workers';
export async function GET(){const e=env as unknown as Record<string,string>;return Response.json({standalone:e.STANDALONE_WEB==='1',github:e.STANDALONE_WEB==='1'&&!!e.GITHUB_CLIENT_ID&&!!e.GITHUB_CLIENT_SECRET&&(e.SESSION_SECRET?.length||0)>=32},{headers:{'Cache-Control':'no-store'}})}
