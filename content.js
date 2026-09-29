/* ═══════════════════════════════════════════════════════════
   DONNÉES DU RESTAURANT — content.js
   Tout ce qui est propre au restaurant est ici : textes, carte,
   prix, images, horaires, livraison, contact, WhatsApp.
   render.js et commande.js ne contiennent aucune donnée client.
   Voir README.md pour créer un nouveau site.
   Client : La Casablancaise — Thiès (Sénégal)
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'La Casablancaise',
    tagline: 'Restaurant · Thiès',
    logo: 'images/logo.png',
    logoAlt: 'Logo La Casablancaise',
    address: '183 rue de Verdun, Thiès',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Casablancaise+183+rue+de+Verdun+Thi%C3%A8s',
    phone: '76 405 23 86',
    phoneHref: 'tel:+221764052386',
    email: 'contact@lacasablancaise.fr',
    hoursShort: 'Lun – Sam : 10 h – minuit',
    instagram: 'https://www.instagram.com/lacasablancaise_thies',
    whatsappUrl: 'https://wa.me/221764052386',
    copyright: '© 2026 La Casablancaise — 183 rue de Verdun, Thiès',
    credit: 'Site créé par Jëfya'
  },

  /* menu du haut — id = ancre d'une section de l'accueil, page = autre page */
  nav: [
    { label: 'Accueil', id: 'accueil' },
    { label: 'Notre histoire', id: 'histoire' },
    { label: 'La carte', id: 'carte' },
    { label: 'Galerie', id: 'galerie' },
    { label: 'Réservation', id: 'reservation' },
    { label: 'Commander', page: 'commande.html' }
  ],
  navCta: 'Commander en ligne',

  /* 1 · ACCUEIL */
  hero: {
    script: 'Bienvenue à Thiès',
    titleA: 'Du Maroc au Sénégal,',
    titleB: 'une même table.',
    text: 'Tajines, grillades, pizzas et crêpes, servis dans un cadre élégant. Sur place, à emporter ou livré chez vous.',
    ctaMenu: 'Voir la carte',
    ctaBook: 'Réserver une table',
    image: 'images/hero.jpg',
    imageAlt: 'Tajine, couscous et mezzés sur une table de La Casablancaise',
    sealRing: 'CUISINE MAISON • DU MAROC AU SÉNÉGAL • ',
    sealText: 'plats à la carte'      /* le nombre est calculé depuis order.items */
  },

  /* bandeau d'atouts — icônes : leaf, chef, star, scooter, heart, bag, wallet, clock */
  features: [
    { icon: 'leaf', title: 'Produits frais', text: 'Des produits choisis et cuisinés chaque jour.' },
    { icon: 'chef', title: 'Fait maison', text: 'Les tajines mijotent, le pain des snacks est maison.' },
    { icon: 'star', title: 'Cadre élégant', text: 'Seul, en famille ou entre amis.' },
    { icon: 'heart', title: 'Service attentif', text: 'De l’entrée jusqu’au dessert.' }
  ],

  /* 2 · NOTRE HISTOIRE */
  about: {
    script: 'Notre histoire',
    titleA: 'Plus qu’un repas,',
    titleB: 'un voyage.',
    text: 'Tajines de Casablanca, yassa et thiof grillé, pizzas et crêpes : notre carte fait se rencontrer deux cuisines. Les tajines mijotent, le thiof passe sur le grill, le pain des snacks est fait maison. Dans un cadre élégant, chacun trouve son plat et sa place à table.',
    signature: 'Au plaisir de vous recevoir',
    image: 'images/process.jpg',
    imageAlt: 'La salle de La Casablancaise le soir',
    image2: 'images/f04.jpg',
    image2Alt: 'Le chef dresse une assiette'
  },

  /* 3 · LA CARTE — plats phares ; id = identifiant du plat dans order.items (prix, photo, ajout au panier) */
  signature: {
    script: 'À la carte',
    title: 'Nos incontournables',
    cta: 'Voir toute la carte',
    items: [
      { id: 'tajine-pruneaux', label: 'Spécialité marocaine' },
      { id: 'tanjia', label: 'Spécialité marocaine' },
      { id: 'thiof', label: 'Plat' },
      { id: 'yassa', label: 'Plat' },
      { id: 'gambas', label: 'Plat' },
      { id: 'filet-boeuf', label: 'Plat' },
      { id: 'pz-norvegienne', label: 'Pizza' },
      { id: 'ds-fondant', label: 'Dessert' }
    ]
  },

  /* bandeau « commander » */
  promo: {
    title: 'Envie de commander\u00a0?',
    text: 'Choisissez vos plats en ligne, la commande nous arrive sur WhatsApp.',
    image: 'images/f03.jpg',
    items: [
      { icon: 'bag', title: 'Retrait sur place', text: '183 rue de Verdun' },
      { icon: 'scooter', title: 'Livraison', text: 'De 500 à 1 500 F' },
      { icon: 'wallet', title: 'Paiement', text: 'Wave, Orange Money, espèces' }
    ],
    cta: 'Commander en ligne'
  },

  /* spécialité du chef + avis client */
  special: {
    script: 'La spécialité du chef',
    id: 'tanjia',
    text: 'Mijotée longuement à la marocaine, la tanjia arrive fondante et parfumée. Le plat à partager qui fait la réputation de la maison.',
    image: 'images/p4.jpg',
    cta: 'Commander'
  },
  testimonial: {
    script: 'Ils en parlent',
    title: 'Ce que disent nos clients',
    quote: 'Franchement, coup de cœur. La nourriture est trop bonne, portions généreuses, goûts bien maîtrisés. Le staff est adorable et l’endroit donne envie de chiller.',
    author: 'Client',
    source: 'Avis Google'
  },

  /* 5 · GALERIE */
  gallery: {
    script: 'Galerie',
    title: 'Un lieu pour se retrouver',
    images: [
      { src: 'images/f07.jpg', alt: 'Une table dressée à la marocaine' },
      { src: 'images/f02.jpg', alt: 'Tajines' },
      { src: 'images/f03.jpg', alt: 'Brochettes sur le grill' },
      { src: 'images/f10.jpg', alt: 'Un repas partagé entre amis' },
      { src: 'images/f06.jpg', alt: 'Le dressage en cuisine' },
      { src: 'images/f09.jpg', alt: 'Une pizza servie à table' }
    ]
  },
  hours: {
    title: 'Horaires',
    rows: [
      ['Lundi – Samedi', '10 h – minuit'],
      ['Dimanche', 'Fermé']
    ]
  },

  /* 6 · RÉSERVATION — le formulaire ouvre WhatsApp (numéro : order.whatsapp) */
  reservation: {
    script: 'Bienvenue',
    title: 'Réservez votre table',
    text: 'Nous vous confirmons la réservation sur WhatsApp.',
    greeting: 'Bonjour La Casablancaise, je souhaite réserver une table',
    button: 'Réserver'
  },

  /* page « Commander » */
  orderPage: {
    script: 'Commande en ligne',
    title: 'À emporter ou livré chez vous',
    text: 'Choisissez vos plats, validez : votre commande nous arrive directement sur WhatsApp.',
    image: 'images/hero.jpg'
  },

  /* 11 · COMMANDE EN LIGNE — lue par commande.js (envoi sur WhatsApp)
     whatsapp : numéro au format international, sans + ni espaces.
     Pour ajouter un plat : une ligne { id, name, cat, price, img, desc? }.
     id unique ; l'ordre des catégories suit l'ordre d'apparition. */
  order: {
    whatsapp: '221764052386',
    greeting: 'Bonjour La Casablancaise, voici ma commande',
    refPrefix: 'CB',                      /* référence de commande : CB-2809-4K7Q */
    payments: ['Wave', 'Orange Money', 'Espèces'],
    closedMessage: 'Le restaurant est fermé en ce moment (10 h – minuit, fermé le dimanche). Votre commande sera traitée à la réouverture.',
    /* préfixe ajouté au nom dans le message WhatsApp (« Thon » → « Pizza Thon ») */
    messagePrefix: { Pizzas: 'Pizza ' },
    kicker: 'COMMANDER EN LIGNE',
    title: 'À emporter ou livré chez vous',
    sub: 'Choisissez vos plats, validez : votre commande nous arrive directement sur WhatsApp.',
    infos: [
      { k: 'RETRAIT', v: 'Sur place, 183 rue de Verdun' },
      { k: 'LIVRAISON', v: 'Dans Thiès, de 500 à 1 500 F selon le quartier' },
      { k: 'PAIEMENT', v: 'À la réception : Wave, Orange Money ou espèces' },
      { k: 'HORAIRES', v: '10 h – minuit, fermé le dimanche' }
    ],
    /* heures pleines ; closedDays : 0 = dimanche ; utcOffset : Sénégal = 0 */
    hours: { open: 10, close: 24, closedDays: [0], utcOffset: 0 },
    /* zones de livraison : le client choisit son quartier, les frais s'ajoutent au total */
    zones: [
      { name: 'Centre-ville / Escale', fee: 500 },
      { name: 'Grand Standing', fee: 700 },
      { name: 'Cité Senghor', fee: 700 },
      { name: '10e Arrondissement', fee: 800 },
      { name: 'Mbour 1', fee: 800 },
      { name: 'Mbour 2', fee: 800 },
      { name: 'Keur Massamba Guèye', fee: 1000 },
      { name: 'Nguinth', fee: 1000 },
      { name: 'Médina Fall', fee: 1000 },
      { name: 'Hersent', fee: 1000 },
      { name: 'Silmang', fee: 1200 },
      { name: 'Diamaguène', fee: 1200 },
      { name: 'Randoulène', fee: 1200 },
      { name: 'Keur Saïr', fee: 1500 }
    ],
    items: [
      { id: 'tajine-pruneaux', name: 'Tajine aux pruneaux', cat: 'Plats marocains', price: 6000, img: 'images/p1.jpg' },
      { id: 'tanjia', name: 'Tanjia', cat: 'Plats marocains', price: 7000, img: 'images/p4.jpg' },
      { id: 'thiof', name: 'Thiof grillé', cat: 'Plats', price: 7000, img: 'images/p2.jpg' },
      { id: 'gambas', name: 'Gambas rôties', cat: 'Plats', price: 8000, img: 'images/p3.jpg' },
      { id: 'yassa', name: 'Yassa poulet', cat: 'Plats', price: 4000, img: 'images/p5.jpg' },
      { id: 'filet-boeuf', name: 'Filet de bœuf', cat: 'Plats', price: 7000, img: 'images/p6.jpg' },
      { id: 'pz-margarita', name: 'Margarita', cat: 'Pizzas', price: 3500, img: 'images/menu/pz-margarita.jpg' },
      { id: 'pz-thon', name: 'Thon', cat: 'Pizzas', price: 4500, img: 'images/menu/pz-thon.jpg' },
      { id: 'pz-fruits-de-mer', name: 'Fruits de mer', cat: 'Pizzas', price: 5000, img: 'images/menu/pz-fruits-de-mer.jpg' },
      { id: 'pz-pepperoni', name: 'Pepperoni', cat: 'Pizzas', price: 4500, img: 'images/menu/pz-pepperoni.jpg' },
      { id: 'pz-norvegienne', name: 'Norvégienne', cat: 'Pizzas', price: 5500, img: 'images/p7.jpg', desc: 'Saumon et crème fraîche' },
      { id: 'pz-poulet-champignons', name: 'Poulet champignons', cat: 'Pizzas', price: 5000, img: 'images/menu/pz-poulet-champignons.jpg' },
      { id: 'pz-vegetarienne', name: 'Végétarienne', cat: 'Pizzas', price: 4000, img: 'images/menu/pz-vegetarienne.jpg' },
      { id: 'pz-4-fromages', name: 'Quatre fromages', cat: 'Pizzas', price: 5000, img: 'images/menu/pz-4-fromages.jpg' },
      { id: 'pz-reine', name: 'Reine', cat: 'Pizzas', price: 4500, img: 'images/menu/pz-reine.jpg' },
      { id: 'pz-royale', name: 'Royale', cat: 'Pizzas', price: 5000, img: 'images/menu/pz-royale.jpg', desc: 'Viande hachée et poulet' },
      { id: 'sn-cheeseburger', name: 'Cheeseburger', cat: 'Snacks', price: 2000, img: 'images/menu/sn-cheeseburger.jpg', desc: 'Pain maison' },
      { id: 'sn-crispy-chicken', name: 'Crispy chicken burger', cat: 'Snacks', price: 3000, img: 'images/menu/sn-crispy-chicken.jpg', desc: 'Pain maison' },
      { id: 'sn-double-steak', name: 'Double steak burger', cat: 'Snacks', price: 3500, img: 'images/menu/sn-double-steak.jpg', desc: 'Pain maison' },
      { id: 'sn-americain', name: 'Burger américain', cat: 'Snacks', price: 4000, img: 'images/menu/sn-americain.jpg', desc: 'Pain maison' },
      { id: 'sn-casablancaise', name: 'Sandwich Casablancaise', cat: 'Snacks', price: 3000, img: 'images/menu/sn-casablancaise.jpg', desc: 'Pain maison' },
      { id: 'sn-royal', name: 'Sandwich royal', cat: 'Snacks', price: 3500, img: 'images/menu/sn-royal.jpg', desc: 'Pain maison' },
      { id: 'sn-thon', name: 'Sandwich thon', cat: 'Snacks', price: 2500, img: 'images/menu/sn-thon.jpg', desc: 'Pain maison' },
      { id: 'sn-jambon-fromage', name: 'Sandwich jambon fromage', cat: 'Snacks', price: 2000, img: 'images/menu/sn-jambon-fromage.jpg', desc: 'Pain maison' },
      { id: 'sn-tacos-poulet', name: 'Tacos poulet', cat: 'Snacks', price: 3000, img: 'images/menu/sn-tacos-poulet.jpg' },
      { id: 'sn-tacos-viande', name: 'Tacos viande hachée', cat: 'Snacks', price: 3000, img: 'images/menu/sn-tacos-viande.jpg' },
      { id: 'sn-baguette-fdm', name: 'Baguette farcie fruits de mer', cat: 'Snacks', price: 4000, img: 'images/menu/sn-baguette-fdm.jpg', desc: 'Pain maison' },
      { id: 'sn-baguette-poulet', name: 'Baguette farcie poulet', cat: 'Snacks', price: 3500, img: 'images/menu/sn-baguette-poulet.jpg', desc: 'Pain maison' },
      { id: 'sn-chawarma', name: 'Chawarma La Casablancaise', cat: 'Snacks', price: 2000, img: 'images/menu/sn-chawarma.jpg' },
      { id: 'sn-pasticcio', name: 'Pasticcio', cat: 'Snacks', price: 3000, img: 'images/menu/sn-pasticcio.jpg', desc: 'Viande, poulet, jambon' },
      { id: 'cr-nutella', name: 'Crêpe Nutella', cat: 'Crêpes', price: 2500, img: 'images/menu/cr-nutella.jpg' },
      { id: 'cr-fruits-rouges', name: 'Tagliatelle fruits rouges', cat: 'Crêpes', price: 3500, img: 'images/menu/cr-fruits-rouges.jpg' },
      { id: 'cr-casablancaise', name: 'Crêpe Casablancaise', cat: 'Crêpes', price: 3500, img: 'images/menu/cr-casablancaise.jpg' },
      { id: 'cr-suzette', name: 'Crêpe Suzette', cat: 'Crêpes', price: 3000, img: 'images/menu/cr-suzette.jpg' },
      { id: 'cr-jambon-fromage', name: 'Crêpe jambon fromage', cat: 'Crêpes', price: 2500, img: 'images/menu/cr-jambon-fromage.jpg' },
      { id: 'cr-poulet-champignon', name: 'Crêpe poulet champignon', cat: 'Crêpes', price: 3500, img: 'images/menu/cr-poulet-champignon.jpg' },
      { id: 'cr-bolognaise', name: 'Crêpe bolognaise', cat: 'Crêpes', price: 3500, img: 'images/menu/cr-bolognaise.jpg' },
      { id: 'cr-thon', name: 'Crêpe thon', cat: 'Crêpes', price: 3500, img: 'images/menu/cr-thon.jpg' },
      { id: 'ds-salade-fruits', name: 'Salade de fruits du chef', cat: 'Desserts', price: 2500, img: 'images/menu/ds-salade-fruits.jpg' },
      { id: 'ds-brownie', name: 'Brownie', cat: 'Desserts', price: 3000, img: 'images/menu/ds-brownie.jpg', desc: 'Avec boule de glace' },
      { id: 'ds-fondant', name: 'Fondant au chocolat', cat: 'Desserts', price: 3500, img: 'images/p8.jpg', desc: 'Avec boule de glace' },
      { id: 'ds-panna-cotta', name: 'Panna cotta', cat: 'Desserts', price: 3000, img: 'images/menu/ds-panna-cotta.jpg' },
      { id: 'ds-1-boule', name: 'Une boule de glace', cat: 'Desserts', price: 1500, img: 'images/menu/ds-1-boule.jpg' },
      { id: 'ds-2-boules', name: 'Deux boules de glace', cat: 'Desserts', price: 2000, img: 'images/menu/ds-2-boules.jpg' }
    ]
  },
};
