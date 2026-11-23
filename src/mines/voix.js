import { choisirVoix, lireReglagesVoix } from "../audio/LecteurAudio";

// ══════════════════ VOIX OFF DES CARICATURES ANIMÉES ══════════════════
// Chaque étape est lue à voix haute (synthèse vocale du navigateur, même voix et même vitesse que « Écouter les cours »).
// L'animation attend la fin de la phrase avant de passer à l'étape suivante : l'image et la voix restent synchronisées.

// Avance l'horloge de l'animation de dt secondes.
// bornes : instants de début des étapes ; dite : dernière étape lue ; parle : une phrase est en cours.
// Renvoie { t, dire (indice de l'étape à lire maintenant ou null), fin }.
export function avancer({ t, dt, duree, bornes, dite, parle, son }) {
  let n = t + dt, dire = null;
  if (son) {
    const suivante = dite + 1, borne = suivante < bornes.length ? bornes[suivante] : duree;
    // on attend la fin de la phrase, juste avant l'étape suivante (le sous-titre reste celui qui est lu)
    if (parle && n >= borne - 1e-3) n = Math.max(t, borne - 1e-3);
    else if (!parle && suivante < bornes.length && n >= bornes[suivante]) dire = suivante;
  }
  if (n >= duree && !(son && parle)) return { t: duree, dire, fin: true };
  return { t: Math.min(n, duree), dire, fin: false };
}

// Durée de secours d'une phrase (si le navigateur ne signale pas la fin de la lecture)
export const dureeSecours = (texte, vitesse = 1) => (String(texte).split(/\s+/).length / 2.4) / vitesse + 1.5;

export const EVT_AUDIO = "ec-audio"; // un seul lecteur parle à la fois (même événement que LecteurAudio)
export const synthese = () => (typeof window !== "undefined" && "speechSynthesis" in window ? window.speechSynthesis : null);
const vitesse = () => { try { return +localStorage.getItem("ec_audio_vitesse") || 1; } catch (e) { return 1; } };

// Lit un texte ; fin() est appelée une seule fois (fin normale, erreur ou durée de secours dépassée).
// Renvoie une fonction d'annulation.
export function parler(texte, fin) {
  const s = synthese(); if (!s) { fin(); return () => {}; }
  let fait = false; const finir = () => { if (!fait) { fait = true; clearTimeout(minuteur); fin(); } };
  const v = vitesse(), u = new SpeechSynthesisUtterance(texte), { v: voix, pitch } = choisirVoix(lireReglagesVoix());
  if (voix) u.voice = voix;
  u.lang = voix ? voix.lang : "fr-FR"; u.rate = v; u.pitch = pitch;
  u.onend = finir; u.onerror = finir;
  const minuteur = setTimeout(finir, dureeSecours(texte, v) * 1000 + 4000);
  try { s.speak(u); } catch (e) { finir(); }
  return () => { fait = true; clearTimeout(minuteur); };
}
export function lireSon() { try { return localStorage.getItem("ec_anim_son") !== "0"; } catch (e) { return true; } }
export function ecrireSon(on) { try { localStorage.setItem("ec_anim_son", on ? "1" : "0"); } catch (e) { /* stockage indisponible */ } }
