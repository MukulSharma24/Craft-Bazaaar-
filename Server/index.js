const express = require('express');
require('./config/dbconn');
const User = require('./config/User');
const Product = require('./config/products');
const port = 3389;
const app = express();
const cors = require('cors');
const CartItem = require('./config/CartItem')
const Order = require('./config/Order');
const multer = require('./config/multer');
const path = require('path');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// // Serve static files from the React app
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client/build/index.html'));
// });
app.use(cors({
  origin: [
    "https://craft-bazaaar.vercel.app",
    "http://localhost:3000"
  ]
}));



// Place an order
app.post('/order', async (req, res) => {
  const { productId, phone, email, address } = req.body;

  try {
    console.log('Received productId:', productId);
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const order = new Order({
      product: productId,
      phone,
      email,
      address,
      price: product.price,
      name: product.name
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: err.message });
  }
});
// Fetch order summary by ID
// app.get('/order/:id', async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id).populate('product');
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }
//     res.json(order);
//   } catch (err) {
//     console.error('Error fetching order summary:', err);
//     res.status(500).json({ message: err.message });
//   }
// });

app.get('/order/:id', async (req, res) => {
  console.log('Received request for order ID:', req.params.id);
  try {
    const order = await Order.findById(req.params.id).populate('Product');
    if (!order) {
      console.log('Order not found');
      return res.status(404).json({ message: 'Order not found' });
    }
    console.log('Order found:', order);
    res.json(order);
  } catch (err) {
    console.error('Error fetching order summary:', err);
    res.status(500).json({ message: err.message });
  }
});


// Signup API
app.post('/signup', async (req, res) => {
    try {
      const user = new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      res.send(result);
    } catch (err) {
      res.status(400).send('Error creating user: ' + err.message);
    }
  });
  
  // Login API
  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password', success: false });
      }
      let result = user.toObject();
      delete result.password;
      res.status(200).json({ message: 'Logged in successfully', success: true, user: result });
    } catch (err) {
      res.status(500).json({ message: 'Server error: ' + err.message, success: false });
    }
  });
  
  // Get all products
  app.get('/products', async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });
  //polaroids
  app.get('/products/polaroids', async (req, res) => {
    try {
      const products = await Product.find({ category: 'polaroids' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });
  
  //portraits
  app.get('/products/portraits', async (req, res) => {
    try {
      const products = await Product.find({ category: 'portraits' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

    //ResinArt
    app.get('/products/ResinArt', async (req, res) => {
      try {
        const products = await Product.find({ category: 'ResinArt' });
        res.json(products);
      } catch (err) {
        res.status(500).send('Server error: ' + err.message);
      }
    });

      //Bookmark
  app.get('/products/Bookmark', async (req, res) => {
    try {
      const products = await Product.find({ category: 'Bookmark' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

   //Keychains
   app.get('/products/Keychains', async (req, res) => {
    try {
      const products = await Product.find({ category: 'Keychains' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

   //LippanArt
   app.get('/products/LippanArt', async (req, res) => {
    try {
      const products = await Product.find({ category: 'LippanArt' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

  //Necklace
  app.get('/products/Necklace', async (req, res) => {
    try {
      const products = await Product.find({ category: 'Necklace' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

//Paintings
app.get('/products/Paintings', async (req, res) => {
  try {
    const products = await Product.find({ category: 'Paintings' });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server error: ' + err.message);
  }
});

// Purse
  app.get('/products/Purse', async (req, res) => {
    try {
      const products = await Product.find({ category: 'Purse' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

  //WallHanging
  app.get('/products/WallHanging', async (req, res) => {
    try {
      const products = await Product.find({ category: 'WallHanging' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });

  app.get('/products/FridgeMagnet', async (req, res) => {
    try {
      const products = await Product.find({ category: 'FridgeMagnet' });
      res.json(products);
    } catch (err) {
      res.status(500).send('Server error: ' + err.message);
    }
  });


  // Fetch a single product by ID
  app.get('/product/:id', async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (err) {
      console.error('Error fetching product by ID:', err); // Log the error on the server-side
      res.status(500).json({ message: err.message });
    }
  });

  
//api for email address

const Subscriber = require('./config/Subscriber');

// Endpoint to add a new subscriber
app.post('/subscribe', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const newSubscriber = new Subscriber({ email });
        await newSubscriber.save();
        res.status(201).json({ message: 'Successfully subscribed' });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ error: 'Email already subscribed' });
        } else {
            res.status(500).json({ error: 'Server error' });
        }
    }
});

// Add product API
app.post('/productsadd', (req, res) => {
  multer(req, res, async (err) => {
    if (err) {
      return res.status(400).send('Error uploading file: ' + err.message);
    }

    if (!req.file) {
      return res.status(400).send('Error: Image file is required.');
    }

    try {
      // Create a new product with the image path
      const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: `/uploads/${req.file.filename}`, // Save the image path in the database
        vendor: req.body.vendor,
        delivery: req.body.delivery,
        category: req.body.category
      });

      const result = await product.save();
      res.send(result);
    } catch (err) {
      res.status(400).send('Error adding product: ' + err.message);
    }
  });
});


// Make the server listen to the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


//cart

// Add item to cart
app.post('/cart', async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ userId, productId });
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = new CartItem({ userId, productId, quantity });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get cart items for a user
app.get('/cart/:userId', async (req, res) => {
  try {
    const cartItems = await CartItem.find({ userId: req.params.userId })
      .populate('productId')  // Populate using the correct field name
      .exec();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove item from cart
app.delete('/cart/:id', async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
