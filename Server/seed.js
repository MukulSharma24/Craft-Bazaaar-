// Seed script — populates the products collection for every category.
// Every product gets a DISTINCT image. Real handmade photos in Server/images/<folder>
// are used first; remaining slots are filled by DOWNLOADING a unique, category-relevant
// image once (into Server/images/_stock) so at runtime everything is served locally = fast.
// Run with:  node seed.js
require('./config/dbconn');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Product = require('./config/products');

const IMAGE_EXT = /\.(png|jpe?g|webp|gif)$/i;
const TARGET = 12; // products per category (≈ 3-4 rows)
const STOCK_DIR = path.join(__dirname, 'images', '_stock');

const CATEGORIES = [
  { category: 'portraits',    folder: 'Portrait',      label: 'Portrait',      base: 1499, keyword: 'portrait' },
  { category: 'Paintings',    folder: 'Portrait',      label: 'Painting',      base: 1999, keyword: 'painting', filter: (f) => /painting/i.test(f) },
  { category: 'ResinArt',     folder: 'Resin Pendant', label: 'Resin Pendant', base: 799,  keyword: 'jewelry' },
  { category: 'Bookmark',     folder: 'Bookmarks',     label: 'Bookmark',      base: 199,  keyword: 'bookmark' },
  { category: 'Keychains',    folder: 'Keychains',     label: 'Keychain',      base: 149,  keyword: 'keychain' },
  { category: 'polaroids',    folder: 'Polaroid',      label: 'Polaroid',      base: 299,  keyword: 'polaroid' },
  { category: 'LippanArt',    folder: 'Lippan decor',  label: 'Lippan Art',    base: 1299, keyword: 'mandala', filter: (f) => !/nameplate/i.test(f) },
  { category: 'WallHanging',  folder: 'Lippan decor',  label: 'Wall Hanging',  base: 1599, keyword: 'wallart', filter: (f) => /nameplate/i.test(f) },
  { category: 'FridgeMagnet', folder: 'Fridge Magnet', label: 'Fridge Magnet', base: 249,  keyword: 'magnet' },
  { category: 'Purse',        folder: 'Purse',         label: 'Purse',         base: 599,  keyword: 'handbag' },
];

const VENDOR = 'Craft Bazaaar Studio';

function deliveryFor(base) {
  if (base >= 1500) return '10-12 days';
  if (base >= 700) return '7-10 days';
  return '5-7 days';
}

// Download a URL to destPath. Returns true on success.
async function download(url, destPath) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const res = await fetch(url, { signal: controller.signal, redirect: 'follow' });
    if (!res.ok) return false;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 2000) return false; // guard against tiny error pages
    fs.writeFileSync(destPath, buf);
    return true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchStockImage(cfg, i) {
  const fname = `${cfg.category}_${i}.jpg`;
  const dest = path.join(STOCK_DIR, fname);
  const webPath = `/images/_stock/${fname}`;

  // already downloaded on a previous run? reuse it.
  if (fs.existsSync(dest)) return webPath;

  const lock = 2000 + i * 7 + cfg.category.length;
  // 1) category-relevant image
  let ok = await download(`https://loremflickr.com/600/600/${cfg.keyword}?lock=${lock}`, dest);
  // 2) reliable distinct fallback
  if (!ok) ok = await download(`https://picsum.photos/seed/${cfg.category}-${i}/600/600`, dest);
  return ok ? webPath : null;
}

async function seed() {
  if (!fs.existsSync(STOCK_DIR)) fs.mkdirSync(STOCK_DIR, { recursive: true });

  let total = 0;
  for (const cfg of CATEGORIES) {
    const dir = path.join(__dirname, 'images', cfg.folder);
    let files = [];
    try {
      files = fs.readdirSync(dir).filter((f) => IMAGE_EXT.test(f));
    } catch {
      files = [];
    }
    if (cfg.filter) files = files.filter(cfg.filter);
    files.sort();

    const docs = [];
    for (let i = 0; i < TARGET; i++) {
      let image;
      if (i < files.length) {
        image = `/images/${cfg.folder}/${files[i]}`; // authentic photo
      } else {
        image = await fetchStockImage(cfg, i); // distinct downloaded image
        if (!image) {
          // last resort: reuse a real image so the card is never blank
          image = files.length ? `/images/${cfg.folder}/${files[i % files.length]}` : '';
        }
      }
      docs.push({
        name: `${cfg.label} ${i + 1}`,
        price: cfg.base + i * 100,
        image,
        vendor: VENDOR,
        delivery: deliveryFor(cfg.base),
        category: cfg.category,
      });
    }

    await Product.deleteMany({ category: cfg.category });
    await Product.insertMany(docs);
    total += docs.length;
    const downloaded = Math.max(0, TARGET - files.length);
    console.log(`  ${cfg.category.padEnd(13)} ${docs.length} products (${files.length} real + ${downloaded} downloaded)`);
  }
  console.log(`\nSeeded ${total} products total. All images are now served locally.`);
}

mongoose.connection.once('open', async () => {
  console.log('Seeding database (downloading distinct images, please wait)...');
  try {
    await seed();
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
});
