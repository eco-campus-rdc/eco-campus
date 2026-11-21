import { melanger, ordreFixe, permuterOptions, tirerSerie } from "./serie";
import { PSY_VISUELS } from "./visuels";

// Générateur pseudo-aléatoire reproductible
const graine = s => () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
const q = { id: "x", opts: ["un", "deux", "trois", "quatre"], a: 2 };

describe("Séries psychotechniques : hasard et permutation des réponses", () => {
  test("permutation : même options, bonne réponse suivie, ordre changé", () => {
    for (let s = 1; s < 50; s++) {
      const p = permuterOptions(q, graine(s));
      expect([...p.opts].sort()).toEqual([...q.opts].sort());
      expect(p.opts[p.a]).toBe("trois");
      expect(p.opts).not.toEqual(q.opts);
    }
    expect(q.opts).toEqual(["un", "deux", "trois", "quatre"]); // la banque n'est pas modifiée
  });
  test("la bonne réponse change de place au fil des séries", () => {
    const places = new Set(Array.from({ length: 40 }, (_, s) => permuterOptions(q, graine(s + 1)).a));
    expect(places.size).toBeGreaterThanOrEqual(3);
  });
  test("réponses libres et options liées à une lettre : inchangées", () => {
    const libre = { id: "l", libre: true, a: "8" };
    expect(permuterOptions(libre)).toBe(libre);
    const intrus = PSY_VISUELS.find(x => x.id === "vi_f5");
    expect(ordreFixe(intrus)).toBe(true);
    expect(permuterOptions(intrus)).toBe(intrus);
    expect(ordreFixe({ opts: ["A", "B", "C", "D"] })).toBe(true);
    expect(ordreFixe(q)).toBe(false);
  });
  test("options dessinées permutées aussi", () => {
    const v = PSY_VISUELS.find(x => x.id === "vi_m4"), p = permuterOptions(v, graine(7));
    expect(JSON.stringify(p.opts[p.a])).toBe(JSON.stringify(v.opts[v.a]));
  });
  test("nouvelle série : questions de la série précédente évitées tant que la banque le permet", () => {
    const pool = Array.from({ length: 30 }, (_, i) => ({ id: `q${i}`, opts: ["a", "b", "c", "d"], a: 0 }));
    const s1 = tirerSerie(pool, 12, [], graine(3));
    expect(new Set(s1.map(x => x.id)).size).toBe(12);
    const s2 = tirerSerie(pool, 12, s1.map(x => x.id), graine(5));
    expect(s2.filter(x => s1.some(y => y.id === x.id))).toHaveLength(0);
    // banque trop petite : on complète avec des questions déjà vues
    const s3 = tirerSerie(pool.slice(0, 15), 12, s1.map(x => x.id), graine(9));
    expect(s3).toHaveLength(12);
    s3.forEach(x => expect(x.opts[x.a]).toBe("a"));
  });
  test("ordre des questions aléatoire", () => {
    const pool = Array.from({ length: 10 }, (_, i) => ({ id: `q${i}`, libre: true, a: "1" }));
    const ordres = new Set(Array.from({ length: 10 }, (_, s) => tirerSerie(pool, 10, [], graine(s + 11)).map(x => x.id).join()));
    expect(ordres.size).toBeGreaterThan(5);
    expect(melanger([1, 2, 3])).toHaveLength(3);
  });
});
