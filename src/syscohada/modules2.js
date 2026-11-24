// ══════════════════ SYSCOHADA RÉVISÉ · NIVEAU 1 : MODULES 5 À 8 ══════════════════
// Achats et ventes, TVA, règlements et effets de commerce, stocks.
import { AUDCIF } from "./modules1";

const S5 = {
  id: "S5", titre: "Achats, ventes, réductions et factures d'avoir", court: "Achats et ventes", ico: "shopping-cart", col: "#B45309", duree: "50 min",
  resume: "La facture de doit, les réductions commerciales (rabais, remise, ristourne) et financières (escompte), les factures d'avoir, les frais accessoires, les avances et acomptes.",
  blocs: [
    { type: "essentiel", texte: "Une facture part du **prix brut**, retranche les **réductions commerciales** (**rabais** pour un défaut, **remise** pour la quantité ou le statut du client, **ristourne** sur le chiffre d'affaires d'une période) pour obtenir le **net commercial**, puis l'**escompte de règlement** (réduction **financière** pour paiement rapide) pour obtenir le **net financier**. La **TVA** se calcule sur ce net. Les réductions commerciales **figurant sur la facture** ne s'enregistrent pas : on passe directement le net commercial en achat (**601**) ou en vente (**701**). L'escompte, lui, s'enregistre toujours : **773 Escomptes obtenus** chez l'acheteur, **673 Escomptes accordés** chez le vendeur. Une réduction accordée **après** la facture fait l'objet d'une **facture d'avoir**." },
    { type: "schema", kind: "tableau", titre: "Facture n° 245 de LUALABA FOURNITURES à MBOKA SARL", entetes: ["Élément", "Calcul", "Montant (FC)"], lignes: [
      ["Prix brut", "500 articles × 10 000 FC", "5 000 000"],
      ["Remise 10 %", "5 000 000 × 10 %", "− 500 000"],
      ["Net commercial", "", "4 500 000"],
      ["Escompte de règlement 2 % (paiement sous 10 jours)", "4 500 000 × 2 %", "− 90 000"],
      ["Net financier (base de la TVA)", "", "4 410 000"],
      ["TVA 16 %", "4 410 000 × 16 %", "705 600"],
      ["Net à payer TTC", "", "5 115 600"],
    ] },
    { type: "schema", kind: "journal", titre: "La même facture chez l'acheteur et chez le vendeur", ecritures: [
      { date: "10/03", libelle: "Chez MBOKA SARL (acheteur) : facture n° 245", lignes: [
        { c: "601", l: "Achats de marchandises", d: 4500000 }, { c: "4452", l: "TVA récupérable sur achats", d: 705600 },
        { c: "773", l: "Escomptes obtenus", cr: 90000 }, { c: "401", l: "Fournisseurs", cr: 5115600 }] },
      { date: "10/03", libelle: "Chez LUALABA FOURNITURES (vendeur) : facture n° 245", lignes: [
        { c: "411", l: "Clients", d: 5115600 }, { c: "673", l: "Escomptes accordés", d: 90000 },
        { c: "701", l: "Ventes de marchandises", cr: 4500000 }, { c: "4431", l: "TVA facturée sur ventes", cr: 705600 }] },
    ] },
    { type: "schema", kind: "journal", titre: "Facture d'avoir : rabais de 200 000 FC HT pour des articles abîmés", ecritures: [
      { date: "18/03", libelle: "Chez l'acheteur : avoir reçu", lignes: [
        { c: "401", l: "Fournisseurs", d: 232000 }, { c: "6019", l: "Rabais, remises et ristournes obtenus", cr: 200000 }, { c: "4452", l: "TVA récupérable sur achats", cr: 32000 }] },
      { date: "18/03", libelle: "Chez le vendeur : avoir émis", lignes: [
        { c: "7019", l: "Rabais, remises et ristournes accordés", d: 200000 }, { c: "4431", l: "TVA facturée sur ventes", d: 32000 }, { c: "411", l: "Clients", cr: 232000 }] },
    ] },
    { type: "schema", kind: "cartes", titre: "Autres situations courantes", cartes: [
      { ico: "truck", t: "Frais accessoires d'achat", d: "Transport, droits de douane, assurance liés à l'achat : ils augmentent le coût d'achat (6015 Frais sur achats, ou compte d'achat)." },
      { ico: "package", t: "Port facturé au client", d: "Le vendeur qui refacture le transport le crédite au 7071 Ports, emballages perdus et autres frais facturés." },
      { ico: "cash", t: "Acompte versé à un fournisseur", d: "Débit 4091 Fournisseurs, avances et acomptes versés ; il s'impute ensuite sur la facture." },
      { ico: "coin", t: "Acompte reçu d'un client", d: "Crédit 4191 Clients, avances et acomptes reçus : c'est une dette tant que la livraison n'a pas eu lieu." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : enregistrer la remise ?", situation: "Un stagiaire veut enregistrer la remise de 500 000 FC de la facture n° 245 au crédit d'un compte de réductions obtenues, en passant l'achat pour 5 000 000 FC.", options: [
      { l: "Passer le brut et la remise séparément", pour: "On garde la trace du prix catalogue.", contre: "Contraire au SYSCOHADA : les réductions commerciales sur facture ne s'enregistrent pas ; l'achat se passe au net commercial." },
      { l: "Passer l'achat au net commercial (4 500 000 FC)", pour: "Règle du SYSCOHADA ; le coût d'achat est le prix réellement convenu.", contre: "Le prix brut n'apparaît que sur la facture." },
    ], question: "Quelle réduction s'enregistre toujours, même sur la facture ?", piste: "L'escompte de règlement : c'est une réduction financière, enregistrée en produit financier (773) chez l'acheteur et en charge financière (673) chez le vendeur." },
    { type: "pieges", puces: [
      "Calculer la TVA sur le prix brut : elle se calcule sur le net (après remises et escompte).",
      "Classer l'escompte en réduction commerciale : c'est une réduction financière (673 ou 773).",
      "Oublier de régulariser la TVA dans une facture d'avoir : l'avoir réduit aussi la TVA récupérable (acheteur) ou facturée (vendeur).",
      "Passer une avance reçue d'un client en produit : c'est une dette (4191) tant que le bien n'est pas livré.",
    ] },
    { type: "articles", refs: [AUDCIF + " : fonctionnement des comptes 401, 411, 601, 701, 673 et 773.", "Code de la TVA de la RDC : base imposable nette des réductions accordées."] },
  ],
  narration: [
    "Ce module traite des achats, des ventes et des réductions.",
    "Une facture part du prix brut. On retranche les réductions commerciales : le rabais, pour un défaut ; la remise, pour la quantité ; la ristourne, sur le chiffre d'affaires d'une période. On obtient le net commercial.",
    "On retranche ensuite l'escompte de règlement, accordé pour un paiement rapide. C'est une réduction financière. On obtient le net financier, sur lequel on calcule la TVA.",
    "Les réductions commerciales portées sur la facture ne s'enregistrent pas : l'achat et la vente se passent au net commercial. L'escompte, lui, s'enregistre toujours : en produit financier 773 chez l'acheteur, en charge financière 673 chez le vendeur.",
    "Une réduction accordée après la facture fait l'objet d'une facture d'avoir, qui corrige aussi la TVA.",
  ],
  qcm: [
    { q: "Un rabais est accordé pour :", r: ["Un défaut de qualité ou un retard de livraison", "Un paiement rapide", "Un gros volume annuel", "Un client fidèle depuis 10 ans"], b: 0, e: "La remise récompense la quantité ; la ristourne, le chiffre d'affaires d'une période." },
    { q: "Une ristourne est calculée :", r: ["Sur le chiffre d'affaires réalisé sur une période", "Sur un défaut de qualité", "Sur un paiement comptant", "Sur la TVA"], b: 0, e: "Elle est souvent accordée en fin d'année." },
    { q: "L'escompte de règlement est une réduction :", r: ["Financière", "Commerciale", "Fiscale", "Sociale"], b: 0, e: "Il rémunère un paiement anticipé." },
    { q: "Chez l'acheteur, l'escompte obtenu s'enregistre au crédit du compte :", r: ["773", "673", "6019", "4452"], b: 0, e: "773 Escomptes obtenus : produit financier." },
    { q: "Chez le vendeur, l'escompte accordé s'enregistre au débit du compte :", r: ["673", "773", "675", "7019"], b: 0, e: "673 Escomptes accordés : charge financière." },
    { q: "Une remise figurant sur la facture d'achat :", r: ["Ne s'enregistre pas : l'achat est passé au net commercial", "S'enregistre au crédit du 6019", "S'enregistre au débit du 673", "S'enregistre en produit exceptionnel"], b: 0, e: "Seules les réductions hors facture passent par un avoir." },
    { q: "Brut 5 000 000 FC, remise 10 %, escompte 2 %. Net financier ?", r: ["4 410 000 FC", "4 500 000 FC", "4 400 000 FC", "4 900 000 FC"], b: 0, e: "4 500 000 × 0,98 = 4 410 000 FC." },
    { q: "Sur quelle base calcule-t-on la TVA de cette facture ?", r: ["Sur le net financier", "Sur le prix brut", "Sur le net commercial avant escompte", "Sur le TTC"], b: 0, e: "4 410 000 × 16 % = 705 600 FC." },
    { q: "Un avoir de 200 000 FC HT reçu d'un fournisseur se passe chez l'acheteur :", r: ["Débit 401 232 000 ; crédit 6019 200 000 et 4452 32 000", "Débit 6019 ; crédit 401", "Débit 601 ; crédit 401", "Débit 401 ; crédit 701"], b: 0, e: "Il réduit la dette, les achats et la TVA récupérable." },
    { q: "Chez le vendeur, l'avoir accordé diminue :", r: ["Les ventes, la TVA facturée et la créance client", "Les achats", "La trésorerie immédiatement", "Le capital"], b: 0, e: "Débit 7019 et 4431, crédit 411." },
    { q: "Le transport refacturé au client par le vendeur se crédite au :", r: ["7071", "612", "601", "6015"], b: 0, e: "7071 Ports, emballages perdus et autres frais facturés." },
    { q: "Les frais de transport supportés pour un achat de marchandises :", r: ["Augmentent le coût d'achat", "Sont un produit", "Sont une immobilisation", "Ne s'enregistrent pas"], b: 0, e: "Frais accessoires d'achat (6015)." },
    { q: "Un acompte versé à un fournisseur avant livraison se débite au :", r: ["4091", "401", "601", "4191"], b: 0, e: "C'est une créance sur le fournisseur." },
    { q: "Un acompte reçu d'un client avant livraison est :", r: ["Une dette, compte 4191", "Un produit, compte 701", "Une créance, compte 411", "Un capital, compte 101"], b: 0, e: "Il devient une vente à la livraison." },
    { q: "Vente de 4 500 000 FC HT avec escompte 90 000 FC et TVA 705 600 FC. Montant au débit du 411 ?", r: ["5 115 600 FC", "5 205 600 FC", "4 500 000 FC", "5 220 000 FC"], b: 0, e: "4 410 000 + 705 600 = 5 115 600 FC." },
  ],
};

const S6 = {
  id: "S6", titre: "La TVA : comptes et liquidation mensuelle", court: "La TVA", ico: "receipt-tax", col: "#A3122A", duree: "45 min",
  resume: "Le mécanisme de la TVA à 16 %, les comptes de TVA facturée, récupérable, due et de crédit, la liquidation du mois et son paiement le 15 du mois suivant.",
  blocs: [
    { type: "essentiel", texte: "La **TVA** est un impôt sur la consommation, **collecté par l'entreprise pour l'État**. Elle ne touche ni les charges ni les produits : elle passe par des **comptes de tiers (classe 44)**. Sur ses ventes, l'entreprise **facture** la TVA (**443**, dont **4431** sur ventes) ; sur ses achats, elle **récupère** la TVA payée (**445** : **4451** sur immobilisations, **4452** sur achats, **4454** sur services extérieurs). Chaque mois, elle **liquide** : TVA facturée − TVA récupérable. Si le solde est positif, c'est une **TVA due** (**4441**), payée au plus tard le **15 du mois suivant** ; s'il est négatif, c'est un **crédit de TVA** (**4449**), reporté sur le mois suivant. En RDC, le taux normal est de **16 %**." },
    { type: "schema", kind: "tableau", titre: "Les comptes de TVA", entetes: ["Compte", "Intitulé", "Mouvement"], lignes: [
      ["4431", "TVA facturée sur ventes", "Crédité à chaque vente"],
      ["4451", "TVA récupérable sur immobilisations", "Débité à l'achat d'un équipement"],
      ["4452", "TVA récupérable sur achats", "Débité à l'achat de marchandises ou de fournitures"],
      ["4454", "TVA récupérable sur services extérieurs", "Débité pour le loyer, l'entretien, les honoraires…"],
      ["4441", "État, TVA due", "Crédité à la liquidation, débité au paiement"],
      ["4449", "État, crédit de TVA à reporter", "Débité quand la TVA récupérable dépasse la TVA facturée"],
    ] },
    { type: "schema", kind: "tableau", titre: "MBOKA SARL, mois de mars (en FC)", entetes: ["Opération", "HT", "TVA 16 %"], lignes: [
      ["Ventes de marchandises", "15 000 000", "2 400 000 (facturée)"],
      ["Achats de marchandises", "7 000 000", "1 120 000 (récupérable)"],
      ["Loyer et entretien (services)", "1 000 000", "160 000 (récupérable)"],
      ["TVA due du mois", "", "2 400 000 − 1 280 000 = 1 120 000"],
    ] },
    { type: "schema", kind: "journal", titre: "Liquidation de mars et paiement", ecritures: [
      { date: "31/03", libelle: "Liquidation de la TVA de mars", lignes: [
        { c: "4431", l: "TVA facturée sur ventes", d: 2400000 }, { c: "4452", l: "TVA récupérable sur achats", cr: 1120000 },
        { c: "4454", l: "TVA récupérable sur services extérieurs", cr: 160000 }, { c: "4441", l: "État, TVA due", cr: 1120000 }] },
      { date: "15/04", libelle: "Paiement de la TVA de mars", lignes: [
        { c: "4441", l: "État, TVA due", d: 1120000 }, { c: "521", l: "Banques", cr: 1120000 }] },
    ] },
    { type: "schema", kind: "journal", titre: "Et si la TVA récupérable dépasse la TVA facturée ?", ecritures: [
      { date: "30/04", libelle: "Avril : TVA facturée 900 000 FC, récupérable 1 300 000 FC", lignes: [
        { c: "4431", l: "TVA facturée sur ventes", d: 900000 }, { c: "4449", l: "État, crédit de TVA à reporter", d: 400000 },
        { c: "4452", l: "TVA récupérable sur achats", cr: 1300000 }] },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : la facture sans mentions", situation: "MBOKA SARL reçoit une facture de 3 480 000 FC TTC d'un fournisseur, sans numéro d'impôt du fournisseur ni facture normalisée. Le comptable veut récupérer les 480 000 FC de TVA.", options: [
      { l: "Récupérer la TVA quand même", pour: "Économie immédiate de 480 000 FC.", contre: "En cas de contrôle, la déduction est rejetée, avec pénalités." },
      { l: "Exiger une facture conforme avant de déduire", pour: "Déduction sûre et justifiée.", contre: "Démarche auprès du fournisseur, délai." },
    ], question: "Pourquoi la forme de la facture compte-t-elle pour la TVA ?", piste: "La déduction de la TVA exige une facture régulière (en RDC, la facture normalisée et les mentions obligatoires). Sans elle, la TVA payée devient une charge pour l'entreprise. Voir le parcours Fiscalité, module facture normalisée." },
    { type: "pieges", puces: [
      "Passer la TVA en charge ou en produit : elle transite uniquement par les comptes 443, 445 et 444.",
      "Utiliser le compte 44566 des manuels français : en SYSCOHADA, la TVA récupérable est au 445 (4452 sur achats).",
      "Oublier de reporter le crédit de TVA (4449) sur la liquidation du mois suivant.",
      "Payer la TVA après le 15 du mois suivant : pénalités de retard.",
    ] },
    { type: "articles", refs: [AUDCIF + " : comptes 443, 444 et 445.", "Code de la TVA de la RDC : taux de 16 %, déclaration et paiement au plus tard le 15 du mois suivant ; voir le parcours Fiscalité, module TVA en pratique."] },
  ],
  narration: [
    "Ce module explique la TVA dans les comptes.",
    "La TVA est collectée par l'entreprise pour le compte de l'État. Elle ne passe jamais en charge ni en produit, mais dans des comptes de tiers de la classe quarante-quatre.",
    "Sur les ventes, la TVA facturée est créditée au compte 4431. Sur les achats, la TVA récupérable est débitée au compte 445 : 4451 pour les immobilisations, 4452 pour les achats, 4454 pour les services extérieurs.",
    "Chaque mois, on liquide : on solde la TVA facturée et la TVA récupérable. La différence est une TVA due, au compte 4441, payée au plus tard le 15 du mois suivant ; ou un crédit de TVA, au compte 4449, reporté sur le mois suivant.",
    "En RDC, le taux normal est de seize pour cent. Et la TVA n'est récupérable que sur une facture régulière.",
  ],
  qcm: [
    { q: "Quel est le taux normal de la TVA en RDC ?", r: ["16 %", "18 %", "20 %", "10 %"], b: 0, e: "Code de la TVA." },
    { q: "La TVA facturée sur les ventes est enregistrée au :", r: ["4431", "4452", "4441", "44566"], b: 0, e: "443 : État, TVA facturée." },
    { q: "La TVA récupérable sur les achats de marchandises est enregistrée au :", r: ["4452", "4431", "44566", "4441"], b: 0, e: "445 : État, TVA récupérable ; 44566 est un compte du plan français." },
    { q: "La TVA payée sur l'achat d'un ordinateur pour le bureau se débite au :", r: ["4451", "4452", "4454", "4431"], b: 0, e: "TVA récupérable sur immobilisations." },
    { q: "La TVA payée sur le loyer du bureau se débite au :", r: ["4454", "4451", "4431", "4449"], b: 0, e: "TVA récupérable sur services extérieurs." },
    { q: "La TVA due du mois est égale à :", r: ["TVA facturée − TVA récupérable", "TVA récupérable − TVA facturée", "TVA facturée + TVA récupérable", "Chiffre d'affaires × 16 %"], b: 0, e: "Si le résultat est négatif, c'est un crédit de TVA." },
    { q: "TVA facturée 2 400 000 FC, récupérable 1 280 000 FC. TVA due ?", r: ["1 120 000 FC", "3 680 000 FC", "1 280 000 FC", "2 400 000 FC"], b: 0, e: "2 400 000 − 1 280 000 = 1 120 000 FC." },
    { q: "La TVA due est enregistrée au crédit du :", r: ["4441", "4449", "4452", "521"], b: 0, e: "État, TVA due." },
    { q: "Un crédit de TVA à reporter est enregistré au débit du :", r: ["4449", "4441", "4431", "773"], b: 0, e: "Il s'impute sur la TVA due des mois suivants." },
    { q: "Au plus tard quand paie-t-on la TVA du mois en RDC ?", r: ["Le 15 du mois suivant", "Le 30 du mois suivant", "Le dernier jour du trimestre", "À la fin de l'année"], b: 0, e: "Déclaration et paiement le 15 du mois suivant." },
    { q: "L'écriture de paiement de la TVA due est :", r: ["Débit 4441, crédit 521", "Débit 521, crédit 4441", "Débit 4431, crédit 521", "Débit 641, crédit 521"], b: 0, e: "On solde la dette envers l'État." },
    { q: "La TVA est-elle une charge de l'entreprise ?", r: ["Non, elle transite par des comptes de tiers", "Oui, toujours", "Oui, au compte 641", "Seulement pour les petites entreprises"], b: 0, e: "Sauf si elle n'est pas récupérable (facture irrégulière, exclusion)." },
    { q: "Une vente de 15 000 000 FC HT génère une TVA facturée de :", r: ["2 400 000 FC", "1 500 000 FC", "2 700 000 FC", "1 600 000 FC"], b: 0, e: "15 000 000 × 16 %." },
    { q: "Avril : TVA facturée 900 000 FC, récupérable 1 300 000 FC. Que constate-t-on ?", r: ["Un crédit de TVA de 400 000 FC au 4449", "Une TVA due de 400 000 FC", "Une TVA due de 2 200 000 FC", "Rien"], b: 0, e: "La TVA récupérable dépasse la TVA facturée." },
    { q: "Peut-on récupérer la TVA d'une facture irrégulière ?", r: ["Non, la déduction serait rejetée en cas de contrôle", "Oui, toujours", "Oui, si le montant est faible", "Oui, si l'on paie comptant"], b: 0, e: "La déduction exige une facture conforme." },
  ],
};

const S7 = {
  id: "S7", titre: "Règlements et effets de commerce", court: "Règlements et effets", ico: "file-dollar", col: "#0369A1", duree: "50 min",
  resume: "Payer et encaisser par caisse, chèque, virement ou Mobile Money, les virements internes, la lettre de change et le billet à ordre, l'encaissement et l'escompte des effets.",
  blocs: [
    { type: "essentiel", texte: "Un règlement **solde une dette ou une créance** : on débite le fournisseur (**401**) ou on crédite le client (**411**), en contrepartie de la **trésorerie** (**521** Banques, **571** Caisse). Les **transferts entre deux comptes de trésorerie** (retrait en banque pour la caisse) passent par le **585 Virements de fonds**. Un **effet de commerce** est une promesse de paiement à une date : la **lettre de change** (tirée par le créancier sur son débiteur) et le **billet à ordre** (souscrit par le débiteur). Chez le fournisseur, la créance devient un **effet à recevoir (412)** ; chez le client, la dette devient un **effet à payer (402)**. Avant l'échéance, l'effet peut être **remis à l'encaissement (512)** ou **escompté** à la banque, qui avance les fonds moins des **agios** (**675**)." },
    { type: "schema", kind: "journal", titre: "Règlements courants", ecritures: [
      { date: "02/05", libelle: "Retrait de 500 000 FC à la banque pour la caisse (passage par le 585)", lignes: [
        { c: "585", l: "Virements de fonds", d: 500000 }, { c: "521", l: "Banques", cr: 500000 }] },
      { date: "02/05", libelle: "Entrée en caisse des 500 000 FC", lignes: [
        { c: "571", l: "Caisse", d: 500000 }, { c: "585", l: "Virements de fonds", cr: 500000 }] },
      { date: "08/05", libelle: "Paiement d'un fournisseur par virement", lignes: [
        { c: "401", l: "Fournisseurs", d: 2320000 }, { c: "521", l: "Banques", cr: 2320000 }] },
      { date: "31/05", libelle: "Frais de tenue de compte prélevés par la banque", lignes: [
        { c: "631", l: "Frais bancaires", d: 25000 }, { c: "521", l: "Banques", cr: 25000 }] },
    ] },
    { type: "schema", kind: "cartes", titre: "Lettre de change ou billet à ordre ?", cartes: [
      { ico: "writing-sign", t: "Lettre de change (traite)", d: "Le créancier (tireur) ordonne à son débiteur (tiré) de payer à une date ; le tiré l'accepte en la signant." },
      { ico: "signature", t: "Billet à ordre", d: "Le débiteur (souscripteur) promet lui-même de payer son créancier à une date." },
      { ico: "calendar-due", t: "Échéance", d: "Date de paiement ; l'effet peut circuler (endossement) ou être escompté avant." },
    ] },
    { type: "schema", kind: "journal", titre: "Une traite de 3 000 000 FC, du tirage à l'escompte", ecritures: [
      { date: "01/06", libelle: "Chez le fournisseur : traite acceptée par le client", lignes: [
        { c: "412", l: "Clients, effets à recevoir", d: 3000000 }, { c: "411", l: "Clients", cr: 3000000 }] },
      { date: "01/06", libelle: "Chez le client : acceptation de la traite", lignes: [
        { c: "401", l: "Fournisseurs", d: 3000000 }, { c: "402", l: "Fournisseurs, effets à payer", cr: 3000000 }] },
      { date: "05/06", libelle: "Chez le fournisseur : effet sorti du portefeuille pour l'escompte", lignes: [
        { c: "415", l: "Clients, effets escomptés non échus", d: 3000000 }, { c: "412", l: "Clients, effets à recevoir", cr: 3000000 }] },
      { date: "05/06", libelle: "Avis d'escompte : 60 jours à 12 % (agios 60 000 FC) et commission 10 000 FC", lignes: [
        { c: "521", l: "Banques", d: 2930000 }, { c: "675", l: "Escomptes des effets de commerce", d: 60000 }, { c: "631", l: "Frais bancaires", d: 10000 },
        { c: "565", l: "Escompte de crédits ordinaires", cr: 3000000 }] },
      { date: "31/07", libelle: "À l'échéance, l'effet est payé par le client", lignes: [
        { c: "565", l: "Escompte de crédits ordinaires", d: 3000000 }, { c: "415", l: "Clients, effets escomptés non échus", cr: 3000000 }] },
    ] },
    { type: "schema", kind: "tableau", titre: "Calcul des agios d'escompte", entetes: ["Élément", "Calcul", "Montant (FC)"], lignes: [
      ["Valeur nominale", "", "3 000 000"],
      ["Escompte (intérêt)", "3 000 000 × 12 % × 60 / 360", "60 000"],
      ["Commission bancaire", "", "10 000"],
      ["Net crédité en banque", "3 000 000 − 70 000", "2 930 000"],
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : l'effet impayé", situation: "À l'échéance, le client de la traite escomptée ne paie pas. La banque débite le compte de l'entreprise de 3 000 000 FC et de 15 000 FC de frais.", options: [
      { l: "Considérer que la banque a supporté le risque", pour: "Aucune écriture à passer.", contre: "Faux : l'escompte se fait « sauf bonne fin » ; l'entreprise reste garante." },
      { l: "Reprendre la créance sur le client et lui refacturer les frais", pour: "Image fidèle : la créance redevient exigible, souvent douteuse.", contre: "Il faut relancer le client, voire provisionner." },
    ], question: "Pourquoi l'effet escompté reste-t-il suivi au compte 415 jusqu'à l'échéance ?", piste: "Parce que l'entreprise reste engagée si le client ne paie pas : le SYSCOHADA révisé maintient la créance au bilan jusqu'au paiement effectif." },
    { type: "pieges", puces: [
      "Passer un retrait bancaire directement de 521 à 571 alors que la banque et la caisse sont tenues par des personnes différentes : utilisez le 585 pour rapprocher les deux pièces.",
      "Enregistrer les agios d'escompte en frais bancaires : l'intérêt va au 675, la commission au 631.",
      "Croire que l'escompte éteint la créance : elle reste suivie (415) jusqu'au paiement à l'échéance.",
    ] },
    { type: "articles", refs: [AUDCIF + " : comptes 402, 412, 415, 512, 565, 585 et 675.", "Acte uniforme OHADA portant organisation des sûretés et droit cambiaire : lettre de change et billet à ordre."] },
  ],
  narration: [
    "Ce module porte sur les règlements et les effets de commerce.",
    "Payer un fournisseur, c'est débiter le compte 401 et créditer la banque ou la caisse. Encaisser un client, c'est débiter la trésorerie et créditer le compte 411.",
    "Un transfert entre la banque et la caisse passe par le compte 585, Virements de fonds, qui doit revenir à zéro.",
    "Un effet de commerce est une promesse de payer à une date. La lettre de change est tirée par le créancier ; le billet à ordre est souscrit par le débiteur.",
    "Chez le fournisseur, la créance devient un effet à recevoir, compte 412. Chez le client, la dette devient un effet à payer, compte 402.",
    "Avant l'échéance, l'effet peut être escompté : la banque avance les fonds, moins les agios, enregistrés au compte 675, et une commission au compte 631. La créance reste suivie jusqu'au paiement.",
  ],
  qcm: [
    { q: "Paiement d'un fournisseur par virement : quelle écriture ?", r: ["Débit 401, crédit 521", "Débit 521, crédit 401", "Débit 601, crédit 521", "Débit 401, crédit 411"], b: 0, e: "La dette diminue, la banque aussi." },
    { q: "Encaissement d'un client en espèces : quelle écriture ?", r: ["Débit 571, crédit 411", "Débit 411, crédit 571", "Débit 571, crédit 701", "Débit 521, crédit 571"], b: 0, e: "La caisse augmente, la créance diminue." },
    { q: "À quoi sert le compte 585 Virements de fonds ?", r: ["À enregistrer les transferts entre deux comptes de trésorerie", "À payer les salaires", "À enregistrer les ventes", "À constater la TVA"], b: 0, e: "Il est soldé quand les deux pièces sont enregistrées." },
    { q: "Les frais de tenue de compte bancaire se débitent au :", r: ["631", "675", "671", "521"], b: 0, e: "Frais bancaires." },
    { q: "Qui tire une lettre de change ?", r: ["Le créancier (fournisseur)", "Le débiteur (client)", "La banque", "L'État"], b: 0, e: "Le tireur ordonne au tiré de payer." },
    { q: "Qui souscrit un billet à ordre ?", r: ["Le débiteur", "Le créancier", "Le notaire", "Le greffe"], b: 0, e: "Il promet lui-même de payer." },
    { q: "Chez le fournisseur, une traite acceptée se passe :", r: ["Débit 412, crédit 411", "Débit 411, crédit 412", "Débit 402, crédit 401", "Débit 521, crédit 411"], b: 0, e: "La créance ordinaire devient un effet à recevoir." },
    { q: "Chez le client, l'acceptation d'une traite se passe :", r: ["Débit 401, crédit 402", "Débit 402, crédit 401", "Débit 412, crédit 411", "Débit 601, crédit 402"], b: 0, e: "La dette ordinaire devient un effet à payer." },
    { q: "Effet de 3 000 000 FC escompté 60 jours à 12 % : montant de l'escompte (intérêt) ?", r: ["60 000 FC", "360 000 FC", "30 000 FC", "120 000 FC"], b: 0, e: "3 000 000 × 12 % × 60 / 360." },
    { q: "L'intérêt d'escompte des effets se débite au :", r: ["675", "631", "673", "671"], b: 0, e: "675 Escomptes des effets de commerce." },
    { q: "À la remise à l'escompte, la banque est créditée par le compte :", r: ["565 Escompte de crédits ordinaires", "412", "402", "701"], b: 0, e: "Le crédit d'escompte est soldé à l'échéance." },
    { q: "Pourquoi l'effet escompté est-il suivi au compte 415 jusqu'à l'échéance ?", r: ["Parce que l'entreprise reste garante en cas d'impayé", "Parce qu'il est payé deux fois", "Pour calculer la TVA", "Parce que la loi interdit l'escompte"], b: 0, e: "Escompte « sauf bonne fin »." },
    { q: "Remettre un effet à l'encaissement (sans escompte) se passe :", r: ["Débit 512, crédit 412", "Débit 521, crédit 412", "Débit 412, crédit 512", "Débit 565, crédit 412"], b: 0, e: "512 Effets à l'encaissement, jusqu'à l'avis de crédit." },
    { q: "Une traite de 3 000 000 FC escomptée avec 60 000 FC d'agios et 10 000 FC de commission rapporte net :", r: ["2 930 000 FC", "2 940 000 FC", "3 000 000 FC", "2 990 000 FC"], b: 0, e: "3 000 000 − 70 000 FC." },
    { q: "À l'échéance d'un effet escompté payé par le client, on passe :", r: ["Débit 565, crédit 415", "Débit 521, crédit 412", "Débit 415, crédit 565", "Aucune écriture"], b: 0, e: "La garantie et le crédit d'escompte sont soldés." },
  ],
};

const S8 = {
  id: "S8", titre: "Les stocks : inventaire et valorisation", court: "Les stocks", ico: "packages", col: "#15803D", duree: "45 min",
  resume: "L'inventaire intermittent et le permanent, la variation des stocks à la clôture, le coût d'achat des marchandises vendues, les méthodes CUMP et PEPS et la dépréciation des stocks.",
  blocs: [
    { type: "essentiel", texte: "Dans l'**inventaire intermittent**, le plus courant, les achats sont passés en **charges (601)** au fil de l'année ; le compte de stock (**31 Marchandises**) ne bouge qu'à la clôture. On **annule le stock initial** (débit **6031**, crédit **31**) et on **constate le stock final** compté lors de l'inventaire physique (débit **31**, crédit **6031**). Le solde du **6031 Variations des stocks** corrige les achats : **coût d'achat des marchandises vendues = achats + stock initial − stock final**. Les sorties se valorisent au **coût unitaire moyen pondéré (CUMP)** ou en **premier entré, premier sorti (PEPS)** ; la méthode « dernier entré, premier sorti » est **interdite**. Un stock dont la valeur de vente baisse sous son coût est **déprécié** (débit **6593**, crédit **391**)." },
    { type: "schema", kind: "journal", titre: "Clôture chez MBOKA SARL : stock initial 4 000 000 FC, stock final 5 500 000 FC", ecritures: [
      { date: "31/12", libelle: "Annulation du stock initial", lignes: [
        { c: "6031", l: "Variations des stocks de marchandises", d: 4000000 }, { c: "31", l: "Marchandises", cr: 4000000 }] },
      { date: "31/12", libelle: "Constatation du stock final (inventaire physique)", lignes: [
        { c: "31", l: "Marchandises", d: 5500000 }, { c: "6031", l: "Variations des stocks de marchandises", cr: 5500000 }] },
    ] },
    { type: "schema", kind: "tableau", titre: "Coût d'achat des marchandises vendues (en FC)", entetes: ["Élément", "Montant"], lignes: [
      ["Achats de marchandises de l'exercice (601)", "30 000 000"],
      ["+ Stock initial", "4 000 000"],
      ["− Stock final", "− 5 500 000"],
      ["= Coût d'achat des marchandises vendues", "28 500 000"],
      ["Solde du 6031 (créditeur) : la variation réduit les charges", "1 500 000"],
    ] },
    { type: "schema", kind: "tableau", titre: "Valoriser les sorties : CUMP ou PEPS (sacs de ciment)", entetes: ["Mouvement", "Quantité", "Prix unitaire (FC)", "Valeur (FC)"], lignes: [
      ["Stock au 1er mai", "100", "10 000", "1 000 000"],
      ["Entrée du 10 mai", "300", "12 000", "3 600 000"],
      ["CUMP après l'entrée", "400", "11 500", "4 600 000"],
      ["Sortie de 150 sacs au CUMP", "150", "11 500", "1 725 000"],
      ["Sortie de 150 sacs en PEPS", "100 + 50", "10 000 puis 12 000", "1 600 000"],
    ] },
    { type: "schema", kind: "cartes", titre: "Intermittent ou permanent ?", cartes: [
      { ico: "calendar", t: "Inventaire intermittent", d: "Stock connu seulement par le comptage de fin d'exercice ; simple, adapté au commerce." },
      { ico: "refresh", t: "Inventaire permanent", d: "Chaque entrée et chaque sortie est suivie en quantité et en valeur (fiches de stock, logiciel) : le stock est connu à tout moment." },
      { ico: "clipboard-check", t: "Inventaire physique", d: "Obligatoire au moins une fois par an, quelle que soit la méthode : on compte, on compare, on explique les écarts." },
    ] },
    { type: "schema", kind: "journal", titre: "Dépréciation d'un stock abîmé", ecritures: [
      { date: "31/12", libelle: "Lot de tôles rouillées : coût 800 000 FC, valeur de vente nette 500 000 FC", lignes: [
        { c: "6593", l: "Charges pour dépréciations sur stocks", d: 300000 }, { c: "391", l: "Dépréciations des stocks de marchandises", cr: 300000 }] },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le comptage « arrangé »", situation: "Au comptage du 31 décembre, il manque 40 sacs de ciment par rapport aux fiches. Le magasinier propose de compter les 40 sacs « en transit » pour ne pas avoir d'écart.", options: [
      { l: "Accepter les 40 sacs fictifs", pour: "Pas d'écart à expliquer.", contre: "Stock final surévalué, bénéfice gonflé et vol ou perte non détecté." },
      { l: "Retenir le stock réellement compté et analyser l'écart", pour: "Comptes sincères ; on peut rechercher la cause (vol, erreur, casse).", contre: "Un écart à justifier devant la direction." },
    ], question: "Quel est l'effet d'un stock final surévalué sur le résultat ?", piste: "Le stock final vient en diminution du coût des marchandises vendues : surévalué, il gonfle artificiellement le bénéfice (et l'impôt)." },
    { type: "pieges", puces: [
      "Utiliser la méthode « dernier entré, premier sorti » : elle n'est pas admise.",
      "Oublier d'annuler le stock initial : la variation serait fausse.",
      "Confondre le compte de stock (31, au bilan) et les achats (601, au compte de résultat).",
      "Évaluer le stock au prix de vente : on l'évalue au coût d'achat, déprécié si sa valeur de vente nette est inférieure.",
    ] },
    { type: "articles", refs: [AUDCIF + " : évaluation des stocks (coût d'entrée, CUMP ou PEPS), inventaire annuel.", "Guide d'application du SYSCOHADA révisé : comptes 31, 391, 6031 et 6593."] },
  ],
  narration: [
    "Ce module traite des stocks.",
    "Dans l'inventaire intermittent, les achats de l'année sont des charges, au compte 601. Le compte de stock, 31, ne bouge qu'à la clôture.",
    "Au 31 décembre, on annule le stock initial : débit 6031, crédit 31. Puis on constate le stock final compté : débit 31, crédit 6031.",
    "Le coût d'achat des marchandises vendues est égal aux achats, plus le stock initial, moins le stock final.",
    "Les sorties se valorisent au coût unitaire moyen pondéré, ou selon la méthode premier entré, premier sorti. La méthode dernier entré, premier sorti est interdite.",
    "Enfin, un stock dont la valeur de vente baisse sous son coût est déprécié : débit 6593, crédit 391.",
  ],
  qcm: [
    { q: "Dans l'inventaire intermittent, les achats de marchandises de l'année sont enregistrés au :", r: ["601", "31", "6031", "401 seulement"], b: 0, e: "Le stock n'est ajusté qu'à la clôture." },
    { q: "L'annulation du stock initial de marchandises se passe :", r: ["Débit 6031, crédit 31", "Débit 31, crédit 6031", "Débit 601, crédit 31", "Débit 31, crédit 601"], b: 0, e: "Le stock initial devient une charge de l'exercice." },
    { q: "La constatation du stock final se passe :", r: ["Débit 31, crédit 6031", "Débit 6031, crédit 31", "Débit 31, crédit 701", "Débit 601, crédit 31"], b: 0, e: "Le stock non vendu réduit les charges." },
    { q: "Achats 30 000 000, stock initial 4 000 000, stock final 5 500 000 FC. Coût d'achat des marchandises vendues ?", r: ["28 500 000 FC", "31 500 000 FC", "30 000 000 FC", "39 500 000 FC"], b: 0, e: "30 + 4 − 5,5 = 28,5 millions." },
    { q: "Si le stock final dépasse le stock initial, le solde du 6031 est :", r: ["Créditeur et diminue les charges", "Débiteur et augmente les charges", "Toujours nul", "Un produit d'exploitation au 701"], b: 0, e: "Ici 1 500 000 FC créditeur." },
    { q: "Quelles méthodes de valorisation des sorties sont admises ?", r: ["Le CUMP et le PEPS", "Le CUMP et le DEPS", "Le PEPS et le prix de vente", "Uniquement le prix de vente"], b: 0, e: "Le « dernier entré, premier sorti » est interdit." },
    { q: "Stock de 100 sacs à 10 000 FC, entrée de 300 sacs à 12 000 FC. CUMP ?", r: ["11 500 FC", "11 000 FC", "12 000 FC", "10 500 FC"], b: 0, e: "(1 000 000 + 3 600 000) / 400." },
    { q: "Avec ce CUMP, combien vaut une sortie de 150 sacs ?", r: ["1 725 000 FC", "1 500 000 FC", "1 800 000 FC", "1 600 000 FC"], b: 0, e: "150 × 11 500 FC." },
    { q: "En PEPS, une sortie de 150 sacs (100 à 10 000 puis 50 à 12 000 FC) vaut :", r: ["1 600 000 FC", "1 725 000 FC", "1 800 000 FC", "1 500 000 FC"], b: 0, e: "1 000 000 + 600 000 FC." },
    { q: "Combien de fois au moins faut-il faire un inventaire physique ?", r: ["Une fois par an", "Une fois tous les 3 ans", "Jamais en inventaire permanent", "Chaque jour"], b: 0, e: "Même en inventaire permanent, on compte au moins à la clôture." },
    { q: "La dépréciation d'un stock se passe :", r: ["Débit 6593, crédit 391", "Débit 391, crédit 6593", "Débit 6031, crédit 31", "Débit 681, crédit 28"], b: 0, e: "Charge pour dépréciation sur stocks." },
    { q: "Un lot coûte 800 000 FC et ne peut se vendre que 500 000 FC net. Dépréciation ?", r: ["300 000 FC", "500 000 FC", "800 000 FC", "Aucune"], b: 0, e: "Différence entre le coût et la valeur de vente nette." },
    { q: "Un stock final surévalué :", r: ["Gonfle le bénéfice", "Diminue le bénéfice", "N'a aucun effet sur le résultat", "Diminue la TVA"], b: 0, e: "Il réduit à tort le coût des marchandises vendues." },
    { q: "Dans l'inventaire permanent :", r: ["Chaque entrée et chaque sortie est suivie en quantité et en valeur", "On ne compte jamais le stock", "Les achats ne s'enregistrent pas", "Le stock est évalué au prix de vente"], b: 0, e: "Le stock est connu à tout moment." },
    { q: "Le stock de marchandises figure au bilan :", r: ["À l'actif circulant, compte 31", "Au passif", "En charges", "En trésorerie"], b: 0, e: "Net des dépréciations (391)." },
  ],
};

export const MODULES_SYS1_B = [S5, S6, S7, S8];
