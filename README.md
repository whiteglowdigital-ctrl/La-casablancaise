# Site restaurant — base Jëfya

Premier cas réel : **La Casablancaise**, restaurant à Thiès (Sénégal).
Il s'agit d'un site statique : HTML, CSS et JavaScript, sans serveur, sans base de données et sans dépendance à installer.

## Architecture

| Fichier | Rôle | À modifier pour un nouveau client ? |
|---|---|---|
| `content.js` | **Toutes les données du restaurant** : textes, carte, prix, images, horaires, zones de livraison, WhatsApp, réseaux | **Oui** |
| `index.html` | Structure de la page + balises SEO / partage (`<head>`) | **Oui, uniquement le `<head>`** |
| `images/` | Photos, logo, favicon, image de partage | **Oui** (mêmes noms de fichiers) |
| `styles.css` | Styles et animations du site | Seulement les couleurs et polices dans `:root` |
| `render.js` | Moteur : injecte `content.js` dans la page | Non |
| `app.js` | Moteur d'animations (scroll, scènes épinglées) | Non |
| `commande.js` / `commande.css` | Module de commande : carte, panier, formulaire, envoi WhatsApp | Non |

L'ordre de chargement des scripts compte : `content.js` → `render.js` → `commande.js` → `app.js`.

## Images attendues

| Fichier | Usage | Format |
|---|---|---|
| `hero.jpg` | Image d'accroche (zoom plein écran) | 1800 × 1200 |
| `process.jpg` | Image de la scène « Une soirée, 3 temps » | 1800 × 1200 |
| `f01` → `f10.jpg` | Nuage d'images du hero | petits formats, portrait ou paysage |
| `p1` → `p8.jpg` | Plats phares (section Carte) | 640 px de large |
| `t01` → `t20.jpg` | Traînée d'images sous la souris | petits formats |
| `menu/*.jpg` | Photos de la carte commandable | 600 × 450 |
| `logo.png`, `favicon.png` | Logo (footer) et icône d'onglet | PNG transparent |
| `og.jpg` | Image d'aperçu sur WhatsApp / Facebook | 1200 × 630 |

## Créer un deuxième restaurant

1. Dupliquer le dossier complet et le renommer (ex. `chez-fatou`).
2. Dans **`content.js`**, remplacer toutes les données :
   - `brand` : nom, logo, titre, description, adresse (copyright), réseaux.
   - Les textes de chaque scène : `hook`, `positioning`, `manifesto`, `proof`, `motto`, `universes`, `testimonial`, `objections`, `contact`.
   - `order` :
     - `whatsapp` : numéro au format `221XXXXXXXXX`, sans + ni espaces ;
     - `greeting`, `refPrefix`, `infos`, `hours`, `closedMessage` ;
     - `zones` : quartiers et frais de livraison ;
     - `items` : la carte, chaque plat avec `id` unique, `cat`, `price` en FCFA et `img`.
3. Remplacer les images dans `images/` en gardant les mêmes noms et formats.
4. Dans **`index.html`**, adapter uniquement le `<head>` :
   - `title`, `description` et les balises `og:*` ;
   - le bloc JSON-LD (nom, adresse, téléphone, horaires, cuisine, Instagram).
5. *(Si le client le demande)* Changer les couleurs dans `styles.css`, bloc `:root`. `--accent` est la couleur principale, `--accent-text` sa version foncée pour les textes.
6. Tester en local : `python3 -m http.server` dans le dossier, puis ouvrir http://localhost:8000. Parcourir tout le site et passer une commande test jusqu'à WhatsApp.
7. Déployer le dossier tel quel sur Netlify, Vercel, GitHub Pages ou tout hébergement statique.
8. Après la mise en ligne : dans `index.html`, remplacer `images/og.jpg` par l'URL absolue (`https://domaine/images/og.jpg`) dans `og:image` et dans le JSON-LD.

## Commande WhatsApp — fonctionnement

1. Le client ajoute des plats au panier.
2. Il indique son nom, son téléphone, sur place ou livraison (avec son quartier, qui fixe les frais), le paiement choisi (réglé à la réception) et une note facultative.
3. WhatsApp s'ouvre avec le message prérempli vers `order.whatsapp`. Le client appuie sur Envoyer.

Aucun paiement n'est encaissé en ligne. Aucune donnée n'est stockée.

Le contrôle du téléphone accepte les numéros sénégalais (70, 75, 76, 77, 78, 30, 33). Pour un autre pays, adapter `phoneOk()` dans `commande.js`.

## Débogage

`window.__ea` (dans `app.js`) permet de figer l'animation à une position de défilement pour les captures de test : `__ea.scrub(y)` puis `__ea.resume()`.
