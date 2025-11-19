import React, { useState } from 'react'

const OffersTable = () => {
  const [copied, setCopied] = useState({})

  const handleCopy = (idx) => {
    navigator.clipboard.writeText('CPCA0300')
    setCopied({ ...copied, [idx]: true })
    setTimeout(() => setCopied({ ...copied, [idx]: false }), 2000)
  }

  const courses = [
    'JEE Main 2024',
    'JEE Advanced',
    'NEET Ultimate',
    'Class 11 Foundations',
    'Class 12 Boards',
    'GATE Preparation'
  ]

  const coupons = [
    { code: 'CPCA0300', desc: 'Physics Wallah Mega Sale - 30% OFF' },
    { code: 'CPCA0300', desc: 'Festival Special - CPCA0300' },
    { code: 'CPCA0300', desc: 'Welcome Offer - CPCA0300 on all courses' }
  ]

  return (
    <div style={{ padding: '80px 20px', background: '#ffffff' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
          All Physics Wallah Batch Coupon Codes (2025)
        </h2>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            background: '#ffffff'
          }}>
            <thead>
              <tr style={{ background: '#003d99' }}>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: '2px solid #003d99'
                }}>
                  Coupon Code
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'left',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: '2px solid #003d99'
                }}>
                  Applicable Courses
                </th>
                <th style={{
                  padding: '16px',
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '14px',
                  borderBottom: '2px solid #003d99'
                }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid #e5e5e5',
                  background: idx % 2 === 0 ? '#ffffff' : '#f9f9f9'
                }}>
                  <td style={{
                    padding: '16px',
                    color: '#003d99',
                    fontWeight: '700',
                    fontSize: '16px',
                    fontFamily: 'Courier New, monospace'
                  }}>
                    {coupon.code}
                  </td>
                  <td style={{
                    padding: '16px',
                    color: '#1a1a1a',
                    fontSize: '14px'
                  }}>
                    {courses.join(', ')}
                  </td>
                  <td style={{
                    padding: '16px',
                    textAlign: 'center'
                  }}>
                    <button
                      onClick={() => handleCopy(idx)}
                      style={{
                        background: '#003d99',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.background = '#002d6f'}
                      onMouseLeave={(e) => e.target.style.background = '#003d99'}
                    >
                      {copied[idx] ? '✓ Copied' : 'Copy'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OffersTable
