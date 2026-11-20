import React from"react";
import ParcoursModules from"../parcours/ParcoursModules";
import{texteModuleTravail}from"../audio/lecture";
import{MODULES_DT}from"./modules";
import{cleDt}from"../attest/regles";

// ══════════════════ DROIT DU TRAVAIL EN RDC : PARCOURS PROGRESSIF ══════════════════
// Page commune : src/parcours/ParcoursModules.jsx. Scores : users/{uid}.scores["DT-DT1"…] et ["DT-FINAL"]. DT1 en accès libre.
export const CFG_DT = {
  id: "DTRAV", modules: MODULES_DT, cle: cleDt, audio: texteModuleTravail, nom: "Le parcours Droit du travail", libre: "DT1",
  hero: { fond: "linear-gradient(135deg,#1E1B4B,#4C1D95 55%,#7C3AED)", ico: "scale", kicker: "Droit du travail",
    titre: "Droit du travail en RDC",
    texte: "Le Code du travail et la réforme de 2016 en 6 modules : contrats et période d'essai, discipline, maladie et maternité, temps de travail, salaire et congés, préavis et fin du contrat, inspection et tribunal du travail, avec un simulateur de préavis et des cours audio." },
  source: "Contenu fondé sur la loi n° 015/2002 du 16 octobre 2002 portant Code du travail, la loi n° 16/010 du 15 juillet 2016 qui la modifie, l'arrêté ministériel n° 12/CAB.MIN/TPS/117/2005 du 26 octobre 2005 sur le préavis et l'arrêté 68/11 du 17 mai 1968 sur les heures supplémentaires (textes publiés par Leganet). Vérifiez les conventions collectives et les arrêtés plus récents de votre secteur, notamment pour le SMIG.",
};
export default function Travail(props){return <ParcoursModules cfg={CFG_DT} {...props}/>;}
