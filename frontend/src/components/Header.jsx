import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav style={{
        background: '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        padding: '16px 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#003d99',
            textDecoration: 'none'
          }}>
            PW Deals
          </Link>

          <div style={{ display: 'flex', gap: '40px' }}>
            <Link to="/" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Home</Link>
            <Link to="/offers" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>All Offers</Link>
            <a href="#community" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Community</a>
            <a href="#help" style={{ color: '#1a1a1a', textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>Help</a>
          </div>

          <Link to="/admin/login" style={{
            background: '#003d99',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600'
          }}>
            Sign In
          </Link>
        </div>
      </nav>

      <div style={{
        background: '#e3f2fd',
        padding: '12px 0',
        textAlign: 'center',
        fontSize: '14px',
        color: '#003d99',
        fontWeight: '500'
      }}>
        Daily Offers & Maximum Savings!
      </div>
    </>
  )
}

export default Header
