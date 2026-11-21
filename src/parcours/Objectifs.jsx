import React,{useState}from"react";
import{OBJECTIFS,INTRO_OBJECTIFS}from"./objectifs";
import{objectifsModule,INTRO_MODULE}from"./objectifsModules";

// ══════════════════ OBJECTIFS DE LA FORMATION ══════════════════
// Carte affichée sous l'en-tête de chaque parcours : objectif général, puis ce que l'apprenant saura faire.
// Repliée, elle montre les NB_VISIBLES premières compétences et un bouton pour tout afficher.
// compact (carte de « Mes formations ») : un simple lien « Objectifs de la formation » qui déplie la liste.
// ObjectifsModule : les objectifs d'un module, en tête de sa leçon.
const NB_VISIBLES=3;

const Liste=({K,col,items})=><ul style={{listStyle:"none",margin:0,padding:0,display:"flex",flexDirection:"column",gap:7}}>
  {items.map((c,i)=><li key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13.5,color:K.t1,lineHeight:1.5}}>
    <i className="ti ti-circle-check" style={{fontSize:17,color:col,flexShrink:0,marginTop:1}}/><span>{c}</span></li>)}
</ul>;

export default function Objectifs({K,id,col,compact=false,ouvert:ouvertInitial=false}){
  const o=OBJECTIFS[id];
  const[ouvert,sOuvert]=useState(ouvertInitial);
  if(!o)return null;
  const c=col||K.em,n=o.competences.length;
  const bouton=(lib,ico)=><button onClick={e=>{e.stopPropagation();sOuvert(v=>!v);}} className="bt" aria-expanded={ouvert}
    style={{background:"none",border:"none",padding:0,color:c,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:5,minHeight:30}}>
    {lib}<i className={`ti ti-${ico}`} style={{fontSize:15}}/></button>;

  if(compact)return <div>
    {bouton(ouvert?"Masquer les objectifs":`Objectifs de la formation (${n})`,ouvert?"chevron-up":"target-arrow")}
    {ouvert&&<div style={{marginTop:6,marginBottom:6}}>
      <div style={{fontSize:12.5,color:K.t3,marginBottom:7}}>{INTRO_OBJECTIFS}</div>
      <Liste K={K} col={c} items={o.competences}/>
    </div>}
  </div>;

  const items=ouvert?o.competences:o.competences.slice(0,NB_VISIBLES);
  return <section aria-label="Objectifs de la formation" style={{background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:16,borderLeft:`4px solid ${c}`,padding:"14px 16px",marginBottom:14}}>
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
      <i className="ti ti-target-arrow" style={{fontSize:20,color:c}}/>
      <span style={{fontWeight:800,fontSize:15.5,color:K.t1}}>Objectifs de la formation</span>
    </div>
    <div style={{fontSize:13.5,color:K.t2,lineHeight:1.55,marginBottom:10}}>{o.general}</div>
    <div style={{fontSize:12.5,fontWeight:800,color:K.t3,letterSpacing:.4,textTransform:"uppercase",marginBottom:8}}>{INTRO_OBJECTIFS}</div>
    <Liste K={K} col={c} items={items}/>
    {n>NB_VISIBLES&&<div style={{marginTop:8}}>{bouton(ouvert?"Réduire":`Voir les ${n} objectifs`,ouvert?"chevron-up":"chevron-down")}</div>}
  </section>;
}

// Objectifs d'un module, en tête de la leçon (3 lignes en général)
export function ObjectifsModule({K,mod,col}){
  const items=objectifsModule(mod);
  if(!items.length)return null;
  const c=col||mod.col||K.em;
  return <section aria-label="Objectifs du module" style={{background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:14,borderLeft:`4px solid ${c}`,padding:"12px 14px",marginBottom:14}}>
    <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:4}}>
      <i className="ti ti-target-arrow" style={{fontSize:18,color:c}}/>
      <span style={{fontWeight:800,fontSize:14.5,color:K.t1}}>Objectifs du module</span>
    </div>
    <div style={{fontSize:12.5,color:K.t3,marginBottom:8}}>{INTRO_MODULE}</div>
    <Liste K={K} col={c} items={items}/>
  </section>;
}
