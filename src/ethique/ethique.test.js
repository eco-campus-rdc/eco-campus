import { MODULES_ETH, NIVEAUX_ETHIQUE, NB_Q_FINAL_ETH } from "./modules";
import { SCHEMAS_ETHIQUE, SCENES_CARICATURES } from "./Caricature";
import { EXAMENS, elementsParcours, etatParcours, evaluer, PARCOURS, ETH } from "../attest/regles";
import { EXAMENS_FINAUX } from "../parcours/examens";
import { texteModuleEthique } from "../audio/lecture";
import { FORMATIONS } from "../parcours/MesFormations";
import { OBJECTIFS } from "../parcours/objectifs";

const KINDS = ["flux", "arbre", "tableau", "cartes", "chronologie", ...Object.keys(SCHEMAS_ETHIQUE)];

test("8 modules en 4 niveaux (2 par niveau, dans l'ordre), ET1 gratuit, alignés sur regles.js", () => {
  expect(MODULES_ETH.map(m => m.id)).toEqual(["ET1", "ET2", "ET3", "ET4", "ET5", "ET6", "ET7", "ET8"]);
  expect(MODULES_ETH.map(m => m.niveau)).toEqual(["facile", "facile", "moyen", "moyen", "difficile", "difficile", "avance", "avance"]);
  expect(NIVEAUX_ETHIQUE.map(n => n.label)).toEqual(["Facile", "Moyen", "Difficile", "Très avancé"]);
  expect(MODULES_ETH.filter(m => m.libre).map(m => m.id)).toEqual(["ET1"]);
  expect(ETH).toEqual(MODULES_ETH.map(m => [m.id, m.titre]));
  MODULES_ETH.forEach(m => expect(m.col).toBe(NIVEAUX_ETHIQUE.find(n => n.id === m.niveau).col));
});

test("chaque module : essentiel, caricature, cas pratique, pièges, références, narration et 15 questions", () => {
  const titres = new Set(), scenes = new Set();
  for (const m of MODULES_ETH) {
    expect(m.blocs[0].type).toBe("essentiel");
    expect(m.blocs.some(b => b.type === "pieges")).toBe(true);
    expect(m.blocs.find(b => b.type === "articles").refs.length).toBeGreaterThanOrEqual(2);
    m.blocs.filter(b => b.type === "schema").forEach(b => expect(KINDS).toContain(b.kind));
    const car = m.blocs.filter(b => b.kind === "caricature");
    expect(car).toHaveLength(1);
    expect(SCENES_CARICATURES).toContain(car[0].scene);
    expect(car[0].legende.length).toBeGreaterThan(40);
    scenes.add(car[0].scene);
    const dil = m.blocs.filter(b => b.kind === "dilemme");
    expect(dil).toHaveLength(1);
    expect(dil[0].options.length).toBeGreaterThanOrEqual(2);
    dil[0].options.forEach(o => { expect(o.pour).toBeTruthy(); expect(o.contre).toBeTruthy(); });
    expect(dil[0].piste).toBeTruthy();
    expect(m.narration.length).toBeGreaterThanOrEqual(5);
    expect(texteModuleEthique(m).length).toBeGreaterThan(m.narration.length);
    expect(m.qcm).toHaveLength(15);
    m.qcm.forEach(q => {
      expect(q.r).toHaveLength(4); expect(new Set(q.r).size).toBe(4); expect(q.b).toBe(0); expect(q.e).toBeTruthy();
      expect(titres.has(q.q)).toBe(false); titres.add(q.q);
    });
  }
  expect(scenes.size).toBe(8);
});

test("références solides : Constitution (art. 28 et 99), IESBA, Convention des Nations unies, code de conduite de 2002", () => {
  const t = JSON.stringify(MODULES_ETH);
  expect(t).toMatch(/article 28/); expect(t).toMatch(/article 99/);
  expect(t).toMatch(/IESBA/); expect(t).toMatch(/Convention des Nations unies contre la corruption \(2003\)/);
  expect(t).toMatch(/017\/2002 du 3 octobre 2002/);
});

test("parcours certifiant : 8 modules d'1 h, examen final de 30 questions tiré des 120 QCM, présent dans Mes formations", () => {
  expect(PARCOURS.find(p => p.id === "ETHIQ")).toMatchObject({ certificat: true, court: "Éthique" });
  expect(EXAMENS.ETHIQ).toMatchObject({ cle: "ET-FINAL", nbQ: NB_Q_FINAL_ETH, vue: "ethique", progressif: true });
  expect(elementsParcours("ETHIQ", []).map(e => e.cle)).toEqual([...MODULES_ETH.map(m => `ET-${m.id}`), "ET-FINAL"]);
  expect(evaluer("ETHIQ", [], {}).heures).toBe(9);
  expect(EXAMENS_FINAUX.ETHIQ.charger()).toHaveLength(120);
  const et = etatParcours("ETHIQ", [], { scores: { "ET-ET1": { pct: 80 } } });
  expect(et.elements.map(e => e.ouvert).slice(0, 3)).toEqual([true, true, false]);
  expect(FORMATIONS.find(f => f.id === "ETHIQ")).toMatchObject({ libre: "ET1" });
  expect(OBJECTIFS.ETHIQ.competences.length).toBeGreaterThanOrEqual(6);
});
