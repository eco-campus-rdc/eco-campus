import React,{useEffect,useState}from"react";
import{doc,onSnapshot,setDoc,writeBatch,increment}from"firebase/firestore";
import{notifier}from"../notif/notif";
import{lireConfigEssai,bilanParrainage,prolonger,etatEssai}from"./essai";

// ══════════════════ ADMINISTRATION : ESSAI GRATUIT ET PARRAINAGE ══════════════════
// Réglages (config/essai, écrit par l'administrateur seul) : durée de l'essai, bonus des filleuls, récompense du parrain,
// campagne pour offrir l'essai aux inscrits actuels. Suivi des filleuls et récompense du parrain quand le filleul s'abonne.

export function useConfigEssai(db){
  const[c,sC]=useState({...lireConfigEssai(null),charge:false});
  useEffect(()=>onSnapshot(doc(db,"config","essai"),s=>sC({...lireConfigEssai(s.exists()?s.data():null),charge:true}),()=>sC(x=>({...x,charge:true}))),[db]);
  return c;
}
const fD=v=>v?new Date(v).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}):"—";

export default function AdminEssai({K,mob,db,users}){
  const cfg=useConfigEssai(db);
  const[f,sF]=useState(null),[msg,sMsg]=useState(null),[busy,sBusy]=useState(false);
  useEffect(()=>{if(!f)sF({jours:cfg.jours,bonusParrain:cfg.bonusParrain,recompenseJours:cfg.recompenseJours});},[cfg,f]);
  const ref=doc(db,"config","essai");
  const flash=(t,m)=>{sMsg({t,m});setTimeout(()=>sMsg(null),5000);};
  const maintenant=Date.now();
  const bilan=bilanParrainage(users,maintenant);
  const apprenants=users.filter(u=>u.role!=="formateur"&&u.mail!=="admin@accessplus.com");
  const abonne=u=>u.abonnement==="actif"&&u.dateExpiration&&new Date(u.dateExpiration)>new Date();
  const enEssai=apprenants.filter(u=>!abonne(u)&&etatEssai({creeLe:u.createdAt,parrainUid:u.parrainUid,cfg,maintenant}).enCours).length;
  const nonAbonnes=apprenants.filter(u=>!abonne(u)).length;

  const enregistrer=async()=>{
    const v=lireConfigEssai({...f,actif:cfg.actif});
    sBusy(true);try{await setDoc(ref,{jours:v.jours,bonusParrain:v.bonusParrain,recompenseJours:v.recompenseJours},{merge:true});flash("o","Réglages enregistrés.");}
    catch(e){flash("e","Enregistrement impossible : "+e.message);}sBusy(false);
  };
  const basculer=async()=>{try{await setDoc(ref,{actif:!cfg.actif},{merge:true});flash("o",cfg.actif?"Essai gratuit désactivé pour les nouveaux comptes.":"Essai gratuit activé.");}catch(e){flash("e",e.message);}};
  const lancerCampagne=async()=>{
    if(!window.confirm(`Offrir ${cfg.jours} jours d'accès complet, à partir de maintenant, à tous les inscrits qui ne sont pas abonnés (${nonAbonnes} comptes) ?\n\nIls le verront à leur prochaine connexion et recevront une notification.`))return;
    try{await setDoc(ref,{campagne:new Date().toISOString()},{merge:true});
      notifier({dest:"apprenants",type:"info",titre:`Cadeau : ${cfg.jours} jours d'accès complet 🎁`,texte:"Tous les parcours, examens et ateliers sont ouverts pour vous. Profitez-en !",vue:"form",auteurNom:"Éco-Campus RDC"});
      flash("o",`Campagne lancée : ${cfg.jours} jours offerts aux inscrits non abonnés, et notification envoyée.`);}
    catch(e){flash("e",e.message);}
  };
  const arreterCampagne=async()=>{if(!window.confirm("Arrêter la campagne en cours ? Les comptes anciens reviennent aux modules gratuits."))return;try{await setDoc(ref,{campagne:null},{merge:true});flash("o","Campagne arrêtée.");}catch(e){flash("e",e.message);}};
  const recompenser=async x=>{
    const p=x.parrain,j=cfg.recompenseJours,fin=prolonger(abonne(p)?p.dateExpiration:null,j);
    if(!window.confirm(`${x.filleul.nom||x.filleul.mail} s'est abonné(e).\n\nOffrir ${j} jours d'accès à son parrain, ${p.nom||p.mail} ? Son accès ira jusqu'au ${fD(fin)}.`))return;
    sBusy(true);
    try{
      const b=writeBatch(db);
      b.update(doc(db,"users",p.uid),{abonnement:"actif",codeValide:true,dateExpiration:fin,parrainageGagnes:increment(1)});
      b.update(doc(db,"users",x.filleul.uid),{parrainRecompense:new Date().toISOString()});
      await b.commit();
      notifier({dest:p.uid,type:"code",titre:`Merci ! ${j} jours offerts 🎉`,texte:`${x.filleul.nom||"Votre filleul"} s'est abonné grâce à vous. Votre accès est prolongé jusqu'au ${fD(fin)}.`,vue:"home",auteurNom:"Éco-Campus RDC",email:true});
      flash("o",`${p.nom||p.mail} est récompensé(e) : accès jusqu'au ${fD(fin)}.`);
    }catch(e){flash("e","Récompense impossible : "+e.message);}
    sBusy(false);
  };

  const carte={background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:16,padding:mob?"15px 14px":"18px 20px",marginBottom:14};
  const champ={width:"100%",boxSizing:"border-box",background:K.c2,border:`1px solid ${K.b1}`,borderRadius:10,padding:"10px 12px",color:K.t1,fontSize:14,fontFamily:"'Outfit',sans-serif"};
  const bouton=p=>({background:p?`linear-gradient(135deg,${K.emD},${K.em})`:K.c2,color:p?"#fff":K.t1,border:p?"none":`1px solid ${K.b1}`,borderRadius:10,padding:"10px 15px",fontWeight:800,fontSize:13.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:6,minHeight:42});
  const Kpi=({v,l,c})=><div style={{background:K.c2,borderRadius:12,padding:"10px 12px",flex:"1 1 120px"}}><div style={{fontSize:22,fontWeight:900,color:c||K.t1}}>{v}</div><div style={{fontSize:12,color:K.t2,fontWeight:600}}>{l}</div></div>;
  if(!f)return null;
  const aRecomp=bilan.filter(x=>x.aRecompenser).length;

  return <div style={{maxWidth:820,animation:"fadeIn .3s ease"}}>
    <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:21,color:K.t1,marginBottom:6}}>Essai gratuit et parrainage</div>
    <div style={{fontSize:14,color:K.t2,lineHeight:1.6,marginBottom:14}}>Chaque nouveau compte profite d'un <b>essai complet</b> : tous les parcours, examens et ateliers sont ouverts, sauf la délivrance des certificats, réservée aux abonnés. À la fin de l'essai, l'apprenant garde ses scores et les modules gratuits. Un ami invité par un lien de parrainage a des jours en plus ; quand il s'abonne, son parrain reçoit des jours offerts.</div>
    {msg&&<div style={{...carte,padding:"10px 14px",fontWeight:700,fontSize:13.5,color:msg.t==="o"?K.em:K.er,background:msg.t==="o"?K.emBg:K.erBg}}>{msg.m}</div>}

    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
      <Kpi v={enEssai} l="En essai en ce moment" c={K.in_}/><Kpi v={bilan.length} l="Inscrits parrainés"/><Kpi v={bilan.filter(x=>x.abonne).length} l="Filleuls abonnés" c={K.em}/><Kpi v={aRecomp} l="Parrains à récompenser" c={aRecomp?K.wa:K.t3}/>
    </div>

    <div style={carte}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,flexWrap:"wrap",marginBottom:10}}>
        <div style={{fontWeight:800,fontSize:15,color:K.t1}}><i className="ti ti-gift" style={{marginRight:6,color:K.em}}/>Réglages</div>
        <button onClick={basculer} className="bt" style={{...bouton(false),color:cfg.actif?K.em:K.er}}><i className={`ti ti-${cfg.actif?"toggle-right":"toggle-left"}`} style={{fontSize:20}}/>{cfg.actif?"Essai activé":"Essai désactivé"}</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:mob?"1fr":"repeat(3,1fr)",gap:10}}>
        {[["jours","Durée de l'essai (jours)"],["bonusParrain","Jours en plus pour un filleul"],["recompenseJours","Jours offerts au parrain"]].map(([k,l])=><label key={k}><div style={{fontSize:12.5,fontWeight:700,color:K.t2,marginBottom:5}}>{l}</div>
          <input value={f[k]} onChange={e=>sF({...f,[k]:e.target.value})} inputMode="numeric" style={champ}/></label>)}
      </div>
      <div style={{fontSize:12.5,color:K.t3,margin:"8px 0 10px"}}>Actuellement : essai de {cfg.jours} jours, {cfg.jours+cfg.bonusParrain} jours pour un filleul, {cfg.recompenseJours} jours offerts au parrain par filleul abonné.</div>
      <button onClick={enregistrer} disabled={busy} className="bt" style={bouton(true)}><i className="ti ti-device-floppy"/>Enregistrer</button>
    </div>

    <div style={carte}>
      <div style={{fontWeight:800,fontSize:15,color:K.t1,marginBottom:6}}><i className="ti ti-speakerphone" style={{marginRight:6,color:K.wa}}/>Offrir l'essai aux inscrits actuels</div>
      <div style={{fontSize:13.5,color:K.t2,lineHeight:1.55,marginBottom:10}}>Les {nonAbonnes} inscrits non abonnés ont créé leur compte avant l'essai : une campagne leur ouvre tout pendant {cfg.jours} jours à partir d'aujourd'hui, avec une notification. Idéal pour les relancer.</div>
      {cfg.campagne&&<div style={{fontSize:13.5,fontWeight:700,color:K.em,marginBottom:10}}><i className="ti ti-circle-check" style={{marginRight:4}}/>Campagne lancée le {fD(cfg.campagne)} : jusqu'au {fD(new Date(cfg.campagne).getTime()+cfg.jours*86400000)}.</div>}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <button onClick={lancerCampagne} disabled={busy||!cfg.actif} className="bt" style={bouton(true)}><i className="ti ti-rocket"/>{cfg.campagne?"Relancer une campagne":"Lancer la campagne"}</button>
        {cfg.campagne&&<button onClick={arreterCampagne} className="bt" style={bouton(false)}><i className="ti ti-player-stop"/>Arrêter</button>}
      </div>
    </div>

    <div style={carte}>
      <div style={{fontWeight:800,fontSize:15,color:K.t1,marginBottom:8}}><i className="ti ti-users-plus" style={{marginRight:6,color:K.in_}}/>Filleuls ({bilan.length})</div>
      {bilan.length===0?<div style={{fontSize:13.5,color:K.t3}}>Aucun inscrit par un lien de parrainage pour l'instant. Chaque apprenant trouve son lien sur sa page d'accueil.</div>
        :bilan.map(x=><div key={x.filleul.uid} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:`1px solid ${K.b0}`,flexWrap:"wrap"}}>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontWeight:800,fontSize:14,color:K.t1}}>{x.filleul.nom||x.filleul.mail} <span style={{fontWeight:600,fontSize:12,color:x.abonne?K.em:K.t3}}>· {x.abonne?"abonné":"pas encore abonné"}</span></div>
            <div style={{fontSize:12.5,color:K.t3}}>Parrain : {x.parrain?`${x.parrain.nom||""} (${x.parrain.mail||""})`:"compte introuvable"}{x.recompense?` · récompensé le ${fD(x.recompense)}`:""}</div>
          </div>
          {x.aRecompenser&&<button onClick={()=>recompenser(x)} disabled={busy} className="bt" style={bouton(true)}><i className="ti ti-gift"/>Offrir {cfg.recompenseJours} jours au parrain</button>}
        </div>)}
    </div>
  </div>;
}
