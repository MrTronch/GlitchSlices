// Geometría basada en Python, con ajustes artísticos para la versión web.

const integer=Math.trunc;
export function bodySlices(p,hands,W,H,mode,face=null){
 const result=[];
 const ls=p[11],rs=p[12],nose=p[0];
 const center=integer((ls.x+rs.x)*W*.5),shoulder=Math.abs(ls.x-rs.x)*W;
 const uneven=Math.abs((ls.visibility||0)-(rs.visibility||0))>.3;
 const width=Math.max(uneven?120:100,integer(shoulder*(uneven?2.5:2)));
 const left=Math.max(0,center-Math.floor(width/2)),right=Math.min(W,center+Math.floor(width/2));
 const mouthY=face?.mouthY??Math.max(p[9]?.y||nose.y,p[10]?.y||nose.y)*H;
 const top=Math.max(0,integer(Math.max(nose.y*H*1.1,mouthY+Math.abs(p[7].x-p[8].x)*W*.23)));
 const feet=[p[27],p[28],p[31],p[32]].filter(pt=>pt.visibility>.3);
 const bottom=Math.min(H,integer(feet.length?Math.max(...feet.map(pt=>pt.y))*H*1.05:Math.max(p[25].y,p[26].y)*H*1.4));
 const bw=right-left,bh=bottom-top;
 const add=(x0,y0,x1,y1,nw,nh,cx,cy=null)=>{
  if(x1<=x0||y1<=y0||nw<=0||nh<=0||y0>=H)return;
  const dx=Math.max(0,Math.min(cx-Math.floor(nw/2),W-nw));
  const dy=cy==null?y0:Math.max(0,cy-Math.floor(nh/2));
  const dw=Math.min(W-dx,nw),dh=Math.min(H-dy,nh);
  if(dw>0&&dh>0)result.push({source:[x0,y0,x1-x0,y1-y0],resize:[nw,nh],destination:[dx,dy,dw,dh]});
 };
 if(bw>20&&bh>20){
  if(mode===2){const sh=Math.max(12,Math.floor(bh/6));for(let i=0;i<6;i++){const start=top+i*sh,end=Math.min(start+(i>=4?integer(sh*3):sh),bottom),factor=(i+1)/6;add(left,start,right,end,integer(bw*[.65,.75,.85,.95,1.02,1.08][i]),integer((end-start)*(i>=4?1+factor*2:1)),center);}}
  else{const sequence=Array(6).fill(Math.max(12,Math.ceil(bh/6))),heights=[];let y=top;for(let i=0;i<6&&y<bottom;i++){const height=Math.min(sequence[i],bottom-y);if(height>0){heights.push(height);y+=height;}}y=top;heights.forEach((height,i)=>{const progress=heights.length>1?i/(heights.length-1):0;add(left,y,right,y+height,integer(bw*(1.05-progress*.43)),height,center);y+=height;});}
 }
 const hx=integer(nose.x*W),hy=integer(nose.y*H-(mode===3?30:20));
 const hw=Math.max(100,integer(Math.abs(p[7].x-p[8].x)*W*1.8)),hh=Math.max(120,integer(hw*1.1));
 const hl=Math.max(0,hx-Math.floor(hw/2)),hr=Math.min(W,hx+Math.floor(hw/2)),ht=Math.max(0,face?integer(face.top-face.fh*.4):hy-Math.floor(hh/2)),hb=Math.min(H,face?integer(mouthY+face.fh*.15):hy+Math.floor(hh/2));
 if(hr-hl>15&&hb-ht>15){const count=mode===2?8:4,sh=Math.max(mode===2?6:8,Math.floor((hb-ht)/count));for(let i=0;i<count;i++){const mouthStart=face?integer(mouthY-face.fh*.19):hb-sh,upperStep=Math.max(1,Math.floor((mouthStart-ht)/(count-1))),start=face?(i===count-1?mouthStart:ht+i*upperStep):ht+i*sh,end=face?(i===count-1?hb:ht+(i+1)*upperStep):Math.min(start+sh,hb),scale=mode===2?1.65-(i+1)/count*.65:1.85-i/(count-1)*.95;const nw=integer((hr-hl)*scale);if(nw>5)add(hl,start,hr,end,nw,end-start,hx);}}
 for(const hand of hands||[]){const xs=hand.map(pt=>pt.x*W),ys=hand.map(pt=>pt.y*H);const x0=Math.max(0,integer(Math.min(...xs))-30),x1=Math.min(W,integer(Math.max(...xs))+30),y0=Math.max(0,integer(Math.min(...ys))-30),y1=Math.min(H,integer(Math.max(...ys))+30);if(x1-x0>10&&y1-y0>10)add(x0,y0,x1,y1,integer((x1-x0)*1.2),integer((y1-y0)*1.2),Math.floor((x0+x1)/2),Math.floor((y0+y1)/2));}
 return result;
}


