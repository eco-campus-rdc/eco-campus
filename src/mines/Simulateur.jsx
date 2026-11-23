import React,{useState}from"react";
import{SUBSTANCES,redevance}from"./calculs";
import{CaricatureAnimee}from"./Animation";

// ══════════════════ SIMULATEUR : REDEVANCE MINIÈRE ET SA RÉPARTITION (schéma « redevance ») ══════════════════
const fmt=n=>Math.round(n).toLocaleString("fr-FR").replace(/[  ]/g," ");
const num=s=>Number(String(s).replace(/[^\d,.]/g,"").replace(",","."))||0;
const pc=t=>`${String(Math.round(t*1000)/10).replace(".",",")} %`;

function SimRedevance({K,col}){
  const[sub,sSub]=useState("strategiques"),[val,sVal]=useState("1 000 000");
  const r=redevance({substance:sub,valeur:num(val)});
  const champ={width:"100%",boxSizing:"border-box",background:K.c2,border:`1px solid ${K.b1}`,borderRadius:10,padding:"10px 12px",fontSize:15,color:K.t1,fontFamily:"'Outfit',sans-serif"};
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10,marginBottom:12}}>
      <label><div style={{fontSize:12.5,fontWeight:800,color:K.t2,marginBottom:5}}>Substance</div>
        <select value={sub} onChange={e=>sSub(e.target.value)} style={champ}>{SUBSTANCES.map(s=><option key={s.id} value={s.id}>{s.l} ({pc(s.taux)})</option>)}</select></label>
      <label><div style={{fontSize:12.5,fontWeight:800,color:K.t2,marginBottom:5}}>Valeur commerciale brute (USD)</div>
        <input inputMode="decimal" value={val} onChange={e=>sVal(e.target.value)} style={champ}/></label>
    </div>
    <div style={{background:`${col}12`,border:`1px solid ${col}40`,borderRadius:12,padding:"12px 14px",marginBottom:10}}>
      <div style={{fontSize:13,color:K.t2}}>{r.substance.l} · ex. {r.substance.ex}</div>
      <div style={{fontSize:22,fontWeight:900,color:K.t1,marginTop:2,whiteSpace:"nowrap"}}>{fmt(r.montant)} USD</div>
      <div style={{fontSize:13,color:K.t2}}>de redevance minière, soit {pc(r.taux)} de {fmt(r.valeur)} USD</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:7}}>{r.parts.map(p=><div key={p.id}>
      <div style={{display:"flex",justifyContent:"space-between",gap:8,fontSize:13.5,color:K.t1}}><span>{p.l} <b>({pc(p.p)})</b></span><b style={{whiteSpace:"nowrap"}}>{fmt(p.m)} USD</b></div>
      <div style={{height:7,background:K.c2,borderRadius:99,overflow:"hidden",marginTop:3}}><div style={{width:`${p.p*100}%`,height:"100%",background:col}}/></div>
    </div>)}</div>
    <div style={{fontSize:13,color:K.t2,marginTop:10,lineHeight:1.5}}>Dotation minimale pour les projets de développement communautaire : <b style={{whiteSpace:"nowrap"}}>{fmt(r.dotation)} USD</b> si le chiffre d'affaires de l'exercice est égal à cette valeur (0,3 %, art. 258 bis).</div>
  </div>;
}

export const SCHEMAS_MINES={redevance:SimRedevance,animation:CaricatureAnimee};
