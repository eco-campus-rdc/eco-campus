import { cleLecture, dureeMinLecture, dejaLu } from "./lecture";
import { MODULES_FISC } from "../fiscal/modules";
import { MODULES_DT } from "../travail/modules";

describe("Lecture obligatoire avant le QCM", () => {
  test("trace de lecture distincte du statut « done »", () => {
    expect(cleLecture("FISC-F1")).toBe("LU-FISC-F1");
  });
  test("temps minimal proportionnel à la leçon, entre 40 s et 5 min", () => {
    expect(dureeMinLecture("")).toBe(40);
    expect(dureeMinLecture("mot ".repeat(6000))).toBe(300);
    expect(dureeMinLecture("mot ".repeat(1200))).toBe(150);
    [...MODULES_FISC, ...MODULES_DT].forEach(m => {
      const d = dureeMinLecture(m.blocs);
      expect(d).toBeGreaterThanOrEqual(40);
      expect(d).toBeLessThanOrEqual(300);
    });
  });
  test("lu si la trace existe ou si le module a déjà été évalué (acquis conservés)", () => {
    expect(dejaLu({}, {}, "DT-DT1")).toBe(false);
    expect(dejaLu({ "LU-DT-DT1": "lu" }, {}, "DT-DT1")).toBe(true);
    expect(dejaLu({}, { "DT-DT1": { pct: 40 } }, "DT-DT1")).toBe(true);
    expect(dejaLu({ "DT-DT1": "done" }, {}, "DT-DT1")).toBe(false);
    expect(dejaLu(undefined, undefined, null)).toBe(false);
  });
});
