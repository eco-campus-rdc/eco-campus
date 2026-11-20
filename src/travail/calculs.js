// ══════════════════ DROIT DU TRAVAIL (RDC) : CALCULS DU PRÉAVIS ET DU DÉCOMPTE ══════════════════
// Sources : Code du travail (loi n° 015/2002 du 16 octobre 2002), art. 63, 64, 144 ; Arrêté ministériel
// n° 12/CAB.MIN/TPS/117/2005 du 26 octobre 2005 fixant la durée et les conditions de préavis (art. 6 à 8).
// - Catégories 1 à 5 (du manœuvre au travailleur hautement qualifié) : 14 jours ouvrables + 7 par année entière de services.
// - Agents de maîtrise : 1 mois + 9 jours ouvrables par année entière.
// - Cadres de collaboration et de direction : 3 mois + 16 jours ouvrables par année entière.
// - Préavis donné par le travailleur : la moitié de celui de l'employeur (art. 64, al. 2).
// Les montants sont des estimations pédagogiques : valeur d'un jour ouvrable = salaire mensuel ÷ 26.

export const CATEGORIES = {
  execution: { l: "Catégories 1 à 5 (manœuvre à hautement qualifié)", mois: 0, base: 14, parAn: 7 },
  maitrise: { l: "Agent de maîtrise", mois: 1, base: 0, parAn: 9 },
  cadre: { l: "Cadre de collaboration ou de direction", mois: 3, base: 0, parAn: 16 },
};
export const JOURS_OUVRABLES_MOIS = 26;
export const PLAFOND_DOMMAGES_MOIS = 36;
const arr = x => Math.round(x) || 0;

/**
 * @param {{ categorie: "execution"|"maitrise"|"cadre", annees: number, salaire: number, congesNonPris?: number }} p
 */
export function preavis({ categorie = "execution", annees = 0, salaire = 0, congesNonPris = 0 } = {}) {
  const c = CATEGORIES[categorie] || CATEGORIES.execution;
  const ans = Math.max(0, Math.floor(Number(annees) || 0));
  const jours = c.base + c.parAn * ans;                 // jours ouvrables en plus des mois
  const jour = (Number(salaire) || 0) / JOURS_OUVRABLES_MOIS;
  const indemnitePreavis = arr(c.mois * salaire + jours * jour);
  const travailleurJours = (c.mois * JOURS_OUVRABLES_MOIS + jours) / 2; // moitié, exprimée en jours ouvrables
  return {
    mois: c.mois, jours, libelle: (c.mois ? `${c.mois} mois` : "") + (c.mois && jours ? " + " : "") + (jours ? `${jours} jours ouvrables` : ""),
    travailleurJours: Math.ceil(travailleurJours),
    indemnitePreavis,
    plafondDommages: arr(PLAFOND_DOMMAGES_MOIS * salaire),
    indemniteConge: arr((Number(congesNonPris) || 0) * jour),
    joursLiberte: Math.floor((c.mois * JOURS_OUVRABLES_MOIS + jours) / 6), // 1 jour de liberté par semaine de préavis (art. 65), semaines de 6 jours ouvrables
  };
}

// Congé annuel (art. 141) : 1 jour ouvrable par mois entier de service (1,5 avant 18 ans), + 1 jour par tranche de 5 ans d'ancienneté
export function congeAnnuel({ annees = 0, mineur = false } = {}) {
  const ans = Math.max(0, Math.floor(Number(annees) || 0));
  return (mineur ? 18 : 12) + Math.floor(ans / 5);
}
