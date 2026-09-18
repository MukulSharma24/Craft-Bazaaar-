import React from 'react'
import Productbar from '../Context/Navbar/Productbar';
import Hero from '../components/Hero/Hero';
import Newsletter from '../components/Newsletter'
import Qualities from '../components/Hero/Qualities';
import Categories from '../components/Hero/Categories';
import Reviews from '../pages/Reviews';
import Fest from '../components/Hero/Fest';
import Reel from '../components/Hero/Reel';
import './Home.css'

const Home = () => {
  return(
    <div>
      <Productbar/>
      <Hero />
      <Qualities/>
      <Fest/>
      <Categories/>
      <Reel/>
      <Reviews/>
      <div className="whatsapp-float">
        <a href="https://wa.me/918800854220" target='_blank' rel="noopener noreferrer">
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </div>
      <Newsletter />
    </div>
  )
}

export default Home;