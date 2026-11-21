import { OBJECTIFS, INTRO_OBJECTIFS } from "./objectifs";
const { PARCOURS } = require("../attest/regles");
import { FORMATIONS } from "./MesFormations";

// Verbe d'action à l'infinitif en tête de chaque compétence (éventuellement pronominal : « Se repérer »)
const infinitif = s => /^(?:(?:Se |S')[a-zé]|[A-ZÉ])[a-zéèêàâîïôûç]*(er|ir|re|oir)\b/.test(s);

describe("Objectifs des formations", () => {
  test("chaque parcours certifiant (et chaque carte de Mes formations) a ses objectifs", () => {
    PARCOURS.forEach(p => expect(OBJECTIFS[p.id]).toBeDefined());
    FORMATIONS.forEach(f => expect(OBJECTIFS[f.id]).toBeDefined());
    expect(Object.keys(OBJECTIFS).sort()).toEqual(PARCOURS.map(p => p.id).sort());
  });
  test("objectif général en une phrase et 6 à 8 compétences formulées avec un verbe d'action", () => {
    Object.entries(OBJECTIFS).forEach(([id, o]) => {
      expect(o.general.length).toBeGreaterThan(40);
      expect(o.general.endsWith(".")).toBe(true);
      expect(o.competences.length).toBeGreaterThanOrEqual(6);
      expect(o.competences.length).toBeLessThanOrEqual(8);
      o.competences.forEach(c => {
        if (!infinitif(c)) throw new Error(`${id} : « ${c} » ne commence pas par un verbe à l'infinitif`);
        expect(c.endsWith(".")).toBe(true);
      });
      expect(new Set(o.competences).size).toBe(o.competences.length);
    });
  });
  test("aucun tarif dans les objectifs", () => {
    const tout = INTRO_OBJECTIFS + JSON.stringify(OBJECTIFS);
    expect(tout).not.toMatch(/\$|USD\s*\d|\d+\s*(FC|CDF)\b/);
  });
});
