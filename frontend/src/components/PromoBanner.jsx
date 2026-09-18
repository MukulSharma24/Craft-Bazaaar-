import React from 'react';
import './PromoBanner.css';

const items = [
  {
    emoji: '🛠',
    title: 'Repair & Revive',
    tagline: 'Give Your Craft a Second Life',
    desc: 'Repair, restore, or transform your favourite handmade pieces instead of replacing them.',
  },
  {
    emoji: '🎨',
    title: 'Custom Craft Request',
    tagline: "Imagine It. We'll Help Create It.",
    desc: 'Tell us what you want, set your budget, and connect with artisans who can bring it to life.',
  },
  {
    emoji: '♻️',
    title: 'Craft Upcycle',
    tagline: 'Turn Old Into Something Beautiful',
    desc: 'Give your unused fabrics, wood, and materials a new purpose through handmade craftsmanship.',
  },
];

const Item = ({ item }) => (
  <span className="promo-item">
    <span className="promo-emoji">{item.emoji}</span>
    <strong className="promo-title">{item.title}</strong>
    <span className="promo-tag">{item.tagline}</span>
    <span className="promo-desc">— {item.desc}</span>
    <span className="promo-sep">✦</span>
  </span>
);

const PromoBanner = () => {
  // render the list twice so the marquee loops seamlessly
  const loop = [...items, ...items];
  return (
    <div className="promo-banner" aria-label="Announcements">
      <div className="promo-track">
        {loop.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
