/* ═══════════════════════════════════════════════════════════
   RENDU DU SITE — render.js
   Lit window.SITE_CONTENT (content.js) et remplit les sections
   de index.html. Aucune donnée client ici.
   Chargé AVANT commande.js : les boutons « + » des plats phares
   utilisent le même panier (attribut data-inc).
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  if (!C) return;
  const B = C.brand, O = C.order || { items: [] };

  const $ = (s, c = document) => c.querySelector(s);
  const esc = (t) => String(t ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fcfa = (n) => n.toLocaleString('fr-FR').replace(/ | /g, ' ') + ' F';
  const byId = Object.fromEntries(O.items.map((i) => [i.id, i]));
  const fill = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  /* ─── Icônes (traits, 24 × 24) ─── */
  const P = {
    leaf: '<path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14"/><path d="M5 19 13 11"/>',
    chef: '<path d="M7 14a4 4 0 0 1-.5-8 5 5 0 0 1 11 0 4 4 0 0 1-.5 8"/><path d="M7 14v5h10v-5"/><path d="M7 17h10"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9Z"/>',
    scooter: '<circle cx="6" cy="17" r="2.5"/><circle cx="18" cy="17" r="2.5"/><path d="M8.5 17h7M15 6h2l3 11M4 12h7l2 5"/><path d="M4 8h6v4H4z"/>',
    heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M16 14a5 5 0 0 1 5 5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    cutlery: '<path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 21V3c-2 1-3 4-3 8h3"/>'
  };
  const icon = (n, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
  const SOCIAL = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4ZM17.3 5.5a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4ZM21.9 7.9c-.1-1.6-.4-3-1.6-4.2S17.7 2.2 16.1 2.1C14.5 2 9.5 2 7.9 2.1 6.3 2.2 4.9 2.5 3.7 3.7S2.2 6.3 2.1 7.9C2 9.5 2 14.5 2.1 16.1c.1 1.6.4 3 1.6 4.2s2.6 1.5 4.2 1.6c1.6.1 6.6.1 8.2 0 1.6-.1 3-.4 4.2-1.6s1.5-2.6 1.6-4.2c.1-1.6.1-6.6 0-8.2Zm-2.1 10a3.3 3.3 0 0 1-1.9 1.9c-1.3.5-4.4.4-5.9.4s-4.6.1-5.9-.4a3.3 3.3 0 0 1-1.9-1.9c-.5-1.3-.4-4.4-.4-5.9s-.1-4.6.4-5.9a3.3 3.3 0 0 1 1.9-1.9c1.3-.5 4.4-.4 5.9-.4s4.6-.1 5.9.4a3.3 3.3 0 0 1 1.9 1.9c.5 1.3.4 4.4.4 5.9s.1 4.6-.4 5.9Z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2Z"/></svg>'
  };
  const socials = () => `
    <a class="social" href="${esc(B.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${SOCIAL.instagram}</a>
    <a class="social" href="${esc(B.whatsappUrl)}" target="_blank" rel="noopener" aria-label="WhatsApp">${SOCIAL.whatsapp}</a>`;
  const addBtn = (id, label) => `<button class="add" type="button" data-inc="${esc(id)}" aria-label="Ajouter ${esc(label)} à la commande">+</button>`;

  /* ─── Bandeau haut ─── */
  fill('topbar', `
    <div class="wrap topbar-in">
      <span class="topbar-addr">${icon('pin')} ${esc(B.address)}</span>
      <span class="hide-sm">${icon('clock')} ${esc(B.hoursShort)}</span>
      <span class="topbar-end"><a href="${esc(B.phoneHref)}">${icon('phone')} ${esc(B.phone)}</a>${socials()}</span>
    </div>`);

  /* ─── En-tête ─── */
  fill('header', `
    <div class="wrap header-in">
      <a class="logo" href="#accueil" aria-label="${esc(B.name)} — accueil">
        <img src="${esc(B.logo)}" alt="${esc(B.logoAlt)}" width="633" height="341">
      </a>
      <nav class="nav" id="nav" aria-label="Menu principal">
        ${C.nav.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('')}
      </nav>
      <a class="btn btn-gold header-cta" href="#commande">${esc(C.navCta)}</a>
      <button class="burger" type="button" aria-controls="nav" aria-expanded="false" aria-label="Ouvrir le menu">${icon('menu')}</button>
    </div>`);

  /* ─── Accueil ─── */
  const H = C.hero;
  fill('accueil', `
    <img class="hero-bg" src="${esc(H.image)}" alt="${esc(H.imageAlt)}" fetchpriority="high">
    <div class="wrap hero-in">
      <p class="kicker kicker-light">${esc(H.kicker)}</p>
      <h1>${esc(H.titleA)}<br>${esc(H.titleB)} <em>${esc(H.titleEm)}</em></h1>
      <p class="hero-text">${esc(H.text)}</p>
      <div class="btns">
        <a class="btn btn-gold" href="#carte">${esc(H.ctaMenu)} ${icon('arrow')}</a>
        <a class="btn btn-line-light" href="#reservation">${icon('calendar')} ${esc(H.ctaBook)}</a>
      </div>
    </div>`);

  fill('features', `<div class="wrap features-in">
    ${C.features.map((f) => `<div class="feature">${icon(f.icon, 'ic ic-lg')}<div><b>${esc(f.title)}</b><span>${esc(f.text)}</span></div></div>`).join('')}
  </div>`);

  /* ─── Notre histoire ─── */
  const A = C.about;
  fill('histoire', `<div class="wrap about-in">
    <div class="about-media">
      <img class="about-main" src="${esc(A.image)}" alt="${esc(A.imageAlt)}" loading="lazy">
      <img class="about-small" src="${esc(A.image2)}" alt="${esc(A.image2Alt)}" loading="lazy">
      <div class="about-badge">${icon('cutlery', 'ic ic-lg')}<b>${O.items.length}</b><span>${esc(A.badgeText)}</span></div>
    </div>
    <div class="about-text">
      <p class="script">${esc(A.script)}</p>
      <h2 class="h2">${esc(A.title)}</h2>
      <span class="rule"></span>
      <p class="lead">${esc(A.text)}</p>
      <ul class="values">
        ${A.values.map((v) => `<li><span class="val-ic">${icon(v.icon)}</span><div><b>${esc(v.title)}</b><span>${esc(v.text)}</span></div></li>`).join('')}
      </ul>
      <a class="btn btn-green" href="#commande">${esc(A.cta)} ${icon('arrow')}</a>
    </div>
  </div>`);

  /* ─── Plats phares ─── */
  const S = C.signature;
  fill('carte', `<div class="wrap">
    <div class="sec-head">
      <div><p class="kicker">${esc(S.kicker)}</p><h2 class="h2">${esc(S.title)}</h2><p class="sec-sub">${esc(S.sub)}</p></div>
      <a class="link-arrow" href="#commande">${esc(S.cta)} ${icon('arrow')}</a>
    </div>
    <div class="cards">
      ${S.items.filter((s) => byId[s.id]).map((s) => { const it = byId[s.id]; return `
        <article class="card">
          <div class="card-img"><img src="${esc(it.img)}" alt="${esc(it.name)}" loading="lazy"></div>
          <div class="card-body">
            <span class="card-label">${esc(s.label)}</span>
            <h3>${esc(it.name)}</h3>
            <div class="card-foot"><span class="price">${fcfa(it.price)}</span>${addBtn(it.id, it.name)}</div>
          </div>
        </article>`; }).join('')}
    </div>
  </div>`);

  /* ─── Spécialité + avis ─── */
  const SP = C.special, spItem = byId[SP.id], T = C.testimonial;
  fill('special', `<div class="wrap special-in">
    ${spItem ? `<div class="chef">
      <div class="chef-text">
        <p class="script script-gold">${esc(SP.script)}</p>
        <h2 class="h2">${esc(spItem.name)}</h2>
        <p>${esc(SP.text)}</p>
        <p class="chef-price">${fcfa(spItem.price)}</p>
        <button class="btn btn-line-light" type="button" data-inc="${esc(spItem.id)}">${esc(SP.cta)} ${icon('arrow')}</button>
      </div>
      <img class="chef-img" src="${esc(SP.image)}" alt="${esc(spItem.name)}" loading="lazy">
    </div>` : ''}
    <figure class="review">
      <span class="quote-mark" aria-hidden="true">“</span>
      <h2 class="h3">${esc(T.title)}</h2>
      <blockquote>${esc(T.quote)}</blockquote>
      <figcaption><span class="stars" aria-label="5 étoiles">★★★★★</span> ${esc(T.author)} — ${esc(T.source)}</figcaption>
    </figure>
  </div>`);

  /* ─── Galerie + horaires ─── */
  const G = C.gallery, HO = C.hours;
  fill('galerie', `<div class="wrap gallery-in">
    <div class="gallery-main">
      <p class="kicker">${esc(G.kicker)}</p>
      <h2 class="h2">${esc(G.title)}</h2>
      <div class="gallery-grid">
        ${G.images.map((g) => `<img src="${esc(g.src)}" alt="${esc(g.alt)}" loading="lazy">`).join('')}
      </div>
    </div>
    <aside class="hours">
      <p class="hours-title">${icon('clock', 'ic ic-lg')} ${esc(HO.title)}</p>
      <dl>${HO.rows.map(([d, h]) => `<div><dt>${esc(d)}</dt><dd>${esc(h)}</dd></div>`).join('')}</dl>
      <p class="script script-gold">${esc(HO.script)}</p>
    </aside>
  </div>`);

  /* ─── Réservation ─── */
  const R = C.reservation;
  const today = new Date().toISOString().slice(0, 10);
  fill('reservation', `<div class="wrap">
    <div class="resa">
      <form class="resa-form" id="resaForm" novalidate>
        <p class="kicker">${esc(R.kicker)}</p>
        <h2 class="h2">${esc(R.title)}</h2>
        <p class="sec-sub">${esc(R.text)}</p>
        <div class="resa-grid">
          <label class="rf"><span>Nom</span><input name="name" autocomplete="name" required placeholder="Votre nom"></label>
          <label class="rf"><span>Date</span><input name="date" type="date" min="${today}" required></label>
          <label class="rf"><span>Heure</span><input name="time" type="time" min="10:00" required></label>
          <label class="rf"><span>Personnes</span><select name="guests" required>
            ${Array.from({ length: 12 }, (_, i) => `<option value="${i + 1}"${i === 1 ? ' selected' : ''}>${i + 1} personne${i ? 's' : ''}</option>`).join('')}
            <option value="plus de 12">Plus de 12</option>
          </select></label>
        </div>
        <p class="resa-err" id="resaErr" hidden>Indiquez votre nom, la date et l’heure.</p>
        <button class="btn btn-green" type="submit">${SOCIAL.whatsapp} ${esc(R.button)}</button>
      </form>
      <div class="resa-contact">
        <h3 class="h3">${esc(R.contactTitle)}</h3>
        <ul>
          <li>${icon('pin')}<a href="${esc(B.mapsUrl)}" target="_blank" rel="noopener">${esc(B.address)}</a></li>
          <li>${icon('phone')}<a href="${esc(B.phoneHref)}">${esc(B.phone)}</a></li>
          <li>${icon('mail')}<a href="mailto:${esc(B.email)}">${esc(B.email)}</a></li>
          <li>${icon('clock')}<span>${esc(B.hoursShort)}<br>Fermé le dimanche</span></li>
        </ul>
        <a class="btn btn-line" href="${esc(B.mapsUrl)}" target="_blank" rel="noopener">Itinéraire ${icon('arrow')}</a>
      </div>
    </div>
  </div>`);

  const rf = $('#resaForm');
  if (rf) rf.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = (n) => String(rf.elements[n].value || '').trim();
    const ok = v('name') && v('date') && v('time');
    $('#resaErr').hidden = !!ok;
    if (!ok) return;
    const date = new Date(v('date') + 'T12:00:00').toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const msg = `${R.greeting} :\n\n*Nom :* ${v('name')}\n*Date :* ${date}\n*Heure :* ${v('time').replace(':', ' h ')}\n*Personnes :* ${v('guests')}`;
    window.open(`https://wa.me/${O.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
  });

  /* ─── Pied de page ─── */
  const cats = [...new Set(O.items.map((i) => i.cat))];
  fill('footer', `<div class="wrap footer-in">
    <div class="f-brand">
      <img class="f-logo" src="${esc(B.logo)}" alt="${esc(B.logoAlt)}" loading="lazy">
      <p>${esc(C.hero.text)}</p>
      <div class="f-socials">${socials()}</div>
    </div>
    <div><h4>Liens</h4>${C.nav.map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join('')}</div>
    <div><h4>La carte</h4>${cats.map((c) => `<a href="#commande" data-cat-link="${esc(c)}">${esc(c)}</a>`).join('')}</div>
    <div><h4>Contact</h4>
      <a href="${esc(B.mapsUrl)}" target="_blank" rel="noopener">${esc(B.address)}</a>
      <a href="${esc(B.phoneHref)}">${esc(B.phone)}</a>
      <a href="mailto:${esc(B.email)}">${esc(B.email)}</a>
      <span>${esc(B.hoursShort)}</span>
    </div>
  </div>
  <div class="wrap footer-bottom"><span>${esc(B.copyright)}</span><span>${esc(B.credit)}</span></div>`);

  /* ─── Comportements ─── */
  // menu mobile
  const burger = $('.burger'), nav = $('#nav');
  const setMenu = (open) => {
    document.body.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    burger.innerHTML = icon(open ? 'close' : 'menu');
  };
  burger.addEventListener('click', () => setMenu(!document.body.classList.contains('nav-open')));
  nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });

  // ombre de l'en-tête après défilement
  const header = $('#header');
  const onScroll = () => header.classList.toggle('is-stuck', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // liens « catégorie » du pied de page : sélectionnent le filtre de la carte
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-cat-link]');
    if (!a) return;
    const chip = document.querySelector(`#commande .chip[data-cat="${CSS.escape(a.dataset.catLink)}"]`);
    if (chip) chip.click();
  });

  // petit retour visuel quand un plat est ajouté depuis les plats phares
  document.addEventListener('click', (e) => {
    const b = e.target.closest('#carte [data-inc], #special [data-inc]');
    if (!b) return;
    b.classList.remove('is-added'); void b.offsetWidth; b.classList.add('is-added');
  });
})();
