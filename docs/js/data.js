'use strict';

const WHATSAPP_NUMBER = '12489998888'; // Replace with real WhatsApp number

const STANDARD_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

const PRODUCTS = [
  // ── DROP ONE ──────────────────────────────────────────────
  {
    id: 'blazer-dress',
    name: 'Blazer Dress',
    price: 170,
    category: 'apparel',
    drop: 'drop-one',
    label: 'Best Seller',
    desc: 'A structured blazer reimagined as a full dress. Tailored to perfection with bold African print accents on the lapels.',
    hasSizing: true,
    fabrics: ['Ankara Print', 'Solid Forest Green', 'Kente Trim', 'Mud Cloth'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6420Large.jpg?v=1717781176',
    ],
  },
  {
    id: 'nabintu-kimono',
    name: 'Nabintu Kimono',
    price: 185,
    category: 'outerwear',
    drop: 'drop-one',
    label: 'New Arrival',
    desc: 'Our signature kimono-style wrap coat in rich ankara print. Floor-length, dramatic, unforgettable.',
    hasSizing: true,
    fabrics: ['Ankara Print', 'Wax Print – Ochre', 'Wax Print – Terracotta'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
    ],
  },
  {
    id: 'tina-cloak',
    name: 'Tina Cloak',
    price: 200,
    category: 'outerwear',
    drop: 'drop-one',
    label: 'Limited',
    desc: 'A dramatic full-length cloak with intricate hand-stitched beading at the collar. Named for strength, worn for power.',
    hasSizing: true,
    fabrics: ['Mud Cloth – Natural', 'Solid Ivory', 'Kente Panel'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/DSC01399.jpg?v=1646326340',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
    ],
  },
  {
    id: 'bucket-hat',
    name: 'Ankara Bucket Hat',
    price: 60,
    category: 'accessories',
    drop: 'drop-one',
    label: 'In Stock',
    desc: 'A structured bucket hat in our signature ankara print. The perfect finishing touch to any look.',
    hasSizing: false,
    fabrics: ['Ankara Print – Classic', 'Ankara Print – Forest', 'Ankara Print – Amber'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6718Large.jpg?v=1713319036',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
    ],
  },
  {
    id: 'satin-bonnet',
    name: 'Satin-Lined Bonnet',
    price: 45,
    category: 'accessories',
    drop: 'drop-one',
    label: 'In Stock',
    desc: 'Ankara exterior with a luxurious satin lining. Protects your hair while making a style statement.',
    hasSizing: false,
    fabrics: ['Ankara + Black Satin', 'Ankara + Ivory Satin', 'Ankara + Champagne Satin'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6420Large.jpg?v=1717781176',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
    ],
  },
  {
    id: 'hd-shorts',
    name: 'HD Shorts',
    price: 85,
    category: 'apparel',
    drop: 'drop-one',
    label: 'Best Seller',
    desc: 'High-waisted ankara shorts with a wide waistband and concealed pocket. Pair with the matching top.',
    hasSizing: true,
    fabrics: ['Ankara Print', 'Wax Print – Indigo', 'Solid Forest'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6718Large.jpg?v=1713319036',
    ],
  },

  // ── DROP TWO ──────────────────────────────────────────────
  {
    id: 'wrap-skirt',
    name: 'Kaba Wrap Skirt',
    price: 115,
    category: 'apparel',
    drop: 'drop-two',
    label: 'New Arrival',
    desc: 'A flowing midi wrap skirt with a dramatic side slit and hand-sewn trim. Effortlessly elegant.',
    hasSizing: true,
    fabrics: ['Ankara Print', 'Kente Trim', 'Wax Print – Coral'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6420Large.jpg?v=1717781176',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
    ],
  },
  {
    id: 'puff-sleeve-top',
    name: 'Puff Sleeve Top',
    price: 95,
    category: 'apparel',
    drop: 'drop-two',
    label: 'New Arrival',
    desc: 'Dramatic puff sleeves meet a cropped silhouette in our most playful ankara print.',
    hasSizing: true,
    fabrics: ['Ankara Print – Bold', 'Wax Print – Sunset', 'Kente Check'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
    ],
  },
  {
    id: 'wide-leg-pants',
    name: 'Wide Leg Trousers',
    price: 130,
    category: 'apparel',
    drop: 'drop-two',
    label: 'Limited',
    desc: 'Floor-sweeping wide-leg trousers with a high rise and side pockets. Wearable art.',
    hasSizing: true,
    fabrics: ['Mud Cloth', 'Wax Print – Midnight', 'Solid Terracotta'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6420Large.jpg?v=1717781176',
    ],
  },
  {
    id: 'cord-set',
    name: 'Co-ord Set',
    price: 190,
    category: 'apparel',
    drop: 'drop-two',
    label: 'Best Seller',
    desc: 'Matching crop top and wide-leg pants in a bold wax print. The complete look, ready to wear.',
    hasSizing: true,
    fabrics: ['Ankara Print – Classic', 'Wax Print – Ember', 'Kente Panel'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6718Large.jpg?v=1713319036',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
    ],
  },
  {
    id: 'mini-dress',
    name: 'Kanga Mini Dress',
    price: 145,
    category: 'apparel',
    drop: 'drop-two',
    label: 'New Arrival',
    desc: 'A flirty mini dress with an off-shoulder neckline and ruffled hem in vibrant kanga print.',
    hasSizing: true,
    fabrics: ['Kanga Print', 'Wax Print – Mango', 'Ankara Print'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6718Large.jpg?v=1713319036',
    ],
  },
  {
    id: 'oversized-blazer',
    name: 'Oversized Blazer',
    price: 220,
    category: 'outerwear',
    drop: 'drop-two',
    label: 'Limited',
    desc: 'A boldly oversized blazer with raw-edge lapels and a single statement button. Power dressing, African-made.',
    hasSizing: true,
    fabrics: ['Mud Cloth – Earth', 'Wax Print – Ember', 'Kente Check'],
    images: [
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/DSC01399.jpg?v=1646326340',
      'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
    ],
  },
];

// ── ARM CANDY ─────────────────────────────────────────────────
const ARM_CANDY_IMAGES = [
  'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/IMG_7606.jpg?v=1666040300',
  'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/IMG_7613.jpg?v=1666040300',
  'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/IMG_7601.jpg?v=1666040300',
  'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6718Large.jpg?v=1713319036',
];

const ARM_CANDY_COLORS = [
  { name: 'Mango Sunrise',   hex: '#F4A535', desc: 'Warm amber yellow with gold bead accents' },
  { name: 'Forest Night',    hex: '#1A3A2F', desc: 'Deep forest green with ivory highlights' },
  { name: 'Terra Bloom',     hex: '#C45C32', desc: 'Rich terracotta with copper beads' },
  { name: 'Sage Dream',      hex: '#8DB570', desc: 'Soft sage green with natural shell beads' },
  { name: 'Midnight Plum',   hex: '#4A1A5A', desc: 'Deep purple with iridescent bead mix' },
];

// ── MEASURE GROUPS ─────────────────────────────────────────────
const MEASURE_GROUPS = [
  {
    group: 'Body Basics',
    fields: [
      { key: 'height',   label: 'Height',  ph: '65 in / 165 cm', req: false },
    ],
  },
  {
    group: 'Upper Body',
    fields: [
      { key: 'bust',          label: 'Bust / Chest',      ph: '38 in', req: true  },
      { key: 'under_bust',    label: 'Under Bust',        ph: '33 in', req: false },
      { key: 'shoulder_width',label: 'Shoulder Width',    ph: '16 in', req: false },
    ],
  },
  {
    group: 'Mid Section',
    fields: [
      { key: 'waist', label: 'Waist',     ph: '30 in', req: true  },
      { key: 'hips',  label: 'Hips/Seat', ph: '42 in', req: true  },
    ],
  },
  {
    group: 'Length & Arms',
    fields: [
      { key: 'sleeve_length',  label: 'Sleeve Length',   ph: '24 in', req: false },
      { key: 'desired_length', label: 'Garment Length',  ph: '42 in', req: false },
      { key: 'inseam',         label: 'Inseam',          ph: '30 in', req: false },
    ],
  },
];

// ── BLOG POSTS ─────────────────────────────────────────────────
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Behind the Stitch: A Day in Our Bukavu Workshop',
    date: 'November 14, 2024',
    image: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
    excerpt: 'Step inside our atelier in Bukavu, DRC, where skilled tailors breathe life into every Zapenda piece. From first cut to final hem.',
    body: `<p>Our workshop sits in the heart of Bukavu, a city on the shores of Lake Kivu in eastern Congo. Every morning, our tailors arrive before sunrise to press fabric, thread needles, and begin the slow, deliberate work of handcrafting each Zapenda garment.</p>
    <p>The hum of sewing machines is rhythmic, almost musical. The smell of fresh fabric fills the air. On the walls hang swatches of ankara, kente, and mud cloth — a colour palette drawn from the African continent itself.</p>
    <p>Every piece is cut by hand, sewn by hand, pressed by hand. Nothing is rushed. Nothing is mass-produced. When you wear Zapenda, you are wearing hours of focused, skilled artisanal work.</p>
    <p>We are proud of what our artisans create. We hope you are too.</p>`,
  },
  {
    id: 2,
    title: 'Drop Two is Here: What You Need to Know',
    date: 'October 28, 2024',
    image: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
    excerpt: 'Drop Two is our boldest collection yet — wider silhouettes, more vibrant prints, and new garment types. Here\'s the full breakdown.',
    body: `<p>Drop Two represents a creative evolution for Zapenda. Where Drop One established our signature aesthetic — structured, powerful, African-rooted — Drop Two expands it.</p>
    <p>New silhouettes include the Kaba Wrap Skirt, the Wide Leg Trousers, and our first-ever Co-ord Set. We've introduced new fabric options including a stunning kanga print and an earthy mud cloth that has been incredibly popular.</p>
    <p>All Drop Two pieces are made-to-order, just like everything we make. Standard sizes XS–3XL are available, and custom sizing is always an option.</p>
    <p>Shop the full Drop Two collection now — and remember, when it's gone, it's gone.</p>`,
  },
  {
    id: 3,
    title: 'How to Care for Your Ankara Garment',
    date: 'September 12, 2024',
    image: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6420Large.jpg?v=1717781176',
    excerpt: 'African wax print fabrics are durable and beautiful — but they do need specific care to maintain their vibrancy. Here\'s what we recommend.',
    body: `<p>Ankara fabric, also known as African wax print, is one of the most durable and beautiful textiles in the world. But like any quality garment, it rewards careful handling.</p>
    <p><strong>Washing:</strong> We recommend hand washing in cold water with a gentle detergent. If machine washing, use a cold, delicate cycle inside a laundry bag.</p>
    <p><strong>Drying:</strong> Air dry in shade. Direct sun can fade the vibrant colours over time.</p>
    <p><strong>Ironing:</strong> Iron inside out on medium heat. This protects the wax print finish and maintains the fabric's natural sheen.</p>
    <p><strong>Storage:</strong> Hang your Zapenda pieces when possible. Folding creates creases that are hard to remove from structured garments.</p>
    <p>With proper care, your Zapenda piece will last for years — and only get better with time.</p>`,
  },
  {
    id: 4,
    title: 'The Arm Candy Story: Why We Made a Bag',
    date: 'August 5, 2024',
    image: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/products/IMG_7606.jpg?v=1666040300',
    excerpt: 'Our beaded mini bags were never planned. They were born from a conversation with our artisans in Goma who had been making bags for their families for decades.',
    body: `<p>The Zapenda Arm Candy collection started with a conversation, not a business plan.</p>
    <p>During one of our visits to our workshop in Goma, DRC, we noticed the artisans were making small beaded bags during breaks — tiny masterpieces they were gifting to their daughters and nieces. The craftsmanship was extraordinary.</p>
    <p>We asked if they'd be willing to make them for us. The response was immediate and enthusiastic.</p>
    <p>The Arm Candy bags are now one of our most beloved products. Each one is hand-strung with hand-selected beads. Each one is unique. Each one carries the same artisan spirit that defines everything we make.</p>
    <p>Available in five signature colours. Made in small batches. Wear yours with everything.</p>`,
  },
];

// ── HERO SLIDES ────────────────────────────────────────────────
const heroSlides = [
  {
    bg: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6824Large.jpg?v=1717779538',
    subtitle: 'Drop Two — Available Now',
    title: 'Fashion as a\nForce for Change',
    desc: 'Every piece handcrafted by skilled artisans in Bukavu and Goma, Congo. Made-to-your-measurements.',
    cta: 'Shop Drop Two',
    href: 'shop.html?drop=drop-two',
  },
  {
    bg: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6171Large.jpg?v=1717783668',
    subtitle: 'Drop One — Classic Collection',
    title: 'Wear the Story\nof Congo',
    desc: 'Ankara prints, mud cloth, and kente — African textiles handcrafted into luxury garments just for you.',
    cta: 'Shop Drop One',
    href: 'shop.html?drop=drop-one',
  },
  {
    bg: 'https://cdn.shopify.com/s/files/1/0074/2060/8612/files/352A6697Large.jpg?v=1713703100',
    subtitle: 'Completely Bespoke',
    title: 'Your Vision.\nOur Artisans.',
    desc: 'Design something completely custom — from fabric to silhouette to measurement. Your dream piece, handcrafted.',
    cta: 'Start a Custom Order',
    href: 'custom-order.html',
  },
];
