import React from"react";

// ══════════════════ SCHÉMA « ÉCRITURES AU JOURNAL » (SYSCOHADA NIVEAU 1) ══════════════════
// Bloc de leçon { type: "schema", kind: "journal", titre, ecritures: [{ date?, libelle, lignes: [{ c, l, d?, cr? }] }], note? }
// Chaque écriture est présentée comme au journal : comptes débités puis crédités (décalés), montants en francs congolais,
// totaux et contrôle de l'équilibre. Les comptes et l'équilibre sont vérifiés par les tests (src/syscohada/syscohada1.test.js).

const fmt=n=>Number(n||0).toLocaleString("fr-FR").replace(/ /g," ");
export const totaux=lignes=>lignes.reduce((a,x)=>({d:a.d+(x.d||0),cr:a.cr+(x.cr||0)}),{d:0,cr:0});

function Ecriture({K,col,e,mob}){
  const t=totaux(e.lignes),eq=t.d===t.cr;
  const cell={padding:mob?"6px 6px":"7px 10px",fontSize:mob?12.5:13.5,borderTop:`1px solid ${K.b0}`,verticalAlign:"top"};
  const num={...cell,textAlign:"right",fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap"};
  return <div style={{border:`1px solid ${K.b1}`,borderRadius:12,overflow:"hidden",background:K.card}}>
    <div style={{display:"flex",justifyContent:"space-between",gap:8,padding:"8px 11px",background:`${col}12`,borderBottom:`1px solid ${K.b0}`,flexWrap:"wrap"}}>
      <span style={{fontWeight:800,fontSize:13.5,color:K.t1}}>{e.libelle}</span>
      {e.date&&<span style={{fontSize:12.5,color:K.t3,fontWeight:700}}>{e.date}</span>}
    </div>
    <table style={{width:"100%",borderCollapse:"collapse"}}>
      <thead><tr style={{background:K.c2}}>
        <th style={{...cell,borderTop:"none",textAlign:"left",fontSize:11.5,color:K.t3,width:mob?54:70}}>Compte</th>
        <th style={{...cell,borderTop:"none",textAlign:"left",fontSize:11.5,color:K.t3}}>Intitulé</th>
        <th style={{...num,borderTop:"none",fontSize:11.5,color:K.t3,fontFamily:"inherit"}}>Débit</th>
        <th style={{...num,borderTop:"none",fontSize:11.5,color:K.t3,fontFamily:"inherit"}}>Crédit</th>
      </tr></thead>
      <tbody>{e.lignes.map((x,i)=><tr key={i}>
        <td style={{...cell,fontFamily:"'JetBrains Mono',monospace",fontWeight:800,color:x.d?col:K.t2,paddingLeft:x.d?undefined:(mob?16:24)}}>{x.c}</td>
        <td style={{...cell,color:K.t1,paddingLeft:x.d?undefined:(mob?14:22)}}>{x.l}</td>
        <td style={{...num,color:K.t1}}>{x.d?fmt(x.d):""}</td>
        <td style={{...num,color:K.t1}}>{x.cr?fmt(x.cr):""}</td>
      </tr>)}
      <tr style={{background:K.c2}}>
        <td colSpan={2} style={{...cell,fontWeight:800,color:eq?K.em:K.er}}><i className={`ti ti-${eq?"scale":"alert-triangle"}`} style={{marginRight:5}}/>{eq?"Équilibrée":"Déséquilibrée"}</td>
        <td style={{...num,fontWeight:800,color:K.t1}}>{fmt(t.d)}</td>
        <td style={{...num,fontWeight:800,color:K.t1}}>{fmt(t.cr)}</td>
      </tr></tbody>
    </table>
  </div>;
}

export function Journal({K,col,ecritures=[],mob}){
  const m=mob??(typeof window!=="undefined"&&window.innerWidth<600);
  return <div style={{display:"flex",flexDirection:"column",gap:10}}>
    {ecritures.map((e,i)=><Ecriture key={i} K={K} col={col||K.em} e={e} mob={m}/>)}
    <div style={{fontSize:12,color:K.t3}}><i className="ti ti-info-circle" style={{marginRight:4}}/>Montants en francs congolais (FC). Comptes débités en premier, comptes crédités en retrait.</div>
  </div>;
}

export const SCHEMAS_SYS1={journal:Journal};
