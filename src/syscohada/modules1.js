// ══════════════════ SYSCOHADA RÉVISÉ · NIVEAU 1 : MODULES 1 À 4 ══════════════════
// Cadre, partie double, bilan, compte de résultat. Comptes vérifiés dans le plan (src/ef/syscohada/plan.json) par les tests.
export const AUDCIF = "Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF), adopté le 26 janvier 2017, et Système comptable OHADA révisé (SYSCOHADA)";

const S1 = {
  id: "S1", titre: "Le cadre OHADA et les principes comptables", court: "Le cadre", ico: "building-bank", col: "#0A2A5C", duree: "40 min", libre: true,
  resume: "L'OHADA et ses 17 États, l'AUDCIF de 2017, les deux systèmes comptables, les obligations de toute entreprise et les principes qui guident chaque écriture.",
  blocs: [
    { type: "essentiel", texte: "L'**OHADA** (Organisation pour l'harmonisation en Afrique du droit des affaires) réunit **17 États**, dont la **RDC depuis 2012**. Son **Acte uniforme relatif au droit comptable et à l'information financière (AUDCIF)**, adopté le **26 janvier 2017**, impose le **SYSCOHADA révisé** à toutes les entités depuis le **1er janvier 2018** (comptes consolidés : 1er janvier 2019). Toute entreprise tient une comptabilité **en monnaie légale** (en RDC : le **franc congolais**), sur un **exercice de 12 mois** qui coïncide en principe avec l'année civile, et respecte des **principes** communs : prudence, permanence des méthodes, coût historique, continuité d'exploitation, indépendance des exercices…" },
    { type: "schema", kind: "cartes", titre: "Les textes à connaître", cartes: [
      { ico: "world", t: "Traité OHADA", d: "Signé à Port-Louis le 17 octobre 1993, révisé à Québec en 2008. Les Actes uniformes s'appliquent directement dans les 17 États." },
      { ico: "book", t: "AUDCIF (2017)", d: "Fixe les obligations comptables, les principes et les états financiers. Remplace l'Acte uniforme comptable de 2000." },
      { ico: "list-numbers", t: "Plan de comptes SYSCOHADA", d: "Neuf classes de comptes, des numéros communs à tous les États, un guide d'application avec des écritures types." },
      { ico: "building", t: "AUSCGIE", d: "Acte uniforme sur les sociétés commerciales : approbation des comptes, réserve légale, dépôt au RCCM." },
    ] },
    { type: "schema", kind: "tableau", titre: "Deux systèmes comptables", entetes: ["Système", "Pour qui", "États financiers"], lignes: [
      ["Système normal", "Toutes les entités, sauf les très petites", "Bilan, compte de résultat, tableau des flux de trésorerie (TFT), notes annexes"],
      ["Système minimal de trésorerie (SMT)", "Très petites entités sous les seuils de chiffre d'affaires de l'AUDCIF", "État des recettes et des dépenses, état de trésorerie, notes simplifiées"],
    ] },
    { type: "schema", kind: "cartes", titre: "Les principes comptables", cartes: [
      { ico: "shield-check", t: "Prudence", d: "On enregistre les pertes probables, jamais les gains incertains." },
      { ico: "repeat", t: "Permanence des méthodes", d: "Mêmes méthodes d'un exercice à l'autre ; tout changement est justifié en notes annexes." },
      { ico: "receipt", t: "Coût historique", d: "Un bien entre en comptabilité à son coût d'acquisition ou de production." },
      { ico: "infinity", t: "Continuité d'exploitation", d: "On présente les comptes comme si l'entreprise poursuivait son activité." },
      { ico: "calendar", t: "Indépendance des exercices", d: "Chaque exercice supporte ses propres charges et produits, quelle que soit la date de paiement." },
      { ico: "lock", t: "Intangibilité du bilan d'ouverture", d: "Le bilan d'ouverture est identique au bilan de clôture de l'exercice précédent." },
      { ico: "zoom-in", t: "Importance significative", d: "Toute information qui peut influencer le jugement des lecteurs doit être donnée." },
      { ico: "eye", t: "Réalité sur l'apparence", d: "On traduit la réalité économique d'une opération, pas seulement sa forme juridique." },
    ] },
    { type: "schema", kind: "flux", titre: "Les obligations de toute entreprise", etapes: [
      { op: "1", l: "Tenir les livres obligatoires", d: "Journal, grand livre, balance générale et livre d'inventaire." },
      { op: "2", l: "Justifier chaque écriture", d: "Une pièce datée (facture, relevé, bulletin de paie) appuie chaque enregistrement." },
      { op: "3", l: "Faire l'inventaire au moins une fois par an", d: "Compter les stocks, vérifier les créances, les dettes et les immobilisations." },
      { op: "4", l: "Établir les états financiers annuels", d: "Approuvés par l'assemblée générale dans les 6 mois de la clôture." },
      { op: "5", l: "Déposer les comptes et conserver les pièces", d: "Dépôt au RCCM dans le mois suivant l'approbation ; conservation des pièces et des livres pendant 10 ans.", fort: true },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : changer de méthode pour embellir les comptes", situation: "Fin d'année difficile chez KASAÏ NÉGOCE SARL. Le gérant demande au comptable de passer de l'amortissement dégressif au linéaire, « juste cette année », pour afficher un bénéfice plus élevé.", options: [
      { l: "Changer de méthode sans rien dire", pour: "Bénéfice plus élevé cette année.", contre: "Viole la permanence des méthodes et la sincérité ; les comptes trompent les associés, la banque et le fisc." },
      { l: "Garder la méthode, ou en changer seulement pour une raison réelle et l'expliquer en notes annexes", pour: "Comptes réguliers et sincères ; l'information est complète.", contre: "Le résultat affiché reste faible." },
    ], question: "Quel principe impose d'expliquer tout changement de méthode ?", piste: "La permanence des méthodes : on ne change de méthode que si cela améliore l'information, et l'on en indique l'effet chiffré dans les notes annexes." },
    { type: "pieges", puces: [
      "Utiliser un cours ou un manuel antérieur à 2017 : le TAFIRE et le système allégé n'existent plus ; le TFT est obligatoire dans le système normal.",
      "Croire qu'une petite entreprise est dispensée de comptabilité : elle relève au minimum du système minimal de trésorerie.",
      "Corriger une erreur ancienne en modifiant le bilan d'ouverture : c'est interdit (intangibilité) ; on corrige dans les comptes de l'exercice.",
      "Jeter les pièces après deux ou trois ans : elles se conservent 10 ans.",
    ] },
    { type: "articles", refs: [AUDCIF + ".", "Traité relatif à l'harmonisation du droit des affaires en Afrique, Port-Louis, 17 octobre 1993, révisé à Québec le 17 octobre 2008.", "Acte uniforme relatif au droit des sociétés commerciales et du GIE (AUSCGIE) : approbation des comptes, dépôt au RCCM."] },
  ],
  narration: [
    "Bienvenue dans le parcours SYSCOHADA, niveau un. Ce premier module pose le cadre.",
    "L'OHADA réunit dix-sept États africains, dont la République démocratique du Congo depuis 2012. Ses Actes uniformes s'appliquent directement dans chacun de ces États.",
    "En comptabilité, le texte de référence est l'Acte uniforme relatif au droit comptable et à l'information financière, adopté le 26 janvier 2017. Il impose le SYSCOHADA révisé depuis le premier janvier 2018.",
    "Il existe deux systèmes : le système normal, avec bilan, compte de résultat, tableau des flux de trésorerie et notes annexes ; et le système minimal de trésorerie, réservé aux très petites entités.",
    "Toute entreprise tient un journal, un grand livre, une balance et un livre d'inventaire, appuie chaque écriture sur une pièce justificative, et conserve ses documents pendant dix ans.",
    "Enfin, retenez les principes : prudence, permanence des méthodes, coût historique, continuité d'exploitation, indépendance des exercices, intangibilité du bilan d'ouverture, importance significative et prééminence de la réalité sur l'apparence.",
  ],
  qcm: [
    { q: "Combien d'États sont membres de l'OHADA ?", r: ["17", "10", "21", "25"], b: 0, e: "La RDC est le 17e État membre, depuis 2012." },
    { q: "Depuis quand la RDC est-elle membre de l'OHADA ?", r: ["2012", "1993", "2002", "2017"], b: 0, e: "Le Traité est entré en vigueur pour la RDC en 2012." },
    { q: "Quand l'AUDCIF a-t-il été adopté ?", r: ["Le 26 janvier 2017", "Le 17 octobre 1993", "Le 1er janvier 2000", "Le 30 juin 2010"], b: 0, e: "Il est applicable aux comptes personnels depuis le 1er janvier 2018." },
    { q: "Depuis quand le SYSCOHADA révisé s'applique-t-il aux comptes personnels des entités ?", r: ["Le 1er janvier 2018", "Le 1er janvier 2017", "Le 1er janvier 2019", "Le 1er janvier 2001"], b: 0, e: "Les comptes consolidés suivent à partir du 1er janvier 2019." },
    { q: "Quels sont les états financiers du système normal ?", r: ["Bilan, compte de résultat, TFT et notes annexes", "Bilan et compte de résultat seulement", "Bilan, TAFIRE et état annexé", "Balance et grand livre"], b: 0, e: "Le TAFIRE a disparu avec la révision de 2017." },
    { q: "Quels sont les deux systèmes comptables du SYSCOHADA révisé ?", r: ["Le système normal et le système minimal de trésorerie", "Le système normal et le système allégé", "Le système allégé et le système minimal", "Le système bancaire et le système fiscal"], b: 0, e: "Le système allégé a été supprimé en 2017." },
    { q: "En quelle monnaie une entreprise congolaise tient-elle sa comptabilité ?", r: ["En franc congolais, la monnaie légale", "Obligatoirement en dollars américains", "En francs CFA", "Dans la monnaie de son choix"], b: 0, e: "La comptabilité est tenue dans la monnaie légale du pays." },
    { q: "Quelle est la durée normale d'un exercice comptable ?", r: ["12 mois, en principe l'année civile", "6 mois", "24 mois", "Libre, selon l'entreprise"], b: 0, e: "Un exercice plus court ou plus long n'est admis qu'à la création ou en cas d'événement particulier." },
    { q: "Lequel n'est PAS un principe comptable du SYSCOHADA ?", r: ["La maximisation du bénéfice", "La prudence", "La permanence des méthodes", "Le coût historique"], b: 0, e: "La comptabilité décrit la réalité, elle ne cherche pas à maximiser le résultat." },
    { q: "Un bien entre en comptabilité à son coût d'acquisition : c'est le principe…", r: ["Du coût historique", "De prudence", "D'importance significative", "De continuité"], b: 0, e: "On ne réévalue pas librement les biens." },
    { q: "Le bilan d'ouverture doit être identique au bilan de clôture de l'exercice précédent. C'est le principe…", r: ["D'intangibilité du bilan d'ouverture", "De permanence des méthodes", "De prudence", "De transparence"], b: 0, e: "Une erreur ancienne se corrige dans les comptes de l'exercice." },
    { q: "Quels sont les livres obligatoires ?", r: ["Journal, grand livre, balance et livre d'inventaire", "Cahier de caisse uniquement", "Factures et relevés bancaires", "Bilan et budget"], b: 0, e: "Ils sont tenus sans blanc ni altération." },
    { q: "Pendant combien de temps conserve-t-on les pièces et les livres ?", r: ["10 ans", "2 ans", "5 ans", "1 an"], b: 0, e: "Ils peuvent être demandés lors d'un contrôle ou d'un litige." },
    { q: "Dans quel délai les comptes approuvés d'une société sont-ils déposés au RCCM ?", r: ["Dans le mois qui suit leur approbation", "Dans les 4 mois de la clôture", "Dans l'année", "Ils ne sont jamais déposés"], b: 0, e: "L'assemblée les approuve dans les 6 mois de la clôture ; le dépôt suit dans le mois." },
    { q: "Une entreprise change de méthode d'amortissement. Que doit-elle faire ?", r: ["Le justifier et en indiquer l'effet dans les notes annexes", "Ne rien dire", "Modifier le bilan d'ouverture", "Demander l'accord du client"], b: 0, e: "Principe de permanence des méthodes." },
  ],
};

const S2 = {
  id: "S2", titre: "La partie double : journal, grand livre et balance", court: "La partie double", ico: "arrows-left-right", col: "#1D4ED8", duree: "45 min",
  resume: "Débit et crédit, emplois et ressources, les quatre familles de comptes, passer une écriture au journal, la reporter au grand livre et contrôler la balance.",
  blocs: [
    { type: "essentiel", texte: "Toute opération touche **au moins deux comptes** : un compte est **débité**, un autre est **crédité**, pour le **même montant**. C'est la **partie double** : le total des débits est toujours égal au total des crédits. Pour savoir de quel côté passer, une règle simple : **l'emploi va au débit, la ressource au crédit**. Un actif qui augmente, une charge : **débit**. Un passif qui augmente, un produit : **crédit**. On enregistre d'abord au **journal** (ordre chronologique), on reporte au **grand livre** (un compte par page), puis la **balance** vérifie que tout est équilibré." },
    { type: "schema", kind: "tableau", titre: "De quel côté passer ?", entetes: ["Famille de comptes", "Augmente au", "Diminue au", "Exemples"], lignes: [
      ["Actif (ce que l'entreprise possède)", "Débit", "Crédit", "521 Banque, 571 Caisse, 411 Clients, 2451 Véhicules"],
      ["Passif (ce qu'elle doit, ses ressources)", "Crédit", "Débit", "101 Capital, 162 Emprunts, 401 Fournisseurs"],
      ["Charges (consommations)", "Débit", "Crédit (rare)", "601 Achats de marchandises, 6611 Salaires, 625 Assurances"],
      ["Produits (ressources de l'activité)", "Crédit", "Débit (rare)", "701 Ventes de marchandises, 706 Services vendus"],
    ] },
    { type: "schema", kind: "journal", titre: "Les premières écritures de MBOKA SARL (TVA 16 %)", ecritures: [
      { date: "02/01", libelle: "Apport du capital en numéraire, versé en banque", lignes: [
        { c: "521", l: "Banques", d: 10000000 }, { c: "101", l: "Capital social", cr: 10000000 }] },
      { date: "05/01", libelle: "Achat de marchandises payé par virement : 2 000 000 FC HT", lignes: [
        { c: "601", l: "Achats de marchandises", d: 2000000 }, { c: "4452", l: "TVA récupérable sur achats", d: 320000 }, { c: "521", l: "Banques", cr: 2320000 }] },
      { date: "12/01", libelle: "Vente de marchandises à crédit : 3 000 000 FC HT", lignes: [
        { c: "411", l: "Clients", d: 3480000 }, { c: "701", l: "Ventes de marchandises", cr: 3000000 }, { c: "4431", l: "TVA facturée sur ventes", cr: 480000 }] },
      { date: "28/01", libelle: "Encaissement du client par virement", lignes: [
        { c: "521", l: "Banques", d: 3480000 }, { c: "411", l: "Clients", cr: 3480000 }] },
    ] },
    { type: "schema", kind: "flux", titre: "Du journal à la balance", etapes: [
      { op: "1", l: "Pièce justificative", d: "Facture, relevé, reçu : la date, le montant et le tiers." },
      { op: "2", l: "Journal", d: "L'écriture, dans l'ordre chronologique : date, comptes, libellé, débit, crédit." },
      { op: "3", l: "Grand livre", d: "Chaque ligne est reportée dans son compte ; on calcule le solde de chaque compte." },
      { op: "4", l: "Balance", d: "La liste de tous les comptes avec leurs totaux et soldes : total débit = total crédit.", fort: true },
    ] },
    { type: "schema", kind: "tableau", titre: "Le compte 521 Banques de MBOKA SARL au grand livre", entetes: ["Date", "Libellé", "Débit", "Crédit"], lignes: [
      ["02/01", "Apport du capital", "10 000 000", ""], ["05/01", "Achat de marchandises", "", "2 320 000"], ["28/01", "Encaissement client", "3 480 000", ""],
      ["31/01", "Solde débiteur", "", "11 160 000"],
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : la balance ne tombe pas juste", situation: "La balance de janvier affiche 15 800 000 FC au débit et 15 480 000 FC au crédit. Le stagiaire propose d'ajouter 320 000 FC « en divers » au crédit pour l'équilibrer.", options: [
      { l: "Ajouter un compte « divers » pour équilibrer", pour: "La balance tombe juste tout de suite.", contre: "L'erreur reste cachée ; les comptes sont faux." },
      { l: "Rechercher l'écriture déséquilibrée", pour: "On trouve la vraie erreur : ici, la TVA de 320 000 FC débitée sans crédit correspondant.", contre: "Demande de reprendre les écritures une par une." },
    ], question: "Pourquoi l'écart de 320 000 FC est-il un indice précieux ?", piste: "Il correspond exactement à la TVA sur l'achat du 5 janvier : on vérifie d'abord les écritures portant ce montant. Une balance s'équilibre en corrigeant l'erreur, jamais en la masquant." },
    { type: "pieges", puces: [
      "Confondre le débit et le crédit avec « je dois » et « on me doit » au sens bancaire : en comptabilité, débit = emploi, crédit = ressource.",
      "Oublier la TVA dans l'écriture : le total TTC passe au tiers ou à la banque, le HT en charge ou en produit, la TVA à part.",
      "Penser qu'une balance équilibrée prouve que tout est juste : une écriture passée deux fois ou dans le mauvais compte reste équilibrée.",
    ] },
    { type: "articles", refs: [AUDCIF + " : organisation comptable, journal, grand livre, balance.", "Guide d'application du SYSCOHADA révisé : fonctionnement des comptes."] },
  ],
  narration: [
    "Ce module présente le mécanisme de base de la comptabilité : la partie double.",
    "Chaque opération touche au moins deux comptes : l'un est débité, l'autre crédité, pour le même montant.",
    "Retenez la règle : l'emploi va au débit, la ressource au crédit. Un actif qui augmente ou une charge se débitent ; un passif qui augmente ou un produit se créditent.",
    "Par exemple, l'apport du capital en banque : on débite le compte 521 Banques, et on crédite le compte 101 Capital social.",
    "Les écritures s'enregistrent d'abord au journal, dans l'ordre des dates, puis sont reportées au grand livre, compte par compte.",
    "La balance reprend tous les comptes : le total des débits doit égaler le total des crédits. Si ce n'est pas le cas, on cherche l'erreur, on ne la masque jamais.",
  ],
  qcm: [
    { q: "Que signifie la partie double ?", r: ["Chaque opération est enregistrée au débit d'au moins un compte et au crédit d'au moins un autre, pour le même montant", "Chaque opération est enregistrée deux fois au même compte", "On tient deux comptabilités", "On double les montants pour la TVA"], b: 0, e: "Le total des débits égale toujours le total des crédits." },
    { q: "L'augmentation d'un compte d'actif s'enregistre :", r: ["Au débit", "Au crédit", "Hors bilan", "Dans les notes annexes"], b: 0, e: "L'actif est un emploi." },
    { q: "L'augmentation d'un compte de passif s'enregistre :", r: ["Au crédit", "Au débit", "Au débit et au crédit", "Nulle part"], b: 0, e: "Le passif est une ressource." },
    { q: "Une charge s'enregistre normalement :", r: ["Au débit", "Au crédit", "En diminution du capital", "Au bilan"], b: 0, e: "Les charges sont des emplois de l'exercice." },
    { q: "Un produit s'enregistre normalement :", r: ["Au crédit", "Au débit", "À l'actif", "En charges"], b: 0, e: "Les produits sont des ressources de l'exercice." },
    { q: "Apport du capital en banque : quelle écriture ?", r: ["Débit 521, crédit 101", "Débit 101, crédit 521", "Débit 521, crédit 701", "Débit 601, crédit 101"], b: 0, e: "La banque augmente (actif), le capital augmente (passif)." },
    { q: "Achat de marchandises à crédit : quel compte est crédité ?", r: ["401 Fournisseurs", "411 Clients", "601 Achats", "701 Ventes"], b: 0, e: "On doit le montant TTC au fournisseur." },
    { q: "Vente de marchandises à crédit : quels comptes sont crédités ?", r: ["701 Ventes et 4431 TVA facturée", "411 Clients et 701 Ventes", "601 Achats et 4452 TVA", "521 Banques et 701 Ventes"], b: 0, e: "Le client (411) est débité du TTC." },
    { q: "Un achat de 2 000 000 FC HT avec TVA à 16 % se paie :", r: ["2 320 000 FC", "2 000 000 FC", "2 160 000 FC", "1 680 000 FC"], b: 0, e: "TVA = 320 000 FC ; TTC = 2 320 000 FC." },
    { q: "Dans quel ordre tient-on les écritures au journal ?", r: ["Dans l'ordre chronologique", "Par ordre alphabétique des tiers", "Par numéro de compte", "Par montant décroissant"], b: 0, e: "Le journal suit les dates." },
    { q: "À quoi sert le grand livre ?", r: ["À regrouper les mouvements de chaque compte et en calculer le solde", "À lister les clients", "À présenter le bilan", "À calculer la TVA"], b: 0, e: "Un compte par page, avec ses débits et crédits." },
    { q: "La balance vérifie que :", r: ["Le total des débits égale le total des crédits", "La trésorerie est positive", "Le résultat est un bénéfice", "La TVA est payée"], b: 0, e: "C'est un contrôle arithmétique." },
    { q: "Une balance équilibrée prouve-t-elle que la comptabilité est juste ?", r: ["Non : une erreur de compte ou une écriture en double restent équilibrées", "Oui, toujours", "Oui, si la TVA est payée", "Oui, au 31 décembre"], b: 0, e: "La balance ne détecte que les déséquilibres." },
    { q: "Un compte de banque qui a reçu 13 480 000 FC et payé 2 320 000 FC a un solde :", r: ["Débiteur de 11 160 000 FC", "Créditeur de 11 160 000 FC", "Débiteur de 15 800 000 FC", "Nul"], b: 0, e: "13 480 000 − 2 320 000 = 11 160 000 FC au débit." },
    { q: "Que fait-on si la balance ne tombe pas juste ?", r: ["On recherche l'écriture erronée et on la corrige", "On ajoute un compte « divers »", "On modifie le bilan d'ouverture", "On ignore l'écart"], b: 0, e: "L'écart guide la recherche (montant, double, inversion)." },
  ],
};

const S3 = {
  id: "S3", titre: "Le plan de comptes et le bilan", court: "Le bilan", ico: "scale", col: "#0F766E", duree: "45 min",
  resume: "Les neuf classes du plan SYSCOHADA, la lecture d'un numéro de compte, la structure du bilan (actif, passif) et l'équilibre actif = passif.",
  blocs: [
    { type: "essentiel", texte: "Le plan SYSCOHADA range les comptes en **neuf classes**. Les classes **1 à 5** alimentent le **bilan**, les classes **6, 7 et 8** le **compte de résultat**, la classe **9** les engagements hors bilan et la comptabilité analytique. Chaque chiffre précise le précédent : **5** trésorerie → **52** banques → **521** banques locales. Le **bilan** photographie l'entreprise à une date : à l'**actif**, ce qu'elle possède (immobilisations, stocks, créances, trésorerie) ; au **passif**, d'où viennent ses ressources (capitaux propres, dettes). Toujours : **total actif = total passif**." },
    { type: "schema", kind: "tableau", titre: "Les neuf classes", entetes: ["Classe", "Contenu", "État financier"], lignes: [
      ["1", "Comptes de ressources durables (capital, réserves, résultat, emprunts, provisions)", "Bilan, passif"],
      ["2", "Comptes d'actif immobilisé (incorporel, terrains, bâtiments, matériel, amortissements)", "Bilan, actif"],
      ["3", "Comptes de stocks (marchandises, matières, produits)", "Bilan, actif"],
      ["4", "Comptes de tiers (fournisseurs, clients, personnel, État, associés)", "Bilan, actif ou passif"],
      ["5", "Comptes de trésorerie (banques, caisse, chèques et effets à encaisser)", "Bilan, actif ou passif"],
      ["6", "Comptes de charges des activités ordinaires", "Compte de résultat"],
      ["7", "Comptes de produits des activités ordinaires", "Compte de résultat"],
      ["8", "Autres charges et produits (hors activités ordinaires, impôt sur le résultat)", "Compte de résultat"],
      ["9", "Engagements hors bilan et comptabilité analytique de gestion", "Hors bilan, gestion"],
    ] },
    { type: "schema", kind: "flux", titre: "Lire un numéro de compte : 4452", etapes: [
      { op: "4", l: "Classe 4 : comptes de tiers" },
      { op: "44", l: "État et collectivités publiques" },
      { op: "445", l: "État, TVA récupérable" },
      { op: "4452", l: "TVA récupérable sur achats", fort: true },
    ] },
    { type: "schema", kind: "tableau", titre: "Bilan simplifié de MBOKA SARL au 31/01 (en FC)", entetes: ["Actif", "Montant", "Passif", "Montant"], lignes: [
      ["Matériel de bureau (2441)", "1 500 000", "Capital social (101)", "10 000 000"],
      ["Marchandises (31)", "2 000 000", "Résultat net : bénéfice (131)", "1 000 000"],
      ["Clients (411)", "1 200 000", "Emprunt bancaire (162)", "4 000 000"],
      ["Banques (521)", "11 160 000", "Fournisseurs (401)", "860 000"],
      ["Total actif", "15 860 000", "Total passif", "15 860 000"],
    ] },
    { type: "schema", kind: "cartes", titre: "Les grandes masses du bilan", cartes: [
      { ico: "building", t: "Actif immobilisé", d: "Biens durables : logiciels, terrains, bâtiments, matériel, véhicules (classe 2), nets d'amortissements." },
      { ico: "box", t: "Actif circulant", d: "Stocks (classe 3) et créances (clients, État, personnel : classe 4)." },
      { ico: "cash", t: "Trésorerie-actif", d: "Banques, caisse, chèques et effets à encaisser (classe 5)." },
      { ico: "pig-money", t: "Capitaux propres", d: "Capital, réserves, report à nouveau, résultat (classe 1)." },
      { ico: "building-bank", t: "Dettes financières", d: "Emprunts à plus d'un an et provisions pour risques (classe 1)." },
      { ico: "file-invoice", t: "Passif circulant et trésorerie-passif", d: "Fournisseurs, dettes fiscales et sociales (classe 4), découverts et crédits de trésorerie (classe 5)." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le découvert bancaire", situation: "Au 31 décembre, le compte de MBOKA SARL à la BCDC présente un découvert de 800 000 FC, tandis que le compte Rawbank est créditeur (positif) de 2 500 000 FC. Le comptable propose d'inscrire 1 700 000 FC net en trésorerie-actif.", options: [
      { l: "Compenser les deux comptes", pour: "Un seul chiffre, plus simple.", contre: "Contraire au principe de non-compensation : le découvert est une dette envers une autre banque." },
      { l: "Inscrire 2 500 000 FC en trésorerie-actif et 800 000 FC en trésorerie-passif", pour: "Image fidèle de la situation avec chaque banque.", contre: "Une ligne de plus au bilan." },
    ], question: "Pourquoi ne pas compenser un avoir et un découvert ?", piste: "Ce sont deux contrats distincts : l'un est un avoir, l'autre une dette (souvent coûteuse). Le lecteur du bilan doit voir les deux." },
    { type: "pieges", puces: [
      "Placer le résultat de l'exercice dans le compte de résultat seulement : il apparaît aussi au passif du bilan (compte 13).",
      "Oublier que les comptes de tiers et de trésorerie peuvent changer de côté : un client créditeur (avance reçue) est une dette.",
      "Confondre amortissement et dépréciation : tous deux viennent en diminution de l'actif, mais pour des raisons différentes.",
    ] },
    { type: "articles", refs: [AUDCIF + " : plan de comptes, bilan.", "Guide d'application du SYSCOHADA révisé : liste des comptes et modèle de bilan du système normal."] },
  ],
  narration: [
    "Ce module présente le plan de comptes et le bilan.",
    "Le plan SYSCOHADA compte neuf classes. Les classes un à cinq alimentent le bilan ; les classes six, sept et huit, le compte de résultat ; la classe neuf, les engagements hors bilan et la comptabilité analytique.",
    "Un numéro se lit de gauche à droite : quatre, comptes de tiers ; quarante-quatre, l'État ; quatre cent quarante-cinq, la TVA récupérable ; quatre mille quatre cent cinquante-deux, la TVA récupérable sur achats.",
    "Le bilan photographie l'entreprise à une date. À l'actif : les immobilisations, les stocks, les créances et la trésorerie. Au passif : les capitaux propres, les dettes financières, le passif circulant et la trésorerie-passif.",
    "Le total de l'actif est toujours égal au total du passif. Et l'on ne compense jamais un avoir bancaire avec un découvert.",
  ],
  qcm: [
    { q: "Combien de classes compte le plan SYSCOHADA ?", r: ["9", "7", "8", "10"], b: 0, e: "De la classe 1 (ressources durables) à la classe 9 (hors bilan et analytique)." },
    { q: "Les stocks relèvent de la classe :", r: ["3", "2", "4", "6"], b: 0, e: "Classe 3 : marchandises, matières, produits." },
    { q: "Le compte 521 représente :", r: ["Les banques locales", "La caisse", "Les clients", "Les fournisseurs"], b: 0, e: "Classe 5 : trésorerie." },
    { q: "Le capital social se trouve dans la classe :", r: ["1", "2", "4", "5"], b: 0, e: "Compte 101, ressources durables." },
    { q: "Les comptes de charges et de produits des activités ordinaires sont dans les classes :", r: ["6 et 7", "2 et 3", "4 et 5", "8 et 9"], b: 0, e: "Ils alimentent le compte de résultat." },
    { q: "Que contient la classe 8 ?", r: ["Les charges et produits hors activités ordinaires et l'impôt sur le résultat", "Les stocks", "Les engagements hors bilan", "La trésorerie"], b: 0, e: "Par exemple : 812, 822, 891." },
    { q: "Que contient la classe 9 ?", r: ["Les engagements hors bilan et la comptabilité analytique", "Les immobilisations", "Les charges de personnel", "Les dettes fiscales"], b: 0, e: "Elle n'entre pas dans le bilan." },
    { q: "Que signifie le compte 4452 ?", r: ["TVA récupérable sur achats", "TVA facturée sur ventes", "État, TVA due", "Crédit de TVA à reporter"], b: 0, e: "445 : État, TVA récupérable." },
    { q: "Quelle est la règle fondamentale du bilan ?", r: ["Total actif = total passif", "Actif supérieur au passif", "Passif supérieur à l'actif", "Actif = résultat"], b: 0, e: "Les ressources financent exactement les emplois." },
    { q: "Un véhicule de livraison figure :", r: ["À l'actif immobilisé", "À l'actif circulant", "Au passif", "En charges"], b: 0, e: "Compte 245 Matériel de transport." },
    { q: "Une dette envers un fournisseur figure :", r: ["Au passif circulant", "À l'actif immobilisé", "En capitaux propres", "En trésorerie-actif"], b: 0, e: "Compte 401." },
    { q: "Un emprunt bancaire de 5 ans figure :", r: ["Dans les dettes financières", "Dans la trésorerie-passif", "Dans les charges", "À l'actif"], b: 0, e: "Compte 162, ressource durable." },
    { q: "Le résultat de l'exercice apparaît au bilan :", r: ["Au passif, dans les capitaux propres", "À l'actif circulant", "Il n'apparaît pas au bilan", "Dans la trésorerie"], b: 0, e: "Compte 131 (bénéfice) ou 139 (perte)." },
    { q: "Un avoir de 2 500 000 FC dans une banque et un découvert de 800 000 FC dans une autre se présentent :", r: ["Séparément : 2 500 000 FC à l'actif, 800 000 FC au passif", "Compensés pour 1 700 000 FC", "Uniquement le découvert", "Uniquement l'avoir"], b: 0, e: "Principe de non-compensation." },
    { q: "Un client qui a versé une avance (compte créditeur) représente :", r: ["Une dette de l'entreprise", "Une créance", "Un produit encaissé définitivement", "Un stock"], b: 0, e: "Compte 4191 Clients, avances et acomptes reçus." },
  ],
};

const S4 = {
  id: "S4", titre: "Le compte de résultat et les soldes intermédiaires de gestion", court: "Le résultat", ico: "chart-bar", col: "#7C3AED", duree: "45 min",
  resume: "Charges et produits, activités ordinaires et HAO, la cascade des soldes intermédiaires de gestion (marge, valeur ajoutée, EBE, résultats) et l'impôt sur le résultat.",
  blocs: [
    { type: "essentiel", texte: "Le **compte de résultat** décrit l'activité de l'exercice : **produits** (classe 7, et 82, 84…) moins **charges** (classe 6, et 81, 83, 89). Si les produits dépassent les charges, c'est un **bénéfice** (compte 131) ; sinon une **perte** (139). Le SYSCOHADA présente le résultat en **cascade de soldes intermédiaires de gestion** : **marge commerciale**, **valeur ajoutée**, **excédent brut d'exploitation (EBE)**, **résultat d'exploitation**, **résultat financier**, **résultat des activités ordinaires**, **résultat hors activités ordinaires (HAO)**, puis le **résultat net** après impôt." },
    { type: "schema", kind: "flux", titre: "La cascade des soldes", etapes: [
      { op: "MC", l: "Marge commerciale", d: "Ventes de marchandises − (achats de marchandises ± variation de stock)." },
      { op: "VA", l: "Valeur ajoutée", d: "Marge et production − consommations venant des tiers (autres achats, transports, services extérieurs, impôts et taxes, autres charges)." },
      { op: "EBE", l: "Excédent brut d'exploitation", d: "Valeur ajoutée − charges de personnel." },
      { op: "RE", l: "Résultat d'exploitation", d: "EBE + reprises et transferts − dotations aux amortissements, provisions et dépréciations." },
      { op: "RF", l: "Résultat financier", d: "Produits financiers − charges financières (intérêts, escomptes accordés, pertes de change)." },
      { op: "RAO", l: "Résultat des activités ordinaires", d: "Résultat d'exploitation + résultat financier." },
      { op: "RN", l: "Résultat net", d: "RAO + résultat HAO − participation des travailleurs − impôt sur le résultat.", fort: true },
    ] },
    { type: "schema", kind: "tableau", titre: "Exemple chiffré : KINSHASA TRADE SARL (en FC)", entetes: ["Élément", "Montant", "Solde"], lignes: [
      ["Ventes de marchandises (701)", "50 000 000", ""],
      ["Achats de marchandises (601)", "− 30 000 000", ""],
      ["Variation des stocks de marchandises (6031) : stock en hausse", "+ 1 000 000", "Marge commerciale : 21 000 000"],
      ["Transports, services extérieurs, impôts et taxes", "− 4 500 000", "Valeur ajoutée : 16 500 000"],
      ["Charges de personnel (66)", "− 8 000 000", "EBE : 8 500 000"],
      ["Dotations aux amortissements (681)", "− 2 000 000", "Résultat d'exploitation : 6 500 000"],
      ["Intérêts des emprunts (671)", "− 500 000", "Résultat financier : − 500 000"],
      ["", "", "Résultat des activités ordinaires : 6 000 000"],
      ["Impôt sur le résultat (891), 30 %", "− 1 800 000", "Résultat net : 4 200 000"],
    ] },
    { type: "schema", kind: "journal", titre: "Constater l'impôt et le résultat", ecritures: [
      { date: "31/12", libelle: "Impôt sur le résultat de l'exercice (30 % de 6 000 000 FC)", lignes: [
        { c: "891", l: "Impôts sur les bénéfices de l'exercice", d: 1800000 }, { c: "441", l: "État, impôt sur les bénéfices", cr: 1800000 }] },
    ] },
    { type: "schema", kind: "cartes", titre: "Activités ordinaires ou HAO ?", cartes: [
      { ico: "repeat", t: "Activités ordinaires", d: "Ce que l'entreprise fait habituellement : acheter, vendre, produire, payer ses salariés, ses intérêts (classes 6 et 7)." },
      { ico: "bolt", t: "Hors activités ordinaires (HAO)", d: "Opérations exceptionnelles : cession d'une immobilisation (81, 82), pénalités, dons reçus ou versés à titre exceptionnel (83, 84)." },
      { ico: "receipt-tax", t: "Impôt sur le résultat", d: "Compte 891, en bas du compte de résultat. En RDC : 30 % du bénéfice imposable, avec un minimum de 1 % du chiffre d'affaires." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : un bénéfice grâce à la vente du camion", situation: "PATRICE DISTRIBUTION affiche un bénéfice de 3 000 000 FC. Mais son résultat d'exploitation est une perte de 2 000 000 FC ; le bénéfice vient de la vente d'un vieux camion (plus-value HAO de 5 000 000 FC).", options: [
      { l: "Présenter seulement le bénéfice net", pour: "Message rassurant pour la banque.", contre: "Masque le fait que l'activité courante perd de l'argent." },
      { l: "Analyser la cascade des soldes", pour: "Montre que l'activité normale est déficitaire et qu'il faut agir (prix, coûts).", contre: "Message moins flatteur." },
    ], question: "Pourquoi le SYSCOHADA sépare-t-il le résultat HAO du résultat des activités ordinaires ?", piste: "Pour que le lecteur voie la rentabilité durable de l'activité, sans qu'une opération exceptionnelle (comme une cession) ne la masque." },
    { type: "pieges", puces: [
      "Compter la TVA dans le chiffre d'affaires : le compte de résultat est toujours hors taxes.",
      "Oublier la variation de stock dans la marge : un stock en hausse diminue le coût des marchandises vendues.",
      "Placer une plus-value de cession dans les produits d'exploitation : c'est un élément HAO (comptes 81 et 82).",
    ] },
    { type: "articles", refs: [AUDCIF + " : compte de résultat et soldes intermédiaires de gestion.", "Code des impôts de la RDC : impôt sur les bénéfices (taux de 30 %, minimum de 1 % du chiffre d'affaires) ; voir le parcours Fiscalité, module IS."] },
  ],
  narration: [
    "Ce module présente le compte de résultat.",
    "Il oppose les produits de l'exercice à ses charges. Si les produits l'emportent, c'est un bénéfice ; sinon, une perte.",
    "Le SYSCOHADA présente le résultat en cascade : la marge commerciale, la valeur ajoutée, l'excédent brut d'exploitation, le résultat d'exploitation, le résultat financier, le résultat des activités ordinaires, le résultat hors activités ordinaires, puis le résultat net après impôt.",
    "Dans notre exemple, des ventes de cinquante millions, des achats de trente millions et un stock en hausse d'un million donnent une marge commerciale de vingt et un millions.",
    "Les opérations exceptionnelles, comme la vente d'un camion, sont classées hors activités ordinaires, pour ne pas masquer la rentabilité de l'activité courante.",
    "Enfin, l'impôt sur le résultat se constate au débit du compte 891, au crédit du compte 441.",
  ],
  qcm: [
    { q: "Le résultat net est égal à :", r: ["Produits − charges de l'exercice", "Actif − passif", "Chiffre d'affaires − stocks", "Encaissements − décaissements"], b: 0, e: "Bénéfice si positif (131), perte si négatif (139)." },
    { q: "Le compte des ventes de marchandises est le :", r: ["701", "601", "411", "521"], b: 0, e: "Classe 7 : produits." },
    { q: "Les charges de personnel sont dans le compte :", r: ["66", "60", "64", "67"], b: 0, e: "661 rémunérations directes, 664 charges sociales." },
    { q: "Comment calcule-t-on la marge commerciale ?", r: ["Ventes de marchandises − (achats de marchandises ± variation de stock)", "Ventes − salaires", "Chiffre d'affaires − impôts", "Valeur ajoutée − EBE"], b: 0, e: "C'est le premier solde pour une activité de négoce." },
    { q: "Ventes 50 000 000, achats 30 000 000, stock en hausse de 1 000 000 FC. Marge commerciale ?", r: ["21 000 000 FC", "20 000 000 FC", "19 000 000 FC", "31 000 000 FC"], b: 0, e: "50 − (30 − 1) = 21 millions." },
    { q: "L'excédent brut d'exploitation (EBE) est égal à :", r: ["Valeur ajoutée − charges de personnel", "Marge − impôts", "Résultat net + impôt", "Ventes − achats"], b: 0, e: "Il mesure la performance de l'exploitation avant amortissements." },
    { q: "Valeur ajoutée 16 500 000, charges de personnel 8 000 000 FC. EBE ?", r: ["8 500 000 FC", "24 500 000 FC", "16 500 000 FC", "8 000 000 FC"], b: 0, e: "16,5 − 8 = 8,5 millions." },
    { q: "Les dotations aux amortissements sont déduites pour passer :", r: ["De l'EBE au résultat d'exploitation", "De la marge à la valeur ajoutée", "Du résultat financier au RAO", "Du RAO au résultat HAO"], b: 0, e: "Compte 681." },
    { q: "Les intérêts d'emprunt affectent :", r: ["Le résultat financier", "La marge commerciale", "La valeur ajoutée", "Le résultat HAO"], b: 0, e: "Compte 671." },
    { q: "La plus-value sur la vente d'un camion est :", r: ["Un élément hors activités ordinaires (HAO)", "Un produit d'exploitation", "Une marge commerciale", "Un produit financier"], b: 0, e: "Comptes 812 et 822." },
    { q: "Quelle écriture constate l'impôt sur le résultat ?", r: ["Débit 891, crédit 441", "Débit 441, crédit 891", "Débit 641, crédit 521", "Débit 131, crédit 441"], b: 0, e: "L'impôt est une charge de l'exercice et une dette envers l'État." },
    { q: "Résultat avant impôt 6 000 000 FC, taux de 30 %. Résultat net ?", r: ["4 200 000 FC", "1 800 000 FC", "6 000 000 FC", "7 800 000 FC"], b: 0, e: "Impôt 1 800 000 ; 6 000 000 − 1 800 000 = 4 200 000 FC." },
    { q: "Le chiffre d'affaires du compte de résultat est :", r: ["Hors taxes", "Toutes taxes comprises", "En dollars", "Après impôt"], b: 0, e: "La TVA facturée est une dette envers l'État, pas un produit." },
    { q: "Un stock de marchandises en hausse en fin d'exercice :", r: ["Diminue le coût des marchandises vendues et augmente la marge", "Augmente les charges", "N'a aucun effet", "Diminue le chiffre d'affaires"], b: 0, e: "Une partie des achats n'a pas été consommée." },
    { q: "Pourquoi sépare-t-on le résultat HAO ?", r: ["Pour montrer la rentabilité de l'activité courante sans l'effet des opérations exceptionnelles", "Pour payer moins d'impôt", "Parce que le fisc l'interdit", "Pour équilibrer le bilan"], b: 0, e: "Le lecteur juge la performance durable." },
  ],
};

export const MODULES_SYS1_A = [S1, S2, S3, S4];
