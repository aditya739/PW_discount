import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CouponCard from '../components/CouponCard'
import { couponAPI } from '../services/api'

const Offers = () => {
  const [coupons, setCoupons] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCoupons()
  }, [filter])

  const fetchCoupons = async () => {
    try {
      setLoading(true)
      const res = await couponAPI.getAll()
      let data = res.data

      if (filter === 'expiring-soon') {
        data = data.sort((a, b) => new Date(a.endDate) - new Date(b.endDate)).slice(0, 10)
      } else if (filter === 'new') {
        data = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 10)
      }

      setCoupons(data)
    } catch (err) {
      console.error('Failed to fetch coupons:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Header />
      
      <div style={{ padding: '40px 20px', background: '#f8f9fa', minHeight: '80vh' }}>
        <div className="container">
          <h1 style={{
            fontSize: '40px',
            marginBottom: '10px',
            background: 'linear-gradient(135deg, #007bff, #0056b3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🎁 All Offers
          </h1>

          {/* Instructions */}
          <div style={{
            background: 'white',
            padding: '25px',
            borderRadius: '8px',
            marginBottom: '30px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            animation: 'fadeIn 0.6s ease-out'
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '15px' }}>📋 3 Easy Steps to Your Discount:</h3>
            <ol style={{ lineHeight: '2', color: '#333', marginLeft: '20px' }}>
              <li><strong>Click the "COPY CODE" button</strong> below to copy the coupon code</li>
              <li><strong>Open the Physics Wallah App</strong> and select your course</li>
              <li><strong>Paste the code at the checkout screen</strong> to get your discount</li>
            </ol>
          </div>

          {/* Filters */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            animation: 'slideInLeft 0.6s ease-out'
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '10px 20px',
                border: filter === 'all' ? 'none' : '2px solid #ddd',
                background: filter === 'all' ? '#007bff' : 'white',
                color: filter === 'all' ? 'white' : '#333',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              All Offers
            </button>
            <button
              onClick={() => setFilter('new')}
              style={{
                padding: '10px 20px',
                border: filter === 'new' ? 'none' : '2px solid #ddd',
                background: filter === 'new' ? '#007bff' : 'white',
                color: filter === 'new' ? 'white' : '#333',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              ✨ New
            </button>
            <button
              onClick={() => setFilter('expiring-soon')}
              style={{
                padding: '10px 20px',
                border: filter === 'expiring-soon' ? 'none' : '2px solid #ddd',
                background: filter === 'expiring-soon' ? '#007bff' : 'white',
                color: filter === 'expiring-soon' ? 'white' : '#333',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease'
              }}
            >
              ⏰ Expiring Soon
            </button>
          </div>

          {/* Coupons */}
          {loading ? (
            <p style={{ textAlign: 'center', fontSize: '18px', animation: 'pulse 1.5s infinite' }}>
              ⏳ Loading offers...
            </p>
          ) : coupons.length > 0 ? (
            <div>
              {coupons.map((coupon, idx) => (
                <div key={coupon._id} style={{ animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
                  <CouponCard coupon={coupon} />
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', fontSize: '18px', color: '#999' }}>
              No active offers at the moment.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Offers
