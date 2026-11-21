import React,{useState,useEffect,useRef,useCallback}from"react";
import{doc,updateDoc}from"firebase/firestore";

// ══════════════════ LECTURE OBLIGATOIRE AVANT LE QCM D'UN MODULE ══════════════════
// L'évaluation d'un module ne s'ouvre que lorsque la leçon a été lue : l'apprenant est descendu jusqu'à la fin
// de la leçon ET y a passé un temps minimal (proportionnel à sa longueur). L'examen final exigeant la réussite
// de tous les QCM de modules, il exige donc aussi la lecture de toutes les leçons.
// Trace : users/{uid}.progress["LU-<clé du score>"] = "lu" (valeur distincte de "done" : les compteurs de modules
// terminés ne changent pas). Un module déjà évalué (score enregistré) est considéré comme lu : acquis conservés.

export const cleLecture=cle=>`LU-${cle}`;

// Temps minimal sur la leçon, en secondes : environ 8 mots par seconde (lecture rapide), entre 40 s et 5 min
export function dureeMinLecture(contenu){
  const txt=typeof contenu==="string"?contenu:JSON.stringify(contenu||"");
  const mots=txt.replace(/[{}[\]",:*_]/g," ").split(/\s+/).filter(Boolean).length;
  return Math.min(300,Math.max(40,Math.round(mots/8)));
}

export function dejaLu(progress,scores,cle){
  if(!cle)return false;
  return !!((progress||{})[cleLecture(cle)]||((scores||{})[cle]&&scores[cle].pct!=null));
}

// État de lecture de la leçon ouverte. libre : aperçu administrateur ou formateur, tout est ouvert.
// Renvoie { lu, vu, reste, fin } ; fin est la référence à poser sur le bloc de fin de leçon.
export function useLecture({db,uid,cle,progress,scores,minSec=40,libre=false}){
  const initial=libre||dejaLu(progress,scores,cle);
  const[lu,sLu]=useState(initial),[vu,sVu]=useState(false),[reste,sReste]=useState(minSec);
  const debut=useRef(Date.now()),noeud=useRef(null),obs=useRef(null),ecrit=useRef(false);
  // Nouveau module : on repart de zéro (sauf s'il est déjà lu)
  useEffect(()=>{sLu(libre||dejaLu(progress,scores,cle));sVu(false);sReste(minSec);debut.current=Date.now();ecrit.current=false;},[cle,libre,minSec]);
  // Lecture constatée ailleurs (score ou trace arrivés de Firestore)
  useEffect(()=>{if(!lu&&dejaLu(progress,scores,cle))sLu(true);},[progress,scores,cle,lu]);
  // Fin de leçon atteinte : mémorisée, même si l'apprenant remonte ensuite
  const fin=useCallback(el=>{
    if(obs.current){obs.current.disconnect();obs.current=null;}
    noeud.current=el;
    if(!el)return;
    if(typeof IntersectionObserver==="undefined"){sVu(true);return;}
    obs.current=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting))sVu(true);},{threshold:.2});
    obs.current.observe(el);
  },[]);
  useEffect(()=>()=>{if(obs.current)obs.current.disconnect();},[]);
  // Minuterie jusqu'au déblocage
  useEffect(()=>{
    if(lu)return;
    const t=()=>{const r=Math.max(0,minSec-Math.floor((Date.now()-debut.current)/1000));sReste(r);if(r===0&&vu)sLu(true);};
    t();const id=setInterval(t,1000);return()=>clearInterval(id);
  },[lu,vu,minSec]);
  // Trace enregistrée une seule fois
  useEffect(()=>{
    if(!lu||libre||ecrit.current||!db||!uid||!cle||dejaLu(progress,scores,cle))return;
    ecrit.current=true;
    updateDoc(doc(db,"users",uid),{[`progress.${cleLecture(cle)}`]:"lu"}).catch(e=>console.warn("Lecture non enregistrée",e));
  },[lu,libre,db,uid,cle,progress,scores]);
  return{lu,vu,reste,fin};
}

const fmt=s=>s>=60?`${Math.floor(s/60)} min ${String(s%60).padStart(2,"0")} s`:`${s} s`;

// Bloc de fin de leçon : bouton vers l'évaluation une fois la leçon lue, sinon ce qu'il reste à faire.
export function FinLecon({K,lecture,col,libelle,onEval,consigne="Lisez la leçon jusqu'au bout"}){
  const{lu,vu,reste,fin}=lecture,c=col||K.em;
  if(lu)return <div ref={fin} style={{display:"flex",justifyContent:"center",margin:"6px 0 18px"}}>
    <button onClick={onEval} className="bt" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:7,minWidth:240,minHeight:46,padding:"10px 18px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${c},${c}CC)`,color:"#fff",fontWeight:800,fontSize:14.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
      <i className="ti ti-checklist" style={{fontSize:17}}/>{libelle}</button>
  </div>;
  return <div id="fin-lecon" ref={fin} role="status" style={{display:"flex",gap:11,alignItems:"flex-start",background:K.waBg,border:`1px solid ${K.waBd}`,borderRadius:14,padding:"13px 15px",margin:"6px 0 18px"}}>
    <i className="ti ti-lock" style={{fontSize:20,color:K.wa,marginTop:1}}/>
    <div style={{fontSize:13.5,color:K.t1,lineHeight:1.55}}>
      <b>Évaluation verrouillée.</b> {vu
        ?<>Merci d'avoir lu jusqu'ici. L'évaluation s'ouvre dans <b>{fmt(reste)}</b>, le temps minimal de lecture de ce module.</>
        :<>{consigne} : l'évaluation s'ouvre quand vous atteignez la fin{reste>0?<> et après au moins <b>{fmt(reste)}</b> de lecture</>:null}.</>}
      <div style={{fontSize:12.5,color:K.t3,marginTop:4}}>Lire la leçon puis réussir son QCM est obligatoire pour accéder à l'examen final.</div>
    </div>
  </div>;
}

// Onglet « Évaluation » de l'en-tête d'un module : tant que la leçon n'est pas lue, il ramène à la fin de la leçon
export const allerFinLecon=()=>{const el=document.getElementById("fin-lecon");if(el)el.scrollIntoView({behavior:"smooth",block:"center"});};

// Rappel affiché hors de la leçon (cas corrigés…) tant que la leçon n'est pas lue
export function RappelLecture({K,onLecon}){
  return <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap",background:K.waBg,border:`1px solid ${K.waBd}`,borderRadius:14,padding:"11px 14px",margin:"6px 0 18px"}}>
    <i className="ti ti-lock" style={{fontSize:18,color:K.wa}}/>
    <div style={{flex:1,minWidth:200,fontSize:13.5,color:K.t1,lineHeight:1.5}}>Le QCM s'ouvre une fois la leçon lue jusqu'au bout.</div>
    <button onClick={onLecon} className="bt" style={{background:"none",border:`1px solid ${K.waBd}`,borderRadius:10,padding:"7px 12px",color:K.wa,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Lire la leçon</button>
  </div>;
}
