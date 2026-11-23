import { MODULES_MINES, NB_Q_FINAL_MINES } from "./modules";
import { SCENES_ANIMEES, SCENES_MINES } from "./Animation";
import { SCHEMAS_MINES } from "./Simulateur";
import { SCHEMAS_ETHIQUE } from "../ethique/Caricature";
import { EXAMENS, elementsParcours, etatParcours, evaluer, PARCOURS, MIN } from "../attest/regles";
import { EXAMENS_FINAUX } from "../parcours/examens";
import { texteModuleMines } from "../audio/lecture";
import { FORMATIONS } from "../parcours/MesFormations";
import { OBJECTIFS } from "../parcours/objectifs";
import { OBJECTIFS_MODULES } from "../parcours/objectifsModules";
import { CFG_MINES } from "./Mines";

const KINDS = ["flux", "arbre", "tableau", "cartes", "chronologie", ...Object.keys(SCHEMAS_ETHIQUE), ...Object.keys(SCHEMAS_MINES)];

test("6 modules, MI1 gratuit, alignés sur regles.js", () => {
  expect(MODULES_MINES.map(m => m.id)).toEqual(["MI1", "MI2", "MI3", "MI4", "MI5", "MI6"]);
  expect(MODULES_MINES.filter(m => m.libre).map(m => m.id)).toEqual(["MI1"]);
  expect(MIN).toEqual(MODULES_MINES.map(m => [m.id, m.titre]));
  expect(CFG_MINES).toMatchObject({ id: "MINES", libre: "MI1" });
  expect(CFG_MINES.cle("MI3")).toBe("MI-MI3");
});

test("chaque module : essentiel, caricature animée, cas pratique, pièges, références, narration et 15 questions", () => {
  const titres = new Set(), scenes = new Set();
  for (const m of MODULES_MINES) {
    expect(m.blocs[0].type).toBe("essentiel");
    expect(m.blocs.some(b => b.type === "pieges")).toBe(true);
    expect(m.blocs.find(b => b.type === "articles").refs.length).toBeGreaterThanOrEqual(2);
    m.blocs.filter(b => b.type === "schema").forEach(b => expect(KINDS).toContain(b.kind));
    const an = m.blocs.filter(b => b.kind === "animation");
    expect(an).toHaveLength(1);
    const sc = SCENES_ANIMEES[an[0].scene];
    expect(sc).toBeTruthy();
    scenes.add(an[0].scene);
    // étapes : au moins 4, dans l'ordre, espacées d'au moins 1 s, toutes avant la fin de la scène
    expect(an[0].etapes.length).toBeGreaterThanOrEqual(4);
    an[0].etapes.forEach((e, i) => {
      expect(e.texte.length).toBeGreaterThan(30);
      expect(e.t).toBeLessThan(sc.duree);
      if (i) expect(e.t - an[0].etapes[i - 1].t).toBeGreaterThanOrEqual(1);
    });
    // le dessin est une fonction pure du temps : rendu possible au début, au milieu et à la fin
    for (const t of [0, sc.duree / 2, sc.duree]) expect(sc.dessin(t)).toBeTruthy();
    const dil = m.blocs.filter(b => b.kind === "dilemme");
    expect(dil).toHaveLength(1);
    dil[0].options.forEach(o => { expect(o.pour).toBeTruthy(); expect(o.contre).toBeTruthy(); });
    expect(dil[0].piste).toBeTruthy();
    expect(m.narration.length).toBeGreaterThanOrEqual(5);
    expect(texteModuleMines(m).length).toBeGreaterThan(m.narration.length);
    expect(m.qcm).toHaveLength(15);
    m.qcm.forEach(q => {
      expect(q.r).toHaveLength(4); expect(new Set(q.r).size).toBe(4); expect(q.b).toBe(0); expect(q.e).toBeTruthy();
      expect(titres.has(q.q)).toBe(false); titres.add(q.q);
    });
    expect(OBJECTIFS_MODULES[m.id].length).toBeGreaterThanOrEqual(3);
  }
  expect([...scenes].sort()).toEqual([...SCENES_MINES].sort());
});

test("références : loi n° 007/2002 modifiée par la loi n° 18/001, règlement minier, chiffres clés", () => {
  const t = JSON.stringify(MODULES_MINES);
  expect(t).toMatch(/007\/2002 du 11 juillet 2002/); expect(t).toMatch(/18\/001 du 9 mars 2018/);
  expect(t).toMatch(/038\/2003/); expect(t).toMatch(/18\/024 du 8 juin 2018/);
  for (const k of ["article 3", "Article 241", "Article 242", "Article 258 bis", "Article 299 bis", "Article 71 bis"]) expect(t).toContain(k);
  // la redevance du cobalt dans l'animation est cohérente avec le simulateur (10 %)
  expect(t).toMatch(/1 000 000 USD/); expect(t).toMatch(/100 000 USD/);
});

test("parcours certifiant : 6 modules d'1 h 30, examen final de 30 questions tiré des 90 QCM, présent dans Mes formations", () => {
  expect(PARCOURS.find(p => p.id === "MINES")).toMatchObject({ certificat: true, court: "Code minier" });
  expect(EXAMENS.MINES).toMatchObject({ cle: "MI-FINAL", nbQ: NB_Q_FINAL_MINES, vue: "mines", progressif: true });
  expect(elementsParcours("MINES", []).map(e => e.cle)).toEqual([...MODULES_MINES.map(m => `MI-${m.id}`), "MI-FINAL"]);
  expect(EXAMENS_FINAUX.MINES.charger()).toHaveLength(90);
  const et = etatParcours("MINES", [], { scores: { "MI-MI1": { pct: 80 } } });
  expect(et.elements.map(e => e.ouvert).slice(0, 3)).toEqual([true, true, false]);
  expect(evaluer("MINES", [], {}).heures).toBeGreaterThan(9);
  expect(FORMATIONS.find(f => f.id === "MINES")).toMatchObject({ libre: "MI1" });
  expect(OBJECTIFS.MINES.competences.length).toBeGreaterThanOrEqual(6);
});
