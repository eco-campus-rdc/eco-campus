# Passage à ecocampus-rdc.com et séparation des comptes personnels

Objectif : Éco-Campus RDC a son propre domaine (**ecocampus-rdc.com**), est hébergé sur **Firebase Hosting**
(usage commercial autorisé), et ne dépend plus des comptes personnels de Gédéon NKULI, qui reste **auteur et
propriétaire** (voir `NOTICE.md`).

Le code est prêt : rien ne bascule tant que les étapes ci-dessous ne sont pas faites. Le site Vercel reste en
service jusqu'à la fin.

## Ce qui est déjà prêt dans le code

| Élément | Fichier | État |
|---|---|---|
| Adresse du site et e-mail de contact, à un seul endroit | `src/site.js` (`BASCULE`) | Prêt, valeur actuelle conservée |
| Connexion Google/Facebook par le domaine professionnel (fiable sur iPhone) | `src/App.jsx` (`authDomain`) | S'active seule sur ecocampus-rdc.com |
| Fonctions serveur (attestation, filleuls, push, tableau) sur Firebase | `functions/`, `api/_admin.js` | Prêt, testé hors ligne |
| Hébergement (pages, `/api/…`, `.well-known` pour Android) | `firebase.json` | Prêt |
| Déploiement automatique depuis GitHub | `.github/workflows/firebase.yml` | Inactif tant que la clé manque |
| Mention d'auteur | `NOTICE.md`, `package.json` | Fait |

## Étape A — Un compte dédié à Éco-Campus (30 min)

1. Créer une adresse Google dédiée, par exemple **ecocampus.rdc@gmail.com** (mot de passe fort, double authentification).
   C'est elle qui portera les services d'Éco-Campus ; votre adresse personnelle reste en secours.
2. **Firebase** : console Firebase › projet *access-plus-consulting* › Paramètres du projet › **Utilisateurs et autorisations** ›
   *Ajouter un membre* : l'adresse dédiée, rôle **Propriétaire**. Gardez votre compte personnel propriétaire jusqu'à la fin de la bascule,
   puis décidez : le retirer, ou le garder comme accès de secours.
3. **Facturation** : passez le projet en formule **Blaze** avec un compte de facturation créé par l'adresse dédiée,
   et une **alerte de budget à 5 $ par mois** (Google Cloud › Facturation › Budgets et alertes).

## Étape B — Le code dans une organisation GitHub (15 min)

1. Sur GitHub, avec votre compte : *Your organizations* › **New organization** (gratuite), par exemple **eco-campus-rdc**.
   Vous en êtes **propriétaire** : vous restez maître du code.
2. Dépôt *access-plus-consulting* › Settings › **Transfer ownership** › vers l'organisation.
   L'historique et vos contributions sont conservés ; l'ancienne adresse redirige automatiquement.
3. Installez l'application GitHub **Claude** sur l'organisation, puis dites-le-moi : je rattache le nouveau dépôt à la session.
4. Vérifiez dans Settings › Secrets que les secrets Android (`ANDROID_KEYSTORE_…`) sont toujours là ; sinon, recréez-les.

## Étape C — Le domaine (1 h)

1. Créez un compte **Cloudflare** avec l'adresse dédiée, puis **Registrar** › achetez **ecocampus-rdc.com**
   (environ 10 à 12 $ par an, prix coûtant, renouvellement automatique).
2. **E-mail professionnel gratuit** : Cloudflare › Email › **Email Routing** › créez **contact@ecocampus-rdc.com**
   qui transfère vers votre boîte. Envoyez-vous un essai.

## Étape D — Déployer sur Firebase (30 min, puis je prends le relais)

1. Google Cloud › IAM › **Comptes de service** › créez *github-deploy* avec les rôles :
   *Administrateur Firebase*, *Utilisateur du compte de service*, *Administrateur Cloud Functions*,
   *Administrateur Cloud Run*, *Administrateur Artifact Registry*.
   Créez une **clé JSON** pour ce compte (téléchargée sur votre ordinateur, à ne jamais envoyer par message ni par e-mail).
2. GitHub › dépôt › Settings › Secrets and variables › Actions › **New repository secret** :
   nom `FIREBASE_DEPLOY_KEY`, valeur : le contenu du fichier JSON. Supprimez ensuite le fichier de votre ordinateur.
3. Dites-moi « clé ajoutée » : je lance le déploiement et je vérifie l'application sur **access-plus-consulting.web.app**
   (adresse Firebase provisoire), fonctions comprises. Si un droit manque, le journal GitHub le dit et je vous indique le rôle à ajouter.

## Étape E — Brancher le domaine (1 h, plus la propagation)

1. Firebase › Hosting › **Ajouter un domaine personnalisé** : `ecocampus-rdc.com`, puis `www.ecocampus-rdc.com` (redirigé vers le premier).
2. Recopiez dans Cloudflare › DNS les enregistrements donnés par Firebase, **proxy désactivé** (nuage gris). Le certificat HTTPS arrive seul (quelques heures).
3. Firebase › Authentication › Paramètres › **Domaines autorisés** : ajoutez `ecocampus-rdc.com` et `www.ecocampus-rdc.com`.
4. Google Cloud › API et services › **Identifiants** › client OAuth « Web client » : ajoutez
   l'origine `https://ecocampus-rdc.com` et l'URI de redirection `https://ecocampus-rdc.com/__/auth/handler`.
5. Facebook for Developers › votre application › Connexion Facebook › Paramètres : ajoutez la même URI de redirection.
6. EmailJS › Account › Security : si une liste de domaines autorisés est réglée, ajoutez `ecocampus-rdc.com`.

## Étape F — La bascule (je m'en charge)

1. `src/site.js` : `BASCULE = true` (adresse et contact passent à ecocampus-rdc.com) ; pages `public/confidentialite.html`
   et `public/suppression-compte.html` mises à jour.
2. Vercel : redirection permanente de eco-campus-rdc.vercel.app vers ecocampus-rdc.com (liens partagés, QR codes et
   attestations déjà imprimées continuent de fonctionner).
3. Application Android : `android/app/build.gradle` › `siteHost = "ecocampus-rdc.com"`, nouvelle version à envoyer au Play Store.
4. Visuels, vidéos, messages de partage et catalogue PDF régénérés avec la nouvelle adresse.
5. Après quelques semaines sans trafic sur Vercel : suppression du projet Vercel (votre compte personnel n'héberge plus rien).

## Ce qui ne change pas

- Les comptes, scores, abonnements et attestations des apprenants (même base Firebase).
- Le service EmailJS `access_plus_service` et l'adresse d'administration `admin@accessplus.com`.
- Votre qualité d'auteur : `NOTICE.md`, signature des certificats, historique GitHub.
