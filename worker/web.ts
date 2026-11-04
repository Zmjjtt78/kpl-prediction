import handler from 'vinext/server/fetch-handler';
import {cookieValue,verifySession} from '../lib/web-session';
// Public Worker: remove caller-supplied platform identity and accept only a signed session.
export default {async fetch(request:Request,env:Cloudflare.Env&{SESSION_SECRET?:string},ctx:ExecutionContext){
 const headers=new Headers(request.headers);for(const name of [...headers.keys()])if(name.startsWith('oai-authenticated-'))headers.delete(name);
 const identity=env.SESSION_SECRET?await verifySession(cookieValue(request.headers.get('cookie')||'','__Host-kpl-session'),env.SESSION_SECRET):null;
 if(identity){headers.set('oai-authenticated-user-id',identity.id);headers.set('oai-authenticated-user-email',identity.id.slice(7)+'@users.noreply.github.com');headers.set('oai-authenticated-user-full-name',encodeURIComponent(identity.name));headers.set('oai-authenticated-user-full-name-encoding','percent-encoded-utf-8')}
 return handler.fetch(new Request(request,{headers}),env,ctx);
}};
