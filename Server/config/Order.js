const mongoose = require('mongoose');
mongoose.set('strictPopulate', false);
const orderSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('orders', orderSchema);

module.exports = Order;