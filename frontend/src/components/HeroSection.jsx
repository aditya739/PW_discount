import React, { useState } from 'react'

const HeroSection = () => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('CPCA0300')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ padding: '60px 20px', background: '#ffffff' }}>
      <div className="container">
        <div style={{
          background: '#f9f9f9',
          padding: '60px 20px',
          borderRadius: '12px',
          textAlign: 'center',
          border: '2px solid #e5e5e5'
        }}>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', fontWeight: '500' }}>
            LIMITED TIME OFFER
          </p>

          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: '#1a1a1a',
            marginBottom: '40px'
          }}>
            UNLOCK YOUR EXAM BOOST
          </h1>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              border: '3px solid #003d99',
              borderRadius: '12px',
              padding: '40px 60px',
              background: '#ffffff'
            }}>
              <div style={{
                fontSize: '56px',
                fontWeight: '700',
                color: '#003d99',
                fontFamily: 'Courier New, monospace',
                letterSpacing: '3px'
              }}>
                CPCA0300
              </div>
              <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
                30% OFF on all courses
              </p>
            </div>

            <button
              onClick={handleCopy}
              style={{
                background: '#003d99',
                color: 'white',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '150px'
              }}
              onMouseEnter={(e) => e.target.style.background = '#002d6f'}
              onMouseLeave={(e) => e.target.style.background = '#003d99'}
            >
              {copied ? '✓ Copied!' : '📋 Copy Code'}
            </button>
          </div>

          <p style={{ fontSize: '15px', color: '#666', marginBottom: '20px' }}>
            Applies to: JEE Main/Advanced, NEET, and Foundation Batches.
          </p>

          <button className="btn btn-primary">
            Explore All Courses
          </button>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
