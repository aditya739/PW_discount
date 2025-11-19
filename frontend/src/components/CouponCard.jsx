import React, { useState } from 'react'

const CouponCard = ({ coupon }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const daysLeft = Math.ceil((new Date(coupon.endDate) - new Date()) / (1000 * 60 * 60 * 24))

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '30px',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      animation: 'fadeIn 0.6s ease-out',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: '#007bff', marginBottom: '20px', fontSize: '18px' }}>
        🔥 YOUR DISCOUNT CODE IS HERE! 🔥
      </h3>
      <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
        Use this code in the Physics Wallah App to save big.
      </p>

      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Code Box */}
        <div style={{
          background: '#FFD700',
          border: '3px dashed #FF6B00',
          borderRadius: '8px',
          padding: '20px 30px',
          flex: 1,
          minWidth: '200px',
          textAlign: 'center',
          boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            fontFamily: 'Courier New, monospace',
            color: '#333',
            letterSpacing: '3px',
            animation: 'pulse 2s infinite'
          }}>
            {coupon.code}
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
            {coupon.discount}% OFF
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          style={{
            background: copied ? '#28a745' : '#FF6B00',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 107, 0, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            whiteSpace: 'nowrap',
            animation: copied ? 'glow 0.6s ease-out' : 'bounce 2s infinite'
          }}
          onMouseEnter={(e) => {
            if (!copied) {
              e.target.style.transform = 'translateY(-3px)'
              e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 0, 0.6)'
            }
          }}
          onMouseLeave={(e) => {
            if (!copied) {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 15px rgba(255, 107, 0, 0.4)'
            }
          }}
        >
          <span style={{ fontSize: '18px' }}>📋</span>
          {copied ? '✓ COPIED!' : 'COPY CODE'}
        </button>
      </div>

      {/* Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '15px',
        paddingTop: '20px',
        borderTop: '1px solid #eee'
      }}>
        <div>
          <p style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>DESCRIPTION</p>
          <p style={{ color: '#333', fontWeight: '500' }}>{coupon.description}</p>
        </div>
        <div>
          <p style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>DISCOUNT TYPE</p>
          <p style={{ color: '#333', fontWeight: '500' }}>{coupon.discountType === 'percentage' ? 'Percentage' : 'Fixed Amount'}</p>
        </div>
        {daysLeft > 0 && (
          <div>
            <p style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>EXPIRES IN</p>
            <p style={{
              color: daysLeft <= 3 ? '#dc3545' : '#28a745',
              fontWeight: 'bold',
              animation: daysLeft <= 3 ? 'pulse 1s infinite' : 'none'
            }}>
              ⏰ {daysLeft} days
            </p>
          </div>
        )}
        <div>
          <p style={{ color: '#999', fontSize: '12px', marginBottom: '5px' }}>USAGE</p>
          <p style={{ color: '#333', fontWeight: '500' }}>
            {coupon.currentUsage}/{coupon.totalUsageLimit || '∞'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CouponCard
