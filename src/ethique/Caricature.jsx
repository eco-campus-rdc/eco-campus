import React from"react";
// Texte avec **gras** (défini ici : CodeImpots.jsx importe ce fichier, on évite l'import circulaire)
const T=({t})=>{const p=String(t||"").split("**");return <>{p.map((x,i)=>i%2?<b key={i}>{x}</b>:<React.Fragment key={i}>{x}</React.Fragment>)}</>;};

// ══════════════════ ÉTHIQUE : CARICATURES ET CAS PRATIQUES ══════════════════
// Schémas de leçon (bloc { type: "schema", kind }) :
// - caricature : dessin de presse original (personnages génériques, aucune personne réelle) + légende ;
// - dilemme : cas pratique, options avec arguments pour et contre, question de réflexion.
// Dessins SVG en couleurs fixes (une vignette reste claire, en thème clair comme sombre).

const PEAUX=["#8D5524","#6B3E1F","#A0662E","#5A3214"];
const ENCRE="#1F2937";

// Personnage debout, pieds en (x, y). expr : content | inquiet | malin | neutre | choque | sevère ; bras : bas | tend | leve | pointe | dos | porte
function Perso({x,y,s=1,peau=0,haut="#2563EB",bas="#1F2937",expr="neutre",bras="bas",cravate,lunettes,foulard,miroir}){
  const P=PEAUX[peau%PEAUX.length];
  const bouche={content:"M-7,4 Q0,11 7,4",inquiet:"M-7,8 Q0,2 7,8",malin:"M-6,6 Q2,10 8,3",neutre:"M-6,6 L6,6",choque:null,severe:"M-7,7 L7,5"}[expr];
  const brasG="M-18,-78 L-26,-46",brasD={bas:"M18,-78 L26,-46",tend:"M18,-78 L50,-70",leve:"M18,-78 L30,-112",pointe:"M18,-78 L52,-88",dos:"M18,-78 L4,-52",porte:"M18,-78 L36,-60"}[bras]||"M18,-78 L26,-46";
  return <g transform={`translate(${x} ${y}) scale(${miroir?-s:s} ${s})`}>
    <rect x={-14} y={-40} width={11} height={40} rx={4} fill={bas}/><rect x={3} y={-40} width={11} height={40} rx={4} fill={bas}/>
    <rect x={-17} y={-3} width={16} height={6} rx={3} fill={ENCRE}/><rect x={1} y={-3} width={16} height={6} rx={3} fill={ENCRE}/>
    <path d={brasG} stroke={haut} strokeWidth={9} strokeLinecap="round"/>
    <path d={brasD} stroke={haut} strokeWidth={9} strokeLinecap="round"/>
    <rect x={-20} y={-86} width={40} height={50} rx={14} fill={haut}/>
    {cravate&&<path d="M0,-84 L-4,-76 L0,-56 L4,-76 Z" fill={cravate}/>}
    {foulard&&<path d="M-12,-86 Q0,-76 12,-86 L10,-80 Q0,-72 -10,-80 Z" fill={foulard}/>}
    <circle cx={-26} cy={-46} r={5} fill={P}/>
    <circle cx={brasD.split("L")[1].split(",")[0]*1} cy={brasD.split(",")[2]*1} r={5} fill={P}/>
    <rect x={-6} y={-92} width={12} height={10} fill={P}/>
    <circle cx={0} cy={-106} r={18} fill={P}/>
    <path d="M-17,-112 Q-14,-127 0,-126 Q15,-127 17,-112 Q9,-120 0,-119 Q-9,-120 -17,-112 Z" fill="#111827"/>
    <g transform="translate(0 -106)">
      {expr==="malin"?<><path d="M-9,-6 L-3,-4" stroke={ENCRE} strokeWidth={2}/><path d="M3,-7 L9,-9" stroke={ENCRE} strokeWidth={2}/></>
        :expr==="severe"?<><path d="M-10,-7 L-3,-4" stroke={ENCRE} strokeWidth={2}/><path d="M3,-4 L10,-7" stroke={ENCRE} strokeWidth={2}/></>
        :expr==="inquiet"?<><path d="M-10,-5 L-3,-8" stroke={ENCRE} strokeWidth={2}/><path d="M3,-8 L10,-5" stroke={ENCRE} strokeWidth={2}/></>:null}
      <circle cx={-6} cy={-1} r={2.3} fill={ENCRE}/><circle cx={6} cy={-1} r={2.3} fill={ENCRE}/>
      {lunettes&&<g stroke={ENCRE} strokeWidth={1.4} fill="none"><circle cx={-6} cy={-1} r={5}/><circle cx={6} cy={-1} r={5}/><path d="M-1,-1 L1,-1"/></g>}
      {bouche?<path d={bouche} stroke={ENCRE} strokeWidth={2} fill="none" strokeLinecap="round"/>:<ellipse cx={0} cy={7} rx={3.5} ry={4.5} fill={ENCRE}/>}
      {expr==="inquiet"&&<path d="M14,-10 Q18,-3 14,0 Q10,-3 14,-10 Z" fill="#60A5FA"/>}
    </g>
  </g>;
}

// Bulle de parole (lignes déjà coupées) ; pointe vers (px, py) ; pense : bulle de pensée
function Bulle({x,y,w,lignes,px,py,pense,taille=11.5}){
  const h=lignes.length*taille*1.25+12;
  return <g>
    {pense?<><circle cx={px} cy={py} r={3} fill="#fff" stroke={ENCRE} strokeWidth={1.3}/><circle cx={(px+x+w/2)/2} cy={(py+y+h)/2} r={5} fill="#fff" stroke={ENCRE} strokeWidth={1.3}/></>
      :<path d={`M${x+w*.35},${y+h-1} L${px},${py} L${x+w*.55},${y+h-1} Z`} fill="#fff" stroke={ENCRE} strokeWidth={1.4} strokeLinejoin="round"/>}
    <rect x={x} y={y} width={w} height={h} rx={pense?h/2:9} fill="#fff" stroke={ENCRE} strokeWidth={1.4}/>
    {!pense&&<path d={`M${x+w*.35+1.5},${y+h-1.2} L${x+w*.55-1.5},${y+h-1.2}`} stroke="#fff" strokeWidth={2.6}/>}
    {lignes.map((l,i)=><text key={i} x={x+w/2} y={y+9+taille*(i+.9)*1.18} textAnchor="middle" fontSize={taille} fontWeight={700} fill={ENCRE}>{l}</text>)}
  </g>;
}

const Bureau=({x,y,w=120})=><g><rect x={x} y={y} width={w} height={10} rx={2} fill="#92400E"/><rect x={x+6} y={y+10} width={w-12} height={36} fill="#B45309"/><rect x={x+w/2-14} y={y+18} width={28} height={4} rx={2} fill="#78350F"/></g>;
const Enveloppe=({x,y,r=0})=><g transform={`translate(${x} ${y}) rotate(${r})`}><rect x={-16} y={-10} width={32} height={20} rx={2} fill="#FDE68A" stroke={ENCRE} strokeWidth={1.3}/><path d="M-16,-10 L0,3 L16,-10" fill="none" stroke={ENCRE} strokeWidth={1.3}/><text x={0} y={7} textAnchor="middle" fontSize={8} fontWeight={900} fill="#15803D">$$</text></g>;
const Billets=({x,y})=><g transform={`translate(${x} ${y})`}>{[0,1,2].map(i=><rect key={i} x={-14+i*3} y={-8-i*4} width={28} height={14} rx={2} fill="#86EFAC" stroke="#166534" strokeWidth={1.2}/>)}<text x={-8} y={-5} fontSize={9} fontWeight={900} fill="#166534">$</text></g>;

const SCENES={
  // ET1 : le test du journal
  journal:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#FEF3C7"/><rect x={0} y={170} width={320} height={30} fill="#FCD34D"/>
    <Perso x={92} y={176} peau={1} haut="#0F766E" expr="choque" bras="tend" cravate="#B91C1C"/>
    <g transform="translate(148 62) rotate(-4)"><rect width={128} height={86} fill="#fff" stroke={ENCRE} strokeWidth={1.6}/>
      <text x={64} y={16} textAnchor="middle" fontSize={11} fontWeight={900} fill={ENCRE}>LA GAZETTE DU MATIN</text>
      <rect x={8} y={22} width={112} height={2} fill={ENCRE}/>
      <text x={64} y={40} textAnchor="middle" fontSize={12.5} fontWeight={900} fill="#B91C1C">Un chef de service</text>
      <text x={64} y={55} textAnchor="middle" fontSize={12.5} fontWeight={900} fill="#B91C1C">« arrange » un marché</text>
      {[64,70,76].map(yy=><rect key={yy} x={10} y={yy} width={108} height={3} rx={1.5} fill="#D1D5DB"/>)}
    </g>
    <Bulle x={10} y={10} w={140} lignes={["Ah… c'est moi,","en première page ?"]} px={84} py={60}/>
  </>,
  // ET2 : deux chemins
  chemins:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#DBEAFE"/><path d="M0,200 L120,120 L200,120 L320,200 Z" fill="#BBF7D0"/>
    <path d="M150,200 L158,120 L110,70" stroke="#A16207" strokeWidth={16} fill="none" strokeLinecap="round"/>
    <path d="M168,200 L162,120 L215,70" stroke="#D6D3D1" strokeWidth={16} fill="none" strokeLinecap="round"/>
    <rect x={158} y={56} width={6} height={70} fill="#78350F"/>
    <g><path d="M110,58 L160,58 L160,76 L110,76 L100,67 Z" fill="#FDE68A" stroke={ENCRE} strokeWidth={1.3}/><text x={132} y={71} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={ENCRE}>FACILE</text></g>
    <g><path d="M162,82 L214,82 L224,91 L214,100 L162,100 Z" fill="#BBF7D0" stroke={ENCRE} strokeWidth={1.3}/><text x={190} y={95} textAnchor="middle" fontSize={10.5} fontWeight={900} fill={ENCRE}>JUSTE</text></g>
    <Perso x={160} y={192} s={.72} peau={2} haut="#7C3AED" expr="inquiet" bras="dos" foulard="#F59E0B"/>
    <Bulle x={196} y={128} w={112} lignes={["Les deux","se défendent…"]} px={176} py={124} pense/>
  </>,
  // ET3 : le tramway
  tramway:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#E0F2FE"/>
    <g stroke="#57534E" strokeWidth={3} fill="none"><path d="M0,150 L150,150 L300,110"/><path d="M0,162 L150,162 L304,122"/><path d="M150,150 L310,170"/><path d="M150,162 L306,182"/></g>
    {[20,50,80,110,140].map(xx=><rect key={xx} x={xx} y={146} width={6} height={20} fill="#A8A29E"/>)}
    <g transform="translate(18 108)"><rect width={56} height={34} rx={6} fill="#DC2626"/><rect x={6} y={6} width={18} height={12} fill="#BFDBFE"/><rect x={30} y={6} width={18} height={12} fill="#BFDBFE"/><circle cx={12} cy={38} r={5} fill={ENCRE}/><circle cx={44} cy={38} r={5} fill={ENCRE}/></g>
    {[250,268,286].map((xx,i)=><circle key={xx} cx={xx} cy={104-i*4} r={6} fill={PEAUX[i]}/>)}
    <circle cx={290} cy={168} r={6} fill={PEAUX[3]}/>
    <g><rect x={136} y={176} width={4} height={18} fill={ENCRE}/><path d="M138,178 L150,160" stroke={ENCRE} strokeWidth={4} strokeLinecap="round"/><circle cx={150} cy={160} r={4} fill="#DC2626"/></g>
    <Perso x={112} y={196} s={.5} peau={0} haut="#F59E0B" expr="inquiet" bras="tend"/>
    <Bulle x={92} y={14} w={150} lignes={["Ne rien faire, est-ce","aussi décider ?"]} px={112} py={128} pense/>
  </>,
  // ET4 : l'enveloppe sous la table
  enveloppe:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#F3E8FF"/><rect x={0} y={176} width={320} height={24} fill="#D8B4FE"/>
    <rect x={196} y={6} width={112} height={44} rx={3} fill="#fff" stroke={ENCRE} strokeWidth={1.4}/><text x={252} y={20} textAnchor="middle" fontSize={10} fontWeight={900} fill={ENCRE}>GUICHET</text><text x={252} y={32} textAnchor="middle" fontSize={8.5} fill="#6B7280">Service gratuit</text><text x={252} y={43} textAnchor="middle" fontSize={8.5} fill="#6B7280">Délai : 3 jours</text>
    <Bureau x={110} y={130} w={120}/>
    <Perso x={78} y={180} peau={2} haut="#16A34A" expr="malin" bras="tend"/>
    <Perso x={262} y={180} peau={1} haut="#334155" expr="neutre" bras="tend" cravate="#DC2626" miroir lunettes/>
    <Enveloppe x={154} y={158} r={-8}/>
    <Bulle x={6} y={8} w={176} lignes={["C'est juste pour","« accélérer » mon dossier…"]} px={70} py={62}/>
  </>,
  // ET5 : « embellis le bilan »
  bilan:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#ECFCCB"/><rect x={0} y={176} width={320} height={24} fill="#BEF264"/>
    <g transform="translate(118 26)"><rect width={96} height={84} rx={4} fill="#fff" stroke={ENCRE} strokeWidth={1.5}/>
      <text x={48} y={15} textAnchor="middle" fontSize={10} fontWeight={900} fill={ENCRE}>RÉSULTAT</text>
      <path d="M10,70 L30,58 L48,64 L66,46 L86,52" stroke="#DC2626" strokeWidth={2.4} fill="none"/>
      <path d="M48,64 L66,28 L86,16" stroke="#16A34A" strokeWidth={2.4} strokeDasharray="4 3" fill="none"/>
      <text x={78} y={34} fontSize={9} fontWeight={900} fill="#16A34A">?!</text></g>
    <Perso x={74} y={180} peau={0} haut="#1E3A8A" expr="malin" bras="pointe" cravate="#FBBF24"/>
    <Perso x={256} y={180} peau={3} haut="#0D9488" expr="inquiet" bras="porte" lunettes miroir/>
    <Bulle x={6} y={8} w={132} lignes={["Rends-moi ce bilan","un peu plus joli…"]} px={70} py={60}/>
    <Bulle x={222} y={14} w={92} lignes={["Joli…","ou juste ?"]} px={250} py={58} pense/>
  </>,
  // ET6 : le lanceur d'alerte
  alerte:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#FFE4E6"/><rect x={0} y={176} width={320} height={24} fill="#FDA4AF"/>
    <Perso x={92} y={180} peau={2} haut="#0369A1" expr="severe" bras="leve" foulard="#FDE047"/>
    <g transform="translate(120 66) rotate(-20)"><path d="M0,0 L28,-12 L28,26 L0,14 Z" fill="#F97316" stroke={ENCRE} strokeWidth={1.4}/><rect x={-8} y={0} width={9} height={14} fill="#FDBA74" stroke={ENCRE} strokeWidth={1.4}/>
      {[0,1,2].map(i=><path key={i} d={`M${36+i*8},${-8+i*-2} Q${42+i*8},7 ${36+i*8},${22+i*2}`} stroke="#F97316" strokeWidth={2} fill="none"/>)}</g>
    <Perso x={248} y={180} peau={1} haut="#4B5563" expr="severe" bras="tend" cravate="#7F1D1D" miroir/>
    <Bulle x={196} y={12} w={118} lignes={["Chut ! Ça reste","entre nous…"]} px={244} py={62}/>
    <Bulle x={6} y={8} w={140} lignes={["Les fonds des","malades ont disparu !"]} px={96} py={58}/>
  </>,
  // ET7 : la part du gâteau
  gateau:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#E0E7FF"/><rect x={0} y={176} width={320} height={24} fill="#A5B4FC"/>
    <g transform="translate(160 132)"><ellipse cx={0} cy={18} rx={78} ry={14} fill="#E5E7EB"/><rect x={-62} y={-14} width={124} height={30} fill="#FBBF24"/><ellipse cx={0} cy={-14} rx={62} ry={12} fill="#FDE68A"/>
      <path d="M0,-14 L40,-23 A62,12 0 0,1 62,-14 L62,16 L40,8 Z" fill="#F59E0B" opacity=".55"/>
      <text x={-18} y={8} textAnchor="middle" fontSize={10.5} fontWeight={900} fill="#7C2D12">BUDGET PUBLIC</text></g>
    <Perso x={58} y={180} peau={0} haut="#111827" expr="malin" bras="porte" cravate="#DC2626"/>
    <g transform="translate(244 96) rotate(10)"><path d="M0,0 L40,0 L40,26 Z" fill="#F59E0B" stroke={ENCRE} strokeWidth={1.2}/></g>
    <Perso x={262} y={180} s={.62} peau={2} haut="#DB2777" expr="content" bras="leve"/><Perso x={292} y={180} s={.62} peau={1} haut="#0891B2" expr="content" bras="leve"/>
    {[200,216].map((xx,i)=><g key={xx}><Perso x={xx} y={180} s={.46} peau={i+1} haut="#9CA3AF" expr="inquiet" bras="tend"/></g>)}
    <Bulle x={8} y={8} w={140} lignes={["Une petite part pour","la famille d'abord…"]} px={66} py={60}/>
  </>,
  // ET8 : le vrai et le faux
  deepfake:()=><>
    <rect x={0} y={0} width={320} height={200} fill="#CCFBF1"/><rect x={0} y={176} width={320} height={24} fill="#5EEAD4"/>
    <g transform="translate(150 32)"><rect width={150} height={98} rx={8} fill="#0F172A"/><rect x={6} y={6} width={138} height={78} rx={4} fill="#1E293B"/>
      {[0,1].map(i=><g key={i} transform={`translate(${42+i*66} 52)`}><circle r={18} fill={PEAUX[1]}/><path d="M-17,-6 Q-14,-21 0,-20 Q15,-21 17,-6 Q9,-14 0,-13 Q-9,-14 -17,-6 Z" fill="#111827"/><circle cx={-6} cy={0} r={2.2} fill={ENCRE}/><circle cx={6} cy={0} r={2.2} fill={ENCRE}/><path d="M-6,8 Q0,13 6,8" stroke={ENCRE} strokeWidth={1.8} fill="none"/>
        <text x={0} y={30} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={i?"#F87171":"#4ADE80"}>{i?"IA ?":"VRAI ?"}</text></g>)}
      <rect x={60} y={98} width={30} height={10} fill="#334155"/></g>
    <Perso x={92} y={180} peau={3} haut="#EA580C" expr="choque" bras="tend" foulard="#14B8A6"/>
    <Bulle x={8} y={8} w={140} lignes={["Lequel des deux","a vraiment parlé ?"]} px={86} py={60}/>
  </>,
};

export function Caricature({K,scene,legende}){
  const S=SCENES[scene];
  if(!S)return null;
  return <figure style={{margin:0}}>
    <svg viewBox="0 0 320 200" width="100%" role="img" aria-label={`Caricature : ${legende||scene}`} style={{display:"block",maxWidth:560,margin:"0 auto",borderRadius:14,border:`2px solid ${ENCRE}`,fontFamily:"'Outfit',sans-serif"}}><S/></svg>
    {legende&&<figcaption style={{textAlign:"center",fontSize:13.5,color:K.t2,fontStyle:"italic",lineHeight:1.5,marginTop:8,maxWidth:560,marginLeft:"auto",marginRight:"auto"}}><T t={legende}/></figcaption>}
  </figure>;
}
export const SCENES_CARICATURES=Object.keys(SCENES);

// Cas pratique : situation, options (arguments pour / contre), question pour réfléchir
export function Dilemme({K,col,situation,options=[],question,piste}){
  return <div>
    <div style={{display:"flex",gap:10,background:`${col}10`,border:`1px solid ${col}35`,borderRadius:12,padding:"11px 13px",marginBottom:10}}>
      <i className="ti ti-user-question" style={{fontSize:20,color:col,flexShrink:0,marginTop:1}}/>
      <div style={{fontSize:14.5,color:K.t1,lineHeight:1.6}}><T t={situation}/></div>
    </div>
    <div style={{display:"grid",gridTemplateColumns:`repeat(auto-fit,minmax(${options.length>2?190:230}px,1fr))`,gap:10}}>
      {options.map((o,i)=><div key={i} style={{background:K.c2,border:`1px solid ${K.b0}`,borderRadius:12,padding:"10px 12px"}}>
        <div style={{fontWeight:800,fontSize:14,color:K.t1,marginBottom:6,display:"flex",gap:7,alignItems:"flex-start"}}><span style={{background:col,color:"#fff",borderRadius:99,minWidth:22,height:22,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{String.fromCharCode(65+i)}</span><span><T t={o.l}/></span></div>
        {o.pour&&<div style={{fontSize:13,color:K.t2,lineHeight:1.5,marginBottom:4}}><i className="ti ti-thumb-up" style={{color:K.em,marginRight:5}}/><T t={o.pour}/></div>}
        {o.contre&&<div style={{fontSize:13,color:K.t2,lineHeight:1.5}}><i className="ti ti-thumb-down" style={{color:K.er||"#C53030",marginRight:5}}/><T t={o.contre}/></div>}
      </div>)}
    </div>
    {question&&<div style={{fontSize:14,color:K.t1,fontWeight:700,marginTop:10,lineHeight:1.5}}><i className="ti ti-message-question" style={{color:col,marginRight:6}}/><T t={question}/></div>}
    {piste&&<div style={{fontSize:13.5,color:K.t2,marginTop:6,lineHeight:1.55}}><i className="ti ti-bulb" style={{color:"#D97706",marginRight:6}}/><b>Piste de réponse :</b> <T t={piste}/></div>}
  </div>;
}

export const SCHEMAS_ETHIQUE={caricature:Caricature,dilemme:Dilemme};
// Éléments réutilisés par les caricatures animées (src/mines/Animation.jsx)
export{Perso,Bulle,PEAUX,ENCRE,Bureau,Billets};
