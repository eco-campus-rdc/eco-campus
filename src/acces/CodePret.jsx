import React,{useState}from"react";

// ══════════════════ « VOTRE CODE D'ACCÈS EST PRÊT » (ACCUEIL DE L'APPRENANT) ══════════════════
// Quand l'administrateur a validé le paiement, le code est déjà enregistré sur le compte de l'apprenant : il l'active
// en un geste, sans avoir à le recopier depuis l'e-mail ou le message.
export default function CodePret({K,mob,code,duree,expiration,onActiver}){
  const[enc,sEnc]=useState(false),[err,sErr]=useState("");
  const activer=async()=>{sEnc(true);sErr("");try{const r=await onActiver();if(r&&r.err)sErr(r.err);}catch(e){sErr(e.message||String(e));}sEnc(false);};
  return <div role="status" style={{background:`linear-gradient(135deg,${K.emBg},${K.card})`,border:`2px solid ${K.em}`,borderRadius:16,padding:mob?"14px":"16px 20px",marginBottom:14,display:"flex",gap:12,alignItems:"flex-start",flexWrap:"wrap"}}>
    <div style={{width:44,height:44,borderRadius:12,background:K.em,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><i className="ti ti-key" style={{fontSize:23}}/></div>
    <div style={{flex:1,minWidth:200}}>
      <div style={{fontWeight:900,fontSize:16,color:K.t1}}>Votre paiement est validé : votre accès est prêt 🎉</div>
      <div style={{fontSize:13.5,color:K.t2,lineHeight:1.55,marginTop:3}}>Code <b style={{fontFamily:"'JetBrains Mono',monospace",color:K.t1}}>{code}</b>{duree?<> · {duree}</>:null}{expiration?<> · jusqu'au {expiration}</>:null}. Activez-le maintenant pour ouvrir tous les parcours, examens et certificats.</div>
      {err&&<div style={{fontSize:13,color:K.er,marginTop:6}}>{err}</div>}
    </div>
    <button onClick={activer} disabled={enc} className="bt" style={{background:K.em,color:"#fff",border:"none",borderRadius:12,padding:"11px 18px",fontWeight:900,fontSize:14.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:7,minHeight:46,width:mob?"100%":"auto",justifyContent:"center"}}>
      <i className={`ti ti-${enc?"loader-2":"lock-open"}`} style={{fontSize:18}}/>{enc?"Activation…":"Activer mon accès"}</button>
  </div>;
}
