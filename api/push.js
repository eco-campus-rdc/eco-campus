// Fonction Vercel : envoi des notifications push (Firebase Cloud Messaging) d'une notification Éco-Campus.
// Variable d'environnement requise (Vercel → Settings → Environment Variables) :
//   FIREBASE_SERVICE_ACCOUNT = contenu JSON de la clé de compte de service
//   (console Firebase → Paramètres du projet → Comptes de service → Générer une nouvelle clé privée).
// GET  /api/push            → { configure: true|false }
// POST /api/push {notifId}  (en-tête Authorization: Bearer <jeton d'identité Firebase de l'expéditeur>)
const { admin, init, configure } = require("./_admin");
const { pousser } = require("./_push");

const ADMIN_EMAIL = "admin@accessplus.com";
const FRAICHEUR_MS = 10 * 60 * 1000; // seules les notifications des 10 dernières minutes sont poussées


module.exports = async (req, res) => {
  if (req.method === "GET") return res.status(200).json({ configure: configure() });
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  try { if (!init()) return res.status(503).json({ ok: false, raison: "Push non configuré" }); }
  catch (e) { return res.status(500).json({ ok: false, raison: "Clé de compte de service invalide" }); }

  let user;
  try { user = await admin.auth().verifyIdToken(String(req.headers.authorization || "").replace(/^Bearer\s+/i, "")); }
  catch { return res.status(401).json({ ok: false, raison: "Identité invalide" }); }

  const notifId = String((req.body && req.body.notifId) || "");
  if (!notifId) return res.status(400).json({ ok: false });
  const db = admin.firestore();
  const ref = db.collection("notifications").doc(notifId);
  const snap = await ref.get();
  if (!snap.exists) return res.status(404).json({ ok: false });
  const n = snap.data();
  if (n.auteur !== user.uid && user.email !== ADMIN_EMAIL) return res.status(403).json({ ok: false });
  if (n.pushEnvoye) return res.status(409).json({ ok: false, raison: "Déjà envoyée" });
  const t = n.ts && n.ts.toMillis ? n.ts.toMillis() : 0;
  if (Date.now() - t > FRAICHEUR_MS) return res.status(410).json({ ok: false, raison: "Notification trop ancienne" });
  await ref.update({ pushEnvoye: admin.firestore.FieldValue.serverTimestamp() });

  const base = `https://${req.headers["x-forwarded-host"] || req.headers.host}`;
  const r = await pousser(admin, notifId, n, base);
  return res.status(200).json({ ok: true, ...r });
};
