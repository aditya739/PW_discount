import React, { useState, useEffect } from 'react'
import { courseCategoryAPI } from '../services/api'
import '../styles/OffersTable.css'

const OffersTable = () => {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [copiedCode, setCopiedCode] = useState(null)

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await courseCategoryAPI.getAll()
        setCategories(res.data || [])
      } catch (err) {
        console.error('Failed to load course categories:', err)
      }
    }
    loadCategories()
  }, [])

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.applicableCode.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const INITIAL_DISPLAY_COUNT = 10
  const [showAll, setShowAll] = useState(false)

  const displayedCategories = showAll ? filteredCategories : filteredCategories.slice(0, INITIAL_DISPLAY_COUNT)

  return (
    <div className="container">
      <div className="offers-header">
        <h2 className="offers-title">
          Available Course Offers
        </h2>
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="offers-search"
        />
      </div>

      {/* Desktop Table View */}
      <div className="card offers-table-container">
        <table className="offers-table">
          <thead>
            <tr style={{ background: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Category</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Student Discount</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'left', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Applicable Code</th>
              <th style={{ padding: 'var(--spacing-md)', textAlign: 'right', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-semibold)' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {displayedCategories.length > 0 ? (
              displayedCategories.map((cat, idx) => (
                <tr key={cat._id || idx} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="hover-bg">
                  <td style={{ padding: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {cat.iconUrl && <img src={cat.iconUrl} alt="" style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />}
                    <span style={{ fontWeight: 'var(--font-weight-medium)', color: 'var(--color-text-primary)' }}>{cat.name}</span>
                  </td>
                  <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-text-secondary)' }}>{cat.discountText}</td>
                  <td style={{ padding: 'var(--spacing-md)' }}>
                    <span style={{ 
                      background: 'rgba(0, 102, 204, 0.1)', 
                      color: 'var(--color-accent)', 
                      padding: '4px 8px', 
                      borderRadius: 'var(--radius-sm)', 
                      fontFamily: 'monospace',
                      fontWeight: 'bold'
                    }}>
                      {cat.applicableCode}
                    </span>
                  </td>
                  <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => handleCopy(cat.applicableCode)}
                      style={{ fontSize: '12px', padding: '6px 12px' }}
                    >
                      {copiedCode === cat.applicableCode ? '✓ Copied' : 'Copy Code'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
                  No courses found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="offers-card-view">
        {displayedCategories.length > 0 ? (
          displayedCategories.map((cat, idx) => (
            <div key={cat._id || idx} className="offer-card">
              <div className="offer-card-header">
                {cat.iconUrl && <img src={cat.iconUrl} alt="" className="offer-card-icon" />}
                <span className="offer-card-name">{cat.name}</span>
              </div>
              <div className="offer-card-body">
                <div className="offer-card-row">
                  <span className="offer-card-label">Discount</span>
                  <span className="offer-card-value">{cat.discountText}</span>
                </div>
                <div className="offer-card-row">
                  <span className="offer-card-label">Code</span>
                  <span className="offer-card-code">{cat.applicableCode}</span>
                </div>
                <button 
                  className="btn btn-primary offer-card-button"
                  onClick={() => handleCopy(cat.applicableCode)}
                >
                  {copiedCode === cat.applicableCode ? '✓ Copied' : 'Copy Code'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: 'var(--spacing-xl)', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
            No courses found matching "{searchTerm}"
          </div>
        )}
      </div>

      {/* Show More/Less Button */}
      {filteredCategories.length > INITIAL_DISPLAY_COUNT && (
        <div style={{ padding: 'var(--spacing-md) 0', textAlign: 'center' }}>
          <button 
            onClick={() => setShowAll(!showAll)}
            className="btn btn-secondary"
            style={{ width: '100%', maxWidth: '400px', minHeight: '44px' }}
          >
            {showAll ? 'Show Less' : `Show All (${filteredCategories.length} Offers)`}
          </button>
        </div>
      )}
    </div>
  )
}

export default OffersTable
