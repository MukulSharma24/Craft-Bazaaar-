import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../components/photo/craft-bazaar-logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProfileSection from './ProfileSection';
import Sidebar from './Sidebar';
import Productbar from './Productbar';
import { useCart } from '../CartContext';
import { useWishlist } from '../WishlistContext';

// searchable pages
const PAGES = [
  { name: 'Home', path: '/' },
  { name: 'Portraits', path: '/pages/portraits' },
  { name: 'Polaroids', path: '/pages/polaroids' },
  { name: 'Resin Art', path: '/pages/ResinArt' },
  { name: 'Bookmarks', path: '/pages/Bookmark' },
  { name: 'Keychains', path: '/pages/Keychains' },
  { name: 'Lippan Art', path: '/pages/LippanArt' },
  { name: 'Fridge Magnets', path: '/pages/FridgeMagnet' },
  { name: 'Paintings', path: '/pages/Paintings' },
  { name: 'Purse', path: '/pages/Purse' },
  { name: 'Wall Hangings', path: '/pages/WallHanging' },
  { name: 'Offers', path: '/Offers' },
  { name: 'Notifications', path: '/notification' },
  { name: 'Wishlist', path: '/wishlist' },
  { name: 'Cart', path: '/cart' },
  { name: 'About Us', path: '/about' },
];

const Navbar = () => {
  const [sidebarActive, setSidebarActive] = useState(false);
  const [profileActive, setProfileActive] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // fetch the product catalogue once (used for search)
  useEffect(() => {
    axios
      .get('http://localhost:3389/products')
      .then((res) => setAllProducts(res.data))
      .catch(() => setAllProducts([]));
  }, []);

  const toggleSidebar = () => setSidebarActive(!sidebarActive);
  const toggleProfile = () => setProfileActive(!profileActive);
  const toggleSearch = () => setSearchVisible((v) => !v);

  const term = searchTerm.trim().toLowerCase();
  const productMatches = term
    ? allProducts.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 6)
    : [];
  const pageMatches = term
    ? PAGES.filter((p) => p.name.toLowerCase().includes(term)).slice(0, 4)
    : [];
  const hasResults = productMatches.length > 0 || pageMatches.length > 0;

  const go = (path) => {
    setSearchTerm('');
    setSearchVisible(false);
    navigate(path);
  };

  return (
    <nav className='navbar'>
      <div className="nav-inner">
      {isMobile && <i className="fa-solid fa-bars" onClick={toggleSidebar}></i>}

      <Link to="/" className="nav-logo">
        <img src={logo} alt="Craft Bazaaar" />
      </Link>

      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/productlist">Shop</Link></li>
        <li><Link to="/Offers">Offers</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/help">Help</Link></li>
      </ul>

      <div className="nav-login-cart">
        <div className="icons">
          <div className="nav-search-container">
            <button id="search-icon" onClick={toggleSearch}>
              <i className="fa-solid fa-search"></i>
            </button>
            <input
              type="text"
              id="search-bar"
              className={searchVisible ? 'active' : ''}
              placeholder="Search products or pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setSearchVisible(true)}
              onBlur={() => setTimeout(() => setSearchVisible(false), 150)}
            />

            {searchVisible && term && (
              <div className="search-results">
                {!hasResults && <div className="search-empty">No matches found</div>}

                {pageMatches.length > 0 && (
                  <>
                    <div className="search-group-label">Pages</div>
                    {pageMatches.map((p) => (
                      <button
                        key={p.path}
                        className="search-result page"
                        onMouseDown={() => go(p.path)}
                      >
                        <i className="fa-regular fa-file-lines"></i> {p.name}
                      </button>
                    ))}
                  </>
                )}

                {productMatches.length > 0 && (
                  <>
                    <div className="search-group-label">Products</div>
                    {productMatches.map((p) => (
                      <button
                        key={p._id}
                        className="search-result"
                        onMouseDown={() => go(`/product/${p._id}`)}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          onError={(e) => {
                            if (!e.currentTarget.dataset.fb) {
                              e.currentTarget.dataset.fb = '1';
                              e.currentTarget.src = `https://picsum.photos/seed/${p._id}/80/80`;
                            }
                          }}
                        />
                        <span className="search-result-name">{p.name}</span>
                        <span className="search-result-price">₹{p.price}</span>
                      </button>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <div
            className="profile-icon"
            onMouseEnter={toggleProfile}
            onMouseLeave={toggleProfile}
          >
            <i className="fa-regular fa-user"></i>
            {profileActive && <ProfileSection isActive={profileActive} onClose={toggleProfile} />}
          </div>

          <Link to='/wishlist' className="wishlist">
            <i className="fa-regular fa-heart"></i>
            {wishlistCount > 0 && <span className="nav-badge">{wishlistCount}</span>}
          </Link>

          <Link to='/cart' className="cart">
            <i className="fa-solid fa-bag-shopping"></i>
            {cartCount > 0 && <span className="nav-badge cart-badge">{cartCount}</span>}
          </Link>

          {isMobile && (
            <Sidebar isActive={sidebarActive} toggleSidebar={toggleSidebar}>
              <Productbar />
            </Sidebar>
          )}
        </div>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
