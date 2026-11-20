import { preavis, congeAnnuel, CATEGORIES } from "./calculs";

test("préavis de l'employeur selon la catégorie et l'ancienneté (art. 64 ; arrêté de 2005)", () => {
  expect(preavis({ categorie: "execution", annees: 0 })).toMatchObject({ mois: 0, jours: 14, libelle: "14 jours ouvrables", travailleurJours: 7 });
  expect(preavis({ categorie: "execution", annees: 5 })).toMatchObject({ jours: 49, travailleurJours: 25 });
  expect(preavis({ categorie: "maitrise", annees: 3 })).toMatchObject({ mois: 1, jours: 27, libelle: "1 mois + 27 jours ouvrables" });
  expect(preavis({ categorie: "cadre", annees: 2 })).toMatchObject({ mois: 3, jours: 32, libelle: "3 mois + 32 jours ouvrables" });
  expect(preavis({ categorie: "execution", annees: 4.9 }).jours).toBe(14 + 7 * 4); // années entières seulement
  expect(Object.keys(CATEGORIES)).toEqual(["execution", "maitrise", "cadre"]);
});

test("estimations : indemnité de préavis, plafond des dommages-intérêts, congé non pris", () => {
  const r = preavis({ categorie: "execution", annees: 2, salaire: 520000, congesNonPris: 10 });
  expect(r.indemnitePreavis).toBe(560000); // 28 jours × 20 000
  expect(r.plafondDommages).toBe(36 * 520000);
  expect(r.indemniteConge).toBe(200000);
  expect(preavis({ categorie: "cadre", annees: 1, salaire: 2600000 }).indemnitePreavis).toBe(3 * 2600000 + 16 * 100000);
});

test("congé annuel (art. 141)", () => {
  expect(congeAnnuel({ annees: 1 })).toBe(12);
  expect(congeAnnuel({ annees: 10 })).toBe(14);
  expect(congeAnnuel({ annees: 1, mineur: true })).toBe(18);
});
