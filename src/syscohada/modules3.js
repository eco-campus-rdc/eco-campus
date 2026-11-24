// ══════════════════ SYSCOHADA RÉVISÉ · NIVEAU 1 : MODULES 9 À 12 ══════════════════
// Paie, immobilisations, provisions et dépréciations, clôture et affectation du résultat.
// Taux de paie alignés sur src/fiscal/paie.js (vérifié par les tests).
import { AUDCIF } from "./modules1";

const S9 = {
  id: "S9", titre: "La paie : salaires, CNSS et IPR", court: "La paie", ico: "users", col: "#6D28D9", duree: "50 min",
  resume: "Du salaire brut au net à payer, les retenues (CNSS 5 %, IPR), les charges patronales (CNSS 13 %, INPP, ONEM), les écritures de paie, d'avance et de paiement.",
  blocs: [
    { type: "essentiel", texte: "La paie s'enregistre en trois temps. **1) La paie du mois** : le **salaire brut** est une charge (**6611** Appointements, salaires et commissions) ; on crédite les **retenues** que l'employeur reverse pour le salarié (**CNSS 5 %** au **431**, **IPR** au **4472** Impôts sur salaires) et le **net à payer** (**422** Personnel, rémunérations dues). **2) Les charges patronales** : **CNSS employeur 13 %** (pensions 5 %, risques professionnels 1,5 %, prestations familiales 6,5 %) au débit du **6641**, crédit **431** ; **INPP** (3,5 %, 3 % ou 2 % selon l'effectif) et **ONEM** (0,5 %) au débit du **6413** Taxes sur appointements et salaires. **3) Les paiements** : le net au salarié (débit **422**), puis les cotisations et l'IPR aux organismes et à l'État dans les délais." },
    { type: "schema", kind: "tableau", titre: "Bulletin simplifié d'octobre : M. Kabeya, brut 1 500 000 FC", entetes: ["Élément", "Calcul", "Montant (FC)"], lignes: [
      ["Salaire brut", "", "1 500 000"],
      ["CNSS part salariale", "1 500 000 × 5 %", "− 75 000"],
      ["IPR (barème progressif, après abattement des charges de famille)", "Calculé avec le simulateur de paie", "− 120 000"],
      ["Net à payer", "", "1 305 000"],
      ["CNSS part patronale", "1 500 000 × 13 %", "195 000"],
      ["INPP (entreprise de 1 à 50 travailleurs)", "1 500 000 × 3,5 %", "52 500"],
      ["ONEM", "1 500 000 × 0,5 %", "7 500"],
      ["Coût total pour l'employeur", "1 500 000 + 195 000 + 52 500 + 7 500", "1 755 000"],
    ] },
    { type: "schema", kind: "journal", titre: "Les écritures de paie d'octobre", ecritures: [
      { date: "31/10", libelle: "Paie d'octobre : salaire brut, retenues et net à payer", lignes: [
        { c: "6611", l: "Appointements, salaires et commissions", d: 1500000 }, { c: "431", l: "Sécurité sociale (CNSS)", cr: 75000 },
        { c: "4472", l: "Impôts sur salaires (IPR)", cr: 120000 }, { c: "422", l: "Personnel, rémunérations dues", cr: 1305000 }] },
      { date: "31/10", libelle: "Charges sociales patronales (CNSS 13 %)", lignes: [
        { c: "6641", l: "Charges sociales sur rémunération du personnel national", d: 195000 }, { c: "431", l: "Sécurité sociale (CNSS)", cr: 195000 }] },
      { date: "31/10", libelle: "Taxes sur salaires (INPP et ONEM)", lignes: [
        { c: "6413", l: "Taxes sur appointements et salaires", d: 60000 }, { c: "4318", l: "Autres cotisations sociales (INPP, ONEM)", cr: 60000 }] },
      { date: "05/11", libelle: "Virement du net au salarié", lignes: [
        { c: "422", l: "Personnel, rémunérations dues", d: 1305000 }, { c: "521", l: "Banques", cr: 1305000 }] },
    ] },
    { type: "schema", kind: "journal", titre: "Une avance sur salaire", ecritures: [
      { date: "15/10", libelle: "Avance de 200 000 FC remise en espèces", lignes: [
        { c: "421", l: "Personnel, avances et acomptes", d: 200000 }, { c: "571", l: "Caisse", cr: 200000 }] },
      { date: "31/10", libelle: "Déduction de l'avance sur le net à payer", lignes: [
        { c: "422", l: "Personnel, rémunérations dues", d: 200000 }, { c: "421", l: "Personnel, avances et acomptes", cr: 200000 }] },
    ] },
    { type: "schema", kind: "cartes", titre: "Ce qu'il faut savoir en RDC", cartes: [
      { ico: "building", t: "CNSS", d: "5 % retenus sur le salarié, 13 % à la charge de l'employeur, déclarés et payés chaque mois." },
      { ico: "receipt-tax", t: "IPR", d: "Retenu à la source selon le barème progressif (3 % à 40 %), réduit de 2 % par personne à charge (9 au maximum)." },
      { ico: "school", t: "INPP", d: "Formation professionnelle : 3,5 % (1 à 50 travailleurs), 3 % (51 à 300), 2 % (plus de 300)." },
      { ico: "briefcase", t: "ONEM", d: "0,5 % de la masse salariale, à la charge de l'employeur." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : payer « en net »", situation: "Une PME propose à ses employés de leur verser 1 400 000 FC « net en main », sans bulletin ni déclaration, pour éviter la CNSS et l'IPR.", options: [
      { l: "Payer sans déclarer", pour: "Économie immédiate de cotisations et d'impôt.", contre: "Les salariés perdent leur pension et leur couverture ; redressements et pénalités pour l'entreprise ; charges non justifiées." },
      { l: "Établir un bulletin et déclarer", pour: "Les salariés sont protégés ; les charges sont déductibles et justifiées.", contre: "Coût plus élevé pour l'employeur." },
    ], question: "Pourquoi une paie non déclarée fausse-t-elle aussi la comptabilité ?", piste: "Les sommes versées n'ont pas de pièce régulière : elles ne peuvent pas être passées en charges de personnel, et la dette envers la CNSS et l'État reste cachée." },
    { type: "pieges", puces: [
      "Passer le net en charge : la charge est le salaire brut (6611) ; le net n'est qu'une partie de ce que l'entreprise doit.",
      "Confondre la part salariale (retenue sur le brut) et la part patronale (charge en plus du brut).",
      "Oublier de déduire l'avance du net à payer en fin de mois.",
      "Calculer l'IPR « à la main » sans le barème : utilisez le simulateur du parcours Fiscalité (module Paie).",
    ] },
    { type: "articles", refs: [AUDCIF + " : comptes 421, 422, 431, 447, 6611, 6641 et 6413.", "Code des impôts (IPR), législation de la CNSS, de l'INPP et de l'ONEM ; voir le parcours Fiscalité, module Paie en RDC."] },
  ],
  narration: [
    "Ce module explique comment enregistrer la paie.",
    "Le salaire brut est une charge, au compte 6611. On en retient la part salariale de la CNSS, cinq pour cent, et l'impôt professionnel sur les rémunérations, l'IPR. Le reste est le net à payer, au compte 422.",
    "L'employeur supporte en plus ses propres charges : la CNSS patronale, treize pour cent, au compte 6641 ; et les taxes sur salaires, l'INPP et l'ONEM, au compte 6413.",
    "Pour un brut d'un million cinq cent mille francs, avec un IPR de cent vingt mille francs, le salarié touche un million trois cent cinq mille francs, et l'employeur supporte un coût total d'un million sept cent cinquante-cinq mille francs.",
    "Une avance sur salaire se débite au compte 421, puis se déduit du net à payer à la fin du mois.",
  ],
  qcm: [
    { q: "Le salaire brut est enregistré au débit du compte :", r: ["6611", "422", "431", "4472"], b: 0, e: "Appointements, salaires et commissions." },
    { q: "Le net à payer au salarié est crédité au compte :", r: ["422", "421", "6611", "431"], b: 0, e: "Personnel, rémunérations dues." },
    { q: "Quel est le taux de la part salariale de la CNSS ?", r: ["5 %", "13 %", "3,5 %", "0,5 %"], b: 0, e: "Retenue sur le salaire brut." },
    { q: "Quel est le taux de la part patronale de la CNSS ?", r: ["13 %", "5 %", "6,5 %", "18 %"], b: 0, e: "Pensions 5 %, risques professionnels 1,5 %, prestations familiales 6,5 %." },
    { q: "L'IPR retenu sur le salaire est crédité au compte :", r: ["4472", "431", "441", "6413"], b: 0, e: "État, impôts retenus à la source : impôts sur salaires." },
    { q: "Les cotisations patronales CNSS se débitent au :", r: ["6641", "6611", "431", "422"], b: 0, e: "Charges sociales sur rémunération du personnel national." },
    { q: "Les taxes INPP et ONEM se débitent au :", r: ["6413", "6641", "6611", "4472"], b: 0, e: "Taxes sur appointements et salaires." },
    { q: "Quel est le taux INPP d'une entreprise de 30 travailleurs ?", r: ["3,5 %", "2 %", "3 %", "0,5 %"], b: 0, e: "3,5 % de 1 à 50 travailleurs." },
    { q: "Quel est le taux de l'ONEM ?", r: ["0,5 %", "1 %", "2 %", "5 %"], b: 0, e: "À la charge de l'employeur." },
    { q: "Brut 1 500 000 FC, CNSS 5 % et IPR 120 000 FC. Net à payer ?", r: ["1 305 000 FC", "1 425 000 FC", "1 380 000 FC", "1 500 000 FC"], b: 0, e: "1 500 000 − 75 000 − 120 000." },
    { q: "Avec CNSS patronale 13 %, INPP 3,5 % et ONEM 0,5 %, quel est le coût employeur d'un brut de 1 500 000 FC ?", r: ["1 755 000 FC", "1 500 000 FC", "1 695 000 FC", "1 305 000 FC"], b: 0, e: "1 500 000 + 195 000 + 52 500 + 7 500." },
    { q: "Une avance sur salaire versée en espèces se passe :", r: ["Débit 421, crédit 571", "Débit 6611, crédit 571", "Débit 422, crédit 571", "Débit 571, crédit 421"], b: 0, e: "C'est une créance sur le salarié." },
    { q: "En fin de mois, l'avance est :", r: ["Déduite du net à payer (débit 422, crédit 421)", "Passée en charge", "Annulée", "Ajoutée au brut"], b: 0, e: "Le salarié touche le net diminué de l'avance." },
    { q: "Le paiement du net par virement se passe :", r: ["Débit 422, crédit 521", "Débit 6611, crédit 521", "Débit 521, crédit 422", "Débit 431, crédit 521"], b: 0, e: "On solde la dette envers le salarié." },
    { q: "La part salariale de la CNSS est-elle une charge de l'entreprise ?", r: ["Non, elle est retenue sur le brut et reversée pour le salarié", "Oui, au 6641", "Oui, au 6413", "Oui, au 641"], b: 0, e: "Seule la part patronale est une charge supplémentaire." },
  ],
};

const S10 = {
  id: "S10", titre: "Immobilisations, amortissements et cessions", court: "Les immobilisations", ico: "car", col: "#0E7490", duree: "50 min",
  resume: "Le coût d'entrée d'une immobilisation, l'amortissement linéaire au prorata temporis, l'approche par composants, le tableau d'amortissement et la cession avec sa plus ou moins-value.",
  blocs: [
    { type: "essentiel", texte: "Une **immobilisation** est un bien destiné à **servir durablement** (plus d'un exercice) : logiciel, terrain, bâtiment, matériel, véhicule. Elle entre au bilan à son **coût d'acquisition** : prix d'achat net + frais accessoires (transport, installation, droits de douane), **hors TVA récupérable**. Chaque année, l'**amortissement** constate son usure : débit **681** (6813 pour les immobilisations corporelles), crédit **28** (2845 pour le matériel de transport). Le mode le plus courant est le **linéaire**, au **prorata temporis** à partir de la **mise en service**. Le SYSCOHADA révisé impose l'**approche par composants** quand les éléments ont des durées différentes. Les **terrains ne s'amortissent pas**. À la **cession**, on sort le bien (compte **812**) et on constate le prix (compte **822**) : la différence est la **plus ou moins-value HAO**." },
    { type: "schema", kind: "journal", titre: "Achat d'un véhicule de livraison le 1er avril N : 24 000 000 FC HT", ecritures: [
      { date: "01/04/N", libelle: "Acquisition à crédit (fournisseur d'investissement)", lignes: [
        { c: "2451", l: "Matériel automobile", d: 24000000 }, { c: "4451", l: "TVA récupérable sur immobilisations", d: 3840000 },
        { c: "481", l: "Fournisseurs d'investissements", cr: 27840000 }] },
    ] },
    { type: "schema", kind: "tableau", titre: "Tableau d'amortissement linéaire (5 ans, taux 20 %)", entetes: ["Exercice", "Dotation (FC)", "Cumul (FC)", "Valeur nette comptable (FC)"], lignes: [
      ["N (9 mois)", "24 000 000 × 20 % × 9/12 = 3 600 000", "3 600 000", "20 400 000"],
      ["N+1", "4 800 000", "8 400 000", "15 600 000"],
      ["N+2", "4 800 000", "13 200 000", "10 800 000"],
      ["N+3", "4 800 000", "18 000 000", "6 000 000"],
      ["N+4", "4 800 000", "22 800 000", "1 200 000"],
      ["N+5 (3 mois)", "1 200 000", "24 000 000", "0"],
    ] },
    { type: "schema", kind: "journal", titre: "Dotation de l'exercice N", ecritures: [
      { date: "31/12/N", libelle: "Amortissement du véhicule (9 mois)", lignes: [
        { c: "6813", l: "Dotations aux amortissements des immobilisations corporelles", d: 3600000 }, { c: "2845", l: "Amortissements du matériel de transport", cr: 3600000 }] },
    ] },
    { type: "schema", kind: "journal", titre: "Cession du véhicule le 1er juillet N+2 pour 14 000 000 FC", ecritures: [
      { date: "01/07/N+2", libelle: "Dotation complémentaire de N+2 (6 mois)", lignes: [
        { c: "6813", l: "Dotations aux amortissements des immobilisations corporelles", d: 2400000 }, { c: "2845", l: "Amortissements du matériel de transport", cr: 2400000 }] },
      { date: "01/07/N+2", libelle: "Sortie du véhicule : cumul 10 800 000 FC, valeur nette 13 200 000 FC", lignes: [
        { c: "2845", l: "Amortissements du matériel de transport", d: 10800000 }, { c: "812", l: "Valeurs comptables des cessions d'immobilisations corporelles", d: 13200000 },
        { c: "2451", l: "Matériel automobile", cr: 24000000 }] },
      { date: "01/07/N+2", libelle: "Prix de cession (à recevoir)", lignes: [
        { c: "485", l: "Créances sur cessions d'immobilisations", d: 14000000 }, { c: "822", l: "Produits des cessions d'immobilisations corporelles", cr: 14000000 }] },
    ] },
    { type: "schema", kind: "cartes", titre: "À retenir", cartes: [
      { ico: "calculator", t: "Plus ou moins-value", d: "Prix de cession (822) − valeur nette comptable (812). Ici : 14 000 000 − 13 200 000 = plus-value de 800 000 FC." },
      { ico: "puzzle", t: "Approche par composants", d: "Un bâtiment : gros œuvre sur 40 ans, toiture sur 20 ans, ascenseur sur 15 ans, chacun amorti séparément." },
      { ico: "trees", t: "Terrains", d: "Ils ne s'usent pas : pas d'amortissement (sauf terrains de gisement)." },
      { ico: "receipt", t: "Petit matériel", d: "Un bien de faible valeur peut être passé directement en charges, selon la politique de l'entreprise." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : charge ou immobilisation ?", situation: "MBOKA SARL achète un groupe électrogène de 9 000 000 FC HT, qui servira 5 ans. Le gérant veut le passer en charges cette année pour réduire l'impôt.", options: [
      { l: "Passer en charges", pour: "Résultat et impôt plus faibles cette année.", contre: "Contraire au SYSCOHADA : un bien durable est une immobilisation ; risque de redressement." },
      { l: "Immobiliser et amortir sur 5 ans", pour: "Charge répartie sur la durée d'utilisation ; comptes sincères.", contre: "Impôt plus élevé la première année." },
    ], question: "Quel principe impose de répartir le coût sur 5 ans ?", piste: "L'indépendance des exercices : chaque année qui profite du groupe électrogène supporte sa part du coût par l'amortissement." },
    { type: "pieges", puces: [
      "Inclure la TVA récupérable dans le coût de l'immobilisation : elle va au 4451.",
      "Amortir à partir de la date de facture au lieu de la mise en service.",
      "Oublier la dotation complémentaire jusqu'à la date de cession.",
      "Créditer directement le compte d'immobilisation du prix de vente : on sort la valeur d'origine (812) et on constate le prix à part (822).",
    ] },
    { type: "articles", refs: [AUDCIF + " : coût d'entrée, amortissement, approche par composants, cessions (comptes 812 et 822).", "Guide d'application du SYSCOHADA révisé : comptes 24, 28, 481, 485 et 681."] },
  ],
  narration: [
    "Ce module traite des immobilisations.",
    "Une immobilisation est un bien destiné à servir durablement. Elle entre au bilan à son coût d'acquisition : le prix, plus les frais accessoires, sans la TVA récupérable.",
    "Chaque année, l'amortissement constate son usure : débit 6813, crédit d'un compte 28. Le linéaire se calcule au prorata temporis à partir de la mise en service.",
    "Un véhicule de vingt-quatre millions, amorti sur cinq ans et mis en service le premier avril, supporte en première année une dotation de trois millions six cent mille francs.",
    "À la cession, on passe d'abord la dotation complémentaire, puis on sort le bien au compte 812 pour sa valeur nette, et l'on constate le prix au compte 822. La différence est une plus ou moins-value hors activités ordinaires.",
    "Retenez aussi l'approche par composants, et que les terrains ne s'amortissent pas.",
  ],
  qcm: [
    { q: "Une immobilisation est un bien destiné :", r: ["À servir durablement, plus d'un exercice", "À être revendu rapidement", "À être consommé dans le mois", "À payer les salaires"], b: 0, e: "Classe 2." },
    { q: "La TVA récupérable sur l'achat d'un véhicule :", r: ["Va au 4451 et n'entre pas dans le coût", "Augmente le coût du véhicule", "Est une charge", "Va au 4452"], b: 0, e: "TVA récupérable sur immobilisations." },
    { q: "Les frais de transport et d'installation d'une machine :", r: ["Font partie de son coût d'acquisition", "Sont des charges de l'exercice", "Sont des produits", "Sont ignorés"], b: 0, e: "Ils sont nécessaires pour la mettre en service." },
    { q: "L'amortissement linéaire annuel d'un bien de 24 000 000 FC sur 5 ans est de :", r: ["4 800 000 FC", "2 400 000 FC", "6 000 000 FC", "1 200 000 FC"], b: 0, e: "24 000 000 / 5." },
    { q: "Mis en service le 1er avril, ce bien supporte en première année :", r: ["3 600 000 FC", "4 800 000 FC", "1 200 000 FC", "2 400 000 FC"], b: 0, e: "4 800 000 × 9/12." },
    { q: "La dotation aux amortissements d'un véhicule se passe :", r: ["Débit 6813, crédit 2845", "Débit 2845, crédit 6813", "Débit 2451, crédit 6813", "Débit 6813, crédit 2451"], b: 0, e: "Charge d'exploitation et amortissement cumulé." },
    { q: "À partir de quand amortit-on ?", r: ["De la date de mise en service", "De la date de commande", "Du 1er janvier suivant", "De la date de paiement"], b: 0, e: "Prorata temporis." },
    { q: "Les terrains :", r: ["Ne s'amortissent pas, sauf gisements", "S'amortissent sur 50 ans", "S'amortissent sur 20 ans", "S'amortissent en dégressif"], b: 0, e: "Ils ne s'usent pas." },
    { q: "L'approche par composants consiste à :", r: ["Amortir séparément les éléments d'un bien qui ont des durées différentes", "Amortir tous les biens sur 5 ans", "Ne pas amortir les bâtiments", "Regrouper toutes les immobilisations"], b: 0, e: "Introduite par le SYSCOHADA révisé." },
    { q: "Valeur d'origine 24 000 000, amortissements cumulés 10 800 000 FC. Valeur nette comptable ?", r: ["13 200 000 FC", "10 800 000 FC", "34 800 000 FC", "24 000 000 FC"], b: 0, e: "24 000 000 − 10 800 000." },
    { q: "À la cession, la valeur nette comptable du bien est débitée au :", r: ["812", "822", "485", "681"], b: 0, e: "Valeurs comptables des cessions d'immobilisations corporelles." },
    { q: "Le prix de cession d'une immobilisation corporelle est crédité au :", r: ["822", "701", "812", "758"], b: 0, e: "Produits des cessions d'immobilisations : HAO." },
    { q: "Prix de cession 14 000 000 FC, valeur nette 13 200 000 FC. Résultat de cession ?", r: ["Plus-value de 800 000 FC", "Moins-value de 800 000 FC", "Plus-value de 14 000 000 FC", "Aucun"], b: 0, e: "822 − 812." },
    { q: "Un groupe électrogène qui servira 5 ans doit être :", r: ["Immobilisé et amorti", "Passé en charges dans l'année", "Inscrit en stock", "Ignoré"], b: 0, e: "Il sert durablement." },
    { q: "L'achat d'une immobilisation à crédit est dû au compte :", r: ["481 Fournisseurs d'investissements", "401 Fournisseurs", "411 Clients", "162 Emprunts"], b: 0, e: "On distingue les fournisseurs d'immobilisations." },
  ],
};

const S11 = {
  id: "S11", titre: "Provisions et dépréciations", court: "Provisions et dépréciations", ico: "shield-check", col: "#BE123C", duree: "45 min",
  resume: "La prudence en pratique : provisions pour risques et charges, créances douteuses et leur dépréciation, pertes sur créances, reprises, dépréciation des stocks et des immobilisations.",
  blocs: [
    { type: "essentiel", texte: "Le principe de **prudence** impose de constater les **pertes probables** à la clôture. Une **provision pour risques et charges** couvre une **dette probable** au montant incertain (un litige, une garantie) : débit **6911**, crédit **19** (191 Provisions pour litiges) si le risque dépasse un an, ou **499** s'il est à court terme. Une **dépréciation** constate la **perte de valeur d'un actif** : une **créance douteuse** (débit **6594**, crédit **491**, calculée sur le **montant hors taxes**), un **stock** (6593 / 391), une immobilisation (6914 / 29). Quand le risque disparaît, on **reprend** la provision ou la dépréciation (crédit **791** ou **7594**). Quand la perte devient **définitive**, on solde la créance en **pertes sur créances (651)** et l'on récupère la TVA." },
    { type: "schema", kind: "journal", titre: "Le client MAMA NZINGA ne paie plus : créance de 1 160 000 FC TTC", ecritures: [
      { date: "31/12/N", libelle: "Reclassement en créance douteuse", lignes: [
        { c: "416", l: "Créances clients litigieuses ou douteuses", d: 1160000 }, { c: "411", l: "Clients", cr: 1160000 }] },
      { date: "31/12/N", libelle: "Dépréciation de 40 % du montant hors taxes (1 000 000 FC)", lignes: [
        { c: "6594", l: "Charges pour dépréciations sur créances", d: 400000 }, { c: "491", l: "Dépréciations des comptes clients", cr: 400000 }] },
    ] },
    { type: "schema", kind: "journal", titre: "En N+1, le client est déclaré insolvable : perte définitive", ecritures: [
      { date: "15/06/N+1", libelle: "Perte sur créance et régularisation de la TVA", lignes: [
        { c: "651", l: "Pertes sur créances clients", d: 1000000 }, { c: "4431", l: "TVA facturée sur ventes", d: 160000 },
        { c: "416", l: "Créances clients litigieuses ou douteuses", cr: 1160000 }] },
      { date: "15/06/N+1", libelle: "Reprise de la dépréciation devenue sans objet", lignes: [
        { c: "491", l: "Dépréciations des comptes clients", d: 400000 }, { c: "7594", l: "Reprises de dépréciations sur créances", cr: 400000 }] },
    ] },
    { type: "schema", kind: "journal", titre: "Provision pour litige", ecritures: [
      { date: "31/12/N", libelle: "Un ancien salarié réclame 2 000 000 FC ; l'avocat estime la condamnation probable", lignes: [
        { c: "6911", l: "Dotations aux provisions d'exploitation pour risques et charges", d: 2000000 }, { c: "191", l: "Provisions pour litiges", cr: 2000000 }] },
      { date: "30/09/N+1", libelle: "Le tribunal rejette la demande : reprise de la provision", lignes: [
        { c: "191", l: "Provisions pour litiges", d: 2000000 }, { c: "791", l: "Reprises de provisions et dépréciations d'exploitation", cr: 2000000 }] },
    ] },
    { type: "schema", kind: "tableau", titre: "Provision ou dépréciation ?", entetes: ["", "Provision pour risques et charges", "Dépréciation"], lignes: [
      ["Ce qu'elle couvre", "Une dette probable (litige, garantie, amende)", "Une perte de valeur d'un actif (créance, stock, immobilisation)"],
      ["Où au bilan", "Au passif (19, ou 499 à court terme)", "En diminution de l'actif (29, 39, 49)"],
      ["Dotation", "6911 (ou 659 à court terme)", "6594 créances, 6593 stocks, 6914 immobilisations"],
      ["Reprise", "791", "7594, 7593, 791"],
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : provisionner « au cas où »", situation: "L'activité a été très bonne. Le gérant veut constituer une « provision pour mauvais jours » de 10 000 000 FC, sans risque identifié, pour lisser le bénéfice.", options: [
      { l: "Constituer la provision", pour: "Bénéfice et impôt plus faibles cette année.", contre: "Interdit : une provision exige un risque précis, né avant la clôture ; c'est une réserve déguisée." },
      { l: "Ne provisionner que les risques identifiés et chiffrés", pour: "Comptes sincères, provisions défendables en cas de contrôle.", contre: "Bénéfice plus élevé cette année." },
    ], question: "Quelles conditions faut-il réunir pour constituer une provision ?", piste: "Un risque précis (objet connu), né d'un événement survenu avant la clôture, rendant probable une sortie de ressources, dont le montant peut être estimé de façon fiable." },
    { type: "pieges", puces: [
      "Calculer la dépréciation d'une créance sur le TTC : la TVA sera récupérée en cas de perte, on déprécie le hors taxes.",
      "Oublier la reprise quand le risque disparaît : la provision resterait au bilan sans objet.",
      "Confondre provision (passif) et dépréciation (diminution d'un actif).",
      "Provisionner sans risque identifié pour « lisser » le résultat : c'est interdit.",
    ] },
    { type: "articles", refs: [AUDCIF + " : prudence, provisions pour risques et charges, dépréciations des actifs.", "Guide d'application du SYSCOHADA révisé : comptes 19, 416, 491, 499, 651, 659, 691, 7594 et 791."] },
  ],
  narration: [
    "Ce module met en pratique le principe de prudence.",
    "Une provision pour risques et charges couvre une dette probable dont le montant est incertain, comme un litige : débit 6911, crédit 191.",
    "Une dépréciation constate la perte de valeur d'un actif. Pour un client douteux, on reclasse d'abord la créance au compte 416, puis on déprécie le montant hors taxes : débit 6594, crédit 491.",
    "Si le client devient définitivement insolvable, on passe la perte au compte 651, on récupère la TVA, et l'on reprend la dépréciation devenue sans objet.",
    "Quand un risque disparaît, la provision est reprise au compte 791. Et l'on ne constitue jamais de provision sans risque précis, pour lisser le résultat.",
  ],
  qcm: [
    { q: "Une provision pour risques et charges couvre :", r: ["Une dette probable dont le montant est incertain", "Une créance certaine", "Un achat de stock", "Un bénéfice futur"], b: 0, e: "Exemple : un litige en cours." },
    { q: "La provision pour un litige à plus d'un an se passe :", r: ["Débit 6911, crédit 191", "Débit 191, crédit 6911", "Débit 6594, crédit 491", "Débit 651, crédit 411"], b: 0, e: "Elle figure au passif." },
    { q: "Une créance douteuse est d'abord reclassée :", r: ["Du 411 au 416", "Du 416 au 411", "Du 411 au 491", "Du 401 au 416"], b: 0, e: "416 Créances clients litigieuses ou douteuses." },
    { q: "La dépréciation d'une créance se calcule sur :", r: ["Le montant hors taxes", "Le montant TTC", "La TVA seulement", "Le chiffre d'affaires annuel"], b: 0, e: "La TVA sera récupérée si la créance est perdue." },
    { q: "Créance de 1 160 000 FC TTC (1 000 000 FC HT), risque 40 %. Dépréciation ?", r: ["400 000 FC", "464 000 FC", "160 000 FC", "1 000 000 FC"], b: 0, e: "40 % de 1 000 000 FC." },
    { q: "La dépréciation d'une créance client se passe :", r: ["Débit 6594, crédit 491", "Débit 491, crédit 6594", "Débit 6911, crédit 191", "Débit 651, crédit 416"], b: 0, e: "Charge pour dépréciation sur créances." },
    { q: "Quand une créance est définitivement perdue, on débite :", r: ["651 pour le HT et 4431 pour la TVA", "411 pour le TTC", "6594 pour le TTC", "701 pour le HT"], b: 0, e: "On solde le 416." },
    { q: "La reprise d'une dépréciation de créance devenue sans objet se crédite au :", r: ["7594", "6594", "491", "651"], b: 0, e: "Reprise de charge pour dépréciation sur créances." },
    { q: "La reprise d'une provision pour litige devenue sans objet se passe :", r: ["Débit 191, crédit 791", "Débit 791, crédit 191", "Débit 6911, crédit 191", "Débit 191, crédit 521"], b: 0, e: "Le risque a disparu." },
    { q: "Une provision figure au bilan :", r: ["Au passif", "En diminution de l'actif", "En trésorerie", "En stock"], b: 0, e: "Comptes 19 (ou 499)." },
    { q: "Une dépréciation figure au bilan :", r: ["En diminution de l'actif concerné", "Au passif", "En capitaux propres", "En produits"], b: 0, e: "Comptes 29, 39, 49." },
    { q: "Dans le module des provisions, quelle écriture déprécie des marchandises abîmées ?", r: ["Débit 6593, crédit 391", "Débit 6594, crédit 491", "Débit 391, crédit 6593", "Débit 6031, crédit 31"], b: 0, e: "Charge pour dépréciation sur stocks ; la reprise se fait au 7593." },
    { q: "Peut-on constituer une « provision pour mauvais jours » sans risque identifié ?", r: ["Non, une provision exige un risque précis et probable", "Oui, si le bénéfice est élevé", "Oui, dans la limite de 10 %", "Oui, avec l'accord du gérant"], b: 0, e: "Ce serait une réserve déguisée." },
    { q: "Sur quel principe reposent les provisions et dépréciations ?", r: ["La prudence", "Le coût historique", "La permanence des méthodes", "L'intangibilité du bilan d'ouverture"], b: 0, e: "On constate les pertes probables." },
    { q: "Un risque de litige estimé à court terme (moins d'un an) se provisionne au :", r: ["499 Provisions pour risques à court terme", "191 seulement", "491", "391"], b: 0, e: "Classement selon l'échéance du risque." },
  ],
};

const S12 = {
  id: "S12", titre: "Clôture : régularisations, états financiers et affectation du résultat", court: "La clôture", ico: "clipboard-list", col: "#0A2A5C", duree: "55 min",
  resume: "Les travaux d'inventaire, les charges et produits constatés d'avance, à payer et à recevoir, l'impôt, les états financiers, leur approbation et l'affectation du résultat (réserve légale, dividendes, report à nouveau).",
  blocs: [
    { type: "essentiel", texte: "À la clôture, on applique l'**indépendance des exercices** : chaque exercice garde **ses** charges et **ses** produits. Une charge payée d'avance pour l'exercice suivant est retirée (**476 Charges constatées d'avance**) ; un produit encaissé d'avance aussi (**477**). Une charge de l'exercice non encore facturée est ajoutée (**408 Fournisseurs, factures non parvenues**, ou 4281 congés à payer…) ; un produit acquis non encore facturé aussi (**418 Clients, produits à recevoir**). Ces écritures sont **contrepassées** au début de l'exercice suivant. On passe ensuite les amortissements, les dépréciations, les stocks et l'**impôt** (débit **891**, crédit **441**), puis on établit les **états financiers**. L'assemblée générale les **approuve dans les 6 mois** et décide de l'**affectation** du bénéfice : **réserve légale** (1/10 du bénéfice jusqu'à 1/5 du capital), **dividendes** (465), **report à nouveau** (121)." },
    { type: "schema", kind: "journal", titre: "Régularisations au 31/12/N", ecritures: [
      { date: "31/12/N", libelle: "Assurance de 1 200 000 FC payée le 1er octobre pour 12 mois : 9 mois concernent N+1", lignes: [
        { c: "476", l: "Charges constatées d'avance", d: 900000 }, { c: "625", l: "Primes d'assurance", cr: 900000 }] },
      { date: "31/12/N", libelle: "Électricité de décembre (SNEL) non encore facturée : 350 000 FC HT", lignes: [
        { c: "6052", l: "Fournitures non stockables, électricité", d: 350000 }, { c: "4452", l: "TVA récupérable sur achats", d: 56000 },
        { c: "408", l: "Fournisseurs, factures non parvenues", cr: 406000 }] },
      { date: "31/12/N", libelle: "Livraison de décembre à facturer en janvier : 800 000 FC HT", lignes: [
        { c: "418", l: "Clients, produits à recevoir", d: 928000 }, { c: "701", l: "Ventes de marchandises", cr: 800000 }, { c: "4431", l: "TVA facturée sur ventes", cr: 128000 }] },
      { date: "31/12/N", libelle: "Loyer de janvier N+1 encaissé d'avance : 500 000 FC", lignes: [
        { c: "706", l: "Services vendus", d: 500000 }, { c: "477", l: "Produits constatés d'avance", cr: 500000 }] },
    ] },
    { type: "schema", kind: "flux", titre: "Les travaux de fin d'exercice", etapes: [
      { op: "1", l: "Inventaire physique et rapprochements", d: "Stocks comptés, rapprochement bancaire, caisse, confirmation des soldes clients et fournisseurs." },
      { op: "2", l: "Écritures d'inventaire", d: "Amortissements, dépréciations, provisions, variation des stocks, régularisations." },
      { op: "3", l: "Impôt sur le résultat", d: "Débit 891, crédit 441 (30 % du bénéfice imposable, minimum 1 % du chiffre d'affaires)." },
      { op: "4", l: "Balance après inventaire et états financiers", d: "Bilan, compte de résultat, TFT et notes annexes (système normal)." },
      { op: "5", l: "Approbation et dépôt", d: "Assemblée générale dans les 6 mois ; dépôt au RCCM dans le mois qui suit.", fort: true },
    ] },
    { type: "schema", kind: "tableau", titre: "Affectation du bénéfice de 4 200 000 FC (capital 10 000 000 FC, aucune réserve légale)", entetes: ["Affectation", "Calcul", "Montant (FC)"], lignes: [
      ["Réserve légale", "4 200 000 × 1/10 (plafond : 1/5 du capital = 2 000 000)", "420 000"],
      ["Dividendes votés", "Décision de l'assemblée", "3 000 000"],
      ["Report à nouveau", "Le solde", "780 000"],
      ["Total", "", "4 200 000"],
    ] },
    { type: "schema", kind: "journal", titre: "Affectation décidée par l'assemblée générale", ecritures: [
      { date: "30/04/N+1", libelle: "Affectation du résultat de l'exercice N", lignes: [
        { c: "131", l: "Résultat net : bénéfice", d: 4200000 }, { c: "111", l: "Réserve légale", cr: 420000 },
        { c: "465", l: "Associés, dividendes à payer", cr: 3000000 }, { c: "121", l: "Report à nouveau créditeur", cr: 780000 }] },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : distribuer tout le bénéfice", situation: "Les associés de BOMA SARL veulent se partager la totalité du bénéfice de 4 200 000 FC en dividendes, sans réserve légale, car « l'entreprise a assez de trésorerie ».", options: [
      { l: "Tout distribuer", pour: "Les associés touchent davantage tout de suite.", contre: "Contraire à l'AUSCGIE : la dotation à la réserve légale est obligatoire ; décision irrégulière." },
      { l: "Doter d'abord la réserve légale, puis distribuer", pour: "Respect de la loi ; les capitaux propres protègent les créanciers.", contre: "Dividende un peu plus faible." },
    ], question: "Jusqu'à quand doit-on doter la réserve légale ?", piste: "Chaque année, 1/10 du bénéfice (diminué des pertes antérieures), jusqu'à ce que la réserve atteigne 1/5 du capital social." },
    { type: "pieges", puces: [
      "Utiliser le taux français de 5 % pour la réserve légale : en droit OHADA, c'est 1/10 du bénéfice jusqu'à 1/5 du capital.",
      "Oublier de contrepasser les charges et produits constatés d'avance au début de l'exercice suivant.",
      "Calculer la réserve légale sans déduire d'abord les pertes antérieures (report à nouveau débiteur).",
      "Parler du TAFIRE : depuis 2017, le système normal présente un tableau des flux de trésorerie.",
    ] },
    { type: "articles", refs: [AUDCIF + " : travaux d'inventaire, états financiers annuels.", "AUSCGIE : approbation des comptes dans les 6 mois, réserve légale (1/10 du bénéfice jusqu'à 1/5 du capital), dépôt au RCCM."] },
  ],
  narration: [
    "Ce dernier module traite de la clôture de l'exercice.",
    "Chaque exercice doit garder ses propres charges et ses propres produits. Une assurance payée d'avance pour l'année suivante est retirée des charges, au compte 476. Un produit encaissé d'avance est retiré des produits, au compte 477.",
    "À l'inverse, une charge de l'exercice non encore facturée est ajoutée, au compte 408 ; un produit acquis non encore facturé est constaté, au compte 418.",
    "On passe ensuite les amortissements, les dépréciations, la variation des stocks et l'impôt, puis on établit les états financiers.",
    "L'assemblée générale les approuve dans les six mois. Elle affecte le bénéfice : d'abord la réserve légale, un dixième du bénéfice jusqu'à un cinquième du capital, puis les dividendes et le report à nouveau.",
    "Bravo : vous avez parcouru les fondamentaux du SYSCOHADA révisé. Place à l'exercice « Quel compte ? », puis à l'examen final.",
  ],
  qcm: [
    { q: "Une assurance payée le 1er octobre pour 12 mois (1 200 000 FC) : quelle part constater d'avance au 31/12 ?", r: ["900 000 FC", "300 000 FC", "1 200 000 FC", "0"], b: 0, e: "9 mois sur 12 concernent l'exercice suivant." },
    { q: "Les charges constatées d'avance s'enregistrent au débit du :", r: ["476", "477", "408", "418"], b: 0, e: "Elles sont retirées des charges de l'exercice." },
    { q: "Les produits constatés d'avance s'enregistrent au crédit du :", r: ["477", "476", "418", "408"], b: 0, e: "Le produit sera rattaché à l'exercice suivant." },
    { q: "Une facture d'électricité de décembre non encore reçue se crédite au :", r: ["408 Fournisseurs, factures non parvenues", "401 Fournisseurs", "418", "476"], b: 0, e: "Charge à payer." },
    { q: "Une livraison de décembre facturée en janvier se débite au :", r: ["418 Clients, produits à recevoir", "411 Clients", "477", "408"], b: 0, e: "Produit à recevoir." },
    { q: "Que fait-on des écritures de régularisation au début de l'exercice suivant ?", r: ["On les contrepasse", "On les supprime du bilan de clôture", "On les double", "Rien"], b: 0, e: "Pour ne pas compter deux fois la charge ou le produit." },
    { q: "Quel principe justifie les régularisations ?", r: ["L'indépendance des exercices", "La prudence uniquement", "Le coût historique", "La non-compensation"], b: 0, e: "Chaque exercice supporte ses propres charges et produits." },
    { q: "L'impôt sur le résultat se constate :", r: ["Débit 891, crédit 441", "Débit 441, crédit 891", "Débit 641, crédit 441", "Débit 131, crédit 521"], b: 0, e: "Charge de l'exercice et dette envers l'État." },
    { q: "Dans quel délai l'assemblée générale approuve-t-elle les comptes ?", r: ["6 mois après la clôture", "1 mois après la clôture", "12 mois après la clôture", "Aucun délai"], b: 0, e: "AUSCGIE." },
    { q: "Quel est le taux de dotation de la réserve légale en droit OHADA ?", r: ["1/10 du bénéfice, jusqu'à 1/5 du capital", "5 % du bénéfice", "1/20 du bénéfice sans plafond", "20 % du capital chaque année"], b: 0, e: "Le taux de 5 % est celui du droit français." },
    { q: "Bénéfice 4 200 000 FC, capital 10 000 000 FC, réserve légale nulle. Dotation ?", r: ["420 000 FC", "210 000 FC", "2 000 000 FC", "840 000 FC"], b: 0, e: "1/10 du bénéfice, sous le plafond de 2 000 000 FC." },
    { q: "Les dividendes votés et non encore payés sont crédités au :", r: ["465 Associés, dividendes à payer", "101 Capital", "121 Report à nouveau", "521 Banques"], b: 0, e: "C'est une dette envers les associés." },
    { q: "Le solde non distribué et non mis en réserve va au :", r: ["121 Report à nouveau créditeur", "111 Réserve légale", "131 Résultat", "465 Dividendes"], b: 0, e: "Il reste à la disposition de l'assemblée suivante." },
    { q: "Quels états financiers présente une entité du système normal ?", r: ["Bilan, compte de résultat, tableau des flux de trésorerie et notes annexes", "Bilan, compte de résultat et TAFIRE", "Bilan seulement", "Balance et grand livre"], b: 0, e: "Le TAFIRE n'existe plus depuis 2017." },
    { q: "L'écriture d'affectation débite :", r: ["Le compte 131 Résultat net : bénéfice", "Le compte 111 Réserve légale", "Le compte 465 Dividendes", "Le compte 521 Banques"], b: 0, e: "Le résultat est soldé et réparti." },
  ],
};

export const MODULES_SYS1_C = [S9, S10, S11, S12];
