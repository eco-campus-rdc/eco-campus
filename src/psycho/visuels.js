// ══════════════════ TESTS PSYCHOTECHNIQUES VISUELS : SUITES LOGIQUES ET SCHÉMAS ══════════════════
// Questions dessinées (rendu : Schema.jsx), mêlées aux tests par niveau et proposées seules dans l'entraînement
// « Suites et schémas ». Même format que la banque du test (App.jsx › PSY_BANK) :
// { id, cat, niv, q, opts | libre, a, exp } + schema (dessin de l'énoncé) ; une option peut être un dessin
// ({ fig }, { domino }, { carte }) ou un texte.
//
// Figure : { f, n, r, p, m, pt }
//   f  : cercle | carre | triangle | losange | pentagone | hexagone | etoile | fleche | L | cadre
//   n  : nombre d'exemplaires (1 à 6) ; r : rotation en degrés, sens horaire (flèche à 0° : vers le haut)
//   p  : remplissage vide | plein | raye ; m : image miroir (forme L) ; pt : point dans un coin du cadre (0 à 3, sens horaire depuis en haut à gauche)
// Schémas : suite | matrice | intrus | miroir | dominos | cartes | roue | triangles | pyramide | engrenages

const F = (f, o = {}) => ({ f, ...o });
const fig = (f, o) => ({ fig: F(f, o) });
const dom = (a, b) => ({ domino: [a, b] });
const carte = (v, c) => ({ carte: { v, c } });

export const CATS_VISUELLES = [
  { id: "mat", label: "Matrices", ico: "grid-dots", col: "#0EA5E9" },
  { id: "num", label: "Schémas de nombres", ico: "chart-pie-2", col: "#84CC16" },
  { id: "meca", label: "Engrenages et mécanique", ico: "settings", col: "#E11D48" },
];

export const PSY_VISUELS = [
  // ═════════ FACILE ═════════
  { id: "vi_f1", cat: "fig", niv: "facile", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("cercle"), F("triangle"), F("cercle"), F("triangle"), null] },
    opts: [fig("cercle"), fig("triangle"), fig("carre"), fig("losange")], a: 0, exp: "La suite alterne cercle et triangle : après un triangle vient un cercle." },
  { id: "vi_f2", cat: "fig", niv: "facile", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("cercle", { n: 1 }), F("cercle", { n: 2 }), F("cercle", { n: 3 }), null] },
    opts: [fig("cercle", { n: 3 }), fig("cercle", { n: 4 }), fig("cercle", { n: 5 }), fig("carre", { n: 4 })], a: 1, exp: "On ajoute un cercle à chaque étape : 1, 2, 3, puis 4." },
  { id: "vi_f3", cat: "fig", niv: "facile", q: "La flèche tourne toujours de la même façon. Où pointe-t-elle ensuite ?",
    schema: { t: "suite", items: [F("fleche", { r: 0 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), null] },
    opts: [fig("fleche", { r: 0 }), fig("fleche", { r: 90 }), fig("fleche", { r: 180 }), fig("fleche", { r: 270 })], a: 3, exp: "Un quart de tour dans le sens des aiguilles d'une montre à chaque fois : haut, droite, bas, puis gauche." },
  { id: "vi_f4", cat: "fig", niv: "facile", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("carre", { p: "vide" }), F("carre", { p: "plein" }), F("carre", { p: "vide" }), F("carre", { p: "plein" }), null] },
    opts: [fig("carre", { p: "vide" }), fig("carre", { p: "plein" }), fig("carre", { p: "raye" }), fig("cercle", { p: "vide" })], a: 0, exp: "Le carré est tour à tour vide puis plein : le suivant est vide." },
  { id: "vi_f5", cat: "fig", niv: "facile", q: "Quelle figure est l'intrus ?",
    schema: { t: "intrus", items: [F("triangle"), F("triangle", { r: 180 }), F("carre"), F("triangle", { r: 90 })] },
    opts: ["Figure A", "Figure B", "Figure C", "Figure D"], a: 2, exp: "Toutes les figures sont des triangles, sauf la C, qui est un carré." },
  { id: "vi_f6", cat: "fig", niv: "facile", q: "Quelle est l'image de la flèche dans le miroir (axe en pointillés) ?",
    schema: { t: "miroir", item: F("fleche", { r: 90 }) },
    opts: [fig("fleche", { r: 90 }), fig("fleche", { r: 270 }), fig("fleche", { r: 0 }), fig("fleche", { r: 180 })], a: 1, exp: "Un miroir vertical inverse la gauche et la droite : la flèche qui pointe à droite pointe à gauche dans le miroir." },
  { id: "vi_f7", cat: "mat", niv: "facile", q: "Quelle figure manque dans le tableau ?",
    schema: { t: "matrice", cells: [F("cercle", { p: "vide" }), F("cercle", { p: "plein" }), F("cercle", { p: "raye" }), F("carre", { p: "vide" }), F("carre", { p: "plein" }), F("carre", { p: "raye" }), F("triangle", { p: "vide" }), F("triangle", { p: "plein" }), null] },
    opts: [fig("triangle", { p: "plein" }), fig("triangle", { p: "raye" }), fig("carre", { p: "raye" }), fig("triangle", { p: "vide" })], a: 1, exp: "Chaque ligne garde sa forme (cercle, carré, triangle) ; chaque colonne garde son remplissage (vide, plein, rayé). Il manque un triangle rayé." },
  { id: "vi_f8", cat: "dominos", niv: "facile", q: "Quel domino continue la suite ?",
    schema: { t: "dominos", items: [[1, 2], [2, 3], [3, 4], null] },
    opts: [dom(4, 5), dom(5, 4), dom(4, 4), dom(3, 5)], a: 0, exp: "Chaque moitié augmente de 1 : la suivante est 4 | 5." },
  { id: "vi_f9", cat: "dominos", niv: "facile", q: "Quelle carte continue la suite ?",
    schema: { t: "cartes", items: [{ v: "2", c: "♥" }, { v: "4", c: "♥" }, { v: "6", c: "♥" }, null] },
    opts: [carte("8", "♥"), carte("7", "♥"), carte("8", "♠"), carte("10", "♥")], a: 0, exp: "Les valeurs augmentent de 2 et la couleur reste cœur : 8 de cœur." },
  { id: "vi_f10", cat: "num", niv: "facile", q: "Les nombres de la roue se suivent dans le sens des aiguilles d'une montre. Lequel manque ?",
    schema: { t: "roue", items: [2, 4, 6, 8, null, 12] },
    opts: ["9", "10", "11", "14"], a: 1, exp: "On ajoute 2 à chaque secteur : 8 + 2 = 10, puis 12." },
  { id: "vi_f11", cat: "meca", niv: "facile", q: "La roue A tourne dans le sens des aiguilles d'une montre. Dans quel sens tourne la roue B ?",
    schema: { t: "engrenages", roues: [{ x: 70, y: 60, r: 40 }, { x: 150, y: 60, r: 40 }], sens: "h" },
    opts: ["Dans le même sens que A", "En sens inverse de A", "Elle ne tourne pas", "On ne peut pas savoir"], a: 1, exp: "Deux engrenages qui s'engrènent tournent toujours en sens inverse l'un de l'autre." },
  { id: "vi_f12", cat: "fig", niv: "facile", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("etoile", { n: 4 }), F("etoile", { n: 3 }), F("etoile", { n: 2 }), null] },
    opts: [fig("etoile", { n: 1 }), fig("etoile", { n: 2 }), fig("etoile", { n: 4 }), fig("cercle", { n: 1 })], a: 0, exp: "On retire une étoile à chaque étape : 4, 3, 2, puis 1." },

  // ═════════ MOYEN ═════════
  { id: "vi_m1", cat: "fig", niv: "moyen", q: "Le point se déplace dans le cadre. Où sera-t-il ensuite ?",
    schema: { t: "suite", items: [F("cadre", { pt: 0 }), F("cadre", { pt: 1 }), F("cadre", { pt: 2 }), null] },
    opts: [fig("cadre", { pt: 0 }), fig("cadre", { pt: 1 }), fig("cadre", { pt: 2 }), fig("cadre", { pt: 3 })], a: 3, exp: "Le point fait le tour des coins dans le sens des aiguilles d'une montre : en haut à gauche, en haut à droite, en bas à droite, puis en bas à gauche." },
  { id: "vi_m2", cat: "fig", niv: "moyen", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("triangle"), F("carre"), F("pentagone"), null] },
    opts: [fig("hexagone"), fig("triangle"), fig("cercle"), fig("losange")], a: 0, exp: "Le nombre de côtés augmente de 1 : 3, 4, 5, puis 6 (hexagone)." },
  { id: "vi_m3", cat: "fig", niv: "moyen", q: "La flèche tourne d'un huitième de tour à chaque étape. Quelle est la suivante ?",
    schema: { t: "suite", items: [F("fleche", { r: 0 }), F("fleche", { r: 45 }), F("fleche", { r: 90 }), F("fleche", { r: 135 }), null] },
    opts: [fig("fleche", { r: 180 }), fig("fleche", { r: 225 }), fig("fleche", { r: 0 }), fig("fleche", { r: 90 })], a: 0, exp: "45° de plus à chaque fois : après 135° vient 180°, la flèche pointe vers le bas." },
  { id: "vi_m4", cat: "mat", niv: "moyen", q: "Quelle case complète le tableau ?",
    schema: { t: "matrice", cells: [F("cercle", { n: 1 }), F("cercle", { n: 2 }), F("cercle", { n: 3 }), F("carre", { n: 1 }), F("carre", { n: 2 }), null, F("triangle", { n: 1 }), F("triangle", { n: 2 }), F("triangle", { n: 3 })] },
    opts: [fig("carre", { n: 3 }), fig("carre", { n: 2 }), fig("cercle", { n: 3 }), fig("triangle", { n: 3 })], a: 0, exp: "Chaque ligne garde sa forme ; chaque colonne a le même nombre de figures (1, 2, 3). Il manque trois carrés." },
  { id: "vi_m5", cat: "mat", niv: "moyen", q: "Quelle flèche manque ?",
    schema: { t: "matrice", cells: [F("fleche", { r: 0 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), F("fleche", { r: 270 }), F("fleche", { r: 180 }), F("fleche", { r: 270 }), null] },
    opts: [fig("fleche", { r: 0 }), fig("fleche", { r: 90 }), fig("fleche", { r: 180 }), fig("fleche", { r: 270 })], a: 0, exp: "Dans chaque ligne, la flèche tourne d'un quart de tour vers la droite : 180°, 270°, puis 360° = 0° (vers le haut)." },
  { id: "vi_m6", cat: "fig", niv: "moyen", q: "Quelle figure est l'intrus ?",
    schema: { t: "intrus", items: [F("carre"), F("losange"), F("hexagone"), F("pentagone")] },
    opts: ["Figure A", "Figure B", "Figure C", "Figure D"], a: 3, exp: "Le carré, le losange et l'hexagone ont un nombre pair de côtés (4, 4, 6) ; le pentagone en a 5." },
  { id: "vi_m7", cat: "dominos", niv: "moyen", q: "Quel domino continue la suite ?",
    schema: { t: "dominos", items: [[1, 6], [2, 5], [3, 4], null] },
    opts: [dom(4, 3), dom(4, 5), dom(3, 3), dom(5, 2)], a: 0, exp: "La moitié gauche augmente de 1, la droite diminue de 1 ; le total reste 7 : 4 | 3." },
  { id: "vi_m8", cat: "dominos", niv: "moyen", q: "Quelle carte continue la suite ?",
    schema: { t: "cartes", items: [{ v: "3", c: "♣" }, { v: "5", c: "♦" }, { v: "7", c: "♣" }, null] },
    opts: [carte("9", "♦"), carte("9", "♣"), carte("8", "♦"), carte("11", "♦")], a: 0, exp: "Les valeurs augmentent de 2 et les couleurs alternent trèfle et carreau : 9 de carreau." },
  { id: "vi_m9", cat: "num", niv: "moyen", q: "Dans cette roue, les nombres opposés obéissent à la même règle. Quel nombre manque ?",
    schema: { t: "roue", items: [3, 2, 6, 7, 8, null] },
    opts: ["4", "5", "6", "10"], a: 0, exp: "Les nombres face à face totalisent 10 : 3 et 7, 2 et 8, 6 et 4." },
  { id: "vi_m10", cat: "num", niv: "moyen", q: "Le nombre au centre de chaque triangle se calcule avec ses trois coins. Quel nombre manque ?",
    schema: { t: "triangles", items: [[2, 3, 4, 9], [1, 5, 2, 8], [3, 3, null, 10]] },
    opts: ["3", "4", "5", "6"], a: 1, exp: "Le centre est la somme des coins : 3 + 3 + 4 = 10." },
  { id: "vi_m11", cat: "meca", niv: "moyen", q: "La roue A tourne dans le sens des aiguilles d'une montre. Dans quel sens tourne la roue C ?",
    schema: { t: "engrenages", roues: [{ x: 50, y: 60, r: 34 }, { x: 118, y: 60, r: 34 }, { x: 186, y: 60, r: 34 }], sens: "h" },
    opts: ["Dans le sens des aiguilles d'une montre", "Dans le sens inverse", "Elle ne tourne pas", "Elle tourne dans les deux sens"], a: 0, exp: "A et B tournent en sens inverse, B et C aussi : C tourne donc comme A." },
  { id: "vi_m12", cat: "fig", niv: "moyen", q: "Quelle est l'image de la flèche dans le miroir (axe en pointillés) ?",
    schema: { t: "miroir", item: F("fleche", { r: 45 }) },
    opts: [fig("fleche", { r: 45 }), fig("fleche", { r: 315 }), fig("fleche", { r: 135 }), fig("fleche", { r: 225 })], a: 1, exp: "La flèche pointe en haut à droite ; dans un miroir vertical, elle pointe en haut à gauche." },

  // ═════════ DIFFICILE ═════════
  { id: "vi_d1", cat: "fig", niv: "difficile", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("cercle", { p: "vide" }), F("carre", { p: "raye" }), F("cercle", { p: "plein" }), F("carre", { p: "vide" }), null] },
    opts: [fig("cercle", { p: "raye" }), fig("cercle", { p: "plein" }), fig("carre", { p: "raye" }), fig("cercle", { p: "vide" })], a: 0, exp: "Deux règles : la forme alterne cercle et carré ; le remplissage suit le cycle vide, rayé, plein. Le 5e est un cercle rayé." },
  { id: "vi_d2", cat: "fig", niv: "difficile", q: "La flèche tourne de 45°, puis 90°, puis 45°, puis 90°… Quelle est la suivante ?",
    schema: { t: "suite", items: [F("fleche", { r: 0 }), F("fleche", { r: 45 }), F("fleche", { r: 135 }), F("fleche", { r: 180 }), null] },
    opts: [fig("fleche", { r: 270 }), fig("fleche", { r: 225 }), fig("fleche", { r: 315 }), fig("fleche", { r: 90 })], a: 0, exp: "Après +45° (180°), on ajoute 90° : 270°, la flèche pointe vers la gauche." },
  { id: "vi_d3", cat: "fig", niv: "difficile", q: "Le point avance d'un coin, puis de deux, puis d'un, puis de deux… Où sera-t-il ensuite ?",
    schema: { t: "suite", items: [F("cadre", { pt: 0 }), F("cadre", { pt: 1 }), F("cadre", { pt: 3 }), F("cadre", { pt: 0 }), null] },
    opts: [fig("cadre", { pt: 0 }), fig("cadre", { pt: 1 }), fig("cadre", { pt: 2 }), fig("cadre", { pt: 3 })], a: 2, exp: "Déplacements +1, +2, +1, +2 dans le sens des aiguilles d'une montre : du coin en haut à gauche, il avance de deux coins, en bas à droite." },
  { id: "vi_d4", cat: "mat", niv: "difficile", q: "Dans chaque ligne, la 3e case résulte des deux premières. Quelle case manque ?",
    schema: { t: "matrice", cells: [F("losange", { n: 1 }), F("losange", { n: 2 }), F("losange", { n: 3 }), F("cercle", { n: 2 }), F("cercle", { n: 1 }), F("cercle", { n: 3 }), F("hexagone", { n: 1 }), F("hexagone", { n: 1 }), null] },
    opts: [fig("hexagone", { n: 2 }), fig("hexagone", { n: 1 }), fig("hexagone", { n: 3 }), fig("losange", { n: 2 })], a: 0, exp: "Le nombre de figures de la 3e case est la somme des deux premières : 1 + 1 = 2 hexagones." },
  { id: "vi_d5", cat: "mat", niv: "difficile", q: "Quelle figure manque dans le tableau ?",
    schema: { t: "matrice", cells: [F("cercle", { p: "vide" }), F("carre", { p: "plein" }), F("triangle", { p: "raye" }), F("cercle", { p: "plein" }), F("carre", { p: "raye" }), F("triangle", { p: "vide" }), F("cercle", { p: "raye" }), F("carre", { p: "vide" }), null] },
    opts: [fig("triangle", { p: "plein" }), fig("triangle", { p: "vide" }), fig("triangle", { p: "raye" }), fig("carre", { p: "plein" })], a: 0, exp: "Chaque colonne garde sa forme ; chaque ligne et chaque colonne contiennent une fois vide, plein et rayé. Il manque un triangle plein." },
  { id: "vi_d6", cat: "fig", niv: "difficile", q: "Quelle case est l'intrus ?",
    schema: { t: "intrus", items: [F("triangle", { n: 3 }), F("carre", { n: 4 }), F("hexagone", { n: 2 }), F("pentagone", { n: 5 })] },
    opts: ["Figure A", "Figure B", "Figure C", "Figure D"], a: 2, exp: "Le nombre de figures est égal au nombre de côtés (3 triangles, 4 carrés, 5 pentagones), sauf en C : 2 hexagones au lieu de 6." },
  { id: "vi_d7", cat: "dominos", niv: "difficile", q: "Valeurs de 0 à 6, en boucle (après 6 vient 0). Quel domino continue la suite ?",
    schema: { t: "dominos", items: [[2, 4], [3, 6], [4, 1], null] },
    opts: [dom(5, 3), dom(5, 2), dom(5, 0), dom(4, 3)], a: 0, exp: "La moitié droite est le double de la gauche, en boucle sur 0 à 6 : 5 × 2 = 10, soit 3 après un tour complet (10 − 7)." },
  { id: "vi_d8", cat: "dominos", niv: "difficile", q: "Quelle carte continue la suite ?",
    schema: { t: "cartes", items: [{ v: "10", c: "♥" }, { v: "8", c: "♠" }, { v: "6", c: "♥" }, { v: "4", c: "♠" }, null] },
    opts: [carte("2", "♥"), carte("2", "♠"), carte("3", "♥"), carte("As", "♥")], a: 0, exp: "Les valeurs baissent de 2 et les couleurs alternent cœur et pique : 2 de cœur." },
  { id: "vi_d9", cat: "num", niv: "difficile", libre: true, q: "Chaque nombre de la roue est la somme des deux précédents (sens des aiguilles d'une montre). Quel nombre manque ?",
    schema: { t: "roue", items: [1, 1, 2, 3, 5, null] }, a: "8", exp: "3 + 5 = 8 (suite de Fibonacci)." },
  { id: "vi_d10", cat: "num", niv: "difficile", libre: true, q: "Chaque brique est la somme des deux briques qui la portent. Quel nombre va au sommet ?",
    schema: { t: "pyramide", rangs: [[null], [5, 8], [2, 3, 5]] }, a: "13", exp: "2 + 3 = 5 et 3 + 5 = 8, puis 5 + 8 = 13." },
  { id: "vi_d11", cat: "num", niv: "difficile", q: "Le centre se calcule avec les coins, toujours de la même façon. Quel nombre manque ?",
    schema: { t: "triangles", items: [[1, 2, 3, 9], [2, 2, 2, 8], [3, 1, 2, null]] },
    opts: ["6", "7", "8", "9"], a: 2, exp: "Centre = (coin du haut + coin de gauche) × coin de droite : (1 + 2) × 3 = 9, (2 + 2) × 2 = 8, (3 + 1) × 2 = 8." },
  { id: "vi_d12", cat: "meca", niv: "difficile", q: "La roue A tourne dans le sens des aiguilles d'une montre. Dans quel sens tourne la roue D ?",
    schema: { t: "engrenages", roues: [{ x: 38, y: 50, r: 28 }, { x: 94, y: 50, r: 28 }, { x: 150, y: 50, r: 28 }, { x: 206, y: 50, r: 28 }], sens: "h" },
    opts: ["Dans le sens des aiguilles d'une montre", "Dans le sens inverse", "Elle ne tourne pas", "Dans le même sens que C"], a: 1, exp: "Le sens s'inverse à chaque roue : A horaire, B inverse, C horaire, D inverse." },

  // ═════════ TRÈS DIFFICILE ═════════
  { id: "vi_t1", cat: "fig", niv: "tresdiff", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("fleche", { n: 1, r: 0 }), F("fleche", { n: 2, r: 90 }), F("fleche", { n: 3, r: 180 }), null] },
    opts: [fig("fleche", { n: 4, r: 270 }), fig("fleche", { n: 4, r: 0 }), fig("fleche", { n: 3, r: 270 }), fig("fleche", { n: 4, r: 90 })], a: 0, exp: "Deux règles : une flèche de plus à chaque étape, et un quart de tour vers la droite. Quatre flèches vers la gauche." },
  { id: "vi_t2", cat: "fig", niv: "tresdiff", q: "Quelle figure complète la suite ?",
    schema: { t: "suite", items: [F("hexagone", { p: "plein" }), F("pentagone", { p: "vide" }), F("carre", { p: "plein" }), null] },
    opts: [fig("triangle", { p: "vide" }), fig("triangle", { p: "plein" }), fig("carre", { p: "vide" }), fig("hexagone", { p: "vide" })], a: 0, exp: "Un côté de moins à chaque étape (6, 5, 4, puis 3) et le remplissage alterne plein et vide : triangle vide." },
  { id: "vi_t3", cat: "mat", niv: "tresdiff", q: "Dans chaque ligne, la 3e case résulte des deux premières. Quelle case manque ?",
    schema: { t: "matrice", cells: [F("carre", { n: 1 }), F("carre", { n: 2 }), F("carre", { n: 2 }), F("cercle", { n: 2 }), F("cercle", { n: 2 }), F("cercle", { n: 4 }), F("etoile", { n: 1 }), F("etoile", { n: 3 }), null] },
    opts: [fig("etoile", { n: 3 }), fig("etoile", { n: 4 }), fig("etoile", { n: 2 }), fig("cercle", { n: 3 })], a: 0, exp: "Le nombre de figures de la 3e case est le produit des deux premières : 1 × 2 = 2, 2 × 2 = 4, 1 × 3 = 3." },
  { id: "vi_t4", cat: "mat", niv: "tresdiff", q: "Quelle flèche manque ?",
    schema: { t: "matrice", cells: [F("fleche", { r: 0 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), F("fleche", { r: 45 }), F("fleche", { r: 135 }), F("fleche", { r: 225 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), null] },
    opts: [fig("fleche", { r: 270 }), fig("fleche", { r: 225 }), fig("fleche", { r: 315 }), fig("fleche", { r: 0 })], a: 0, exp: "Chaque ligne tourne d'un quart de tour à chaque case ; la 3e ligne part de 90° : 90°, 180°, 270°." },
  { id: "vi_t5", cat: "dominos", niv: "tresdiff", q: "Valeurs de 0 à 6, en boucle. Quel domino continue la suite ?",
    schema: { t: "dominos", items: [[6, 1], [4, 3], [2, 5], null] },
    opts: [dom(0, 0), dom(0, 6), dom(1, 0), dom(2, 0)], a: 0, exp: "La gauche perd 2 (6, 4, 2, 0) ; la droite gagne 2 (1, 3, 5, puis 7, soit 0 en boucle) : 0 | 0." },
  { id: "vi_t6", cat: "dominos", niv: "tresdiff", q: "Quelle carte continue la suite ? (Valet = 11, Dame = 12, Roi = 13)",
    schema: { t: "cartes", items: [{ v: "2", c: "♠" }, { v: "3", c: "♥" }, { v: "5", c: "♦" }, { v: "8", c: "♣" }, null] },
    opts: [carte("R", "♠"), carte("D", "♠"), carte("10", "♠"), carte("R", "♥")], a: 0, exp: "Chaque valeur est la somme des deux précédentes : 5 + 8 = 13, le Roi. Les couleurs suivent le cycle pique, cœur, carreau, trèfle : on revient à pique." },
  { id: "vi_t7", cat: "fig", niv: "tresdiff", q: "Quatre figures sont la même forme tournée ; l'une est retournée comme dans un miroir. Laquelle ?",
    schema: { t: "intrus", items: [F("L", { r: 0 }), F("L", { r: 90 }), F("L", { r: 180, m: true }), F("L", { r: 270 })] },
    opts: ["Figure A", "Figure B", "Figure C", "Figure D"], a: 2, exp: "A, B et D sont la même forme en L tournée ; C est son image dans un miroir : aucune rotation ne permet de la superposer aux autres." },
  { id: "vi_t8", cat: "num", niv: "tresdiff", libre: true, q: "Quel nombre manque dans la roue (sens des aiguilles d'une montre) ?",
    schema: { t: "roue", items: [2, 3, 5, 9, 17, null] }, a: "33", exp: "Chaque nombre est le double du précédent moins 1 : 17 × 2 − 1 = 33." },
  { id: "vi_t9", cat: "meca", niv: "tresdiff", q: "La roue A a 30 dents, la roue B en a 10. Quand A fait un tour complet, combien de tours fait B ?",
    schema: { t: "engrenages", roues: [{ x: 80, y: 62, r: 54, dents: 30, label: "A · 30 dents" }, { x: 156, y: 62, r: 22, dents: 10, label: "B · 10 dents" }], sens: "h" },
    opts: ["3 tours", "1 tour", "1/3 de tour", "10 tours"], a: 0, exp: "A fait passer 30 dents ; B en a 10 : elle fait 30 ÷ 10 = 3 tours." },
  { id: "vi_t10", cat: "meca", niv: "tresdiff", q: "Trois roues dentées se touchent deux à deux. Si l'on tourne A, que se passe-t-il ?",
    schema: { t: "engrenages", roues: [{ x: 80, y: 48, r: 32 }, { x: 144, y: 48, r: 32 }, { x: 112, y: 103, r: 32 }], sens: "h" },
    opts: ["Les roues sont bloquées", "Toutes tournent dans le même sens", "B et C tournent en sens inverse de A", "Seule C tourne"], a: 0, exp: "B devrait tourner en sens inverse de A, C en sens inverse de B, donc comme A… mais C touche aussi A et devrait tourner à l'inverse : c'est impossible, l'ensemble est bloqué." },
  { id: "vi_t11", cat: "num", niv: "tresdiff", libre: true, q: "Chaque brique est la somme des deux briques qui la portent. Quel nombre manque à la base ?",
    schema: { t: "pyramide", rangs: [[30], [14, 16], [4, null, 6]] }, a: "10", exp: "La brique du milieu de la base vaut 10 : 4 + 10 = 14, 10 + 6 = 16 et 14 + 16 = 30." },
  { id: "vi_t12", cat: "num", niv: "tresdiff", q: "Le centre se calcule avec les coins, toujours de la même façon. Quel nombre manque ?",
    schema: { t: "triangles", items: [[3, 4, 2, 10], [5, 2, 3, 7], [6, 3, null, 14]] },
    opts: ["2", "3", "4", "5"], a: 2, exp: "Centre = coin du haut × coin de gauche − coin de droite : 3 × 4 − 2 = 10, 5 × 2 − 3 = 7, 6 × 3 − 4 = 14." },

  // ═════════ EXPERT ═════════
  { id: "vi_e1", cat: "fig", niv: "expert", q: "Le point avance d'un coin, puis de deux, puis de trois, puis de quatre… Où sera-t-il ensuite ?",
    schema: { t: "suite", items: [F("cadre", { pt: 0 }), F("cadre", { pt: 1 }), F("cadre", { pt: 3 }), F("cadre", { pt: 2 }), null] },
    opts: [fig("cadre", { pt: 0 }), fig("cadre", { pt: 1 }), fig("cadre", { pt: 2 }), fig("cadre", { pt: 3 })], a: 2, exp: "Avancer de 4 coins, c'est faire un tour complet : le point revient où il était, en bas à droite." },
  { id: "vi_e2", cat: "fig", niv: "expert", q: "La flèche tourne de 30°, puis 60°, puis 90°… Quelle est la suivante ?",
    schema: { t: "suite", items: [F("fleche", { r: 0 }), F("fleche", { r: 30 }), F("fleche", { r: 90 }), F("fleche", { r: 180 }), null] },
    opts: [fig("fleche", { r: 300 }), fig("fleche", { r: 270 }), fig("fleche", { r: 330 }), fig("fleche", { r: 0 })], a: 0, exp: "Les rotations augmentent de 30° à chaque étape : +30, +60, +90, puis +120. 180° + 120° = 300°." },
  { id: "vi_e3", cat: "mat", niv: "expert", q: "Quelle case complète le tableau ?",
    schema: { t: "matrice", cells: [F("cercle", { n: 1 }), F("carre", { n: 2 }), F("triangle", { n: 3 }), F("carre", { n: 3 }), F("triangle", { n: 1 }), F("cercle", { n: 2 }), F("triangle", { n: 2 }), null, F("carre", { n: 1 })] },
    opts: [fig("cercle", { n: 3 }), fig("cercle", { n: 2 }), fig("carre", { n: 3 }), fig("triangle", { n: 3 })], a: 0, exp: "Chaque ligne et chaque colonne contiennent une fois le cercle, le carré et le triangle, et une fois 1, 2 et 3 figures. Il manque trois cercles." },
  { id: "vi_e4", cat: "mat", niv: "expert", q: "Quelle flèche manque ?",
    schema: { t: "matrice", cells: [F("fleche", { r: 0, p: "vide" }), F("fleche", { r: 90, p: "vide" }), F("fleche", { r: 180, p: "vide" }), F("fleche", { r: 0, p: "raye" }), F("fleche", { r: 90, p: "raye" }), F("fleche", { r: 180, p: "raye" }), F("fleche", { r: 0, p: "plein" }), F("fleche", { r: 90, p: "plein" }), null] },
    opts: [fig("fleche", { r: 180, p: "plein" }), fig("fleche", { r: 180, p: "raye" }), fig("fleche", { r: 270, p: "plein" }), fig("fleche", { r: 0, p: "plein" })], a: 0, exp: "La colonne fixe la direction (haut, droite, bas) et la ligne fixe le remplissage (vide, rayé, plein) : flèche pleine vers le bas." },
  { id: "vi_e5", cat: "dominos", niv: "expert", q: "Valeurs de 0 à 6, en boucle. Quel domino continue la suite ?",
    schema: { t: "dominos", items: [[5, 0], [4, 2], [3, 4], [2, 6], null] },
    opts: [dom(1, 1), dom(1, 6), dom(2, 1), dom(1, 0)], a: 0, exp: "La gauche perd 1 (5, 4, 3, 2, 1) ; la droite gagne 2 (0, 2, 4, 6, puis 8, soit 1 en boucle) : 1 | 1." },
  { id: "vi_e6", cat: "dominos", niv: "expert", q: "Quelle carte continue la suite ? (Valet = 11, Dame = 12, Roi = 13)",
    schema: { t: "cartes", items: [{ v: "R", c: "♠" }, { v: "D", c: "♥" }, { v: "10", c: "♠" }, { v: "7", c: "♥" }, null] },
    opts: [carte("3", "♠"), carte("3", "♥"), carte("4", "♠"), carte("2", "♠")], a: 0, exp: "Les écarts grandissent : −1, −2, −3, puis −4. 7 − 4 = 3 ; la couleur alterne pique et cœur : 3 de pique." },
  { id: "vi_e7", cat: "fig", niv: "expert", q: "Quatre figures sont la même forme tournée ; l'une est différente. Laquelle ?",
    schema: { t: "intrus", items: [F("L", { r: 90, m: true }), F("L", { r: 270, m: true }), F("L", { r: 0, m: true }), F("L", { r: 180 })] },
    opts: ["Figure A", "Figure B", "Figure C", "Figure D"], a: 3, exp: "A, B et C sont la même forme retournée, tournée de 90°, 270° et 0°. D n'est pas retournée : c'est l'intrus." },
  { id: "vi_e8", cat: "num", niv: "expert", libre: true, q: "Quel nombre manque dans la roue (sens des aiguilles d'une montre) ?",
    schema: { t: "roue", items: [0, 3, 8, 15, 24, null] }, a: "35", exp: "Ce sont les carrés moins 1 : 1 − 1, 4 − 1, 9 − 1, 16 − 1, 25 − 1, puis 36 − 1 = 35." },
  { id: "vi_e9", cat: "meca", niv: "expert", q: "La roue A (40 dents) fait 3 tours. Combien de tours fait la roue B (24 dents) ?",
    schema: { t: "engrenages", roues: [{ x: 78, y: 62, r: 50, dents: 40, label: "A · 40 dents" }, { x: 160, y: 62, r: 32, dents: 24, label: "B · 24 dents" }], sens: "h" },
    opts: ["5 tours", "3 tours", "1,8 tour", "8 tours"], a: 0, exp: "3 tours de A font passer 3 × 40 = 120 dents ; 120 ÷ 24 = 5 tours de B." },
  { id: "vi_e10", cat: "meca", niv: "expert", q: "La roue A tourne dans le sens des aiguilles d'une montre. Dans quel sens tourne la roue F ?",
    schema: { t: "engrenages", roues: [{ x: 26, y: 50, r: 21 }, { x: 68, y: 50, r: 21 }, { x: 110, y: 50, r: 21 }, { x: 152, y: 50, r: 21 }, { x: 194, y: 50, r: 21 }, { x: 236, y: 50, r: 21 }], sens: "h" },
    opts: ["Dans le sens inverse de A", "Dans le même sens que A", "Elle ne tourne pas", "Comme la roue B, mais plus vite"], a: 0, exp: "Le sens change à chaque roue : les roues de rang pair (B, D, F) tournent en sens inverse de A." },
  { id: "vi_e11", cat: "num", niv: "expert", libre: true, q: "Chaque brique est la somme des deux briques qui la portent. Quel nombre va au sommet ?",
    schema: { t: "pyramide", rangs: [[null], [8, 12], [3, 5, 7], [1, 2, 3, 4]] }, a: "20", exp: "Base 1, 2, 3, 4 → 3, 5, 7 → 8, 12 → 20." },
  { id: "vi_e12", cat: "num", niv: "expert", q: "Le centre se calcule avec les coins, toujours de la même façon. Quel nombre manque ?",
    schema: { t: "triangles", items: [[1, 2, 3, 14], [2, 2, 1, 9], [3, 1, 2, null]] },
    opts: ["12", "13", "14", "15"], a: 2, exp: "Centre = somme des carrés des coins : 1 + 4 + 9 = 14, 4 + 4 + 1 = 9, 9 + 1 + 4 = 14." },
];

// Description d'une option dessinée (correction et lecteurs d'écran)
const NOMS = { cercle: ["cercle", "cercles"], carre: ["carré", "carrés"], triangle: ["triangle", "triangles"], losange: ["losange", "losanges"], pentagone: ["pentagone", "pentagones"], hexagone: ["hexagone", "hexagones"], etoile: ["étoile", "étoiles"], fleche: ["flèche", "flèches"], L: ["forme en L", "formes en L"], cadre: ["cadre", "cadres"] };
const DIR = { 0: "vers le haut", 45: "en haut à droite", 90: "vers la droite", 135: "en bas à droite", 180: "vers le bas", 225: "en bas à gauche", 270: "vers la gauche", 315: "en haut à gauche" };
const COINS = ["en haut à gauche", "en haut à droite", "en bas à droite", "en bas à gauche"];
const REMP = { plein: "plein", raye: "rayé", vide: "vide" };
export function decrire(o) {
  if (o == null) return "—";
  if (typeof o === "string") return o;
  if (o.domino) return `domino ${o.domino[0]} | ${o.domino[1]}`;
  if (o.carte) return `${{ R: "Roi", D: "Dame", V: "Valet" }[o.carte.v] || o.carte.v} de ${{ "♥": "cœur", "♦": "carreau", "♠": "pique", "♣": "trèfle" }[o.carte.c]}`;
  const f = o.fig || o;
  if (f.f === "cadre") return `point ${COINS[f.pt || 0]}`;
  const n = f.n || 1, [s, pl] = NOMS[f.f] || [f.f, f.f];
  let t = `${n > 1 ? `${n} ${pl}` : `1 ${s}`}`;
  if (f.p && f.p !== "vide") t += ` ${REMP[f.p]}${n > 1 && f.f !== "L" ? "s" : ""}`;
  if (f.f === "fleche") t += ` ${DIR[((f.r || 0) % 360 + 360) % 360] || `à ${f.r}°`}`;
  else if (f.f === "L") t += `${f.m ? " retournée" : ""}, tournée de ${f.r || 0}°`;
  return t;
}
