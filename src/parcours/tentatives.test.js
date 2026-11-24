import { DELAI_COURT, DELAI_LONG, SORTIES_AUTORISEES, cleTentatives, normaliser, dureeExamen, attente, demarrer, cloturer, abandonEnCours, fmtAttente, fmtChrono } from "./tentatives";
import { consignesExamen } from "./ExamenFinal";
const { EXAMENS } = require("../attest/regles");

const T0 = Date.parse("2026-11-21T10:00:00Z"), MIN = 60000;

describe("Examen final : tentatives et délais", () => {
  test("règles chiffrées", () => {
    expect(DELAI_COURT).toBe(5 * MIN);
    expect(DELAI_LONG).toBe(12 * 60 * MIN);
    expect(SORTIES_AUTORISEES).toBe(4);
    expect(cleTentatives("DT-FINAL")).toBe("EXAM-DT-FINAL");
    expect(dureeExamen("FISC")).toBe(90);
    Object.keys(EXAMENS).filter(id => id !== "FISC").forEach(id => expect(dureeExamen(id)).toBe(60));
  });
  test("première tentative possible tout de suite, puis 5 minutes entre deux tentatives", () => {
    expect(attente(null, T0)).toBe(0);
    const e = cloturer(demarrer(null, T0), { pct: 50 }, T0 + 30 * MIN);
    expect(e).toMatchObject({ total: 1, echecs: 1, encours: null, motif: "fin" });
    expect(attente(e, T0 + 30 * MIN)).toBe(5 * MIN);
    expect(attente(e, T0 + 34 * MIN)).toBe(MIN);
    expect(attente(e, T0 + 35 * MIN)).toBe(0);
  });
  test("après 3 tentatives non réussies d'affilée : 12 heures ; une réussite remet le compteur à zéro", () => {
    let e = null, t = T0;
    for (let k = 1; k <= 2; k++) { e = cloturer(demarrer(e, t), { pct: 40 }, t); expect(attente(e, t)).toBe(DELAI_COURT); t += DELAI_COURT; }
    e = cloturer(demarrer(e, t), { pct: 60 }, t);
    expect(e.echecs).toBe(3);
    expect(attente(e, t)).toBe(DELAI_LONG);
    t += DELAI_LONG;
    e = cloturer(demarrer(e, t), { pct: 55 }, t);
    expect(attente(e, t)).toBe(DELAI_LONG); // toujours sans réussite
    t += DELAI_LONG;
    e = cloturer(demarrer(e, t), { pct: 85 }, t);
    expect(e).toMatchObject({ total: 5, echecs: 0 });
    expect(attente(e, t)).toBe(DELAI_COURT);
  });
  test("5e sortie de page et abandon : tentative comptée, non réussie, sans note", () => {
    const s = cloturer(demarrer(null, T0), { pct: 100, motif: "sorties" }, T0 + MIN);
    expect(s).toMatchObject({ total: 1, echecs: 1, motif: "sorties" });
    expect(attente(s, T0 + MIN)).toBe(DELAI_COURT);
    expect(abandonEnCours(normaliser({ total: 2 }), T0)).toBeNull();
    const ab = abandonEnCours(demarrer({ total: 2, echecs: 2 }, T0), T0 + 10 * MIN);
    expect(ab).toMatchObject({ total: 3, echecs: 3, motif: "abandon", encours: null });
    expect(attente(ab, T0 + 10 * MIN)).toBe(DELAI_LONG);
  });
  test("temps écoulé : réussite possible si la note atteint le seuil", () => {
    expect(cloturer(demarrer(null, T0), { pct: 75, motif: "temps" }, T0).echecs).toBe(0);
    expect(cloturer(demarrer(null, T0), { pct: 65, motif: "temps" }, T0).echecs).toBe(1);
  });
  test("affichage des durées", () => {
    expect(fmtAttente(5 * MIN)).toBe("5 min 00 s");
    expect(fmtAttente(65000)).toBe("1 min 05 s");
    expect(fmtAttente(42000)).toBe("42 s");
    expect(fmtAttente(DELAI_LONG - MIN)).toBe("11 h 59 min");
    expect(fmtChrono(60 * MIN)).toBe("60:00");
    expect(fmtChrono(-5)).toBe("00:00");
  });
  test("consignes : 15 consignes en trois parties, chiffres tirés des règles", () => {
    const c = consignesExamen("FISC", 120, 90);
    expect(c.map(([t]) => t)).toEqual(["Avant de commencer", "Pendant l'épreuve", "Notation et tentatives"]);
    expect(c.reduce((a, [, l]) => a + l.length, 0)).toBe(15);
    const txt = JSON.stringify(c);
    expect(txt).toMatch(/40 questions tirées au hasard dans une banque de 120/);
    expect(txt).toMatch(/90 minutes/);
    expect(txt).toMatch(/4 sorties au maximum/);
    expect(txt).toMatch(/5e, l'examen est terminé/);
    expect(txt).toMatch(/12 heures/);
  });
});

// Liste « Il vous reste » de la carte d'examen final (SYSCOHADA Niveau 1 : modules réussis, exercice « Quel compte ? » à faire)
test("éléments restant à réussir avant l'examen final", () => {
  const { resteAFaire } = require("./ExamenFinal");
  const { etatParcours, SYS1 } = require("../attest/regles");
  const modules = p => Object.fromEntries(SYS1.map(([f]) => [`SY-${f}`, { pct: p }]));
  const e = etatParcours("SYS-N1", [], { scores: modules(100) });
  expect(resteAFaire(e).map(x => [x.cle, x.ouvert, x.pct])).toEqual([["CPT-T", true, null]]);
  const e2 = etatParcours("SYS-N1", [], { scores: { ...modules(100), "CPT-T": { pct: 55 } } });
  expect(resteAFaire(e2).map(x => x.pct)).toEqual([55]);
  expect(resteAFaire(etatParcours("SYS-N1", [], { scores: { ...modules(100), "CPT-T": { pct: 80 } } }))).toEqual([]);
});
