import { OBJECTIFS_MODULES, objectifsModule, INTRO_MODULE } from "./objectifsModules";
const { FISC, FIN, SYC, BQ, EF, DT } = require("../attest/regles");

const infinitif = s => /^(?:(?:Se |S')[a-zé]|[A-ZÉ])[a-zéèêàâîïôûç]*(er|ir|re|oir)\b/.test(s);
const ids = [...FISC, ...FIN, ...SYC, ...BQ, ...EF, ...DT].map(([id]) => id);
const codesN1 = ["M01", "M02", "M03", "M04", "M05", "M06", "M07", "M08", "M09", "M10"];

describe("Objectifs des modules", () => {
  test("chaque module des parcours et chaque module SYSCOHADA N1 a trois objectifs", () => {
    [...ids, ...codesN1].forEach(id => {
      const o = OBJECTIFS_MODULES[id];
      if (!o) throw new Error(`objectifs manquants : ${id}`);
      expect(o).toHaveLength(3);
    });
    expect(Object.keys(OBJECTIFS_MODULES).sort()).toEqual([...ids, ...codesN1].sort());
  });
  test("chaque objectif commence par un verbe d'action et finit par un point", () => {
    Object.entries(OBJECTIFS_MODULES).forEach(([id, os]) => os.forEach(o => {
      if (!infinitif(o) || !o.endsWith(".")) throw new Error(`${id} : « ${o} »`);
    }));
    expect(INTRO_MODULE).toMatch(/saurez/);
  });
  test("objectifsModule : champ propre du module, sinon id, sinon code", () => {
    expect(objectifsModule({ id: "F6" })).toEqual(OBJECTIFS_MODULES.F6);
    expect(objectifsModule({ id: "x7Gh2kLmNp", code: "M05" })).toEqual(OBJECTIFS_MODULES.M05);
    expect(objectifsModule({ id: "abc", code: "M05", objectifs: "Calculer A.\n\n  Expliquer B.  " })).toEqual(["Calculer A.", "Expliquer B."]);
    expect(objectifsModule({ id: "abc", objectifs: ["Lire."] })).toEqual(["Lire."]);
    expect(objectifsModule({ id: "inconnu" })).toEqual([]);
    expect(objectifsModule(null)).toEqual([]);
  });
});
