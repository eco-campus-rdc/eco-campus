// ══════════════════ ESSAI ET PARRAINAGE : RÈGLES PARTAGÉES (CommonJS) ══════════════════
// Utilisées par l'application (src/essai/essai.js les réexporte) et par la fonction serveur api/filleuls.js.

// depuis : mise en service de l'essai. Les comptes plus anciens n'en bénéficient que par une campagne (aucun message « essai terminé »).
const ESSAI_DEFAUT = { actif: true, jours: 7, bonusParrain: 7, recompenseJours: 30, campagne: null, depuis: "2026-11-20T00:00:00Z" };
const JOUR = 86400000;
const lireConfigEssai = c => {
  const x = { ...ESSAI_DEFAUT, ...(c || {}) };
  const n = (v, d, max) => { const k = Math.round(Number(v)); return k >= 0 && k <= max ? k : d; };
  return { actif: x.actif !== false, jours: n(x.jours, 7, 60), bonusParrain: n(x.bonusParrain, 7, 60), recompenseJours: n(x.recompenseJours, 30, 365), campagne: x.campagne || null, depuis: x.depuis || ESSAI_DEFAUT.depuis };
};

// « 3/10/2026 » (inscription) ou ISO → horodatage
function dateEnMs(v) {
  if (!v) return null;
  if (typeof v === "number") return v;
  const m = String(v).match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) return new Date(+m[3], +m[2] - 1, +m[1]).getTime();
  const t = Date.parse(v);
  return isNaN(t) ? null : t;
}

/**
 * État de l'essai d'un compte.
 * @param {{ creeLe: number|string, parrainUid?: string, cfg?: object, maintenant?: number }} p
 * @returns {{ actif, debut, fin, jours, joursRestants, enCours, termine, parrainBonus }}
 */
function etatEssai({ creeLe, parrainUid, cfg, maintenant = Date.now() }) {
  const c = lireConfigEssai(cfg), cree = dateEnMs(creeLe), camp = dateEnMs(c.campagne);
  const jours = c.jours + (parrainUid ? c.bonusParrain : 0);
  if (!c.actif || !cree || jours <= 0) return { actif: false, debut: null, fin: null, jours, joursRestants: 0, enCours: false, termine: false, parrainBonus: !!parrainUid };
  const parCampagne = camp && camp <= maintenant && camp > cree;
  const inactif = { actif: false, debut: null, fin: null, jours, joursRestants: 0, enCours: false, termine: false, parrainBonus: !!parrainUid };
  if (!parCampagne && cree < dateEnMs(c.depuis)) return inactif; // compte antérieur à l'essai, hors campagne
  const debut = parCampagne ? camp : cree, fin = debut + jours * JOUR;
  const enCours = maintenant >= debut && maintenant < fin;
  return { actif: true, debut, fin, jours, joursRestants: enCours ? Math.ceil((fin - maintenant) / JOUR) : 0, enCours, termine: maintenant >= fin, parrainBonus: !!parrainUid };
}

// ── « Mes filleuls » : ce que le parrain voit de ses filleuls (api/filleuls.js) ──
// Données limitées : prénom et initiale du nom, mois d'inscription, statut. Ni e-mail, ni téléphone, ni notes.
const nomAffiche = nom => {
  const m = String(nom || "").trim().split(/\s+/).filter(Boolean);
  if (!m.length) return "Un ami";
  const p = m[0].charAt(0).toUpperCase() + m[0].slice(1).toLowerCase();
  return m[1] ? `${p} ${m[1].charAt(0).toUpperCase()}.` : p;
};
const estAbonne = (u, maintenant) => u.abonnement === "actif" && (dateEnMs(u.dateExpiration) || 0) > maintenant;
/**
 * Filleuls d'un parrain, du plus récent au plus ancien, et totaux.
 * statut : « recompense » (abonné, récompense versée au parrain) | « abonne » | « essai » | « inscrit »
 */
function resumeFilleuls(filleuls, cfg, maintenant = Date.now()) {
  const c = lireConfigEssai(cfg);
  const liste = (filleuls || []).map(u => {
    const ess = etatEssai({ creeLe: u.createdAt, parrainUid: u.parrainUid, cfg: c, maintenant });
    const abonne = estAbonne(u, maintenant);
    const statut = u.parrainRecompense ? "recompense" : abonne ? "abonne" : ess.enCours ? "essai" : "inscrit";
    return { nom: nomAffiche(u.nom), inscritLe: dateEnMs(u.createdAt), statut, joursEssai: ess.enCours ? ess.joursRestants : 0, recompenseLe: u.parrainRecompense || null };
  }).sort((a, b) => (b.inscritLe || 0) - (a.inscritLe || 0));
  const n = s => liste.filter(x => x.statut === s).length;
  return { filleuls: liste, totaux: { inscrits: liste.length, enEssai: n("essai"), abonnes: n("abonne") + n("recompense"), recompenses: n("recompense") }, recompenseJours: c.recompenseJours, bonusParrain: c.bonusParrain, jours: c.jours };
}

module.exports = { ESSAI_DEFAUT, JOUR, lireConfigEssai, dateEnMs, etatEssai, nomAffiche, resumeFilleuls };
