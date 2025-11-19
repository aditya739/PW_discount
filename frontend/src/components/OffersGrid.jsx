import React, { useState, useEffect } from 'react'
import { couponAPI } from '../services/api'

const OffersGrid = () => {
  const [offers, setOffers] = useState([])
  const [copied, setCopied] = useState({})

  useEffect(() => {
    couponAPI.getAll().then(res => setOffers(res.data.slice(0, 4)))
  }, [])

  const handleCopy = (code, idx) => {
    navigator.clipboard.writeText(code)
    setCopied({ ...copied, [idx]: true })
    setTimeout(() => setCopied({ ...copied, [idx]: false }), 2000)
  }

  return (
    <div style={{ padding: '80px 20px', background: '#fff' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>All Offers</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px'
        }}>
          {offers.map((offer, idx) => (
            <div
              key={offer._id}
              style={{
                padding: '30px',
                background: '#f5f5f7',
                borderRadius: '20px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                animation: `slideUp 0.6s ease-out ${idx * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#e8e8ed'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f7'
              }}
            >
              <h3 style={{ marginBottom: '10px', fontSize: '28px', fontWeight: '700' }}>
                {offer.discount}%
              </h3>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                {offer.description}
              </p>
              
              <div style={{
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'Courier New, monospace',
                marginBottom: '20px',
                color: '#000'
              }}>
                {offer.code}
              </div>

              <button
                onClick={() => handleCopy(offer.code, idx)}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '980px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '100%',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.background = '#333'}
                onMouseLeave={(e) => e.target.style.background = '#000'}
              >
                {copied[idx] ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OffersGrid
