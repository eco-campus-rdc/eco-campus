// ══════════════════ ADRESSE DU SITE ET CONTACT (UN SEUL ENDROIT À MODIFIER) ══════════════════
// Bascule vers le domaine professionnel : quand ecocampus-rdc.com sert l'application (Firebase Hosting) et que
// contact@ecocampus-rdc.com reçoit les e-mails (Cloudflare Email Routing), passer BASCULE à true.
// Les pages statiques de public/ (confidentialité, suppression de compte) sont mises à jour en même temps (docs/domaine.md).
export const DOMAINE = "ecocampus-rdc.com";
export const BASCULE = false;
export const SITE_URL = BASCULE ? `https://${DOMAINE}` : "https://eco-campus-rdc.vercel.app";
export const SITE_LABEL = SITE_URL.replace(/^https:\/\//, "");
export const CONTACT_EMAIL = BASCULE ? `contact@${DOMAINE}` : "gnkuli@outlook.fr";

// Application servie depuis le domaine professionnel (ou un de ses sous-domaines, ex. www)
export const surDomainePro = (hote = typeof window !== "undefined" ? window.location.hostname : "") =>
  hote === DOMAINE || hote.endsWith(`.${DOMAINE}`);
