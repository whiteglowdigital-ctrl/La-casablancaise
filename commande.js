/* ═══════════════════════════════════════════════════════════
   MODULE « COMMANDER EN LIGNE » — commande.js
   Lit SITE_CONTENT.order (content.js) : carte, zones, WhatsApp.
   Parcours : plats → panier → coordonnées → message WhatsApp prérempli.
   Aucune donnée client ici. Chargé AVANT app.js : les images de la
   section existent déjà quand le moteur mesure la page.
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT || {};
  const O = C.order;
  const root = document.getElementById('commande');
  if (!O || !root) return;

  /* ─── Outils ─── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fcfa = (n) => n.toLocaleString('fr-FR').replace(/\u202f|\u00a0/g, ' ') + ' F';
  const byId = Object.fromEntries(O.items.map((i) => [i.id, i]));
  const cats = [...new Set(O.items.map((i) => i.cat))];
  const cart = {};                                       // id → quantité
  const remeasure = () => dispatchEvent(new Event('resize')); // app.js recalcule la hauteur de page

  /* ─── 1 · Section : infos, filtres, cartes plats ─── */
  root.innerHTML = `
    <header class="order-head">
      <p class="mono ash">${esc(O.kicker)}</p>
      <h2 class="order-title">${esc(O.title)}</h2>
      <p class="order-sub">${esc(O.sub)}</p>
    </header>
    <div class="order-infos">
      ${O.infos.map((i) => `<div class="order-info"><span class="mono">${esc(i.k)}</span><span>${esc(i.v)}</span></div>`).join('')}
    </div>
    <div class="order-filters" role="group" aria-label="Catégories de la carte">
      ${cats.map((c, k) => `<button type="button" class="chip${k ? '' : ' is-on'}" data-cat="${esc(c)}" aria-pressed="${k ? 'false' : 'true'}">${esc(c)}</button>`).join('')}
    </div>
    <div class="order-grid">
      ${O.items.map((i) => `
        <article class="dish" data-id="${esc(i.id)}" data-cat="${esc(i.cat)}"${i.cat === cats[0] ? '' : ' hidden'}>
          <div class="dish-img"><img src="${esc(i.img)}" alt="${esc(i.name)}" loading="lazy" decoding="async"></div>
          <div class="dish-body">
            <h3 class="dish-name">${esc(i.name)}</h3>
            <span class="dish-cat mono">${esc(i.desc || '')}</span>
            <div class="dish-foot">
              <span class="dish-price">${fcfa(i.price)}</span>
              <span class="dish-ctrl"></span>
            </div>
          </div>
        </article>`).join('')}
    </div>`;

  $$('.chip', root).forEach((chip) => chip.addEventListener('click', () => {
    $$('.chip', root).forEach((x) => {
      const on = x === chip;
      x.classList.toggle('is-on', on);
      x.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $$('.dish', root).forEach((d) => { d.hidden = d.dataset.cat !== chip.dataset.cat; });
    remeasure();
  }));

  /* ─── 2 · Barre panier + panneau (hors du wrapper animé #smooth) ─── */
  const zoneOptions = O.zones.map((z, k) => `<option value="${k}">${esc(z.name)} — ${fcfa(z.fee)}</option>`).join('');
  document.body.insertAdjacentHTML('beforeend', `
    <button class="cartbar" id="cartbar" type="button" aria-haspopup="dialog" aria-controls="checkout">
      <span class="mono" id="cartbarTxt" aria-live="polite"></span>
      <span class="cartbar-go mono">Commander →</span>
    </button>
    <div class="checkout" id="checkout" aria-hidden="true">
      <div class="checkout-veil" data-close></div>
      <aside class="checkout-panel" role="dialog" aria-modal="true" aria-labelledby="coTitle">
        <div class="checkout-top"><h3 id="coTitle">Votre commande</h3><button class="x" type="button" data-close aria-label="Fermer">✕</button></div>
        <div class="checkout-scroll" id="coScroll">
          <form id="coForm" novalidate>
            <div class="co-block">
              <span class="co-label mono">Vos plats</span>
              <div id="coLines"></div>
              <div class="co-sub"><span>Sous-total</span><span id="coSub"></span></div>
              <div class="co-sub" id="coFeeRow" hidden><span>Livraison <small id="coZoneName"></small></span><span id="coFee"></span></div>
              <div class="co-total"><span>Total</span><b id="coTotal"></b></div>
            </div>

            <div class="co-block">
              <span class="co-label mono">Vos coordonnées</span>
              <label class="field"><span>Nom</span><input name="name" autocomplete="name" required><p class="err">Indiquez votre nom.</p></label>
              <label class="field"><span>Numéro de téléphone</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="77 123 45 67" required><p class="err">Numéro sénégalais à 9 chiffres, ex. 77 123 45 67.</p></label>
            </div>

            <div class="co-block">
              <span class="co-label mono" id="lblMode">Mode de récupération</span>
              <div class="opts" role="radiogroup" aria-labelledby="lblMode">
                <label class="opt"><input type="radio" name="mode" value="retrait"><span>Sur place<small>Je viens la chercher au restaurant</small></span></label>
                <label class="opt"><input type="radio" name="mode" value="livraison"><span>Livraison<small>Dans mon quartier</small></span></label>
              </div>
              <p class="err">Choisissez sur place ou livraison.</p>
              <div class="sub-fields" id="delivFields" hidden>
                <label class="field"><span>Quartier</span><select name="zone"><option value="">Choisissez votre quartier</option>${zoneOptions}</select><p class="err">Choisissez votre quartier.</p></label>
              </div>
              <p class="closed-note" id="closedNote" hidden></p>
            </div>

            <div class="co-block">
              <span class="co-label mono" id="lblPay">Paiement à la réception</span>
              <div class="opts" role="radiogroup" aria-labelledby="lblPay">
                ${(O.payments || ['Wave', 'Orange Money', 'Espèces']).map((p) => `<label class="opt"><input type="radio" name="pay" value="${esc(p)}"><span>${esc(p)}</span></label>`).join('')}
              </div>
              <p class="err">Choisissez un moyen de paiement.</p>
              <p class="co-note" id="payNote"></p>
            </div>

            <div class="co-block">
              <span class="co-label mono">Note pour la cuisine</span>
              <label class="field"><span>Une précision ? (facultatif)</span><textarea name="note" rows="2" placeholder="Ex. pas de sauce, sans oignons, bien cuit…"></textarea></label>
            </div>
          </form>
        </div>
        <div class="checkout-foot" id="coFoot">
          <button class="send" type="submit" form="coForm">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2l-.4-.2Z"/></svg>
            Envoyer la commande sur WhatsApp
          </button>
          <p class="send-hint mono">WhatsApp s'ouvre avec votre commande — il reste à appuyer sur Envoyer.</p>
        </div>
      </aside>
    </div>`);

  const cartbar = $('#cartbar'), checkout = $('#checkout'), form = $('#coForm');

  /* ─── 3 · Panier et calculs ─── */
  const val = (n) => (form.elements[n] ? String(form.elements[n].value || '') : '').trim();
  const radio = (n) => { const r = form.querySelector(`input[name="${n}"]:checked`); return r ? r.value : ''; };
  const isDelivery = () => radio('mode') === 'livraison';
  const zone = () => (isDelivery() && val('zone') !== '' ? O.zones[+val('zone')] : null);
  const count = () => Object.values(cart).reduce((a, q) => a + q, 0);
  const subtotal = () => Object.entries(cart).reduce((a, [id, q]) => a + byId[id].price * q, 0);
  const fee = () => (zone() ? zone().fee : 0);
  const total = () => subtotal() + fee();

  const stepper = (id) => {
    const n = esc(byId[id].name);
    return `<span class="stepper"><button type="button" data-dec="${esc(id)}" aria-label="Retirer un ${n}">−</button><b aria-label="Quantité">${cart[id]}</b><button type="button" data-inc="${esc(id)}" aria-label="Ajouter un ${n}">+</button></span>`;
  };

  function renderCart() {
    $$('.dish', root).forEach((d) => {
      const id = d.dataset.id;
      $('.dish-ctrl', d).innerHTML = cart[id]
        ? stepper(id)
        : `<button class="add" type="button" data-inc="${esc(id)}" aria-label="Ajouter ${esc(byId[id].name)}">+</button>`;
    });
    const n = count();
    $('#cartbarTxt').textContent = `${n} article${n > 1 ? 's' : ''} · ${fcfa(subtotal())}`;
    cartbar.classList.toggle('is-on', n > 0);
    $('#coLines').innerHTML = n
      ? Object.keys(cart).map((id) => `<div class="line"><img src="${esc(byId[id].img)}" alt=""><span class="line-name">${esc(byId[id].name)}<small>${fcfa(byId[id].price * cart[id])}</small></span>${stepper(id)}</div>`).join('')
      : '<p class="co-note">Votre commande est vide.</p>';
    renderTotals();
  }

  function renderTotals() {
    $('#coSub').textContent = fcfa(subtotal());
    const z = zone();
    $('#coFeeRow').hidden = !z;
    if (z) { $('#coZoneName').textContent = `(${z.name})`; $('#coFee').textContent = fcfa(z.fee); }
    $('#coTotal').textContent = fcfa(total());
  }

  function change(id, delta) {
    if (!byId[id]) return;
    cart[id] = (cart[id] || 0) + delta;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  }

  // un seul écouteur pour tous les +/− (cartes et panneau) ; le focus clavier
  // est rendu au contrôle équivalent après le nouveau rendu
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-inc], [data-dec]');
    if (!btn) return;
    const id = btn.dataset.inc || btn.dataset.dec;
    const inPanel = !!btn.closest('#checkout');
    change(id, btn.dataset.inc ? 1 : -1);
    if (e.detail === 0) { // activé au clavier
      const scope = inPanel ? checkout : $(`.dish[data-id="${CSS.escape(id)}"]`, root);
      const next = scope && ($(`[data-inc="${CSS.escape(id)}"]`, scope) || $('.add', scope));
      if (next) next.focus();
    }
  });

  /* ─── 4 · Ouverture / fermeture du panneau ─── */
  let lastFocus = null;
  function openPanel() {
    showForm();
    lastFocus = document.activeElement;
    checkout.classList.add('is-open');
    checkout.setAttribute('aria-hidden', 'false');
    document.documentElement.classList.add('co-lock');
    updateClosedNote();
    setTimeout(() => $('.x', checkout).focus(), 50);
  }
  function closePanel() {
    if (!checkout.classList.contains('is-open')) return;
    checkout.classList.remove('is-open');
    checkout.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('co-lock');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  cartbar.addEventListener('click', openPanel);
  $$('[data-close]', checkout).forEach((b) => b.addEventListener('click', closePanel));
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closePanel(); });

  /* ─── 5 · Champs conditionnels ─── */
  form.addEventListener('change', (e) => {
    const n = e.target.name;
    if (n === 'mode') $('#delivFields').hidden = !isDelivery();
    if (n === 'mode' || n === 'zone') renderTotals();
    if (n === 'mode' || n === 'pay') updatePayNote();
    clearErr(e.target);
  });
  form.addEventListener('input', (e) => clearErr(e.target));

  function updatePayNote() {
    const p = radio('pay');
    const when = isDelivery() ? 'à la livraison' : (radio('mode') ? 'sur place' : 'à la réception de la commande');
    $('#payNote').textContent = p ? `Vous réglez ${when}, par ${p}.` : `Rien à payer maintenant : vous réglez ${when}.`;
  }
  function clearErr(el) {
    const f = el.closest('.field'); if (f) f.classList.remove('is-bad');
    const g = el.closest('.opts'); if (g) g.classList.remove('is-bad');
  }

  // horaires lus dans content.js ; utcOffset = décalage du pays (Sénégal : 0)
  function updateClosedNote() {
    const H = O.hours;
    const note = $('#closedNote');
    if (!H) { note.hidden = true; return; }
    const local = new Date(Date.now() + (H.utcOffset || 0) * 3600e3);
    const d = local.getUTCDay(), h = local.getUTCHours();
    const closed = (H.closedDays || []).includes(d) || h < H.open || h >= H.close;
    note.hidden = !closed;
    note.textContent = closed ? (O.closedMessage || '') : '';
  }

  /* ─── 6 · Validation ─── */
  // numéro mobile ou fixe sénégalais, avec ou sans indicatif +221 / 00221
  function phoneOk(p) {
    let d = p.replace(/\D/g, '');
    if (d.startsWith('00')) d = d.slice(2);
    if (d.startsWith('221')) d = d.slice(3);
    return /^(7[05678]|3[03])\d{7}$/.test(d);
  }
  function markBad(name) {
    const el = form.elements[name];
    const node = el instanceof RadioNodeList ? el[0] : el;
    const f = node.closest('.field'); if (f) f.classList.add('is-bad');
    const g = node.closest('.opts'); if (g) g.classList.add('is-bad');
    return node.closest('.field, .opts');
  }
  function validate() {
    const errs = [];
    if (!count()) { $('#coLines').innerHTML = '<p class="co-note">Ajoutez au moins un plat.</p>'; errs.push($('#coLines')); }
    if (!val('name')) errs.push(markBad('name'));
    if (!phoneOk(val('phone'))) errs.push(markBad('phone'));
    if (!radio('mode')) errs.push(markBad('mode'));
    if (isDelivery() && val('zone') === '') errs.push(markBad('zone'));
    if (!radio('pay')) errs.push(markBad('pay'));
    return errs;
  }

  /* ─── 7 · Message WhatsApp ─── */
  function makeRef() {
    const now = new Date();
    const dd = String(now.getUTCDate()).padStart(2, '0');
    const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
    return `${O.refPrefix || 'CMD'}-${dd}${mm}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  }
  function buildMessage(ref) {
    const prefix = O.messagePrefix || {};
    const liv = isDelivery();
    const L = [];
    L.push(`${O.greeting || 'Bonjour, voici ma commande'} (réf. ${ref}) :`);
    L.push('');
    Object.keys(cart).forEach((id) => {
      const it = byId[id];
      L.push(`• ${cart[id]} × ${prefix[it.cat] || ''}${it.name} — ${fcfa(it.price * cart[id])}`);
    });
    L.push('');
    L.push('Sous-total : ' + fcfa(subtotal()));
    if (liv) L.push(`Livraison (${zone().name}) : ${fcfa(fee())}`);
    L.push(`*Total à payer : ${fcfa(total())}*`);
    L.push(`*Client :* ${val('name')} · *Téléphone :* ${val('phone')}`);
    L.push(`*Paiement :* ${radio('pay')}${liv ? ', à la livraison' : ', retrait sur place'}`);
    if (val('note')) L.push('*Note :* ' + val('note'));
    return L.join('\n');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const errs = validate();
    if (errs.length) { errs[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    const ref = makeRef();
    const url = `https://wa.me/${O.whatsapp}?text=${encodeURIComponent(buildMessage(ref))}`;
    window.open(url, '_blank', 'noopener');
    showDone(ref, url);
  });

  /* ─── 8 · Écran de confirmation ─── */
  function showDone(ref, url) {
    form.hidden = true;
    $('#coFoot').hidden = true;
    const d = document.createElement('div');
    d.className = 'done';
    d.id = 'coDone';
    d.innerHTML = `
      <p class="mono ash">Commande préparée</p>
      <h4>Plus qu'une étape dans WhatsApp</h4>
      <p>Appuyez sur <b>Envoyer</b> dans WhatsApp pour nous transmettre la commande <span class="ref">${esc(ref)}</span>. Nous vous répondons pour la confirmer.</p>
      <div class="done-actions">
        <a class="send" href="${esc(url)}" target="_blank" rel="noopener">Rouvrir WhatsApp</a>
        <button class="ghost" type="button" id="coNew">Nouvelle commande</button>
      </div>`;
    $('#coScroll').appendChild(d);
    $('#coNew').addEventListener('click', () => {
      Object.keys(cart).forEach((k) => delete cart[k]);
      form.reset();
      $('#delivFields').hidden = true;
      updatePayNote();
      renderCart();
      closePanel();
    });
  }
  function showForm() {
    const d = $('#coDone');
    if (d) d.remove();
    form.hidden = false;
    $('#coFoot').hidden = false;
  }

  /* ─── 9 · Arrivée depuis l'accueil : commande.html#add-<id> ajoute le plat ─── */
  const fromHome = decodeURIComponent(location.hash).match(/^#add-(.+)$/);
  if (fromHome && byId[fromHome[1]]) {
    const id = fromHome[1];
    cart[id] = 1;
    const chip = $(`.chip[data-cat="${CSS.escape(byId[id].cat)}"]`, root);
    if (chip) chip.click();
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* aperçu */ }
    requestAnimationFrame(() => {
      const d = $(`.dish[data-id="${CSS.escape(id)}"]`, root);
      if (d) { d.classList.add('is-picked'); d.scrollIntoView({ block: 'center' }); }
    });
  }

  renderCart();
  updatePayNote();
})();
