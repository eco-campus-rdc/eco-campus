// Initialisation commune de firebase-admin pour les fonctions serveur (fichier ignoré par le routage Vercel : préfixe « _ »).
// - Sur Vercel : clé de compte de service dans la variable d'environnement FIREBASE_SERVICE_ACCOUNT.
// - Sur Firebase (Cloud Functions, via functions/index.js) : identifiants par défaut du projet, aucune clé à fournir.
const admin = require("firebase-admin");

const surGoogleCloud = () => !!(process.env.K_SERVICE || process.env.FUNCTION_TARGET || process.env.FIREBASE_CONFIG);
const configure = () => !!process.env.FIREBASE_SERVICE_ACCOUNT || surGoogleCloud();

function init() {
  if (admin.apps.length) return true;
  const brut = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (brut) { admin.initializeApp({ credential: admin.credential.cert(JSON.parse(brut)) }); return true; }
  if (surGoogleCloud()) { admin.initializeApp(); return true; }
  return false;
}

module.exports = { admin, init, configure };
