import { telInternational, refRessembleTel, numerosApprenant, lienWhatsApp, modelesReponse } from "./reponses";

test("numéros congolais au format international", () => {
  expect(telInternational("0808028104")).toBe("243808028104");
  expect(telInternational("+243 81 234 5678")).toBe("243812345678");
  expect(telInternational("00243 97 123 4567")).toBe("243971234567");
  expect(telInternational("812345678")).toBe("243812345678");
  expect(telInternational("PP261123.1012.A48213")).toBeNull();
  expect(telInternational("12345")).toBeNull();
});

test("une « référence » qui est en fait un numéro de téléphone est repérée", () => {
  expect(refRessembleTel("0808028104")).toBe(true);
  expect(refRessembleTel("+243 808 028 104")).toBe(true);
  expect(refRessembleTel("PP261123.1012.A48213")).toBe(false);
  expect(refRessembleTel("MP231125.0824.B12345")).toBe(false);
  expect(refRessembleTel("")).toBe(false);
});

test("numéros WhatsApp de l'apprenant, sans doublon", () => {
  expect(numerosApprenant({ demandeRef: "0808028104" })).toEqual(["243808028104"]);
  expect(numerosApprenant({ demandeTel: "+243 808 028 104", demandeRef: "0808028104", tel: "0991234567" })).toEqual(["243808028104", "243991234567"]);
  expect(numerosApprenant({ demandeRef: "PP261123.1012.A48213" })).toEqual([]);
  expect(lienWhatsApp("243808028104", "Bonjour Emmanuel")).toBe("https://wa.me/243808028104?text=Bonjour%20Emmanuel");
});

test("réponses types : prénom, offre, référence ; modèle « numéro de téléphone » proposé en premier quand il le faut", () => {
  const u = { nom: "Emmanuel ASHIKA OKUNGU", demandeRef: "0808028104" };
  const M = modelesReponse(u, { l: "Mensuel", prix: 5 });
  expect(M[0].k).toBe("ref-tel");
  expect(M[0].texte).toMatch(/^Bonjour Emmanuel,/);
  expect(M[0].texte).toMatch(/0808028104/); expect(M[0].texte).toMatch(/Mensuel/);
  expect(M.find(m => m.k === "montant").texte).toMatch(/5 \$/);
  expect(M.map(m => m.k)).toEqual(["ref-tel", "ref", "non-recu", "montant", "confirme", "libre"]);
  const M2 = modelesReponse({ nom: "", demandeRef: "PP261123.1012.A48213" }, null);
  expect(M2[0].k).toBe("ref"); expect(M2[0].texte).toMatch(/^Bonjour,/);
  M.forEach(m => { expect(m.texte).toMatch(/Éco-Campus RDC$/); expect(new Set(M.map(x => x.k)).size).toBe(M.length); });
});
