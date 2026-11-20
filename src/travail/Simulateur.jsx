import React,{useState}from"react";
import{preavis,CATEGORIES,JOURS_OUVRABLES_MOIS}from"./calculs";

// ══════════════════ SIMULATEUR : PRÉAVIS ET DÉCOMPTE DE FIN DE CONTRAT (schéma « preavis ») ══════════════════
const fmt=n=>Math.round(n).toLocaleString("fr-FR").replace(/[  ]/g," ");
const num=s=>Number(String(s).replace(/[^\d,.]/g,"").replace(",","."))||0;

function SimPreavis({K,col,defaut={}}){
  const[v,sV]=useState({categorie:defaut.categorie||"execution",annees:String(defaut.annees??3),salaire:fmt(defaut.salaire||520000),conges:String(defaut.conges??0)});
  const r=preavis({categorie:v.categorie,annees:num(v.annees),salaire:num(v.salaire),congesNonPris:num(v.conges)});
  const champ={width:"100%",boxSizing:"border-box",background:K.card,border:`1px solid ${K.b1}`,borderRadius:9,padding:"9px 11px",color:K.t1,fontSize:14,fontFamily:"'Outfit',sans-serif"};
  const L=({l,x,fort,c})=><div style={{display:"flex",justifyContent:"space-between",gap:10,padding:"6px 0",borderTop:`1px solid ${K.b0}`,fontSize:13.5,fontWeight:fort?900:500,color:c||(fort?K.t1:K.t2)}}><span style={{minWidth:0}}>{l}</span><span style={{fontFamily:"'JetBrains Mono',monospace",fontSize:13,textAlign:"right",...(/FC$/.test(String(x))?{whiteSpace:"nowrap",flexShrink:0}:{maxWidth:"48%"})}}>{x}</span></div>;
  const lab=(l,el)=><label style={{display:"block"}}><div style={{fontSize:12,fontWeight:700,color:K.t2,marginBottom:4}}>{l}</div>{el}</label>;
  return <div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:12}}>
      <div style={{gridColumn:"1 / -1"}}>{lab("Catégorie du travailleur",<select value={v.categorie} onChange={e=>sV({...v,categorie:e.target.value})} style={champ}>{Object.entries(CATEGORIES).map(([k,c])=><option key={k} value={k}>{c.l}</option>)}</select>)}</div>
      {lab("Années entières de service",<input value={v.annees} onChange={e=>sV({...v,annees:e.target.value})} inputMode="numeric" style={champ}/>)}
      {lab("Salaire mensuel (FC)",<input value={v.salaire} onChange={e=>sV({...v,salaire:e.target.value})} onBlur={()=>sV(x=>({...x,salaire:num(x.salaire)?fmt(num(x.salaire)):""}))} inputMode="numeric" style={champ}/>)}
      {lab("Jours de congé non pris",<input value={v.conges} onChange={e=>sV({...v,conges:e.target.value})} inputMode="numeric" style={champ}/>)}
    </div>
    <div style={{background:K.c2,border:`1px solid ${K.b0}`,borderRadius:12,padding:"10px 12px"}}>
      <div style={{fontSize:12.5,fontWeight:800,color:K.t1,marginBottom:4}}><i className="ti ti-calendar-time" style={{marginRight:5,color:col}}/>Fin d'un contrat à durée indéterminée</div>
      <L l="Préavis dû par l'employeur" x={r.libelle} fort c={col}/>
      <L l="Préavis dû par le travailleur (la moitié)" x={`${r.travailleurJours} jours ouvrables`}/>
      <L l="Jours de liberté pour chercher un emploi (1 par semaine)" x={`${r.joursLiberte} jours`}/>
      <L l="Indemnité si le préavis n'est pas presté (estimation)" x={`${fmt(r.indemnitePreavis)} FC`} fort/>
      <L l="Indemnité compensatoire de congé (estimation)" x={`${fmt(r.indemniteConge)} FC`}/>
      <L l="Plafond des dommages-intérêts si licenciement abusif" x={`${fmt(r.plafondDommages)} FC`}/>
      <div style={{fontSize:12,color:K.t3,marginTop:8,lineHeight:1.5}}>Estimations : un jour ouvrable vaut ici le salaire mensuel ÷ {JOURS_OUVRABLES_MOIS}. Une convention collective ou le contrat peuvent prévoir un préavis plus long. Les primes, commissions et avantages entrent aussi dans le calcul réel (art. 63 et 66).</div>
    </div>
  </div>;
}
export const SCHEMAS_TRAVAIL={preavis:SimPreavis};
