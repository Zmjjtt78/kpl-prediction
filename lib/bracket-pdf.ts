import {dependencies,type Match,type Pick} from './arena';
// Network-independent rendering: remote team badges never taint the export canvas.
export function drawBracketPDF(matches:Match[],actualMatches:Match[],picks:Record<string,Pick>,mode:string,champion:string){
 const canvas=document.createElement('canvas');canvas.width=2200;canvas.height=1600;
 const c=canvas.getContext('2d');if(!c)throw Error('浏览器无法生成晋级图');
 c.fillStyle='#f4f6fa';c.fillRect(0,0,2200,1600);c.fillStyle='#14253d';c.font='bold 46px sans-serif';c.fillText('逐冠 · 我的冠军之路',65,85);
 c.font='22px sans-serif';c.fillStyle='#52647d';c.fillText('2026 KPL年度总决赛 · '+mode+' · '+new Date().toLocaleString('zh-CN',{timeZone:'Asia/Shanghai'}),65,132);
 const nodes:Record<string,[number,number]>={
 '2026102701':[65,245],'2026102801':[65,410],'2026102901':[65,575],'2026103001':[65,740],
 '2026110201':[570,325],'2026110301':[570,655],'2026110601':[1075,490],'2026111401':[1700,700],
 '2026103101':[65,1110],'2026110101':[65,1320],'2026110401':[570,1110],'2026110501':[570,1320],
 '2026110701':[1075,1215],'2026110801':[1700,1215]};
 const w=390,h=145;
 c.font='bold 24px sans-serif';[['胜者组首轮',65],['胜者组半决赛',570],['胜者组决赛',1075],['总决赛',1700]].forEach(([name,x])=>c.fillText(String(name),Number(x),205));
 c.fillText('败者组 · 一次失利，仍有翻盘的可能',65,1045);
 c.strokeStyle='#d2dbe7';c.beginPath();c.moveTo(65,1005);c.lineTo(2090,1005);c.stroke();
 // Match the on-screen progression, with loser feeds labeled instead of crossing the entire board.
 for(const [target,refs]of Object.entries(dependencies)){const t=nodes[target];if(!t)continue;refs.forEach((ref,slot)=>{const s=nodes[ref.slice(1)];if(!s||ref[0]==='L')return;const x=s[0]+w,y=s[1]+h/2,tx=t[0],ty=t[1]+55+slot*39;c.strokeStyle='#7d91ad';c.lineWidth=2;c.setLineDash([]);c.beginPath();c.moveTo(x,y);const mid=(x+tx)/2;c.lineTo(mid,y);c.lineTo(mid,ty);c.lineTo(tx,ty);c.stroke()})}
 const actual=new Map(actualMatches.map(m=>[m.id,m]));
 for(const m of matches){const xy=nodes[m.id];if(!xy)continue;const [x,y]=xy,p=picks[m.id],valid=p&&p.a===m.a&&p.b===m.b;const scores=valid?(p.winner===m.a?[4,p.loserScore]:[p.loserScore,4]):m.status===2?[m.sa,m.sb]:['—','—'];
 c.fillStyle='#fff';c.strokeStyle=m.id==='2026111401'?'#9b762e':'#bac7d9';c.lineWidth=m.id==='2026111401'?3:1;c.beginPath();c.roundRect(x,y,w,h,10);c.fill();c.stroke();
 c.font='16px sans-serif';c.fillStyle='#61728b';c.fillText(m.date.slice(5)+' '+m.time+' · '+(valid?'我的预测':m.status===2?'实际赛果':'尚未填写'),x+18,y+26);
 [m.an,m.bn].forEach((name,i)=>{const winner=valid?p.winner===(i?m.b:m.a):m.status===2&&scores[i]>scores[1-i];c.fillStyle=winner?'#e4edff':'#f4f6fa';c.fillRect(x+12,y+36+i*39,w-24,36);c.fillStyle=winner?'#163c7c':'#24374f';c.font=(winner?'bold ':'')+'22px sans-serif';c.fillText(name.length>15?name.slice(0,14)+'…':name,x+23,y+62+i*39);c.fillText(String(scores[i]),x+w-43,y+62+i*39)});
 const a=actual.get(m.id);c.fillStyle='#687994';c.font='13px sans-serif';const losers=(dependencies[m.id]||[]).filter(r=>r[0]==='L').map(r=>{const source=matches.find(n=>n.id===r.slice(1));return source?source.stage+'败方':'上轮败方'}).join(' / ');c.fillText(a?.status===2?'实际 '+a.an+' '+a.sa+':'+a.sb+' '+a.bn:losers||'等待实际赛果',x+18,y+132,w-36);
 }
 c.fillStyle='#9b762e';c.font='bold 30px sans-serif';c.fillText('我预测的冠军：'+(champion||'尚未确定'),1550,340,560);
 c.fillStyle='#53667e';c.font='17px sans-serif';c.fillText('晋级预测模板 · 蓝色行为预测胜方；无预测的已结束比赛显示实际赛果。',65,1530);c.fillText('模拟可能改变对阵。预测仅供趣味参考，不代表真实赛果。',65,1565);
 return canvas;
}
