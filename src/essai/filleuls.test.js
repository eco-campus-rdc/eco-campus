const { resumeFilleuls, nomAffiche, etatEssai: etatCjs } = require("./reglesEssai");
import { etatEssai, lireConfigEssai, dateEnMs } from "./essai";
import { STATUTS } from "./MesFilleuls";
import { VUES_APPRENANT } from "../nav/navigation";

const MAINT = Date.parse("2026-11-22T10:00:00Z"), JOUR = 86400000;
const fr = ms => new Date(ms).toLocaleDateString("fr-FR");

describe("Mes filleuls", () => {
  test("règles de l'essai partagées : essai.js réexporte le module serveur", () => {
    expect(etatEssai).toBe(etatCjs);
    expect(lireConfigEssai({ recompenseJours: 20 }).recompenseJours).toBe(20);
    expect(dateEnMs("21/11/2026")).toBe(new Date(2026, 10, 21).getTime());
  });
  test("nom affiché : prénom et initiale seulement", () => {
    expect(nomAffiche("MUKENDI Jean-Paul")).toBe("Mukendi J.");
    expect(nomAffiche("grace")).toBe("Grace");
    expect(nomAffiche("")).toBe("Un ami");
  });
  test("statuts : récompense, abonné, essai, inscrit ; totaux et tri du plus récent", () => {
    const P = "parrain123456789012345";
    const f = [
      { nom: "Amina Kabila", mail: "a@x.cd", tel: "0990", parrainUid: P, createdAt: fr(MAINT - 3 * JOUR), abonnement: "aucun", scores: { x: 1 } },
      { nom: "Benoît Lukusa", parrainUid: P, createdAt: fr(MAINT - 40 * JOUR), abonnement: "actif", dateExpiration: new Date(MAINT + 20 * JOUR).toISOString() },
      { nom: "Chantal Mbuyi", parrainUid: P, createdAt: fr(MAINT - 60 * JOUR), abonnement: "actif", dateExpiration: new Date(MAINT + 60 * JOUR).toISOString(), parrainRecompense: "2026-10-01T10:00:00Z" },
      { nom: "David", parrainUid: P, createdAt: fr(MAINT - 30 * JOUR), abonnement: "expiré" },
    ];
    const r = resumeFilleuls(f, { recompenseJours: 20, depuis: "2026-01-01T00:00:00Z" }, MAINT);
    expect(r.filleuls.map(x => [x.nom, x.statut])).toEqual([["Amina K.", "essai"], ["David", "inscrit"], ["Benoît L.", "abonne"], ["Chantal M.", "recompense"]]);
    expect(r.filleuls[0].joursEssai).toBeGreaterThan(0);
    expect(r.totaux).toEqual({ inscrits: 4, enEssai: 1, abonnes: 2, recompenses: 1 });
    expect(r.recompenseJours).toBe(20);
    // Aucune donnée personnelle superflue n'est renvoyée au parrain
    const json = JSON.stringify(r);
    expect(json).not.toMatch(/a@x\.cd|0990|Kabila|scores/);
    r.filleuls.forEach(x => expect(Object.keys(x).sort()).toEqual(["inscritLe", "joursEssai", "nom", "recompenseLe", "statut"]));
  });
  test("chaque statut a son libellé ; la rubrique est dans la navigation de l'apprenant", () => {
    ["recompense", "abonne", "essai", "inscrit"].forEach(s => expect(STATUTS[s].l).toBeTruthy());
    expect(VUES_APPRENANT).toContain("filleuls");
  });
});
