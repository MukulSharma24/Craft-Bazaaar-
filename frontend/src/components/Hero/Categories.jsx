import React from 'react';
import { Link } from 'react-router-dom';
import photo2 from '../photo/photo2.jpg';
import photo3 from '../photo/photo3.jpg';
import photo7 from '../photo/photo7.jpg';
import photo8 from '../photo/photo8.jpg';
import photo9 from '../photo/photo9.jpg';
import photo10 from '../photo/photo10.jpg';
import './Categories.css';

function Categories() {
  const categories = [
    {
      title: "Wall Hangings",
      image: photo7,
      subcategories: ["Hand-painted décor", "Shop Now →"],
      link: "/pages/WallHanging"
    },
    {
      title: "Bookmarks",
      image: photo2,
      subcategories: ["Handcrafted bookmarks", "Shop Now →"],
      link: "/pages/Bookmark"
    },
    {
      title: "Lippan Art",
      image: photo8,
      subcategories: ["Mandala & mirror art", "Shop Now →"],
      link: "/pages/LippanArt"
    },
    {
      title: "Keychains",
      image: photo3,
      subcategories: ["Personalised keychains", "Shop Now →"],
      link: "/pages/Keychains"
    },
    {
      title: "Paintings",
      image: photo9,
      subcategories: ["Custom hand paintings", "Shop Now →"],
      link: "/pages/Paintings"
    },
    {
      title: "Resin Art",
      image: photo10,
      subcategories: ["Glossy resin creations", "Shop Now →"],
      link: "/pages/ResinArt"
    }
  ];

  return (
    <div className="categories-container">
      <h1>Shop by Categories</h1>
      <div className="category-grid">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-item">
            <img src={category.image} alt={category.title} />
            <div className="category-overlay">
              <h2 className="category-title">{category.title}</h2>
              <ul className="subcategory-list">
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className="subcategory-item">{subcategory}</li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;