import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      background: 'var(--color-bg)',
      borderTop: '1px solid var(--color-border)',
      padding: 'var(--spacing-xxl) var(--spacing-lg)'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 'var(--spacing-lg)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', marginRight: 'var(--spacing-lg)', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--color-text-primary)'} onMouseOut={e => e.target.style.color = 'var(--color-text-secondary)'}>Privacy Policy</a>
          <a href="#" style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'var(--color-text-primary)'} onMouseOut={e => e.target.style.color = 'var(--color-text-secondary)'}>Terms & Conditions</a>
        </div>
        <p style={{ fontSize: 'var(--font-size-xs)', color: '#999' }}>
          &copy; 2024 PW Deals. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
