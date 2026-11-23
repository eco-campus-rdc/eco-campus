// ══════════════════ CODE MINIER : CALCUL DE LA REDEVANCE MINIÈRE ══════════════════
// Loi n° 007/2002 portant Code minier, modifiée par la loi n° 18/001 du 9 mars 2018 :
// - art. 240 : assiette = valeur commerciale brute (cotation moyenne du mois précédant la sortie du produit marchand) ;
// - art. 241 : taux selon la catégorie de substance ;
// - art. 242 : répartition 50 % pouvoir central, 25 % province, 15 % entité territoriale décentralisée (ETD), 10 % FOMIN ;
// - art. 258 bis : dotation minimale de 0,3 % du chiffre d'affaires pour les projets de développement communautaire.

export const SUBSTANCES = [
  { id: "construction", l: "Matériaux de construction d'usage courant", ex: "sable, moellons", taux: 0 },
  { id: "industriels", l: "Minéraux industriels, hydrocarbures solides, autres", ex: "calcaire, charbon", taux: 0.01 },
  { id: "fer", l: "Fer et métaux ferreux", ex: "minerai de fer", taux: 0.01 },
  { id: "base", l: "Métaux non ferreux ou de base", ex: "cuivre, zinc, étain", taux: 0.035 },
  { id: "precieux", l: "Métaux précieux", ex: "or, argent", taux: 0.035 },
  { id: "pierres", l: "Pierres précieuses et de couleur", ex: "diamant", taux: 0.06 },
  { id: "strategiques", l: "Substances stratégiques", ex: "cobalt, germanium, coltan", taux: 0.1 },
];
export const REPARTITION = [
  { id: "central", l: "Pouvoir central", p: 0.5 },
  { id: "province", l: "Province du projet", p: 0.25 },
  { id: "etd", l: "Entité territoriale décentralisée", p: 0.15 },
  { id: "fomin", l: "Fonds minier pour les générations futures (FOMIN)", p: 0.1 },
];
export const DOTATION_COMMUNAUTAIRE = 0.003;

const r2 = x => Math.round(x * 100) / 100;
// valeur : valeur commerciale brute du produit marchand (USD) ; ca : chiffre d'affaires de l'exercice (USD, facultatif)
export function redevance({ substance, valeur, ca }) {
  const s = SUBSTANCES.find(x => x.id === substance) || SUBSTANCES[0];
  const v = Math.max(0, Number(valeur) || 0), montant = r2(v * s.taux);
  const parts = REPARTITION.map(p => ({ ...p, m: r2(montant * p.p) }));
  // l'arrondi au centime est reporté sur le pouvoir central pour que les parts égalent la redevance
  parts[0].m = r2(montant - parts.slice(1).reduce((a, p) => a + p.m, 0));
  const base = ca == null || ca === "" ? v : Math.max(0, Number(ca) || 0);
  return { substance: s, valeur: v, taux: s.taux, montant, parts, dotation: r2(base * DOTATION_COMMUNAUTAIRE) };
}
