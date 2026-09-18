import './App.css';
import Navbar from './Context/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Home from './pages/Home';
import WishList from './pages/WishList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Footer from './Context/Footer/Footer';
import Polaroids from './pages/Polaroids';
import Portraits from './pages/Portraits';
import ResinArt from './pages/ResinArt';
import Bookmark from './pages/Bookmark';
import Keychains from './pages/Keychains';
import LippanArt from './pages/LippanArt';
import FridgeMagnet from './pages/FridgeMagnet';
import Paintings from './pages/Paintings';
import Purse from './pages/Purse';
import WallHanging from './pages/WallHanging';
import ProductDetail from './pages/ProductDetail';
import PlacingOrder from './pages/PlacingOrder'; 
import ProductSummary from './pages/ProductSummary'; 
import Reviews from './pages/Reviews';
import './index.css';
import Help from './pages/Help'
import CartContext, { CartProvider } from './Context/CartContext';
import { WishlistProvider } from './Context/WishlistContext';
import { AuthProvider } from './Context/AuthContext';
import Offers from './pages/Offers';
import ProductList from './pages/productList';
import Cart from './pages/Cart';
import Notification from './pages/Notification';
import PromoBanner from './components/PromoBanner';
function App() {
  const userId = "12345";

  return (
    <div>
      <AuthProvider>
      <CartProvider>
      <WishlistProvider>
      <BrowserRouter>
        <Navbar />
        <PromoBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/Offers" element={<Offers />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/item" element={<ShopCategory category="Item" />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/productlist" element ={<ProductList/>}/>
          {/* <Route path="/cart" element={<Cart userId={userId} />} /> */}
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/pages/polaroids" element={<Polaroids />} />
          <Route path="/pages/portraits" element={<Portraits />} />
          <Route path="/pages/ResinArt" element={<ResinArt />} />
          <Route path="/pages/Bookmark" element={<Bookmark />} />
          <Route path="/pages/Keychains" element={<Keychains />} />
          <Route path="/pages/LippanArt" element={<LippanArt />} />
          <Route path="/pages/FridgeMagnet" element={<FridgeMagnet />} />
          <Route path="/pages/Paintings" element={<Paintings />} />
          <Route path="/pages/Purse" element={<Purse />} />
          <Route path="/pages/WallHanging" element={<WallHanging />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/placing-order/:id" element={<PlacingOrder />} /> 
          <Route path="/product-summary/:id" element={<ProductSummary />} />
          <Route path="/help" element={<Help />} />
          <Route path="/cart" element={<Cart />} />
          </Routes>
        <Footer />
      </BrowserRouter>
      </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
