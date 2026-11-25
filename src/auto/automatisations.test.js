import { tachesQuotidiennes, recompensesParrainage, parCodeOffert, alertesAdmin, rapportHebdo, sauvegardesAPurger, dossierSauvegarde } from "./automatisations";

const J = 864e5, T = Date.parse("2026-12-10T08:00:00Z");
const iso = ms => new Date(ms).toISOString();
const frDate = ms => new Date(ms).toLocaleDateString("fr-FR", { timeZone: "UTC" });
const cfg = { jours: 7, bonusParrain: 7, recompenseJours: 30, depuis: "2026-11-20T00:00:00Z" };

test("abonnement échu : passage en « expiré » et notification", () => {
  const A = tachesQuotidiennes([{ uid: "a", nom: "Grâce K", abonnement: "actif", dateExpiration: iso(T - 1000) }], cfg, T);
  expect(A).toHaveLength(1);
  expect(A[0]).toMatchObject({ uid: "a", maj: { abonnement: "expiré" } });
  expect(A[0].notif.titre).toBe("Votre accès a expiré");
});

test("rappels J-7 et J-1, une seule fois par échéance", () => {
  const u7 = { uid: "b", nom: "Paul", abonnement: "actif", dateExpiration: iso(T + 6.5 * J) };
  expect(tachesQuotidiennes([u7], cfg, T)[0].notif.titre).toBe("Votre accès expire dans 7 jours");
  const cle = tachesQuotidiennes([u7], cfg, T)[0].cle;
  expect(tachesQuotidiennes([{ ...u7, relances: { [cle]: "2026-12-10" } }], cfg, T)).toEqual([]);
  const u1 = { uid: "c", abonnement: "actif", dateExpiration: iso(T + 10 * 3600e3) };
  expect(tachesQuotidiennes([u1], cfg, T)[0].notif.titre).toBe("Votre accès expire demain");
  expect(tachesQuotidiennes([{ ...u1, dateExpiration: iso(T + 20 * J) }], cfg, T)).toEqual([]);
});

test("fin d'essai J-2 et inactifs depuis 7 jours", () => {
  const essai = { uid: "d", nom: "Mama Nzinga", abonnement: "aucun", createdAt: frDate(T - 5 * J) };
  const A = tachesQuotidiennes([essai], cfg, T);
  expect(A.map(x => x.notif.titre)).toContain("Plus que 2 jours d'essai complet");
  const inactif = { uid: "e", abonnement: "aucun", createdAt: "01/11/2026", lastLogin: T - 8 * J };
  expect(tachesQuotidiennes([inactif], cfg, T).map(x => x.notif.titre)).toEqual(["On vous attend sur Éco-Campus"]);
  expect(tachesQuotidiennes([{ ...inactif, lastLogin: T - 40 * J }], cfg, T)).toEqual([]); // au-delà de 30 jours : on n'insiste plus
  expect(tachesQuotidiennes([{ ...inactif, lastLogin: T - 2 * J }], cfg, T)).toEqual([]);
  // l'administrateur et les formateurs ne reçoivent rien
  expect(tachesQuotidiennes([{ uid: "f", mail: "admin@accessplus.com", abonnement: "actif", dateExpiration: iso(T - 1) }, { uid: "g", role: "formateur", lastLogin: T - 8 * J }], cfg, T)).toEqual([]);
});

test("parrainage : récompense automatique pour un vrai abonnement, jamais deux fois, pas pour un code offert", () => {
  const parrain = { uid: "P", nom: "Patrick E", abonnement: "actif", dateExpiration: iso(T + 10 * J) };
  const filleul = { uid: "F", nom: "Emmanuel A", parrainUid: "P", abonnement: "actif", dateExpiration: iso(T + 30 * J), activationCode: "EC-ABCD2345" };
  const R = recompensesParrainage([parrain, filleul], cfg, T);
  expect(R).toHaveLength(1);
  expect(R[0]).toMatchObject({ filleulUid: "F", parrainUid: "P", jours: 30 });
  expect(Date.parse(R[0].fin)).toBe(T + 40 * J); // 30 jours ajoutés à l'échéance actuelle du parrain
  expect(R[0].notif.texte).toMatch(/Emmanuel s'est abonné/);
  expect(recompensesParrainage([parrain, { ...filleul, parrainRecompense: iso(T) }], cfg, T)).toEqual([]);
  const offert = { ...filleul, activationCode: "OF-XYZ23456", bonCode: "OF-XYZ23456" };
  expect(parCodeOffert(offert)).toBe(true);
  expect(recompensesParrainage([parrain, offert], cfg, T)).toEqual([]);
  expect(recompensesParrainage([{ ...parrain, abonnement: "aucun", dateExpiration: null }, filleul], cfg, T)[0].fin).toBe(iso(T + 30 * J));
  expect(recompensesParrainage([filleul], cfg, T)).toEqual([]); // parrain introuvable
  expect(recompensesParrainage([parrain, { ...filleul, abonnement: "demande" }], cfg, T)).toEqual([]);
});

test("alertes administrateur : demandes en attente depuis la veille, références en double", () => {
  const users = [
    { uid: "a", nom: "Emmanuel", abonnement: "demande", demandeDate: frDate(T - 2 * J), demandeRef: "PP261123.1012.A48213" },
    { uid: "b", nom: "Grâce", abonnement: "actif", demandeRef: "pp261123 1012 a48213" },
    { uid: "c", nom: "Paul", abonnement: "demande", demandeDate: frDate(T), demandeRef: "MP231125.0824.B12345" },
  ];
  const A = alertesAdmin(users, T);
  expect(A).toHaveLength(2);
  expect(A[0].notif.titre).toBe("1 demande d'accès en attente depuis plus de 24 h");
  expect(A[1].notif.texte).toMatch(/Emmanuel, Grâce/);
  const deja = Object.fromEntries(A.flatMap(x => x.cles).map(k => [k, true]));
  expect(alertesAdmin(users, T, deja)).toEqual([]);
});

test("rapport hebdomadaire", () => {
  const users = [
    { uid: "a", abonnement: "actif", dateExpiration: iso(T + 3 * J), createdAt: frDate(T - 2 * J), lastLogin: T - J },
    { uid: "b", abonnement: "demande", createdAt: "01/10/2026" },
    { uid: "c", abonnement: "aucun", createdAt: "01/10/2026", parrainRecompense: iso(T - J) },
    { uid: "x", mail: "admin@accessplus.com" },
  ];
  const r = rapportHebdo(users, T);
  expect(r.chiffres).toEqual({ inscrits: 3, nouveaux: 1, abonnes: 1, demandes: 1, expirent: 1, actifsSemaine: 1, recompenses: 1 });
  expect(r.notif.texte).toMatch(/1 nouvel inscrit \(total 3\)/);
});

test("sauvegardes : dossier du jour et purge au-delà de 30 jours", () => {
  expect(dossierSauvegarde(T)).toBe("sauvegardes/2026-12-10");
  const noms = ["sauvegardes/2026-10-01/a.export_metadata", "sauvegardes/2026-11-20/b", "autre/2026-01-01/c"];
  expect(sauvegardesAPurger(noms, T)).toEqual(["sauvegardes/2026-10-01/a.export_metadata"]);
});
