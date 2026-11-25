// ══════════════════ OBJECTIFS PÉDAGOGIQUES DES PARCOURS CERTIFIANTS ══════════════════
// Pour chaque parcours (ids de PARCOURS dans src/attest/regles.js) :
// - general : l'objectif général, en une phrase ;
// - competences : ce que l'apprenant sera capable de faire à la fin, chaque ligne commençant par un verbe d'action
//   à l'infinitif (observable et évaluable par les QCM, les cas et l'examen final).
// Affichés sur la page de chaque parcours et dans « Mes formations » (composant Objectifs.jsx).

export const INTRO_OBJECTIFS = "À la fin de cette formation, vous serez capable de :";

export const OBJECTIFS = {
  "SYS-N1": {
    general: "Acquérir les bases de la comptabilité générale selon le SYSCOHADA révisé et enregistrer correctement les opérations courantes d'une entreprise.",
    competences: [
      "Expliquer le cadre OHADA et les principes comptables du SYSCOHADA révisé.",
      "Passer les écritures au journal, les reporter au grand livre et établir la balance.",
      "Classer les comptes dans les neuf classes du plan et présenter un bilan.",
      "Calculer les soldes intermédiaires de gestion et présenter le compte de résultat.",
      "Comptabiliser la TVA et la liquider chaque mois.",
      "Enregistrer achats, ventes, réductions, règlements et effets de commerce.",
      "Comptabiliser la paie, les amortissements, les cessions, les provisions et les dépréciations.",
      "Passer les écritures de régularisation, établir les états financiers et affecter le résultat.",
    ],
  },
  "SYS-N2": {
    general: "Tenir seul la comptabilité complète d'une société sur un exercice, de la pièce justificative à la balance et aux états financiers.",
    competences: [
      "Analyser une pièce justificative (facture, relevé, bulletin de paie) et en déduire l'écriture à passer.",
      "Tenir le journal de ZAO IMMO SARL sur tout l'exercice 2021 avec des écritures équilibrées.",
      "Imputer sans hésiter une opération dans chacune des neuf classes du plan de comptes.",
      "Passer les écritures d'inventaire et contrôler ses comptes par la balance.",
      "Repérer et corriger les erreurs d'imputation avant la clôture.",
      "Monter le bilan et le compte de résultat à partir de la balance après inventaire.",
    ],
  },
  FISC: {
    general: "Comprendre et appliquer la fiscalité congolaise des entreprises et des particuliers, à jour de la réforme de 2026.",
    competences: [
      "Décrire le système fiscal congolais : administrations (DGI, DGDA, DGRAD), principaux impôts et échéances.",
      "Calculer l'impôt sur les sociétés et l'IRPP de la réforme de 2026, et situer l'IBP des exercices antérieurs.",
      "Établir une paie du brut au net : IPR, cotisations CNSS, INPP et ONEM, et leurs écritures.",
      "Liquider et déclarer la TVA du mois sans erreur : TVA collectée, déductible et crédit.",
      "Émettre et vérifier une facture normalisée, condition de la déduction de la TVA.",
      "Respecter les obligations déclaratives et se préparer à un contrôle fiscal.",
      "Réagir à un redressement : sanctions, recouvrement, réclamation et recours.",
      "Appliquer les règles fiscales, douanières et de change de l'import-export.",
    ],
  },
  FIN: {
    general: "Prendre et justifier les décisions financières d'une entreprise congolaise : investir, se financer, s'évaluer, se couvrir et répartir le résultat.",
    competences: [
      "Calculer le coût moyen pondéré du capital (CMPC) d'une entreprise en RDC.",
      "Mesurer la rentabilité économique et financière, l'effet de levier et la création de valeur.",
      "Choisir un investissement avec la VAN, le TRI et le délai de récupération.",
      "Comparer emprunt, crédit-bail, apport en capital et autofinancement pour retenir le financement adapté.",
      "Évaluer une entreprise par l'approche patrimoniale, les multiples et les flux actualisés.",
      "Mesurer et couvrir le risque de change entre le dollar et le franc congolais.",
      "Affecter le résultat d'une société selon l'Acte uniforme OHADA : réserve légale, dividendes et report à nouveau.",
    ],
  },
  SYCEBNL: {
    general: "Tenir et présenter la comptabilité d'une association, d'une ONG, d'une fondation ou d'une église selon le SYCEBNL de l'OHADA.",
    competences: [
      "Identifier les entités soumises au SYCEBNL et ce qui les distingue d'une entreprise.",
      "Organiser la comptabilité et le contrôle interne d'une entité : pièces, circuit des dépenses, séparation des fonctions.",
      "Utiliser le plan de comptes SYCEBNL et ses comptes propres aux entités à but non lucratif.",
      "Comptabiliser les charges, les avances au personnel et la paie.",
      "Enregistrer les cotisations, dons, legs et dotations.",
      "Suivre les subventions et les fonds affectés par projet et par bailleur, et préparer le rapport financier.",
      "Comptabiliser les immobilisations, les stocks, la trésorerie et les contributions en nature.",
      "Clôturer l'exercice, comparer le budget aux réalisations et analyser la situation financière.",
    ],
  },
  BANQUE: {
    general: "Maîtriser la comptabilité d'un établissement de crédit en RDC selon le Guide comptable de la Banque Centrale du Congo (GCEC).",
    competences: [
      "Expliquer le cadre comptable et prudentiel des banques en RDC et le rôle de la BCC.",
      "Utiliser le plan de comptes du GCEC et ses attributs d'identification.",
      "Comptabiliser les dépôts, les crédits, les moyens de paiement, la compensation et les opérations interbancaires.",
      "Enregistrer les opérations sur titres et en devises ainsi que les engagements hors-bilan.",
      "Classer les créances en souffrance, réserver les intérêts et constituer les provisions.",
      "Calculer agios et escompte, et traiter l'affacturage, le crédit-bail, le commerce extérieur et les garanties.",
      "Produire les soldes de gestion, les états financiers et le reporting destiné à la BCC.",
      "Analyser la rentabilité, le risque, la liquidité et la solvabilité d'une banque.",
    ],
  },
  EDUF: {
    general: "Gérer son argent au quotidien et préparer son avenir en RDC, en évitant les pièges les plus courants.",
    competences: [
      "Établir un budget mensuel et suivre ses dépenses.",
      "Constituer un fonds d'urgence et épargner régulièrement, même avec un petit revenu.",
      "Utiliser la banque et le Mobile Money en sécurité : frais, code secret, preuves de transaction.",
      "Comparer des offres de crédit, en calculer le coût réel et éviter le surendettement.",
      "Protéger son pouvoir d'achat face à l'inflation et choisir entre dollar et franc congolais.",
      "Reconnaître les arnaques, choisir une assurance utile et savoir où porter plainte.",
      "Faire fructifier son épargne et préparer ses projets et sa retraite.",
    ],
  },
  ETHIQ: {
    general: "Reconnaître les questions éthiques de la vie quotidienne, professionnelle et publique, et prendre des décisions justes que l'on peut défendre devant les autres.",
    competences: [
      "Distinguer éthique, morale, déontologie et droit, et appliquer les tests du journal, du miroir et de la règle générale.",
      "Reconnaître un vrai dilemme et le résoudre avec une méthode en sept étapes.",
      "Analyser une décision avec plusieurs grilles : conséquences, devoir, vertus, care et Ubuntu.",
      "Repérer la corruption, le favoritisme et les conflits d'intérêts, et savoir y réagir.",
      "Appliquer les principes et les sauvegardes du code de déontologie des professionnels comptables (IESBA).",
      "Signaler une faute grave par les bons canaux, dans le respect de la confidentialité et des personnes.",
      "Exiger et pratiquer la redevabilité dans la gestion du bien commun.",
      "Raisonner sur les dilemmes du numérique, de la santé et de l'environnement.",
    ],
  },
  MINES: {
    general: "Comprendre le Code minier congolais révisé en 2018 et l'utiliser pour défendre ses droits, conseiller une entreprise ou contrôler l'usage des revenus miniers.",
    competences: [
      "Expliquer la propriété de l'État sur le sous-sol, distinguer mines et carrières et identifier les acteurs du secteur.",
      "Décrire le parcours d'un titre minier, du Permis de recherches au Permis d'exploitation, et les parts dues à l'État et aux Congolais.",
      "Appliquer les règles de l'exploitation artisanale, de la coopérative au comptoir, et exiger la traçabilité des minerais.",
      "Calculer la redevance minière selon la substance et sa répartition entre l'État, la province, l'ETD et le FOMIN.",
      "Faire valoir les droits des communautés : étude d'impact, cahier des charges, dotation de 0,3 %, indemnisation et réparation.",
      "Utiliser la transparence (contrats, paiements, propriétaires réels, ITIE) pour exiger des comptes, et appliquer les règles de contenu local.",
    ],
  },
  IFRS: {
    general: "Comprendre les normes IFRS telles qu'elles s'appliquent à une banque, savoir les comparer au SYSCOHADA et produire les principaux retraitements.",
    competences: [
      "Situer chaque question dans la carte des normes et expliquer la logique des IFRS face au SYSCOHADA.",
      "Classer les instruments financiers selon IFRS 9 et mesurer leur juste valeur selon IFRS 13.",
      "Calculer le coût amorti, le taux d'intérêt effectif et les pertes de crédit attendues en 3 stades.",
      "Appliquer IFRS 15 aux commissions et IFRS 16 aux baux d'agences.",
      "Calculer les impôts différés et traiter les opérations en USD et en CDF selon IAS 21.",
      "Tester la dépréciation d'une agence, décider d'une provision et analyser le contrôle d'une filiale.",
    ],
  },
  DTRAV: {
    general: "Connaître et appliquer le Code du travail congolais, à jour de la réforme de 2016, du côté du travailleur comme de l'employeur.",
    competences: [
      "Identifier les textes applicables (Code du travail de 2002, loi de 2016, arrêtés) et les acteurs du droit du travail.",
      "Distinguer CDD et CDI, vérifier les mentions d'un contrat et appliquer les règles de la période d'essai.",
      "Appliquer les obligations de chaque partie, la procédure disciplinaire et les protections en cas de maladie et de maternité.",
      "Contrôler la durée du travail, les heures supplémentaires et leurs majorations, le salaire et les congés.",
      "Calculer le préavis et le décompte final selon la catégorie et l'ancienneté, et conduire une rupture régulière.",
      "Faire valoir ses droits : inspection du travail, conciliation, tribunal du travail et syndicats.",
    ],
  },
};
