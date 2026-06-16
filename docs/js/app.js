'use strict';

// ── State ──────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('zapenda_cart') || '[]');
let currentPage = 'home';
let heroSlide = 0;
let heroTimer = null;
let chatUnreadShown = true;
let modalProduct = null;
let quantity = 1;
let measureUnit = 'in';
let selectedFabric = '';
let selectedColor = '';
let galleryIndex = 0;
let authTab = 'signin';
let orderNumber = '';

// ── Hero Slides ───────────────────────────────────────
const heroSlides = [
  { title: 'Drop Two', subtitle: 'Zapenda Academy', desc: 'Class is officially in session. Swahili Shule — where fashion meets curiosity.', cta: 'Shop the Collection', page: 'academy', bg: 'images/hero1.webp' },
  { title: 'Drop One', subtitle: 'Silk Sun & Bukavu Brims', desc: 'Satin accessories crafted with love by our talented tailors in Bukavu, Congo.', cta: 'Shop Drop 1', page: 'academy', bg: 'images/hero2.webp' },
  { title: 'Our Story', subtitle: 'About Zapenda', desc: 'Every purchase creates opportunity for skilled artisans in the heart of Congo.', cta: 'Learn More', page: 'about', bg: 'images/hero3.webp' },
];

// ── Products ──────────────────────────────────────────
const academyProducts = [
  { id: 'scrunchie', name: 'Silk Scrunchie', price: 18, label: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=500&q=80', desc: 'Satin scrunchie, gentle on hair.', fabrics: ['Ankara Print', 'Kente Print', 'Solid Burgundy', 'Solid Gold', 'Solid Forest Green'] },
  { id: 'bonnet', name: 'Satin Bonnet', price: 35, label: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1620731990296-ce25ec27ccb8?w=500&q=80', desc: 'Satin-lined bonnet for hair protection.', fabrics: ['Ankara Print', 'Kente Print', 'Solid Burgundy', 'Solid Black'] },
  { id: 'bucket', name: 'Bucket Hat', price: 45, label: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&q=80', desc: 'African-print bucket hat.', fabrics: ['Ankara Print', 'Kente Print', 'Mud Cloth'] },
  { id: 'kitambala', name: 'Kitambala Wrap', price: 55, label: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1594938298603-c8148e4e52db?w=500&q=80', desc: 'Traditional kitambala head wrap.', fabrics: ['Ankara Print', 'Kente Print', 'Mud Cloth', 'Solid Cream'] },
  { id: 'lined-bonnet', name: 'Satin-Lined Wide-Brim Bonnet', price: 65, label: 'Made-to-Order', image: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=500&q=80', desc: 'Wide-brim bonnet with satin lining.', fabrics: ['Ankara Print', 'Kente Print', 'Solid Black'] },
];

const staplesProducts = [
  { id: 'dashiki', name: 'Ankara Dashiki Shirt', price: 120, label: 'Pre-Order', image: 'https://images.unsplash.com/photo-1594938298603-c8148e4e52db?w=500&q=80', desc: 'Genderless made-to-order dashiki.', fabrics: ['Ankara Print A', 'Ankara Print B', 'Kente Print'] },
  { id: 'wrap-dress', name: 'Congo Wrap Dress', price: 185, label: 'Pre-Order', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80', desc: 'Flowing wrap dress in vibrant prints.', fabrics: ['Ankara Floral', 'Batik Indigo', 'Kente Stripe'] },
  { id: 'co-ord', name: 'Kente Co-ord Set', price: 220, label: 'Pre-Order', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&q=80', desc: 'Matching top and trousers set.', fabrics: ['Kente Print', 'Ankara Print', 'Mud Cloth'] },
  { id: 'agbada', name: 'Modern Agbada', price: 280, label: 'Pre-Order', image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&q=80', desc: 'Contemporary agbada silhouette.', fabrics: ['Kente Ceremonial', 'Ankara Royal', 'Aso-Oke Gold'] },
  { id: 'maxi', name: 'Bukavu Maxi Dress', price: 165, label: 'Pre-Order', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80', desc: 'Floor-length dress inspired by Congo.', fabrics: ['Ankara Print A', 'Wax Print Blue', 'Wax Print Red'] },
];

const armCandyColors = [
  { name: 'Citrón', hex: '#8B9645', desc: 'A vibrant earthy green' },
  { name: 'Blackberry', hex: '#2D1B69', desc: 'Deep, rich navy black' },
  { name: 'Orange', hex: '#E07B39', desc: 'Warm sunset orange' },
  { name: 'Guava', hex: '#F4B8C1', desc: 'Soft light pink' },
  { name: 'Pomegranate', hex: '#8B3A3A', desc: 'Copper reddish-brown' },
];

const armCandyImages = [
  'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700&q=80',
  'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80',
  'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=80',
  'https://images.unsplash.com/photo-1591561954555-607968c989ab?w=700&q=80',
];

// ── Measurement fields ────────────────────────────────
const measureGroups = [
  { group: 'Body Basics', fields: [
    { key: 'height', label: 'Height', ph: 'e.g. 65 in / 165 cm', tip: 'Stand straight without shoes.', req: true },
    { key: 'weight', label: 'Weight (lbs/kg)', ph: 'e.g. 140 lbs', tip: 'Helps select fabric weight.', req: false },
  ]},
  { group: 'Upper Body', fields: [
    { key: 'bust', label: 'Bust / Chest', ph: 'e.g. 38 in', tip: 'Fullest part of chest, arms relaxed.', req: true },
    { key: 'underBust', label: 'Under Bust', ph: 'e.g. 33 in', tip: 'Directly under bust, around rib cage.', req: false },
    { key: 'shoulderWidth', label: 'Shoulder Width', ph: 'e.g. 16 in', tip: 'Across back from shoulder tip to tip.', req: false },
    { key: 'neckCircumference', label: 'Neck Circumference', ph: 'e.g. 14 in', tip: 'Around the base of your neck.', req: false },
  ]},
  { group: 'Mid Section', fields: [
    { key: 'waist', label: 'Waist', ph: 'e.g. 30 in', tip: 'Natural waistline — narrowest part.', req: true },
    { key: 'hips', label: 'Hips / Seat', ph: 'e.g. 42 in', tip: 'Fullest part of hips, ~8 in below waist.', req: true },
  ]},
  { group: 'Lower Body', fields: [
    { key: 'inseam', label: 'Inseam', ph: 'e.g. 30 in', tip: 'Crotch to floor along inside of leg.', req: false },
    { key: 'thigh', label: 'Thigh Circumference', ph: 'e.g. 24 in', tip: 'Fullest part of your thigh.', req: false },
  ]},
  { group: 'Arms & Length', fields: [
    { key: 'sleeveLength', label: 'Sleeve Length', ph: 'e.g. 24 in', tip: 'Shoulder tip to wrist, arm slightly bent.', req: false },
    { key: 'wrist', label: 'Wrist Circumference', ph: 'e.g. 6.5 in', tip: 'Around your wrist at the bone.', req: false },
    { key: 'backLength', label: 'Back Length', ph: 'e.g. 16 in', tip: 'Nape of neck to natural waist.', req: false },
    { key: 'desiredLength', label: 'Desired Garment Length', ph: 'e.g. 42 in', tip: 'How long you want the finished garment.', req: false },
  ]},
];

// ── Utility ───────────────────────────────────────────
function saveCart() { localStorage.setItem('zapenda_cart', JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge() {
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('.cart-badge').forEach(el => { el.textContent = count; el.style.display = count ? 'inline-flex' : 'none'; });
}
function showToast(msg) {
  const container = document.getElementById('toast-container');
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = msg;
  container.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 300); }, 2800);
}
function formatPrice(p) { return '$' + p.toFixed(2); }

// ── Navigation ────────────────────────────────────────
function showPage(page) {
  document.querySelectorAll('.page-section').forEach(el => el.classList.remove('active'));
  const target = document.getElementById('page-' + page);
  if (target) { target.classList.add('active'); currentPage = page; }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  closeDrawer();
  if (page === 'home') startHeroTimer();
  else stopHeroTimer();
}

function openDrawer() { document.getElementById('drawer').classList.add('open'); document.getElementById('drawer-overlay').classList.add('open'); }
function closeDrawer() { document.getElementById('drawer').classList.remove('open'); document.getElementById('drawer-overlay').classList.remove('open'); }

// ── Hero Slider ───────────────────────────────────────
function renderHero() {
  const s = heroSlides[heroSlide];
  const hero = document.getElementById('hero');
  hero.style.backgroundImage = `url(${s.bg})`;
  document.getElementById('hero-eyebrow').textContent = s.subtitle;
  document.getElementById('hero-title').textContent = s.title;
  document.getElementById('hero-desc').textContent = s.desc;
  document.getElementById('hero-cta').textContent = s.cta;
  document.getElementById('hero-cta').onclick = () => showPage(s.page);
  document.querySelectorAll('.hero-dot').forEach((d, i) => d.classList.toggle('active', i === heroSlide));
}
function startHeroTimer() { if (heroTimer) return; heroTimer = setInterval(() => { heroSlide = (heroSlide + 1) % heroSlides.length; renderHero(); }, 5500); }
function stopHeroTimer() { clearInterval(heroTimer); heroTimer = null; }
function heroNext() { heroSlide = (heroSlide + 1) % heroSlides.length; renderHero(); }
function heroPrev() { heroSlide = (heroSlide - 1 + heroSlides.length) % heroSlides.length; renderHero(); }

// ── Product Cards ─────────────────────────────────────
function productCardHTML(p, type) {
  return `
  <div class="product-card" onclick="openModal('${type}','${p.id}')">
    <div class="product-img">
      <img src="${p.image}" alt="${p.name}" loading="lazy">
      <span class="product-label">${p.label}</span>
    </div>
    <div class="product-info">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <span class="product-price">${formatPrice(p.price)}</span>
      <button class="product-btn">Select Options</button>
    </div>
  </div>`;
}

function renderProductGrids() {
  document.getElementById('academy-grid').innerHTML = academyProducts.map(p => productCardHTML(p, 'academy')).join('');
  document.getElementById('academy-grid-home').innerHTML = academyProducts.slice(0, 4).map(p => productCardHTML(p, 'academy')).join('');
  document.getElementById('staples-grid').innerHTML = staplesProducts.map(p => productCardHTML(p, 'staples')).join('');
}

// ── Order Modal ───────────────────────────────────────
function openModal(type, id) {
  const products = type === 'academy' ? academyProducts : staplesProducts;
  modalProduct = products.find(p => p.id === id);
  if (!modalProduct) return;
  quantity = 1;
  measureUnit = 'in';
  selectedFabric = modalProduct.fabrics[0] || '';

  const modal = document.getElementById('order-modal');
  document.getElementById('modal-product-name').textContent = modalProduct.name;
  document.getElementById('modal-product-price').textContent = formatPrice(modalProduct.price);
  document.getElementById('modal-submit-btn').textContent = `Add to Cart — ${formatPrice(modalProduct.price)}`;

  // Fabrics
  const fabricSection = document.getElementById('modal-fabric-section');
  if (modalProduct.fabrics && modalProduct.fabrics.length) {
    fabricSection.style.display = 'block';
    document.getElementById('modal-fabric-grid').innerHTML = modalProduct.fabrics.map(f =>
      `<button class="fabric-btn${f === selectedFabric ? ' active' : ''}" onclick="selectFabric('${f}',this)">${f}</button>`
    ).join('');
  } else { fabricSection.style.display = 'none'; }

  // Measures
  const mg = document.getElementById('modal-measure-groups');
  mg.innerHTML = measureGroups.map(g => `
    <div class="measure-group">
      <div class="measure-group-label">${g.group}</div>
      <div class="measure-grid">
        ${g.fields.map(f => `
          <div class="measure-field">
            <label>${f.label}${f.req ? ' <span style="color:var(--primary)">*</span>' : ''}</label>
            <input type="text" id="m-${f.key}" placeholder="${f.ph}" ${f.req ? 'required' : ''}>
            <span class="measure-tip">${f.tip}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  // Quantity
  document.getElementById('modal-qty-display').textContent = quantity;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('order-modal').classList.remove('open');
  document.body.style.overflow = '';
}

function selectFabric(fabric, btn) {
  selectedFabric = fabric;
  document.querySelectorAll('#modal-fabric-grid .fabric-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function setUnit(u, btn) {
  measureUnit = u;
  document.querySelectorAll('.unit-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function changeQty(delta) {
  quantity = Math.max(1, quantity + delta);
  document.getElementById('modal-qty-display').textContent = quantity;
  if (modalProduct) document.getElementById('modal-submit-btn').textContent = `Add to Cart — ${formatPrice(modalProduct.price * quantity)}`;
}

function submitOrder(e) {
  e.preventDefault();
  if (!modalProduct) return;
  const measurements = {};
  measureGroups.forEach(g => g.fields.forEach(f => { measurements[f.key] = document.getElementById('m-' + f.key)?.value || ''; }));
  const notes = document.getElementById('modal-notes').value;

  const existing = cart.find(i => i.id === modalProduct.id && i.variant === selectedFabric);
  if (existing) existing.quantity += quantity;
  else cart.push({ id: modalProduct.id, name: modalProduct.name, price: modalProduct.price, image: modalProduct.image, variant: selectedFabric, measurements, measurementUnit: measureUnit, notes, quantity });
  saveCart();
  showToast(`${modalProduct.name} added to cart!`);
  closeModal();
}

// ── Cart ──────────────────────────────────────────────
function openCart() {
  renderCartSidebar();
  document.getElementById('cart-sidebar').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cart-sidebar').classList.remove('open');
  document.body.style.overflow = '';
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  saveCart();
  renderCartSidebar();
}

function renderCartSidebar() {
  const items = document.getElementById('cart-items');
  if (!cart.length) {
    items.innerHTML = '<div class="cart-empty"><p style="font-size:2rem;margin-bottom:12px">🛒</p><p>Your cart is empty</p></div>';
  } else {
    items.innerHTML = cart.map((item, i) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <p>${item.variant || ''} — Qty: ${item.quantity}</p>
          <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
      </div>`).join('');
  }
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  document.getElementById('cart-total-amount').textContent = formatPrice(total);
}

function goToCheckout() {
  closeCart();
  renderCheckout();
  showPage('checkout');
}

// ── Checkout ──────────────────────────────────────────
function renderCheckout() {
  const items = document.getElementById('checkout-items');
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  items.innerHTML = cart.map(item => `
    <div class="summary-item">
      <img src="${item.image}" alt="${item.name}">
      <div style="flex:1">
        <p style="font-weight:600;font-size:14px">${item.name} × ${item.quantity}</p>
        <p style="font-size:12px;color:var(--charcoal-light)">${item.variant || ''}</p>
      </div>
      <span style="font-weight:600;color:var(--primary)">${formatPrice(item.price * item.quantity)}</span>
    </div>`).join('') || '<p style="color:var(--charcoal-light);font-size:13px">No items in cart.</p>';
  document.getElementById('checkout-subtotal').textContent = formatPrice(total);
  document.getElementById('checkout-shipping').textContent = 'Calculated at delivery';
  document.getElementById('checkout-total').textContent = formatPrice(total);
}

function submitCheckout(e) {
  e.preventDefault();
  orderNumber = 'ZAP-' + Math.floor(10000 + Math.random() * 90000);
  cart = [];
  saveCart();
  document.getElementById('order-number-display').textContent = orderNumber;
  showPage('confirmation');
}

// ── Arm Candy ─────────────────────────────────────────
function renderArmCandy() {
  // Swatches
  const swatchContainer = document.getElementById('arm-candy-swatches');
  swatchContainer.innerHTML = armCandyColors.map((c, i) =>
    `<div class="swatch${i === 0 ? ' active' : ''}" style="background:${c.hex}" title="${c.name}" onclick="selectColor(${i},this)"></div>`
  ).join('');
  selectedColor = armCandyColors[0].name;
  document.getElementById('color-name-display').textContent = armCandyColors[0].name + ' — ' + armCandyColors[0].desc;

  // Gallery thumbs
  const thumbs = document.getElementById('arm-candy-thumbs');
  thumbs.innerHTML = armCandyImages.map((src, i) =>
    `<img src="${src}" alt="Arm Candy ${i+1}" class="${i === 0 ? 'active' : ''}" onclick="setGalleryImage(${i},this)" loading="lazy">`
  ).join('');
  document.getElementById('arm-candy-main-img').src = armCandyImages[0];
}

function selectColor(i, el) {
  document.querySelectorAll('#arm-candy-swatches .swatch').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
  selectedColor = armCandyColors[i].name;
  document.getElementById('color-name-display').textContent = armCandyColors[i].name + ' — ' + armCandyColors[i].desc;
}

function setGalleryImage(i, el) {
  galleryIndex = i;
  document.getElementById('arm-candy-main-img').src = armCandyImages[i];
  document.querySelectorAll('#arm-candy-thumbs img').forEach((img, j) => img.classList.toggle('active', j === i));
}

function addArmCandyToCart() {
  const existing = cart.find(i => i.id === 'arm-candy' && i.variant === selectedColor);
  if (existing) existing.quantity += 1;
  else cart.push({ id: 'arm-candy', name: 'Zapenda Arm Candy', price: 200, image: armCandyImages[0], variant: selectedColor, measurements: {}, notes: '', quantity: 1 });
  saveCart();
  showToast(`Zapenda Arm Candy (${selectedColor}) added to cart!`);
}

// ── Auth ──────────────────────────────────────────────
function switchAuthTab(tab) {
  authTab = tab;
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.toggle('active', f.dataset.form === tab));
}

// ── Chat Widget ───────────────────────────────────────
const faqs = [
  { q: 'Shipping?', a: 'We ship worldwide! Standard delivery is 4–6 weeks due to our made-to-order production process.' },
  { q: 'Sizing?', a: 'All garments are made to your exact measurements. Enter your measurements when ordering, or visit our Sizing Chart page for guidance.' },
  { q: 'Returns?', a: 'Because all items are made-to-order, we do not accept returns unless the item arrives damaged or defective.' },
  { q: 'About Congo?', a: 'Our skilled tailors are based in Bukavu and Goma, eastern Congo. Every purchase directly supports their livelihood.' },
  { q: 'Custom orders?', a: 'Yes! All of our garments are custom made to your measurements. Add your sizes when you add an item to cart.' },
];

function toggleChat() {
  const win = document.getElementById('chat-window');
  win.classList.toggle('open');
  if (win.classList.contains('open')) {
    document.getElementById('chat-unread').style.display = 'none';
    chatUnreadShown = false;
  }
}

function closeChat() { document.getElementById('chat-window').classList.remove('open'); }

function sendFAQ(idx) {
  addChatMsg(faqs[idx].q, 'user');
  setTimeout(() => addChatMsg(faqs[idx].a, 'bot'), 500);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;
  addChatMsg(msg, 'user');
  input.value = '';
  setTimeout(() => {
    const lc = msg.toLowerCase();
    let reply = "Thanks for your message! Our team will get back to you shortly. You can also check our FAQ below.";
    if (lc.includes('ship')) reply = faqs[0].a;
    else if (lc.includes('size') || lc.includes('measur')) reply = faqs[1].a;
    else if (lc.includes('return') || lc.includes('refund')) reply = faqs[2].a;
    else if (lc.includes('congo') || lc.includes('tailor')) reply = faqs[3].a;
    else if (lc.includes('custom')) reply = faqs[4].a;
    addChatMsg(reply, 'bot');
  }, 600);
}

function addChatMsg(text, type) {
  const msgs = document.getElementById('chat-messages');
  const d = document.createElement('div');
  d.className = `chat-msg ${type}`;
  d.innerHTML = `<div class="chat-bubble">${text}</div>`;
  msgs.appendChild(d);
  msgs.scrollTop = msgs.scrollHeight;
}

// ── Blog ──────────────────────────────────────────────
const blogPosts = [
  { id: 1, date: 'January 22, 2023', title: 'New Year Update!', excerpt: 'We started Zapenda with the mission to create employment opportunities for talented tailors in Congo. With the success of our holiday pop-up, we were able to hire two new staff members in Congo, contracted local Detroit talent for our marketing efforts, and were able to provide surgery for one of our Master Tailors.', image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=700&q=80', body: `<p>We started Zapenda with the mission to create employment opportunities for talented tailors in Congo. With the success of our holiday pop-up, we were able to hire two new staff members in Congo, contracted local Detroit talent for our marketing efforts, and were able to provide surgery for one of our Master Tailors.</p><p>This year, we are excited to continue growing and expanding our impact. We have new collections in the works, new partnerships being formed, and a commitment to making sure every person who works with Zapenda thrives.</p><p>Thank you for being part of this journey. Your support means the world to us — and to our tailors in Bukavu and Goma.</p><p>With love,<br>Stella & the Zapenda Team</p>` },
  { id: 2, date: 'March 15, 2023', title: 'What "Made-to-Order" Really Means', excerpt: 'At Zapenda, we are committed to sustainability and zero waste. Made-to-order means we only produce what is needed, reducing excess inventory and ensuring every garment is crafted with intention and care.', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=700&q=80', body: `<p>At Zapenda, we often use the phrase "made-to-order," but what does that really mean for you as a customer?</p><p>It means that when you place an order with us, a real human artisan in Congo picks up fabric and begins crafting your specific garment. Nothing is mass-produced. Nothing sits in a warehouse. Every stitch is intentional.</p><p>This approach has incredible benefits: zero waste (we only make what's ordered), perfect fit (tailored to your exact measurements), and genuine craftsmanship (each piece gets full attention and care).</p><p>Yes, it means waiting 4–6 weeks instead of 2-day shipping. But we believe the wait is part of the story — the story of your garment, the hands that made it, and the community it supports.</p>` },
];

function renderBlog() {
  document.getElementById('blog-grid').innerHTML = blogPosts.map(p => `
    <div class="blog-card" onclick="showBlogPost(${p.id})">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <p class="blog-meta">${p.date}</p>
      <h3>${p.title}</h3>
      <p>${p.excerpt.substring(0, 160)}...</p>
      <span class="read-more">Read More →</span>
    </div>`).join('');
}

function showBlogPost(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) return;
  document.getElementById('blog-post-date').textContent = post.date;
  document.getElementById('blog-post-title').textContent = post.title;
  document.getElementById('blog-post-img').src = post.image;
  document.getElementById('blog-post-body').innerHTML = post.body;
  showPage('blog-post');
}

// ── Init ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProductGrids();
  renderBlog();
  renderArmCandy();
  renderHero();
  startHeroTimer();
  updateCartBadge();

  // Hero dots
  const dotsContainer = document.getElementById('hero-dots');
  dotsContainer.innerHTML = heroSlides.map((_, i) =>
    `<button class="hero-dot${i === 0 ? ' active' : ''}" onclick="heroSlide=${i};renderHero()"></button>`
  ).join('');

  // Chat enter key
  document.getElementById('chat-input').addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage(); });

  // Chat FAQ buttons
  document.getElementById('chat-faqs').innerHTML = faqs.map((f, i) =>
    `<button class="chat-faq-btn" onclick="sendFAQ(${i})">${f.q}</button>`
  ).join('');

  // Checkout form
  document.getElementById('checkout-form').addEventListener('submit', submitCheckout);

  // Order modal form
  document.getElementById('order-form').addEventListener('submit', submitOrder);

  // Auth tabs default
  switchAuthTab('signin');
});
