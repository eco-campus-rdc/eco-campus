import React from"react";
import ParcoursModules from"../parcours/ParcoursModules";
import{texteModuleMines}from"../audio/lecture";
import{MODULES_MINES}from"./modules";
import{cleMin}from"../attest/regles";

// ══════════════════ LE CODE MINIER EXPLIQUÉ : PARCOURS CERTIFIANT EN 6 MODULES ══════════════════
// Page commune : src/parcours/ParcoursModules.jsx. Caricatures animées : src/mines/Animation.jsx.
// Scores : users/{uid}.scores["MI-MI1"…] et ["MI-FINAL"]. MI1 en accès libre.
export const CFG_MINES = {
  id: "MINES", modules: MODULES_MINES, cle: cleMin, audio: texteModuleMines, nom: "Le parcours Code minier", libre: "MI1",
  hero: { fond: "linear-gradient(135deg,#1C1917,#78350F 55%,#D97706)", ico: "pick", kicker: "Code minier",
    titre: "Le Code minier expliqué",
    texte: "6 modules pour comprendre la loi minière congolaise révisée en 2018 : à qui appartient le sous-sol, comment s'obtiennent les permis, l'exploitation artisanale, la redevance et son partage, les droits des communautés et la transparence. Caricatures animées, simulateur de redevance, cas pratiques et cours audio." },
  source: "Contenu fondé sur la loi n° 007/2002 du 11 juillet 2002 portant Code minier, modifiée et complétée par la loi n° 18/001 du 9 mars 2018 (Journal officiel, numéro spécial du 28 mars 2018), et sur le décret n° 038/2003 du 26 mars 2003 portant Règlement minier, modifié par le décret n° 18/024 du 8 juin 2018. Les caricatures animées sont des dessins originaux : leurs personnages sont imaginaires. Pour un dossier réel, vérifiez toujours le texte en vigueur.",
};
export default function Mines(props){return <ParcoursModules cfg={CFG_MINES} {...props}/>;}
