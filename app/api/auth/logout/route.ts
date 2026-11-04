import {sessionCookie} from '../../../../lib/web-session';
export async function POST(req:Request){if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'请求来源无效'},{status:403});return new Response(null,{status:303,headers:{Location:'/account','Set-Cookie':sessionCookie('',0)}})}
