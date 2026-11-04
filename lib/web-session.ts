// Independent web deployment sessions. HMAC is verified before identity is trusted.
export type WebIdentity={id:string,name:string,exp:number};
const enc=new TextEncoder();
const b64=(bytes:Uint8Array)=>btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
const bytes=(value:string)=>Uint8Array.from(atob(value.replace(/-/g,'+').replace(/_/g,'/')),c=>c.charCodeAt(0));
async function key(secret:string){if(secret.length<32)throw Error('SESSION_SECRET至少32字符');return crypto.subtle.importKey('raw',enc.encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign','verify'])}
export async function signSession(user:WebIdentity,secret:string){const body=b64(enc.encode(JSON.stringify(user))),signature=await crypto.subtle.sign('HMAC',await key(secret),enc.encode(body));return body+'.'+b64(new Uint8Array(signature))}
export async function verifySession(value:string,secret:string):Promise<WebIdentity|null>{try{const [body,sig,...extra]=value.split('.');if(!body||!sig||extra.length||value.length>3000)return null;if(!await crypto.subtle.verify('HMAC',await key(secret),bytes(sig),enc.encode(body)))return null;const user=JSON.parse(new TextDecoder().decode(bytes(body)));return typeof user.id==='string'&&/^github:\d+$/.test(user.id)&&typeof user.name==='string'&&user.name.length<200&&Number.isFinite(user.exp)&&user.exp>Date.now()?user:null}catch{return null}}
export function cookieValue(cookie:string,name:string){return cookie.split(';').map(x=>x.trim()).find(x=>x.startsWith(name+'='))?.slice(name.length+1)||''}
export const sessionCookie=(value:string,age=604800)=>'__Host-kpl-session='+value+'; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age='+age;
