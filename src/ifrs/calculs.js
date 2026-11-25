// ══════════════════ IFRS : CALCULS DES SIMULATEURS (fonctions pures, testées) ══════════════════
// Chaque fonction reproduit un cas du classeur « Apprendre les IFRS » : les simulateurs (src/ifrs/Outils.jsx)
// recalculent tout dès qu'une donnée change, comme les cellules bleues du classeur.
const r2 = x => Math.round(x * 100) / 100;
const num = (v, d = 0) => { const n = Number(v); return Number.isFinite(n) ? n : d; };

// ── IFRS 9 : crédit au coût amorti et taux d'intérêt effectif (prêt in fine, coupon annuel) ──
// vi = nominal − frais perçus + coûts de transaction ; TIE = taux qui égalise vi et les flux futurs.
export function tie({ nominal, taux, duree, frais = 0, couts = 0 }) {
  const N = num(nominal), t = num(taux), n = Math.max(1, Math.round(num(duree, 1))), vi = N - num(frais) + num(couts);
  const coupon = N * t;
  const va = r => { let s = 0; for (let k = 1; k <= n; k++) s += coupon / Math.pow(1 + r, k); return s + N / Math.pow(1 + r, n); };
  let bas = -0.99, haut = 10;
  for (let i = 0; i < 200; i++) { const m = (bas + haut) / 2; if (va(m) > vi) bas = m; else haut = m; }
  const r = (bas + haut) / 2, lignes = [];
  let vc = vi;
  for (let k = 1; k <= n; k++) {
    const interet = vc * r, encaisse = coupon + (k === n ? N : 0), cloture = vc + interet - encaisse;
    lignes.push({ annee: k, ouverture: vc, interet, coupon, remboursement: k === n ? N : 0, cloture: Math.abs(cloture) < 1e-6 ? 0 : cloture });
    vc = cloture;
  }
  return { vi, tie: r, coupon, lignes, fraisEtales: lignes.reduce((a, l) => a + l.interet - l.coupon, 0) };
}

// ── IFRS 9 : dépréciation ECL en 3 stades (simplifiée, sans actualisation) ──
export function ecl({ ead, lgd, pd12, pdVie, jours = 0 }) {
  const E = num(ead), L = num(lgd), j = num(jours);
  const stade = j > 90 ? 3 : j > 30 ? 2 : 1;
  const ecl12 = E * num(pd12) * L, eclVie = E * num(pdVie) * L, montant = stade === 1 ? ecl12 : eclVie;
  return { stade, ecl12, eclVie, montant, complement: montant - ecl12, base: stade === 3 ? "valeur nette (brute − dépréciation)" : "valeur brute" };
}

// ── IFRS 16 : bail du preneur (loyers payés à terme échu) ──
export function bail({ loyer, duree, taux, coutsDirects = 0 }) {
  const Ly = num(loyer), n = Math.max(1, Math.round(num(duree, 1))), t = num(taux);
  const dette0 = t ? Ly * (1 - Math.pow(1 + t, -n)) / t : Ly * n, du = dette0 + num(coutsDirects), amort = du / n;
  const lignes = []; let d = dette0;
  for (let k = 1; k <= n; k++) {
    const interet = d * t, cloture = d + interet - Ly;
    lignes.push({ annee: k, ouverture: d, interet, loyer: Ly, cloture: Math.abs(cloture) < 1e-6 ? 0 : cloture, amort, chargeIfrs: interet + amort, chargeLoyer: Ly });
    d = cloture;
  }
  return { dette0, droitUtilisation: du, amort, lignes };
}

// ── IAS 12 : impôts différés ──
// elements : [{ l, type: "actif", vc, base }] ou [{ l, type: "provision", montant }] (charge non déductible aujourd'hui)
export function impotsDifferes(elements, taux) {
  const t = num(taux);
  const L = (elements || []).map(e => {
    if (e.type === "provision") { const diff = num(e.montant); return { ...e, diff, nature: diff > 0 ? "IDA" : "—", impot: diff * t }; }
    const diff = num(e.vc) - num(e.base);
    return { ...e, diff, nature: diff > 0 ? "IDP" : diff < 0 ? "IDA" : "—", impot: Math.abs(diff) * t };
  });
  const ida = L.filter(x => x.nature === "IDA").reduce((a, x) => a + x.impot, 0), idp = L.filter(x => x.nature === "IDP").reduce((a, x) => a + x.impot, 0);
  return { lignes: L, ida, idp, net: ida - idp };
}

// ── IAS 21 : opérations en devises (monnaie fonctionnelle CDF) ──
export function devises({ montant, coursInitial, coursCloture, monetaire = true }) {
  const m = num(montant), ci = num(coursInitial), cc = num(coursCloture);
  const initial = m * ci, cloture = monetaire ? m * cc : initial, ecart = cloture - initial;
  // SYSCOHADA (comptes individuels) : écart latent au bilan ; perte latente provisionnée, gain latent non reconnu en résultat
  const syscohada = !monetaire || ecart === 0 ? { resultat: 0, bilan: 0, texte: "Aucun écart" }
    : ecart > 0 ? { resultat: 0, bilan: ecart, texte: "Gain latent en écart de conversion au bilan, pas en résultat" }
    : { resultat: ecart, bilan: -ecart, texte: "Perte latente en écart de conversion, couverte par une provision (charge)" };
  return { initial, cloture, ecart, ifrsResultat: monetaire ? ecart : 0, syscohada };
}

// ── IFRS 15 : allocation du prix d'un forfait entre obligations de prestation ──
// obligations : [{ l, prixSepare, mode: "instant" | "progressif", dureeMois? }]
export function allocation({ prix, obligations, moisEcoules = 0 }) {
  const P = num(prix), tot = (obligations || []).reduce((a, o) => a + num(o.prixSepare), 0) || 1, m = num(moisEcoules);
  const L = (obligations || []).map(o => {
    const alloue = P * num(o.prixSepare) / tot;
    const part = o.mode === "instant" ? 1 : Math.min(1, m / Math.max(1, num(o.dureeMois, 12)));
    return { ...o, alloue, revenu: alloue * part };
  });
  const revenu = L.reduce((a, o) => a + o.revenu, 0);
  return { lignes: L, revenu, passif: P - revenu };
}

// ── IAS 36 : test de dépréciation d'une UGT ──
export function ugt({ vc, goodwill = 0, jvCouts, vu }) {
  const V = num(vc), g = num(goodwill), recouvrable = Math.max(num(jvCouts), num(vu)), perte = Math.max(0, V - recouvrable);
  const surGoodwill = Math.min(perte, g);
  return { recouvrable, perte, surGoodwill, surAutres: perte - surGoodwill, retenue: num(jvCouts) >= num(vu) ? "juste valeur − coûts de sortie" : "valeur d'utilité" };
}

// ── IAS 16 : approche par composants ──
export function composants({ terrain = 0, parties, dureeGlobale }) {
  const L = (parties || []).map(p => ({ ...p, dotation: num(p.duree) > 0 ? num(p.montant) / num(p.duree) : 0 }));
  const bati = L.reduce((a, p) => a + num(p.montant), 0), dotation = L.reduce((a, p) => a + p.dotation, 0);
  const globale = num(dureeGlobale) > 0 ? bati / num(dureeGlobale) : 0;
  return { lignes: L, terrain: num(terrain), bati, dotation, globale, ecart: dotation - globale };
}

// ── IAS 37 : provision, passif éventuel ou rien ──
// cas : { obligation, probabilite (0-1), montant, nombre? (population nombreuse) , taux? (taux d'aboutissement) }
export function provision({ obligation = true, probabilite, montant, nombre = 1, montantUnitaire, tauxAboutissement }) {
  if (!obligation) return { decision: "rien", montant: 0, texte: "Pas d'obligation actuelle née d'un événement passé : ni provision ni annexe." };
  if (num(nombre) > 1) { const m = num(nombre) * num(montantUnitaire) * num(tauxAboutissement); return { decision: "provision", montant: m, texte: "Population nombreuse : valeur attendue (nombre × montant × taux d'aboutissement)." }; }
  if (num(probabilite) > 0.5) return { decision: "provision", montant: num(montant), texte: "Sortie probable (> 50 %), cas unique : résultat le plus probable, soit le montant entier." };
  return { decision: "annexe", montant: 0, texte: "Sortie non probable : passif éventuel mentionné en annexe (sauf si éloigné), pas de provision." };
}

export { r2 };
