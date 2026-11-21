// ══════════════════ TESTS PSYCHOTECHNIQUES : TIRAGE DES SÉRIES ══════════════════
// À chaque série (et à chaque « Recommencer ») :
// - les questions sont tirées au hasard, en privilégiant celles de la banque absentes de la série précédente ;
// - l'ordre des questions est aléatoire ;
// - l'ordre des réponses proposées est permuté (la bonne réponse change de place), sauf quand les options
//   désignent elles-mêmes une position (« Figure A », « A », « B »… alignées sur les lettres de l'écran).

export const melanger = (t, alea = Math.random) => { const x = t.slice(); for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(alea() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; } return x; };

// Options liées à leur place (lettres) : on ne les déplace pas
export const ordreFixe = q => !q.opts || q.opts.every(o => typeof o === "string" && /^(Figure )?[A-Z]$/.test(o.trim()));

// Permute les options d'une question ; la réponse attendue suit sa nouvelle place. Jamais l'ordre d'origine quand c'est possible.
export function permuterOptions(q, alea = Math.random) {
  if (q.libre || ordreFixe(q) || q.opts.length < 2) return q;
  const id = q.opts.map((_, i) => i);
  let p = melanger(id, alea);
  for (let k = 0; k < 5 && p.every((v, i) => v === i); k++) p = melanger(id, alea);
  if (p.every((v, i) => v === i)) p = [...id.slice(1), id[0]];
  return { ...q, opts: p.map(i => q.opts[i]), a: p.indexOf(q.a) };
}

// Série de n questions tirées dans pool ; precedents : identifiants de la série précédente (renouvelés en priorité)
export function tirerSerie(pool, n, precedents = [], alea = Math.random) {
  const vus = new Set(precedents);
  const neufs = melanger(pool.filter(q => !vus.has(q.id)), alea), revus = melanger(pool.filter(q => vus.has(q.id)), alea);
  const choisies = [...neufs, ...revus].slice(0, Math.min(n, pool.length));
  return melanger(choisies, alea).map(q => permuterOptions(q, alea));
}

// Mémoire de la dernière série par test (navigateur) ; sans stockage disponible, la série est simplement aléatoire
const cle = test => `psy-derniere-serie-${test}`;
export function lirePrecedents(test) { try { return JSON.parse(localStorage.getItem(cle(test)) || "[]"); } catch (e) { return []; } }
export function ecrirePrecedents(test, ids) { try { localStorage.setItem(cle(test), JSON.stringify(ids)); } catch (e) { /* stockage indisponible */ } }
