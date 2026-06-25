'use strict';

// ── Custom Cursor ────────────────────────────────────────────
function initCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function moveCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.transform  = `translate(${mx - 4}px, ${my - 4}px)`;
    ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
    requestAnimationFrame(moveCursor);
  }
  moveCursor();
}

// ── Scroll Progress ──────────────────────────────────────────
function initScrollProgress() {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  }, { passive: true });
}

// ── Reveal on Scroll ─────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Nav Mobile Toggle ────────────────────────────────────────
function initNav() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  if (!hamburger || !mobileNav) return;
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
  });
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });
}

// ── Mini Cart ────────────────────────────────────────────────
function initMiniCart() {
  const overlay = document.getElementById('mini-cart-overlay');
  const drawer  = document.getElementById('mini-cart');
  const openBtns = document.querySelectorAll('[data-open-cart]');
  const closeBtn = document.getElementById('mini-cart-close');
  if (!overlay || !drawer) return;
  function openCart() { overlay.classList.add('open'); drawer.classList.add('open'); }
  function closeCart(){ overlay.classList.remove('open'); drawer.classList.remove('open'); }
  openBtns.forEach(b => b.addEventListener('click', openCart));
  closeBtn?.addEventListener('click', closeCart);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeCart(); });
}

// ── Hero Slider ──────────────────────────────────────────────
let heroSlide = 0;
let heroTimer = null;

function initHero() {
  if (typeof heroSlides === 'undefined' || !heroSlides.length) return;
  renderHero();
  heroTimer = setInterval(() => {
    heroSlide = (heroSlide + 1) % heroSlides.length;
    renderHero();
  }, 5500);
}

function renderHero() {
  const s = heroSlides[heroSlide];
  const bg    = document.getElementById('hero-bg');
  const title = document.getElementById('hero-title');
  const eyebrow= document.getElementById('hero-eyebrow');
  const desc  = document.getElementById('hero-desc');
  const cta   = document.getElementById('hero-cta');
  const dots  = document.querySelectorAll('.hero-dot');
  if (!bg) return;
  bg.style.backgroundImage = `url('${s.bg}')`;
  if (title)  title.textContent   = s.title;
  if (eyebrow) eyebrow.textContent = s.subtitle;
  if (desc)   desc.textContent    = s.desc;
  if (cta)    { cta.textContent   = s.cta; cta.onclick = () => location.href = s.href; }
  dots.forEach((d, i) => d.classList.toggle('active', i === heroSlide));
}

function heroPrev() {
  heroSlide = (heroSlide - 1 + heroSlides.length) % heroSlides.length;
  clearInterval(heroTimer);
  heroTimer = setInterval(() => { heroSlide = (heroSlide+1)%heroSlides.length; renderHero(); }, 5500);
  renderHero();
}
function heroNext() {
  heroSlide = (heroSlide + 1) % heroSlides.length;
  clearInterval(heroTimer);
  heroTimer = setInterval(() => { heroSlide = (heroSlide+1)%heroSlides.length; renderHero(); }, 5500);
  renderHero();
}

// ── Product Cards ────────────────────────────────────────────
function productCardHTML(p) {
  const dropLabel = p.drop ? `<div class="product-card-drop">${p.drop.replace('-',' ').replace(/\b\w/g,c=>c.toUpperCase())}</div>` : '';
  const labelClass = p.label === 'New Arrival' ? 'label-lime' : p.label === 'In Stock' ? 'label-forest' : '';
  return `
  <div class="product-card reveal" onclick="openProductModal('${p.id}')">
    <div class="product-card-img">
      <img src="${p.images[0]}" alt="${p.name}" loading="lazy"
        onerror="this.src='https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668'">
      ${p.images[1] ? `<img class="product-card-img-2" src="${p.images[1]}" alt="${p.name}" loading="lazy">` : ''}
      <div class="product-label ${labelClass}">${p.label}</div>
      <div class="product-quick-add">Quick Add →</div>
    </div>
    <div class="product-card-body">
      ${dropLabel}
      <div class="product-card-name">${p.name}</div>
      <div class="product-card-price">$${p.price.toFixed(2)}</div>
    </div>
  </div>`;
}

function renderGrid(gridId, products) {
  const el = document.getElementById(gridId);
  if (!el || !products) return;
  el.innerHTML = products.map(productCardHTML).join('');
  initReveal();
}

// ── Product Modal ────────────────────────────────────────────
let modalState = {
  product: null, selectedSize: '', selectedFabric: '',
  quantity: 1, measurements: {}, sizingMode: 'standard', galleryIdx: 0,
};

function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  modalState = { product: p, selectedSize: '', selectedFabric: p.fabrics[0] || '', quantity: 1, measurements: {}, sizingMode: 'standard', galleryIdx: 0 };
  const overlay = document.getElementById('product-modal');
  if (!overlay) return;
  overlay.querySelector('.modal-name').textContent  = p.name;
  overlay.querySelector('.modal-price').textContent = '$' + p.price.toFixed(2);
  overlay.querySelector('.modal-desc').textContent  = p.desc;

  const mainImg = overlay.querySelector('#modal-main-img');
  if (mainImg) { mainImg.src = p.images[0]; mainImg.alt = p.name; }
  const thumbs = overlay.querySelector('#modal-thumbs');
  if (thumbs) {
    thumbs.innerHTML = p.images.map((img, i) => `
      <img src="${img}" class="modal-thumb ${i===0?'active':''}" alt="${p.name}" loading="lazy"
        onclick="selectGalleryThumb(${i})">`
    ).join('');
  }

  const sizingSection = overlay.querySelector('.modal-sizing-section');
  if (sizingSection) sizingSection.style.display = p.hasSizing ? '' : 'none';
  renderSizingToggle();
  renderStandardSizes();
  buildMeasureFields();

  const fabricsSection = overlay.querySelector('.modal-fabrics-section');
  if (fabricsSection) {
    fabricsSection.innerHTML = p.fabrics.map(f => `
      <button class="fabric-pill ${f===modalState.selectedFabric?'selected':''}" onclick="selectFabric('${f}')">${f}</button>
    `).join('');
  }

  renderQty();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProductModal() {
  document.getElementById('product-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

function selectGalleryThumb(idx) {
  modalState.galleryIdx = idx;
  const p = modalState.product;
  const mainImg = document.querySelector('#modal-main-img');
  if (mainImg && p) mainImg.src = p.images[idx];
  document.querySelectorAll('.modal-thumb').forEach((t,i) => t.classList.toggle('active', i===idx));
}

function renderSizingToggle() {
  const p = modalState.product;
  if (!p?.hasSizing) return;
  document.querySelectorAll('.sizing-toggle-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === modalState.sizingMode);
  });
  const standardPanel = document.querySelector('.standard-sizing-panel');
  const customPanel   = document.querySelector('.custom-sizing-panel');
  if (standardPanel) standardPanel.classList.toggle('hide', modalState.sizingMode !== 'standard');
  if (customPanel)   customPanel.classList.toggle('show', modalState.sizingMode === 'custom');
}

function setSizingMode(mode) {
  modalState.sizingMode = mode;
  modalState.selectedSize = '';
  renderSizingToggle();
  renderStandardSizes();
}

function renderStandardSizes() {
  const grid = document.querySelector('.size-grid');
  if (!grid) return;
  grid.innerHTML = STANDARD_SIZES.map(s => `
    <button class="size-btn ${s===modalState.selectedSize?'selected':''}" onclick="selectSize('${s}')">${s}</button>
  `).join('');
}

function selectSize(size) {
  modalState.selectedSize = size;
  renderStandardSizes();
}

function selectFabric(fabric) {
  modalState.selectedFabric = fabric;
  document.querySelectorAll('.fabric-pill').forEach(pill => {
    pill.classList.toggle('selected', pill.textContent.trim() === fabric);
  });
}

function renderQty() {
  const qtyEl = document.querySelector('.modal-qty-val');
  if (qtyEl) qtyEl.textContent = modalState.quantity;
}

function changeQty(delta) {
  modalState.quantity = Math.max(1, modalState.quantity + delta);
  renderQty();
}

function addModalToCart() {
  const p = modalState.product;
  if (!p) return;
  if (p.hasSizing && modalState.sizingMode === 'standard' && !modalState.selectedSize) {
    showToast('Please select a size', 'error'); return;
  }
  if (!modalState.selectedFabric) {
    showToast('Please select a fabric', 'error'); return;
  }
  let measurements = {};
  if (modalState.sizingMode === 'custom') {
    document.querySelectorAll('.modal-measure-input').forEach(input => {
      if (input.value.trim()) measurements[input.name] = input.value.trim();
    });
    if (!measurements.bust && !measurements.waist) {
      showToast('Please enter at least bust and waist measurements', 'error'); return;
    }
  }
  addToCart({
    id: p.id, name: p.name, price: p.price, image: p.images[0],
    size: modalState.sizingMode === 'custom' ? 'custom' : modalState.selectedSize,
    fabric: modalState.selectedFabric,
    quantity: modalState.quantity,
    measurements: modalState.sizingMode === 'custom' ? measurements : {},
  });
  closeProductModal();
}

function buildMeasureFields() {
  const panel = document.querySelector('.custom-sizing-panel');
  if (!panel || typeof MEASURE_GROUPS === 'undefined') return;
  panel.innerHTML = `
    <p style="font-size:0.82rem;color:var(--mid);margin-bottom:16px">Enter your measurements. Our tailors will craft the piece to your exact specifications.</p>
    ${MEASURE_GROUPS.map(g => `
      <div class="measure-group-title">${g.group}</div>
      <div class="measure-row">
        ${g.fields.map(f => `
          <div class="measure-field">
            <label>${f.label}${f.req?' *':''}</label>
            <input class="modal-measure-input" name="${f.key}" placeholder="${f.ph}" ${f.req?'required':''}>
          </div>
        `).join('')}
      </div>
    `).join('')}
  `;
}

// ── Blog ─────────────────────────────────────────────────────
function blogCardHTML(post) {
  return `
  <div class="blog-card reveal" onclick="openBlogPost(${post.id})">
    <img src="${post.image}" alt="${post.title}" loading="lazy">
    <div class="blog-card-body">
      <div class="blog-card-date">${post.date}</div>
      <div class="blog-card-title">${post.title}</div>
      <div class="blog-card-excerpt">${post.excerpt}</div>
    </div>
  </div>`;
}

function openBlogPost(id) {
  if (window.location.pathname.indexOf('blog.html') > -1) {
    const post = BLOG_POSTS.find(p => p.id === id);
    if (!post) return;
    const postView = document.getElementById('blog-post-view');
    const listView = document.getElementById('blog-list-view');
    if (postView && listView) {
      listView.style.display = 'none'; postView.style.display = 'block';
      postView.querySelector('#post-date').textContent  = post.date;
      postView.querySelector('#post-title').textContent = post.title;
      postView.querySelector('#post-img').src           = post.image;
      postView.querySelector('#post-body').innerHTML    = post.body;
      window.scrollTo(0, 0);
    }
  } else {
    sessionStorage.setItem('zapenda_post', id);
    location.href = 'blog.html';
  }
}

// ── Arm Candy ────────────────────────────────────────────────
let armCandyIdx = 0;
let selectedArmColor = '';

function initArmCandy() {
  const mainImg = document.getElementById('arm-candy-main-img');
  const thumbsEl = document.getElementById('arm-candy-thumbs');
  const swatchesEl = document.getElementById('arm-candy-swatches');
  if (!mainImg || !thumbsEl || !swatchesEl) return;
  mainImg.src = ARM_CANDY_IMAGES[0];
  thumbsEl.innerHTML = ARM_CANDY_IMAGES.map((img, i) => `
    <img src="${img}" class="arm-candy-thumb ${i===0?'active':''}" alt="Arm Candy" loading="lazy"
      onclick="selectArmThumb(${i})">`
  ).join('');
  swatchesEl.innerHTML = ARM_CANDY_COLORS.map(c => `
    <button class="swatch" style="background:${c.hex}" title="${c.name}" onclick="selectArmColor('${c.name}','${c.desc}')"></button>
  `).join('');
}

function selectArmThumb(i) {
  armCandyIdx = i;
  const mainImg = document.getElementById('arm-candy-main-img');
  if (mainImg) mainImg.src = ARM_CANDY_IMAGES[i];
  document.querySelectorAll('.arm-candy-thumb').forEach((t,j) => t.classList.toggle('active', j===i));
}

function selectArmColor(name, desc) {
  selectedArmColor = name;
  document.querySelectorAll('.swatch').forEach(s => s.classList.toggle('selected', s.title === name));
  const colorNameEl = document.getElementById('color-name-display');
  if (colorNameEl) colorNameEl.textContent = `${name} — ${desc}`;
}

function addArmCandyToCart() {
  if (!selectedArmColor) { showToast('Please select a colour', 'error'); return; }
  addToCart({ id: 'arm-candy-' + selectedArmColor, name: 'Zapenda Arm Candy', price: 200, image: ARM_CANDY_IMAGES[armCandyIdx], size: 'One Size', fabric: selectedArmColor, quantity: 1 });
}

// ── Shop ─────────────────────────────────────────────────────
let shopFilter = 'all';
let dropFilter = 'all';

function initShop() {
  const params = new URLSearchParams(location.search);
  shopFilter = params.get('filter') || 'all';
  dropFilter = params.get('drop')   || 'all';
  renderShop();
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === shopFilter));
  document.querySelectorAll('.drop-btn').forEach(b => b.classList.toggle('active', b.dataset.drop === dropFilter));
}

function setFilter(filter) {
  shopFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
  renderShop();
}

function setDropFilter(drop) {
  dropFilter = drop;
  document.querySelectorAll('.drop-btn').forEach(b => b.classList.toggle('active', b.dataset.drop === drop));
  renderShop();
}

function renderShop() {
  let products = PRODUCTS;
  if (shopFilter !== 'all') products = products.filter(p => p.category === shopFilter);
  if (dropFilter !== 'all') products = products.filter(p => p.drop === dropFilter);
  renderGrid('shop-grid', products);
}

function renderFeatured() {
  const featured = PRODUCTS.filter((_, i) => i < 6);
  renderGrid('featured-grid', featured);
}

function renderHomeBlog() {
  const el = document.getElementById('blog-grid-home');
  if (!el) return;
  el.innerHTML = BLOG_POSTS.slice(0, 3).map(p => blogCardHTML(p)).join('');
  initReveal();
}

function renderBlogPage() {
  const el = document.getElementById('blog-grid-page');
  if (!el) return;
  el.innerHTML = BLOG_POSTS.map(p => blogCardHTML(p)).join('');
  initReveal();
  const postId = sessionStorage.getItem('zapenda_post');
  if (postId) {
    sessionStorage.removeItem('zapenda_post');
    setTimeout(() => openBlogPost(parseInt(postId)), 100);
  }
}

// ── Auth ─────────────────────────────────────────────────────
function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(el => el.classList.toggle('active', el.dataset.tab === tab));
  document.querySelectorAll('.auth-form').forEach(el => el.classList.toggle('active', el.dataset.form === tab));
}

function submitSignIn(e) {
  e.preventDefault();
  const email = e.target.querySelector('[type=email]')?.value;
  localStorage.setItem('zapenda_user', JSON.stringify({ email, name: email?.split('@')[0] }));
  showToast('Signed in! Welcome back 👋', 'success');
  setTimeout(() => { location.href = 'index.html'; }, 900);
}

function submitCreateAccount(e) {
  e.preventDefault();
  const email = e.target.querySelector('[type=email]')?.value;
  const first = e.target.querySelector('[placeholder*="First"]')?.value || '';
  const last  = e.target.querySelector('[placeholder*="Last"]')?.value  || '';
  localStorage.setItem('zapenda_user', JSON.stringify({ email, name: `${first} ${last}`.trim() }));
  showToast('Account created! Welcome to Zapenda ✦', 'success');
  setTimeout(() => { location.href = 'index.html'; }, 900);
}

// ── Custom Order Form ────────────────────────────────────────
let customOrderStep = 1;
let customFormData  = {};
let inspirationPhotos = [];

function initCustomOrderForm() {
  showStep(1);
  initPhotoUpload();
}

function showStep(step) {
  customOrderStep = step;
  document.querySelectorAll('.form-panel').forEach((panel, i) => {
    panel.classList.toggle('active', i + 1 === step);
  });
  document.querySelectorAll('.form-step').forEach((s, i) => {
    s.classList.toggle('active', i + 1 === step);
    s.classList.toggle('done', i + 1 < step);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (step === 4) buildReview();
}

function nextStep() {
  if (!validateStep(customOrderStep)) return;
  collectStepData(customOrderStep);
  if (customOrderStep < 4) showStep(customOrderStep + 1);
}
function prevStep() { if (customOrderStep > 1) showStep(customOrderStep - 1); }

function validateStep(step) {
  const panel = document.querySelectorAll('.form-panel')[step - 1];
  if (!panel) return true;
  let valid = true;
  panel.querySelectorAll('[required]').forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = 'var(--terra)';
      input.addEventListener('input', () => input.style.borderColor = '', { once: true });
      valid = false;
    }
  });
  if (!valid) showToast('Please fill in all required fields', 'error');
  return valid;
}

function collectStepData(step) {
  const panel = document.querySelectorAll('.form-panel')[step - 1];
  if (!panel) return;
  panel.querySelectorAll('input,select,textarea').forEach(input => {
    if (input.name && input.type !== 'file') customFormData[input.name] = input.value;
  });
}

function buildReview() {
  collectStepData(3);
  const reviewEl = document.getElementById('order-review');
  if (!reviewEl) return;
  const d = customFormData;
  const fields = [
    ['Name', d.full_name], ['Email', d.email], ['Phone', d.phone],
    ['Garment Type', d.garment_type], ['Fabric', d.fabric_pref || 'Flexible'],
    ['Budget', d.budget], ['Description', d.description],
    ['Height', d.height], ['Bust', d.bust], ['Waist', d.waist], ['Hips', d.hips],
    ['Sleeve Length', d.sleeve_length], ['Garment Length', d.desired_length],
    ['Notes', d.notes],
  ].filter(([, v]) => v);
  reviewEl.innerHTML = fields.map(([k, v]) => `
    <div class="review-row"><span>${k}</span><span>${v}</span></div>
  `).join('');
}

function initPhotoUpload() {
  const input = document.getElementById('inspiration-photos');
  const previews = document.getElementById('photo-previews');
  if (!input || !previews) return;
  input.addEventListener('change', e => {
    const files = Array.from(e.target.files).slice(0, 5);
    inspirationPhotos = files;
    previews.innerHTML = '';
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = document.createElement('img');
        img.src = ev.target.result;
        img.className = 'photo-preview-item';
        previews.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
    if (files.length) showToast(`${files.length} photo${files.length>1?'s':''} ready`, 'info');
  });
}

function submitToWhatsApp() {
  collectStepData(4);
  const d = customFormData;
  const msg = [
    '🌍 *ZAPENDA CUSTOM ORDER REQUEST*', '',
    '*Contact*',
    `Name: ${d.full_name||'—'}`, `Email: ${d.email||'—'}`, `Phone: ${d.phone||'—'}`, '',
    '*Garment*',
    `Type: ${d.garment_type||'—'}`, `Fabric: ${d.fabric_pref||'Flexible'}`, `Budget: ${d.budget||'Flexible'}`,
    `Description: ${d.description||'—'}`, '',
    '*Measurements*',
    `Height: ${d.height||'—'}`, `Bust: ${d.bust||'—'}`, `Waist: ${d.waist||'—'}`, `Hips: ${d.hips||'—'}`,
    `Sleeve: ${d.sleeve_length||'—'}`, `Length: ${d.desired_length||'—'}`, '',
    d.notes ? `Notes: ${d.notes}` : '',
    inspirationPhotos.length > 0 ? `📸 ${inspirationPhotos.length} inspiration photo(s) to follow` : '',
    '', '— Sent via zapendashop.com'
  ].filter(l => l !== null).join('\n');
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  const banner = document.getElementById('confirmation-banner');
  if (banner) { banner.classList.add('show'); banner.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
}

function selectOrderType(type) {
  document.querySelectorAll('.order-type-card').forEach(c => c.classList.remove('selected'));
  event.currentTarget.classList.add('selected');
}

// ── Newsletter ───────────────────────────────────────────────
function submitNewsletter(e) {
  e.preventDefault();
  showToast('Welcome to the Zapenda community! 🌿', 'success');
  e.target.reset();
}

// ── Checkout ─────────────────────────────────────────────────
function submitCheckout(e) {
  e.preventDefault();
  if (!cart.length) { showToast('Your cart is empty', 'error'); return; }
  const orderNum = 'ZAP-' + Date.now().toString().slice(-6);
  clearCart();
  showToast('Order placed! 🎉');
  setTimeout(() => { location.href = 'confirmation.html?order=' + orderNum; }, 800);
}

// ── Ticker ───────────────────────────────────────────────────
function initTicker() {
  const track = document.querySelector('.ticker-track');
  if (!track) return;
  track.innerHTML += track.innerHTML;
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollProgress();
  initReveal();
  initNav();
  initMiniCart();
  initTicker();

  if (document.getElementById('hero-bg'))            initHero();
  if (document.getElementById('featured-grid'))      renderFeatured();
  if (document.getElementById('blog-grid-home'))     renderHomeBlog();
  if (document.getElementById('shop-grid'))          initShop();
  if (document.getElementById('arm-candy-main-img')) initArmCandy();
  if (document.getElementById('blog-grid-page'))     renderBlogPage();
  if (document.getElementById('custom-order-form'))  initCustomOrderForm();

  renderCheckoutSummary();

  // Confirmation page order number
  const params = new URLSearchParams(location.search);
  const orderNum = params.get('order');
  if (orderNum) {
    const badge = document.getElementById('order-badge-text');
    if (badge) badge.textContent = orderNum;
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProductModal();
  });
});
