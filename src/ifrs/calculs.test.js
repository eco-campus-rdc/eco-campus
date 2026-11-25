import { tie, ecl, bail, impotsDifferes, devises, allocation, ugt, composants, provision } from "./calculs";

// Valeurs des corrigés du classeur « Apprendre les IFRS » (feuille CORRIGES)
test("C1 · IFRS 9 coût amorti et TIE", () => {
  const r = tie({ nominal: 100000, taux: 0.1, duree: 5, frais: 2000 });
  expect(r.vi).toBe(98000);
  expect(r.tie).toBeCloseTo(0.10534822773104, 8);
  expect(r.lignes[0].interet).toBeCloseTo(10324.1263176419, 4);
  expect(r.lignes[0].cloture).toBeCloseTo(98324.1263176419, 4);
  expect(r.lignes[4].cloture).toBe(0);
  expect(r.fraisEtales).toBeCloseTo(2000, 4); // les frais sont entièrement étalés sur la durée
});
test("C2 · IFRS 9 ECL en 3 stades", () => {
  const D = { ead: 500000, lgd: 0.45, pd12: 0.02, pdVie: 0.09 };
  expect(ecl({ ...D, jours: 0 })).toMatchObject({ stade: 1, montant: 4500 });
  const s2 = ecl({ ...D, jours: 45 });
  expect(s2).toMatchObject({ stade: 2, montant: 20250 });
  expect(s2.complement).toBeCloseTo(15750, 6);
  expect(ecl({ ...D, jours: 100 })).toMatchObject({ stade: 3, base: "valeur nette (brute − dépréciation)" });
  expect(ecl({ ...D, jours: 30 }).stade).toBe(1);
});
test("C3 · IFRS 16 bail d'une agence", () => {
  const r = bail({ loyer: 12000, duree: 5, taux: 0.08, coutsDirects: 1000 });
  expect(r.dette0).toBeCloseTo(47912.5204449371, 6);
  expect(r.droitUtilisation).toBeCloseTo(48912.5204449371, 6);
  expect(r.lignes[0].interet).toBeCloseTo(3833.00163559497, 6);
  expect(r.amort).toBeCloseTo(9782.50408898741, 6);
  expect(r.lignes[0].cloture).toBeCloseTo(39745.522080532, 5);
  expect(r.lignes[0].chargeIfrs).toBeCloseTo(13615.5057245824, 5);
  expect(r.lignes[4].cloture).toBe(0);
});
test("C4 · IAS 12 impôts différés", () => {
  const r = impotsDifferes([{ l: "Matériel", type: "actif", vc: 90000, base: 80000 }, { l: "Provision", type: "provision", montant: 20000 }], 0.3);
  expect(r.lignes[0]).toMatchObject({ diff: 10000, nature: "IDP", impot: 3000 });
  expect(r.lignes[1]).toMatchObject({ nature: "IDA", impot: 6000 });
  expect(r.net).toBe(3000);
});
test("C5 · IAS 21 devises USD/CDF", () => {
  const p = devises({ montant: 50000, coursInitial: 2750, coursCloture: 2900, monetaire: true });
  expect([p.initial, p.cloture, p.ecart, p.ifrsResultat]).toEqual([137500000, 145000000, 7500000, 7500000]);
  expect(p.syscohada).toMatchObject({ resultat: 0, bilan: 7500000 });
  const i = devises({ montant: 200000, coursInitial: 2500, coursCloture: 2900, monetaire: false });
  expect([i.cloture, i.ifrsResultat]).toEqual([500000000, 0]);
  expect(devises({ montant: 1000, coursInitial: 2900, coursCloture: 2800 }).syscohada.resultat).toBe(-100000);
});
test("C6 · IFRS 15 forfait carte + tenue de compte", () => {
  const r = allocation({ prix: 240, moisEcoules: 3, obligations: [{ l: "Carte", prixSepare: 60, mode: "instant" }, { l: "Tenue de compte", prixSepare: 240, mode: "progressif", dureeMois: 12 }] });
  expect(r.lignes.map(o => o.alloue)).toEqual([48, 192]);
  expect(r.revenu).toBe(96); expect(r.passif).toBe(144);
});
test("C7 · IAS 36 UGT", () => {
  expect(ugt({ vc: 1200000, goodwill: 100000, jvCouts: 950000, vu: 1000000 })).toMatchObject({ recouvrable: 1000000, perte: 200000, surGoodwill: 100000, surAutres: 100000, retenue: "valeur d'utilité" });
  expect(ugt({ vc: 900000, goodwill: 100000, jvCouts: 950000, vu: 1000000 }).perte).toBe(0);
});
test("C8 · IAS 37 litiges", () => {
  expect(provision({ probabilite: 0.7, montant: 300000 })).toMatchObject({ decision: "provision", montant: 300000 });
  expect(provision({ probabilite: 0.3, montant: 150000 })).toMatchObject({ decision: "annexe", montant: 0 });
  expect(provision({ nombre: 1000, montantUnitaire: 1000, tauxAboutissement: 0.2 })).toMatchObject({ decision: "provision", montant: 200000 });
  expect(provision({ obligation: false }).decision).toBe("rien");
});
test("C9 · IAS 16 composants", () => {
  const r = composants({ terrain: 400000, dureeGlobale: 40, parties: [{ l: "Gros œuvre", montant: 1200000, duree: 50 }, { l: "Toiture et façade", montant: 240000, duree: 20 }, { l: "Installations", montant: 160000, duree: 10 }] });
  expect([r.dotation, r.globale, r.ecart]).toEqual([52000, 40000, 12000]);
});
