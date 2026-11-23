// ══════════════════ LE CODE MINIER EXPLIQUÉ : 6 MODULES ══════════════════
// Sources (textes lus) :
// - Loi n° 007/2002 du 11 juillet 2002 portant Code minier, telle que modifiée et complétée par la loi n° 18/001 du
//   9 mars 2018 (Journal officiel, numéro spécial du 28 mars 2018) ;
// - Décret n° 038/2003 du 26 mars 2003 portant Règlement minier, modifié par le décret n° 18/024 du 8 juin 2018 ;
// - Décret portant statut du Fonds minier pour les générations futures (FOMIN), 2019.
// Chaque module : l'essentiel, schémas, caricature animée (src/mines/Animation.jsx), cas pratique, pièges, articles,
// narration audio et QCM de 15 questions. MI1 est en accès libre.

const CODE = "Loi n° 007/2002 du 11 juillet 2002 portant Code minier, modifiée et complétée par la loi n° 18/001 du 9 mars 2018";

const MI1 = {
  id: "MI1", titre: "Le cadre : à qui appartiennent les mines ?", court: "Le cadre", ico: "building-bank", col: "#92400E", duree: "25 min", libre: true,
  resume: "La propriété de l'État sur le sous-sol, le Code de 2002 révisé en 2018, les mines et les carrières, les acteurs (ministre, Cadastre minier, provinces) et les substances stratégiques.",
  blocs: [
    { type: "essentiel", texte: "Les gîtes de substances minérales du sol, du sous-sol et des cours d'eau sont la **propriété exclusive, inaliénable et imprescriptible de l'État** (art. 3). L'État ne vend pas son sous-sol : il **accorde des droits** de recherche et d'exploitation, par l'intermédiaire du **Cadastre minier**. Le texte de base est la **loi n° 007/2002 du 11 juillet 2002 portant Code minier**, profondément révisée par la **loi n° 18/001 du 9 mars 2018** : redevances plus élevées, parts de l'État renforcées, obligations envers les communautés, transparence." },
    { type: "schema", kind: "animation", titre: "Caricature animée : à qui appartient le sous-sol ?", scene: "sous-sol", etapes: [
      { t: 0, texte: "Le sous-sol congolais regorge de cuivre, de cobalt, d'or et de bien d'autres substances." },
      { t: 3, texte: "Mais à qui appartiennent ces richesses : au propriétaire du terrain, à celui qui les trouve ?" },
      { t: 6, texte: "À l'État : une propriété exclusive, inaliénable et imprescriptible (article 3)." },
      { t: 9, texte: "L'État accorde des droits miniers par le Cadastre minier, sans jamais céder la propriété du sous-sol." },
    ] },
    { type: "schema", kind: "cartes", titre: "Les acteurs du secteur minier", cartes: [
      { ico: "building-community", t: "Premier ministre", d: "Déclare par décret les substances stratégiques, classe ou déclasse les zones interdites et les substances réservées." },
      { ico: "briefcase", t: "Ministre des Mines", d: "Octroie ou refuse les droits miniers, institue les zones d'exploitation artisanale, agrée les comptoirs." },
      { ico: "map-pin", t: "Cadastre minier (CAMI)", d: "Reçoit les demandes, vérifie les périmètres, inscrit et publie les droits miniers." },
      { ico: "map-2", t: "Province et ETD", d: "Reçoivent une part de la redevance ; la province intervient notamment dans l'exploitation artisanale." },
      { ico: "users", t: "SAEMAPE", d: "Service public d'assistance et d'encadrement de l'exploitation minière artisanale et à petite échelle." },
      { ico: "leaf", t: "Agence congolaise de l'environnement", d: "Instruit avec la direction de l'environnement minier les études d'impact et délivre le certificat environnemental." },
    ] },
    { type: "schema", kind: "tableau", titre: "Mines ou carrières ?", entetes: ["Catégorie", "Exemples", "Titre principal"], lignes: [
      ["Mines", "Cuivre, cobalt, or, diamant, étain, coltan", "Permis de recherches puis Permis d'exploitation"],
      ["Carrières", "Sable, gravier, calcaire, argile, moellons", "Autorisation de recherches ou d'exploitation de carrières"],
      ["Substances stratégiques", "Déclarées par décret (en 2018 : cobalt, germanium, colombo-tantalite)", "Règles particulières et redevance de 10 %"],
    ] },
    { type: "texte", titre: "Ce que la révision de 2018 a changé", puces: [
      "**Fiscalité renforcée** : redevance calculée sur la valeur commerciale brute, taux relevés, 10 % pour les substances stratégiques, impôt de 50 % sur les superprofits.",
      "**Parts de l'État** : 10 % libres de charges et non diluables, plus 5 % à chaque renouvellement du Permis d'exploitation.",
      "**Contenu congolais** : au moins 10 % du capital détenus par des Congolais, sous-traitance réservée aux sociétés à capitaux congolais majoritaires.",
      "**Communautés et environnement** : cahier des charges, dotation de 0,3 % du chiffre d'affaires, responsabilité pour les dommages.",
      "**Stabilité fiscale ramenée à 5 ans** (contre 10 ans dans le Code de 2002) et **transparence** obligatoire (contrats, paiements, propriétaires réels).",
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le cuivre sous le champ", situation: "Mama Kabeya découvre des pierres vertes de cuivre dans le champ dont elle a hérité, près de Likasi. Son voisin lui conseille de « vendre le gisement » à une société étrangère.", options: [
      { l: "Vendre le gisement comme un terrain", pour: "Gain rapide.", contre: "Impossible : le sous-sol appartient à l'État ; la vente serait nulle et risquée." },
      { l: "Se renseigner auprès du Cadastre minier et faire valoir ses droits d'occupante du sol", pour: "Si un droit minier est accordé, le titulaire devra l'indemniser pour la perte de jouissance de son champ.", contre: "Démarches à suivre ; le gisement ne lui appartient pas pour autant." },
    ], question: "Pourquoi la propriété du terrain ne donne-t-elle pas la propriété du cuivre ?", piste: "Parce que le Code distingue le sol et le sous-sol : les gîtes minéraux sont la propriété exclusive et inaliénable de l'État. L'occupante du sol a droit à une juste indemnité si l'exploitation la prive de son champ." },
    { type: "pieges", puces: [
      "Croire que le propriétaire d'un terrain possède le minerai qui s'y trouve : le sous-sol appartient à l'État.",
      "Confondre l'octroi d'un droit minier et une vente : l'État accorde un droit limité dans le temps et soumis à conditions.",
      "Utiliser un support ancien : de nombreux documents citent encore le Code de 2002 sans la révision de 2018 (taux, stabilité de 10 ans…).",
    ] },
    { type: "articles", refs: [CODE + " : articles 3, 4, 7 bis, 7 ter, 8 bis, 9 et 10.", "Décret n° 038/2003 du 26 mars 2003 portant Règlement minier, modifié par le décret n° 18/024 du 8 juin 2018."] },
  ],
  narration: [
    "Bienvenue dans ce parcours consacré au Code minier de la République démocratique du Congo.",
    "Retenez d'abord une règle : les gîtes minéraux du sol, du sous-sol et des cours d'eau appartiennent à l'État. C'est une propriété exclusive, inaliénable et imprescriptible.",
    "L'État ne vend pas son sous-sol. Il accorde des droits de recherche et d'exploitation, par l'intermédiaire du Cadastre minier.",
    "Le texte de base est la loi du 11 juillet 2002 portant Code minier, profondément révisée par la loi du 9 mars 2018.",
    "Cette révision a relevé la fiscalité, renforcé les parts de l'État et des Congolais, créé des obligations envers les communautés et ramené la stabilité fiscale à cinq ans.",
    "Enfin, le Premier ministre peut déclarer certaines substances stratégiques, comme il l'a fait en 2018 pour le cobalt, le germanium et le coltan.",
  ],
  qcm: [
    { q: "À qui appartiennent les gîtes de substances minérales en RDC ?", r: ["À l'État, de façon exclusive, inaliénable et imprescriptible", "Au propriétaire du terrain", "À la première personne qui les découvre", "À la province où ils se trouvent"], b: 0, e: "Article 3 du Code minier." },
    { q: "Quel texte constitue le Code minier ?", r: ["La loi n° 007/2002 du 11 juillet 2002, modifiée en 2018", "La loi n° 015/2002 du 16 octobre 2002", "L'ordonnance-loi n° 81-013", "Le décret du 30 juillet 1888"], b: 0, e: "La loi n° 015/2002 est le Code du travail." },
    { q: "Quelle loi a modifié le Code minier en 2018 ?", r: ["La loi n° 18/001 du 9 mars 2018", "La loi n° 16/010 du 15 juillet 2016", "La loi n° 23/053 du 30 novembre 2023", "La loi n° 17/001 du 8 février 2017"], b: 0, e: "Publiée au Journal officiel, numéro spécial du 28 mars 2018." },
    { q: "Quel organisme reçoit les demandes et inscrit les droits miniers ?", r: ["Le Cadastre minier", "La Banque centrale du Congo", "La Direction générale des impôts", "La CENI"], b: 0, e: "Le Cadastre minier (CAMI) gère l'octroi et l'inscription des droits." },
    { q: "Qui octroie ou refuse les droits miniers ?", r: ["Le ministre des Mines", "Le gouverneur de province", "Le bourgmestre", "Le Cadastre minier seul"], b: 0, e: "Article 10 : le ministre octroie ou refuse, sur instruction du Cadastre minier." },
    { q: "Qui peut déclarer une substance « stratégique » ?", r: ["Le Premier ministre, par décret délibéré en Conseil des ministres", "Le ministre des Mines seul", "Le Parlement uniquement", "Les entreprises minières"], b: 0, e: "Article 7 bis." },
    { q: "Quelles substances ont été déclarées stratégiques en 2018 ?", r: ["Le cobalt, le germanium et la colombo-tantalite (coltan)", "Le sable, le gravier et l'argile", "Le cuivre et l'or", "Le charbon et le pétrole"], b: 0, e: "Leur redevance est de 10 %." },
    { q: "Le sable et le gravier relèvent :", r: ["Des carrières", "Des mines", "Des substances stratégiques", "Des hydrocarbures"], b: 0, e: "Ce sont des matériaux de construction, classés en carrières." },
    { q: "La révision de 2018 a ramené la stabilité fiscale à :", r: ["5 ans", "10 ans", "25 ans", "1 an"], b: 0, e: "Article 276 : 5 ans, contre 10 ans dans le Code de 2002." },
    { q: "Que publie-t-on au nom de la transparence (article 7 ter) ?", r: ["Les contrats, les paiements et les propriétaires réels des actifs miniers", "Les salaires de chaque mineur", "Les mots de passe des entreprises", "Rien, c'est confidentiel"], b: 0, e: "Le Code reprend les normes de transparence de l'industrie extractive." },
    { q: "Que reçoivent la province et l'entité territoriale décentralisée ?", r: ["Une part de la redevance minière", "La propriété du gisement", "Le droit d'octroyer des permis d'exploitation", "Rien du tout"], b: 0, e: "25 % pour la province et 15 % pour l'ETD selon l'article 242." },
    { q: "Le SAEMAPE encadre :", r: ["L'exploitation minière artisanale et à petite échelle", "Les banques", "Les élections", "Le transport aérien"], b: 0, e: "Service d'assistance et d'encadrement de l'exploitation minière artisanale et à petite échelle." },
    { q: "Le fait de posséder un champ donne-t-il droit au minerai qui s'y trouve ?", r: ["Non, mais l'occupant du sol a droit à une indemnité s'il est privé de sa terre", "Oui, totalement", "Oui, après 10 ans", "Oui, s'il paie une taxe"], b: 0, e: "Le sol et le sous-sol sont distincts ; l'article 281 prévoit une juste indemnité." },
    { q: "Qui instruit les études d'impact environnemental des projets miniers ?", r: ["L'Agence congolaise de l'environnement, avec la direction de l'environnement minier", "La Banque centrale", "La FIFA", "Les chefs coutumiers seuls"], b: 0, e: "La révision de 2018 a institué cette collaboration et le certificat environnemental." },
    { q: "Une « mine » se distingue d'une « carrière » surtout par :", r: ["La nature de la substance exploitée", "La taille de l'entreprise", "La nationalité de l'exploitant", "Le nombre de travailleurs"], b: 0, e: "Article 4 : les gîtes non classés en carrières sont des mines." },
  ],
};

const MI2 = {
  id: "MI2", titre: "Les droits miniers : du permis de recherches au permis d'exploitation", court: "Les droits miniers", ico: "file-certificate", col: "#B45309", duree: "30 min",
  resume: "Permis de recherches, Permis d'exploitation, petite mine et rejets : durées, conditions, parts de l'État et des Congolais, et ce qu'il faut pour garder son titre.",
  blocs: [
    { type: "essentiel", texte: "On ne passe pas d'un coup à l'exploitation. Le **Permis de recherches** dure **5 ans, renouvelable une fois** pour la même durée. Si un gisement exploitable est démontré, le titulaire demande un **Permis d'exploitation** : **25 ans au plus**, renouvelable par périodes de **15 ans au plus**. Pour l'obtenir, il doit notamment **céder à l'État 10 % des parts**, libres de charges et non diluables, compter **au moins 10 % de Congolais** dans son capital, faire approuver son **EIES** et son **PGES**, et s'engager sur un **cahier des charges** avec les communautés." },
    { type: "schema", kind: "animation", titre: "Caricature animée : le chemin d'un permis", scene: "permis", etapes: [
      { t: 0, texte: "Tout commence par un Permis de recherches : 5 ans, renouvelable une fois." },
      { t: 4.5, texte: "Les forages démontrent un gisement rentable : le titulaire demande un Permis d'exploitation." },
      { t: 8, texte: "Le Permis d'exploitation dure 25 ans au plus, renouvelable par périodes de 15 ans." },
      { t: 11, texte: "Conditions clés : 10 % des parts à l'État, au moins 10 % de Congolais, et 5 % de plus à l'État à chaque renouvellement." },
    ] },
    { type: "schema", kind: "tableau", titre: "Les principaux titres miniers", entetes: ["Titre", "Pour quoi faire", "Durée"], lignes: [
      ["Permis de recherches (PR)", "Explorer un périmètre pour trouver un gisement", "5 ans, renouvelable une fois"],
      ["Permis d'exploitation (PE)", "Exploiter un gisement démontré", "25 ans au plus ; renouvelable par périodes de 15 ans au plus"],
      ["Permis d'exploitation de petite mine (PEPM)", "Exploiter une mine à petite échelle", "5 ans, renouvelable une fois"],
      ["Permis d'exploitation des rejets (PER)", "Traiter des rejets miniers (résidus)", "Selon le Code et le Règlement minier"],
      ["Autorisation d'exploitation de carrières", "Exploiter sable, calcaire, gravier…", "Permanente ou temporaire"],
    ] },
    { type: "schema", kind: "flux", titre: "Obtenir un Permis d'exploitation : les conditions clés", etapes: [
      { op: "1", l: "Démontrer un gisement économiquement exploitable", d: "Étude de faisabilité à l'appui." },
      { op: "2", l: "Prouver les ressources financières", d: "Plan de financement et plan de réhabilitation ; le capital social apporté ne peut être inférieur à 40 % des ressources." },
      { op: "3", l: "Faire approuver l'EIES et le PGES", d: "Étude d'impact environnemental et social, plan de gestion." },
      { op: "4", l: "Céder à l'État 10 % des parts", d: "Libres de toutes charges et non diluables (art. 71)." },
      { op: "5", l: "Au moins 10 % de capital congolais", d: "Détenu par des personnes physiques de nationalité congolaise (art. 71 bis)." },
      { op: "6", l: "S'engager sur un cahier des charges", d: "Responsabilité sociétale envers les communautés locales affectées.", fort: true },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le renouvellement", situation: "Une société exploite une mine de cuivre depuis 25 ans. Elle demande le renouvellement de son Permis d'exploitation. Son directeur propose de ne rien céder de plus à l'État « puisqu'il a déjà ses 10 % ».", options: [
      { l: "Refuser toute nouvelle cession", pour: "Préserve la part des actionnaires.", contre: "Contraire au Code : le renouvellement peut être refusé." },
      { l: "Céder 5 % supplémentaires à l'État et remplir les autres conditions", pour: "Condition légale du renouvellement : la mine peut continuer 15 ans de plus.", contre: "Dilution des actionnaires privés." },
    ], question: "Après un renouvellement, quelle part détient l'État au minimum ?", piste: "15 % : les 10 % initiaux libres de charges et non diluables, plus 5 % cédés au renouvellement. Chaque nouveau renouvellement ajoute encore 5 %." },
    { type: "pieges", puces: [
      "Croire qu'un Permis de recherches permet d'exploiter : il faut un Permis d'exploitation distinct.",
      "Oublier que les 10 % de l'État sont « non diluables » : une augmentation de capital ne peut pas les réduire.",
      "Confondre les 10 % de l'État et les 10 % de Congolais : ce sont deux obligations différentes, cumulatives.",
      "Penser que le renouvellement est automatique : il exige la rentabilité, la mise en valeur régulière, le respect des obligations fiscales et 5 % de parts en plus pour l'État.",
    ] },
    { type: "articles", refs: [CODE + " : articles 52, 56, 58, 64, 67, 69, 71, 71 bis, 80, 99 et 101.", "Règlement minier (décret n° 038/2003 modifié en 2018) : procédures d'octroi et de renouvellement."] },
  ],
  narration: [
    "Ce module suit le chemin d'un titre minier.",
    "Tout commence par le Permis de recherches. Il dure cinq ans, renouvelable une fois pour la même durée.",
    "Si les recherches démontrent un gisement exploitable, le titulaire demande un Permis d'exploitation. Il dure vingt-cinq ans au plus, et se renouvelle par périodes de quinze ans au plus.",
    "Pour l'obtenir, il faut prouver ses moyens financiers, faire approuver l'étude d'impact et le plan de gestion environnementale, céder à l'État dix pour cent des parts libres de charges et non diluables, et compter au moins dix pour cent de Congolais au capital.",
    "À chaque renouvellement, l'État reçoit cinq pour cent de parts en plus.",
    "Il existe aussi des titres adaptés : le Permis d'exploitation de petite mine, le Permis d'exploitation des rejets et les autorisations de carrières.",
  ],
  qcm: [
    { q: "Quelle est la durée du Permis de recherches ?", r: ["5 ans, renouvelable une fois pour la même durée", "25 ans", "1 an, non renouvelable", "10 ans, renouvelable à l'infini"], b: 0, e: "Article 52 modifié : la même durée pour toutes les substances." },
    { q: "Quelle est la durée maximale d'un Permis d'exploitation ?", r: ["25 ans", "5 ans", "50 ans", "99 ans"], b: 0, e: "Article 67." },
    { q: "Le Permis d'exploitation se renouvelle par périodes de :", r: ["15 ans au plus", "5 ans", "25 ans", "1 an"], b: 0, e: "Article 67 : périodes n'excédant pas quinze ans chacune." },
    { q: "Quelle part des actions la société doit-elle céder à l'État pour obtenir un Permis d'exploitation ?", r: ["10 %, libres de charges et non diluables", "1 %", "51 %", "Aucune"], b: 0, e: "Article 71 littera d." },
    { q: "Que cède-t-on en plus à l'État à chaque renouvellement du Permis d'exploitation ?", r: ["5 % des parts", "Rien", "La moitié du capital", "Une prime fixe de 1 000 USD"], b: 0, e: "En sus des parts cédées précédemment." },
    { q: "Quelle part du capital doivent détenir des personnes physiques congolaises ?", r: ["Au moins 10 %", "Au moins 51 %", "Exactement 1 %", "Aucune exigence"], b: 0, e: "Article 71 bis." },
    { q: "« Non diluables » signifie que les parts de l'État :", r: ["Ne peuvent pas être réduites par une augmentation de capital", "Peuvent être vendues à tout moment", "Ne donnent aucun droit", "Sont payées en devises"], b: 0, e: "Le pourcentage de l'État reste protégé." },
    { q: "Avant d'obtenir un Permis d'exploitation, il faut faire approuver :", r: ["L'EIES et le PGES", "Le budget de l'État", "Le règlement intérieur d'une école", "Un permis de conduire"], b: 0, e: "Étude d'impact environnemental et social, plan de gestion environnementale et sociale." },
    { q: "Le capital social apporté par le requérant d'un Permis d'exploitation ne peut être inférieur à :", r: ["40 % des ressources financières nécessaires", "1 % des ressources", "100 % des ressources", "10 000 USD"], b: 0, e: "Article 71 littera b modifié." },
    { q: "Le Permis de recherches permet-il d'exploiter la mine ?", r: ["Non, il faut un Permis d'exploitation", "Oui, pendant 5 ans", "Oui, si le gisement est petit", "Oui, avec l'accord du chef coutumier"], b: 0, e: "Recherche et exploitation sont deux titres distincts." },
    { q: "Quelle est la durée du Permis d'exploitation de petite mine ?", r: ["5 ans, renouvelable une fois", "25 ans", "15 ans", "3 mois"], b: 0, e: "Article 101 ; une prorogation est possible dans certains cas." },
    { q: "Un Permis d'exploitation des rejets sert à :", r: ["Traiter des résidus miniers déjà extraits", "Rejeter une demande de permis", "Exporter des déchets", "Recruter des travailleurs"], b: 0, e: "Les rejets peuvent contenir encore des métaux valorisables." },
    { q: "La société doit aussi s'engager à :", r: ["Respecter un cahier des charges de responsabilité sociétale", "Ne jamais embaucher de Congolais", "Exporter tout le minerai brut", "Ne payer aucun impôt"], b: 0, e: "Envers les communautés locales affectées par le projet." },
    { q: "Après un premier renouvellement, l'État détient au minimum :", r: ["15 % des parts", "10 % des parts", "5 % des parts", "50 % des parts"], b: 0, e: "10 % initiaux plus 5 % au renouvellement." },
    { q: "Le renouvellement du Permis d'exploitation exige notamment :", r: ["La mise en valeur régulière du gisement et le respect des obligations fiscales", "Un simple courrier", "L'accord des concurrents", "Rien : il est automatique"], b: 0, e: "Article 80 : rentabilité, mise en valeur ininterrompue, obligations fiscales, 5 % à l'État." },
  ],
};

const MI3 = {
  id: "MI3", titre: "L'exploitation artisanale : coopératives, négociants, traçabilité", court: "L'artisanal", ico: "shovel", col: "#A16207", duree: "30 min",
  resume: "Les zones d'exploitation artisanale, qui peut y travailler, les coopératives agréées, négociants et comptoirs, le travail des enfants et la traçabilité des minerais.",
  blocs: [
    { type: "essentiel", texte: "L'exploitation artisanale se pratique dans une **zone d'exploitation artisanale (ZEA)**, instituée par arrêté du ministre lorsque le gisement ne permet pas une exploitation industrielle ; elle couvre **au plus deux carrés**. Seules les **personnes physiques majeures de nationalité congolaise**, titulaires d'une **carte d'exploitant artisanal** et **membres d'une coopérative agréée**, peuvent y travailler. Les produits sont vendus à des **négociants** congolais et à des **comptoirs agréés**. Le **travail des enfants** est interdit : l'exploitation d'un site où une violation des droits de l'enfant est constatée est punie d'une amende de **10 000 USD par jour**." },
    { type: "schema", kind: "animation", titre: "Caricature animée : une journée dans une ZEA", scene: "artisanal", etapes: [
      { t: 0, texte: "Dans une zone d'exploitation artisanale, un creuseur extrait du minerai d'étain à la main." },
      { t: 3, texte: "Il est Congolais, majeur, titulaire d'une carte d'exploitant artisanal et membre d'une coopérative agréée." },
      { t: 6.5, texte: "Un enfant approche : le travail des enfants est interdit, sous peine de 10 000 USD d'amende par jour de violation." },
      { t: 10, texte: "Le minerai est vendu à un comptoir agréé, avec traçabilité de son origine." },
    ] },
    { type: "schema", kind: "flux", titre: "Le circuit légal d'un minerai artisanal", etapes: [
      { op: "1", l: "Creuseur membre d'une coopérative agréée", d: "Carte d'exploitant artisanal ; travail dans une ZEA." },
      { op: "2", l: "Coopérative minière", d: "Société coopérative régie par l'Acte uniforme OHADA de 2010, agréée par le ministre." },
      { op: "3", l: "Négociant", d: "Personne physique majeure de nationalité congolaise, titulaire d'une carte de négociant." },
      { op: "4", l: "Comptoir agréé", d: "Achète, traite et exporte ; traçabilité et certification de l'origine.", fort: true },
    ] },
    { type: "schema", kind: "cartes", titre: "Ne peuvent pas obtenir de carte ni d'agrément", cartes: [
      { ico: "shield", t: "Agents de l'État", d: "Fonctionnaires, magistrats, militaires, policiers, agents des services de sécurité." },
      { ico: "building", t: "Agents des organismes miniers publics", d: "Employés des organismes habilités à procéder aux opérations minières." },
      { ico: "user-x", t: "Personnes juridiquement incapables", d: "Au sens du Code de la famille, dont les mineurs." },
    ], note: "Ces personnes peuvent toutefois prendre des participations au capital de sociétés minières (art. 27)." },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le coltan sans origine", situation: "Un négociant de Walikale vous propose un lot de coltan à bas prix, « sans papiers, mais de très bonne qualité ». Il ne sait pas dire de quel site il provient.", options: [
      { l: "Acheter : la qualité est bonne", pour: "Bénéfice immédiat.", contre: "Minerai peut-être issu d'un site interdit (enfants, groupes armés) ; produit illicite, saisie et amende égale à trois fois sa valeur." },
      { l: "Refuser et n'acheter que des lots tracés auprès de coopératives agréées", pour: "Respect du Code et des exigences des acheteurs internationaux ; protection des enfants.", contre: "Prix plus élevé, délais." },
    ], question: "Pourquoi la traçabilité protège-t-elle aussi le vendeur honnête ?", piste: "Elle prouve que son minerai vient d'un site légal : il accède aux marchés qui exigent des minerais « propres » et ne se fait pas confondre avec les filières illicites." },
    { type: "pieges", puces: [
      "Croire qu'un étranger peut creuser dans une ZEA : l'exploitation artisanale est réservée aux Congolais majeurs membres d'une coopérative agréée.",
      "Penser que « tout le monde le fait » excuse le travail des enfants : l'amende est de 10 000 USD par jour de violation.",
      "Acheter un minerai dont l'origine est inconnue : son commerce est puni d'une amende égale à trois fois sa valeur s'il provient d'un site où des violations ont été constatées.",
      "Confondre artisanal et clandestin : l'artisanal légal suppose une ZEA, une carte et une coopérative agréée.",
    ] },
    { type: "articles", refs: [CODE + " : articles 26, 27, 109, 110, 111 et 299 bis.", "Acte uniforme OHADA du 15 décembre 2010 relatif au droit des sociétés coopératives.", "Loi n° 09/001 du 10 janvier 2009 portant protection de l'enfant."] },
  ],
  narration: [
    "Ce module porte sur l'exploitation artisanale, qui fait vivre des centaines de milliers de familles congolaises.",
    "Elle se pratique dans une zone d'exploitation artisanale, instituée par arrêté du ministre lorsque le gisement ne permet pas une exploitation industrielle. Une zone couvre au plus deux carrés.",
    "Seules les personnes physiques majeures de nationalité congolaise, titulaires d'une carte d'exploitant artisanal et membres d'une coopérative agréée, peuvent y travailler.",
    "Les produits sont vendus à des négociants congolais, puis à des comptoirs agréés qui assurent la traçabilité.",
    "Le travail des enfants est interdit. L'exploitation d'un site où une violation des droits de l'enfant est constatée est punie d'une amende de dix mille dollars par jour.",
    "Acheter un minerai sans origine, c'est risquer d'alimenter le travail des enfants ou les groupes armés : exigez toujours la traçabilité.",
  ],
  qcm: [
    { q: "Où se pratique l'exploitation artisanale légale ?", r: ["Dans une zone d'exploitation artisanale (ZEA)", "N'importe où, sans autorisation", "Uniquement dans les parcs nationaux", "Dans les périmètres des grandes sociétés, librement"], b: 0, e: "Article 109." },
    { q: "Qui institue une zone d'exploitation artisanale ?", r: ["Le ministre des Mines, par arrêté", "Le chef de quartier", "La coopérative elle-même", "Une société étrangère"], b: 0, e: "Après avis notamment de l'organisme de recherches et du gouverneur." },
    { q: "Une ZEA couvre au plus :", r: ["Deux carrés", "Cent carrés", "Une province entière", "Un seul mètre carré"], b: 0, e: "Article 109 modifié." },
    { q: "Qui peut exploiter artisanalement ?", r: ["Les Congolais majeurs titulaires d'une carte et membres d'une coopérative agréée", "Toute personne, même mineure", "Les étrangers munis d'un visa", "Les militaires en service"], b: 0, e: "Article 26." },
    { q: "Les militaires et policiers peuvent-ils obtenir une carte d'exploitant artisanal ?", r: ["Non", "Oui, librement", "Oui, s'ils sont en congé", "Oui, avec l'accord de leur chef"], b: 0, e: "Article 27 : incompatibilité ; ils peuvent toutefois détenir des parts de sociétés minières." },
    { q: "Une coopérative minière est régie par :", r: ["L'Acte uniforme OHADA relatif au droit des sociétés coopératives", "Le Code de la route", "Le Code de la famille", "Le droit coutumier seul"], b: 0, e: "Acte uniforme du 15 décembre 2010, avec agrément du ministre." },
    { q: "Qui peut détenir une carte de négociant ?", r: ["Une personne physique majeure de nationalité congolaise", "Toute société étrangère", "Un fonctionnaire en activité", "Un mineur accompagné"], b: 0, e: "Article 26 alinéa 2." },
    { q: "Quelle amende frappe l'exploitation d'un site où une violation des droits de l'enfant a été constatée ?", r: ["10 000 USD par jour jusqu'à la cessation", "100 USD une fois", "Aucune amende", "1 % du chiffre d'affaires"], b: 0, e: "Article 299 bis." },
    { q: "Le commerce de produits venant d'un tel site est puni d'une amende égale à :", r: ["Trois fois la valeur commerciale des produits", "La moitié de leur valeur", "10 USD", "Un mois de salaire"], b: 0, e: "Article 299 bis." },
    { q: "Quel service encadre l'exploitation artisanale ?", r: ["Le SAEMAPE", "La SNEL", "La REGIDESO", "La RVA"], b: 0, e: "Service d'assistance et d'encadrement de l'exploitation minière artisanale et à petite échelle." },
    { q: "À qui le négociant revend-il en général la production ?", r: ["À un comptoir agréé", "Directement à la Banque centrale", "À n'importe quel passant", "À l'école du village"], b: 0, e: "Les comptoirs sont agréés par le ministre." },
    { q: "La traçabilité sert surtout à :", r: ["Prouver l'origine légale du minerai", "Augmenter le poids du minerai", "Éviter de payer les creuseurs", "Cacher le site d'extraction"], b: 0, e: "Elle protège contre le travail des enfants et le financement des groupes armés." },
    { q: "Que se passe-t-il quand le gisement d'une ZEA devient exploitable industriellement ?", r: ["Le ministre peut fermer la zone", "Rien ne change jamais", "La coopérative devient propriétaire du sous-sol", "La zone devient un parc national"], b: 0, e: "Article 110." },
    { q: "Dans une ZEA, qui est autorisé à exploiter ?", r: ["Les membres des coopératives agréées", "Tout visiteur", "Les entreprises industrielles", "Les mineurs de moins de 15 ans"], b: 0, e: "Article 111." },
    { q: "Acheter un minerai sans origine connue, c'est surtout risquer :", r: ["D'alimenter le travail des enfants ou des filières illicites", "De payer moins d'impôts légalement", "D'obtenir un certificat", "De protéger l'environnement"], b: 0, e: "La traçabilité est aussi exigée par les acheteurs internationaux." },
  ],
};

const MI4 = {
  id: "MI4", titre: "La fiscalité minière : redevance, impôts et superprofits", court: "La fiscalité", ico: "receipt-tax", col: "#B91C1C", duree: "35 min",
  resume: "La redevance minière sur la valeur commerciale brute, ses taux (0 à 10 %), son partage entre l'État, la province, l'ETD et le FOMIN, l'impôt sur les bénéfices, les superprofits et la stabilité.",
  blocs: [
    { type: "essentiel", texte: "La **redevance minière** est due sur tout produit marchand dès l'exploitation effective. Son **assiette** est la **valeur commerciale brute** : la cotation moyenne du produit sur le marché international pendant le mois précédant sa sortie (art. 240). Ses **taux** vont de **0 %** (matériaux de construction d'usage courant) à **10 %** (substances stratégiques) (art. 241). Elle est **partagée** : **50 %** pouvoir central, **25 %** province, **15 %** entité territoriale décentralisée, **10 %** Fonds minier pour les générations futures (art. 242). S'y ajoutent l'**impôt sur les bénéfices à 30 %** et l'**impôt de 50 % sur les superprofits**." },
    { type: "schema", kind: "animation", titre: "Caricature animée : où va la redevance ?", scene: "redevance", etapes: [
      { t: 0, texte: "Un camion de cobalt quitte la mine : sa valeur commerciale brute est de 1 000 000 USD." },
      { t: 3, texte: "Le cobalt est une substance stratégique : la redevance est de 10 %, soit 100 000 USD." },
      { t: 6.4, texte: "Partage prévu par le Code : 50 % pouvoir central, 25 % province, 15 % ETD, 10 % FOMIN." },
      { t: 11, texte: "S'y ajoutent l'impôt sur les bénéfices (30 %) et, en cas de flambée des cours, l'impôt de 50 % sur les superprofits." },
    ] },
    { type: "schema", kind: "tableau", titre: "Taux de la redevance minière (art. 241)", entetes: ["Substance", "Exemples", "Taux"], lignes: [
      ["Matériaux de construction d'usage courant", "Sable, moellons", "0 %"],
      ["Minéraux industriels, hydrocarbures solides, autres", "Calcaire, charbon", "1 %"],
      ["Fer et métaux ferreux", "Minerai de fer", "1 %"],
      ["Métaux non ferreux ou de base", "Cuivre, zinc, étain", "3,5 %"],
      ["Métaux précieux", "Or, argent", "3,5 %"],
      ["Pierres précieuses et de couleur", "Diamant", "6 %"],
      ["Substances stratégiques", "Cobalt, germanium, coltan", "10 %"],
    ] },
    { type: "schema", kind: "redevance", titre: "Simulateur : redevance minière et sa répartition", note: "Le Code fixe la clé de répartition 50 / 25 / 15 / 10 (art. 242) ; ses modalités pratiques ont été précisées par des textes ultérieurs : vérifiez le texte en vigueur pour une déclaration réelle." },
    { type: "schema", kind: "cartes", titre: "Les autres prélèvements à retenir", cartes: [
      { ico: "chart-bar", t: "Impôt sur les bénéfices et profits", d: "30 % du bénéfice imposable (art. 247)." },
      { ico: "trending-up", t: "Impôt spécial sur les superprofits", d: "50 % des profits réalisés quand les cours dépassent de plus de 25 % ceux de l'étude de faisabilité (art. 251 bis)." },
      { ico: "coins", t: "Impôt mobilier sur les dividendes", d: "10 % sur les dividendes versés aux actionnaires (art. 246)." },
      { ico: "lock", t: "Stabilité fiscale", d: "Régime garanti 5 ans pour les titres existants ou issus d'un Permis de recherches existant (art. 276)." },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : la flambée du cobalt", situation: "Le cours du cobalt bondit de 40 % par rapport à l'étude de faisabilité d'une mine. Le directeur financier propose de « lisser » les ventes en les faisant passer par une filiale étrangère à prix réduit.", options: [
      { l: "Passer par la filiale à prix réduit", pour: "Moins d'impôt en RDC à court terme.", contre: "La redevance se calcule sur la cotation du marché international, et la manœuvre relève du prix de transfert abusif : redressement et sanctions." },
      { l: "Déclarer au prix du marché et payer l'impôt sur les superprofits", pour: "Conformité ; les recettes financent la province, l'ETD et le FOMIN.", contre: "Charge fiscale élevée cette année-là." },
    ], question: "Pourquoi la vente à une filiale ne réduit-elle pas la redevance ?", piste: "Parce que l'assiette est la valeur commerciale brute fondée sur la cotation moyenne du marché international, et non le prix facturé à la filiale." },
    { type: "pieges", puces: [
      "Calculer la redevance sur le bénéfice : elle porte sur la valeur commerciale brute, même si la mine perd de l'argent.",
      "Appliquer 2 % au cobalt (ancien taux) : depuis 2018, une substance stratégique paie 10 %.",
      "Oublier que le revenu soumis à l'impôt sur les superprofits ne l'est pas aussi à l'impôt sur les bénéfices.",
      "Croire que la stabilité est de 10 ans : elle a été ramenée à 5 ans en 2018.",
    ] },
    { type: "articles", refs: [CODE + " : articles 240, 241, 242, 246, 247, 251 bis et 276.", "Natural Resource Governance Institute, « La fiscalité du nouveau Code minier de la RDC » (analyse)."] },
  ],
  narration: [
    "Ce module explique la fiscalité minière.",
    "La redevance minière est due sur chaque produit marchand dès le début de l'exploitation. Elle se calcule sur la valeur commerciale brute, c'est-à-dire la cotation moyenne du marché international pendant le mois précédant la sortie du produit.",
    "Les taux vont de zéro pour cent pour le sable et les matériaux de construction courants, à trois virgule cinq pour cent pour le cuivre et l'or, six pour cent pour le diamant, et dix pour cent pour les substances stratégiques comme le cobalt.",
    "La redevance est partagée : cinquante pour cent pour le pouvoir central, vingt-cinq pour cent pour la province, quinze pour cent pour l'entité territoriale décentralisée, et dix pour cent pour le Fonds minier pour les générations futures.",
    "S'ajoutent l'impôt sur les bénéfices à trente pour cent, l'impôt mobilier de dix pour cent sur les dividendes, et l'impôt de cinquante pour cent sur les superprofits, quand les cours dépassent de plus de vingt-cinq pour cent ceux de l'étude de faisabilité.",
  ],
  qcm: [
    { q: "Sur quelle base se calcule la redevance minière ?", r: ["La valeur commerciale brute du produit marchand", "Le bénéfice net", "Le nombre de travailleurs", "La surface de la concession"], b: 0, e: "Article 240." },
    { q: "La valeur commerciale brute correspond à :", r: ["La cotation moyenne du marché international pendant le mois précédant la sortie", "Le prix fixé librement par l'entreprise", "Le coût de production", "Le prix de la dernière tonne vendue au village"], b: 0, e: "Définition de l'article 1er, point 55 bis." },
    { q: "Quel est le taux de la redevance pour les substances stratégiques ?", r: ["10 %", "3,5 %", "1 %", "0 %"], b: 0, e: "Article 241 littera g." },
    { q: "Quel est le taux pour le cuivre (métal non ferreux) ?", r: ["3,5 %", "10 %", "6 %", "1 %"], b: 0, e: "Article 241 littera d." },
    { q: "Quel est le taux pour les pierres précieuses ?", r: ["6 %", "3,5 %", "10 %", "1 %"], b: 0, e: "Article 241 littera f." },
    { q: "Quel est le taux pour les matériaux de construction d'usage courant ?", r: ["0 %", "1 %", "3,5 %", "10 %"], b: 0, e: "Article 241 littera a." },
    { q: "Quelle part de la redevance revient au pouvoir central selon l'article 242 ?", r: ["50 %", "25 %", "15 %", "10 %"], b: 0, e: "Les autres parts : province 25 %, ETD 15 %, FOMIN 10 %." },
    { q: "Quelle part revient à la province où se trouve le projet ?", r: ["25 %", "50 %", "15 %", "10 %"], b: 0, e: "Article 242." },
    { q: "Quelle part revient au Fonds minier pour les générations futures ?", r: ["10 %", "25 %", "50 %", "0 %"], b: 0, e: "Le FOMIN est prévu à l'article 8 bis." },
    { q: "Un camion de cobalt vaut 1 000 000 USD. Quelle redevance ?", r: ["100 000 USD", "35 000 USD", "10 000 USD", "300 000 USD"], b: 0, e: "10 % × 1 000 000 USD." },
    { q: "Quel est le taux de l'impôt sur les bénéfices et profits d'un titulaire minier ?", r: ["30 %", "50 %", "10 %", "3,5 %"], b: 0, e: "Article 247." },
    { q: "Quand parle-t-on de « superprofits » ?", r: ["Quand les cours dépassent de plus de 25 % ceux de l'étude de faisabilité", "Dès qu'une mine fait un bénéfice", "Quand l'entreprise embauche", "Quand le minerai est exporté"], b: 0, e: "Article 251 bis." },
    { q: "Quel est le taux de l'impôt spécial sur les superprofits ?", r: ["50 %", "30 %", "10 %", "100 %"], b: 0, e: "Article 251 bis." },
    { q: "Les dividendes versés aux actionnaires supportent l'impôt mobilier au taux de :", r: ["10 %", "30 %", "20 %", "0 %"], b: 0, e: "Article 246." },
    { q: "Une mine en perte doit-elle payer la redevance ?", r: ["Oui, car elle porte sur la valeur commerciale brute", "Non, jamais", "Seulement si elle le souhaite", "Seulement les années paires"], b: 0, e: "La redevance ne dépend pas du bénéfice." },
  ],
};

const MI5 = {
  id: "MI5", titre: "Communautés, environnement et droits humains", court: "Communautés et environnement", ico: "trees", col: "#15803D", duree: "30 min",
  resume: "Étude d'impact, certificat environnemental et réhabilitation, cahier des charges et dotation de 0,3 %, indemnisation des occupants du sol, zones interdites, réparation des dommages et droits humains.",
  blocs: [
    { type: "essentiel", texte: "Une mine transforme durablement son territoire. Avant d'exploiter, le titulaire fait approuver une **étude d'impact environnemental et social (EIES)** et un **plan de gestion (PGES)**, obtient un **certificat environnemental** et prévoit un **plan de réhabilitation** du site. Il signe un **cahier des charges** de responsabilité sociétale avec les communautés et constitue une **dotation d'au moins 0,3 % de son chiffre d'affaires** pour les projets de développement communautaire (art. 258 bis). Il **indemnise** les occupants privés de leurs terres et **répare** les dommages causés aux personnes et à l'environnement." },
    { type: "schema", kind: "animation", titre: "Caricature animée : la mine et le village", scene: "communaute", etapes: [
      { t: 0, texte: "La mine rejette des eaux polluées : la rivière du village se trouble, les champs souffrent." },
      { t: 4, texte: "La loi l'impose : étude d'impact (EIES), plan de gestion (PGES) et certificat environnemental." },
      { t: 8, texte: "Le titulaire signe un cahier des charges et consacre au moins 0,3 % de son chiffre d'affaires au développement communautaire." },
      { t: 11.5, texte: "École, centre de santé, eau potable : la richesse du sous-sol profite aussi aux riverains." },
    ] },
    { type: "schema", kind: "cartes", titre: "Les obligations du titulaire envers son territoire", cartes: [
      { ico: "file-analytics", t: "EIES et PGES", d: "Approuvés avant l'exploitation ; instruction par l'Agence congolaise de l'environnement et la direction de l'environnement minier." },
      { ico: "certificate", t: "Certificat environnemental", d: "Il remplace l'ancien « avis environnemental » depuis 2018." },
      { ico: "users-group", t: "Cahier des charges", d: "Négocié avec les communautés locales affectées, il définit la responsabilité sociétale du titulaire." },
      { ico: "coins", t: "Dotation de 0,3 %", d: "Au moins 0,3 % du chiffre d'affaires, mis à disposition des communautés avant la fin de l'exercice suivant." },
      { ico: "home-x", t: "Indemnisation", d: "Juste indemnité pour les occupants privés de la jouissance de leur sol ou dont la terre devient impropre à la culture." },
      { ico: "first-aid-kit", t: "Réparation", d: "Responsabilité pour la pollution des eaux, du sol et de l'air et pour les maladies imputables à l'activité minière." },
    ] },
    { type: "schema", kind: "tableau", titre: "Où l'on ne peut pas exploiter sans autorisation (exemples, art. 279)", entetes: ["Situation", "Règle"], lignes: [
      ["À moins de 800 mètres des limites d'un village, d'une cité, d'une commune ou d'une ville", "Travaux soumis à autorisation"],
      ["À moins de 500 mètres d'un barrage hydroélectrique ou d'un bâtiment de l'État", "Travaux soumis à autorisation"],
      ["Dans un parc national ou un site touristique", "Zone protégée"],
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : la dotation communautaire", situation: "Une mine réalise 200 millions USD de chiffre d'affaires. La direction propose d'utiliser la dotation communautaire pour… réhabiliter la route qui mène à sa propre usine, et d'appeler cela « un projet pour la communauté ».", options: [
      { l: "Financer la route de l'usine", pour: "Utile à l'entreprise et, accessoirement, aux habitants.", contre: "Détourne l'esprit de la dotation : les communautés n'ont pas choisi le projet." },
      { l: "Mettre au moins 600 000 USD à disposition des communautés pour les projets du cahier des charges", pour: "Respect de l'article 258 bis ; projets choisis avec les riverains (école, santé, eau).", contre: "Moins d'avantages directs pour l'entreprise." },
    ], question: "Combien représente au minimum la dotation ici, et qui doit en bénéficier ?", piste: "0,3 % de 200 millions USD, soit 600 000 USD au minimum, à mettre entièrement à disposition des communautés locales avant la fin de l'exercice suivant." },
    { type: "pieges", puces: [
      "Croire qu'une indemnité unique solde tout : la responsabilité pour pollution et maladies imputables à la mine demeure.",
      "Confondre dotation communautaire et mécénat libre : c'est une obligation légale chiffrée (au moins 0,3 % du chiffre d'affaires).",
      "Oublier la réhabilitation : le plan de financement doit prévoir la remise en état du site à la fermeture.",
      "Ignorer les droits humains : un site où sont constatées des violations des droits de l'enfant ou de la femme rend sa production illicite.",
    ] },
    { type: "articles", refs: [CODE + " : articles 71, 258 bis, 279, 281, 285 ter, 285 quater et 299 bis.", "Loi n° 11/009 du 9 juillet 2011 portant principes fondamentaux relatifs à la protection de l'environnement."] },
  ],
  narration: [
    "Ce module traite des communautés, de l'environnement et des droits humains.",
    "Avant d'exploiter, le titulaire fait approuver une étude d'impact environnemental et social, ainsi qu'un plan de gestion, et obtient un certificat environnemental. Il prévoit aussi la réhabilitation du site à la fermeture.",
    "Il signe un cahier des charges avec les communautés locales, et constitue une dotation d'au moins zéro virgule trois pour cent de son chiffre d'affaires pour des projets de développement communautaire.",
    "Les occupants privés de leurs terres ont droit à une juste indemnité. Et le titulaire répare les dommages causés par la pollution ou par les maladies imputables à l'activité minière.",
    "Certains lieux sont protégés : les abords des villages, des barrages et des bâtiments de l'État, ainsi que les parcs nationaux.",
  ],
  qcm: [
    { q: "Que doit faire approuver le titulaire avant d'exploiter ?", r: ["Une EIES et un PGES", "Un contrat de mariage", "Un permis de construire seul", "Rien de particulier"], b: 0, e: "Étude d'impact environnemental et social et plan de gestion." },
    { q: "Depuis 2018, l'avis environnemental a été remplacé par :", r: ["Le certificat environnemental", "Une simple déclaration", "Une attestation du chef de village", "Rien"], b: 0, e: "Une des innovations de la loi de 2018." },
    { q: "Quel est le montant minimal de la dotation pour les projets de développement communautaire ?", r: ["0,3 % du chiffre d'affaires", "3 % du bénéfice", "1 000 USD par an", "10 % de la redevance"], b: 0, e: "Article 258 bis." },
    { q: "Avant quand la dotation doit-elle être mise à disposition des communautés ?", r: ["Avant l'expiration de l'exercice suivant celui où elle est constituée", "Dans les 30 ans", "Jamais, elle reste à l'entreprise", "Le jour même"], b: 0, e: "Article 258 bis." },
    { q: "Pour un chiffre d'affaires de 200 millions USD, la dotation minimale est de :", r: ["600 000 USD", "6 000 000 USD", "60 000 USD", "200 000 USD"], b: 0, e: "0,3 % × 200 000 000 USD." },
    { q: "Le cahier des charges de responsabilité sociétale est négocié avec :", r: ["Les communautés locales affectées", "Les concurrents", "Les seuls actionnaires", "Une ambassade étrangère"], b: 0, e: "Il fait partie des conditions d'octroi et de renouvellement." },
    { q: "Un paysan dont le champ devient impropre à la culture à cause de la mine a droit à :", r: ["Une juste indemnité", "Rien, le sous-sol est à l'État", "Un permis d'exploitation", "Une carte de négociant"], b: 0, e: "Article 281." },
    { q: "Le titulaire est-il responsable des maladies imputables à l'activité minière ?", r: ["Oui, il doit réparer le dommage", "Non, jamais", "Seulement si le malade est salarié", "Seulement à l'étranger"], b: 0, e: "Article 285 quater." },
    { q: "La pollution des eaux, du sol ou de l'air par une mine engage :", r: ["La responsabilité du titulaire", "Uniquement celle de l'État", "Celle des riverains", "Personne"], b: 0, e: "Article 285 ter : contamination directe ou indirecte." },
    { q: "À moins de combien de mètres des limites d'un village les travaux sont-ils soumis à autorisation ?", r: ["800 mètres", "50 mètres", "5 kilomètres", "10 mètres"], b: 0, e: "Article 279." },
    { q: "Peut-on exploiter librement dans un parc national ?", r: ["Non, c'est une zone protégée", "Oui, si le minerai est précieux", "Oui, la nuit", "Oui, avec l'accord d'un touriste"], b: 0, e: "Article 279." },
    { q: "Le plan de financement d'un Permis d'exploitation doit inclure :", r: ["Le plan de réhabilitation du site à sa fermeture", "Le budget des vacances", "La liste des clients", "Rien sur la fermeture"], b: 0, e: "Article 71 littera b." },
    { q: "Un site où une violation des droits de la femme est constatée par procès-verbal :", r: ["Rend illicite l'exploitation et le commerce de sa production", "N'a aucune conséquence", "Donne droit à une prime", "Devient une ZEA"], b: 0, e: "Article 299 bis." },
    { q: "La dotation communautaire est-elle un don facultatif ?", r: ["Non, c'est une obligation légale chiffrée", "Oui, totalement libre", "Oui, au choix du directeur", "Elle n'existe pas"], b: 0, e: "Elle est constituée en franchise de l'impôt sur les bénéfices." },
    { q: "Quel organisme instruit l'EIES avec la direction de l'environnement minier ?", r: ["L'Agence congolaise de l'environnement", "La Fédération congolaise de football", "La Poste", "La Banque mondiale"], b: 0, e: "Collaboration instituée par la loi de 2018." },
  ],
};

const MI6 = {
  id: "MI6", titre: "Transparence, contrôle et contenu local", court: "Transparence et contrôle", ico: "eye-check", col: "#6D28D9", duree: "30 min",
  resume: "La transparence obligatoire (contrats, paiements, propriétaires réels), l'ITIE, le FOMIN, la sous-traitance réservée aux sociétés congolaises, la transformation locale et le retrait des droits.",
  blocs: [
    { type: "essentiel", texte: "Le Code impose la **transparence** (art. 7 ter) : publication des revenus des exploitations et des transactions, des **statistiques** de production et de vente, des **contrats** et des **propriétaires réels** des actifs miniers. La RDC applique la norme de l'**ITIE**, qui compare ce que les entreprises déclarent payer et ce que l'État déclare recevoir. Le **contenu local** est renforcé : **sous-traitance réservée** aux sociétés à capitaux congolais majoritaires, **10 %** de capital congolais, obligation de **traiter et transformer** les substances sur le territoire. L'État peut **retirer** les droits du titulaire qui manque à ses obligations." },
    { type: "schema", kind: "animation", titre: "Caricature animée : tout sur la table", scene: "transparence", etapes: [
      { t: 0, texte: "Fini les accords secrets : contrats, paiements et propriétaires réels sortent des tiroirs." },
      { t: 3.5, texte: "Ils sont publiés : chaque citoyen peut savoir qui exploite quoi, et ce que l'État reçoit." },
      { t: 5.5, texte: "L'ITIE rapproche ce que les entreprises déclarent payer et ce que l'État déclare encaisser." },
      { t: 9, texte: "Contenu local : la sous-traitance minière est réservée aux sociétés à capitaux congolais majoritaires." },
    ] },
    { type: "schema", kind: "cartes", titre: "Ce que la transparence rend public", cartes: [
      { ico: "file-text", t: "Les contrats", d: "Contrats miniers et leurs avenants, pour que chacun connaisse les engagements des parties." },
      { ico: "cash", t: "Les paiements", d: "Revenus des exploitations et des transactions, données sur l'allocation des ressources." },
      { ico: "chart-bar", t: "Les statistiques", d: "Production et ventes par substance." },
      { ico: "user-search", t: "Les propriétaires réels", d: "Les personnes physiques qui contrôlent réellement les actifs miniers, derrière les sociétés écrans." },
    ] },
    { type: "schema", kind: "flux", titre: "Le contenu local, maillon par maillon", etapes: [
      { op: "1", l: "Capital", d: "Au moins 10 % détenus par des personnes physiques congolaises." },
      { op: "2", l: "Sous-traitance", d: "Réservée aux sociétés dont la majorité du capital est congolaise (loi n° 17/001 du 8 février 2017 sur la sous-traitance)." },
      { op: "3", l: "Transformation", d: "Engagement de traiter et transformer les substances minérales sur le territoire congolais." },
      { op: "4", l: "Siège social", d: "Bâtiment du siège social dans le chef-lieu de la province d'exploitation.", fort: true },
    ] },
    { type: "schema", kind: "dilemme", titre: "Cas pratique : le prête-nom", situation: "Une société étrangère veut obtenir un contrat de sous-traitance réservé aux entreprises congolaises. Elle propose à un cadre congolais d'inscrire 51 % des parts à son nom, contre une commission, tout en gardant le contrôle réel.", options: [
      { l: "Accepter d'être prête-nom", pour: "Commission immédiate.", contre: "Fraude à la loi sur la sous-traitance ; le propriétaire réel doit être déclaré ; risques pénaux et retrait des contrats." },
      { l: "Refuser et, si l'on veut investir, créer une vraie société congolaise", pour: "Respect de la loi ; création de valeur et d'emplois au Congo.", contre: "Demande un véritable investissement." },
    ], question: "Quelle règle de transparence rend ce montage risqué ?", piste: "La divulgation des propriétaires réels : la personne qui contrôle effectivement la société doit être connue, ce qui fait apparaître le prête-nom." },
    { type: "pieges", puces: [
      "Croire que les contrats miniers sont confidentiels : leur publication est une obligation de transparence.",
      "Confondre actionnaire inscrit et propriétaire réel : c'est la personne qui contrôle effectivement qui doit être déclarée.",
      "Penser que l'ITIE contrôle l'exploitation sur le terrain : elle rapproche surtout les paiements déclarés par les entreprises et les recettes déclarées par l'État.",
      "Oublier que le titulaire qui manque à ses obligations peut voir ses droits retirés et son périmètre récupéré.",
    ] },
    { type: "articles", refs: [CODE + " : articles 7 ter, 8 bis, 71 et 71 bis.", "Loi n° 17/001 du 8 février 2017 fixant les règles applicables à la sous-traitance dans le secteur privé.", "Norme de l'Initiative pour la transparence dans les industries extractives (ITIE)."] },
  ],
  narration: [
    "Ce dernier module traite de la transparence, du contrôle et du contenu local.",
    "Le Code impose de publier les revenus des exploitations, les statistiques de production et de vente, les contrats, et les propriétaires réels des actifs miniers.",
    "L'Initiative pour la transparence dans les industries extractives, l'ITIE, rapproche ce que les entreprises déclarent payer et ce que l'État déclare recevoir.",
    "Le contenu local est renforcé : au moins dix pour cent de capital congolais, une sous-traitance réservée aux sociétés à capitaux congolais majoritaires, et l'obligation de transformer les substances sur le territoire.",
    "Enfin, l'État peut retirer les droits du titulaire qui manque à ses obligations. La transparence protège à la fois l'État, les communautés et les investisseurs honnêtes.",
  ],
  qcm: [
    { q: "Que doit-on publier au titre de la transparence (art. 7 ter) ?", r: ["Les contrats, les revenus, les statistiques et les propriétaires réels", "Les adresses personnelles des mineurs", "Les mots de passe bancaires", "Rien du tout"], b: 0, e: "Définition de la transparence à l'article 1er et article 7 ter." },
    { q: "Que signifie « propriétaire réel » ?", r: ["La personne physique qui contrôle effectivement la société", "Le notaire de la société", "Le comptable", "Le premier client"], b: 0, e: "Derrière les sociétés écrans, c'est elle qui doit être déclarée." },
    { q: "Que fait principalement l'ITIE ?", r: ["Rapprocher les paiements déclarés par les entreprises et les recettes déclarées par l'État", "Octroyer les permis", "Fixer les cours mondiaux", "Embaucher les mineurs"], b: 0, e: "Initiative pour la transparence dans les industries extractives." },
    { q: "À qui est réservée la sous-traitance dans le secteur minier ?", r: ["Aux sociétés dont la majorité du capital est congolaise", "Aux sociétés étrangères uniquement", "À l'État seul", "À n'importe qui"], b: 0, e: "Innovation de 2018, en lien avec la loi sur la sous-traitance de 2017." },
    { q: "Quelle loi régit la sous-traitance dans le secteur privé ?", r: ["La loi n° 17/001 du 8 février 2017", "La loi n° 015/2002", "La loi n° 09/001", "La loi n° 18/001"], b: 0, e: "Elle fixe les règles applicables à la sous-traitance." },
    { q: "Inscrire des parts à son nom pour le compte d'un étranger qui garde le contrôle, c'est :", r: ["Servir de prête-nom, une fraude", "Un investissement normal", "Une obligation légale", "Une forme de mécénat"], b: 0, e: "La déclaration des propriétaires réels permet de le détecter." },
    { q: "Le Code oblige le titulaire d'un Permis d'exploitation à :", r: ["S'engager à traiter et transformer les substances sur le territoire congolais", "Exporter tout le minerai brut", "Fermer la mine après 5 ans", "Ne jamais publier ses chiffres"], b: 0, e: "Article 69 littera h." },
    { q: "Où doit se trouver le bâtiment du siège social d'une société minière ?", r: ["Dans le chef-lieu de la province d'exploitation", "Obligatoirement à l'étranger", "Dans n'importe quel pays", "Dans la capitale d'un pays voisin"], b: 0, e: "Une des innovations de la loi de 2018." },
    { q: "Comment est alimenté le Fonds minier pour les générations futures ?", r: ["Par une quotité de la redevance minière", "Par les amendes de la route", "Par les dons des touristes", "Par l'impôt sur les véhicules"], b: 0, e: "Article 8 bis ; 10 % selon l'article 242." },
    { q: "Qui crée et organise le FOMIN ?", r: ["Un décret du Premier ministre délibéré en Conseil des ministres", "Une société minière", "Une ONG étrangère", "Un chef coutumier"], b: 0, e: "Article 8 bis ; statuts fixés par décret en 2019." },
    { q: "Que risque un titulaire qui manque gravement à ses obligations ?", r: ["Le retrait de ses droits miniers", "Une simple remarque orale", "Une prime", "Rien"], b: 0, e: "La loi de 2018 précise le retrait des droits et la récupération du périmètre." },
    { q: "Pourquoi publier les contrats miniers ?", r: ["Pour que chacun connaisse les engagements des parties et puisse demander des comptes", "Pour aider les concurrents à copier", "Ce n'est pas utile", "Pour remplacer les impôts"], b: 0, e: "C'est la base de la redevabilité dans le secteur." },
    { q: "La transparence protège :", r: ["L'État, les communautés et les investisseurs honnêtes", "Uniquement les fraudeurs", "Personne", "Seulement les banques"], b: 0, e: "Elle réduit les risques de corruption et de détournement." },
    { q: "Quelle part minimale du capital doit être détenue par des Congolais ?", r: ["10 %", "51 %", "1 %", "100 %"], b: 0, e: "Article 71 bis." },
    { q: "La transparence inclut aussi :", r: ["Les données sur l'allocation des ressources provenant du secteur minier", "La vie privée des employés", "Les recettes de cuisine des cantines", "Les numéros de téléphone des ministres"], b: 0, e: "Définition de la transparence dans le Code révisé." },
  ],
};

export const MODULES_MINES = [MI1, MI2, MI3, MI4, MI5, MI6];
export const NB_Q_FINAL_MINES = 30;
