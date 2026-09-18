// // ProductSummary.jsx
// import React from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { useState, useEffect, useParams } from 'react';

// const ProductSummary = () => {
//   const location = useLocation();
//   const { state: { formData } } = location;
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3389/product/${id}`);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching the product:', error);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   if (!product) {
//     return <div>Unable to load product</div>;
//   }

//   return (
//     <div className="product-summary">
//       <h1>Product Summary</h1>
//       <p>Name: {product.name}</p>
//       <p>Price: ${product.price}</p>
//       <h2>Customer Details</h2>
//       <p>Phone: {formData.phone}</p>
//       <p>Email: {formData.email}</p>
//       <p>Address: {formData.address}</p>
//     </div>
//   );
// };

// export default ProductSummary;
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductSummary = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:3389/order/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order summary', error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order Summary</h1>
      <p>Product: {order.name}</p>
      <p>Price: {order.price}</p>
      <p>Phone: {order.phone}</p>
      <p>Email: {order.email}</p>
      <p>Address: {order.address}</p>
    </div>
  );
};

export default ProductSummary;

