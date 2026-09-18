import React from 'react'
import heroFeatures from '../photo/hero-features.png'
import './Hero.css'

function Hero() {
  return (
    <div>
      <div className="hero-container">
        <img src={heroFeatures} alt="Repair & Revive, Custom Craft, Upcycle, Biodegradable, Women-Powered" />
      </div>
    </div>
  )
}

export default Hero
