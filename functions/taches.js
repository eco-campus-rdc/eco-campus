// ══════════════════ TÂCHES AUTOMATIQUES D'ÉCO-CAMPUS (Cloud Functions planifiées) ══════════════════
// Les règles (qui, quand, quel message) sont dans src/auto/automatisations.js, testées hors ligne.
// Ici : lecture des comptes, écritures, notifications (collection « notifications », même format que l'application)
// et notifications push (api/_push.js). Heure de référence : Kinshasa.
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { admin, init } = require("./api/_admin");
const { pousser } = require("./api/_push");
const R = require("./src/auto/automatisations");
const { SITE_URL } = require("./src/site");

const OPTIONS = { region: "europe-west1", timeZone: "Africa/Kinshasa", memory: "256MiB", timeoutSeconds: 300, maxInstances: 1 };
const AUTEUR = { auteur: "systeme", auteurNom: "Éco-Campus RDC" };

const db = () => { init(); return admin.firestore(); };
const lireUsers = async () => (await db().collection("users").get()).docs.map(d => ({ uid: d.id, ...d.data() }));
const lireCfgEssai = async () => { const s = await db().collection("config").doc("essai").get(); return s.exists ? s.data() : null; };

// Écrit la notification (visible dans la cloche) puis l'envoie en push ; une erreur de push ne bloque rien
async function notifier(dest, n) {
  const doc = { dest, type: n.type || "info", titre: String(n.titre).slice(0, 120), texte: String(n.texte || "").slice(0, 1000), vue: n.vue || "",
    ts: admin.firestore.FieldValue.serverTimestamp(), pushEnvoye: admin.firestore.FieldValue.serverTimestamp(), ...AUTEUR };
  const ref = await db().collection("notifications").add(doc);
  try { await pousser(admin, ref.id, { dest, ...n }, SITE_URL); } catch (e) { console.log("push", dest, e.message); }
  return ref.id;
}
const journal = (tache, details) => db().collection("journalTaches").add({ tache, ...details, ts: admin.firestore.FieldValue.serverTimestamp() }).catch(() => {});

// 1. Chaque jour à 8 h : abonnements échus, rappels d'expiration, fin d'essai, inactifs
exports.tacheQuotidienne = onSchedule({ ...OPTIONS, schedule: "0 8 * * *" }, async () => {
  const [users, cfg] = await Promise.all([lireUsers(), lireCfgEssai()]);
  const A = R.tachesQuotidiennes(users, cfg, Date.now());
  for (const a of A) {
    const maj = { ...(a.maj || {}), [`relances.${a.cle}`]: new Date().toISOString() };
    await db().collection("users").doc(a.uid).update(maj);
    if (a.notif) await notifier(a.uid, a.notif);
  }
  await journal("quotidienne", { actions: A.length, expires: A.filter(a => a.maj).length });
});

// 2. Toutes les heures : récompenses de parrainage et alertes pour l'administrateur
exports.tacheHoraire = onSchedule({ ...OPTIONS, schedule: "15 * * * *" }, async () => {
  const [users, cfg] = await Promise.all([lireUsers(), lireCfgEssai()]);
  let recompenses = 0;
  for (const r of R.recompensesParrainage(users, cfg, Date.now())) {
    // Transaction : relit le filleul pour ne jamais récompenser deux fois (bouton manuel de l'administrateur ou passage précédent)
    const fait = await db().runTransaction(async tx => {
      const fRef = db().collection("users").doc(r.filleulUid), pRef = db().collection("users").doc(r.parrainUid);
      const f = await tx.get(fRef);
      if (!f.exists || f.data().parrainRecompense) return false;
      tx.update(pRef, { abonnement: "actif", codeValide: true, dateExpiration: r.fin, parrainageGagnes: admin.firestore.FieldValue.increment(1) });
      tx.update(fRef, { parrainRecompense: new Date().toISOString(), parrainRecompenseAuto: true });
      return true;
    });
    if (fait) { recompenses++; await notifier(r.parrainUid, r.notif); await notifier("admin", { type: "info", titre: "Parrainage récompensé automatiquement", texte: r.admin, vue: "essai" }); }
  }
  const etatRef = db().collection("config").doc("alertesAdmin"), etat = await etatRef.get();
  const deja = (etat.exists && etat.data().envoyees) || {};
  const A = R.alertesAdmin(users, Date.now(), deja);
  for (const a of A) await notifier("admin", a.notif);
  if (A.length) {
    // On garde les 300 dernières clés (une alerte ne revient pas tant que la situation ne change pas)
    const toutes = { ...deja }; A.forEach(a => a.cles.forEach(k => { toutes[k] = Date.now(); }));
    const gardees = Object.fromEntries(Object.entries(toutes).sort((x, y) => y[1] - x[1]).slice(0, 300));
    await etatRef.set({ envoyees: gardees }, { merge: false });
  }
  await journal("horaire", { recompenses, alertes: A.length });
});

// 3. Chaque lundi à 7 h : rapport de la semaine pour l'administrateur
exports.rapportHebdo = onSchedule({ ...OPTIONS, schedule: "0 7 * * 1" }, async () => {
  const r = R.rapportHebdo(await lireUsers(), Date.now());
  await notifier("admin", r.notif);
  await db().collection("rapports").add({ ...r.chiffres, ts: admin.firestore.FieldValue.serverTimestamp() });
  await journal("rapport", r.chiffres);
});

// 4. Chaque nuit à 2 h : sauvegarde complète de la base dans le stockage du projet, conservée 30 jours
exports.sauvegardeNocturne = onSchedule({ ...OPTIONS, schedule: "0 2 * * *" }, async () => {
  init();
  const { v1 } = require("@google-cloud/firestore");
  const client = new v1.FirestoreAdminClient();
  const projet = process.env.GCLOUD_PROJECT || JSON.parse(process.env.FIREBASE_CONFIG || "{}").projectId;
  const bucket = admin.storage().bucket();
  const dossier = R.dossierSauvegarde(Date.now());
  await client.exportDocuments({ name: client.databasePath(projet, "(default)"), outputUriPrefix: `gs://${bucket.name}/${dossier}`, collectionIds: [] });
  const [fichiers] = await bucket.getFiles({ prefix: "sauvegardes/" });
  const aSupprimer = R.sauvegardesAPurger(fichiers.map(f => f.name), Date.now(), 30);
  await Promise.all(aSupprimer.map(n => bucket.file(n).delete().catch(() => {})));
  await journal("sauvegarde", { dossier, supprimes: aSupprimer.length });
});
