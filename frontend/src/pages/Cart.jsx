import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../Context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <header className="cart-hero">
        <h1 className="cart-hero-title">Your Cart</h1>
      </header>

      <div className="cart-content">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>Your cart is empty — let's find something beautiful.</p>
            <button className="cart-shop-btn" onClick={() => navigate('/')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div className="cart-item" key={item._id}>
                  <img
                    className="cart-item-img"
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/120?text=DS';
                    }}
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-vendor">By {item.vendor}</p>
                  </div>

                  <div className="qty-stepper">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>

                  <div className="cart-item-price">₹{item.price * item.quantity}</div>

                  <button
                    className="cart-item-remove"
                    aria-label="Remove item"
                    onClick={() => removeFromCart(item._id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="cart-summary-total">
                Total: <strong>₹{cartTotal}</strong>
              </div>
              <div className="cart-summary-actions">
                <button className="cart-clear-btn" onClick={clearCart}>
                  Clear Cart
                </button>
                <button
                  className="cart-checkout-btn"
                  onClick={() => navigate(`/placing-order/${cart[0]._id}`)}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
