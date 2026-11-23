// ══════════════════ SUIVI D'UNE DEMANDE D'ACCÈS : DU PAIEMENT À L'ACTIVATION DU CODE ══════════════════
// L'administrateur valide le paiement → un code est créé et envoyé (e-mail + message) → l'apprenant l'active.
// Tant que l'apprenant n'a pas activé son code, son compte reste « demande » : l'administrateur voit où il en est
// (code créé, envoyé, message lu, reconnecté depuis l'envoi) au lieu d'un simple bouton « Valider ».
// Champs écrits par l'administrateur sur users/{uid} : codeGenereLe, codeEnvoyeLe, codeEmailOk, codeMsgId.

const ms = v => (v == null ? null : typeof v === "number" ? v : Date.parse(v) || null);

// Saisie tolérante d'un code : majuscules ; caractères invisibles copiés avec le code (espaces insécables, espaces de
// largeur nulle, retours à la ligne), points et autres signes ignorés ; tirets typographiques (‐ ‑ – — −) remplacés ;
// « AM55YKBN » seul (8 caractères) est compris comme le code d'accès « EC-AM55YKBN ».
export function normaliserCode(s) {
  const c = String(s || "").normalize("NFKC").toUpperCase().replace(/[\u2010-\u2015\u2212\uFE58\uFE63\uFF0D_]/g, "-").replace(/[^A-Z0-9-]/g, "");
  if (/^[A-Z0-9]{8}$/.test(c)) return "EC-" + c;
  const m = c.match(/^(EC|OF|FO)-?([A-Z0-9]+)$/) || c.match(/(EC|OF|FO)-([A-Z0-9]{4,})$/); // « Code : EC-… » collé en entier
  return m ? `${m[1]}-${m[2]}` : c;
}

// Étape d'un compte : attente (paiement à vérifier) | code (code envoyé, pas encore activé) | actif | expire | aucun
export function etapeAcces(u, maintenant = Date.now()) {
  if (!u) return "aucun";
  if (u.abonnement === "actif") return ms(u.dateExpiration) && ms(u.dateExpiration) < maintenant ? "expire" : "actif";
  if (u.abonnement === "demande") return u.activationCode && !u.codeValide ? "code" : "attente";
  return u.abonnement === "expiré" ? "expire" : "aucun";
}

// Étapes affichées à l'administrateur pour un code en attente d'activation
export function suiviCode(u) {
  const envoi = ms(u.codeEnvoyeLe), connexion = ms(u.lastLogin), active = u.abonnement === "actif" && !!u.codeValide;
  // Code créé avant la mise en place du suivi : l'envoi n'a pas été enregistré
  const ancien = !u.codeGenereLe && !envoi;
  return [
    { k: "cree", ok: !!u.activationCode, l: "Code créé", date: ms(u.codeGenereLe) },
    { k: "envoye", ok: !!envoi, l: ancien ? "Envoi non suivi (code créé avant le suivi) : renvoyez-le" : !envoi ? "Pas encore envoyé à l'apprenant" : u.codeEmailOk === false ? "Envoyé par message (l'e-mail a échoué)" : "Envoyé par e-mail et par message", date: envoi, alerte: !envoi },
    { k: "connecte", ok: !!(envoi && connexion && connexion > envoi), l: !connexion ? "Ne s'est jamais connecté" : envoi && connexion > envoi ? "S'est reconnecté depuis l'envoi" : "Pas reconnecté depuis l'envoi", date: connexion },
    { k: "active", ok: active, l: active ? "Accès activé" : "Code pas encore activé par l'apprenant", date: null, alerte: !active },
  ];
}
