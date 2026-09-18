import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Offers.css';

const offers = [
  {
    id: 1,
    emoji: '☀️',
    title: 'Summer Sale',
    description: 'Up to 50% off on selected handmade pieces.',
    code: 'SUMMER50',
    cta: 'Shop Paintings',
    link: '/pages/Paintings',
    gradient: 'linear-gradient(135deg, #ffb347 0%, #ffcc80 100%)',
  },
  {
    id: 2,
    emoji: '🎁',
    title: 'Buy One Get One Free',
    description: 'On all keychains & accessories. Limited time only!',
    code: 'BOGO',
    cta: 'Shop Keychains',
    link: '/pages/Keychains',
    gradient: 'linear-gradient(135deg, #B692C2 0%, #694F8E 100%)',
  },
  {
    id: 3,
    emoji: '✨',
    title: 'Exclusive Deals',
    description: 'Sign up now to unlock members-only offers.',
    code: 'WELCOME10',
    cta: 'Create Account',
    link: '/Signup',
    gradient: 'linear-gradient(135deg, #f78ca0 0%, #f9748f 100%)',
  },
  {
    id: 4,
    emoji: '🚚',
    title: 'Free Shipping',
    description: 'Free delivery on all orders above ₹999.',
    code: 'FREESHIP',
    cta: 'Start Shopping',
    link: '/pages/portraits',
    gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
  },
];

const Offers = () => {
  const navigate = useNavigate();

  return (
    <div className="offers-page">
      <header className="offers-hero">
        <p className="offers-hero-eyebrow">Craft Bazaaar · Deals</p>
        <h1 className="offers-hero-title">Special Offers</h1>
        <p className="offers-hero-subtitle">
          Handpicked deals on our handcrafted collections — grab them before they're gone!
        </p>
      </header>

      <div className="offers-content">
        <div className="offers-grid">
          {offers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="offer-banner" style={{ backgroundImage: offer.gradient }}>
                <span className="offer-emoji">{offer.emoji}</span>
              </div>
              <div className="offer-body">
                <h2 className="offer-title">{offer.title}</h2>
                <p className="offer-description">{offer.description}</p>
                <div className="offer-code">
                  Code: <span>{offer.code}</span>
                </div>
                <button className="offer-link" onClick={() => navigate(offer.link)}>
                  {offer.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Offers;
