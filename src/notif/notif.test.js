import { destsPour, estLue, rappelsLocaux, annoncesApp, ANNONCES_APP, depuis } from "./notif";
import { recommandations } from "./Recommandations";

test("destinataires lus par chaque rôle", () => {
  expect(destsPour("u1", "apprenant")).toEqual(["u1", "all", "apprenants"]);
  expect(destsPour("f1", "formateur")).toEqual(["f1", "all", "formateurs"]);
  expect(destsPour("x", "admin")).toEqual(["admin", "all"]);
});

test("état de lu : tout ce qui précède « vu », ou marqué une à une", () => {
  const etat = { vu: 1000, lues: { b: true } };
  expect(estLue({ id: "a", t: 900 }, etat)).toBe(true);
  expect(estLue({ id: "b", t: 5000 }, etat)).toBe(true);
  expect(estLue({ id: "c", t: 5000 }, etat)).toBe(false);
});

test("rappel local d'abonnement à 7 jours ou moins de l'expiration", () => {
  const dans = j => new Date(Date.now() + j * 864e5).toISOString();
  expect(rappelsLocaux({ abonnement: "actif", dateExpiration: dans(3) })[0].titre).toMatch(/expire dans 3 jours/);
  expect(rappelsLocaux({ abonnement: "actif", dateExpiration: dans(30) })).toHaveLength(0);
  expect(rappelsLocaux({ abonnement: "aucun" })).toHaveLength(0);
  expect(depuis(Date.now() - 30 * 1000)).toBe("à l'instant");
});

test("recommandations : accès, QCM à refaire, module suivant du SYSCOHADA Niveau 1, Code des impôts", () => {
  const sansAcces = recommandations({ pr: {}, sc: {}, ok: false });
  expect(sansAcces[0].k).toBe("acces");
  expect(sansAcces[1]).toMatchObject({ k: "suivant", act: "n1" }); // S1 est gratuit
  expect(sansAcces[1].mod.id).toBe("S1");
  // S1 réussi, S2 à 40 % : S2 à refaire ; aucun nouveau module ouvert (S3 fermé) ; puis le Code des impôts
  const R = recommandations({ pr: {}, sc: { "SY-S1": { pct: 80 }, "SY-S2": { pct: 40 } }, ok: true });
  expect(R.map(r => r.k)).toEqual(["refaire", "fisc", "ef"]);
  expect(R[0].mod.id).toBe("S2");
  // S1 et S2 réussis : continuer avec S3
  const R2 = recommandations({ pr: {}, sc: { "SY-S1": { pct: 80 }, "SY-S2": { pct: 75 } }, ok: true });
  expect(R2[0]).toMatchObject({ k: "suivant", act: "n1" });
  expect(R2[0].mod.id).toBe("S3");
});

test("annonces de l'application : public visé, période d'affichage, lues comme une notification", () => {
  const a = ANNONCES_APP.find(x => x.id === "app-sys1-refonte-2026-11");
  expect(a).toMatchObject({ vue: "mods", type: "module" });
  const pendant = a.t + 864e5;
  expect(annoncesApp("apprenant", pendant).map(x => x.id)).toContain(a.id);
  expect(annoncesApp("formateur", pendant).map(x => x.id)).not.toContain(a.id);
  expect(annoncesApp("admin", pendant)).toEqual([]);
  expect(annoncesApp("apprenant", a.t - 1000)).toEqual([]);
  expect(annoncesApp("apprenant", a.fin + 1000)).toEqual([]);
  const n = annoncesApp("apprenant", pendant)[0];
  expect(n.public).toBeUndefined(); expect(n.titre.length).toBeLessThanOrEqual(120);
  expect(estLue(n, { vu: 0, lues: {} })).toBe(false);
  expect(estLue(n, { vu: 0, lues: { [a.id]: true } })).toBe(true);
  expect(estLue(n, { vu: a.t + 1, lues: {} })).toBe(true); // « Tout marquer comme lu »
});
