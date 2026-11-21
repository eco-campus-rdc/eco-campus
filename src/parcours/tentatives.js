// ══════════════════ EXAMEN FINAL : TENTATIVES, DÉLAIS, CHRONOMÈTRE ET SORTIES DE PAGE ══════════════════
// Règles (décidées par le responsable pédagogique) :
// - 5 minutes entre deux tentatives ;
// - après 3 tentatives non réussies d'affilée, 12 heures avant la suivante (une réussite remet le compteur à zéro) ;
// - chronomètre : durée de l'examen (EXAMENS[id].heures), envoi automatique des réponses à la fin du temps ;
// - 4 sorties de la page autorisées pendant l'épreuve ; à la 5e, l'examen est terminé : tentative annulée,
//   sans note, comptée comme non réussie ;
// - toute tentative commencée est comptée, y compris si la page est rechargée ou fermée (abandon).
// État dans users/{uid}.progress["EXAM-<clé du score>"] : { total, echecs, derniere, encours, motif }.

import { EXAMENS, SEUIL_ELEMENT } from "../attest/regles";

export const DELAI_COURT = 5 * 60 * 1000;
export const DELAI_LONG = 12 * 60 * 60 * 1000;
export const ECHECS_AVANT_DELAI_LONG = 3;
export const SORTIES_AUTORISEES = 4;

export const cleTentatives = cle => `EXAM-${cle}`;
const iso = t => new Date(t).toISOString();

export function normaliser(e) {
  const x = e && typeof e === "object" ? e : {};
  return { total: x.total || 0, echecs: x.echecs || 0, derniere: x.derniere || null, encours: x.encours || null, motif: x.motif || null };
}

// Durée de l'épreuve en minutes (60 min, 90 min pour la Fiscalité)
export const dureeExamen = id => Math.round(((EXAMENS[id] && EXAMENS[id].heures) || 1) * 60);

export const delaiApres = e => (normaliser(e).echecs >= ECHECS_AVANT_DELAI_LONG ? DELAI_LONG : DELAI_COURT);

// Millisecondes à attendre avant de pouvoir recommencer (0 : possible tout de suite)
export function attente(e, maintenant = Date.now()) {
  const x = normaliser(e);
  if (!x.derniere) return 0;
  return Math.max(0, Date.parse(x.derniere) + delaiApres(x) - maintenant);
}

export const demarrer = (e, maintenant = Date.now()) => ({ ...normaliser(e), encours: iso(maintenant) });

// Fin d'une tentative. motif : "fin" (réponses envoyées), "temps" (chronomètre écoulé), "sorties" (5e sortie), "abandon"
export function cloturer(e, { pct = null, motif = "fin" } = {}, maintenant = Date.now()) {
  const x = normaliser(e), reussi = motif !== "sorties" && motif !== "abandon" && pct != null && pct >= SEUIL_ELEMENT;
  return { total: x.total + 1, echecs: reussi ? 0 : x.echecs + 1, derniere: iso(maintenant), encours: null, motif };
}

// Tentative restée « en cours » à l'ouverture de l'examen : la page a été rechargée ou fermée pendant l'épreuve
export const abandonEnCours = (e, maintenant = Date.now()) => (normaliser(e).encours ? cloturer(e, { motif: "abandon" }, maintenant) : null);

// Affichage d'une durée d'attente : « 4 min 05 s », « 11 h 42 min »
export function fmtAttente(ms) {
  const s = Math.ceil(ms / 1000);
  if (s >= 3600) return `${Math.floor(s / 3600)} h ${String(Math.floor((s % 3600) / 60)).padStart(2, "0")} min`;
  if (s >= 60) return `${Math.floor(s / 60)} min ${String(s % 60).padStart(2, "0")} s`;
  return `${s} s`;
}
// Chronomètre : « 59:07 »
export const fmtChrono = ms => { const s = Math.max(0, Math.ceil(ms / 1000)); return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`; };
