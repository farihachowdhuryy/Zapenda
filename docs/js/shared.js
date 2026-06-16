'use strict';

// ── Cart helpers ──────────────────────────────────────
function getCart() { return JSON.parse(localStorage.getItem('zapenda_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('zapenda_cart', JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge() {
  const count = getCart().reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(el => { el.textContent = count; el.style.display = count ? 'inline-flex' : 'none'; });
}
function addToCart(item) {
  const cart = getCart();
  const ex = cart.find(i => i.id === item.id && i.variant === item.variant);
  if (ex) ex.quantity += item.quantity || 1;
  else cart.push({ quantity: 1, ...item });
  saveCart(cart);
  showToast(item.name + ' added to cart!');
}
function removeFromCart(idx) {
  const cart = getCart();
  cart.splice(idx, 1);
  saveCart(cart);
}

// ── Toast ─────────────────────────────────────────────
function showToast(msg, color) {
  const c = document.getElementById('toast-container');
  if (!c) return;
  const t = document.createElement('div');
  t.className = 'toast';
  if (color) t.style.borderLeftColor = color;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2800);
}

// ── NAV inject ────────────────────────────────────────
function injectNav(activePage) {
  const mount = document.getElementById('nav-mount');
  if (!mount) return;
  const page = activePage || '';
  function active(p) { return page === p ? 'class="active"' : ''; }
  mount.innerHTML = `
  <nav class="navbar">
    <div class="kente-stripe"></div>
    <div class="navbar-inner">
      <a href="index.html" class="nav-logo">Zapenda</a>
      <ul class="nav-links">
        <li><a href="index.html" ${active('home')}>Home</a></li>
        <li>
          <a href="#">Shop ▾</a>
          <ul class="dropdown">
            <li><a href="academy-drop-1.html">🎓 Academy Drop 1</a></li>
            <li><a href="shop.html">👗 Zapenda Staples</a></li>
            <li><a href="arm-candy.html">👜 Arm Candy</a></li>
          </ul>
        </li>
        <li><a href="about.html" ${active('about')}>About</a></li>
        <li><a href="blog.html" ${active('blog')}>Blog</a></li>
        <li><a href="sizing-chart.html" ${active('sizing')}>Sizing</a></li>
        <li class="nav-custom"><a href="custom-order-form.html" ${active('custom')}>✨ Custom Order</a></li>
      </ul>
      <div class="nav-right">
        <a href="account.html">Sign In</a>
        <a href="cart.html">Cart <span class="cart-badge" style="display:none">0</span></a>
      </div>
      <button class="hamburger" onclick="toggleMobileMenu()" aria-label="Menu">☰</button>
    </div>
    <div class="mobile-nav" id="mobile-nav">
      <a href="index.html">Home</a>
      <a href="academy-drop-1.html">Academy Drop 1</a>
      <a href="shop.html">Zapenda Staples</a>
      <a href="arm-candy.html">Arm Candy</a>
      <a href="about.html">About</a>
      <a href="blog.html">Blog</a>
      <a href="sizing-chart.html">Sizing Chart</a>
      <a href="custom-order-form.html" class="pink">✨ Custom Order</a>
      <a href="account.html">Sign In / Register</a>
      <a href="cart.html">Cart</a>
    </div>
  </nav>`;
  updateCartBadge();
}

function toggleMobileMenu() {
  const m = document.getElementById('mobile-nav');
  if (m) m.classList.toggle('open');
}

// ── FOOTER inject ─────────────────────────────────────
function injectFooter() {
  const mount = document.getElementById('footer-mount');
  if (!mount) return;
  mount.innerHTML = `
  <footer class="footer">
    <div class="kente-stripe"></div>
    <div class="footer-inner container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="footer-logo">Zapenda</span>
          <p>Fashion rooted in love — derived from Swahili. Every purchase supports skilled artisans in Bukavu and Goma, eastern Congo.</p>
          <a href="https://instagram.com/zapendashop" target="_blank" class="footer-ig">Instagram @zapendashop</a>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <a href="academy-drop-1.html">Academy Drop 1</a>
          <a href="shop.html">Zapenda Staples</a>
          <a href="arm-candy.html">Arm Candy</a>
          <a href="custom-order-form.html">Custom Order</a>
        </div>
        <div class="footer-col">
          <h4>Info</h4>
          <a href="about.html">About Us</a>
          <a href="blog.html">Blog</a>
          <a href="sizing-chart.html">Sizing Chart</a>
          <a href="shipping.html">Shipping</a>
          <a href="refund-policy.html">Refund Policy</a>
          <a href="privacy-policy.html">Privacy Policy</a>
          <a href="terms-of-service.html">Terms of Service</a>
        </div>
        <div class="footer-newsletter">
          <h4>Stay in the loop</h4>
          <p>New drops, promos & updates — straight to your inbox.</p>
          <div class="nl-form">
            <input type="email" id="nl-email" placeholder="your@email.com">
            <button onclick="subscribeNewsletter()">Subscribe</button>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>Copyright © 2026, Zapenda. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="privacy-policy.html">Privacy</a>
          <a href="refund-policy.html">Refunds</a>
          <a href="terms-of-service.html">Terms</a>
          <a href="shipping.html">Shipping</a>
        </div>
      </div>
    </div>
  </footer>`;
}

function subscribeNewsletter() {
  const el = document.getElementById('nl-email');
  if (el && el.value.trim()) { showToast('Thank you for subscribing! 💌', '#2EC866'); el.value = ''; }
}

// ── CHAT inject ───────────────────────────────────────
const faqs = [
  { q: 'Shipping?', a: 'Shipping is calculated at checkout. We ship worldwide! Made-to-order pieces take 4–6 weeks.' },
  { q: 'Sizing?', a: 'We offer standard sizes XS–3XL and full custom sizing. Use our Sizing Chart page for measuring guidance.' },
  { q: 'Returns?', a: 'Ready-to-wear pieces: 30-day return policy. Custom made-to-measure garments are final sale.' },
  { q: 'Custom order?', a: 'Yes! Visit our Custom Order page. You can send measurements, inspo photos, and contact us on WhatsApp.' },
  { q: 'About Congo?', a: 'Our skilled tailors are based in Bukavu & Goma, eastern Congo. Every purchase supports their livelihood.' },
];

function injectChat() {
  const mount = document.getElementById('chat-mount');
  if (!mount) return;
  mount.innerHTML = `
  <div class="chat-widget">
    <div class="chat-window" id="chat-window">
      <div class="chat-head">
        <div><h4>Zapenda Support</h4><span>We reply fast ✨</span></div>
        <button class="chat-head-close" onclick="closeChat()">✕</button>
      </div>
      <div class="chat-msgs" id="chat-msgs">
        <div class="chat-msg bot"><div class="bubble">Hi! Welcome to Zapenda 💖 Ask me anything about sizing, shipping, custom orders, or our Congo artisans!</div></div>
      </div>
      <div class="chat-faqs" id="chat-faqs"></div>
      <div class="chat-input-row">
        <input type="text" id="chat-input" placeholder="Type a message...">
        <button onclick="sendChat()">Send</button>
      </div>
    </div>
    <button class="chat-toggle" onclick="toggleChat()">💬<span class="chat-unread" id="chat-unread"></span></button>
  </div>`;

  document.getElementById('chat-faqs').innerHTML = faqs.map((f, i) =>
    `<button class="chat-faq-btn" onclick="sendFAQ(${i})">${f.q}</button>`).join('');
  document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
}

function toggleChat() {
  const w = document.getElementById('chat-window');
  w.classList.toggle('open');
  if (w.classList.contains('open')) document.getElementById('chat-unread').style.display = 'none';
}
function closeChat() { document.getElementById('chat-window').classList.remove('open'); }
function addMsg(text, type) {
  const msgs = document.getElementById('chat-msgs');
  const d = document.createElement('div');
  d.className = 'chat-msg ' + type;
  d.innerHTML = `<div class="bubble">${text}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}
function sendFAQ(i) { addMsg(faqs[i].q, 'user'); setTimeout(() => addMsg(faqs[i].a, 'bot'), 500); }
function sendChat() {
  const inp = document.getElementById('chat-input');
  const msg = inp.value.trim();
  if (!msg) return;
  addMsg(msg, 'user'); inp.value = '';
  setTimeout(() => {
    const lc = msg.toLowerCase();
    let reply = "Thanks! Our team will get back to you. Check our FAQ quick answers below!";
    if (lc.includes('ship')) reply = faqs[0].a;
    else if (lc.includes('size') || lc.includes('measur')) reply = faqs[1].a;
    else if (lc.includes('return') || lc.includes('refund')) reply = faqs[2].a;
    else if (lc.includes('custom')) reply = faqs[3].a;
    else if (lc.includes('congo') || lc.includes('tailor')) reply = faqs[4].a;
    addMsg(reply, 'bot');
  }, 600);
}

// ── PRODUCTS data ─────────────────────────────────────
const PRODUCTS = {
  academy: [
    { id: 'scrunchie', name: 'Silk Scrunchie', price: 18, badge: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&q=80', desc: 'Satin scrunchie, gentle on hair.', fabrics: ['Ankara Print','Kente Print','Solid Hot Pink','Solid Teal','Solid Forest Green'] },
    { id: 'bonnet', name: 'Satin Bonnet', price: 35, badge: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1620731990296-ce25ec27ccb8?w=500&q=80', desc: 'Satin-lined bonnet for hair protection.', fabrics: ['Ankara Print','Kente Print','Solid Hot Pink','Solid Black'] },
    { id: 'bucket', name: 'Bucket Hat', price: 45, badge: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80', desc: 'African-print bucket hat.', fabrics: ['Ankara Print','Kente Print','Mud Cloth'] },
    { id: 'kitambala', name: 'Kitambala Wrap', price: 55, badge: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1594938298603-c8148e4e52db?w=500&q=80', desc: 'Traditional kitambala head wrap.', fabrics: ['Ankara Print','Kente Print','Mud Cloth','Solid Cream'] },
    { id: 'wide-bonnet', name: 'Wide-Brim Satin Bonnet', price: 65, badge: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80', desc: 'Wide-brim bonnet with satin lining.', fabrics: ['Ankara Print','Kente Print','Solid Black'] },
  ],
  staples: [
    { id: 'dashiki', name: 'Ankara Dashiki', price: 120, badge: 'Pre-Order', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80', desc: 'Genderless made-to-order dashiki.', fabrics: ['Ankara Print A','Ankara Print B','Kente Print'] },
    { id: 'wrap-dress', name: 'Congo Wrap Dress', price: 185, badge: 'Pre-Order', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80', desc: 'Flowing wrap dress in vibrant prints.', fabrics: ['Ankara Floral','Batik Indigo','Kente Stripe'] },
    { id: 'co-ord', name: 'Kente Co-ord Set', price: 220, badge: 'Pre-Order', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80', desc: 'Matching top and trousers set.', fabrics: ['Kente Print','Ankara Print','Mud Cloth'] },
    { id: 'agbada', name: 'Modern Agbada', price: 280, badge: 'Pre-Order', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80', desc: 'Contemporary agbada silhouette.', fabrics: ['Kente Ceremonial','Ankara Royal','Aso-Oke Gold'] },
    { id: 'maxi', name: 'Bukavu Maxi Dress', price: 165, badge: 'Pre-Order', image: 'https://images.unsplash.com/photo-1594938298603-c8148e4e52db?w=500&q=80', desc: 'Floor-length dress inspired by Congo.', fabrics: ['Ankara Print A','Wax Print Blue','Wax Print Red'] },
  ]
};
const STD_SIZES = ['XS','S','M','L','XL','2XL','3XL'];
const MEASURE_GROUPS = [
  { group: 'Body Basics', fields: [
    { key:'height', label:'Height', ph:'e.g. 65 in', tip:'Stand straight without shoes.', req:true },
    { key:'weight', label:'Weight', ph:'e.g. 140 lbs', tip:'Helps us select fabric weight.' },
  ]},
  { group: 'Upper Body', fields: [
    { key:'bust', label:'Bust / Chest', ph:'e.g. 38 in', tip:'Fullest part of chest, arms relaxed.', req:true },
    { key:'underBust', label:'Under Bust', ph:'e.g. 33 in', tip:'Directly under bust, around rib cage.' },
    { key:'shoulderWidth', label:'Shoulder Width', ph:'e.g. 16 in', tip:'Across back, shoulder tip to tip.' },
    { key:'neck', label:'Neck Circumference', ph:'e.g. 14 in', tip:'Around base of your neck.' },
  ]},
  { group: 'Mid Section', fields: [
    { key:'waist', label:'Waist', ph:'e.g. 30 in', tip:'Natural waistline — narrowest part.', req:true },
    { key:'hips', label:'Hips / Seat', ph:'e.g. 42 in', tip:'Fullest part of hips, ~8 in below waist.', req:true },
  ]},
  { group: 'Lower Body', fields: [
    { key:'inseam', label:'Inseam', ph:'e.g. 30 in', tip:'Crotch to floor, inner leg.' },
    { key:'thigh', label:'Thigh Circumference', ph:'e.g. 24 in', tip:'Fullest part of thigh.' },
  ]},
  { group: 'Arms & Length', fields: [
    { key:'sleeve', label:'Sleeve Length', ph:'e.g. 24 in', tip:'Shoulder tip to wrist, arm bent.' },
    { key:'wrist', label:'Wrist', ph:'e.g. 6.5 in', tip:'Around your wrist at the bone.' },
    { key:'backLength', label:'Back Length', ph:'e.g. 16 in', tip:'Nape of neck to natural waist.' },
    { key:'garmentLength', label:'Desired Garment Length', ph:'e.g. 42 in', tip:'How long you want the finished piece.' },
  ]},
];

// ── ORDER MODAL ───────────────────────────────────────
let _product = null, _qty = 1, _unit = 'in', _fabric = '', _size = '', _mode = 'standard';

function openModal(type, id) {
  const products = PRODUCTS[type] || [];
  _product = products.find(p => p.id === id);
  if (!_product) return;
  _qty = 1; _unit = 'in'; _mode = 'standard';
  _fabric = _product.fabrics ? _product.fabrics[0] : '';
  _size = 'M';

  const modal = document.getElementById('order-modal');
  document.getElementById('m-name').textContent = _product.name;
  document.getElementById('m-price').textContent = '$' + _product.price.toFixed(2);
  document.getElementById('m-submit').textContent = 'Add to Cart — $' + _product.price.toFixed(2);
  document.getElementById('m-qty').textContent = _qty;

  // Fabrics
  document.getElementById('m-fabrics').innerHTML = (_product.fabrics || []).map(f =>
    `<button class="fabric-btn${f===_fabric?' active':''}" type="button" onclick="selFabric('${f}',this)">${f}</button>`).join('');

  // Standard sizes
  document.getElementById('m-std-sizes').innerHTML = STD_SIZES.map(s =>
    `<button class="std-size${s==='M'?' active':''}" type="button" onclick="selSize('${s}',this)">${s}</button>`).join('');

  // Measure groups
  document.getElementById('m-measure-groups').innerHTML = MEASURE_GROUPS.map(g => `
    <div class="measure-group">
      <div class="measure-group-label">${g.group}</div>
      <div class="measure-grid">
        ${g.fields.map(f => `
          <div class="measure-field">
            <label>${f.label}${f.req ? ' <span style="color:#E91E8C">*</span>' : ''}</label>
            <input type="text" id="mf-${f.key}" placeholder="${f.ph}" ${f.req?'required':''}>
            <span class="measure-tip">${f.tip}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');

  showSizeMode('standard');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() { document.getElementById('order-modal').classList.remove('open'); document.body.style.overflow = ''; }
function selFabric(f, btn) { _fabric = f; document.querySelectorAll('#m-fabrics .fabric-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
function selSize(s, btn) { _size = s; document.querySelectorAll('#m-std-sizes .std-size').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
function setUnit(u, btn) { _unit = u; document.querySelectorAll('.unit-btn').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); }
function changeQty(d) { _qty = Math.max(1, _qty + d); document.getElementById('m-qty').textContent = _qty; if (_product) document.getElementById('m-submit').textContent = 'Add to Cart — $' + (_product.price * _qty).toFixed(2); }
function showSizeMode(mode) {
  _mode = mode;
  document.querySelectorAll('.size-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === mode));
  document.getElementById('standard-size-section').style.display = mode === 'standard' ? 'block' : 'none';
  document.getElementById('custom-size-section').style.display = mode === 'custom' ? 'block' : 'none';
}

function submitOrder(e) {
  e.preventDefault();
  if (!_product) return;
  const variant = _mode === 'standard' ? `Size ${_size} / ${_fabric}` : `Custom / ${_fabric}`;
  const measurements = {};
  if (_mode === 'custom') {
    MEASURE_GROUPS.forEach(g => g.fields.forEach(f => { measurements[f.key] = document.getElementById('mf-'+f.key)?.value||''; }));
  }
  addToCart({ id: _product.id + '-' + variant, name: _product.name, price: _product.price, image: _product.image, variant, measurements, unit: _unit, notes: document.getElementById('m-notes').value, quantity: _qty });
  closeModal();
}

// ── MODAL HTML ────────────────────────────────────────
function injectModal() {
  const mount = document.getElementById('modal-mount');
  if (!mount) return;
  mount.innerHTML = `
  <div id="order-modal" class="modal-overlay" onclick="if(event.target===this)closeModal()">
    <div class="modal-box">
      <button class="modal-close-btn" onclick="closeModal()">✕</button>
      <div class="modal-header">
        <h2 id="m-name"></h2>
        <span class="modal-price" id="m-price"></span>
      </div>
      <form id="order-form" class="modal-form" onsubmit="submitOrder(event)">
        <div>
          <div class="modal-section-title">Select Fabric</div>
          <div class="fabric-grid" id="m-fabrics"></div>
        </div>
        <div>
          <div class="modal-section-title">Size</div>
          <div class="size-tabs">
            <button type="button" class="size-tab active" data-mode="standard" onclick="showSizeMode('standard')">Standard Size</button>
            <button type="button" class="size-tab" data-mode="custom" onclick="showSizeMode('custom')">Custom Measurements</button>
          </div>
          <div id="standard-size-section">
            <div class="std-sizes" id="m-std-sizes"></div>
            <p style="font-size:12px;color:var(--gray);margin-top:10px">Not sure? Check our <a href="sizing-chart.html" style="color:var(--hot-pink)">Sizing Chart</a>.</p>
          </div>
          <div id="custom-size-section" style="display:none">
            <div class="unit-row">
              <span style="font-size:12px;color:var(--gray)">Select unit:</span>
              <div class="unit-toggle">
                <button type="button" class="unit-btn active" onclick="setUnit('in',this)">in</button>
                <button type="button" class="unit-btn" onclick="setUnit('cm',this)">cm</button>
              </div>
            </div>
            <p style="font-size:12px;color:var(--gray);margin-bottom:14px">See our <a href="sizing-chart.html" style="color:var(--hot-pink)">Sizing Chart</a> for how to measure yourself.</p>
            <div id="m-measure-groups"></div>
          </div>
        </div>
        <div>
          <div class="modal-section-title">Notes</div>
          <textarea id="m-notes" rows="3" placeholder="Special fit requests, style preferences, or any other notes..."></textarea>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div class="modal-section-title" style="margin:0">Quantity</div>
          <div class="qty-control">
            <button type="button" onclick="changeQty(-1)">−</button>
            <span id="m-qty">1</span>
            <button type="button" onclick="changeQty(1)">+</button>
          </div>
        </div>
        <div class="production-note">💡 Made-to-order by our tailors in Congo. Allow <strong>4–6 weeks</strong> for delivery.</div>
        <button type="submit" class="btn-primary" id="m-submit" style="width:100%;padding:16px;justify-content:center">Add to Cart</button>
      </form>
    </div>
  </div>`;
}

// ── PRODUCT GRID helper ───────────────────────────────
function renderProductGrid(containerId, type, limit) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = (PRODUCTS[type] || []).slice(0, limit || 99);
  el.innerHTML = items.map(p => `
  <div class="product-card" onclick="openModal('${type}','${p.id}')">
    <div class="product-img">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <span class="product-badge"><span class="badge teal">${p.badge}</span></span>
    </div>
    <div class="product-info">
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.desc}</p>
      <span class="product-price">$${p.price.toFixed(2)}</span>
      <button class="product-btn" onclick="event.stopPropagation();openModal('${type}','${p.id}')">Select Options</button>
    </div>
  </div>`).join('');
}

// ── INIT ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  injectNav(document.body.dataset.page || '');
  injectFooter();
  injectChat();
  injectModal();
  updateCartBadge();
});
