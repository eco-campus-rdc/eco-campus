// ══════════════════ ESSAI GRATUIT ET PARRAINAGE ══════════════════
// Essai complet : dès la création du compte, tout est ouvert pendant cfg.jours (7 par défaut), plus cfg.bonusParrain
// jours pour un compte arrivé par le lien d'un parrain. Une « campagne » réglée par l'administrateur (config/essai.campagne)
// fait repartir l'essai à cette date pour les comptes plus anciens (offrir l'essai aux inscrits actuels).
// Les certificats restent réservés aux abonnés (contrôle côté serveur, api/attestation.js).
// Parrainage : le lien ?parrain=<uid> est retenu jusqu'à l'inscription (users.parrainUid) ; quand le filleul s'abonne,
// l'administrateur offre cfg.recompenseJours (30) jours d'accès au parrain.

// depuis : mise en service de l'essai. Les comptes plus anciens n'en bénéficient que par une campagne (aucun message « essai terminé »).
export const ESSAI_DEFAUT = { actif: true, jours: 7, bonusParrain: 7, recompenseJours: 30, campagne: null, depuis: "2026-11-20T00:00:00Z" };
const JOUR = 86400000;
export const lireConfigEssai = c => {
  const x = { ...ESSAI_DEFAUT, ...(c || {}) };
  const n = (v, d, max) => { const k = Math.round(Number(v)); return k >= 0 && k <= max ? k : d; };
  return { actif: x.actif !== false, jours: n(x.jours, 7, 60), bonusParrain: n(x.bonusParrain, 7, 60), recompenseJours: n(x.recompenseJours, 30, 365), campagne: x.campagne || null, depuis: x.depuis || ESSAI_DEFAUT.depuis };
};

// « 3/10/2026 » (inscription) ou ISO → horodatage
export function dateEnMs(v) {
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
export function etatEssai({ creeLe, parrainUid, cfg, maintenant = Date.now() }) {
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

// ── Parrainage ──
export const UID_VALIDE = /^[A-Za-z0-9]{20,40}$/;
export const lienParrainage = (uid, origine = "https://eco-campus-rdc.vercel.app") => `${origine.replace(/\/$/, "")}/?parrain=${uid}`;
export const parrainDepuisUrl = search => { try { const v = new URLSearchParams(search || "").get("parrain"); return v && UID_VALIDE.test(v) ? v : null; } catch { return null; } };
export const texteParrainage = (lien, cfg) => {
  const c = lireConfigEssai(cfg);
  return `Je me forme sur Éco-Campus RDC : comptabilité SYSCOHADA, fiscalité 2026, finance, banque, éducation financière, avec certificat.\n\nAvec mon lien, ton essai gratuit passe à ${c.jours + c.bonusParrain} jours d'accès complet :\n${lien}`;
};
// Nouvelle date d'expiration du parrain : jours ajoutés à partir de la plus tardive entre aujourd'hui et son expiration actuelle
export function prolonger(expiration, jours, maintenant = Date.now()) {
  const e = dateEnMs(expiration);
  return new Date(Math.max(maintenant, e || 0) + jours * JOUR).toISOString();
}
// Filleuls d'un parrain et récompenses dues (vue administrateur)
export function bilanParrainage(users, maintenant = Date.now()) {
  const parUid = new Map((users || []).map(u => [u.uid, u]));
  const abonne = u => u.abonnement === "actif" && dateEnMs(u.dateExpiration) > maintenant;
  return (users || []).filter(u => u.parrainUid).map(f => ({
    filleul: f, parrain: parUid.get(f.parrainUid) || null, abonne: abonne(f),
    recompense: f.parrainRecompense || null, aRecompenser: abonne(f) && !f.parrainRecompense && !!parUid.get(f.parrainUid) && f.parrainUid !== f.uid,
  })).sort((a, b) => (b.aRecompenser - a.aRecompenser) || (b.abonne - a.abonne));
}
