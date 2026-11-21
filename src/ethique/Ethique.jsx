import React from"react";
import ParcoursModules from"../parcours/ParcoursModules";
import{texteModuleEthique}from"../audio/lecture";
import{MODULES_ETH,NIVEAUX_ETHIQUE}from"./modules";
import{cleEth}from"../attest/regles";

// ══════════════════ QUESTIONS ET DILEMMES ÉTHIQUES : PARCOURS PROGRESSIF EN 4 NIVEAUX ══════════════════
// Page commune : src/parcours/ParcoursModules.jsx (modules regroupés par niveau grâce à cfg.niveaux).
// Scores : users/{uid}.scores["ET-ET1"…] et ["ET-FINAL"]. ET1 en accès libre.
export const CFG_ETH = {
  id: "ETHIQ", modules: MODULES_ETH, cle: cleEth, audio: texteModuleEthique, nom: "Le parcours Éthique", libre: "ET1", niveaux: NIVEAUX_ETHIQUE,
  hero: { fond: "linear-gradient(135deg,#1F2937,#7F1D1D 55%,#D97706)", ico: "compass", kicker: "Éthique",
    titre: "Questions et dilemmes éthiques",
    texte: "8 modules en 4 niveaux, du plus simple au plus exigeant : les bases, la méthode, les grandes théories, l'argent et les conflits d'intérêts, l'éthique du comptable, le lancement d'alerte, l'éthique publique et les dilemmes du numérique, de la santé et de l'environnement. Caricatures, cas pratiques et cours audio." },
  source: "Contenu fondé sur la philosophie morale (Aristote, Kant, Bentham et Mill, Kohlberg, éthique du care, Ubuntu), le Code international de déontologie de l'IESBA, la Constitution de la RDC du 18 février 2006, le décret n° 017/2002 portant Code de conduite de l'agent public de l'État et la Convention des Nations unies contre la corruption. Les caricatures sont des dessins originaux : leurs personnages sont imaginaires.",
};
export default function Ethique(props){return <ParcoursModules cfg={CFG_ETH} {...props}/>;}
