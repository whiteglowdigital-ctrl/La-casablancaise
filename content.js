/* ═══════════════════════════════════════════════════════════
   DONNÉES DU RESTAURANT — content.js
   Tout ce qui est propre au restaurant est ici : textes, carte,
   prix, images, horaires, livraison, contact, WhatsApp.
   Le moteur (render.js, app.js, commande.js) ne contient aucune
   donnée client. Voir README.md pour créer un nouveau site.
   Client : La Casablancaise — Thiès (Sénégal)
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'La Casablancaise',
    logo: 'images/logo.png',
    logoAlt: 'Logo La Casablancaise',
    title: 'La Casablancaise — Restaurant, Thiès',
    description: 'Restaurant à Thiès : spécialités marocaines, cuisine sénégalaise, grillades, pizzas et crêpes, dans un cadre élégant.',
    kicker: 'LA CASABLANCAISE — RESTAURANT, THIÈS',
    copyright: '© 2026 — 183 RUE DE VERDUN, THIÈS',
    credit: 'SITE CRÉÉ PAR JËFYA',
    socials: [
      { label: 'INSTAGRAM ↗', url: 'https://www.instagram.com/lacasablancaise_thies' },
      { label: 'WHATSAPP ↗', url: 'https://wa.me/221764052386' }
    ]
  },

  nav: { proof: 'CARTE', universes: 'SOIRÉE', cta: 'COMMANDER' },

  /* 1 · ACCROCHE */
  hook: {
    line1: 'Du Maroc au Sénégal,',
    line2a: 'une table à',
    line2b: 'Thiès.',
    image: 'images/hero.jpg',
    imageAlt: 'Une table dressée à La Casablancaise',
    floaters: [
      'images/f01.jpg', 'images/f02.jpg', 'images/f03.jpg', 'images/f04.jpg', 'images/f05.jpg',
      'images/f06.jpg', 'images/f07.jpg', 'images/f08.jpg', 'images/f09.jpg', 'images/f10.jpg'
    ]
  },

  /* 2 · POSITIONNEMENT — 38 caractères */
  positioning: 'Tajines, grillades et pizzas, à Thiès.',

  /* 3 · DÉMARCHE */
  manifesto: {
    text: 'Tajines de Casablanca, yassa et thiof grillé, pizzas et crêpes : notre carte fait se rencontrer deux cuisines. Dans un cadre élégant, chacun trouve [[son plat]] et sa place à table.'
  },

  /* 4 · PREUVE — masonry, 8 plats de la carte */
  proof: {
    layout: 'masonry',
    kicker: 'À LA CARTE',
    title: 'Nos incontournables',
    sub: 'Spécialités marocaines, plats du pays et grillades : un aperçu de la carte.',
    meta: 'HUIT PLATS — PRIX EN FCFA',
    projects: [
      { img: 'images/p1.jpg', title: 'Tajine aux pruneaux', meta: 'SPÉCIALITÉ MAROCAINE — 6 000' },
      { img: 'images/p2.jpg', title: 'Thiof grillé', meta: 'PLAT — 7 000' },
      { img: 'images/p3.jpg', title: 'Gambas rôties', meta: 'PLAT — 8 000' },
      { img: 'images/p4.jpg', title: 'Tanjia', meta: 'SPÉCIALITÉ MAROCAINE — 7 000' },
      { img: 'images/p5.jpg', title: 'Yassa poulet', meta: 'PLAT — 4 000' },
      { img: 'images/p6.jpg', title: 'Filet de bœuf', meta: 'PLAT — 7 000' },
      { img: 'images/p7.jpg', title: 'Pizza Norvégienne', meta: 'PIZZA — 5 500' },
      { img: 'images/p8.jpg', title: 'Fondant au chocolat', meta: 'DESSERT — 3 500' }
    ]
  },

  /* 5 · DEVISE */
  motto: {
    kicker: 'CE QUI GUIDE CHAQUE SERVICE',
    words: [
      { word: 'Générosité', hint: 'Des assiettes qui donnent envie de revenir.' },
      { word: 'Élégance', hint: 'Un cadre soigné, jusqu’au dernier détail.' },
      { word: 'Partage', hint: 'Une table faite pour se retrouver.' }
    ]
  },

  /* 6-7 · PROCESSUS */
  universes: {
    introA: 'Une',
    introB: 'soirée,',
    introC: '3 temps.',
    cta: 'Commander →',
    image: 'images/process.jpg',
    imageAlt: 'La salle de La Casablancaise le soir',
    items: [
      { name: 'Choisir', meta: 'TEMPS — 01', desc: 'Entrées, tajines, grillades, pizzas ou crêpes : la carte se lit comme un voyage.' },
      { name: 'Cuisiner', meta: 'TEMPS — 02', desc: 'Les tajines mijotent, le thiof passe sur le grill, le pain des snacks est fait maison.' },
      { name: 'Servir', meta: 'TEMPS — 03', desc: 'Un service attentif, de l’entrée jusqu’au dessert, seul, en famille ou entre amis.' }
    ]
  },

  /* 8 · PREUVE SOCIALE — vrai avis Google (sans chiffre : la citation prend toute la place) */
  testimonial: {
    kicker: 'AVIS GOOGLE — THIÈS',
    figure: '',
    unit: '',
    quote: 'Franchement, coup de cœur. La nourriture est trop bonne, portions généreuses, goûts bien maîtrisés. Le staff est adorable et l’endroit donne envie de chiller.',
    author: 'CLIENT — AVIS GOOGLE'
  },

  /* 9 · OBJECTIONS */
  objections: {
    items: ['Pas de choix impossible.', 'Pas de service pressé.', 'Pas de cadre banal.'],
    finale: 'Juste une',
    pill: 'belle table.'
  },

  /* 10 · CONVERSION */
  contact: {
    kicker: 'UNE TABLE, UN ÉVÉNEMENT ?',
    phone: '76 405 23 86',
    email: 'contact@lacasablancaise.fr',
    reassurance: '10 H – MINUIT, FERMÉ LE DIMANCHE — RÉSERVATIONS : 76 405 23 86'
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

  /* traînée sous la souris — 20 visuels */
  trail: [
    'images/t01.jpg', 'images/t02.jpg', 'images/t03.jpg', 'images/t04.jpg', 'images/t05.jpg',
    'images/t06.jpg', 'images/t07.jpg', 'images/t08.jpg', 'images/t09.jpg', 'images/t10.jpg',
    'images/t11.jpg', 'images/t12.jpg', 'images/t13.jpg', 'images/t14.jpg', 'images/t15.jpg',
    'images/t16.jpg', 'images/t17.jpg', 'images/t18.jpg', 'images/t19.jpg', 'images/t20.jpg'
  ]
};
