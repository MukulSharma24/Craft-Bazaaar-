// // components/Cart.js
// import React, { useContext } from 'react';
// import CartContext from '../Context/CartContext';

// const Cart = () => {
//   const { cart, removeFromCart } = useContext(CartContext);

//   return (
//     <div>
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         cart.map(item => (
//           <div key={item._id}>
//             <h3>{item.productId.name}</h3>
//             <p>Quantity: {item.quantity}</p>
//             <button onClick={() => removeFromCart(item._id)}>Remove</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Cart;

// src/components/Cart.js

// Cart.js
import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import { fetchCartItems } from '../utils/cartApi';

const Cart = ({ userId }) => {
  const { cart, setCart, addToCart, removeFromCart, updateCartItem } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await fetchCartItems(userId);
        setCart(items);
      } catch (error) {
        console.error('Error loading cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, [userId, setCart]);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  };

  if (loading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id}>
                <td>{item.productId.name}</td>
                <td>{item.quantity}</td>
                <td>${item.productId.price.toFixed(2)}</td>
                <td>${(item.productId.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => updateCartItem(item._id, item.quantity + 1)}>+</button>
                  <button onClick={() => updateCartItem(item._id, item.quantity - 1)}>-</button>
                  <button onClick={() => removeFromCart(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h3>Total: ${calculateTotal().toFixed(2)}</h3>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
