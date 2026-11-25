// Envoi push (Firebase Cloud Messaging) d'une notification Éco-Campus vers les appareils de ses destinataires.
// Partagé par /api/push (envoi demandé par l'application) et par les tâches automatiques (functions/taches.js).
// Fichier ignoré par le routage Vercel (préfixe « _ »).
const ROLE_GROUPE = { apprenants: "apprenant", formateurs: "formateur", admin: "admin" };

// n : { dest, titre, texte, vue } ; base : adresse du site (https://…) pour le lien ouvert au toucher
async function pousser(admin, notifId, n, base) {
  const db = admin.firestore();
  let q = db.collection("pushTokens");
  if (ROLE_GROUPE[n.dest]) q = q.where("role", "==", ROLE_GROUPE[n.dest]);
  else if (n.dest !== "all") q = q.where("uid", "==", n.dest);
  const jetons = (await q.get()).docs.map(d => d.id).filter(j => j);
  if (!jetons.length) return { envoyes: 0, invalides: 0 };
  const lien = n.vue ? `${base}/?vue=${encodeURIComponent(n.vue)}` : `${base}/`;
  const corps = String(n.texte || "").slice(0, 180);
  let envoyes = 0; const invalides = [];
  for (let i = 0; i < jetons.length; i += 500) {
    const lot = jetons.slice(i, i + 500);
    const r = await admin.messaging().sendEachForMulticast({
      tokens: lot,
      data: { titre: String(n.titre || "Éco-Campus RDC"), texte: corps, lien, id: notifId },
      webpush: { headers: { Urgency: "high", TTL: "86400" }, fcmOptions: { link: lien } },
    });
    envoyes += r.successCount;
    r.responses.forEach((x, k) => {
      const c = x.error && x.error.code;
      if (c === "messaging/registration-token-not-registered" || c === "messaging/invalid-registration-token" || c === "messaging/invalid-argument") invalides.push(lot[k]);
    });
  }
  await Promise.all(invalides.map(j => db.collection("pushTokens").doc(j).delete().catch(() => {})));
  return { envoyes, invalides: invalides.length };
}

module.exports = { pousser, ROLE_GROUPE };
