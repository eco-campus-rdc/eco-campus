import React,{useState}from"react";
import{lienParrainage,texteParrainage,lireConfigEssai}from"./essai";

// ══════════════════ ACCUEIL DE L'APPRENANT : ESSAI EN COURS, FIN D'ESSAI, PARRAINAGE ══════════════════
const CLE_FIN=uid=>`ec-essai-fin-vu-${uid}`;
const lire=k=>{try{return localStorage.getItem(k);}catch{return null;}};
const ecrire=(k,v)=>{try{localStorage.setItem(k,v);}catch{}};

export function BandeauEssai({K,mob,essai,abonne,reussites,onSub}){
  if(abonne||!essai||!essai.actif)return null;
  const bouton={background:"#fff",color:"#0A2A5C",border:"none",borderRadius:11,padding:"10px 16px",fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:6,minHeight:42};
  if(essai.enCours){
    const pct=Math.max(4,Math.round((essai.jours-essai.joursRestants)/essai.jours*100)),urgent=essai.joursRestants<=2;
    return <div style={{background:urgent?"linear-gradient(135deg,#7C2D12,#C2410C)":"linear-gradient(135deg,#052E16,#0A2A5C 60%,#1E4FA3)",borderRadius:18,padding:mob?"16px 15px":"18px 22px",color:"#fff",marginBottom:14,position:"relative",overflow:"hidden"}}>
      <i className="ti ti-gift" style={{position:"absolute",right:-6,bottom:-18,fontSize:110,opacity:.12}}/>
      <div style={{fontSize:12,fontWeight:800,letterSpacing:1,textTransform:"uppercase",opacity:.85}}>Essai complet{essai.parrainBonus?" · invité par un ami":""}</div>
      <div style={{fontSize:mob?19:22,fontWeight:900,margin:"4px 0 6px"}}>{essai.joursRestants>1?`Encore ${essai.joursRestants} jours pour tout explorer`:"Dernier jour d'essai !"}</div>
      <div style={{fontSize:13.5,opacity:.9,lineHeight:1.5,maxWidth:560}}>Tous les parcours, examens finaux, ateliers et cours audio sont ouverts. Les certificats sont délivrés aux abonnés{reussites?` · déjà ${reussites} évaluation${reussites>1?"s":""} réussie${reussites>1?"s":""}, bravo !`:"."}</div>
      <div style={{height:6,background:"rgba(255,255,255,.2)",borderRadius:99,margin:"12px 0",maxWidth:420,overflow:"hidden"}}><div style={{width:`${pct}%`,height:"100%",background:"#F2A93B",borderRadius:99}}/></div>
      <button onClick={onSub} className="bt" style={bouton}><i className="ti ti-crown"/>{urgent?"Garder mon accès":"Choisir mon abonnement"}</button>
    </div>;
  }
  return <div style={{background:K.card,border:`1px solid ${K.waBd||K.b1}`,borderRadius:16,padding:mob?"14px 14px":"16px 20px",marginBottom:14,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
    <i className="ti ti-hourglass-empty" style={{fontSize:26,color:K.wa}}/>
    <div style={{flex:1,minWidth:200}}>
      <div style={{fontWeight:800,fontSize:15,color:K.t1}}>Votre essai complet est terminé</div>
      <div style={{fontSize:13.5,color:K.t2,lineHeight:1.5}}>{reussites?`Vos ${reussites} évaluation${reussites>1?"s":""} réussie${reussites>1?"s sont conservées":" est conservée"}. `:"Votre progression est conservée. "}Les modules gratuits restent ouverts ; abonnez-vous pour tout débloquer et obtenir vos certificats.</div>
    </div>
    <button onClick={onSub} className="bt" style={{...bouton,background:`linear-gradient(135deg,${K.emD},${K.em})`,color:"#fff"}}><i className="ti ti-lock-open"/>Débloquer tout</button>
  </div>;
}

// Fenêtre affichée une seule fois, à la première connexion après la fin de l'essai
export function FinEssai({K,uid,essai,abonne,reussites,onSub,pret}){
  const[ferme,sFerme]=useState(false);
  if(ferme||!pret||abonne||!essai||!essai.actif||!essai.termine||lire(CLE_FIN(uid)))return null;
  const fermer=()=>{ecrire(CLE_FIN(uid),"1");sFerme(true);};
  return <div style={{position:"fixed",inset:0,background:"rgba(0,10,30,.55)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}} role="dialog" aria-modal="true">
    <div style={{background:K.card,borderRadius:20,padding:"22px 20px",maxWidth:420,width:"100%",textAlign:"center",boxShadow:"0 30px 80px rgba(0,0,0,.35)"}}>
      <div style={{fontSize:42}}>🎓</div>
      <div style={{fontWeight:900,fontSize:20,color:K.t1,margin:"6px 0"}}>Votre essai est terminé</div>
      <div style={{fontSize:14,color:K.t2,lineHeight:1.6,marginBottom:16}}>{reussites?<>Vous avez réussi <b>{reussites} évaluation{reussites>1?"s":""}</b> : votre progression est sauvegardée. </>:null}Abonnez-vous pour continuer là où vous en êtes, passer les examens finaux et obtenir vos certificats.</div>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        <button onClick={()=>{fermer();onSub();}} className="bt" style={{background:`linear-gradient(135deg,${K.emD},${K.em})`,color:"#fff",border:"none",borderRadius:12,padding:"12px",fontWeight:800,fontSize:15,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Je m'abonne</button>
        <button onClick={fermer} className="bt" style={{background:"none",border:"none",color:K.t2,fontWeight:700,fontSize:13.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif",padding:8}}>Continuer avec les modules gratuits</button>
      </div>
    </div>
  </div>;
}

export function CarteParrainage({K,mob,uid,gagnes=0,cfg}){
  const c=lireConfigEssai(cfg),lien=lienParrainage(uid,typeof window!=="undefined"?window.location.origin:undefined);
  const[copie,sCopie]=useState(false);
  const copier=()=>{try{navigator.clipboard.writeText(lien);sCopie(true);setTimeout(()=>sCopie(false),2000);}catch{}};
  const partager=async()=>{const t=texteParrainage(lien,c);if(navigator.share){try{await navigator.share({title:"Éco-Campus RDC",text:t});return;}catch{}}window.open(`https://wa.me/?text=${encodeURIComponent(t)}`,"_blank");};
  const btn=p=>({background:p?"#25D366":K.c2,color:p?"#fff":K.t1,border:p?"none":`1px solid ${K.b1}`,borderRadius:11,padding:"9px 14px",fontWeight:800,fontSize:13.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:6,minHeight:40});
  return <div style={{background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:16,padding:mob?"14px 14px":"16px 20px",marginBottom:14}}>
    <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
      <div style={{width:42,height:42,borderRadius:12,background:"#F2A93B22",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><i className="ti ti-users-plus" style={{fontSize:22,color:"#B7791F"}}/></div>
      <div style={{flex:1,minWidth:0}}>
        <div style={{fontWeight:800,fontSize:15,color:K.t1}}>Invitez vos amis, gagnez des jours d'accès</div>
        <div style={{fontSize:13.5,color:K.t2,lineHeight:1.5,marginTop:2}}>Vos amis ont <b>{c.jours+c.bonusParrain} jours d'essai</b> au lieu de {c.jours}. Pour chaque ami qui s'abonne, vous recevez <b>{c.recompenseJours} jours offerts</b>.{gagnes>0?<> Déjà <b>{gagnes} ami{gagnes>1?"s":""} abonné{gagnes>1?"s":""}</b> grâce à vous, merci !</>:null}</div>
      </div>
    </div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}>
      <button onClick={partager} className="bt" style={btn(true)}><i className="ti ti-brand-whatsapp"/>Partager mon lien</button>
      <button onClick={copier} className="bt" style={btn(false)}><i className={`ti ti-${copie?"check":"copy"}`}/>{copie?"Lien copié":"Copier le lien"}</button>
    </div>
  </div>;
}
