import React, { useState, useEffect } from 'react'
import { couponAPI } from '../services/api'

const UrgentAlert = () => {
  const [urgentOffer, setUrgentOffer] = useState(null)
  const [timeLeft, setTimeLeft] = useState('00:00:00')

  useEffect(() => {
    couponAPI.getAll().then(res => {
      const offers = res.data.sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
      if (offers.length > 0) setUrgentOffer(offers[0])
    })
  }, [])

  useEffect(() => {
    if (!urgentOffer) return
    const timer = setInterval(() => {
      const now = new Date()
      const end = new Date(urgentOffer.endDate)
      const diff = end - now
      if (diff <= 0) {
        setTimeLeft('EXPIRED')
        return
      }
      const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0')
      const mins = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
      const secs = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0')
      setTimeLeft(`${hours}:${mins}:${secs}`)
    }, 1000)
    return () => clearInterval(timer)
  }, [urgentOffer])

  if (!urgentOffer) return null

  return (
    <div style={{
      background: 'linear-gradient(135deg, #FF6B00, #FF8C00)',
      color: 'white',
      padding: '12px 0',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      animation: 'countdown 2s infinite',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <span>🔥 {urgentOffer.discount}% OFF: Physics Wallah Sale Ends In: {timeLeft}</span>
      <button style={{
        background: 'white',
        color: '#FF6B00',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '4px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '12px',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)'
      }}>
        Join Community
      </button>
    </div>
  )
}

export default UrgentAlert
