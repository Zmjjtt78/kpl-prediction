// A single-page PDF with a JPEG canvas snapshot. No fonts, network or PDF runtime required.
export function jpegPDF(jpeg:Uint8Array,width:number,height:number):Blob {
 if(jpeg[0]!==0xff||jpeg[1]!==0xd8||width<=0||height<=0)throw Error('导出图像无效');
 const encoder=new TextEncoder(),parts:Uint8Array[]=[],offsets=[0];let length=0;
 const append=(part:string|Uint8Array)=>{const bytes=typeof part==='string'?encoder.encode(part):part;parts.push(bytes);length+=bytes.length};
 const object=(id:number,content:string)=>{offsets[id]=length;append(id+' 0 obj\n'+content+'\nendobj\n')};
 append('%PDF-1.4\n');append(new Uint8Array([37,226,227,207,211,10]));
 object(1,'<< /Type /Catalog /Pages 2 0 R >>');
 object(2,'<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
 object(3,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 841.89 595.28] /Resources << /XObject << /Image1 4 0 R >> >> /Contents 5 0 R >>');
 offsets[4]=length;append('4 0 obj\n<< /Type /XObject /Subtype /Image /Width '+width+' /Height '+height+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpeg.length+' >>\nstream\n');append(jpeg);append('\nendstream\nendobj\n');
 const scale=Math.min(801.89/width,555.28/height),w=width*scale,h=height*scale,content='q\n'+w.toFixed(3)+' 0 0 '+h.toFixed(3)+' '+((841.89-w)/2).toFixed(3)+' '+((595.28-h)/2).toFixed(3)+' cm\n/Image1 Do\nQ\n';
 object(5,'<< /Length '+encoder.encode(content).length+' >>\nstream\n'+content+'endstream');
 object(6,'<< /Title (KPL prediction comparison) /Producer (Zhuguan) >>');
 const xref=length;append('xref\n0 7\n0000000000 65535 f \n');for(let i=1;i<=6;i++)append(String(offsets[i]).padStart(10,'0')+' 00000 n \n');append('trailer\n<< /Size 7 /Root 1 0 R /Info 6 0 R >>\nstartxref\n'+xref+'\n%%EOF\n');
 return new Blob(parts as BlobPart[],{type:'application/pdf'});
}
