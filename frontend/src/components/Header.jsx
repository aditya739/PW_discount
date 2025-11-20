import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <nav style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        padding: 'var(--spacing-md) 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none'
          }}>
            <img 
              src="/logo.png" 
              alt="PW Vouchers" 
              style={{ 
                height: '40px', 
                objectFit: 'contain' 
              }} 
            />
          </Link>

          <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
            <Link to="/" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Home</Link>
            <Link to="/offers" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>All Offers</Link>
            <a href="#community" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Community</a>
            <a href="#help" style={{ color: 'var(--color-text-primary)', textDecoration: 'none', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' }}>Help</a>
          </div>

          <Link to="/admin/login" className="btn btn-primary" style={{
            padding: '8px 20px',
            fontSize: 'var(--font-size-sm)'
          }}>
            Sign In
          </Link>
        </div>
      </nav>

      <div style={{
        background: 'var(--color-bg-secondary)',
        padding: 'var(--spacing-sm) 0',
        textAlign: 'center',
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-accent)',
        fontWeight: 'var(--font-weight-medium)',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        Daily Offers & Maximum Savings!
      </div>
    </>
  )
}

export default Header
