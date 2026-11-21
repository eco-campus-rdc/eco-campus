import React,{useState,useEffect,useRef}from"react";
import{doc,getDoc,updateDoc}from"firebase/firestore";
import{Qcm,Carte,Bouton}from"../fiscal/CodeImpots";
import{SEUIL_ELEMENT,SEUIL_MOYENNE,COEF_FINAL,EXAMENS,PARCOURS}from"../attest/regles";
import{EXAMENS_FINAUX}from"./examens";
import{cleTentatives,normaliser,dureeExamen,attente,demarrer,cloturer,abandonEnCours,fmtAttente,fmtChrono,delaiApres,DELAI_LONG,SORTIES_AUTORISEES,ECHECS_AVANT_DELAI_LONG}from"./tentatives";

// ══════════════════ EXAMEN FINAL D'UN PARCOURS (composants partagés) ══════════════════
// CarteExamenFinal : état de l'examen dans la page du parcours (verrouillé, ouvert, réussi) et lien vers le certificat.
// ExamenFinal : consignes et engagement, puis épreuve chronométrée (QCM en mode examen, corrigé détaillé à la fin),
// score dans users.scores[EXAMENS[id].cle]. Tentatives, délais et sorties de page : voir ./tentatives.js.
// etat : résultat de etatParcours(id, modules, user) (src/attest/regles.js).

const pctF=(etat,local)=>local!=null?local:etat.final;

export function CarteExamenFinal({K,id,etat,ok,apercu,local,onOuvrir,onCertificat}){
  const x=EXAMENS[id],F=EXAMENS_FINAUX[id],p=pctF(etat,local),reussi=p!=null&&p>=SEUIL_ELEMENT;
  const ouvert=apercu||(ok&&etat.finalOuvert),n=etat.elements.length;
  const raison=ouvert?`Ouvert : ${x.nbQ} questions en ${dureeExamen(id)} minutes, note minimale ${SEUIL_ELEMENT} %, corrigé détaillé à la fin.`
    :!ok?"Réservé aux abonnés."
    :!etat.tousReussis?`S'ouvre quand les ${n} éléments du parcours sont réussis à ${SEUIL_ELEMENT} % au moins (${etat.nReussis} / ${n} pour l'instant).`
    :`Moyenne actuelle ${etat.moyenne} % : portez-la à ${SEUIL_MOYENNE} % au moins (refaites les évaluations les plus faibles).`;
  const or="#B7791F";
  return <div style={{background:ouvert?`linear-gradient(135deg,${or}14,${K.card})`:K.card,border:`1px solid ${ouvert?or+"66":K.b0}`,boxShadow:K.sh,borderRadius:16,padding:"14px 15px",margin:"14px 0"}}>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8}}>
      <div style={{fontSize:11.5,fontWeight:800,color:or,letterSpacing:.6,textTransform:"uppercase"}}><i className={`ti ti-${reussi?"trophy":ouvert?"certificate":"lock"}`} style={{marginRight:5}}/>Évaluation finale · coefficient {COEF_FINAL}</div>
      {p!=null&&<span style={{fontSize:12,fontWeight:800,borderRadius:99,padding:"3px 9px",background:reussi?K.emBg:K.erBg,color:reussi?K.em:K.er,border:`1px solid ${reussi?K.emBd:K.erBd}`}}>{p} %</span>}
    </div>
    <div style={{fontWeight:800,fontSize:15.5,color:K.t1,lineHeight:1.3,margin:"4px 0"}}>{F.titre}</div>
    <div style={{fontSize:13,color:K.t3,lineHeight:1.55}}>{raison}</div>
    <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
      <Bouton K={K} ico={ouvert?"player-play":"lock"} dis={!ouvert} ch={p!=null?"Repasser l'examen":"Passer l'examen final"} on={onOuvrir}/>
      {reussi&&onCertificat&&<Bouton K={K} v="g" ico="certificate" ch="Obtenir mon certificat" on={onCertificat}/>}
    </div>
  </div>;
}

// Consignes affichées avant l'épreuve (n : taille de la banque, d : durée en minutes)
export function consignesExamen(id,n,d){
  const x=EXAMENS[id];
  return [
    ["Avant de commencer",[
      `Installez-vous au calme pour ${d} minutes, avec une connexion stable et un téléphone ou un ordinateur chargé.`,
      "Prévoyez une calculatrice de poche et de quoi noter : plusieurs questions demandent un calcul. N'utilisez pas la calculatrice du téléphone : changer d'application compte comme une sortie de la page.",
      "Composez seul(e), sans cours, sans notes et sans aide extérieure : le certificat atteste de vos propres compétences.",
    ]],
    ["Pendant l'épreuve",[
      `${x.nbQ} questions tirées au hasard${n?` dans une banque de ${n}`:""}, une seule bonne réponse par question.`,
      "Lisez chaque question jusqu'au bout : attention aux montants HT et TTC, aux dates, aux taux et aux formulations négatives (« sauf », « n'est pas »).",
      "Vous pouvez changer de réponse tant que vous n'êtes pas passé(e) à la question suivante ; on ne revient pas en arrière.",
      "Aucune correction ne s'affiche pendant l'épreuve.",
      `Chronomètre de ${d} minutes : à la fin du temps, vos réponses sont envoyées automatiquement ; les questions sans réponse comptent comme fausses.`,
      `Restez sur la page de l'examen : ${SORTIES_AUTORISEES} sorties au maximum (autre onglet, autre fenêtre, autre application). À la ${SORTIES_AUTORISEES+1}e, l'examen est terminé : la tentative est annulée, sans note, et comptée comme non réussie.`,
      "Ne rechargez pas et ne fermez pas la page : la tentative serait comptée comme non réussie.",
    ]],
    ["Notation et tentatives",[
      `Note minimale : ${SEUIL_ELEMENT} %. L'examen compte coefficient ${COEF_FINAL} dans la moyenne générale.`,
      `Certificat avec une moyenne générale d'au moins ${SEUIL_MOYENNE} % ; mention Bien (${SEUIL_MOYENNE} %), Très bien (90 %) ou Excellent (95 %).`,
      "Le corrigé détaillé s'affiche à la fin : prenez le temps de le relire.",
      "Toute tentative commencée est comptée. Votre meilleure note est conservée et chaque nouvelle tentative renouvelle au moins 30 % des questions.",
      `5 minutes d'attente entre deux tentatives ; après ${ECHECS_AVANT_DELAI_LONG} tentatives non réussies d'affilée, 12 heures.`,
    ]],
  ];
}

const raisonDelai=e=>delaiApres(e)===DELAI_LONG
  ?`${ECHECS_AVANT_DELAI_LONG} tentatives non réussies d'affilée : délai de 12 heures avant la suivante. Profitez-en pour revoir les modules indiqués dans le corrigé.`
  :"Délai de 5 minutes entre deux tentatives.";
const MOTIFS={sorties:`Examen terminé : la page a été quittée plus de ${SORTIES_AUTORISEES} fois.`,abandon:"Tentative précédente interrompue (page fermée, rechargée ou quittée) : elle est comptée comme non réussie.",temps:"Temps écoulé : les réponses ont été envoyées automatiquement."};

export function ExamenFinal({K,mob,db,uid,id,ancien,onRetour,onScore}){
  const x=EXAMENS[id],F=EXAMENS_FINAUX[id],P=PARCOURS.find(p=>p.id===id)||{};
  const suivi=!!(db&&uid),cleT=cleTentatives(x.cle),duree=dureeExamen(id);
  const[banque,sBanque]=useState(null),[err,sErr]=useState("");
  const[phase,sPhase]=useState("consignes"); // consignes | epreuve | resultat | termine
  const[tent,sTent]=useState(suivi?null:normaliser(null)),[info,sInfo]=useState("");
  const[engage,sEngage]=useState(false),[maint,sMaint]=useState(Date.now()),[finChrono,sFinChrono]=useState(0);
  const[sorties,sSorties]=useState(0),[alerte,sAlerte]=useState(false),[tempsEcoule,sTempsEcoule]=useState(false);
  const tentR=useRef(tent),phaseR=useRef(phase),sortiesR=useRef(0),dialogue=useRef(false);
  tentR.current=tent;phaseR.current=phase;

  const ecrire=e=>{tentR.current=e;sTent(e);if(suivi)updateDoc(doc(db,"users",uid),{[`progress.${cleT}`]:e}).catch(er=>console.warn("Tentative non enregistrée",er));};

  useEffect(()=>{window.scrollTo({top:0,behavior:"smooth"});},[phase]);
  useEffect(()=>{let vivant=true;Promise.resolve().then(F.charger).then(b=>{if(vivant)sBanque(b);}).catch(()=>vivant&&sErr("Impossible de charger les questions. Vérifiez votre connexion."));return()=>{vivant=false;};},[F]);
  // État des tentatives ; une tentative restée « en cours » est un abandon
  useEffect(()=>{if(!suivi)return;let vivant=true;
    getDoc(doc(db,"users",uid)).then(s=>{if(!vivant)return;const e=((s.exists()&&s.data().progress)||{})[cleT];const ab=abandonEnCours(e);
      if(ab){ecrire(ab);sInfo(MOTIFS.abandon);}else sTent(normaliser(e));})
    .catch(()=>vivant&&sTent(normaliser(null)));
    return()=>{vivant=false;};
  },[]);
  useEffect(()=>{const t=setInterval(()=>sMaint(Date.now()),1000);return()=>clearInterval(t);},[]);
  // Chronomètre
  useEffect(()=>{if(phase==="epreuve"&&finChrono&&maint>=finChrono&&!tempsEcoule)sTempsEcoule(true);},[maint,phase,finChrono,tempsEcoule]);
  // Sorties de page pendant l'épreuve ; avertissement en cas de rechargement ou de fermeture
  useEffect(()=>{
    if(phase!=="epreuve")return;
    let dehors=document.visibilityState==="hidden";
    const sortie=()=>{if(dehors||dialogue.current||phaseR.current!=="epreuve")return;dehors=true;sortiesR.current+=1;sSorties(sortiesR.current);
      if(sortiesR.current>SORTIES_AUTORISEES){ecrire(cloturer(tentR.current,{motif:"sorties"}));sPhase("termine");}};
    const retour=()=>{if(!dehors)return;dehors=false;if(phaseR.current==="epreuve")sAlerte(true);};
    const vis=()=>document.visibilityState==="hidden"?sortie():retour();
    const quitter=e=>{e.preventDefault();e.returnValue="";};
    document.addEventListener("visibilitychange",vis);window.addEventListener("blur",sortie);window.addEventListener("focus",retour);window.addEventListener("beforeunload",quitter);
    return()=>{document.removeEventListener("visibilitychange",vis);window.removeEventListener("blur",sortie);window.removeEventListener("focus",retour);window.removeEventListener("beforeunload",quitter);};
  },[phase]);
  // Quitter l'examen en cours (menu, retour) : tentative comptée comme abandonnée
  useEffect(()=>()=>{if(phaseR.current==="epreuve"&&tentR.current)ecrire(cloturer(tentR.current,{motif:"abandon"}));},[]);

  const exam=banque&&{id:`FINAL-${id}`,titre:F.titre,col:F.col,qcm:banque};
  const reste=tent?attente(tent,maint):0;
  const commencer=()=>{sortiesR.current=0;sSorties(0);sAlerte(false);sTempsEcoule(false);sInfo("");ecrire(demarrer(tentR.current));const t0=Date.now();sMaint(t0);sFinChrono(t0+duree*60000);sPhase("epreuve");};
  const resultat=r=>{if(phaseR.current!=="epreuve")return;ecrire(cloturer(tentR.current,{pct:r.pct,motif:r.motif}));sPhase("resultat");if(r.motif==="temps")sInfo(MOTIFS.temps);};
  const retour=()=>{if(phase==="epreuve"){dialogue.current=true;const oui=window.confirm("Quitter l'examen ? Cette tentative sera comptée comme non réussie.");setTimeout(()=>{dialogue.current=false;},300);if(!oui)return;}onRetour();};
  const pastille={background:"rgba(255,255,255,.16)",borderRadius:99,padding:"6px 12px",fontWeight:800,fontSize:13};
  const delaiCarte=tent&&reste>0&&<div style={{display:"flex",gap:10,alignItems:"flex-start",background:K.waBg,border:`1px solid ${K.waBd}`,borderRadius:12,padding:"11px 13px",marginTop:12}}>
    <i className="ti ti-hourglass" style={{fontSize:19,color:K.wa,marginTop:1}}/>
    <div style={{fontSize:13.5,color:K.t1,lineHeight:1.5}}>Prochaine tentative possible dans <b>{fmtAttente(reste)}</b>.<div style={{fontSize:12.5,color:K.t3,marginTop:2}}>{raisonDelai(tent)}</div></div>
  </div>;

  return <div style={{maxWidth:820,margin:"0 auto",animation:"fadeIn .3s ease"}}>
    <button onClick={retour} className="bt" style={{background:"none",border:"none",color:K.t2,fontSize:14,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:5,marginBottom:10,fontFamily:"'Outfit',sans-serif",padding:0}}>
      <i className="ti ti-arrow-left" style={{fontSize:16}}/>Retour au parcours</button>
    <div style={{background:`linear-gradient(135deg,#001433,${F.col} 60%,#B7791F)`,borderRadius:18,padding:mob?"18px 16px":"22px 24px",color:"#fff",marginBottom:14,position:"relative",overflow:"hidden"}}>
      <i className="ti ti-certificate" style={{position:"absolute",right:-8,bottom:-16,fontSize:110,opacity:.12}}/>
      <div style={{fontSize:12,fontWeight:800,letterSpacing:1,opacity:.85,textTransform:"uppercase"}}>Évaluation finale · {P.court||id}</div>
      <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:mob?22:27,lineHeight:1.2,margin:"4px 0 6px"}}>{F.titre}</div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>
        <span style={pastille}><i className="ti ti-list-numbers" style={{marginRight:4}}/>{x.nbQ} questions</span>
        <span style={pastille}><i className="ti ti-clock" style={{marginRight:4}}/>{duree} minutes</span>
        <span style={pastille}>Note minimale {SEUIL_ELEMENT} % · coef. {COEF_FINAL}</span>
        {ancien&&<span style={pastille}>Meilleure note : {ancien.pct} %</span>}
      </div>
    </div>

    {err?<Carte K={K}><div style={{color:K.er,fontSize:14}}>{err}</div></Carte>

    :phase==="termine"?<Carte K={K} sx={{textAlign:"center",padding:"26px 18px"}}>
      <i className="ti ti-door-exit" style={{fontSize:44,color:K.er}}/>
      <div style={{fontFamily:"'Fraunces',serif",fontWeight:800,fontSize:24,color:K.er,margin:"6px 0"}}>Examen terminé</div>
      <div style={{fontSize:14.5,color:K.t2,lineHeight:1.6,maxWidth:520,margin:"0 auto"}}>Vous avez quitté la page de l'examen {sortiesR.current} fois ; {SORTIES_AUTORISEES} sorties seulement sont autorisées. Cette tentative est <b>annulée</b>, sans note, et comptée comme non réussie.</div>
      <div style={{maxWidth:520,margin:"0 auto",textAlign:"left"}}>{delaiCarte}</div>
      <div style={{display:"flex",justifyContent:"center",marginTop:14}}><Bouton K={K} ico="arrow-left" ch="Retour au parcours" on={onRetour}/></div>
    </Carte>

    :phase==="consignes"||!exam?<Carte K={K}>
      {info&&<div style={{display:"flex",gap:9,alignItems:"flex-start",background:K.erBg,border:`1px solid ${K.erBd}`,borderRadius:12,padding:"10px 12px",marginBottom:12,fontSize:13.5,color:K.t1,lineHeight:1.5}}><i className="ti ti-alert-triangle" style={{fontSize:18,color:K.er}}/>{info}</div>}
      <div style={{fontWeight:800,fontSize:16,color:K.t1,marginBottom:4}}><i className="ti ti-clipboard-list" style={{color:K.in_,marginRight:6}}/>Consignes de l'examen final</div>
      <div style={{fontSize:13,color:K.t3,marginBottom:10}}>Vous accédez à cet examen parce que chaque module a été lu et réussi à {SEUIL_ELEMENT} % au moins, avec une moyenne d'au moins {SEUIL_MOYENNE} %.</div>
      {consignesExamen(id,banque&&banque.length,duree).map(([titre,lignes],g)=><div key={titre} style={{marginBottom:10}}>
        <div style={{fontSize:12.5,fontWeight:800,color:K.t2,letterSpacing:.5,textTransform:"uppercase",margin:"6px 0 6px"}}>{titre}</div>
        {lignes.map((l,k)=><div key={k} style={{display:"flex",gap:8,fontSize:14,color:K.t1,lineHeight:1.55,marginBottom:6}}><span style={{color:K.in_,fontWeight:900,minWidth:20}}>{consignesExamen(id,0,duree).slice(0,g).reduce((a,[,ls])=>a+ls.length,0)+k+1}.</span><span>{l}</span></div>)}
      </div>)}
      {tent&&tent.total>0&&<div style={{fontSize:13,color:K.t2,marginTop:4}}><i className="ti ti-history" style={{marginRight:5}}/>Tentatives déjà faites : <b>{tent.total}</b>{tent.echecs?<> · non réussies d'affilée : <b>{tent.echecs}</b></>:null}</div>}
      {delaiCarte}
      <label style={{display:"flex",gap:10,alignItems:"flex-start",background:K.c2,border:`1px solid ${engage?K.emBd:K.b1}`,borderRadius:12,padding:"12px 13px",marginTop:14,cursor:"pointer",fontSize:14,color:K.t1,lineHeight:1.5}}>
        <input type="checkbox" checked={engage} onChange={e=>sEngage(e.target.checked)} style={{width:20,height:20,marginTop:1,accentColor:K.em,flexShrink:0}}/>
        <span><b>Je m'engage sur l'honneur</b> à composer seul(e), sans document ni aide extérieure, et j'ai lu les consignes ci-dessus.</span>
      </label>
      <div style={{display:"flex",justifyContent:"center",marginTop:14}}>
        <Bouton K={K} ico={!exam||!tent?"loader-2":reste>0?"hourglass":"player-play"} dis={!exam||!tent||!engage||reste>0}
          ch={!exam||!tent?"Préparation des questions…":reste>0?`Disponible dans ${fmtAttente(reste)}`:"Commencer l'examen"} on={commencer} sx={{minWidth:240}}/>
      </div>
      {exam&&tent&&!engage&&reste===0&&<div style={{textAlign:"center",fontSize:12.5,color:K.t3,marginTop:6}}>Cochez l'engagement pour commencer.</div>}
    </Carte>

    :<>
      {phase==="epreuve"&&<div style={{position:"sticky",top:8,zIndex:5,display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap",background:K.card,border:`1px solid ${finChrono-maint<5*60000?K.erBd:K.b1}`,boxShadow:K.sh,borderRadius:12,padding:"9px 13px",marginBottom:10}}>
        <span style={{fontFamily:"'JetBrains Mono',monospace",fontWeight:800,fontSize:16,color:finChrono-maint<5*60000?K.er:K.t1}}><i className="ti ti-clock" style={{marginRight:5}}/>{fmtChrono(finChrono-maint)}</span>
        <span style={{fontSize:13,fontWeight:800,color:sorties?K.wa:K.t3}}><i className="ti ti-door-exit" style={{marginRight:4}}/>Sorties : {sorties} / {SORTIES_AUTORISEES}</span>
      </div>}
      {phase==="epreuve"&&alerte&&<div role="alert" style={{display:"flex",gap:9,alignItems:"flex-start",background:K.erBg,border:`1px solid ${K.erBd}`,borderRadius:12,padding:"10px 12px",marginBottom:10,fontSize:13.5,color:K.t1,lineHeight:1.5}}>
        <i className="ti ti-alert-triangle" style={{fontSize:18,color:K.er}}/>
        <div style={{flex:1}}>Vous avez quitté la page de l'examen (<b>{sorties} / {SORTIES_AUTORISEES}</b>). {sorties>=SORTIES_AUTORISEES?"À la prochaine sortie, l'examen sera terminé.":`À la ${SORTIES_AUTORISEES+1}e sortie, l'examen sera terminé.`}</div>
        <button onClick={()=>sAlerte(false)} className="bt" aria-label="Fermer" style={{background:"none",border:"none",cursor:"pointer",color:K.t3,fontSize:16}}><i className="ti ti-x"/></button>
      </div>}
      {phase==="resultat"&&info&&<div style={{background:K.waBg,border:`1px solid ${K.waBd}`,borderRadius:12,padding:"10px 12px",marginBottom:10,fontSize:13.5,color:K.t1}}><i className="ti ti-clock" style={{color:K.wa,marginRight:6}}/>{info}</div>}
      <Qcm key={`final-${id}`} K={K} mod={exam} db={db} uid={uid} ancien={ancien} cle={x.cle} nbQ={x.nbQ} seuil={SEUIL_ELEMENT} examen libRetour="Retour au parcours"
        tempsEcoule={tempsEcoule} onResultat={resultat} onFin={(r,ret)=>{if(r&&onScore)onScore(x.cle,r);if(ret)onRetour();}}/>
      {phase==="resultat"&&delaiCarte}
    </>}
  </div>;
}
