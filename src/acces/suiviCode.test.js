import { etapeAcces, suiviCode } from "./suiviCode";

const T = Date.parse("2026-11-23T08:00:00Z"), H = 3600000;
describe("Suivi d'une demande d'accès", () => {
  test("étapes : paiement à vérifier, code à activer, actif, expiré", () => {
    expect(etapeAcces({ abonnement: "demande" }, T)).toBe("attente");
    expect(etapeAcces({ abonnement: "demande", activationCode: "EC-QMH3UW6M", codeValide: false }, T)).toBe("code");
    expect(etapeAcces({ abonnement: "actif", codeValide: true, dateExpiration: new Date(T + 24 * H).toISOString() }, T)).toBe("actif");
    expect(etapeAcces({ abonnement: "actif", dateExpiration: new Date(T - H).toISOString() }, T)).toBe("expire");
    expect(etapeAcces({ abonnement: "aucun" }, T)).toBe("aucun");
    expect(etapeAcces(null)).toBe("aucun");
  });
  test("code créé mais jamais envoyé : alerte", () => {
    const s = suiviCode({ abonnement: "demande", activationCode: "EC-1", codeGenereLe: new Date(T).toISOString() });
    expect(s.map(e => e.ok)).toEqual([true, false, false, false]);
    expect(s[1]).toMatchObject({ alerte: true, l: "Pas encore envoyé à l'apprenant" });
    expect(s[2].l).toBe("Ne s'est jamais connecté");
  });
  test("code envoyé, apprenant reconnecté mais pas encore activé", () => {
    const s = suiviCode({ abonnement: "demande", activationCode: "EC-1", codeEnvoyeLe: new Date(T - 5 * H).toISOString(), codeEmailOk: true, lastLogin: T - H });
    expect(s.map(e => e.ok)).toEqual([true, true, true, false]);
    expect(s[1].l).toBe("Envoyé par e-mail et par message");
    expect(s[3].l).toBe("Code pas encore activé par l'apprenant");
  });
  test("code créé avant la mise en place du suivi : inviter à le renvoyer", () => {
    const s = suiviCode({ abonnement: "demande", activationCode: "EC-QMH3UW6M" });
    expect(s[1]).toMatchObject({ ok: false, alerte: true });
    expect(s[1].l).toMatch(/avant le suivi/);
  });
  test("e-mail en échec, pas reconnecté depuis l'envoi ; puis activé", () => {
    const u = { abonnement: "demande", activationCode: "EC-1", codeEnvoyeLe: new Date(T - H).toISOString(), codeEmailOk: false, lastLogin: T - 9 * H };
    const s = suiviCode(u);
    expect(s[1].l).toMatch(/l'e-mail a échoué/);
    expect(s[2]).toMatchObject({ ok: false, l: "Pas reconnecté depuis l'envoi" });
    expect(suiviCode({ ...u, abonnement: "actif", codeValide: true })[3]).toMatchObject({ ok: true, l: "Accès activé" });
  });
});
