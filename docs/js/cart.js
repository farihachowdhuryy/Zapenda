'use strict';

// ── Cart State ─────────────────────────────────────────────────
let cart = JSON.parse(localStorage.getItem('zapenda_cart') || '[]');

function saveCart() {
  localStorage.setItem('zapenda_cart', JSON.stringify(cart));
  renderMiniCart();
  updateCartBadge();
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function formatPrice(n) {
  return '$' + n.toFixed(2);
}

// ── Add to Cart ────────────────────────────────────────────────
function addToCart(item) {
  const existing = cart.find(c =>
    c.id === item.id && c.size === item.size && c.fabric === item.fabric
  );
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push({ ...item, cartId: Date.now() + Math.random() });
  }
  saveCart();
  showToast(`${item.name} added to cart ✦`, 'success');
  // Pulse cart icon
  document.querySelectorAll('.nav-cart-btn').forEach(btn => {
    btn.classList.add('cart-pulse');
    setTimeout(() => btn.classList.remove('cart-pulse'), 600);
  });
}

function removeFromCart(cartId) {
  cart = cart.filter(c => c.cartId !== cartId);
  saveCart();
  renderCartPage();
}

function updateQty(cartId, delta) {
  const item = cart.find(c => c.cartId === cartId);
  if (!item) return;
  item.quantity = Math.max(1, item.quantity + delta);
  saveCart();
  renderCartPage();
}

function clearCart() {
  cart = [];
  saveCart();
}

// ── Cart Badge ─────────────────────────────────────────────────
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

// ── Mini Cart ──────────────────────────────────────────────────
function renderMiniCart() {
  const itemsEl = document.getElementById('mini-cart-items');
  const subtotalEl = document.getElementById('mini-cart-subtotal');
  if (!itemsEl) return;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="mini-cart-empty">Your cart is empty</p>';
  } else {
    itemsEl.innerHTML = cart.map(item => `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.name}"
          onerror="this.src='https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668'">
        <div class="mini-cart-item-info">
          <div class="mini-cart-item-name">${item.name}</div>
          <div class="mini-cart-item-meta">
            ${item.size !== 'custom' ? `Size: ${item.size} · ` : 'Custom Sizing · '}${item.fabric}
          </div>
          <div class="mini-cart-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
        <button class="mini-cart-remove" onclick="removeFromCart(${item.cartId})">✕</button>
      </div>
    `).join('');
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(getCartTotal());
}

// ── Cart Page ──────────────────────────────────────────────────
function renderCartPage() {
  const emptyEl  = document.getElementById('cart-empty');
  const summaryEl = document.getElementById('cart-summary-section');
  if (!emptyEl || !summaryEl) return;

  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    summaryEl.style.display = 'none';
    return;
  }

  emptyEl.style.display = 'none';
  summaryEl.style.display = 'grid';

  const itemsEl    = document.getElementById('cart-page-items');
  const subtotalEl = document.querySelector('.cart-subtotal');
  const totalEl    = document.querySelector('.cart-total');
  if (!itemsEl) return;

  itemsEl.innerHTML = cart.map(item => {
    const measureText = item.size === 'custom' && Object.keys(item.measurements || {}).length > 0
      ? Object.entries(item.measurements).map(([k,v]) => `${k}: ${v}`).join(' · ')
      : '';
    return `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}"
        onerror="this.src='https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-meta">
          ${item.size !== 'custom' ? `Size: ${item.size}` : '📐 Custom Sizing'} · ${item.fabric}
        </div>
        ${measureText ? `<div class="cart-item-measurements">${measureText}</div>` : ''}
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.cartId}, -1)">−</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQty(${item.cartId}, 1)">+</button>
          <button class="cart-remove-btn" onclick="removeFromCart(${item.cartId})">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
    </div>`;
  }).join('');

  const subtotal = getCartTotal();
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (totalEl)    totalEl.textContent    = formatPrice(subtotal);
}

// ── Checkout Summary ───────────────────────────────────────────
function renderCheckoutSummary() {
  const itemsEl    = document.getElementById('checkout-items');
  const subtotalEl = document.getElementById('checkout-subtotal');
  const totalEl    = document.getElementById('checkout-total');
  const shippingEl = document.getElementById('checkout-shipping');
  const btnTotal   = document.getElementById('checkout-btn-total');
  if (!itemsEl) return;

  itemsEl.innerHTML = cart.map(item => `
    <div style="display:flex;gap:12px;align-items:center;margin-bottom:12px">
      <img src="${item.image}" style="width:52px;height:62px;object-fit:cover;border-radius:6px"
        onerror="this.src='https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668'">
      <div style="flex:1">
        <div style="font-size:0.88rem;font-weight:600">${item.name}</div>
        <div style="font-size:0.75rem;color:var(--light)">${item.size !== 'custom' ? `Size ${item.size}` : 'Custom Sizing'} × ${item.quantity}</div>
      </div>
      <div style="font-size:0.9rem;font-weight:600;color:var(--amber)">${formatPrice(item.price * item.quantity)}</div>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? '—' : 'Free';
  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping;
  if (totalEl)    totalEl.textContent    = formatPrice(subtotal);
  if (btnTotal)   btnTotal.textContent   = formatPrice(subtotal);
}

// ── Toast ──────────────────────────────────────────────────────
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || '✓'}</span> ${message}`;
  container.appendChild(toast);
  // Trigger animation
  requestAnimationFrame(() => {
    requestAnimationFrame(() => toast.classList.add('toast-show'));
  });
  setTimeout(() => {
    toast.classList.remove('toast-show');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// ── Init ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  renderMiniCart();
  renderCartPage();
});
