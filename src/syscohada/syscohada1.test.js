import { MODULES_SYS1, NB_Q_FINAL_SYS1 } from "./modules";
import { SCHEMAS_SYS1, totaux } from "./Journal";
import { SCHEMAS_ETHIQUE } from "../ethique/Caricature";
import { EXAMENS, elementsParcours, etatParcours, evaluer, PARCOURS, SYS1 } from "../attest/regles";
import { EXAMENS_FINAUX, BANQUE_SYS1 } from "../parcours/examens";
import { texteModuleSys1 } from "../audio/lecture";
import { FORMATIONS } from "../parcours/MesFormations";
import { OBJECTIFS_MODULES } from "../parcours/objectifsModules";
import { TAUX_PAIE, INPP } from "../fiscal/paie";
import { CFG_SYS1 } from "./SyscohadaN1";
const plan = new Map(require("../ef/syscohada/plan.json"));

// Comptes du SYSCOHADA révisé absents du fichier plan.json de l'application (plan simplifié) mais bien prévus par le plan officiel
const HORS_FICHIER = new Set(["7019"]); // Rabais, remises et ristournes accordés (non ventilés), symétrique du 6019
const KINDS = ["flux", "arbre", "tableau", "cartes", "chronologie", ...Object.keys(SCHEMAS_ETHIQUE), ...Object.keys(SCHEMAS_SYS1)];

test("12 modules dans l'ordre, S1 gratuit, alignés sur regles.js et la page", () => {
  expect(MODULES_SYS1.map(m => m.id)).toEqual(["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12"]);
  expect(SYS1).toEqual(MODULES_SYS1.map(m => [m.id, m.titre]));
  expect(MODULES_SYS1.filter(m => m.libre).map(m => m.id)).toEqual(["S1"]);
  expect(CFG_SYS1).toMatchObject({ id: "SYS-N1", libre: "S1", extras: [{ cle: "CPT-T", exo: 0 }] });
  expect(CFG_SYS1.cle("S4")).toBe("SY-S4");
});

test("chaque module : essentiel, schémas valides, écritures, cas pratique, pièges, références, narration, 15 questions", () => {
  const titres = new Set();
  for (const m of MODULES_SYS1) {
    expect(m.blocs[0].type).toBe("essentiel");
    expect(m.blocs.some(b => b.type === "pieges")).toBe(true);
    expect(m.blocs.find(b => b.type === "articles").refs.length).toBeGreaterThanOrEqual(2);
    m.blocs.filter(b => b.type === "schema").forEach(b => expect(KINDS).toContain(b.kind));
    expect(m.blocs.filter(b => b.kind === "dilemme")).toHaveLength(1);
    if (!["S1"].includes(m.id)) expect(m.blocs.some(b => b.kind === "journal" || b.kind === "tableau")).toBe(true);
    expect(m.narration.length).toBeGreaterThanOrEqual(5);
    expect(texteModuleSys1(m).length).toBeGreaterThan(m.narration.length);
    expect(OBJECTIFS_MODULES[m.id].length).toBeGreaterThanOrEqual(3);
    expect(m.qcm).toHaveLength(15);
    m.qcm.forEach(q => {
      expect(q.r).toHaveLength(4); expect(new Set(q.r).size).toBe(4); expect(q.b).toBe(0); expect(q.e).toBeTruthy();
      expect(titres.has(q.q)).toBe(false); titres.add(q.q);
    });
  }
});

test("écritures au journal : équilibrées, comptes existants dans le plan SYSCOHADA, montants entiers", () => {
  let n = 0;
  for (const m of MODULES_SYS1) for (const b of m.blocs.filter(x => x.kind === "journal")) for (const e of b.ecritures) {
    n++;
    const t = totaux(e.lignes);
    expect([m.id, e.libelle, t.d]).toEqual([m.id, e.libelle, t.cr]);
    for (const x of e.lignes) {
      expect([m.id, x.c, plan.has(x.c) || HORS_FICHIER.has(x.c)]).toEqual([m.id, x.c, true]);
      expect(Number.isInteger(x.d || x.cr)).toBe(true);
      expect(!!x.d !== !!x.cr).toBe(true); // une ligne est soit au débit, soit au crédit
    }
    // débits d'abord, crédits ensuite (présentation du journal)
    const premierCredit = e.lignes.findIndex(x => x.cr);
    expect(e.lignes.slice(premierCredit).every(x => x.cr)).toBe(true);
  }
  expect(n).toBeGreaterThanOrEqual(30);
});

test("contenu juste : pas d'erreurs héritées des anciens modules", () => {
  const t = JSON.stringify(MODULES_SYS1);
  // 44566 (plan français) n'apparaît jamais dans une écriture : seulement dans les pièges et les QCM qui le signalent
  for (const m of MODULES_SYS1) for (const b of m.blocs.filter(x => x.kind === "journal")) expect(JSON.stringify(b)).not.toMatch(/44566/);
  expect(t).not.toMatch(/réserve légale \(5 %|5 % du bénéfice pour la réserve/);
  expect(t).toMatch(/1\/10 du bénéfice jusqu'à 1\/5 du capital/);
  expect(t).toMatch(/673 Escomptes accordés/);
  expect(t).toMatch(/26 janvier 2017/);
  // taux de paie identiques au simulateur du parcours Fiscalité
  expect(TAUX_PAIE.cnssSalarie).toBe(5);
  expect(TAUX_PAIE.cnssPensionEmployeur + TAUX_PAIE.cnssRisques + TAUX_PAIE.cnssFamiliales).toBe(13);
  expect(INPP.map(x => x.taux).slice(0, 3)).toEqual([3.5, 3, 2]);
  expect(TAUX_PAIE.onem).toBe(0.5);
});

test("parcours certifiant : 12 modules, exercice « Quel compte ? », examen final sur les modules et la banque dédiée", async () => {
  expect(PARCOURS.find(p => p.id === "SYS-N1")).toMatchObject({ certificat: true });
  expect(EXAMENS["SYS-N1"]).toMatchObject({ cle: "SYS1-FINAL", nbQ: NB_Q_FINAL_SYS1, vue: "mods", progressif: true });
  expect(elementsParcours("SYS-N1", [{ id: "ancien" }]).map(e => e.cle)).toEqual([...MODULES_SYS1.map(m => `SY-${m.id}`), "CPT-T", "SYS1-FINAL"]);
  const banque = await EXAMENS_FINAUX["SYS-N1"].charger();
  expect(banque.length).toBeGreaterThanOrEqual(180 + BANQUE_SYS1.length - 5);
  expect(new Set(banque.map(q => q.q)).size).toBe(banque.length);
  expect(FORMATIONS.find(f => f.id === "SYS-N1")).toMatchObject({ libre: "S1" });
  const et = etatParcours("SYS-N1", [], { scores: { "SY-S1": { pct: 80 } } });
  expect(et.elements.map(e => e.ouvert).slice(0, 3)).toEqual([true, true, false]);
  expect(evaluer("SYS-N1", [], {}).heures).toBe(21);
});
