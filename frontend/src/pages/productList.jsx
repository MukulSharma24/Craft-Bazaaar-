import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaRegHeart, FaShoppingBag, FaCheck } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import '../components/CategoryPage.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState(null);

  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    let active = true;
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3389/products');
        if (active) {
          setProducts(res.data);
          setError('');
        }
      } catch (err) {
        if (active) setError('We could not load the products right now. Please try again later.');
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      active = false;
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId((cur) => (cur === product._id ? null : cur)), 1500);
  };

  return (
    <div className="category-page">
      <header className="category-hero">
        <p className="category-hero-eyebrow">Craft Bazaaar · Shop</p>
        <h1 className="category-hero-title">All Products</h1>
        <p className="category-hero-subtitle">
          Explore our full collection of handcrafted, made-to-order pieces.
        </p>
      </header>

      <main className="category-content">
        {loading && (
          <div className="category-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div className="ds-card is-skeleton" key={i}>
                <div className="ds-card-media skeleton-box" />
                <div className="ds-card-body">
                  <div className="skeleton-line" />
                  <div className="skeleton-line short" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="category-message category-error">{error}</div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="category-message">No products available yet.</div>
        )}

        {!loading && !error && products.length > 0 && (
          <div className="category-grid">
            {products.map((product) => (
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
                    className={`wishlist-btn ${isWishlisted(product._id) ? 'active' : ''}`}
                    aria-label="Add to wishlist"
                    onClick={() => toggleWishlist(product)}
                  >
                    {isWishlisted(product._id) ? <FaHeart /> : <FaRegHeart />}
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

export default ProductList;
