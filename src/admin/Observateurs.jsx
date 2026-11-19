import React,{useEffect,useMemo,useState}from"react";
import{doc,onSnapshot,setDoc,arrayUnion,arrayRemove}from"firebase/firestore";
import TableauLecture from"./TableauLecture";

// ══════════════════ ADMINISTRATION : ACCÈS EN LECTURE AU TABLEAU DE BORD ══════════════════
// L'administrateur désigne quelques comptes inscrits (« observateurs ») : config/observateurs.uids.
// Seul l'administrateur peut modifier ce document (règle « config » existante). Les observateurs voient
// les indicateurs agrégés calculés par /api/tableau, jamais les actions. Listes nominatives (inscrits, abonnés),
// en consultation seule : uniquement pour les observateurs cochés par l'administrateur (config/observateurs.listes).

const ADMIN="admin@accessplus.com";
export const MAX_OBSERVATEURS=10;

export function useObservateurs(db){
  const[uids,sUids]=useState([]);
  useEffect(()=>onSnapshot(doc(db,"config","observateurs"),s=>sUids(s.exists()&&Array.isArray(s.data().uids)?s.data().uids:[]),()=>sUids([])),[db]);
  return uids;
}

function useConfigObservateurs(db){
  const[c,sC]=useState({uids:[],listes:[]});
  useEffect(()=>onSnapshot(doc(db,"config","observateurs"),s=>{const x=s.exists()?s.data():{};sC({uids:Array.isArray(x.uids)?x.uids:[],listes:Array.isArray(x.listes)?x.listes:[]});},()=>sC({uids:[],listes:[]})),[db]);
  return c;
}

export default function Observateurs({K,mob,db,users}){
  const{uids,listes}=useConfigObservateurs(db);
  const[avecListes,sAvecListes]=useState(false);
  const[mail,sMail]=useState(""),[msg,sMsg]=useState(null),[apercu,sApercu]=useState(false),[enc,sEnc]=useState(false);
  const liste=useMemo(()=>uids.map(uid=>users.find(u=>(u.uid||u.id)===uid)||{uid,nom:"Compte supprimé",mail:""}),[uids,users]);
  const ref=doc(db,"config","observateurs");
  const ajouter=async()=>{
    sMsg(null);
    const m=mail.trim().toLowerCase();
    if(!m.includes("@"))return sMsg({t:"e",m:"Saisissez l'adresse e-mail d'un compte inscrit."});
    if(m===ADMIN)return sMsg({t:"e",m:"L'administrateur a déjà accès à tout."});
    const u=users.find(x=>String(x.mail||"").toLowerCase()===m);
    if(!u)return sMsg({t:"e",m:"Aucun compte inscrit avec cette adresse. La personne doit d'abord créer son compte sur Éco-Campus."});
    const uid=u.uid||u.id;
    if(uids.includes(uid))return sMsg({t:"e",m:`${u.nom||m} a déjà accès au tableau de bord.`});
    if(uids.length>=MAX_OBSERVATEURS)return sMsg({t:"e",m:`${MAX_OBSERVATEURS} observateurs au maximum : retirez d'abord un accès.`});
    sEnc(true);
    try{await setDoc(ref,{uids:arrayUnion(uid),...(avecListes?{listes:arrayUnion(uid)}:{}),majLe:new Date().toISOString()},{merge:true});sMail("");sAvecListes(false);sMsg({t:"o",m:`Accès donné à ${u.nom||m}${avecListes?", avec les listes des inscrits et des abonnés":""}. Le tableau de bord apparaît sur sa page d'accueil à sa prochaine connexion.`});}
    catch(e){sMsg({t:"e",m:"Enregistrement impossible : "+e.message});}
    sEnc(false);
  };
  const retirer=async u=>{
    if(!window.confirm(`Retirer l'accès au tableau de bord à ${u.nom||u.mail} ?`))return;
    try{await setDoc(ref,{uids:arrayRemove(u.uid||u.id),listes:arrayRemove(u.uid||u.id),majLe:new Date().toISOString()},{merge:true});sMsg({t:"o",m:"Accès retiré."});}
    catch(e){sMsg({t:"e",m:"Modification impossible : "+e.message});}
  };
  // Listes nominatives : à cocher compte par compte (données personnelles)
  const basculerListes=async u=>{
    const uid=u.uid||u.id,oui=!listes.includes(uid);
    if(oui&&!window.confirm(`Autoriser ${u.nom||u.mail} à consulter la liste des inscrits et des abonnés (noms, e-mails, statut d'abonnement, dates) ?\n\nCe sont des données personnelles : ne l'accordez qu'à une personne de confiance, tenue à la confidentialité.`))return;
    try{await setDoc(ref,{listes:oui?arrayUnion(uid):arrayRemove(uid),majLe:new Date().toISOString()},{merge:true});sMsg({t:"o",m:oui?`${u.nom||u.mail} peut maintenant consulter les listes (sans pouvoir les modifier).`:`${u.nom||u.mail} ne voit plus que les chiffres.`});}
    catch(e){sMsg({t:"e",m:"Modification impossible : "+e.message});}
  };
  const carte={background:K.card,border:`1px solid ${K.b0}`,boxShadow:K.sh,borderRadius:16,padding:mob?"15px 14px":"18px 20px",marginBottom:14};
  const champ={flex:1,minWidth:200,padding:"11px 13px",background:K.c2,border:`1px solid ${K.b1}`,borderRadius:10,color:K.t1,fontSize:14,fontFamily:"'Outfit',sans-serif"};
  const bouton=(p)=>({background:p?`linear-gradient(135deg,${K.emD},${K.em})`:K.c2,color:p?"#fff":K.t1,border:p?"none":`1px solid ${K.b1}`,borderRadius:10,padding:"10px 15px",fontWeight:800,fontSize:13.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif",display:"inline-flex",alignItems:"center",gap:6,minHeight:42});

  if(apercu)return <div>
    <button onClick={()=>sApercu(false)} className="bt" style={{...bouton(false),marginBottom:12}}><i className="ti ti-arrow-left"/>Retour à la gestion des accès</button>
    <TableauLecture K={K} mob={mob} apercu/>
  </div>;

  return <div style={{maxWidth:760,animation:"fadeIn .3s ease"}}>
    <div style={{fontFamily:"'Fraunces',serif",fontWeight:700,fontSize:21,color:K.t1,marginBottom:6}}>Accès en lecture au tableau de bord</div>
    <div style={{fontSize:14,color:K.t2,lineHeight:1.6,marginBottom:14}}>Donnez à quelques personnes (associé, partenaire, bailleur…) un accès <b>en lecture seule</b> aux chiffres clés de la plateforme : inscrits, abonnements, engagement, résultats, certificats et contenus. Elles ne voient ni les messages, ni les codes, ni les paiements, et ne peuvent rien modifier ni supprimer. Si vous le souhaitez, vous pouvez aussi leur ouvrir, <b>en consultation seule</b>, la liste des inscrits et celle des abonnés.</div>

    <div style={carte}>
      <div style={{fontWeight:800,fontSize:14.5,color:K.t1,marginBottom:8}}><i className="ti ti-user-plus" style={{marginRight:6,color:K.em}}/>Donner l'accès</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        <input value={mail} onChange={e=>sMail(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")ajouter();}} type="email" placeholder="E-mail du compte inscrit" style={champ}/>
        <button onClick={ajouter} disabled={enc} className="bt" style={bouton(true)}><i className="ti ti-eye-check"/>Donner l'accès</button>
      </div>
      <label style={{display:"flex",alignItems:"flex-start",gap:8,marginTop:10,fontSize:13.5,color:K.t1,cursor:"pointer",lineHeight:1.45}}>
        <input type="checkbox" checked={avecListes} onChange={e=>sAvecListes(e.target.checked)} style={{marginTop:3,width:17,height:17}}/>
        <span>Lui montrer aussi <b>la liste des inscrits et celle des abonnés</b> (noms, e-mails, statut, dates), en consultation seule</span></label>
      <div style={{fontSize:12.5,color:K.t3,marginTop:8,lineHeight:1.5}}>La personne doit déjà avoir un compte Éco-Campus (inscription gratuite). {MAX_OBSERVATEURS} accès au maximum.</div>
      {msg&&<div style={{marginTop:10,fontSize:13.5,fontWeight:700,color:msg.t==="o"?K.em:K.er}}>{msg.m}</div>}
    </div>

    <div style={carte}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,marginBottom:8,flexWrap:"wrap"}}>
        <div style={{fontWeight:800,fontSize:14.5,color:K.t1}}><i className="ti ti-eye" style={{marginRight:6,color:K.in_}}/>Observateurs ({liste.length})</div>
        <button onClick={()=>sApercu(true)} className="bt" style={bouton(false)}><i className="ti ti-chart-dots"/>Voir ce qu'ils voient</button>
      </div>
      {liste.length===0?<div style={{fontSize:13.5,color:K.t3,padding:"6px 0"}}>Aucun accès donné pour l'instant.</div>
        :liste.map(u=><div key={u.uid||u.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 0",borderTop:`1px solid ${K.b0}`}}>
          <div style={{width:34,height:34,borderRadius:"50%",background:K.c2,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,color:K.t2,flexShrink:0}}>{String(u.nom||u.mail||"?").charAt(0).toUpperCase()}</div>
          <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14,color:K.t1}}>{u.nom||"—"}</div><div style={{fontSize:12.5,color:K.t3,overflow:"hidden",textOverflow:"ellipsis"}}>{u.mail}</div>
            <div style={{fontSize:12,fontWeight:700,marginTop:2,color:listes.includes(u.uid||u.id)?K.wa:K.t3}}><i className={`ti ti-${listes.includes(u.uid||u.id)?"list-details":"chart-dots"}`} style={{marginRight:4}}/>{listes.includes(u.uid||u.id)?"Chiffres + listes des inscrits et abonnés":"Chiffres seulement"}</div></div>
          <button onClick={()=>basculerListes(u)} className="bt" title={listes.includes(u.uid||u.id)?"Retirer l'accès aux listes":"Autoriser les listes"} style={{...bouton(false),minHeight:36,padding:"7px 11px",fontSize:12.5}}><i className={`ti ti-${listes.includes(u.uid||u.id)?"list-check":"list"}`}/>{mob?"Listes":listes.includes(u.uid||u.id)?"Retirer les listes":"Ouvrir les listes"}</button>
          <button onClick={()=>retirer(u)} className="bt" style={{...bouton(false),color:K.er,minHeight:36,padding:"7px 11px",fontSize:12.5}}><i className="ti ti-eye-off"/>Retirer</button>
        </div>)}
    </div>
  </div>;
}
