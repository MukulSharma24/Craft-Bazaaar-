import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaShoppingBag, FaCheck } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3389/product/${id}`);
        setProduct(response.data);
        setError('');
      } catch (err) {
        setError('Unable to load this product.');
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  if (error) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-message">{error}</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-message">Loading product…</div>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">
        <div className="product-detail-media">
          <img
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/500?text=Dream+Shaper';
            }}
          />
        </div>

        <div className="product-detail-info">
          <p className="product-detail-eyebrow">{product.category}</p>
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">₹{product.price}</p>

          <ul className="product-detail-meta">
            <li><span>Vendor</span> {product.vendor}</li>
            <li><span>Delivery</span> {product.delivery}</li>
          </ul>

          <p className="product-detail-desc">
            A handcrafted Craft Bazaaar original, made to order with care.
            Each piece is unique — small variations are part of its charm.
          </p>

          <div className="product-detail-actions">
            <button
              className={`pd-add-cart ${added ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {added ? (<><FaCheck /> Added to Cart</>) : (<><FaShoppingBag /> Add to Cart</>)}
            </button>
            <button
              className="pd-buy-now"
              onClick={() => navigate(`/placing-order/${id}`)}
            >
              Buy Now
            </button>
          </div>

          <button className="pd-back" onClick={() => navigate(-1)}>
            ← Back to collection
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
