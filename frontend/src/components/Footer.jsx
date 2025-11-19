import React from 'react'

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e5e5e5',
      padding: '40px 20px'
    }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
          <a href="#" style={{ color: '#666', textDecoration: 'none', marginRight: '20px' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Terms & Conditions</a>
        </div>
        <p style={{ fontSize: '13px', color: '#999' }}>
          &copy; 2024 PW Deals. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
