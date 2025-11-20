import React, { useState, useEffect } from 'react'
import { courseCategoryAPI } from '../services/api'

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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-lg)', flexWrap: 'wrap', gap: '15px' }}>
        <h2 style={{ 
          fontSize: 'var(--font-size-xl)', 
          fontWeight: 'var(--font-weight-bold)',
          color: 'var(--color-text-primary)',
          margin: 0
        }}>
          Available Course Offers
        </h2>
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 15px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-border)',
            width: '100%',
            maxWidth: '300px',
            fontSize: 'var(--font-size-sm)',
            outline: 'none',
            boxShadow: 'var(--shadow-sm)'
          }}
        />
      </div>

      <div className="card" style={{ overflowX: 'auto', padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
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
        
        {filteredCategories.length > INITIAL_DISPLAY_COUNT && (
          <div style={{ padding: 'var(--spacing-md)', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="btn btn-secondary"
              style={{ width: '100%' }}
            >
              {showAll ? 'Show Less' : `Show All (${filteredCategories.length} Offers)`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default OffersTable
