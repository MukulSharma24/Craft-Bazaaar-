// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String,
//   vendor: String,
//   delivery: String,
//   category: String
// });

// const Product = mongoose.model('products', productSchema);  // Ensure the name matches 'products'

// module.exports = Product;
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // This will store the path to the uploaded image
    required: true
  },
  vendor: {
    type: String,
    required: true
  },
  delivery: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
