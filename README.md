# Site restaurant — base Jëfya

Premier cas réel : **La Casablancaise**, restaurant à Thiès (Sénégal).
Il s'agit d'un site statique : HTML, CSS et JavaScript, sans serveur, sans base de données et sans dépendance à installer.

## Architecture

| Fichier | Rôle | À modifier pour un nouveau client ? |
|---|---|---|
| `content.js` | **Toutes les données du restaurant** : textes, carte, prix, images, horaires, zones de livraison, WhatsApp, réseaux | **Oui** |
| `index.html` | Structure de la page + balises SEO / partage (`<head>`) | **Oui, uniquement le `<head>`** |
| `images/` | Photos, logo, favicon, image de partage | **Oui** (mêmes noms de fichiers) |
| `styles.css` | Mise en page du site (vert profond, doré, crème) | Seulement les couleurs et polices dans `:root` |
| `render.js` | Remplit les sections à partir de `content.js`, menu mobile, formulaire de réservation | Non |
| `commande.js` / `commande.css` | Module de commande : carte, panier, formulaire, envoi WhatsApp | Non |

L'ordre de chargement des scripts compte : `content.js` → `render.js` → `commande.js`.

## Sections de la page

1. Bandeau (adresse, horaires, téléphone, réseaux) et en-tête avec menu.
2. **Accueil** : grande photo, titre, boutons « Voir la carte » et « Réserver une table ».
3. **Atouts** : quatre points forts (`features`).
4. **Notre histoire** (`about`) : texte, valeurs, nombre de plats (calculé depuis la carte).
5. **Les plats de la maison** (`signature`) : huit plats phares avec prix et bouton « + » relié au panier.
6. **Spécialité du chef** (`special`) et **avis client** (`testimonial`).
7. **Commander en ligne** (`order`) : toute la carte par catégorie, panier, envoi WhatsApp.
8. **Galerie** (`gallery`) et **horaires** (`hours`).
9. **Réservation** (`reservation`) : nom, date, heure, nombre de personnes → message WhatsApp prérempli.
10. Pied de page.

## Images attendues

| Fichier | Usage | Format |
|---|---|---|
| `hero.jpg` | Photo de l'accueil | 1800 × 1200 |
| `process.jpg` | Photo de « Notre histoire » | 1800 × 1200 |
| `p1` → `p8.jpg` | Plats phares | 640 px de large |
| `f01` → `f10.jpg` | Galerie et photo du chef | petits formats |
| `menu/*.jpg` | Photos de la carte commandable | 600 × 450 |
| `logo.png`, `favicon.png` | Logo (en-tête et pied de page) et icône d'onglet | PNG, logo noir sur fond transparent ou blanc |
| `og.jpg` | Image d'aperçu sur WhatsApp / Facebook | 1200 × 630 |

Les images `t01` → `t20.jpg` ne sont plus utilisées par la page.

## Créer un deuxième restaurant

1. Dupliquer le dossier complet et le renommer (ex. `chez-fatou`).
2. Dans **`content.js`**, remplacer toutes les données :
   - `brand` : nom, logo, adresse, téléphone, e-mail, horaires, Instagram, WhatsApp.
   - Les textes de chaque section : `hero`, `features`, `about`, `signature`, `special`, `testimonial`, `gallery`, `hours`, `reservation`.
   - `order` :
     - `whatsapp` : numéro au format `221XXXXXXXXX`, sans + ni espaces (utilisé aussi pour les réservations) ;
     - `greeting`, `refPrefix`, `infos`, `hours`, `closedMessage` ;
     - `zones` : quartiers et frais de livraison ;
     - `items` : la carte, chaque plat avec `id` unique, `cat`, `price` en FCFA et `img`.
   - Les plats phares (`signature.items`) et la spécialité (`special.id`) renvoient à un `id` de `order.items` : le prix et le bouton « + » en viennent.
3. Remplacer les images dans `images/` en gardant les mêmes noms et formats.
4. Dans **`index.html`**, adapter uniquement le `<head>` :
   - `title`, `description` et les balises `og:*` ;
   - le bloc JSON-LD (nom, adresse, téléphone, horaires, cuisine, Instagram).
5. *(Si le client le demande)* Changer les couleurs dans `styles.css`, bloc `:root` : `--green` (couleur principale), `--gold` (accent), `--cream` (fond).
6. Tester en local : `python3 -m http.server` dans le dossier, puis ouvrir http://localhost:8000. Parcourir tout le site, passer une commande test et une réservation test jusqu'à WhatsApp.
7. Déployer le dossier tel quel sur Netlify, Vercel, GitHub Pages ou tout hébergement statique.
8. Après la mise en ligne : dans `index.html`, mettre l'URL absolue (`https://domaine/images/og.jpg`) dans `og:image`, `og:url` et le JSON-LD.

## Commande WhatsApp — fonctionnement

1. Le client ajoute des plats au panier.
2. Il indique son nom, son téléphone, sur place ou livraison (avec son quartier, qui fixe les frais), le paiement choisi (réglé à la réception) et une note facultative.
3. WhatsApp s'ouvre avec le message prérempli vers `order.whatsapp`. Le client appuie sur Envoyer.

Aucun paiement n'est encaissé en ligne. Aucune donnée n'est stockée.

Le contrôle du téléphone accepte les numéros sénégalais (70, 75, 76, 77, 78, 30, 33). Pour un autre pays, adapter `phoneOk()` dans `commande.js`.
