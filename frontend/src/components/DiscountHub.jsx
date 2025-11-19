import React, { useState, useEffect } from 'react'
import { couponAPI } from '../services/api'

const DiscountHub = () => {
  const [offers, setOffers] = useState([])
  const [copied, setCopied] = useState({})

  useEffect(() => {
    couponAPI.getAll().then(res => {
      setOffers(res.data.slice(0, 4))
    })
  }, [])

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code)
    setCopied({ ...copied, [idx]: true })
    setTimeout(() => setCopied({ ...copied, [idx]: false }), 2000)
  }

  return (
    <div style={{ padding: '60px 20px', background: '#f5f7fa' }}>
      <div className="container">
        <h2 style={{
          fontSize: '36px',
          marginBottom: '40px',
          textAlign: 'center',
          color: '#1a1a2e'
        }}>
          ⚡ Your Discount Hub
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {offers.map((offer, idx) => (
            <div
              key={offer._id}
              style={{
                background: 'white',
                padding: '25px',
                borderRadius: '8px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease',
                animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`,
                border: '1px solid #e0e0e0'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{
                background: '#FFD700',
                padding: '15px',
                borderRadius: '6px',
                marginBottom: '15px',
                textAlign: 'center',
                border: '2px dashed #FF6B00'
              }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 'bold',
                  fontFamily: 'Courier New, monospace',
                  color: '#1a1a2e',
                  letterSpacing: '2px'
                }}>
                  {offer.code}
                </div>
              </div>

              <p style={{ color: '#666', marginBottom: '15px', fontSize: '14px' }}>
                {offer.description}
              </p>

              <p style={{ color: '#FF6B00', fontWeight: 'bold', marginBottom: '15px' }}>
                {offer.discount}% OFF
              </p>

              <button
                onClick={() => handleCopy(offer.code, idx)}
                style={{
                  width: '100%',
                  background: copied[idx] ? '#28a745' : '#FF6B00',
                  color: 'white',
                  border: 'none',
                  padding: '10px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => {
                  if (!copied[idx]) {
                    e.target.style.background = '#FF8C00'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!copied[idx]) {
                    e.target.style.background = '#FF6B00'
                  }
                }}
              >
                {copied[idx] ? '✓ COPIED!' : 'COPY CODE'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DiscountHub
