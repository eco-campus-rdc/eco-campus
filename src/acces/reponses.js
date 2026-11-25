// ══════════════════ RÉPONDRE À UNE DEMANDE D'ACCÈS (ADMIN) ══════════════════
// Réponses types proposées à l'administrateur depuis la carte d'un apprenant (Apprenants › Demandes d'accès),
// et outils pour joindre l'apprenant sur WhatsApp. Le message part dans la messagerie de l'application
// (rubrique Messages de l'apprenant, avec notification), et en copie par e-mail si l'administrateur le souhaite.

const prenom = u => String((u && u.nom) || "").trim().split(/\s+/)[0] || "";
const chiffres = s => String(s || "").replace(/\D/g, "");

// Numéro congolais au format international (243 + 9 chiffres), ou null.
// Accepte « 0808028104 », « 808 028 104 », « +243 808 028 104 », « 00243… ».
export function telInternational(s) {
  let d = chiffres(s);
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("243")) d = d.slice(3);
  if (d.startsWith("0")) d = d.slice(1);
  return /^[89]\d{8}$/.test(d) ? `243${d}` : null;
}

// Une « référence » qui n'est qu'un numéro de téléphone (erreur fréquente : le numéro payeur au lieu de la référence du SMS)
export const refRessembleTel = ref => {
  const t = String(ref || "").trim();
  return !!t && /^[+\d\s.-]+$/.test(t) && !!telInternational(t);
};

// Numéros où joindre l'apprenant sur WhatsApp : numéro payeur, téléphone du profil, puis « référence » si c'est un numéro
export function numerosApprenant(u) {
  const L = [u && u.demandeTel, u && u.tel, u && refRessembleTel(u.demandeRef) ? u.demandeRef : null].map(telInternational).filter(Boolean);
  return [...new Set(L)];
}
export const lienWhatsApp = (tel, texte) => `https://wa.me/${tel}?text=${encodeURIComponent(texte || "")}`;

// Réponses types. offre : { l, prix } (libellé et prix de l'offre demandée), facultative.
export function modelesReponse(u, offre) {
  const p = prenom(u), bonjour = p ? `Bonjour ${p},` : "Bonjour,";
  const of = offre ? ` (${offre.l})` : "", ref = u && u.demandeRef ? String(u.demandeRef).trim() : "";
  const fin = "\n\nL'équipe Éco-Campus RDC";
  const L = [];
  if (refRessembleTel(ref)) L.push({ k: "ref-tel", l: "Référence = numéro de téléphone", ico: "phone-x",
    texte: `${bonjour}\n\nNous avons bien reçu votre demande d'accès${of}. La référence indiquée (${ref}) est un numéro de téléphone : il nous faut la référence de la transaction, inscrite dans le SMS de confirmation Mobile Money (par exemple : PP261123.1012.A48213).\n\nRépondez simplement à ce message avec cette référence, ou une capture du SMS, et nous validerons votre accès.${fin}` });
  L.push({ k: "ref", l: "Référence introuvable", ico: "file-search",
    texte: `${bonjour}\n\nNous avons bien reçu votre demande d'accès${of}, mais nous ne retrouvons pas la référence ${ref ? `« ${ref} » ` : ""}dans nos paiements reçus. Merci de vérifier la référence de la transaction dans le SMS de confirmation Mobile Money et de nous la renvoyer en répondant à ce message (une capture du SMS suffit).${fin}` });
  L.push({ k: "non-recu", l: "Paiement non reçu", ico: "clock-exclamation",
    texte: `${bonjour}\n\nNous n'avons pas encore reçu de paiement correspondant à votre demande${of}. Vérifiez que l'envoi a bien été effectué au numéro affiché dans l'application (« Obtenir l'accès ») et au bon bénéficiaire. Dès réception, votre code d'accès vous sera envoyé. En cas de doute, répondez à ce message avec la capture du SMS.${fin}` });
  L.push({ k: "montant", l: "Montant insuffisant", ico: "coin-off",
    texte: `${bonjour}\n\nLe montant reçu ne correspond pas à l'offre demandée${of}${offre && offre.prix != null ? `, soit ${offre.prix} $` : ""}. Vous pouvez compléter le paiement, ou nous indiquer l'offre qui correspond au montant payé : nous validerons alors votre accès pour cette durée.${fin}` });
  L.push({ k: "confirme", l: "Paiement confirmé", ico: "circle-check",
    texte: `${bonjour}\n\nVotre paiement${of} est bien reçu, merci ! Votre code d'accès vous est envoyé dans quelques instants, par message et par e-mail. Il suffira de l'activer depuis votre accueil.${fin}` });
  L.push({ k: "libre", l: "Message libre", ico: "pencil", texte: `${bonjour}\n\n\n${fin.trim()}` });
  return L;
}
