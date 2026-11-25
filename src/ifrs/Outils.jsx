import React,{useMemo,useState}from"react";
import{tie,ecl,bail,impotsDifferes,devises,allocation,ugt,composants}from"./calculs";
import{NORMES,FAMILLES,FLASHCARDS,CERTIFICATIONS}from"./normes";

// ══════════════════ IFRS : OUTILS INTERACTIFS DES LEÇONS ══════════════════
// Blocs de leçon { type: "schema", kind: <clé de SCHEMAS_IFRS>, … } : arbres de décision cliquables, simulateurs qui se
// recalculent à chaque saisie (comme les cellules bleues du classeur), flashcards à répétition espacée, carte des normes.

const fmt=(n,d=0)=>Number.isFinite(n)?n.toLocaleString("fr-FR",{minimumFractionDigits:d,maximumFractionDigits:d}).replace(/ /g," "):"—";
const pct=(n,d=2)=>`${fmt(n*100,d)} %`;
const boite=K=>({background:K.c2,border:`1px solid ${K.b0}`,borderRadius:12,padding:"11px 12px"});

// Champ numérique (montant, taux en %, durée) ; « pourcent » : saisie en %, valeur en fraction
function Champ({K,l,v,s,pourcent,pas,suffixe}){
  const aff=pourcent?Math.round(v*10000)/100:v;
  return <label style={{display:"flex",flexDirection:"column",gap:4,minWidth:0}}>
    <span style={{fontSize:12,fontWeight:700,color:K.t3}}>{l}</span>
    <span style={{display:"flex",alignItems:"center",gap:5}}>
      <input type="number" inputMode="decimal" step={pas||"any"} value={aff} onChange={e=>{const x=parseFloat(String(e.target.value).replace(",","."));s(Number.isFinite(x)?(pourcent?x/100:x):0);}}
        style={{width:"100%",minWidth:0,boxSizing:"border-box",background:K.card,border:`1px solid ${K.b1}`,borderRadius:9,padding:"8px 10px",color:"#1D4ED8",fontWeight:800,fontSize:14,fontFamily:"'JetBrains Mono',monospace"}}/>
      {(pourcent||suffixe)&&<span style={{fontSize:12.5,color:K.t3,fontWeight:700}}>{pourcent?"%":suffixe}</span>}
    </span>
  </label>;
}
const Grille=({children})=><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(130px,1fr))",gap:9,marginBottom:10}}>{children}</div>;
const Resultat=({K,col,l,v,fort,note})=><div style={{...boite(K),background:fort?`${col}14`:K.c2,border:`1px solid ${fort?`${col}55`:K.b0}`}}>
  <div style={{fontSize:11.5,fontWeight:700,color:K.t3}}>{l}</div>
  <div style={{fontSize:fort?18:15.5,fontWeight:900,color:fort?col:K.t1,fontFamily:"'JetBrains Mono',monospace",marginTop:2}}>{v}</div>
  {note&&<div style={{fontSize:11.5,color:K.t3,marginTop:2,lineHeight:1.35}}>{note}</div>}
</div>;
const Note=({K,children})=><div style={{fontSize:12.5,color:K.t2,lineHeight:1.55,marginTop:8,background:K.c2,borderRadius:10,padding:"8px 11px"}}><i className="ti ti-bulb" style={{color:"#C98A1B",marginRight:5}}/>{children}</div>;
function Table_({K,entetes,lignes}){
  const c={padding:"6px 8px",fontSize:12.5,borderTop:`1px solid ${K.b0}`,textAlign:"right",fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"};
  return <div style={{overflowX:"auto",border:`1px solid ${K.b0}`,borderRadius:10}}><table style={{width:"100%",borderCollapse:"collapse"}}>
    <thead><tr style={{background:K.c2}}>{entetes.map((h,i)=><th key={i} style={{...c,borderTop:"none",fontFamily:"inherit",fontSize:11.5,color:K.t3,textAlign:i?"right":"left"}}>{h}</th>)}</tr></thead>
    <tbody>{lignes.map((l,i)=><tr key={i}>{l.map((x,j)=><td key={j} style={{...c,textAlign:j?"right":"left",color:K.t1}}>{x}</td>)}</tr>)}</tbody>
  </table></div>;
}

// ── Arbre de décision : on répond Oui / Non, l'outil mène à la conclusion ──
// noeuds : { id: { q, aide?, oui: id | { fin, texte }, non: id | { fin, texte } } }, depart : id
function Decision({K,col,noeuds,depart,cas}){
  const[chemin,sChemin]=useState([]);
  let id=depart,fin=null;
  for(const r of chemin){const n=noeuds[id],suite=n[r];if(typeof suite==="string")id=suite;else{fin=suite;break;}}
  const n=noeuds[id];
  const bouton=(on,c)=>({display:"inline-flex",alignItems:"center",gap:6,padding:"9px 16px",borderRadius:10,fontWeight:800,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif",border:"none",background:c,color:"#fff",minHeight:40});
  const histo=[];{let i2=depart;for(const r of chemin){const x=noeuds[i2];histo.push({q:x.q,r});const s=x[r];if(typeof s==="string")i2=s;else break;}}
  return <div>
    {cas&&<div style={{...boite(K),marginBottom:10,fontSize:13.5,color:K.t1,lineHeight:1.5}}><b>Cas :</b> {cas}</div>}
    {histo.map((h,i)=><div key={i} style={{display:"flex",gap:8,alignItems:"flex-start",fontSize:13,color:K.t2,marginBottom:6}}>
      <span style={{fontWeight:900,color:h.r==="oui"?K.em:K.er,minWidth:34}}>{h.r==="oui"?"Oui":"Non"}</span><span style={{lineHeight:1.45}}>{h.q}</span></div>)}
    {!fin?<div style={{border:`2px solid ${col}`,borderRadius:12,padding:"12px 13px",marginTop:4}}>
      <div style={{fontSize:11.5,fontWeight:800,color:col,textTransform:"uppercase",letterSpacing:.5}}>Question {chemin.length+1}</div>
      <div style={{fontSize:15,fontWeight:800,color:K.t1,lineHeight:1.4,margin:"4px 0 6px"}}>{n.q}</div>
      {n.aide&&<div style={{fontSize:12.5,color:K.t3,lineHeight:1.45,marginBottom:8}}>{n.aide}</div>}
      <div style={{display:"flex",gap:8}}><button onClick={()=>sChemin(c=>[...c,"oui"])} className="bt" style={bouton(true,K.em)}><i className="ti ti-check"/>Oui</button><button onClick={()=>sChemin(c=>[...c,"non"])} className="bt" style={bouton(false,K.er)}><i className="ti ti-x"/>Non</button></div>
    </div>
    :<div style={{background:`${col}14`,border:`2px solid ${col}`,borderRadius:12,padding:"12px 13px",marginTop:4}}>
      <div style={{fontSize:11.5,fontWeight:800,color:col,textTransform:"uppercase",letterSpacing:.5}}><i className="ti ti-flag" style={{marginRight:4}}/>Conclusion</div>
      <div style={{fontSize:16,fontWeight:900,color:K.t1,margin:"3px 0 5px"}}>{fin.fin}</div>
      <div style={{fontSize:13.5,color:K.t2,lineHeight:1.5}}>{fin.texte}</div>
    </div>}
    {chemin.length>0&&<button onClick={()=>sChemin([])} className="bt" style={{marginTop:9,background:"none",border:`1px solid ${K.b1}`,borderRadius:9,padding:"7px 12px",color:K.t2,fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}><i className="ti ti-rotate-clockwise" style={{marginRight:4}}/>Recommencer</button>}
  </div>;
}

// ── IFRS 9 : coût amorti et TIE ──
function Tie({K,col,defaut={}}){
  const[d,sD]=useState({nominal:100000,taux:0.1,duree:5,frais:2000,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>tie(d),[d]),l1=r.lignes[0]||{};
  return <div>
    <Grille><Champ K={K} l="Nominal (USD)" v={d.nominal} s={s("nominal")}/><Champ K={K} l="Taux nominal" v={d.taux} s={s("taux")} pourcent/><Champ K={K} l="Durée (années)" v={d.duree} s={s("duree")} pas="1"/><Champ K={K} l="Frais de dossier perçus" v={d.frais} s={s("frais")}/></Grille>
    <Grille><Resultat K={K} col={col} l="Valeur initiale" v={fmt(r.vi)}/><Resultat K={K} col={col} l="Taux d'intérêt effectif" v={pct(r.tie,3)} fort/><Resultat K={K} col={col} l="Intérêts IFRS 9 année 1" v={fmt(l1.interet,2)} note={`dont coupon ${fmt(l1.coupon)}`}/></Grille>
    <Table_ K={K} entetes={["Année","Ouverture","Intérêts (TIE)","Encaissé","Clôture"]} lignes={r.lignes.map(x=>[x.annee,fmt(x.ouverture,2),fmt(x.interet,2),fmt(x.coupon+x.remboursement),fmt(x.cloture,2)])}/>
    <Note K={K}>Les {fmt(d.frais)} USD de frais ne sont pas une commission immédiate : ils sont <b>étalés dans la marge d'intérêt</b> (chaque année, intérêts TIE &gt; coupon), et la valeur du prêt remonte vers le nominal à l'échéance.</Note>
  </div>;
}

// ── IFRS 9 : dépréciation ECL ──
function Ecl({K,col,defaut={}}){
  const[d,sD]=useState({ead:500000,lgd:0.45,pd12:0.02,pdVie:0.09,jours:0,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>ecl(d),[d]);const cs=["#15803D","#C98A1B","#B91C1C"][r.stade-1];
  return <div>
    <Grille><Champ K={K} l="EAD (exposition, USD)" v={d.ead} s={s("ead")}/><Champ K={K} l="LGD (perte en cas de défaut)" v={d.lgd} s={s("lgd")} pourcent/><Champ K={K} l="PD à 12 mois" v={d.pd12} s={s("pd12")} pourcent/><Champ K={K} l="PD durée de vie" v={d.pdVie} s={s("pdVie")} pourcent/></Grille>
    <div style={{...boite(K),marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:800,color:K.t1}}><span>Jours de retard de paiement</span><span style={{color:cs}}>{d.jours} jours</span></div>
      <input type="range" min="0" max="150" value={d.jours} onChange={e=>s("jours")(+e.target.value)} aria-label="Jours de retard" style={{width:"100%",accentColor:cs,marginTop:6}}/>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:11.5,color:K.t3}}><span>0</span><span>30 j</span><span>90 j</span><span>150 j</span></div>
    </div>
    <div style={{display:"flex",gap:6,marginBottom:10}}>{[1,2,3].map(k=><div key={k} style={{flex:1,textAlign:"center",padding:"8px 4px",borderRadius:10,fontWeight:900,fontSize:13,background:r.stade===k?["#15803D","#C98A1B","#B91C1C"][k-1]:K.c2,color:r.stade===k?"#fff":K.t3}}>Stade {k}<div style={{fontSize:11,fontWeight:700,opacity:.9}}>{["ECL 12 mois","ECL vie entière","Défaut"][k-1]}</div></div>)}</div>
    <Grille><Resultat K={K} col={cs} l="Dépréciation ECL" v={fmt(r.montant)} fort/><Resultat K={K} col={cs} l="ECL 12 mois (octroi)" v={fmt(r.ecl12)}/><Resultat K={K} col={cs} l="Dotation complémentaire" v={fmt(r.complement)} note={r.stade>1?"« effet falaise » du passage en stade 2":""}/></Grille>
    <Note K={K}>Intérêts calculés sur la <b>{r.base}</b>. Formule simplifiée : ECL = EAD × PD × LGD. Faites glisser le curseur au-delà de 30 puis de 90 jours.</Note>
  </div>;
}

// ── IFRS 16 : bail du preneur ──
function Bail({K,col,defaut={}}){
  const[d,sD]=useState({loyer:12000,duree:5,taux:0.08,coutsDirects:1000,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>bail(d),[d]);const max=Math.max(...r.lignes.map(x=>Math.max(x.chargeIfrs,x.chargeLoyer)),1);
  return <div>
    <Grille><Champ K={K} l="Loyer annuel (USD)" v={d.loyer} s={s("loyer")}/><Champ K={K} l="Durée (années)" v={d.duree} s={s("duree")} pas="1"/><Champ K={K} l="Taux marginal d'endettement" v={d.taux} s={s("taux")} pourcent/><Champ K={K} l="Coûts directs initiaux" v={d.coutsDirects} s={s("coutsDirects")}/></Grille>
    <Grille><Resultat K={K} col={col} l="Dette locative initiale" v={fmt(r.dette0,2)} fort/><Resultat K={K} col={col} l="Droit d'utilisation" v={fmt(r.droitUtilisation,2)}/><Resultat K={K} col={col} l="Amortissement annuel" v={fmt(r.amort,2)}/></Grille>
    <div style={{...boite(K),marginBottom:10}}>
      <div style={{fontSize:12.5,fontWeight:800,color:K.t1,marginBottom:6}}>Charge par année : IFRS 16 (intérêts + amortissement) et loyer SYSCOHADA</div>
      {r.lignes.map(x=><div key={x.annee} style={{display:"grid",gridTemplateColumns:"42px 1fr 86px",gap:6,alignItems:"center",marginBottom:4,fontSize:12}}>
        <span style={{color:K.t3,fontWeight:700}}>An {x.annee}</span>
        <div><div style={{height:9,width:`${x.chargeIfrs/max*100}%`,background:col,borderRadius:5}}/><div style={{height:6,width:`${x.chargeLoyer/max*100}%`,background:K.b1,borderRadius:5,marginTop:2}}/></div>
        <span style={{textAlign:"right",fontFamily:"'JetBrains Mono',monospace",color:K.t1}}>{fmt(x.chargeIfrs)}</span></div>)}
      <div style={{fontSize:11.5,color:K.t3,marginTop:4}}><span style={{display:"inline-block",width:10,height:8,background:col,borderRadius:3,marginRight:4}}/>IFRS 16 · <span style={{display:"inline-block",width:10,height:6,background:K.b1,borderRadius:3,margin:"0 4px 0 8px"}}/>loyer {fmt(d.loyer)}</div>
    </div>
    <Table_ K={K} entetes={["Année","Dette ouverture","Intérêts","Loyer payé","Dette clôture"]} lignes={r.lignes.map(x=>[x.annee,fmt(x.ouverture,2),fmt(x.interet,2),fmt(x.loyer),fmt(x.cloture,2)])}/>
    <Note K={K}>La charge IFRS 16 est <b>plus lourde au début du bail</b> (intérêts dégressifs) ; sur toute la durée, elle égale les loyers plus les coûts directs.</Note>
  </div>;
}

// ── IAS 12 : impôts différés ──
function Impots({K,col,defaut={}}){
  const[d,sD]=useState({vc:90000,base:80000,provision:20000,taux:0.3,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>impotsDifferes([{l:"Matériel informatique",type:"actif",vc:d.vc,base:d.base},{l:"Provision non déductible",type:"provision",montant:d.provision}],d.taux),[d]);
  return <div>
    <Grille><Champ K={K} l="Matériel : valeur comptable" v={d.vc} s={s("vc")}/><Champ K={K} l="Matériel : base fiscale" v={d.base} s={s("base")}/><Champ K={K} l="Provision non déductible" v={d.provision} s={s("provision")}/><Champ K={K} l="Taux d'impôt" v={d.taux} s={s("taux")} pourcent/></Grille>
    <Table_ K={K} entetes={["Élément","Différence","Nature","Impôt différé"]} lignes={r.lignes.map(x=>[x.l,fmt(x.diff),x.nature==="IDP"?"Passif (IDP)":x.nature==="IDA"?"Actif (IDA)":"—",fmt(x.impot)])}/>
    <div style={{marginTop:10}}><Grille><Resultat K={K} col={col} l="Actifs d'impôt différé" v={fmt(r.ida)}/><Resultat K={K} col={col} l="Passifs d'impôt différé" v={fmt(r.idp)}/><Resultat K={K} col={col} l={r.net>=0?"Position nette : actif":"Position nette : passif"} v={fmt(Math.abs(r.net))} fort/></Grille></div>
    <Note K={K}>Valeur comptable d'un actif <b>supérieure</b> à sa base fiscale → impôt à payer plus tard → <b>passif</b> d'impôt différé. Charge non encore déductible → <b>actif</b>, seulement si des bénéfices imposables futurs sont probables.</Note>
  </div>;
}

// ── IAS 21 : devises USD / CDF ──
function Devise({K,col,defaut={}}){
  const[d,sD]=useState({montant:50000,coursInitial:2750,coursCloture:2900,monetaire:true,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>devises(d),[d]);
  const puce=on=>({flex:1,padding:"8px 6px",borderRadius:10,fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif",border:`1px solid ${on?col:K.b1}`,background:on?col:K.card,color:on?"#fff":K.t2});
  return <div>
    <div style={{display:"flex",gap:6,marginBottom:10}}><button onClick={()=>s("monetaire")(true)} className="bt" style={puce(d.monetaire)}>Élément monétaire (prêt, dépôt)</button><button onClick={()=>s("monetaire")(false)} className="bt" style={puce(!d.monetaire)}>Non monétaire au coût (immeuble)</button></div>
    <Grille><Champ K={K} l="Montant (USD)" v={d.montant} s={s("montant")}/><Champ K={K} l="Cours à l'origine (CDF/USD)" v={d.coursInitial} s={s("coursInitial")}/><Champ K={K} l="Cours de clôture (CDF/USD)" v={d.coursCloture} s={s("coursCloture")}/></Grille>
    <Grille><Resultat K={K} col={col} l="À l'origine (CDF)" v={fmt(r.initial)}/><Resultat K={K} col={col} l="À la clôture (CDF)" v={fmt(r.cloture)}/><Resultat K={K} col={col} l="IFRS : écart en résultat" v={`${r.ifrsResultat>0?"+":""}${fmt(r.ifrsResultat)}`} fort/></Grille>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:9}}>
      <div style={{...boite(K),borderLeft:`4px solid ${col}`}}><div style={{fontWeight:800,fontSize:13,color:col}}>IFRS (IAS 21)</div><div style={{fontSize:13,color:K.t1,marginTop:3,lineHeight:1.45}}>{d.monetaire?"Réévalué au cours de clôture ; gain comme perte en résultat.":"Cours historique : aucune réévaluation."}</div></div>
      <div style={{...boite(K),borderLeft:"4px solid #0A2A5C"}}><div style={{fontWeight:800,fontSize:13,color:"#0A2A5C"}}>SYSCOHADA (comptes individuels)</div><div style={{fontSize:13,color:K.t1,marginTop:3,lineHeight:1.45}}>{r.syscohada.texte}{r.syscohada.resultat?` : ${fmt(r.syscohada.resultat)} en charge.`:"."}</div></div>
    </div>
  </div>;
}

// ── IFRS 15 : forfait à plusieurs obligations ──
function Forfait({K,col,defaut={}}){
  const[d,sD]=useState({prix:240,carte:60,tenue:240,mois:3,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>allocation({prix:d.prix,moisEcoules:d.mois,obligations:[{l:"Carte (livrée tout de suite)",prixSepare:d.carte,mode:"instant"},{l:"Tenue de compte (12 mois)",prixSepare:d.tenue,mode:"progressif",dureeMois:12}]}),[d]);
  return <div>
    <Grille><Champ K={K} l="Prix du forfait (USD)" v={d.prix} s={s("prix")}/><Champ K={K} l="Prix séparé de la carte" v={d.carte} s={s("carte")}/><Champ K={K} l="Prix séparé de la tenue" v={d.tenue} s={s("tenue")}/></Grille>
    <div style={{...boite(K),marginBottom:10}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:13,fontWeight:800,color:K.t1}}><span>Mois de service écoulés à la clôture</span><span style={{color:col}}>{d.mois} / 12</span></div>
      <input type="range" min="0" max="12" value={d.mois} onChange={e=>s("mois")(+e.target.value)} aria-label="Mois écoulés" style={{width:"100%",accentColor:col,marginTop:6}}/>
    </div>
    <Table_ K={K} entetes={["Obligation","Prix alloué","Revenu reconnu"]} lignes={r.lignes.map(o=>[o.l,fmt(o.alloue,2),fmt(o.revenu,2)])}/>
    <div style={{marginTop:10}}><Grille><Resultat K={K} col={col} l="Revenu de l'exercice" v={fmt(r.revenu,2)} fort/><Resultat K={K} col={col} l="Passif sur contrat" v={fmt(r.passif,2)} note="service restant dû au client"/></Grille></div>
  </div>;
}

// ── IAS 36 : test d'une UGT ──
function Ugt({K,col,defaut={}}){
  const[d,sD]=useState({vc:1200000,goodwill:100000,jvCouts:950000,vu:1000000,...defaut});const s=k=>v=>sD(x=>({...x,[k]:v}));
  const r=useMemo(()=>ugt(d),[d]);
  return <div>
    <Grille><Champ K={K} l="Valeur comptable de l'UGT" v={d.vc} s={s("vc")}/><Champ K={K} l="dont goodwill" v={d.goodwill} s={s("goodwill")}/><Champ K={K} l="Juste valeur − coûts de sortie" v={d.jvCouts} s={s("jvCouts")}/><Champ K={K} l="Valeur d'utilité" v={d.vu} s={s("vu")}/></Grille>
    <Grille><Resultat K={K} col={col} l="Valeur recouvrable" v={fmt(r.recouvrable)} note={`la plus élevée : ${r.retenue}`}/><Resultat K={K} col={col} l="Perte de valeur" v={fmt(r.perte)} fort/><Resultat K={K} col={col} l="Sur le goodwill" v={fmt(r.surGoodwill)} note="jamais reprise"/><Resultat K={K} col={col} l="Sur les autres actifs" v={fmt(r.surAutres)} note="au prorata"/></Grille>
  </div>;
}

// ── IAS 16 : composants ──
function Composants({K,col}){
  const[p,sP]=useState([{l:"Gros œuvre",montant:1200000,duree:50},{l:"Toiture et façade",montant:240000,duree:20},{l:"Installations techniques",montant:160000,duree:10}]);
  const[g,sG]=useState(40);
  const r=useMemo(()=>composants({terrain:400000,parties:p,dureeGlobale:g}),[p,g]);
  const maj=(i,k)=>v=>sP(L=>L.map((x,j)=>j===i?{...x,[k]:v}:x));
  return <div>
    {p.map((x,i)=><div key={i} style={{marginBottom:2}}><div style={{fontSize:12.5,fontWeight:800,color:K.t1,marginBottom:3}}>{x.l}</div><Grille><Champ K={K} l="Montant (USD)" v={x.montant} s={maj(i,"montant")}/><Champ K={K} l="Durée (ans)" v={x.duree} s={maj(i,"duree")} pas="1"/><Resultat K={K} col={col} l="Dotation annuelle" v={fmt(r.lignes[i].dotation)}/></Grille></div>)}
    <Grille><Champ K={K} l="Durée si amortissement global" v={g} s={sG} pas="1" suffixe="ans"/><Resultat K={K} col={col} l="Par composants" v={fmt(r.dotation)} fort/><Resultat K={K} col={col} l="Globalement" v={fmt(r.globale)} note={`écart ${fmt(r.ecart)} par an`}/></Grille>
    <Note K={K}>Le terrain (400 000 USD) n'est pas amorti. L'approche globale sous-estime la charge quand des composants s'usent plus vite que le gros œuvre.</Note>
  </div>;
}

// ── Flashcards à répétition espacée (J+1, J+3, J+7), mémorisées sur l'appareil ──
const CLE_FC="ec-ifrs-flashcards";
const lireFC=()=>{try{return JSON.parse(localStorage.getItem(CLE_FC)||"{}");}catch{return{};}};
const JOURS_FC=[1,3,7];
export function aReviser(etat,n,maintenant=Date.now()){const e=etat[n];return !e||e.prochaine<=maintenant;}
function Flashcards({K,col,themes}){
  const cartes=useMemo(()=>FLASHCARDS.filter(c=>!themes||themes.some(t=>c.theme.includes(t))),[themes]);
  const[etat,sEtat]=useState(lireFC);
  const dues=cartes.filter(c=>aReviser(etat,c.n));
  const[i,sI]=useState(0),[vue,sVue]=useState(false);
  const liste=dues.length?dues:cartes,c=liste[i%Math.max(1,liste.length)];
  const noter=score=>{const e={...etat,[c.n]:{score,le:Date.now(),prochaine:Date.now()+JOURS_FC[score]*864e5}};sEtat(e);try{localStorage.setItem(CLE_FC,JSON.stringify(e));}catch{}sVue(false);sI(x=>x+1);};
  if(!c)return null;
  const sues=cartes.filter(x=>etat[x.n]&&etat[x.n].score===2).length;
  return <div>
    <div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,color:K.t3,fontWeight:700,marginBottom:8,flexWrap:"wrap",gap:6}}>
      <span>{dues.length?`${dues.length} carte${dues.length>1?"s":""} à revoir aujourd'hui`:"Tout est révisé pour aujourd'hui : entraînement libre"}</span><span>{sues} / {cartes.length} sues</span></div>
    <button onClick={()=>sVue(v=>!v)} className="bt" aria-label={vue?"Masquer la réponse":"Voir la réponse"} style={{width:"100%",textAlign:"left",minHeight:150,border:`2px solid ${vue?col:K.b1}`,borderRadius:14,padding:"14px 15px",background:vue?`${col}0F`:K.card,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
      <div style={{fontSize:11.5,fontWeight:800,color:col,textTransform:"uppercase",letterSpacing:.5}}>{c.theme} · {vue?"réponse":"question"}</div>
      <div style={{fontSize:16,fontWeight:800,color:K.t1,lineHeight:1.45,marginTop:5}}>{c.q}</div>
      {vue?<div style={{fontSize:14.5,color:K.t1,lineHeight:1.55,marginTop:9,paddingTop:9,borderTop:`1px dashed ${K.b1}`}}>{c.r}</div>
        :<div style={{fontSize:12.5,color:K.t3,marginTop:10}}><i className="ti ti-hand-finger" style={{marginRight:4}}/>Répondez de tête, puis touchez la carte pour voir la réponse</div>}
    </button>
    {vue&&<div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,marginTop:8}}>
      {[["À revoir","demain","#B91C1C"],["Hésitant","dans 3 jours","#C98A1B"],["Su","dans 7 jours","#15803D"]].map(([l,q,cc],k)=><button key={k} onClick={()=>noter(k)} className="bt" style={{padding:"9px 4px",borderRadius:10,border:"none",background:cc,color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{l}<div style={{fontSize:11,fontWeight:600,opacity:.9}}>{q}</div></button>)}
    </div>}
  </div>;
}

// ── Carte des normes : filtres par famille, importance en banque, question de mémorisation ──
function CarteNormes({K,col}){
  const[f,sF]=useState(null),[q,sQ]=useState(""),[ouvert,sOuvert]=useState(null),[rep,sRep]=useState({});
  const L=NORMES.filter(n=>(f==null||n.famille===f)&&(!q.trim()||`${n.code} ${n.titre} ${n.logique}`.toLowerCase().includes(q.trim().toLowerCase())));
  const puce=on=>({padding:"6px 10px",borderRadius:99,fontSize:12.5,fontWeight:800,cursor:"pointer",fontFamily:"'Outfit',sans-serif",border:`1px solid ${on?col:K.b1}`,background:on?col:K.card,color:on?"#fff":K.t2,whiteSpace:"nowrap"});
  return <div>
    <input value={q} onChange={e=>sQ(e.target.value)} placeholder="Chercher une norme (ex. IFRS 16, provision, devises)…" aria-label="Chercher une norme" style={{width:"100%",boxSizing:"border-box",background:K.c2,border:`1px solid ${K.b0}`,borderRadius:10,padding:"9px 12px",color:K.t1,fontSize:14,fontFamily:"'Outfit',sans-serif",marginBottom:8}}/>
    <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}><button onClick={()=>sF(null)} className="bt" style={puce(f==null)}>Toutes ({NORMES.length})</button>{FAMILLES.map(x=><button key={x.id} onClick={()=>sF(x.id)} className="bt" style={puce(f===x.id)}>{x.l}</button>)}</div>
    {L.map(n=>{const o=ouvert===n.n;return <div key={n.n} style={{border:`1px solid ${o?col:K.b0}`,borderRadius:12,marginBottom:6,background:K.card,overflow:"hidden"}}>
      <button onClick={()=>sOuvert(o?null:n.n)} className="bt" aria-expanded={o} style={{display:"flex",alignItems:"center",gap:10,width:"100%",textAlign:"left",padding:"9px 11px",background:"none",border:"none",cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>
        <span style={{fontWeight:900,fontSize:13,color:col,minWidth:86}}>{n.code}</span>
        <span style={{flex:1,fontSize:13.5,color:K.t1,fontWeight:700,lineHeight:1.35}}>{n.titre}</span>
        <span title="Importance pour une banque" style={{color:"#C98A1B",fontSize:12,letterSpacing:1,whiteSpace:"nowrap"}}>{"★".repeat(n.banque)||"–"}</span>
        <i className={`ti ti-chevron-${o?"up":"down"}`} style={{color:K.t3}}/>
      </button>
      {o&&<div style={{padding:"0 12px 12px",fontSize:13.5,lineHeight:1.55,color:K.t1}}>
        <div style={{fontSize:11.5,fontWeight:800,color:K.t3,textTransform:"uppercase",marginTop:2}}>Logique clé</div><div>{n.logique}</div>
        <div style={{fontSize:11.5,fontWeight:800,color:K.t3,textTransform:"uppercase",marginTop:8}}>Différence avec le SYSCOHADA</div><div>{n.syscohada}</div>
        <div style={{...boite(K),marginTop:9}}><div style={{fontWeight:800,color:K.t1}}><i className="ti ti-help-circle" style={{color:col,marginRight:5}}/>{n.q}</div>
          {rep[n.n]?<div style={{marginTop:6,color:K.t1}}>{n.r}</div>:<button onClick={()=>sRep(x=>({...x,[n.n]:true}))} className="bt" style={{marginTop:7,background:col,color:"#fff",border:"none",borderRadius:9,padding:"6px 12px",fontWeight:800,fontSize:12.5,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>Voir la réponse</button>}
        </div>
      </div>}
    </div>;})}
    {!L.length&&<div style={{fontSize:13.5,color:K.t3,padding:"10px 0"}}>Aucune norme ne correspond.</div>}
  </div>;
}

// ── Formations et certifications pour aller plus loin ──
function Certifications({K,col}){
  return <div style={{display:"flex",flexDirection:"column",gap:7}}>{CERTIFICATIONS.map(c=><a key={c.ordre} href={c.lien} target="_blank" rel="noopener noreferrer" className="hv" style={{display:"flex",gap:10,alignItems:"flex-start",textDecoration:"none",border:`1px solid ${K.b0}`,borderRadius:12,padding:"10px 12px",background:K.card}}>
    <span style={{width:26,height:26,borderRadius:"50%",background:`${col}18`,color:col,fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:13}}>{c.ordre}</span>
    <span style={{flex:1,minWidth:0}}><span style={{display:"block",fontWeight:800,fontSize:13.5,color:K.t1}}>{c.titre}</span>
      <span style={{display:"block",fontSize:12.5,color:K.t3,marginTop:2}}>{c.organisme} · {c.langue} · {c.cout}</span>
      <span style={{display:"block",fontSize:12.5,color:K.t2,marginTop:3,lineHeight:1.45}}>{c.conseil}</span></span>
    <i className="ti ti-external-link" style={{color:K.t3}}/>
  </a>)}<div style={{fontSize:12,color:K.t3}}>Informations relevées le 25/11/2026 : tarifs et sessions à reconfirmer sur le site de chaque organisme.</div></div>;
}

export const SCHEMAS_IFRS={decision:Decision,tie:Tie,ecl:Ecl,bail:Bail,impots:Impots,devise:Devise,forfait:Forfait,ugt:Ugt,composants:Composants,flashcards:Flashcards,carteNormes:CarteNormes,certifications:Certifications};
