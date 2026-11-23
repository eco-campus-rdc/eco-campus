import { SUBSTANCES, REPARTITION, redevance } from "./calculs";

test("taux de l'article 241 et répartition de l'article 242", () => {
  expect(SUBSTANCES.map(s => s.taux)).toEqual([0, 0.01, 0.01, 0.035, 0.035, 0.06, 0.1]);
  expect(REPARTITION.map(p => p.p)).toEqual([0.5, 0.25, 0.15, 0.1]);
  expect(REPARTITION.reduce((a, p) => a + p.p, 0)).toBeCloseTo(1);
});
test("cobalt : 10 % de 1 000 000 USD, partagés 50 / 25 / 15 / 10", () => {
  const r = redevance({ substance: "strategiques", valeur: 1000000 });
  expect(r.montant).toBe(100000);
  expect(r.parts.map(p => p.m)).toEqual([50000, 25000, 15000, 10000]);
  expect(r.dotation).toBe(3000);
});
test("cuivre 3,5 %, diamant 6 %, sable 0 % ; arrondis cohérents", () => {
  expect(redevance({ substance: "base", valeur: 2500000 }).montant).toBe(87500);
  expect(redevance({ substance: "pierres", valeur: 100000 }).montant).toBe(6000);
  expect(redevance({ substance: "construction", valeur: 999999 }).montant).toBe(0);
  const r = redevance({ substance: "base", valeur: 333.33 });
  expect(r.parts.reduce((a, p) => a + p.m, 0)).toBeCloseTo(r.montant, 2);
  expect(redevance({ substance: "fer", valeur: -5 }).montant).toBe(0);
  expect(redevance({ substance: "fer", valeur: 1000, ca: 50000 }).dotation).toBe(150);
});
