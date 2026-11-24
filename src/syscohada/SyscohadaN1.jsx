import React from"react";
import ParcoursModules from"../parcours/ParcoursModules";
import{texteModuleSys1}from"../audio/lecture";
import{MODULES_SYS1}from"./modules";
import{cleSys1}from"../attest/regles";

// ══════════════════ SYSCOHADA RÉVISÉ · NIVEAU 1 : PAGE DU PARCOURS ══════════════════
// Page commune : src/parcours/ParcoursModules.jsx. Après les 12 modules, l'exercice « Quel compte ? » toutes classes
// (élément CPT-T, dans le Guide des comptes) puis l'examen final. Scores : users/{uid}.scores["SY-S1"…], ["CPT-T"], ["SYS1-FINAL"].
export const CFG_SYS1 = {
  id: "SYS-N1", modules: MODULES_SYS1, cle: cleSys1, audio: texteModuleSys1, nom: "Le parcours SYSCOHADA · Niveau 1", libre: "S1",
  extras: [{ cle: "CPT-T", ico: "books", titre: "Exercice « Quel compte ? » : toutes les classes", resume: "Dans le Guide des comptes : pour chaque opération, choisissez les comptes à débiter et à créditer. Séries de 10 questions tirées parmi plus de 250 écritures types ; meilleure note conservée.", bouton: "Faire l'exercice", exo: 0 }],
  hero: { fond: "linear-gradient(135deg,#071B3E,#0A2A5C 55%,#1E4FA3)", ico: "book-2", kicker: "SYSCOHADA révisé · Niveau 1",
    titre: "Les fondamentaux de la comptabilité",
    texte: "12 modules dans l'ordre d'apprentissage : le cadre OHADA, la partie double, le bilan, le compte de résultat, les achats et ventes, la TVA, les règlements et effets, les stocks, la paie, les immobilisations, les provisions et la clôture. Écritures au journal en francs congolais, cas pratiques et cours audio, puis l'exercice « Quel compte ? » et l'examen final." },
  source: "Contenu fondé sur l'Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF) du 26 janvier 2017 et le SYSCOHADA révisé (plan de comptes et guide d'application), l'Acte uniforme relatif au droit des sociétés commerciales (AUSCGIE), le Code des impôts et la législation sociale de la RDC (TVA 16 %, CNSS, IPR, INPP, ONEM). Les entreprises et personnes des exemples sont fictives.",
};
export default function SyscohadaN1(props){return <ParcoursModules cfg={CFG_SYS1} {...props}/>;}
