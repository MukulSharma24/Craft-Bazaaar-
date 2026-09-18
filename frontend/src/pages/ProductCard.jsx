import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ product, addToCart, addToWishlist }) => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div>
        <h5 className="card-title">{product.name}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">Price: ${product.price}</p>
        <p className="card-text">Vendor: {product.vendor}</p>
        <p className="card-text">Delivery: {product.delivery}</p>
        <div className="product-actions">
          <button onClick={handleBuyNow} className="btn btn-primary">Buy Now</button>
          <button onClick={() => addToCart(product)} className="btn btn-secondary">Add to Cart</button>
          <button onClick={() => addToWishlist(product)} className="btn btn-outline-danger">Add to Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;