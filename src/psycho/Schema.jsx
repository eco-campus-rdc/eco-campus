import React,{useId}from"react";
import{decrire}from"./visuels";

// ══════════════════ DESSIN DES TESTS VISUELS (SVG) ══════════════════
// Schema : énoncé dessiné (suite, matrice, intrus, miroir, dominos, cartes, roue, triangles, pyramide, engrenages).
// OptionDessin : option de réponse dessinée (figure, domino, carte). Encre = K.t1 : lisible en thème clair et sombre.

const ROUGE="#D92D20";
const POS={1:[[0,0]],2:[[-13,0],[13,0]],3:[[0,-12],[-13,11],[13,11]],4:[[-12,-12],[12,-12],[-12,12],[12,12]],5:[[-14,-14],[14,-14],[0,0],[-14,14],[14,14]],6:[[-16,-10],[0,-10],[16,-10],[-16,10],[0,10],[16,10]]};
const RAY={1:20,2:11,3:10,4:10,5:8,6:7.5};
const poly=(k,R,dep=-90)=>Array.from({length:k},(_,i)=>{const a=(dep+i*360/k)*Math.PI/180;return`${(R*Math.cos(a)).toFixed(2)},${(R*Math.sin(a)).toFixed(2)}`;}).join(" ");
const etoile=R=>Array.from({length:10},(_,i)=>{const a=(-90+i*36)*Math.PI/180,r=i%2?R*.42:R;return`${(r*Math.cos(a)).toFixed(2)},${(r*Math.sin(a)).toFixed(2)}`;}).join(" ");

function Forme({f,R,ink,remp}){
  const p={fill:remp,stroke:ink,strokeWidth:2,strokeLinejoin:"round"};
  switch(f){
    case"cercle":return <circle r={R*.88} {...p}/>;
    case"carre":return <polygon points={poly(4,R*1.05,-45)} {...p}/>;
    case"triangle":return <polygon points={poly(3,R*1.08)} transform={`translate(0 ${R*.15})`} {...p}/>;
    case"losange":return <polygon points={poly(4,R*1.05)} transform="scale(.8 1)" {...p}/>;
    case"pentagone":return <polygon points={poly(5,R)} transform={`translate(0 ${R*.06})`} {...p}/>;
    case"hexagone":return <polygon points={poly(6,R,0)} {...p}/>;
    case"etoile":return <polygon points={etoile(R*1.05)} transform={`translate(0 ${R*.08})`} {...p}/>;
    case"fleche":return <polygon points={[[0,-1],[.62,-.1],[.22,-.1],[.22,1],[-.22,1],[-.22,-.1],[-.62,-.1]].map(([x,y])=>`${x*R},${y*R}`).join(" ")} {...p}/>;
    case"L":{const u=R*.55;return <polygon points={[[-u,-1.5*u],[0,-1.5*u],[0,.5*u],[u,.5*u],[u,1.5*u],[-u,1.5*u]].map(([x,y])=>`${x+u*.0},${y}`).join(" ")} {...p}/>;}
    default:return null;
  }
}

// Une figure dans une case carrée de 60 unités (sans cadre)
function Figure({fig,ink,fond,hatch}){
  if(fig.f==="cadre"){const c=[[-17,-17],[17,-17],[17,17],[-17,17]][fig.pt||0];
    return <g><rect x={-24} y={-24} width={48} height={48} rx={3} fill="none" stroke={ink} strokeWidth={2}/><circle cx={c[0]} cy={c[1]} r={5.5} fill={ink}/></g>;}
  const n=Math.min(6,Math.max(1,fig.n||1)),R=RAY[n],remp=fig.p==="plein"?ink:fig.p==="raye"?`url(#${hatch})`:fond;
  return <g>{POS[n].map(([x,y],i)=><g key={i} transform={`translate(${x} ${y}) rotate(${fig.r||0})${fig.m?" scale(-1 1)":""}`}><Forme f={fig.f} R={R} ink={ink} remp={remp}/></g>)}</g>;
}

const useHatch=()=>`h${useId().replace(/[^a-zA-Z0-9]/g,"")}`;
const Hachures=({id,ink})=><defs><pattern id={id} width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1={0} y1={0} x2={0} y2={5} stroke={ink} strokeWidth={1.7}/></pattern></defs>;

// Case d'une suite ou d'une matrice : figure, ou « ? »
export function Case({K,fig,taille=60,marque,lettre}){
  const hatch=useHatch(),vide=fig==null;
  return <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:3}}>
    <svg viewBox="-30 -30 60 60" width={taille} height={taille} role="img" aria-label={vide?"case à trouver":decrire(fig)}
      style={{background:vide?K.inBg:K.card,border:`1.5px ${vide?"dashed":"solid"} ${vide?K.in_:marque||K.b1}`,borderRadius:10,flexShrink:0}}>
      <Hachures id={hatch} ink={K.t1}/>
      {vide?<text x={0} y={9} textAnchor="middle" fontSize={26} fontWeight={800} fill={K.in_}>?</text>:<Figure fig={fig} ink={K.t1} fond={K.card} hatch={hatch}/>}
    </svg>
    {lettre&&<span style={{fontSize:12.5,fontWeight:800,color:K.t2}}>{lettre}</span>}
  </div>;
}

// Domino horizontal (valeurs 0 à 6)
const PIPS={0:[],1:[[0,0]],2:[[-1,-1],[1,1]],3:[[-1,-1],[0,0],[1,1]],4:[[-1,-1],[1,-1],[-1,1],[1,1]],5:[[-1,-1],[1,-1],[0,0],[-1,1],[1,1]],6:[[-1,-1],[1,-1],[-1,0],[1,0],[-1,1],[1,1]]};
export function Domino({K,d,h=40}){
  const vide=d==null;
  return <svg viewBox="0 0 84 42" width={h*2} height={h} role="img" aria-label={vide?"domino à trouver":`domino ${d[0]} | ${d[1]}`} style={{flexShrink:0}}>
    <rect x={1} y={1} width={82} height={40} rx={7} fill={vide?K.inBg:K.card} stroke={vide?K.in_:K.t1} strokeWidth={1.8} strokeDasharray={vide?"4 3":undefined}/>
    {vide?<text x={42} y={29} textAnchor="middle" fontSize={22} fontWeight={800} fill={K.in_}>?</text>:<>
      <line x1={42} y1={6} x2={42} y2={36} stroke={K.t1} strokeWidth={1.5}/>
      {[0,1].map(k=>PIPS[d[k]].map(([x,y],i)=><circle key={`${k}-${i}`} cx={21+k*42+x*10} cy={21+y*10} r={3.6} fill={K.t1}/>))}
    </>}
  </svg>;
}

// Carte à jouer
export function Carte({K,c,h=66}){
  const vide=c==null,rouge=!vide&&(c.c==="♥"||c.c==="♦"),col=rouge?ROUGE:K.t1;
  return <svg viewBox="0 0 46 66" width={h*46/66} height={h} role="img" aria-label={vide?"carte à trouver":decrire({carte:c})} style={{flexShrink:0}}>
    <rect x={1} y={1} width={44} height={64} rx={5} fill={vide?K.inBg:K.card} stroke={vide?K.in_:K.t1} strokeWidth={1.6} strokeDasharray={vide?"4 3":undefined}/>
    {vide?<text x={23} y={41} textAnchor="middle" fontSize={24} fontWeight={800} fill={K.in_}>?</text>:<>
      <text x={5} y={15} fontSize={12} fontWeight={800} fill={col}>{c.v}</text>
      <text x={23} y={44} textAnchor="middle" fontSize={24} fill={col}>{c.c}</text>
      <text x={41} y={61} textAnchor="end" fontSize={12} fontWeight={800} fill={col}>{c.v}</text>
    </>}
  </svg>;
}

// Option de réponse dessinée
export function OptionDessin({K,o,taille=52}){
  if(o.domino)return <Domino K={K} d={o.domino} h={Math.round(taille*.72)}/>;
  if(o.carte)return <Carte K={K} c={o.carte} h={taille+8}/>;
  if(o.fig)return <Case K={K} fig={o.fig} taille={taille}/>;
  return null;
}
export const estDessin=o=>!!(o&&typeof o==="object"&&(o.fig||o.domino||o.carte));

const Nombre=({x,y,v,K,taille=15})=>v==null
  ?<g><circle cx={x} cy={y} r={taille*.85} fill={K.inBg} stroke={K.in_} strokeWidth={1.5} strokeDasharray="3 2"/><text x={x} y={y+taille*.36} textAnchor="middle" fontSize={taille} fontWeight={800} fill={K.in_}>?</text></g>
  :<text x={x} y={y+taille*.36} textAnchor="middle" fontSize={taille} fontWeight={800} fill={K.t1}>{v}</text>;

function Roue({K,items}){
  const n=items.length,R=78,c=90;
  return <svg viewBox="0 0 180 180" width={180} height={180} role="img" aria-label={`roue : ${items.map(v=>v??"?").join(", ")}`}>
    <circle cx={c} cy={c} r={R} fill={K.card} stroke={K.t1} strokeWidth={2}/>
    {items.map((_,i)=>{const a=(-90+i*360/n)*Math.PI/180;return <line key={i} x1={c} y1={c} x2={c+R*Math.cos(a)} y2={c+R*Math.sin(a)} stroke={K.t1} strokeWidth={1.3}/>;})}
    <circle cx={c} cy={c} r={6} fill={K.t1}/>
    {items.map((v,i)=>{const a=(-90+(i+.5)*360/n)*Math.PI/180;return <Nombre key={i} K={K} x={c+R*.62*Math.cos(a)} y={c+R*.62*Math.sin(a)} v={v} taille={17}/>;})}
  </svg>;
}

function Triangle({K,t}){
  const[h,g,d,c]=t;
  return <svg viewBox="0 0 120 108" width={120} height={108} role="img" aria-label={`triangle : haut ${h??"?"}, gauche ${g??"?"}, droite ${d??"?"}, centre ${c??"?"}`}>
    <polygon points="60,22 18,92 102,92" fill={K.card} stroke={K.t1} strokeWidth={2} strokeLinejoin="round"/>
    <Nombre K={K} x={60} y={11} v={h}/><Nombre K={K} x={10} y={100} v={g}/><Nombre K={K} x={110} y={100} v={d}/>
    <Nombre K={K} x={60} y={68} v={c} taille={17}/>
  </svg>;
}

function Pyramide({K,rangs}){
  const L=46,H=32,W=rangs.length*L+8,Ht=rangs.length*H+8;
  return <svg viewBox={`0 0 ${W} ${Ht}`} width={W} height={Ht} role="img" aria-label="pyramide de nombres">
    {rangs.map((r,i)=>{const x0=(W-r.length*L)/2;return r.map((v,j)=><g key={`${i}-${j}`}>
      <rect x={x0+j*L+1} y={4+i*H} width={L-2} height={H-3} rx={4} fill={v==null?K.inBg:K.card} stroke={v==null?K.in_:K.t1} strokeWidth={1.6} strokeDasharray={v==null?"4 3":undefined}/>
      <text x={x0+j*L+L/2} y={4+i*H+H/2+4} textAnchor="middle" fontSize={15} fontWeight={800} fill={v==null?K.in_:K.t1}>{v==null?"?":v}</text>
    </g>);})}
  </svg>;
}

function roueDentee(r,dents){
  const n=dents||Math.max(8,Math.round(r/2.6)),ext=r,int=r-5,pts=[];
  for(let k=0;k<n;k++){const a0=k*2*Math.PI/n,da=2*Math.PI/n;
    [[a0,int],[a0+da*.15,ext],[a0+da*.5,ext],[a0+da*.65,int]].forEach(([a,rr])=>pts.push(`${(rr*Math.cos(a)).toFixed(2)},${(rr*Math.sin(a)).toFixed(2)}`));}
  return pts.join(" ");
}
function Engrenages({K,roues,sens}){
  const bas=Math.max(...roues.map(g=>g.y+g.r)),W=Math.max(...roues.map(g=>g.x+g.r))+12,Ht=bas+(roues.some(g=>g.label)?26:12);
  const a=roues[0],ar=a.r+9;
  return <svg viewBox={`0 0 ${W} ${Ht}`} width="100%" style={{maxWidth:Math.min(W*1.5,420)}} role="img" aria-label={`${roues.length} engrenages ; la roue A tourne ${sens==="h"?"dans le sens des aiguilles d'une montre":"en sens inverse"}`}>
    <defs><marker id="fl-eng" viewBox="0 0 10 10" refX={6} refY={5} markerWidth={6} markerHeight={6} orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill={K.in_}/></marker></defs>
    {roues.map((g,i)=><g key={i} transform={`translate(${g.x} ${g.y})`}>
      <polygon points={roueDentee(g.r,g.dents)} fill={K.c2} stroke={K.t1} strokeWidth={1.4} strokeLinejoin="round"/>
      {g.r>=30?<>
        <circle r={g.r*.14} fill={K.card} stroke={K.t1} strokeWidth={1.4}/>
        <text y={-g.r*.14-5} textAnchor="middle" fontSize={15} fontWeight={800} fill={K.t1}>{String.fromCharCode(65+i)}</text>
      </>:<><circle r={g.r*.55} fill={K.card} stroke={K.t1} strokeWidth={1.2}/>
        <text y={g.r*.2} textAnchor="middle" fontSize={g.r*.62} fontWeight={800} fill={K.t1}>{String.fromCharCode(65+i)}</text></>}
      {g.label&&<text y={bas-g.y+18} textAnchor="middle" fontSize={11} fontWeight={700} fill={K.t2}>{g.label}</text>}
    </g>)}
    {a.y-ar>2&&<path d={`M ${a.x-ar*.8} ${a.y-ar*.6} A ${ar} ${ar} 0 0 1 ${a.x+ar*.8} ${a.y-ar*.6}`} fill="none" stroke={K.in_} strokeWidth={2.6} markerEnd={sens==="h"?"url(#fl-eng)":undefined} markerStart={sens==="h"?undefined:"url(#fl-eng)"}/>}
  </svg>;
}

export default function Schema({K,s}){
  if(!s)return null;
  const rang={display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center",alignItems:"center"};
  let corps=null;
  if(s.t==="suite")corps=<div style={rang}>{s.items.map((f,i)=><Case key={i} K={K} fig={f}/>)}</div>;
  else if(s.t==="matrice")corps=<div style={{display:"grid",gridTemplateColumns:"repeat(3,70px)",gap:6,justifyContent:"center"}}>{s.cells.map((f,i)=><Case key={i} K={K} fig={f} taille={70}/>)}</div>;
  else if(s.t==="intrus")corps=<div style={rang}>{s.items.map((f,i)=><Case key={i} K={K} fig={f} lettre={String.fromCharCode(65+i)}/>)}</div>;
  else if(s.t==="miroir")corps=<div style={{...rang,gap:0}}><Case K={K} fig={s.item} taille={64}/><div aria-hidden style={{width:2,height:84,margin:"0 14px",backgroundImage:`linear-gradient(${K.in_} 50%,transparent 50%)`,backgroundSize:"2px 8px"}}/><Case K={K} fig={null} taille={64}/></div>;
  else if(s.t==="dominos")corps=<div style={rang}>{s.items.map((d,i)=><Domino key={i} K={K} d={d} h={34}/>)}</div>;
  else if(s.t==="cartes")corps=<div style={rang}>{s.items.map((c,i)=><Carte key={i} K={K} c={c}/>)}</div>;
  else if(s.t==="roue")corps=<div style={rang}><Roue K={K} items={s.items}/></div>;
  else if(s.t==="triangles")corps=<div style={rang}>{s.items.map((t,i)=><Triangle key={i} K={K} t={t}/>)}</div>;
  else if(s.t==="pyramide")corps=<div style={rang}><Pyramide K={K} rangs={s.rangs}/></div>;
  else if(s.t==="engrenages")corps=<div style={rang}><Engrenages K={K} roues={s.roues} sens={s.sens}/></div>;
  return <div style={{background:K.c2,border:`1px solid ${K.b0}`,borderRadius:14,padding:"14px 10px",margin:"0 0 18px"}}>{corps}</div>;
}
