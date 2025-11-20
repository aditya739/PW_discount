import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--spacing-xxl) var(--spacing-lg)'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="footer-links" style={{ 
          marginBottom: 'var(--spacing-lg)', 
          fontSize: 'var(--font-size-sm)', 
          color: 'var(--color-text-secondary)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--spacing-lg)',
          flexWrap: 'wrap'
        }}>
          <a 
            href="#" 
            style={{ 
              color: 'var(--color-text-secondary)', 
              textDecoration: 'none', 
              transition: 'color 0.2s',
              padding: 'var(--spacing-sm)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center'
            }} 
            onMouseOver={e => e.target.style.color = 'var(--color-text-primary)'} 
            onMouseOut={e => e.target.style.color = 'var(--color-text-secondary)'}
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            style={{ 
              color: 'var(--color-text-secondary)', 
              textDecoration: 'none', 
              transition: 'color 0.2s',
              padding: 'var(--spacing-sm)',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center'
            }} 
            onMouseOver={e => e.target.style.color = 'var(--color-text-primary)'} 
            onMouseOut={e => e.target.style.color = 'var(--color-text-secondary)'}
          >
            Terms & Conditions
          </a>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: '#999', margin: 0 }}>
          &copy; 2024 PW Deals. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer

