import { MODULES_IFRS } from "./modules";
import { SCHEMAS_IFRS, aReviser } from "./Outils";
import { SCHEMAS_ETHIQUE } from "../ethique/Caricature";
import { FAMILLES, NORMES, FLASHCARDS, CERTIFICATIONS } from "./normes";
import { EXAMENS, elementsParcours, etatParcours, evaluer, PARCOURS, IFRS } from "../attest/regles";
import { EXAMENS_FINAUX } from "../parcours/examens";
import { texteModuleIfrs } from "../audio/lecture";
import { FORMATIONS } from "../parcours/MesFormations";
import { OBJECTIFS } from "../parcours/objectifs";
import { OBJECTIFS_MODULES } from "../parcours/objectifsModules";
import { CFG_IFRS } from "./Ifrs";

const KINDS = ["flux", "tableau", "cartes", ...Object.keys(SCHEMAS_ETHIQUE), ...Object.keys(SCHEMAS_IFRS)];

test("8 modules, IF1 gratuit, alignés sur regles.js", () => {
  expect(MODULES_IFRS.map(m => m.id)).toEqual(["IF1", "IF2", "IF3", "IF4", "IF5", "IF6", "IF7", "IF8"]);
  expect(MODULES_IFRS.filter(m => m.libre).map(m => m.id)).toEqual(["IF1"]);
  expect(IFRS).toEqual(MODULES_IFRS.map(m => [m.id, m.titre]));
  expect(CFG_IFRS).toMatchObject({ id: "IFRS", libre: "IF1" });
  expect(CFG_IFRS.cle("IF3")).toBe("IF-IF3");
});

test("chaque module : essentiel, outil interactif, flashcards, cas pratique, pièges, références, narration et 15 questions", () => {
  const titres = new Set();
  for (const m of MODULES_IFRS) {
    expect(m.blocs[0].type).toBe("essentiel");
    expect(m.blocs.some(b => b.type === "pieges")).toBe(true);
    expect(m.blocs.find(b => b.type === "articles").refs.length).toBeGreaterThanOrEqual(2);
    const sch = m.blocs.filter(b => b.type === "schema");
    sch.forEach(b => expect(KINDS).toContain(b.kind));
    // au moins un outil interactif (simulateur ou arbre de décision) et un jeu de flashcards non vide
    expect(sch.some(b => ["decision", "tie", "ecl", "bail", "impots", "devise", "forfait", "ugt", "composants"].includes(b.kind))).toBe(true);
    const fc = sch.find(b => b.kind === "flashcards");
    expect(fc).toBeTruthy();
    expect(FLASHCARDS.filter(c => !fc.themes || fc.themes.some(t => c.theme.includes(t))).length).toBeGreaterThanOrEqual(4);
    // arbres de décision : chaque branche mène à une question existante ou à une conclusion
    sch.filter(b => b.kind === "decision").forEach(b => {
      expect(b.noeuds[b.depart]).toBeTruthy();
      Object.values(b.noeuds).forEach(n => ["oui", "non"].forEach(r => {
        const s = n[r];
        if (typeof s === "string") expect(b.noeuds[s]).toBeTruthy(); else { expect(s.fin).toBeTruthy(); expect(s.texte).toBeTruthy(); }
      }));
    });
    const dil = m.blocs.filter(b => b.kind === "dilemme");
    expect(dil).toHaveLength(1);
    dil[0].options.forEach(o => { expect(o.pour).toBeTruthy(); expect(o.contre).toBeTruthy(); });
    expect(m.narration.length).toBeGreaterThanOrEqual(5);
    expect(texteModuleIfrs(m).length).toBeGreaterThan(m.narration.length);
    expect(m.qcm).toHaveLength(15);
    m.qcm.forEach(q => {
      expect(q.r).toHaveLength(4); expect(new Set(q.r).size).toBe(4); expect(q.b).toBe(0); expect(q.e).toBeTruthy();
      expect(titres.has(q.q)).toBe(false); titres.add(q.q);
    });
    expect(OBJECTIFS_MODULES[m.id]).toHaveLength(3);
  }
  // les outils de référence sont bien placés : carte des normes au socle, certifications au dernier module
  expect(MODULES_IFRS[0].blocs.some(b => b.kind === "carteNormes")).toBe(true);
  expect(MODULES_IFRS[7].blocs.some(b => b.kind === "certifications")).toBe(true);
  // tous les simulateurs sont utilisés au moins une fois
  const utilises = new Set(MODULES_IFRS.flatMap(m => m.blocs.map(b => b.kind)));
  Object.keys(SCHEMAS_IFRS).forEach(k => expect(utilises.has(k)).toBe(true));
});

test("données du classeur : 42 normes en 7 familles, 42 flashcards, 8 certifications", () => {
  expect(FAMILLES).toHaveLength(7);
  expect(NORMES).toHaveLength(42);
  NORMES.forEach(n => { expect(FAMILLES.some(f => f.id === n.famille)).toBe(true); expect(n.logique && n.syscohada && n.q && n.r).toBeTruthy(); });
  expect(FLASHCARDS).toHaveLength(42);
  expect(CERTIFICATIONS).toHaveLength(8);
  CERTIFICATIONS.forEach(c => expect(c.lien).toMatch(/^https:\/\//));
});

test("répétition espacée : une carte jamais vue ou échue est à revoir", () => {
  const T = Date.parse("2026-12-01T10:00:00Z");
  expect(aReviser({}, 5, T)).toBe(true);
  expect(aReviser({ 5: { prochaine: T + 1000 } }, 5, T)).toBe(false);
  expect(aReviser({ 5: { prochaine: T - 1000 } }, 5, T)).toBe(true);
});

test("parcours certifiant : 8 modules de 2 h, examen final de 30 questions tiré des 120 QCM, présent dans Mes formations", () => {
  expect(PARCOURS.find(p => p.id === "IFRS")).toMatchObject({ certificat: true, court: "IFRS" });
  expect(EXAMENS.IFRS).toMatchObject({ cle: "IF-FINAL", nbQ: 30, vue: "ifrs", progressif: true });
  expect(elementsParcours("IFRS", []).map(e => e.cle)).toEqual([...MODULES_IFRS.map(m => `IF-${m.id}`), "IF-FINAL"]);
  expect(EXAMENS_FINAUX.IFRS.charger()).toHaveLength(120);
  const et = etatParcours("IFRS", [], { scores: { "IF-IF1": { pct: 80 } } });
  expect(et.elements.map(e => e.ouvert).slice(0, 3)).toEqual([true, true, false]);
  expect(evaluer("IFRS", [], {}).heures).toBeGreaterThan(16);
  expect(FORMATIONS.find(f => f.id === "IFRS")).toMatchObject({ libre: "IF1" });
  expect(OBJECTIFS.IFRS.competences.length).toBeGreaterThanOrEqual(6);
});
