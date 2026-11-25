// Copie dans functions/ le code des fonctions serveur (api/) et les fichiers partagés qu'elles chargent (src/…),
// en gardant les mêmes chemins relatifs : api/filleuls.js charge « ../src/essai/reglesEssai », etc.
// Lancé automatiquement avant chaque déploiement des fonctions (firebase.json › functions.predeploy).
const fs = require("fs"), path = require("path");
const RACINE = path.join(__dirname, ".."), ICI = __dirname;
const FICHIERS = [
  "api/_admin.js", "api/_push.js", "api/attestation.js", "api/filleuls.js", "api/push.js", "api/tableau.js",
  "src/attest/regles.js", "src/essai/reglesEssai.js", "src/admin/indicateurs.js", "src/auto/automatisations.js", "src/site.js",
];
for (const d of ["api", "src"]) fs.rmSync(path.join(ICI, d), { recursive: true, force: true });
for (const f of FICHIERS) {
  const dest = path.join(ICI, f);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(path.join(RACINE, f), dest);
}
// Contrôle : chaque require relatif des fichiers copiés doit être présent
for (const f of FICHIERS) {
  const txt = fs.readFileSync(path.join(ICI, f), "utf8");
  for (const [, r] of txt.matchAll(/require\("(\.[^"]+)"\)/g)) {
    const cible = path.join(ICI, path.dirname(f), r);
    if (![cible, cible + ".js", path.join(cible, "index.js")].some(p => fs.existsSync(p))) {
      console.error(`Fichier manquant pour ${f} : ${r}`); process.exit(1);
    }
  }
}
console.log(`${FICHIERS.length} fichiers copiés dans functions/`);
