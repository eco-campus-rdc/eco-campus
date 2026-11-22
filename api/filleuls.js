// Fonction Vercel : « Mes filleuls » — ce qu'un parrain voit des comptes inscrits avec son lien de parrainage.
// Un apprenant ne peut pas lire les comptes des autres (règles Firestore) : cette fonction le fait pour lui, côté serveur,
// et ne renvoie que des données limitées (src/essai/reglesEssai.js › resumeFilleuls) : prénom et initiale du nom, date
// d'inscription, statut (inscrit, en essai, abonné, récompense versée). Ni e-mail, ni téléphone, ni notes.
// Variable d'environnement requise : FIREBASE_SERVICE_ACCOUNT (la même que pour /api/attestation et /api/tableau).
// GET /api/filleuls (en-tête Authorization: Bearer <jeton d'identité Firebase>) → { ok, filleuls, totaux, recompenseJours, … }
const admin = require("firebase-admin");
const { resumeFilleuls } = require("../src/essai/reglesEssai");

function init() {
  if (admin.apps.length) return true;
  const brut = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!brut) return false;
  admin.initializeApp({ credential: admin.credential.cert(JSON.parse(brut)) });
  return true;
}

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") return res.status(405).json({ ok: false });
  try { if (!init()) return res.status(503).json({ ok: false, raison: "Service non configuré sur le serveur." }); }
  catch (e) { return res.status(500).json({ ok: false, raison: "Clé de compte de service invalide." }); }

  let jeton;
  try { jeton = await admin.auth().verifyIdToken(String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")); }
  catch { return res.status(401).json({ ok: false, raison: "Session expirée : reconnectez-vous." }); }

  try {
    const db = admin.firestore();
    const [snap, cfg, moi] = await Promise.all([
      db.collection("users").where("parrainUid", "==", jeton.uid).get(),
      db.collection("config").doc("essai").get(),
      db.collection("users").doc(jeton.uid).get(),
    ]);
    const filleuls = snap.docs.map(d => d.data()).filter(u => u && u.parrainUid === jeton.uid);
    const r = resumeFilleuls(filleuls, cfg.exists ? cfg.data() : null, Date.now());
    return res.status(200).json({ ok: true, ...r, gagnes: (moi.exists && moi.data().parrainageGagnes) || 0 });
  } catch (e) {
    return res.status(500).json({ ok: false, raison: "Liste des filleuls indisponible pour le moment." });
  }
};
