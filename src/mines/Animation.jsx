import React,{useEffect,useRef,useState}from"react";
import{Perso,Bulle,PEAUX,ENCRE}from"../ethique/Caricature";
import{avancer,parler,synthese,lireSon,ecrireSon,EVT_AUDIO}from"./voix";

// ══════════════════ CARICATURES ANIMÉES (CODE MINIER) ══════════════════
// Schéma de leçon { type: "schema", kind: "animation", scene, etapes: [{ t, texte }] } : une petite scène dessinée qui se joue
// (lecture, pause, rejouer, étapes cliquables), avec un sous-titre synchronisé. Chaque scène est une fonction du temps t
// (en secondes) qui renvoie le dessin SVG : le rendu est déterministe, l'utilisateur peut revenir à n'importe quelle étape.
// Personnages génériques : aucune personne réelle n'est représentée. Si l'appareil demande moins d'animations
// (prefers-reduced-motion), la scène s'affiche directement dans son état final avec toutes les étapes.
// Voix off (src/mines/voix.js) : chaque étape est lue à voix haute, l'animation attend la fin de la phrase ; bouton Voix / Muet.

const clamp=x=>Math.max(0,Math.min(1,x));
const L=(t,a,b)=>clamp((t-a)/(b-a));
const eo=x=>1-Math.pow(1-x,3);
const back=x=>{const c=1.7;return x<=0?0:x>=1?1:1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);};
const mix=(a,b,p)=>a+(b-a)*p;
const mixCol=(a,b,p)=>{const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16));const[x,y]=[h(a),h(b)];return`rgb(${x.map((v,i)=>Math.round(mix(v,y[i],p))).join(",")})`;};
const Pop=({t,a,children,x=0,y=0})=>{const p=back(L(t,a,a+0.6));return p<=0?null:<g transform={`translate(${x} ${y}) scale(${p})`} opacity={clamp(p)}>{children}</g>;};
const Fade=({t,a,b=a+0.5,children})=>{const o=L(t,a,b);return o<=0?null:<g opacity={o}>{children}</g>;};

// ── Éléments de décor ──
const Panneau=({x,y,w=96,lignes,col="#FDE68A"})=><g transform={`translate(${x} ${y})`}>
  <rect x={w/2-2.5} y={0} width={5} height={46} fill="#78350F"/>
  <rect x={0} y={-lignes.length*11-8} width={w} height={lignes.length*11+8} rx={4} fill={col} stroke={ENCRE} strokeWidth={1.3}/>
  {lignes.map((l,i)=><text key={i} x={w/2} y={-lignes.length*11+3+i*11} textAnchor="middle" fontSize={Math.min(i?8.5:9.5,(w-8)/(l.length*(i?.56:.64)))} fontWeight={i?700:900} fill={ENCRE}>{l}</text>)}
</g>;
const Camion=({x,y,charge,col="#DC2626",libelle})=><g transform={`translate(${x} ${y})`}>
  <rect x={-34} y={-24} width={46} height={22} rx={2} fill={charge||"#9CA3AF"} stroke={ENCRE} strokeWidth={1.2}/>
  {libelle&&<text x={-11} y={-9} textAnchor="middle" fontSize={7.5} fontWeight={900} fill="#fff">{libelle}</text>}
  <path d="M12,-18 L26,-18 L32,-8 L32,-2 L12,-2 Z" fill={col} stroke={ENCRE} strokeWidth={1.2}/><rect x={16} y={-15} width={9} height={6} fill="#BFDBFE"/>
  <circle cx={-24} cy={0} r={5} fill={ENCRE}/><circle cx={-2} cy={0} r={5} fill={ENCRE}/><circle cx={24} cy={0} r={5} fill={ENCRE}/>
</g>;
const Drapeau=({x,y,h})=><g transform={`translate(${x} ${y})`}>
  <rect x={-1.5} y={-60} width={3} height={60} fill="#6B7280"/>
  <g transform={`translate(1.5 ${-60+h})`}><rect width={42} height={28} fill="#007FFF"/><path d="M0,28 L0,22 L36,0 L42,0 L42,6 L6,28 Z" fill="#F7D618"/><path d="M0,28 L0,25 L38,2 L42,2 L42,3.5 L4,28 Z" fill="#CE1021"/><path d="M8,3 l2,4.5 5,.4 -3.8,3.1 1.2,4.8 -4.4,-2.6 -4.4,2.6 1.2,-4.8 -3.8,-3.1 5,-.4 Z" fill="#F7D618"/></g>
</g>;
const Batiment=({x,y,w=70,h=44,titre,col="#E5E7EB",toit="#9CA3AF"})=><g transform={`translate(${x} ${y})`}>
  <path d={`M-4,${-h} L${w/2},${-h-16} L${w+4},${-h} Z`} fill={toit} stroke={ENCRE} strokeWidth={1.2}/>
  <rect x={0} y={-h} width={w} height={h} fill={col} stroke={ENCRE} strokeWidth={1.2}/>
  {[0,1,2].map(i=><rect key={i} x={8+i*(w-16)/3} y={-h+10} width={(w-16)/3-6} height={12} fill="#BFDBFE" stroke={ENCRE} strokeWidth={.8}/>)}
  <rect x={w/2-7} y={-16} width={14} height={16} fill="#78350F"/>
  {titre&&<text x={w/2} y={-h-20} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={ENCRE}>{titre}</text>}
</g>;
const Document=({x,y,titre,r=0,col="#fff"})=><g transform={`translate(${x} ${y}) rotate(${r})`}><rect x={-15} y={-19} width={30} height={38} rx={2} fill={col} stroke={ENCRE} strokeWidth={1.2}/>{[-9,-4,1,6].map(v=><rect key={v} x={-10} y={v} width={20} height={2} fill="#9CA3AF"/>)}{titre&&<text x={0} y={-11} textAnchor="middle" fontSize={Math.min(6.5,26/(titre.length*.62))} fontWeight={900} fill={ENCRE}>{titre}</text>}</g>;
const Piece=({x,y,r=6})=><g><circle cx={x} cy={y} r={r} fill="#FBBF24" stroke="#92400E" strokeWidth={1.1}/><text x={x} y={y+2.6} textAnchor="middle" fontSize={r*1.1} fontWeight={900} fill="#92400E">$</text></g>;
const Chevalement=({x,y,s=1})=><g transform={`translate(${x} ${y}) scale(${s})`}><path d="M-22,0 L-8,-62 L8,-62 L22,0" fill="none" stroke="#4B5563" strokeWidth={3.5}/><path d="M-16,-26 L16,-26 M-12,-44 L12,-44" stroke="#4B5563" strokeWidth={2.5}/><circle cx={0} cy={-64} r={8} fill="none" stroke="#4B5563" strokeWidth={3}/><rect x={-30} y={-6} width={60} height={8} fill="#6B7280"/></g>;
const Case_=({x,y,col="#D97706"})=><g transform={`translate(${x} ${y})`}><rect x={-14} y={-18} width={28} height={18} fill="#FDE68A" stroke={ENCRE} strokeWidth={1}/><path d="M-18,-18 L0,-32 L18,-18 Z" fill={col} stroke={ENCRE} strokeWidth={1}/><rect x={-4} y={-10} width={8} height={10} fill="#78350F"/></g>;

// ── Les scènes (durée en secondes, dessin en fonction de t) ──
export const SCENES_ANIMEES={
  // MI1 : à qui appartient le sous-sol ?
  "sous-sol":{duree:12.5,dessin:t=>{const marche=eo(L(t,0,2.6)),loupe=L(t,3,6),drap=eo(L(t,6,7.6)),cad=L(t,9,9.6),doc=eo(L(t,10,11.8));
    return <>
      <rect width={320} height={95} fill="#BFDBFE"/><rect y={95} width={320} height={105} fill="#A16207"/><rect y={95} width={320} height={12} fill="#65A30D"/>
      {[[40,150,"#22C55E"],[60,165,"#22C55E"],[150,175,"#EC4899"],[170,160,"#EC4899"],[250,150,"#FACC15"],[268,168,"#FACC15"]].map(([x,y,c],i)=><g key={i}>{[0,1,2].map(k=><circle key={k} cx={x+k*7} cy={y+(k%2)*5} r={4.5} fill={c} stroke={ENCRE} strokeWidth={.7}/>)}</g>)}
      <Fade t={t} a={3.4}><text x={55} y={190} textAnchor="middle" fontSize={9} fontWeight={900} fill="#fff">cuivre</text></Fade>
      <Fade t={t} a={4.2}><text x={165} y={195} textAnchor="middle" fontSize={9} fontWeight={900} fill="#fff">cobalt</text></Fade>
      <Fade t={t} a={5}><text x={262} y={190} textAnchor="middle" fontSize={9} fontWeight={900} fill="#fff">or</text></Fade>
      {t>=3&&t<7&&<circle cx={mix(50,265,loupe)} cy={160} r={22} fill="rgba(255,255,255,.18)" stroke="#fff" strokeWidth={2.5} strokeDasharray="5 3"/>}
      <Perso x={mix(-25,62,marche)} y={102+Math.sin(t*9)*(marche<1?1.5:0)} s={.62} peau={1} haut="#0D9488" expr={t>6?"content":"inquiet"} bras={t>2&&t<6?"pointe":"bas"}/>
      {t>=2.8&&t<6&&<Bulle x={84} y={8} w={128} lignes={["À qui appartiennent","ces richesses ?"]} px={70} py={36} taille={10.5}/>}
      <Drapeau x={274} y={94} h={mix(32,0,drap)}/>
      {t>=6.6&&<Fade t={t} a={6.6}><rect x={88} y={112} width={150} height={26} rx={5} fill="#fff" stroke="#CE1021" strokeWidth={2} transform={`rotate(${-4*(1-eo(L(t,6.6,7.3)))} 163 125)`}/><text x={163} y={124} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#CE1021">PROPRIÉTÉ DE L'ÉTAT</text><text x={163} y={134} textAnchor="middle" fontSize={7.5} fontWeight={800} fill={ENCRE}>exclusive · inaliénable · imprescriptible</text></Fade>}
      {cad>0&&<g opacity={cad}><Batiment x={150} y={95} w={62} h={38} titre="CADASTRE MINIER"/></g>}
      {t>=10&&<><Document x={mix(181,122,doc)} y={mix(70,60,doc)} titre="DROIT MINIER" r={mix(0,-8,doc)}/><Perso x={244} y={102} s={.55} peau={2} haut="#1E3A8A" expr="content" bras="tend" cravate="#FBBF24" miroir/></>}
    </>;}},
  // MI2 : du permis de recherches au permis d'exploitation
  permis:{duree:14,dessin:t=>{const x=t<3?mix(-40,96,eo(L(t,0,3))):t<10.5?96:mix(96,250,eo(L(t,10.5,13))),forage=L(t,3,6),mine=L(t,9,10.5);
    return <>
      <rect width={320} height={200} fill="#E0F2FE"/><rect y={128} width={320} height={72} fill="#D6D3D1"/><rect y={150} width={320} height={22} fill="#78716C"/>
      {[20,70,120,170,220,270].map(v=><rect key={v} x={v} y={159} width={24} height={3} fill="#FDE68A"/>)}
      <Panneau x={4} y={126} w={106} lignes={["PERMIS DE RECHERCHES","5 ans, renouvelable 1 fois"]} col="#FDE68A"/>
      <Panneau x={196} y={126} w={120} lignes={["PERMIS D'EXPLOITATION","25 ans au plus","+ 15 ans à chaque fois"]} col="#BBF7D0"/>
      {forage>0&&mine<1&&<g opacity={Math.min(1,forage*2)*(1-mine)}><path d={`M146,128 L152,${128-40*forage} L158,128`} fill="none" stroke="#4B5563" strokeWidth={2.5}/><rect x={150.5} y={128} width={3} height={14*forage} fill="#374151"/>{t<7&&<circle cx={152} cy={142} r={2+Math.abs(Math.sin(t*12))*2} fill="#FDE68A"/>}</g>}
      {mine>0&&<g opacity={mine}><Chevalement x={152} y={128} s={.75}/></g>}
      <Camion x={x} y={156} col="#B45309" charge="#F59E0B" libelle={t>10.4?"MINERAI":""}/>
      <Pop t={t} a={11}><g transform="translate(20 10)"><rect width={86} height={34} rx={7} fill="#fff" stroke="#CE1021" strokeWidth={1.6}/><text x={43} y={15} textAnchor="middle" fontSize={11} fontWeight={900} fill="#CE1021">10 % à l'État</text><text x={43} y={27} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={ENCRE}>libres de charges</text></g></Pop>
      <Pop t={t} a={11.7}><g transform="translate(117 10)"><rect width={86} height={34} rx={7} fill="#fff" stroke="#16A34A" strokeWidth={1.6}/><text x={43} y={15} textAnchor="middle" fontSize={11} fontWeight={900} fill="#16A34A">10 % congolais</text><text x={43} y={27} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={ENCRE}>personnes physiques</text></g></Pop>
      <Pop t={t} a={12.4}><g transform="translate(214 10)"><rect width={86} height={34} rx={7} fill="#fff" stroke="#2563EB" strokeWidth={1.6}/><text x={43} y={15} textAnchor="middle" fontSize={11} fontWeight={900} fill="#2563EB">+ 5 % à l'État</text><text x={43} y={27} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={ENCRE}>à chaque renouvellement</text></g></Pop>
    </>;}},
  // MI3 : l'exploitation artisanale
  artisanal:{duree:14,dessin:t=>{const coup=Math.sin(t*5),enfant=t<6?mix(340,250,eo(L(t,5,6.5))):t<8.6?250:mix(250,360,eo(L(t,8.6,10))),sac=eo(L(t,10,12.5));
    return <>
      <rect width={320} height={200} fill="#FEF3C7"/><rect y={140} width={320} height={60} fill="#A16207"/><path d="M84,140 Q114,175 154,140 Z" fill="#78350F"/>
      <Panneau x={4} y={118} w={92} lignes={["ZONE D'EXPLOITATION","ARTISANALE (ZEA)"]} col="#FDE68A"/>
      <g transform={`translate(122 ${150})`}>
        <Perso x={0} y={0} s={.6} peau={0} haut="#EA580C" expr="neutre" bras="bas"/>
        <g transform={`translate(12 -48) rotate(${t<10?-40+coup*35:-40})`}><rect x={-1.5} y={0} width={3} height={30} fill="#78350F"/><path d="M-9,30 Q0,25 9,30 L0,33 Z" fill="#6B7280"/></g>
        {t<10&&coup>0.8&&<g>{[0,1,2].map(i=><circle key={i} cx={22+i*5} cy={-6-i*4} r={2} fill="#92400E"/>)}</g>}
      </g>
      <Pop t={t} a={3} x={150} y={22}><rect x={0} y={0} width={124} height={40} rx={7} fill="#fff" stroke="#16A34A" strokeWidth={1.6}/><text x={62} y={15} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#16A34A">✓ Carte d'exploitant</text><text x={62} y={30} textAnchor="middle" fontSize={9.5} fontWeight={900} fill="#16A34A">✓ Coopérative agréée</text></Pop>
      <Perso x={enfant} y={152} s={.42} peau={2} haut="#7C3AED" expr={t>7?"inquiet":"content"} bras="bas" miroir={t>8.6}/>
      {t>=6.4&&t<10.4&&<g transform={`translate(214 104) scale(${back(L(t,6.4,7))})`}><circle r={20} fill="#DC2626" stroke="#fff" strokeWidth={3}/><text y={2} textAnchor="middle" fontSize={6.8} fontWeight={900} fill="#fff">INTERDIT</text><text y={10} textAnchor="middle" fontSize={5.2} fontWeight={800} fill="#fff">aux enfants</text></g>}
      {t>=6.8&&t<10&&<Bulle x={6} y={18} w={128} lignes={["Pas d'enfants","dans la mine !"]} px={120} py={88} taille={10.5}/>}
      {t>=10&&<><Batiment x={236} y={140} w={74} h={40} titre="COMPTOIR AGRÉÉ" col="#DBEAFE"/><g transform={`translate(${mix(144,236,sac)} ${132})`}><ellipse rx={11} ry={9} fill="#D6D3D1" stroke={ENCRE} strokeWidth={1.1}/><text y={3} textAnchor="middle" fontSize={7} fontWeight={900} fill={ENCRE}>Sn</text></g></>}
      <Pop t={t} a={12.6} x={232} y={36}><rect width={80} height={22} rx={11} fill="#0D9488"/><text x={40} y={15} textAnchor="middle" fontSize={9} fontWeight={900} fill="#fff">✓ TRAÇABILITÉ</text></Pop>
    </>;}},
  // MI4 : la redevance minière et son partage
  redevance:{duree:14.5,dessin:t=>{const sortie=eo(L(t,0,3)),piles=L(t,3.6,5.6),flux=eo(L(t,6.4,9.5));
    const parts=[["Pouvoir central",50,"#1D4ED8"],["Province",25,"#0D9488"],["ETD",15,"#D97706"],["FOMIN",10,"#7C3AED"]];
    return <>
      <rect width={320} height={200} fill="#F1F5F9"/><rect y={168} width={320} height={32} fill="#CBD5E1"/>
      <g><rect x={6} y={100} width={8} height={68} fill="#475569"/><rect x={70} y={100} width={8} height={68} fill="#475569"/><rect x={6} y={92} width={72} height={14} fill="#475569"/><text x={42} y={102} textAnchor="middle" fontSize={6.6} fontWeight={900} fill="#fff">SORTIE DE LA MINE</text></g>
      <Camion x={mix(20,128,sortie)} y={168} col="#1E3A8A" charge="#EC4899" libelle="COBALT"/>
      {t<6.4&&<Pop t={t} a={2.8} x={92} y={104}><rect x={-10} y={-24} width={90} height={22} rx={6} fill="#fff" stroke={ENCRE} strokeWidth={1.1}/><text x={35} y={-9} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={ENCRE}>Valeur : 1 000 000 $</text></Pop>}
      {t>=3.6&&<g>{Array.from({length:Math.round(piles*6)}).map((_,i)=><Piece key={i} x={196} y={160-i*7} r={7}/>)}{t<6.4&&<Fade t={t} a={4}><text x={226} y={98} textAnchor="middle" fontSize={8.5} fontWeight={900} fill={ENCRE}>10 % = 100 000 $</text><text x={226} y={108} textAnchor="middle" fontSize={7} fontWeight={700} fill="#475569">substance stratégique</text></Fade>}</g>}
      {t>=6.4&&parts.map(([n,p,c],i)=>{const bx=10+i*78,h=p*0.9*flux;return <g key={n}>
        <path d={`M196,${118} Q${(196+bx+34)/2},${86} ${bx+34},${74}`} fill="none" stroke={c} strokeWidth={2} strokeDasharray="4 3" opacity={1-L(t,10,11)}/>
        <rect x={bx} y={62-h} width={68} height={h} rx={3} fill={c} opacity={.9}/>
        <text x={bx+34} y={59-h} textAnchor="middle" fontSize={11} fontWeight={900} fill={c}>{Math.round(p*flux)} %</text>
        <text x={bx+34} y={72} textAnchor="middle" fontSize={8} fontWeight={800} fill={ENCRE}>{n}</text></g>;})}
      <Pop t={t} a={11.2} x={160} y={184}><rect x={-102} y={-12} width={204} height={24} rx={12} fill="#0F172A"/><text y={4} textAnchor="middle" fontSize={8.5} fontWeight={900} fill="#FDE68A">+ impôt sur les bénéfices 30 % · superprofits 50 %</text></Pop>
    </>;}},
  // MI5 : communautés et environnement
  communaute:{duree:14.5,dessin:t=>{const pol=t<4?L(t,0.5,4):1-L(t,5,7.5),eau=mixCol("#38BDF8","#57534E",pol),ecole=eo(L(t,8.6,10.6)),cent=eo(L(t,9.6,11.6));
    return <>
      <rect width={320} height={200} fill="#DCFCE7"/><rect y={0} width={320} height={70} fill="#E0F2FE"/>
      <Chevalement x={52} y={120} s={.8}/><path d="M80,120 L120,120 L105,96 Z" fill="#78716C"/>
      <path d={`M0,150 C60,140 110,165 170,150 S280,140 320,152 L320,172 C260,160 220,180 160,170 S60,160 0,170 Z`} fill={eau}/>
      {pol>0.4&&[0,1,2].map(i=><circle key={i} cx={90+i*40+((t*30)%40)} cy={160} r={3} fill="#292524" opacity={pol}/>)}
      {[220,250,280].map((x,i)=><Case_ key={x} x={x} y={130-i*4}/>)}
      <Perso x={196} y={140} s={.5} peau={3} haut="#B91C1C" expr={t<7?"inquiet":"content"} bras={t<4?"pointe":"bas"} miroir foulard="#FDE047"/>
      {t>=1.6&&t<5&&<Bulle x={150} y={10} w={120} lignes={["Et notre rivière ?","Et nos champs ?"]} px={198} py={78} taille={10}/>}
      {t<8.8&&<Pop t={t} a={4.4} x={112} y={44}><g><Document x={0} y={0} titre="EIES" r={-6}/><Document x={26} y={4} titre="PGES" r={6} col="#ECFCCB"/></g></Pop>}
      {t>=5.4&&t<8.4&&<Fade t={t} a={5.4}><rect x={44} y={78} width={120} height={18} rx={9} fill="#16A34A"/><text x={104} y={90} textAnchor="middle" fontSize={8.5} fontWeight={900} fill="#fff">✓ Certificat environnemental</text></Fade>}
      {ecole>0&&<g transform={`translate(150 132) scale(1 ${ecole})`}><rect x={-22} y={-26} width={44} height={26} fill="#FEF9C3" stroke={ENCRE} strokeWidth={1.1}/><path d="M-26,-26 L0,-40 L26,-26 Z" fill="#DC2626" stroke={ENCRE} strokeWidth={1.1}/><text y={-10} textAnchor="middle" fontSize={7} fontWeight={900} fill={ENCRE}>ÉCOLE</text></g>}
      {cent>0&&<g transform={`translate(294 120) scale(1 ${cent})`}><rect x={-18} y={-24} width={36} height={24} fill="#fff" stroke={ENCRE} strokeWidth={1.1}/><rect x={-3} y={-20} width={6} height={14} fill="#DC2626"/><rect x={-7} y={-16} width={14} height={6} fill="#DC2626"/></g>}
      <Pop t={t} a={9} x={84} y={22}><rect x={-76} y={-12} width={152} height={24} rx={12} fill="#0F766E"/><text y={4} textAnchor="middle" fontSize={8.5} fontWeight={900} fill="#fff">Cahier des charges · 0,3 % du CA</text></Pop>
    </>;}},
  // MI6 : transparence, contrôle et sous-traitance
  transparence:{duree:13,dessin:t=>{const docs=[["CONTRATS",0.6],["PAIEMENTS",1.8],["PROPRIÉTAIRES",3]],loupe=L(t,5,8.5),poignee=eo(L(t,9.2,10.6));
    return <>
      <rect width={320} height={200} fill="#EDE9FE"/><rect y={168} width={320} height={32} fill="#C4B5FD"/>
      <g><rect x={14} y={92} width={54} height={76} rx={3} fill="#6B7280" stroke={ENCRE} strokeWidth={1.2}/><circle cx={56} cy={130} r={6} fill="#D1D5DB" stroke={ENCRE}/><text x={41} y={86} textAnchor="middle" fontSize={8} fontWeight={900} fill={ENCRE}>{t<4?"🔒 SECRET":"OUVERT"}</text></g>
      <g><rect x={110} y={22} width={150} height={96} rx={6} fill="#fff" stroke={ENCRE} strokeWidth={1.6}/><text x={185} y={38} textAnchor="middle" fontSize={10} fontWeight={900} fill="#5B21B6">TABLEAU PUBLIC</text><rect x={150} y={118} width={6} height={50} fill="#78350F"/><rect x={214} y={118} width={6} height={50} fill="#78350F"/></g>
      {docs.map(([n,a],i)=>{const p=eo(L(t,a,a+1.4));return p<=0?null:<g key={n}><Document x={mix(42,135+i*50,p)} y={mix(120,74,p)} r={mix(-20,0,p)}/>{p>=1&&<text x={135+i*50} y={106} textAnchor="middle" fontSize={6.5} fontWeight={900} fill="#5B21B6">{n.charAt(0)+n.slice(1).toLowerCase()}</text>}</g>;})}
      {t>=5&&t<9&&<g transform={`translate(${mix(130,240,loupe)} ${76})`}><circle r={16} fill="rgba(124,58,237,.12)" stroke="#7C3AED" strokeWidth={3}/><path d="M11,11 L24,24" stroke="#7C3AED" strokeWidth={4} strokeLinecap="round"/><text y={3} textAnchor="middle" fontSize={8} fontWeight={900} fill="#7C3AED">ITIE</text></g>}
      <Perso x={290} y={170} s={.52} peau={1} haut="#0891B2" expr={t>5?"content":"neutre"} bras="tend" miroir/>
      {t>=9&&<><Perso x={mix(70,120,poignee)} y={170} s={.5} peau={0} haut="#1E3A8A" expr="content" bras="tend" cravate="#FBBF24"/><Perso x={mix(220,170,poignee)} y={170} s={.5} peau={2} haut="#16A34A" expr="content" bras="tend" miroir/>
        <Fade t={t} a={10.6}><rect x={78} y={177} width={150} height={18} rx={9} fill="#16A34A"/><text x={153} y={189} textAnchor="middle" fontSize={8} fontWeight={900} fill="#fff">Sous-traitant à capitaux congolais</text></Fade></>}
    </>;}},
};

export function CaricatureAnimee({K,col,scene,etapes=[],legende}){
  const S=SCENES_ANIMEES[scene];
  const reduit=typeof window!=="undefined"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const[t,sT]=useState(reduit&&S?S.duree:0),[lecture,sLecture]=useState(false),[lancee,sLancee]=useState(!!reduit);
  const[son,sSon]=useState(()=>!!synthese()&&lireSon());
  const dernier=useRef(null),tRef=useRef(t),dite=useRef(-1),parle=useRef(false),annuler=useRef(()=>{}),id=useRef(`anim-${Math.random()}`),sonRef=useRef(son);
  tRef.current=t;sonRef.current=son;
  const bornes=etapes.map(x=>x.t);
  // Voix : on coupe la phrase en cours (pause, autre étape, autre lecteur, démontage)
  const taire=()=>{annuler.current();annuler.current=()=>{};parle.current=false;const s=synthese();if(s&&s.speaking)s.cancel();};
  const dire=i=>{if(!sonRef.current||!etapes[i])return;taire();dite.current=i;parle.current=true;
    window.dispatchEvent(new CustomEvent(EVT_AUDIO,{detail:id.current}));
    annuler.current=parler(etapes[i].texte,()=>{parle.current=false;});};
  useEffect(()=>{const autre=e=>{if(e.detail!==id.current){annuler.current();parle.current=false;sLecture(false);}};
    window.addEventListener(EVT_AUDIO,autre);return()=>{window.removeEventListener(EVT_AUDIO,autre);taire();};
  },[]);
  useEffect(()=>{
    if(!lecture||!S)return;
    let id_;const pas=ts=>{if(dernier.current==null)dernier.current=ts;const dt=Math.min(.1,(ts-dernier.current)/1000);dernier.current=ts;
      const r=avancer({t:tRef.current,dt,duree:S.duree,bornes,dite:dite.current,parle:parle.current,son:sonRef.current});
      if(r.dire!=null)dire(r.dire);
      tRef.current=r.t;sT(r.t);
      if(r.fin){sLecture(false);return;}
      id_=requestAnimationFrame(pas);};
    id_=requestAnimationFrame(pas);return()=>{cancelAnimationFrame(id_);dernier.current=null;};
  },[lecture,S]);
  if(!S)return null;
  const fini=t>=S.duree,iEtape=Math.max(0,etapes.reduce((k,e,i)=>e.t<=t?i:k,0)),e=etapes[iEtape];
  // Lecture : on relit l'étape en cours depuis son début (geste de l'utilisateur, exigé par les navigateurs mobiles)
  const jouer=()=>{sLancee(true);let d=t;if(fini){d=0;sT(0);tRef.current=0;}
    const k=Math.max(0,etapes.reduce((m,x,i)=>x.t<=d?i:m,0));dite.current=k;if(sonRef.current)dire(k);sLecture(true);};
  const arreter=()=>{taire();sLecture(false);};
  const aller=i=>{taire();sLancee(true);sT(etapes[i].t+0.01);tRef.current=etapes[i].t+0.01;dite.current=i;sLecture(false);};
  const basculerSon=()=>{const n=!son;sSon(n);sonRef.current=n;ecrireSon(n);if(!n)taire();else if(lecture)dire(iEtape);};
  const bouton={display:"inline-flex",alignItems:"center",gap:6,border:"none",borderRadius:99,padding:"7px 13px",fontWeight:800,fontSize:13,cursor:"pointer",fontFamily:"'Outfit',sans-serif"};
  return <figure style={{margin:0}}>
    <div style={{position:"relative",maxWidth:560,margin:"0 auto"}}>
      <svg viewBox="0 0 320 200" width="100%" role="img" aria-label={`Caricature animée : ${legende||scene}`} style={{display:"block",borderRadius:14,border:`2px solid ${ENCRE}`,fontFamily:"'Outfit',sans-serif",background:"#fff"}}>{S.dessin(t)}</svg>
      {!lancee&&<button onClick={jouer} className="bt" aria-label="Lancer l'animation" style={{position:"absolute",inset:0,background:"rgba(15,23,42,.35)",border:"none",borderRadius:14,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <span style={{...bouton,background:"#fff",color:col||ENCRE,fontSize:15,padding:"11px 20px",boxShadow:"0 8px 24px rgba(0,0,0,.3)"}}><i className="ti ti-player-play" style={{fontSize:18}}/>Lancer l'animation</span></button>}
    </div>
    <div style={{maxWidth:560,margin:"8px auto 0"}}>
      <div style={{height:5,background:K.c2,borderRadius:99,overflow:"hidden"}}><div style={{width:`${100*t/S.duree}%`,height:"100%",background:col||K.em}}/></div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginTop:8,flexWrap:"wrap"}}>
        <button onClick={()=>lecture?arreter():jouer()} className="bt" style={{...bouton,background:col||K.em,color:"#fff"}}><i className={`ti ti-${lecture?"player-pause":fini?"rotate-clockwise":"player-play"}`}/>{lecture?"Pause":fini?"Rejouer":t>0?"Reprendre":"Lecture"}</button>
        <div style={{display:"flex",gap:5}}>{etapes.map((x,i)=><button key={i} onClick={()=>aller(i)} className="bt" aria-label={`Étape ${i+1}`} style={{width:26,height:26,borderRadius:"50%",border:`1.5px solid ${i===iEtape&&lancee?col||K.em:K.b1}`,background:i===iEtape&&lancee?col||K.em:K.card,color:i===iEtape&&lancee?"#fff":K.t2,fontWeight:800,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif"}}>{i+1}</button>)}</div>
        {synthese()&&<button onClick={basculerSon} className="bt" aria-pressed={son} aria-label={son?"Couper la voix":"Activer la voix"} title={son?"Couper la voix":"Activer la voix"} style={{...bouton,marginLeft:"auto",background:son?`${col||K.em}18`:K.c2,color:son?col||K.em:K.t3,border:`1px solid ${son?`${col||K.em}55`:K.b1}`}}><i className={`ti ti-${son?"volume":"volume-off"}`} style={{fontSize:16}}/>{son?"Voix":"Muet"}</button>}
      </div>
      {reduit?<ol style={{fontSize:14,color:K.t1,lineHeight:1.55,margin:"8px 0 0",paddingLeft:20}}>{etapes.map((x,i)=><li key={i}>{x.texte}</li>)}</ol>
        :<div aria-live="polite" style={{minHeight:46,background:K.c2,border:`1px solid ${K.b0}`,borderRadius:10,padding:"9px 12px",marginTop:8,fontSize:14,color:K.t1,lineHeight:1.5}}>{lancee&&e?<><b style={{color:col||K.em}}>{iEtape+1}/{etapes.length}</b> · {e.texte}</>:<span style={{color:K.t3}}>Touchez « Lancer l'animation » : la scène se joue en {etapes.length} étapes{son?", commentées à voix haute":""}.</span>}</div>}
      {legende&&<figcaption style={{textAlign:"center",fontSize:13,color:K.t3,fontStyle:"italic",marginTop:6}}>{legende}</figcaption>}
    </div>
  </figure>;
}
export const SCENES_MINES=Object.keys(SCENES_ANIMEES);
