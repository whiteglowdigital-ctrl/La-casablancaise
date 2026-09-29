/* ═══════════════════════════════════════════════════════════
   RENDU DU SITE — render.js
   Lit window.SITE_CONTENT (content.js) et remplit les blocs
   présents dans la page (accueil ou page « Commander »).
   Aucune donnée client ici.
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  if (!C) return;
  const B = C.brand, O = C.order || { items: [] };
  const PAGE = document.body.dataset.page || 'accueil';
  const HOME = PAGE === 'accueil';
  const ORDER_URL = 'commande.html';

  const $ = (s, c = document) => c.querySelector(s);
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fcfa = (n) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' F';
  const byId = Object.fromEntries(O.items.map((i) => [i.id, i]));
  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; return el; };
  // lien vers une section de l'accueil, depuis n'importe quelle page
  const toSection = (id) => (HOME ? '#' : './#') + id;
  const navHref = (n) => (n.page ? n.page : toSection(n.id));
  const addHref = (id) => `${ORDER_URL}#add-${id}`;

  /* ─── Icônes (traits, 24 × 24) ─── */
  const P = {
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19 13 11"/>',
    chef: '<path d="M7 14a4 4 0 0 1-.5-8 5 5 0 0 1 11 0 4 4 0 0 1-.5 8"/><path d="M7 14v5h10v-5"/><path d="M7 17h10"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    scooter: '<circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M8.5 17h7M15 6h2l3 11M4 12h7l2 5"/><path d="M4 8h6v4H4z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    bag: '<path d="M5 8h14l-1 12H6Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    cutlery: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3"/>',
    branch: '<path d="M2 17C8 16 15 12 22 6"/><path d="M8 15.4c-.6-2.4.4-4.4 2.4-5.2.5 2.2-.4 4.2-2.4 5.2Z"/><path d="M13 12.6c-.4-2.4.8-4.3 2.9-4.9.3 2.3-.8 4.1-2.9 4.9Z"/><path d="M9 15c1.9 1.5 4 1.6 5.6.4-1.8-1.5-3.9-1.5-5.6-.4Z"/><path d="M14.2 11.9c1.9 1.2 4 1.1 5.4-.2-1.9-1.2-4-1.1-5.4.2Z"/>'
  };
  const icon = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
  const SOCIAL = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM21.9 7.9c-.1-1.6-.4-3-1.6-4.2S17.7 2.2 16.1 2.1C14.5 2 9.5 2 7.9 2.1 6.3 2.2 4.9 2.5 3.7 3.7S2.2 6.3 2.1 7.9C2 9.5 2 14.5 2.1 16.1c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.6.1 8.2 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.6 0-8.2Zm-2.1 10a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9a3.3 3.3 0 0 1 1.9-1.9c1.3-.5 4.4-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.9 1.9c.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2Z"/></svg>'
  };
  const socials = () => `
    <a class="social" href="${esc(B.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL.instagram}</a>
    <a class="social" href="${esc(B.whatsappUrl)}" target="_blank" rel="noopener" aria-label="WhatsApp">${SOCIAL.whatsapp}</a>`;
  // séparateur orné (branche d'olivier du logo)
  const divider = (cls = '') => `<span class="divider ${cls}" aria-hidden="true"><i></i>${icon('leaf', 'ic divider-leaf')}<i></i></span>`;
  const heading = (script, a, b, tag = 'h2') => `
    <p class="script">${esc(script)} ${icon('branch', 'ic script-branch')}</p>
    <${tag} class="title">${esc(a)}${b ? `<span>${esc(b)}</span>` : ''}</${tag}>`;

  /* ─── En-tête ─── */
  fill('header', `
    <div class="wrap header-in">
      <a class="logo" href="${HOME ? '#accueil' : './'}" aria-label="${esc(B.name)} — accueil">
        <img src="${esc(B.logo)}" alt="${esc(B.logoAlt)}" width="633" height="341">
      </a>
      <nav class="nav" aria-label="Menu principal">
        ${C.nav.filter((n) => !n.page).map((n) => `<a href="${esc(navHref(n))}">${esc(n.label)}</a>`).join('')}
      </nav>
      <a class="btn btn-light header-cta${PAGE === 'commande' ? ' is-current' : ''}" href="${ORDER_URL}">${icon('bag')} <span>${esc(C.navCta)}</span></a>
    </div>`);

  /* ─── Accueil ─── */
  const H = C.hero;
  if (H) fill('accueil', `<div class="wrap hero-in">
    <div class="hero-text">
      ${heading(H.script, H.titleA, H.titleB, 'h1')}
      ${divider()}
      <p class="lead">${esc(H.text)}</p>
      <div class="btns">
        <a class="btn btn-dark" href="#carte">${esc(H.ctaMenu)} ${icon('cutlery')}</a>
        <a class="btn btn-light" href="#reservation">${esc(H.ctaBook)} ${icon('calendar')}</a>
      </div>
    </div>
    <div class="hero-media">
      <img class="arch" src="${esc(H.image)}" alt="${esc(H.imageAlt)}" fetchpriority="high">
      <div class="seal" aria-label="${O.items.length} ${esc(H.sealText)}">
        <svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="sealPath" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0"/></defs>
          <text><textPath href="#sealPath">${esc(H.sealRing)}</textPath></text></svg>
        <b>${O.items.length}</b><span>${esc(H.sealText)}</span>
      </div>
    </div>
  </div>`);

  if (C.features) fill('features', `<div class="wrap"><div class="features-in">
    ${C.features.map((f) => `<div class="feature">${icon(f.icon, 'ic ic-lg')}<div><b>${esc(f.title)}</b><span>${esc(f.text)}</span></div></div>`).join('')}
  </div></div>`);

  /* ─── Notre histoire ─── */
  const A = C.about;
  if (A) fill('histoire', `<div class="wrap about-in">
    <div class="about-media">
      <img class="about-main" src="${esc(A.image)}" alt="${esc(A.imageAlt)}" loading="lazy">
      <img class="about-small" src="${esc(A.image2)}" alt="${esc(A.image2Alt)}" loading="lazy">
    </div>
    <div class="about-text">
      ${heading(A.script, A.titleA, A.titleB)}
      ${divider()}
      <p>${esc(A.text)}</p>
      <p class="signature-line">${esc(A.signature)} ${icon('heart', 'ic')}</p>
    </div>
  </div>`);

  /* ─── Plats phares (carrousel) ─── */
  const S = C.signature;
  if (S) fill('carte', `<div class="wrap">
    <div class="sec-head">
      <div>${heading(S.script, S.title)}</div>
      <a class="link-arrow" href="${ORDER_URL}">${esc(S.cta)} ${icon('arrow')}</a>
    </div>
    <div class="carousel">
      <button class="car-btn car-prev" type="button" aria-label="Plats précédents">${icon('left')}</button>
      <div class="track" id="track" tabindex="0" aria-label="Plats phares">
        ${S.items.filter((s) => byId[s.id]).map((s) => { const it = byId[s.id]; return `
          <article class="card">
            <div class="card-img"><img src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy"></div>
            <div class="card-body">
              <span class="card-label">${esc(s.label)}</span>
              <h3>${esc(it.name)}</h3>
              <div class="card-foot"><span class="price">${fcfa(it.price)}</span>
                <a class="plus" href="${addHref(it.id)}" aria-label="Commander ${esc(it.name)}">+</a></div>
            </div>
          </article>`; }).join('')}
      </div>
      <button class="car-btn car-next" type="button" aria-label="Plats suivants">${icon('right')}</button>
    </div>
  </div>`);

  /* ─── Bandeau commander ─── */
  const PR = C.promo;
  if (PR) fill('promo', `<div class="wrap"><div class="promo-in">
    <div class="promo-media"><img class="promo-img" src="${esc(PR.image)}" alt="" loading="lazy"></div>
    <div class="promo-title"><h2>${esc(PR.title)}</h2><p>${esc(PR.text)}</p></div>
    <ul class="promo-items">
      ${PR.items.map((i) => `<li>${icon(i.icon, 'ic ic-lg')}<b>${esc(i.title)}</b><span>${esc(i.text)}</span></li>`).join('')}
    </ul>
    <div class="promo-cta"><a class="btn btn-light" href="${ORDER_URL}">${esc(PR.cta)} ${icon('arrow')}</a></div>
  </div></div>`);

  /* ─── Spécialité + avis ─── */
  const SP = C.special, spItem = SP && byId[SP.id], T = C.testimonial;
  if (SP) fill('special', `<div class="wrap special-in">
    ${spItem ? `<div class="chef">
      <div class="chef-media"><img class="chef-img" src="${esc(SP.image)}" alt="${esc(spItem.name)}" loading="lazy"><span class="chef-badge">${fcfa(spItem.price)}</span></div>
      <div class="chef-text">
        ${heading(SP.script, spItem.name)}
        <p>${esc(SP.text)}</p>
        <div class="chef-foot"><span class="price">${fcfa(spItem.price)}</span>
          <a class="btn btn-light" href="${addHref(spItem.id)}">${esc(SP.cta)} ${icon('arrow')}</a></div>
      </div>
    </div>` : ''}
    <figure class="review">
      ${heading(T.script, T.title)}
      <blockquote>“${esc(T.quote)}”</blockquote>
      <figcaption><span class="stars" aria-label="5 étoiles">★★★★★</span>${esc(T.author)} — ${esc(T.source)}</figcaption>
    </figure>
  </div>`);

  /* ─── Galerie ─── */
  const G = C.gallery;
  if (G) fill('galerie', `<div class="wrap">
    <div class="sec-head sec-head-center"><div>${heading(G.script, G.title)}</div></div>
    <div class="gallery-grid">${G.images.map((g) => `<img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy">`).join('')}</div>
  </div>`);

  /* ─── Réservation ─── */
  const R = C.reservation;
  const today = new Date().toISOString().slice(0, 10);
  if (R) fill('reservation', `<div class="wrap"><div class="resa">
    <div class="resa-head">
      <p class="script">${esc(R.script)}</p>
      <h2>${esc(R.title)}</h2>
      <p>${esc(R.text)}</p>
    </div>
    <form class="resa-form" id="resaForm" novalidate>
      <label class="rf"><span>Nom</span><input id="resaName" name="name" autocomplete="name" required placeholder="Votre nom"></label>
      <label class="rf"><span>Date</span><input id="resaDate" name="date" type="date" min="${today}" required></label>
      <label class="rf"><span>Heure</span><input id="resaTime" name="time" type="time" min="10:00" required></label>
      <label class="rf"><span>Personnes</span><select id="resaGuests" name="guests">
        ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}"${i === 1 ? ' selected' : ''}>${i + 1} pers.</option>`).join('')}
        <option value="plus de 12">Plus de 12</option>
      </select></label>
      <button class="btn btn-light" type="submit">${SOCIAL.whatsapp} ${esc(R.button)}</button>
    </form>
    <p class="resa-msg" id="resaErr" hidden>Indiquez votre nom, la date et l’heure.</p>
    <p class="resa-msg" id="resaDone" hidden>WhatsApp ne s’est pas ouvert ? <a id="resaLink" href="#" target="_blank" rel="noopener">Ouvrir la réservation dans WhatsApp</a></p>
  </div></div>`);

  const rf = $('#resaForm');
  if (rf) rf.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (n) => String(rf.elements[n].value || '').trim();
    const ok = v('name') && v('date') && v('time');
    $('#resaErr').hidden = !!ok;
    if (!ok) return;
    const date = new Date(v('date') + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const msg = `${R.greeting} :\n\n*Nom :* ${v('name')}\n*Date :* ${date}\n*Heure :* ${v('time').replace(':', ' h ')}\n*Personnes :* ${v('guests')}`;
    const url = `https://wa.me/${O.whatsapp}?text=${encodeURIComponent(msg)}`;
    $('#resaLink').href = url;
    $('#resaDone').hidden = false;
    window.open(url, '_blank', 'noopener');
  });

  /* ─── En-tête de la page « Commander » ─── */
  const OP = C.orderPage;
  if (OP) fill('pageHero', `
    <img class="page-hero-bg" src="${esc(OP.image)}" alt="">
    <div class="wrap page-hero-in">
      <p class="crumbs"><a href="./">Accueil</a> <span aria-hidden="true">›</span> Commander</p>
      <p class="script">${esc(OP.script)}</p>
      <h1>${esc(OP.title)}</h1>
      <p>${esc(OP.text)}</p>
    </div>`);

  /* ─── Pied de page ─── */
  const HO = C.hours;
  fill('footer', `<div class="wrap footer-in">
    <div class="f-brand">
      <img class="f-logo" src="${esc(B.logo)}" alt="${esc(B.logoAlt)}" loading="lazy">
      <div class="f-socials">${socials()}</div>
    </div>
    <div class="f-col"><h4>Liens</h4>
      ${C.nav.map((n) => `<a href="${esc(navHref(n))}">${esc(n.label)}</a>`).join('')}
    </div>
    <div class="f-col"><h4>${esc(HO.title)}</h4>
      <dl class="f-hours">${HO.rows.map(([d, h]) => `<div><dt>${esc(d)}</dt><dd>${esc(h)}</dd></div>`).join('')}</dl>
    </div>
    <div class="f-col"><h4>Nous trouver</h4>
      <a class="f-line" href="${esc(B.mapsUrl)}" target="_blank" rel="noopener">${icon('pin')}<span>${esc(B.address)}</span></a>
      <a class="f-line" href="${esc(B.phoneHref)}">${icon('phone')}<span>${esc(B.phone)}</span></a>
      <a class="f-line" href="mailto:${esc(B.email)}">${icon('mail')}<span>${esc(B.email)}</span></a>
    </div>
  </div>
  <div class="footer-bottom"><div class="wrap footer-bottom-in"><span>${esc(B.copyright)}</span><span>${esc(B.credit)}</span></div></div>`);

  /* ─── Comportements ─── */
  // ombre de l'en-tête après défilement
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-stuck', scrollY > 20);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // carrousel des plats phares : flèches = une carte à la fois
  const track = $('#track');
  if (track) {
    const step = () => { const c = track.querySelector('.card'); return c ? c.getBoundingClientRect().width + 20 : 300; };
    const prev = $('.car-prev'), next = $('.car-next');
    const update = () => {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth > track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
    track.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    update();
  }
})();
