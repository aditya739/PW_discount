import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import CouponCard from './CouponCard'
import { couponAPI } from '../services/api'

const OffersShowcase = () => {
  const [topOffers, setTopOffers] = useState([])

  useEffect(() => {
    couponAPI.getAll().then(res => {
      setTopOffers(res.data.slice(0, 3))
    })
  }, [])

  return (
    <div style={{ padding: '60px 20px', background: '#f8f9fa' }}>
      <div className="container">
        <h2 style={{
          textAlign: 'center',
          fontSize: '36px',
          marginBottom: '40px',
          background: 'linear-gradient(135deg, #007bff, #0056b3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          🏆 Latest Offers
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {topOffers.map((coupon, idx) => (
            <div key={coupon._id} style={{ animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both` }}>
              <CouponCard coupon={coupon} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/offers" style={{
            display: 'inline-block',
            background: '#007bff',
            color: 'white',
            padding: '12px 30px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(0, 123, 255, 0.4)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.6)'
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.4)'
          }}>
            Visit All Offers →
          </Link>
        </div>

        <div style={{
          marginTop: '50px',
          padding: '30px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
        }}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#007bff' }}>
            📋 How to Use Your Coupon Code
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>1️⃣</div>
              <p><strong>Click "COPY CODE"</strong></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>2️⃣</div>
              <p><strong>Open Physics Wallah App</strong></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>3️⃣</div>
              <p><strong>Paste at Checkout</strong></p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>4️⃣</div>
              <p><strong>Enjoy Discount! 🎊</strong></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OffersShowcase
