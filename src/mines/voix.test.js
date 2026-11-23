import { avancer, dureeSecours } from "./voix";

const base = { duree: 10, bornes: [0, 3, 6], son: true };

test("sans voix : l'horloge avance librement jusqu'à la fin", () => {
  expect(avancer({ ...base, son: false, t: 2.9, dt: 0.5, dite: 0, parle: false })).toEqual({ t: 3.4, dire: null, fin: false });
  expect(avancer({ ...base, son: false, t: 9.9, dt: 0.5, dite: 0, parle: false })).toEqual({ t: 10, dire: null, fin: true });
});

test("avec voix : l'animation attend la fin de la phrase juste avant l'étape suivante", () => {
  const r = avancer({ ...base, t: 2.95, dt: 0.1, dite: 0, parle: true });
  expect(r.t).toBeLessThan(3); expect(r.t).toBeGreaterThan(2.99); expect(r.dire).toBeNull();
  // tant que la phrase dure, on reste sur place
  expect(avancer({ ...base, t: r.t, dt: 0.1, dite: 0, parle: true }).t).toBe(r.t);
});

test("phrase terminée : on passe l'étape et on lit la suivante", () => {
  expect(avancer({ ...base, t: 2.999, dt: 0.05, dite: 0, parle: false })).toMatchObject({ dire: 1, fin: false });
  expect(avancer({ ...base, t: 4, dt: 0.1, dite: 1, parle: false }).dire).toBeNull();
});

test("dernière étape : la scène ne se termine qu'après la dernière phrase", () => {
  expect(avancer({ ...base, t: 9.99, dt: 0.1, dite: 2, parle: true }).fin).toBe(false);
  expect(avancer({ ...base, t: 9.999, dt: 0.1, dite: 2, parle: false })).toMatchObject({ t: 10, fin: true });
});

test("durée de secours proportionnelle au texte et à la vitesse", () => {
  const t = "Le sous-sol congolais regorge de cuivre, de cobalt, d'or et de bien d'autres substances.";
  expect(dureeSecours(t)).toBeGreaterThan(5);
  expect(dureeSecours(t, 1.3)).toBeLessThan(dureeSecours(t));
});
