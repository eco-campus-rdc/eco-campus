// ══════════════════ AUTOMATISATIONS : RÈGLES (CommonJS, partagées avec les tâches serveur) ══════════════════
// Fonctions pures : à partir des comptes (users) et de l'heure, elles disent QUOI faire ; les tâches planifiées
// (functions/taches.js) exécutent : écritures Firestore, notifications dans l'application et notifications push.
// Chaque relance est mémorisée dans users/{uid}.relances[cle] pour n'être envoyée qu'une fois.
const { lireConfigEssai, dateEnMs, etatEssai, JOUR } = require("../essai/reglesEssai");

const ADMIN = "admin@accessplus.com";
const fD = ms => new Date(ms).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Africa/Kinshasa" });
const prenom = u => String((u && u.nom) || "").trim().split(/\s+/)[0] || "";
const apprenants = users => (users || []).filter(u => u && u.uid && u.mail !== ADMIN && u.role !== "formateur" && u.role !== "admin");
const estAbonne = (u, t) => u.abonnement === "actif" && (dateEnMs(u.dateExpiration) || 0) > t;
const dejaEnvoye = (u, cle) => !!(u.relances && u.relances[cle]);
const debutJour = t => { const d = new Date(t); d.setUTCHours(0, 0, 0, 0); return d.getTime(); };
const joursRestants = (fin, t) => Math.ceil((fin - t) / JOUR);

// ── 1. Abonnements et relances (tâche quotidienne) ──
// Renvoie [{ uid, maj?, notif?, cle }] : maj = champs à écrire sur le compte, notif = notification à envoyer.
function tachesQuotidiennes(users, cfgEssai, maintenant = Date.now()) {
  const A = [], cfg = lireConfigEssai(cfgEssai);
  for (const u of apprenants(users)) {
    const exp = dateEnMs(u.dateExpiration), p = prenom(u), salut = p ? `${p}, ` : "";
    // Abonnement échu : passe en « expiré »
    if (u.abonnement === "actif" && exp && exp <= maintenant) {
      A.push({ uid: u.uid, cle: `expire-${exp}`, maj: { abonnement: "expiré" },
        notif: { type: "abonnement", titre: "Votre accès a expiré", texte: `${salut}votre abonnement est arrivé à échéance. Vos scores et certificats sont conservés : renouvelez votre accès pour continuer vos parcours.`, vue: "acces" } });
      continue;
    }
    // Rappels avant expiration : J-7 et J-1
    if (estAbonne(u, maintenant)) {
      const j = joursRestants(exp, maintenant);
      for (const n of [7, 1]) if (j === n && !dejaEnvoye(u, `exp${n}-${exp}`))
        A.push({ uid: u.uid, cle: `exp${n}-${exp}`,
          notif: { type: "abonnement", titre: n === 1 ? "Votre accès expire demain" : "Votre accès expire dans 7 jours", texte: `${salut}votre abonnement se termine le ${fD(exp)}. Renouvelez-le dès maintenant pour ne rien perdre de votre élan.`, vue: "acces" } });
      continue;
    }
    // Fin d'essai gratuit : J-2
    const e = etatEssai({ creeLe: u.createdAt, parrainUid: u.parrainUid, cfg, maintenant });
    if (u.abonnement !== "demande" && e.enCours && e.joursRestants === 2 && !dejaEnvoye(u, `essai2-${e.fin}`))
      A.push({ uid: u.uid, cle: `essai2-${e.fin}`,
        notif: { type: "abonnement", titre: "Plus que 2 jours d'essai complet", texte: `${salut}votre essai gratuit se termine le ${fD(e.fin)}. Choisissez votre abonnement pour garder l'accès à tous les parcours et obtenir vos certificats.`, vue: "acces" } });
    // Inactifs depuis 7 jours (une seule relance par période d'inactivité, jusqu'à 30 jours)
    const vu = Number(u.lastLogin) || 0, inactif = maintenant - vu;
    if (vu && inactif >= 7 * JOUR && inactif < 30 * JOUR && !dejaEnvoye(u, `inactif-${vu}`))
      A.push({ uid: u.uid, cle: `inactif-${vu}`,
        notif: { type: "info", titre: "On vous attend sur Éco-Campus", texte: `${salut}cela fait une semaine que vous ne vous êtes pas connecté. 15 minutes aujourd'hui suffisent pour avancer d'un module !`, vue: "form" } });
  }
  return A;
}

// ── 2. Parrainage automatique (tâche horaire) ──
// Un filleul abonné grâce à un vrai paiement (pas un code offert) rapporte cfg.recompenseJours jours à son parrain, une seule fois.
const parCodeOffert = u => !!(u.bonCode && u.bonCode === u.activationCode) || /^OF-/i.test(String(u.activationCode || ""));
function recompensesParrainage(users, cfgEssai, maintenant = Date.now()) {
  const cfg = lireConfigEssai(cfgEssai), parUid = new Map((users || []).map(u => [u.uid, u]));
  return (users || []).filter(f => f && f.parrainUid && f.parrainUid !== f.uid && !f.parrainRecompense && estAbonne(f, maintenant) && !parCodeOffert(f))
    .map(f => ({ filleul: f, parrain: parUid.get(f.parrainUid) })).filter(x => x.parrain)
    .map(({ filleul, parrain }) => {
      const fin = new Date(Math.max(maintenant, dateEnMs(parrain.dateExpiration) || 0) + cfg.recompenseJours * JOUR).toISOString();
      return { filleulUid: filleul.uid, parrainUid: parrain.uid, jours: cfg.recompenseJours, fin,
        notif: { type: "code", titre: `Merci ! ${cfg.recompenseJours} jours offerts 🎉`, texte: `${prenom(filleul) || "Votre filleul"} s'est abonné grâce à vous. Votre accès est prolongé jusqu'au ${fD(dateEnMs(fin))}.`, vue: "filleuls" },
        admin: `${parrain.nom || parrain.mail} récompensé (${cfg.recompenseJours} jours) pour l'abonnement de ${filleul.nom || filleul.mail}.` };
    });
}

// ── 3. Alertes administrateur (tâche horaire) ──
const normRef = r => String(r || "").toUpperCase().replace(/[\s.\-_/]/g, "");
function alertesAdmin(users, maintenant = Date.now(), dejaAlerte = {}) {
  const A = [], hier = debutJour(maintenant) - JOUR;
  const demandes = (users || []).filter(u => u && u.abonnement === "demande");
  // Demandes d'accès en attente depuis la veille ou avant
  const enRetard = demandes.filter(u => { const d = dateEnMs(u.demandeDate); return d && d <= hier && !dejaAlerte[`retard-${u.uid}-${u.demandeDate}`]; });
  if (enRetard.length) A.push({ cles: enRetard.map(u => `retard-${u.uid}-${u.demandeDate}`),
    notif: { type: "annonce", titre: `${enRetard.length} demande${enRetard.length > 1 ? "s" : ""} d'accès en attente depuis plus de 24 h`, texte: enRetard.slice(0, 5).map(u => `${u.nom || u.mail} (${u.demandeDate})`).join(" · ") + (enRetard.length > 5 ? "…" : ""), vue: "d" } });
  // Même référence de paiement déclarée par plusieurs comptes (ou déjà utilisée par un compte validé)
  const parRef = new Map();
  for (const u of users || []) { const r = normRef(u && u.demandeRef); if (r.length >= 6) parRef.set(r, [...(parRef.get(r) || []), u]); }
  for (const [r, L] of parRef) if (L.length > 1 && L.some(u => u.abonnement === "demande") && !dejaAlerte[`ref-${r}`])
    A.push({ cles: [`ref-${r}`], notif: { type: "annonce", titre: "Référence de paiement utilisée plusieurs fois", texte: `La référence ${L[0].demandeRef} est déclarée par : ${L.map(u => u.nom || u.mail).join(", ")}. Vérifiez avant de valider.`, vue: "d" } });
  return A;
}

// ── 4. Rapport hebdomadaire (lundi matin) ──
function rapportHebdo(users, maintenant = Date.now()) {
  const L = apprenants(users), sem = maintenant - 7 * JOUR;
  const nouveaux = L.filter(u => (dateEnMs(u.createdAt) || 0) >= debutJour(sem)).length;
  const abonnes = L.filter(u => estAbonne(u, maintenant)).length;
  const demandes = L.filter(u => u.abonnement === "demande").length;
  const expirent = L.filter(u => estAbonne(u, maintenant) && dateEnMs(u.dateExpiration) - maintenant <= 7 * JOUR).length;
  const actifsSemaine = L.filter(u => (Number(u.lastLogin) || 0) >= sem).length;
  const recompenses = L.filter(u => (dateEnMs(u.parrainRecompense) || 0) >= sem).length;
  const chiffres = { inscrits: L.length, nouveaux, abonnes, demandes, expirent, actifsSemaine, recompenses };
  const texte = `${nouveaux} nouvel${nouveaux > 1 ? "s" : ""} inscrit${nouveaux > 1 ? "s" : ""} (total ${L.length}) · ${abonnes} abonné${abonnes > 1 ? "s" : ""} actif${abonnes > 1 ? "s" : ""} · ${actifsSemaine} apprenant${actifsSemaine > 1 ? "s" : ""} connecté${actifsSemaine > 1 ? "s" : ""} cette semaine · ${demandes} demande${demandes > 1 ? "s" : ""} en attente · ${expirent} accès expire${expirent > 1 ? "nt" : ""} dans les 7 jours · ${recompenses} récompense${recompenses > 1 ? "s" : ""} de parrainage.`;
  return { chiffres, notif: { type: "info", titre: `Rapport de la semaine (${fD(maintenant)})`, texte, vue: "s" } };
}

// ── 5. Sauvegardes : dossiers à supprimer (plus vieux que « garder » jours) ──
// noms : préfixes « sauvegardes/AAAA-MM-JJ/ » présents dans le stockage
function sauvegardesAPurger(noms, maintenant = Date.now(), garder = 30) {
  const limite = maintenant - garder * JOUR;
  return (noms || []).filter(n => { const m = String(n).match(/sauvegardes\/(\d{4}-\d{2}-\d{2})\//); return m && Date.parse(`${m[1]}T00:00:00Z`) < limite; });
}
const dossierSauvegarde = (maintenant = Date.now()) => `sauvegardes/${new Date(maintenant).toISOString().slice(0, 10)}`;

module.exports = { ADMIN, tachesQuotidiennes, recompensesParrainage, parCodeOffert, alertesAdmin, normRef, rapportHebdo, sauvegardesAPurger, dossierSauvegarde };
