// ══════════════════ OBJECTIFS DE CHAQUE MODULE ══════════════════
// Trois objectifs par module, chacun commençant par un verbe d'action à l'infinitif, alignés sur le contenu
// de la leçon (sections, schémas, exemples) et vérifiés par son QCM. Affichés en tête de la leçon.
// Clés : identifiant du module (F1, FE1, SB1, B1, EF1, DT1…) ; pour SYSCOHADA Niveau 1, dont les modules sont
// gérés en ligne, le code du module (M01 à M10). Un module en ligne peut aussi porter son propre champ objectifs.

export const INTRO_MODULE = "À la fin de ce module, vous saurez :";

export const OBJECTIFS_MODULES = {
  // ── SYSCOHADA révisé, niveau 1 (modules en ligne, par code) ──
  M01: [
    "Situer l'OHADA, ses États membres et la place de l'Acte uniforme relatif au droit comptable.",
    "Expliquer les principes comptables du SYSCOHADA révisé de 2017 et repérer leur violation.",
    "Identifier les obligations comptables d'une entreprise de l'espace OHADA.",
  ],
  M02: [
    "Appliquer la partie double : débiter et créditer les bons comptes.",
    "Passer les écritures au journal et les reporter au grand livre.",
    "Établir une balance et vérifier son équilibre.",
  ],
  M03: [
    "Classer un compte dans l'une des neuf classes du plan SYSCOHADA.",
    "Distinguer actif et passif, ressources stables, actif immobilisé et circulant.",
    "Établir un bilan à partir d'une liste de soldes.",
  ],
  M04: [
    "Distinguer charges et produits des activités ordinaires et hors activités ordinaires.",
    "Calculer les soldes intermédiaires de gestion, de la marge brute au résultat net.",
    "Présenter le compte de résultat et commenter la rentabilité.",
  ],
  M05: [
    "Expliquer le mécanisme de la TVA collectée et de la TVA récupérable.",
    "Comptabiliser la TVA sur les achats et les ventes avec les comptes 443 et 445.",
    "Liquider la TVA du mois : TVA due ou crédit de TVA.",
  ],
  M06: [
    "Comptabiliser une facture d'achat ou de vente avec rabais, remises, ristournes et escomptes.",
    "Enregistrer les règlements par caisse, banque et Mobile Money.",
    "Traiter les effets de commerce : création, escompte, encaissement et impayé.",
  ],
  M07: [
    "Établir un bulletin de paie : salaire brut, retenues et net à payer.",
    "Calculer les charges patronales et le coût total d'un salarié.",
    "Passer les écritures de paie et de règlement des salaires et des cotisations.",
  ],
  M08: [
    "Déterminer le coût d'entrée d'une immobilisation.",
    "Calculer un plan d'amortissement linéaire ou dégressif et comptabiliser la dotation.",
    "Comptabiliser la cession d'une immobilisation et calculer la plus- ou moins-value.",
  ],
  M09: [
    "Distinguer provisions pour risques et charges et dépréciations d'actifs.",
    "Calculer et comptabiliser la dépréciation d'une créance douteuse ou d'un stock.",
    "Ajuster, reprendre ou solder une provision à la clôture suivante.",
  ],
  M10: [
    "Passer les écritures de régularisation : charges et produits constatés d'avance, à payer et à recevoir.",
    "Établir les états financiers de fin d'exercice du système normal.",
    "Proposer et comptabiliser l'affectation du résultat.",
  ],

  // ── Fiscalité congolaise ──
  F1: [
    "Décrire la fiscalité congolaise depuis la réforme de 2026 : IS, IRPP, TVA et impôts provinciaux.",
    "Identifier les services fiscaux compétents, le NIF et le numéro TVA.",
    "Retenir le calendrier fiscal annuel d'une entreprise.",
  ],
  F2: [
    "Passer du résultat comptable au bénéfice imposable à l'IBP par réintégrations et déductions.",
    "Appliquer le report des pertes, l'impôt minimum de 1 % et les acomptes.",
    "Traiter un dossier IBP d'un exercice antérieur à 2026 lors d'un contrôle ou d'une réclamation.",
  ],
  F3: [
    "Déterminer la base imposable d'une rémunération après immunités et déductions.",
    "Calculer l'IPR au barème progressif avec le plafond de 30 % et les charges de famille.",
    "Retenir, déclarer et verser l'IPR, et appliquer l'IERE aux expatriés.",
  ],
  F4: [
    "Identifier les revenus soumis à l'impôt mobilier (dividendes, intérêts) et à l'impôt sur les revenus locatifs.",
    "Calculer la retenue à la source au bon taux.",
    "Reverser l'IM et l'IRL dans les délais.",
  ],
  F5: [
    "Classer une entreprise en micro-entreprise ou petite entreprise selon son chiffre d'affaires.",
    "Calculer l'impôt dû : forfait ou pourcentage du chiffre d'affaires.",
    "Gérer l'option, la sortie du régime et les conséquences sur la TVA.",
  ],
  F6: [
    "Déterminer si une entreprise est assujettie à la TVA et si une opération est exonérée.",
    "Calculer la TVA collectée et la TVA déductible au taux de 16 %.",
    "Liquider la TVA du mois, gérer un crédit de TVA et éviter les sanctions.",
  ],
  F7: [
    "Respecter les obligations d'identification et de déclaration de l'IS et de l'IRPP depuis 2026.",
    "Expliquer les formes du contrôle fiscal et le déroulement d'une vérification sur place.",
    "Faire valoir ses garanties : procédure contradictoire et prescription.",
  ],
  F8: [
    "Calculer les pénalités d'un retard ou d'une insuffisance de déclaration.",
    "Décrire les étapes du recouvrement, de l'AMR aux poursuites.",
    "Rédiger une réclamation dans les délais et choisir le bon recours.",
  ],
  F9: [
    "Calculer l'impôt foncier et l'impôt sur les véhicules.",
    "Expliquer la TSCR, les impôts miniers spéciaux et l'IPM.",
    "Appliquer les taux de retenue prévus par les conventions fiscales.",
  ],
  F10: [
    "Décrire les étapes d'une importation et d'une exportation en RDC.",
    "Réunir la liasse documentaire et calculer la TVA à l'importation.",
    "Contrôler le dossier de change avec la banque avant de donner le feu vert.",
  ],
  F11: [
    "Établir un bulletin de paie congolais du brut au net.",
    "Calculer les cotisations CNSS, INPP et ONEM et l'IPR du mois.",
    "Comptabiliser les salaires et les charges patronales selon le SYSCOHADA révisé.",
  ],
  F12: [
    "Recenser la TVA collectée et trier les factures d'achat ouvrant droit à déduction.",
    "Remplir la déclaration mensuelle de TVA.",
    "Comptabiliser la liquidation de la TVA du mois.",
  ],
  F13: [
    "Expliquer la facture normalisée, le DEF et l'e-DEF, et qui doit les utiliser.",
    "Émettre une facture normalisée avec les mentions et groupes de taxation exigés.",
    "Contrôler une facture reçue avant de déduire sa TVA.",
  ],
  F14: [
    "Identifier les personnes soumises à l'IRPP et les six catégories de revenus.",
    "Calculer l'IRPP au barème progressif avec les charges de famille et l'impôt minimum.",
    "Appliquer retenues, acomptes et quotités, et remplir la déclaration.",
  ],
  F15: [
    "Identifier les sociétés soumises à l'IS et les règles de territorialité.",
    "Passer du résultat comptable au bénéfice imposable en appliquant les règles de déductibilité.",
    "Calculer l'IS à 30 %, l'impôt minimum et les acomptes, puis le comptabiliser.",
  ],

  // ── Finance d'entreprise ──
  FE1: [
    "Calculer le coût des capitaux propres avec le MEDAF et la prime de risque pays.",
    "Estimer le bêta d'une société non cotée à partir de comparables.",
    "Calculer le coût moyen pondéré du capital (CMPC).",
  ],
  FE2: [
    "Distinguer la rentabilité économique et la rentabilité financière.",
    "Mesurer l'effet de levier de la dette et repérer l'effet massue.",
    "Calculer l'EVA pour savoir si l'entreprise crée de la valeur.",
  ],
  FE3: [
    "Construire les flux nets de trésorerie d'un projet d'investissement.",
    "Calculer la VAN, le TRI, l'indice de profitabilité et le délai de récupération.",
    "Comparer des projets de durées différentes ou en avenir incertain.",
  ],
  FE4: [
    "Comparer les sources de financement : emprunt, crédit-bail, fonds propres.",
    "Calculer le coût actuariel d'un financement après impôt et frais.",
    "Retenir le financement le moins coûteux pour un projet donné.",
  ],
  FE5: [
    "Choisir une méthode d'évaluation adaptée à l'entreprise.",
    "Calculer l'actif net comptable corrigé et le goodwill.",
    "Évaluer une entreprise par les flux actualisés (DCF) et par les multiples.",
  ],
  FE6: [
    "Mesurer la position de change d'un importateur ou d'un exportateur.",
    "Couvrir un risque de change par un contrat à terme.",
    "Comparer couverture à terme et option de change.",
  ],
  FE7: [
    "Appliquer l'ordre d'affectation du résultat prévu par l'Acte uniforme OHADA.",
    "Calculer la réserve légale, le bénéfice distribuable et les dividendes.",
    "Comptabiliser l'affectation et le paiement des dividendes avec la retenue à la source.",
  ],

  // ── SYCEBNL ──
  SB1: [
    "Définir une entité à but non lucratif et reconnaître les familles d'entités concernées.",
    "Situer le SYCEBNL et ses dates d'application.",
    "Appliquer les principes comptables aux situations propres aux EBNL.",
  ],
  SB2: [
    "Distinguer charge, décaissement et investissement.",
    "Organiser le circuit d'une dépense et la séparation des fonctions.",
    "Tenir journaux, grand livre et balance, avec un axe analytique par projet.",
  ],
  SB3: [
    "Se repérer dans les neuf classes du plan de comptes SYCEBNL.",
    "Utiliser les comptes propres aux EBNL : dotations, fonds affectés, bailleurs, contributions en nature.",
    "Choisir le bon compte pour une somme reçue à l'aide d'une méthode de décision.",
  ],
  SB4: [
    "Suivre une dépense de l'engagement au paiement et passer les écritures types.",
    "Rattacher les charges au bon exercice.",
    "Juger l'éligibilité d'une dépense et comptabiliser salaires et avances de mission.",
  ],
  SB5: [
    "Comptabiliser cotisations et droits d'entrée.",
    "Enregistrer les dons en numéraire et en nature, et tenir le registre des donateurs.",
    "Traiter legs, donations et dotations consomptibles ou non.",
  ],
  SB6: [
    "Qualifier une subvention à partir de la convention et choisir son compte.",
    "Suivre une ressource affectée jusqu'à la clôture, reliquats compris.",
    "Mesurer l'exécution budgétaire d'un projet et répartir les frais indirects.",
  ],
  SB7: [
    "Tenir la fiche d'une immobilisation et calculer son amortissement.",
    "Gérer stocks, dons à distribuer et inventaire physique.",
    "Contrôler caisse, banque et Mobile Money, et comptabiliser le bénévolat.",
  ],
  SB8: [
    "Respecter le calendrier de clôture et passer les écritures d'inventaire.",
    "Calculer les indicateurs budgétaires et le taux d'exécution.",
    "Analyser la situation financière d'une EBNL à l'aide de ses ratios propres.",
  ],

  // ── Comptabilité bancaire ──
  B1: [
    "Situer les textes qui fondent la comptabilité bancaire en RDC.",
    "Expliquer les obligations comptables d'une banque et ses principes propres.",
    "Appliquer les critères de classement des comptes.",
  ],
  B2: [
    "Se repérer dans les classes du GCEC et le hors-bilan (classe 0).",
    "Classer une opération bancaire dans la bonne classe.",
    "Utiliser les attributs d'identification pour ventiler chaque opération.",
  ],
  B3: [
    "Comptabiliser dépôts à vue, dépôts à terme et bons de caisse.",
    "Classer un crédit selon sa durée initiale.",
    "Enregistrer les intérêts courus en créances et dettes rattachées.",
  ],
  B4: [
    "Suivre le parcours d'un chèque ou d'un effet remis à l'encaissement.",
    "Comptabiliser les opérations de compensation à la BCC.",
    "Utiliser les comptes de liaison siège-agences et apurer les suspens.",
  ],
  B5: [
    "Comptabiliser le refinancement auprès de la BCC et la réserve obligatoire.",
    "Distinguer comptes Nostri et Lori chez les correspondants.",
    "Enregistrer pensions, prêts interbancaires et mouvements de caisse.",
  ],
  B6: [
    "Classer et évaluer les titres dans leurs quatre portefeuilles.",
    "Suivre une opération de change à terme et convertir au cours moyen BCC.",
    "Enregistrer les engagements de financement et de garantie au hors-bilan.",
  ],
  B7: [
    "Déclasser une créance en souffrance et l'étendre à l'ensemble du client.",
    "Réserver les intérêts impayés vers le hors-bilan.",
    "Constituer les provisions et comptabiliser pertes et récupérations.",
  ],
  B8: [
    "Calculer le produit net bancaire et la cascade des soldes de gestion.",
    "Présenter les comptes annuels publiables d'une banque.",
    "Préparer les états périodiques remis à la BCC.",
  ],
  B9: [
    "Passer de la balance GCEC aux postes du bilan publiable.",
    "Présenter le hors-bilan, le compte de résultat et les flux de trésorerie d'une banque.",
    "Rédiger les informations attendues dans l'annexe.",
  ],
  B10: [
    "Calculer la marge d'intérêt, le coefficient d'exploitation, le coût du risque, le ROA et le ROE.",
    "Analyser la qualité du portefeuille de crédits et sa couverture.",
    "Évaluer la liquidité, la dollarisation et la solvabilité d'une banque.",
  ],
  B11: [
    "Décomposer les agios et les comptabiliser côté banque.",
    "Appliquer les dates de valeur et construire une échelle d'intérêts.",
    "Calculer l'escompte d'un effet, traiter un impayé et calculer le taux effectif.",
  ],
  B12: [
    "Expliquer affacturage, crédit-bail et crédit documentaire.",
    "Comptabiliser cautions, avals et garanties à première demande.",
    "Appliquer les obligations de connaissance du client et de lutte contre le blanchiment.",
  ],

  // ── Éducation financière ──
  EF1: [
    "Recenser ses revenus et ses dépenses du mois.",
    "Bâtir un budget mensuel réaliste, même avec des revenus irréguliers.",
    "Tenir son budget au quotidien et l'ajuster.",
  ],
  EF2: [
    "Fixer le montant de son fonds d'urgence.",
    "Choisir où garder son épargne : compte, coopérative, likelemba ou Mobile Money.",
    "Épargner régulièrement et tenir dans la durée.",
  ],
  EF3: [
    "Choisir le service financier adapté à chaque besoin.",
    "Comparer les frais d'un compte bancaire et du Mobile Money.",
    "Utiliser le Mobile Money en sécurité et garder la trace de ses opérations.",
  ],
  EF4: [
    "Calculer le coût total d'un crédit et lire un échéancier.",
    "Décider s'il faut emprunter et combien.",
    "Vérifier un contrat avant de signer et éviter les prêts trop chers.",
  ],
  EF5: [
    "Expliquer comment la baisse du franc fait monter les prix.",
    "Choisir la monnaie de son épargne et de ses dettes.",
    "Protéger son pouvoir d'achat face à l'inflation.",
  ],
  EF6: [
    "Reconnaître les trois signaux d'une arnaque financière.",
    "Choisir les assurances utiles à sa situation.",
    "Savoir à qui s'adresser pour faire valoir ses droits.",
  ],
  EF7: [
    "Classer les placements du plus prudent au plus risqué.",
    "Appliquer les règles de l'investisseur prudent et diversifier.",
    "Vérifier un projet ou un placement avant d'investir.",
  ],
  EF8: [
    "Établir son plan financier personnel en cinq étapes.",
    "Préparer sa retraite et connaître ses droits auprès de la CNSS.",
    "Organiser ses papiers pour protéger sa famille.",
  ],

  // ── Droit du travail ──
  DT1: [
    "Définir le travailleur, l'employeur et le contrat de travail au sens du Code.",
    "Appliquer les règles d'âge pour travailler.",
    "Hiérarchiser les textes : Code du travail, loi de 2016, arrêtés et conventions.",
  ],
  DT2: [
    "Choisir entre CDD et CDI et en connaître les limites.",
    "Embaucher dans les règles : contrat écrit, mentions, visite médicale, déclaration.",
    "Appliquer la durée et la fin de la période d'essai.",
  ],
  DT3: [
    "Énumérer les obligations du travailleur et de l'employeur.",
    "Appliquer les sanctions disciplinaires autorisées et leur procédure.",
    "Gérer la suspension du contrat (maladie, maternité) et protéger la femme enceinte.",
  ],
  DT4: [
    "Contrôler la durée du travail et calculer les heures supplémentaires majorées.",
    "Payer le salaire dans les règles et respecter le SMIG.",
    "Calculer le congé annuel et accorder les congés de circonstance.",
  ],
  DT5: [
    "Distinguer rupture d'un commun accord, licenciement pour motif valable et faute lourde.",
    "Calculer la durée du préavis et l'indemnité compensatoire avec le simulateur.",
    "Établir le décompte final et le certificat de travail, et repérer un licenciement abusif.",
  ],
  DT6: [
    "Suivre le parcours d'un litige : inspection, conciliation, tribunal du travail.",
    "Respecter les délais de prescription.",
    "Expliquer le rôle des syndicats, de la délégation syndicale et les sanctions du Code.",
  ],
};

// Objectifs d'un module : son champ propre (tableau, ou texte d'une ligne par objectif), sinon la table ci-dessus
export function objectifsModule(m) {
  if (!m) return [];
  const propres = Array.isArray(m.objectifs) ? m.objectifs : typeof m.objectifs === "string" ? m.objectifs.split("\n") : [];
  const nets = propres.map(s => String(s).trim()).filter(Boolean);
  if (nets.length) return nets;
  return OBJECTIFS_MODULES[m.id] || OBJECTIFS_MODULES[m.code] || [];
}
