import React,{useCallback,useEffect,useState}from"react";
import{getAuth}from"firebase/auth";
import{CarteParrainage}from"./BandeauEssai";
import{lireConfigEssai}from"./essai";

// ══════════════════ MES FILLEULS (CÔTÉ PARRAIN) ══════════════════
// Les comptes inscrits avec le lien de parrainage de l'apprenant, et ce qu'ils lui rapportent.
// Données fournies par /api/filleuls (le serveur lit les comptes à la place de l'apprenant) : prénom et initiale du nom,
// date d'inscription, statut. Aucune autre donnée personnelle des filleuls n'est transmise.

const fD=ms=>ms?new Date(ms).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit",year:"numeric"}):"—";
export const STATUTS={
  recompense:{l:"Abonné · récompense reçue",ico:"gift",ton:"or"},
  abonne:{l:"Abonné · récompense en cours de validation",ico:"circle-check",ton:"ok"},
  essai:{l:"En essai gratuit",ico:"hourglass",ton:"info"},
  inscrit:{l:"Inscrit, pas encore abonné",ico:"user",ton:"neutre"},
};

// source (facultatif) : fonction asynchrone qui renvoie la réponse de l'API (aperçus et tests)
export default function MesFilleuls({K,mob,uid,cfg,source}){
  const c=lireConfigEssai(cfg);
  const[d,sD]=useState(null),[err,sErr]=useState(""),[enc,sEnc]=useState(true);
  const charger=useCallback(async()=>{
    sEnc(true);sErr("");
    try{
      if(source){sD(await source());sEnc(false);return;}
      const u=getAuth().currentUser;
      if(!u)throw new Error("Session expirée : reconnectez-vous.");
      const r=await fetch("/api/filleuls",{headers:{Authorization:`Bearer ${await u.getIdToken()}`}});
      const j=await r.json().catch(()=>({}));
      if(!r.ok||!j.ok)throw new Error(j.raison||"Liste des filleuls indisponible pour le moment.");
      sD(j);
    }catch(e){sErr(e.message||String(e));}
    sEnc(false);
  },[source]);
  useEffect(()=>{charger();},[charger]);

  const TON={or:["#B7791F","#F2A93B1f","#F2A93B55"],ok:[K.em,K.emBg,K.emBd],info:[K.in_,K.inBg,K.inBd],neutre:[K.t2,K.c2,K.b1]};
  const carte={background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:16};
  const t=d?d.totaux:{inscrits:0,enEssai:0,abonnes:0,recompenses:0};
  const jours=d?d.recompenseJours:c.recompenseJours;
  const Kpi=({v,l,col,ico})=><div style={{...carte,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
    <i className={`ti ti-${ico}`} style={{fontSize:22,color:col}}/>
    <div><div style={{fontWeight:900,fontSize:22,color:K.t1,lineHeight:1}}>{enc&&!d?"…":v}</div><div style={{fontSize:12.5,color:K.t3,marginTop:3}}>{l}</div></div>
  </div>;

  return <div style={{maxWidth:820,margin:"0 auto",animation:"fadeIn .3s ease"}}>
    <div style={{background:"linear-gradient(135deg,#0A2A5C,#1E4FA3 60%,#B7791F)",borderRadius:20,padding:mob?"20px 18px":"24px 26px",color:"#fff",marginBottom:14,position:"relative",overflow:"hidden"}}>
      <i className="ti ti-users-plus" style={{position:"absolute",right:-10,bottom:-22,fontSize:150,opacity:.1}}/>
      <div style={{fontSize:12,fontWeight:800,letterSpacing:1.2,textTransform:"uppercase",opacity:.85}}>Parrainage</div>
      <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:mob?25:30,lineHeight:1.15,margin:"6px 0 8px"}}>Mes filleuls</div>
      <div style={{fontSize:14.5,opacity:.92,lineHeight:1.55,maxWidth:600}}>Les amis inscrits avec votre lien ont <b>{c.jours+c.bonusParrain} jours d'essai</b>. Quand l'un d'eux s'abonne, vous recevez <b>{jours} jours d'accès offerts</b>, après validation de son paiement.</div>
    </div>

    <div style={{display:"grid",gridTemplateColumns:mob?"1fr 1fr":"repeat(4,1fr)",gap:10,marginBottom:14}}>
      <Kpi v={t.inscrits} l="Inscrits avec votre lien" col={K.in_} ico="users"/>
      <Kpi v={t.enEssai} l="En essai gratuit" col={K.in_} ico="hourglass"/>
      <Kpi v={t.abonnes} l="Abonnés" col={K.em} ico="circle-check"/>
      <Kpi v={t.recompenses} l="Récompenses reçues" col="#B7791F" ico="gift"/>
    </div>

    <div style={{...carte,padding:mob?"14px":"16px 18px",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:6}}>
        <div style={{fontWeight:800,fontSize:15.5,color:K.t1}}><i className="ti ti-list-details" style={{marginRight:6,color:K.in_}}/>Vos filleuls{d?` (${t.inscrits})`:""}</div>
        <button onClick={charger} disabled={enc} className="bt" title="Actualiser" style={{background:"none",border:`1px solid ${K.b1}`,borderRadius:10,padding:"6px 10px",color:K.t2,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:13}}><i className={`ti ti-${enc?"loader-2":"refresh"}`} style={{marginRight:4}}/>Actualiser</button>
      </div>
      {err?<div style={{display:"flex",gap:9,alignItems:"flex-start",background:K.erBg,border:`1px solid ${K.erBd}`,borderRadius:12,padding:"10px 12px",fontSize:13.5,color:K.t1}}><i className="ti ti-alert-triangle" style={{color:K.er,fontSize:18}}/>{err}</div>
      :enc&&!d?<div style={{fontSize:13.5,color:K.t3,padding:"10px 0"}}>Chargement…</div>
      :!d.filleuls.length?<div style={{textAlign:"center",padding:"18px 8px"}}>
        <i className="ti ti-mood-smile" style={{fontSize:34,color:K.t3}}/>
        <div style={{fontWeight:800,fontSize:15,color:K.t1,marginTop:6}}>Aucun filleul pour l'instant</div>
        <div style={{fontSize:13.5,color:K.t2,marginTop:4,lineHeight:1.5}}>Partagez votre lien ci-dessous : vos amis apparaîtront ici dès leur inscription.</div>
      </div>
      :d.filleuls.map((f,i)=>{const S=STATUTS[f.statut]||STATUTS.inscrit,[c1,c2,c3]=TON[S.ton];
        return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"11px 0",borderTop:i?`1px solid ${K.b0}`:"none",flexWrap:"wrap"}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:c2,border:`1px solid ${c3}`,color:c1,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16,flexShrink:0}}>{f.nom.charAt(0)}</div>
          <div style={{flex:1,minWidth:150}}>
            <div style={{fontWeight:800,fontSize:14.5,color:K.t1}}>{f.nom}</div>
            <div style={{fontSize:12.5,color:K.t3}}>Inscrit le {fD(f.inscritLe)}</div>
          </div>
          <span style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12.5,fontWeight:800,color:c1,background:c2,border:`1px solid ${c3}`,borderRadius:99,padding:"4px 10px"}}>
            <i className={`ti ti-${S.ico}`}/>{f.statut==="essai"&&f.joursEssai?`En essai · ${f.joursEssai} j restant${f.joursEssai>1?"s":""}`:f.statut==="recompense"&&f.recompenseLe?`Récompense reçue le ${fD(Date.parse(f.recompenseLe))}`:S.l}</span>
        </div>;})}
      <div style={{fontSize:12,color:K.t3,marginTop:10,lineHeight:1.5}}><i className="ti ti-lock" style={{marginRight:4}}/>Pour respecter la vie privée de vos filleuls, seuls leur prénom et l'initiale de leur nom sont affichés.</div>
    </div>

    <CarteParrainage K={K} mob={mob} uid={uid} gagnes={d?d.gagnes:0} cfg={cfg}/>
  </div>;
}
