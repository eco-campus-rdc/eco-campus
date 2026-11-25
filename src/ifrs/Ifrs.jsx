import React from"react";
import ParcoursModules from"../parcours/ParcoursModules";
import{texteModuleIfrs}from"../audio/lecture";
import{MODULES_IFRS}from"./modules";
import{cleIfrs}from"../attest/regles";

// ══════════════════ LES IFRS EXPLIQUÉES : PARCOURS CERTIFIANT EN 8 MODULES (ORIENTÉ BANQUE) ══════════════════
// Page commune : src/parcours/ParcoursModules.jsx. Simulateurs, arbres de décision et flashcards : src/ifrs/Outils.jsx.
// Scores : users/{uid}.scores["IF-IF1"…] et ["IF-FINAL"]. IF1 en accès libre.
export const CFG_IFRS = {
  id: "IFRS", modules: MODULES_IFRS, cle: cleIfrs, audio: texteModuleIfrs, nom: "Le parcours IFRS", libre: "IF1",
  hero: { fond: "linear-gradient(135deg,#042F2E,#0F766E 55%,#14B8A6)", ico: "world", kicker: "Normes internationales",
    titre: "Les IFRS expliquées",
    texte: "8 modules pour comprendre les normes IFRS depuis une banque congolaise : le socle, le classement des instruments financiers, le coût amorti et le TIE, les pertes attendues (ECL), les commissions et les baux, les impôts différés et les devises USD/CDF, les actifs et provisions, les groupes. Simulateurs, arbres de décision, carte des 42 normes, flashcards et cours audio." },
  source: "Contenu fondé sur les normes IFRS publiées par l'IASB (texte français adopté par l'Union européenne) et sur le classeur « Apprendre et mémoriser les IFRS » (orienté banque). Les comparaisons avec le SYSCOHADA visent l'Acte uniforme relatif au droit comptable et à l'information financière (2017). Les cas chiffrés sont pédagogiques.",
};
export default function Ifrs(props){return <ParcoursModules cfg={CFG_IFRS} {...props}/>;}
