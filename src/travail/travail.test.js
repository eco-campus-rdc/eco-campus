import { MODULES_DT, NB_Q_FINAL_DT } from "./modules";
import { SCHEMAS_TRAVAIL } from "./Simulateur";
import { EXAMENS, elementsParcours, etatParcours, evaluer, PARCOURS } from "../attest/regles";
import { EXAMENS_FINAUX } from "../parcours/examens";
import { texteModuleTravail } from "../audio/lecture";

const KINDS = ["flux", "arbre", "tableau", "cartes", "chronologie", ...Object.keys(SCHEMAS_TRAVAIL)];

test("6 modules complets : essentiel, schémas, pièges, références aux textes, narration et 15 questions", () => {
  expect(MODULES_DT.map(m => m.id)).toEqual(["DT1", "DT2", "DT3", "DT4", "DT5", "DT6"]);
  expect(MODULES_DT.filter(m => m.libre).map(m => m.id)).toEqual(["DT1"]);
  const titres = new Set();
  for (const m of MODULES_DT) {
    expect(m.blocs[0].type).toBe("essentiel");
    expect(m.blocs.some(b => b.type === "pieges")).toBe(true);
    const refs = m.blocs.find(b => b.type === "articles");
    expect(refs.refs.join(" ")).toMatch(/loi n° 015\/2002/);
    m.blocs.filter(b => b.type === "schema").forEach(b => expect(KINDS).toContain(b.kind));
    m.blocs.filter(b => b.type === "exemple").forEach(b => b.lignes.forEach(l => { expect(typeof l[1]).toBe("number"); expect(l[1]).toBeGreaterThan(999); }));
    expect(m.narration.length).toBeGreaterThanOrEqual(5);
    expect(texteModuleTravail(m).length).toBeGreaterThan(m.narration.length);
    expect(m.qcm).toHaveLength(15);
    m.qcm.forEach(q => {
      expect(q.r).toHaveLength(4); expect(new Set(q.r).size).toBe(4); expect(q.b).toBe(0); expect(q.e).toBeTruthy();
      expect(titres.has(q.q)).toBe(false); titres.add(q.q);
    });
  }
  expect(MODULES_DT.some(m => m.blocs.some(b => b.kind === "preavis"))).toBe(true);
});

test("règles de 2016 bien reprises (pas de rédaction périmée)", () => {
  const texte = JSON.stringify(MODULES_DT);
  expect(texte).toContain("45 heures par semaine et 8 heures par jour");
  expect(texte).toContain("24 heures");
  expect(texte).toContain("61 bis");
  expect(texte).toMatch(/VIH/);
  expect(texte).not.toMatch(/repos[^.]{0,40}48 heures consécutives/);
});

test("parcours certifiant : 6 modules d'1 h 30, examen final de 30 questions tiré des QCM", () => {
  expect(PARCOURS.find(p => p.id === "DTRAV")).toMatchObject({ certificat: true, court: "Droit du travail" });
  expect(EXAMENS.DTRAV).toMatchObject({ cle: "DT-FINAL", nbQ: NB_Q_FINAL_DT, vue: "dtrav", progressif: true });
  expect(elementsParcours("DTRAV", []).map(e => e.cle)).toEqual(["DT-DT1", "DT-DT2", "DT-DT3", "DT-DT4", "DT-DT5", "DT-DT6", "DT-FINAL"]);
  expect(evaluer("DTRAV", [], {}).heures).toBe(10);
  const banque = EXAMENS_FINAUX.DTRAV.charger();
  expect(banque).toHaveLength(90);
  const et = etatParcours("DTRAV", [], { scores: { "DT-DT1": { pct: 80 } } });
  expect(et.elements.map(e => e.ouvert).slice(0, 3)).toEqual([true, true, false]);
});
