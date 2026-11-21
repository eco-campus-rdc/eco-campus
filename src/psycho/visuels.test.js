import { PSY_VISUELS, CATS_VISUELLES, decrire } from "./visuels";

const NIVS = ["facile", "moyen", "difficile", "tresdiff", "expert"];
const CATS = ["fig", "dominos", ...CATS_VISUELLES.map(c => c.id)];
const TYPES = ["suite", "matrice", "intrus", "miroir", "dominos", "cartes", "roue", "triangles", "pyramide", "engrenages"];
const FORMES = ["cercle", "carre", "triangle", "losange", "pentagone", "hexagone", "etoile", "fleche", "L", "cadre"];
const figs = q => { const s = q.schema; return [...(s.items || []), ...(s.cells || []), s.item, ...(q.opts || []).map(o => o && o.fig)].filter(f => f && f.f); };
const mod7 = x => ((x % 7) + 7) % 7;

describe("Tests psychotechniques visuels", () => {
  test("12 questions dessinées par niveau, identifiants uniques, catégories et schémas connus", () => {
    NIVS.forEach(n => expect(PSY_VISUELS.filter(q => q.niv === n)).toHaveLength(12));
    expect(new Set(PSY_VISUELS.map(q => q.id)).size).toBe(PSY_VISUELS.length);
    PSY_VISUELS.forEach(q => {
      expect(CATS).toContain(q.cat);
      expect(TYPES).toContain(q.schema.t);
      expect(q.q.length).toBeGreaterThan(10);
      expect(q.exp.length).toBeGreaterThan(15);
      figs(q).forEach(f => { expect(FORMES).toContain(f.f); expect(f.n || 1).toBeLessThanOrEqual(6); });
    });
  });
  test("réponses : 4 options distinctes et réponse valide, ou réponse libre numérique", () => {
    PSY_VISUELS.forEach(q => {
      if (q.libre) { expect(q.a).toMatch(/^\d+$/); expect(q.opts).toBeUndefined(); return; }
      expect(q.opts).toHaveLength(4);
      expect(new Set(q.opts.map(o => JSON.stringify(o))).size).toBe(4);
      expect(q.a).toBeGreaterThanOrEqual(0); expect(q.a).toBeLessThan(4);
      q.opts.forEach(o => expect(decrire(o).length).toBeGreaterThan(0));
    });
  });
  test("une seule case à trouver par énoncé", () => {
    PSY_VISUELS.forEach(q => {
      const s = q.schema;
      const trous = s.t === "triangles" ? s.items.flat().filter(v => v == null).length
        : s.t === "pyramide" ? s.rangs.flat().filter(v => v == null).length
        : ["suite", "dominos", "cartes", "roue"].includes(s.t) ? s.items.filter(v => v == null).length
        : s.t === "matrice" ? s.cells.filter(v => v == null).length : 1;
      expect(trous).toBe(1);
    });
  });
  test("dominos : valeurs de 0 à 6 ; les règles annoncées donnent la bonne réponse", () => {
    PSY_VISUELS.filter(q => q.schema.t === "dominos").forEach(q => {
      [...q.schema.items.filter(Boolean), ...q.opts.map(o => o.domino)].forEach(d => d.forEach(v => { expect(v).toBeGreaterThanOrEqual(0); expect(v).toBeLessThanOrEqual(6); }));
    });
    const rep = id => { const q = PSY_VISUELS.find(x => x.id === id); return q.opts[q.a].domino; };
    expect(rep("vi_d7")).toEqual([5, mod7(5 * 2)]);
    expect(rep("vi_t5")).toEqual([0, mod7(5 + 2)]);
    expect(rep("vi_e5")).toEqual([1, mod7(6 + 2)]);
  });
  test("pyramides : chaque brique est la somme des deux qui la portent (réponse comprise)", () => {
    PSY_VISUELS.filter(q => q.schema.t === "pyramide").forEach(q => {
      const r = q.schema.rangs.map(x => x.map(v => (v == null ? Number(q.a) : v)));
      for (let i = 0; i < r.length - 1; i++) r[i].forEach((v, j) => expect(v).toBe(r[i + 1][j] + r[i + 1][j + 1]));
    });
  });
  test("triangles : la règle de l'explication vaut pour les trois triangles", () => {
    const regles = { vi_m10: (h, g, d) => h + g + d, vi_d11: (h, g, d) => (h + g) * d, vi_t12: (h, g, d) => h * g - d, vi_e12: (h, g, d) => h * h + g * g + d * d };
    Object.entries(regles).forEach(([id, f]) => {
      const q = PSY_VISUELS.find(x => x.id === id), rep = Number(q.libre ? q.a : q.opts[q.a]);
      q.schema.items.forEach(t => { const v = t.map(x => (x == null ? rep : x)); expect(f(v[0], v[1], v[2])).toBe(v[3]); });
    });
  });
  test("roues : la suite annoncée donne la réponse", () => {
    const rep = id => { const q = PSY_VISUELS.find(x => x.id === id); return Number(q.libre ? q.a : q.opts[q.a]); };
    expect(rep("vi_f10")).toBe(10);
    expect(rep("vi_m9")).toBe(10 - 6);
    expect(rep("vi_d9")).toBe(3 + 5);
    expect(rep("vi_t8")).toBe(17 * 2 - 1);
    expect(rep("vi_e8")).toBe(36 - 1);
  });
  test("engrenages : roues voisines au contact, sens alterné", () => {
    PSY_VISUELS.filter(q => q.schema.t === "engrenages").forEach(q => {
      const R = q.schema.roues;
      for (let i = 0; i < R.length - 1; i++) {
        const d = Math.hypot(R[i + 1].x - R[i].x, R[i + 1].y - R[i].y);
        expect(Math.abs(d - (R[i].r + R[i + 1].r))).toBeLessThanOrEqual(2);
      }
    });
    // chaîne de n roues en ligne : la dernière tourne comme A si n est impair
    const sens = id => { const q = PSY_VISUELS.find(x => x.id === id); return { n: q.schema.roues.length, rep: q.opts[q.a] }; };
    [["vi_m11", true], ["vi_d12", false], ["vi_e10", false]].forEach(([id, commeA]) => {
      const { n, rep } = sens(id);
      expect(n % 2 === 1).toBe(commeA);
      expect(/inverse/i.test(rep)).toBe(!commeA);
    });
  });
  test("descriptions lisibles des options dessinées", () => {
    expect(decrire({ fig: { f: "cercle", n: 3, p: "raye" } })).toBe("3 cercles rayés");
    expect(decrire({ fig: { f: "fleche", r: 270 } })).toBe("1 flèche vers la gauche");
    expect(decrire({ fig: { f: "cadre", pt: 2 } })).toBe("point en bas à droite");
    expect(decrire({ domino: [4, 3] })).toBe("domino 4 | 3");
    expect(decrire({ carte: { v: "R", c: "♠" } })).toBe("Roi de pique");
  });
});
