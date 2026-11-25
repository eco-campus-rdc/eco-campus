// ══════════════════ FONCTIONS SERVEUR D'ÉCO-CAMPUS SUR FIREBASE ══════════════════
// Une seule fonction HTTP « api » sert les quatre routes /api/… (réécriture dans firebase.json) :
// le code de chaque route est celui du dossier api/ (copié par preparer.js), inchangé : même signature (req, res).
// firebase-admin utilise les identifiants par défaut du projet (api/_admin.js) : aucune clé à configurer.
const { onRequest } = require("firebase-functions/v2/https");

const ROUTES = {
  attestation: () => require("./api/attestation"),
  filleuls: () => require("./api/filleuls"),
  push: () => require("./api/push"),
  tableau: () => require("./api/tableau"),
};

exports.api = onRequest({ region: "europe-west1", memory: "256MiB", timeoutSeconds: 30, maxInstances: 5 }, async (req, res) => {
  const nom = String(req.path || "").replace(/^\/+/, "").replace(/^api\//, "").split("/")[0];
  const route = ROUTES[nom];
  if (!route) return res.status(404).json({ ok: false, raison: "Route inconnue." });
  return route()(req, res);
});

// Tâches automatiques planifiées (abonnements et relances, parrainage, alertes, rapport, sauvegarde) : voir taches.js
Object.assign(exports, require("./taches"));
