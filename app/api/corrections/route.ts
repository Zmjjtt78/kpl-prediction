import {getChatGPTUser} from '../../chatgpt-auth';
import {getDb} from '../../../db';
import {battleCache} from '../../../db/schema';
import {eq} from 'drizzle-orm';
export async function POST(req:Request){
 if(req.headers.get('origin')!==new URL(req.url).origin)return Response.json({error:'请求来源无效'},{status:403});
 const user=await getChatGPTUser();if(!user)return Response.json({error:'当前未登录，可先下载纠错记录保存；在线提交需要登录。'},{status:401});
 try{const text=await req.text();if(text.length>6000)return Response.json({error:'内容过长'},{status:413});const b=JSON.parse(text);
 if(typeof b.detail!=='string'||b.detail.trim().length<8||b.detail.length>2000||typeof b.subject!=='string'||!b.subject.trim()||b.subject.length>160)throw Error('请填写比赛／选手及至少8个字的问题说明');
 const source=String(b.source||'').slice(0,1000);if(source&&!/^https?:\/\//.test(source))throw Error('参考来源请填写完整的 http(s) 链接');
 const db=getDb(),rateKey='correction-rate:'+user.userId,last=await db.select().from(battleCache).where(eq(battleCache.id,rateKey)).get();if(last&&Date.now()-Number(last.fetchedAt)<60000)return Response.json({error:'已收到上一条，请在一分钟后提交下一条。'},{status:429});
 const id='correction:'+crypto.randomUUID(),at=String(Date.now());await db.insert(battleCache).values({id,payload:JSON.stringify({userId:user.userId,subject:b.subject.trim(),detail:b.detail.trim(),source,page:String(b.page||'').slice(0,300),status:'pending'}),fetchedAt:at});
 await db.insert(battleCache).values({id:rateKey,payload:'{}',fetchedAt:at}).onConflictDoUpdate({target:battleCache.id,set:{fetchedAt:at}});
 return Response.json({id:id.slice(11),status:'pending'});
 }catch(e){return Response.json({error:e instanceof Error?e.message:'提交失败，请下载记录保存后重试'},{status:400})}
}
