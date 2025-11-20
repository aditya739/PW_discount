import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      <nav className="navbar">
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img 
              src="/logo.png" 
              alt="PW Vouchers" 
              className="navbar-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/offers" className="navbar-link">All Offers</Link>
            <a href="#community" className="navbar-link">Community</a>
            <a href="#help" className="navbar-link">Help</a>
          </div>

          {/* Desktop Sign In Button */}
          <Link to="/admin/login" className="btn btn-primary navbar-signin">
            Sign In
          </Link>

          {/* Mobile Hamburger Menu */}
          <button 
            className="navbar-hamburger" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`navbar-mobile-menu ${isMenuOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-mobile-link" onClick={toggleMenu}>Home</Link>
          <Link to="/offers" className="navbar-mobile-link" onClick={toggleMenu}>All Offers</Link>
          <a href="#community" className="navbar-mobile-link" onClick={toggleMenu}>Community</a>
          <a href="#help" className="navbar-mobile-link" onClick={toggleMenu}>Help</a>
          <Link to="/admin/login" className="btn btn-primary navbar-mobile-signin" onClick={toggleMenu}>
            Sign In
          </Link>
        </div>
      </nav>

      <div className="navbar-banner">
        Daily Offers & Maximum Savings!
      </div>
    </>
  )
}

export default Header
