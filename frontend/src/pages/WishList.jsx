import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaShoppingBag, FaCheck } from 'react-icons/fa';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import '../components/CategoryPage.css';

export default function WishList() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [addedId, setAddedId] = useState(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId((cur) => (cur === product._id ? null : cur)), 1500);
  };

  return (
    <div className="category-page">
      <header className="category-hero">
        <p className="category-hero-eyebrow">Craft Bazaaar · Saved For You</p>
        <h1 className="category-hero-title">My Wishlist</h1>
        <p className="category-hero-subtitle">
          All the handcrafted pieces you love, saved in one place.
        </p>
      </header>

      <main className="category-content">
        {wishlist.length === 0 ? (
          <div className="category-message">
            Your wishlist is empty. Tap the ♡ on any product to save it here.
          </div>
        ) : (
          <div className="category-grid">
            {wishlist.map((product) => (
              <article className="ds-card" key={product._id}>
                <div className="ds-card-media">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1';
                        e.currentTarget.src = `https://picsum.photos/seed/${product._id}/600/600`;
                      }
                    }}
                  />
                  <button
                    type="button"
                    className="wishlist-btn active"
                    aria-label="Remove from wishlist"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    <FaHeart />
                  </button>
                </div>

                <div className="ds-card-body">
                  <h3 className="ds-card-title">{product.name}</h3>
                  <p className="ds-card-price">₹{product.price}</p>
                  <div className="ds-card-meta">
                    <span>By {product.vendor}</span>
                    <span>Delivery: {product.delivery}</span>
                  </div>

                  <div className="ds-card-actions">
                    <button
                      type="button"
                      className={`btn-add-cart ${addedId === product._id ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedId === product._id ? (
                        <><FaCheck /> Added</>
                      ) : (
                        <><FaShoppingBag /> Add to Cart</>
                      )}
                    </button>
                    <button
                      type="button"
                      className="btn-view"
                      onClick={() => navigate(`/product/${product._id}`)}
                    >
                      View
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
