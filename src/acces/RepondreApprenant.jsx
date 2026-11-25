import React,{useMemo,useState}from"react";
import{modelesReponse,numerosApprenant,lienWhatsApp,refRessembleTel}from"./reponses";

// ══════════════════ RÉPONDRE À UN APPRENANT (ADMIN, DEPUIS SA CARTE) ══════════════════
// Réponses types modifiables, envoi dans la messagerie de l'application (notification à l'apprenant),
// copie par e-mail en option, et raccourci WhatsApp quand un numéro congolais est connu.
// onEnvoyer(texte, { email }) : promesse ; l'appelant enregistre le message et envoie l'e-mail.
export default function RepondreApprenant({K,u,offre,onEnvoyer,onFermer}){
  const modeles=useMemo(()=>modelesReponse(u,offre),[u,offre]);
  const[k,sK]=useState(modeles[0].k),[texte,sTexte]=useState(modeles[0].texte),[email,sEmail]=useState(!!u.mail);
  const[enc,sEnc]=useState(false),[fait,sFait]=useState(""),[err,sErr]=useState("");
  const tels=numerosApprenant(u);
  const choisir=m=>{sK(m.k);sTexte(m.texte);sFait("");sErr("");};
  const envoyer=async()=>{
    if(!texte.trim())return;
    sEnc(true);sErr("");
    try{await onEnvoyer(texte.trim(),{email});sFait(email?"Message envoyé dans l'application et par e-mail.":"Message envoyé dans l'application.");}
    catch(e){sErr("Envoi impossible : "+(e.message||e));}
    sEnc(false);
  };
  const puce=on=>({display:"inline-flex",alignItems:"center",gap:5,padding:"7px 11px",borderRadius:99,fontSize:12.5,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",
    background:on?K.em:K.c2,color:on?"#fff":K.t2,border:`1px solid ${on?K.em:K.b1}`});
  const bouton=(p)=>({display:"inline-flex",alignItems:"center",justifyContent:"center",gap:6,padding:"11px 15px",borderRadius:12,fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",minHeight:44,
    background:p==="wa"?"#25D366":p?K.em:K.c2,color:p?"#fff":K.t1,border:p?"none":`1px solid ${K.b1}`,textDecoration:"none"});
  return <div>
    <div style={{fontSize:13.5,color:K.t2,lineHeight:1.5,marginBottom:10}}>
      À <b style={{color:K.t1}}>{u.nom||u.mail}</b>{u.mail&&<span style={{color:K.t3}}> · {u.mail}</span>}
      {u.demandeRef&&<div style={{marginTop:3}}>Réf. déclarée : <b style={{fontFamily:"'JetBrains Mono',monospace",color:K.t1}}>{u.demandeRef}</b>{refRessembleTel(u.demandeRef)&&<span style={{color:K.wa,fontWeight:700}}> · ressemble à un numéro de téléphone</span>}</div>}
    </div>
    <div style={{fontSize:12,fontWeight:800,color:K.t3,textTransform:"uppercase",letterSpacing:.5,marginBottom:6}}>Réponses types</div>
    <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:10}}>
      {modeles.map(m=><button key={m.k} onClick={()=>choisir(m)} className="bt" style={puce(k===m.k)}><i className={`ti ti-${m.ico}`} style={{fontSize:14}}/>{m.l}</button>)}
    </div>
    <textarea value={texte} onChange={e=>{sTexte(e.target.value);sFait("");}} rows={9} aria-label="Message à l'apprenant"
      style={{width:"100%",boxSizing:"border-box",background:K.c2,border:`1px solid ${K.b0}`,borderRadius:12,padding:"11px 13px",color:K.t1,fontSize:14,lineHeight:1.5,fontFamily:"'Outfit',sans-serif",resize:"vertical",marginBottom:8}}/>
    {u.mail&&<label style={{display:"flex",alignItems:"center",gap:8,fontSize:13.5,color:K.t2,marginBottom:10,cursor:"pointer"}}>
      <input type="checkbox" checked={email} onChange={e=>sEmail(e.target.checked)} style={{width:17,height:17,accentColor:K.em}}/>Envoyer aussi une copie par e-mail
    </label>}
    {fait&&<div style={{background:K.emBg,border:`1px solid ${K.emBd}`,color:K.em,borderRadius:10,padding:"9px 12px",fontSize:13.5,fontWeight:700,marginBottom:10}}><i className="ti ti-check" style={{marginRight:5}}/>{fait} L'apprenant peut répondre depuis sa rubrique Messages.</div>}
    {err&&<div style={{background:K.erBg,border:`1px solid ${K.erBd}`,color:K.er,borderRadius:10,padding:"9px 12px",fontSize:13.5,marginBottom:10}}>{err}</div>}
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <button onClick={envoyer} disabled={enc||!texte.trim()} className="bt" style={{...bouton(true),opacity:enc||!texte.trim()?.6:1}}><i className="ti ti-send" style={{fontSize:16}}/>{enc?"Envoi…":fait?"Renvoyer":"Envoyer dans l'application"}</button>
      {tels.map(t=><a key={t} href={lienWhatsApp(t,texte)} target="_blank" rel="noopener noreferrer" className="bt" style={bouton("wa")}><i className="ti ti-brand-whatsapp" style={{fontSize:17}}/>Ouvrir dans WhatsApp (+{t.slice(0,3)} {t.slice(3)})</a>)}
      {onFermer&&<button onClick={onFermer} className="bt" style={bouton(false)}>Fermer</button>}
    </div>
  </div>;
}
