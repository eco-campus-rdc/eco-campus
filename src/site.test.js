import { DOMAINE, BASCULE, SITE_URL, CONTACT_EMAIL, surDomainePro } from "./site";

test("domaine professionnel reconnu, autres hôtes non", () => {
  expect(DOMAINE).toBe("ecocampus-rdc.com");
  expect(surDomainePro("ecocampus-rdc.com")).toBe(true);
  expect(surDomainePro("www.ecocampus-rdc.com")).toBe(true);
  expect(surDomainePro("eco-campus-rdc.vercel.app")).toBe(false);
  expect(surDomainePro("ecocampus-rdc.com.exemple.org")).toBe(false);
  expect(surDomainePro("localhost")).toBe(false);
});

test("adresse et contact cohérents avec l'état de la bascule", () => {
  if (BASCULE) { expect(SITE_URL).toBe("https://ecocampus-rdc.com"); expect(CONTACT_EMAIL).toBe("contact@ecocampus-rdc.com"); }
  else { expect(SITE_URL).toBe("https://eco-campus-rdc.vercel.app"); expect(CONTACT_EMAIL).toBe("gnkuli@outlook.fr"); }
});
