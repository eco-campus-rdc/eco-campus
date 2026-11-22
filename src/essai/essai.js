// ══════════════════ ESSAI GRATUIT ET PARRAINAGE ══════════════════
// Essai complet : dès la création du compte, tout est ouvert pendant cfg.jours (7 par défaut), plus cfg.bonusParrain
// jours pour un compte arrivé par le lien d'un parrain. Une « campagne » réglée par l'administrateur (config/essai.campagne)
// fait repartir l'essai à cette date pour les comptes plus anciens (offrir l'essai aux inscrits actuels).
// Les certificats restent réservés aux abonnés (contrôle côté serveur, api/attestation.js).
// Parrainage : le lien ?parrain=<uid> est retenu jusqu'à l'inscription (users.parrainUid) ; quand le filleul s'abonne,
// l'administrateur offre cfg.recompenseJours (30) jours d'accès au parrain.

// Règles de l'essai (durées, date d'inscription, état de l'essai) : src/essai/reglesEssai.js, partagé avec le serveur
import { ESSAI_DEFAUT, JOUR, lireConfigEssai, dateEnMs, etatEssai } from "./reglesEssai";
export { ESSAI_DEFAUT, lireConfigEssai, dateEnMs, etatEssai };

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
