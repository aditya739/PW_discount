import React from 'react'

const CourseCategories = () => {
  const categories = [
    { name: 'JEE', icon: '🎯', color: '#FF6B6B' },
    { name: 'NEET', icon: '🔬', color: '#4ECDC4' },
    { name: 'Class 10', icon: '📚', color: '#45B7D1' },
    { name: 'Class 12', icon: '✏️', color: '#FFA07A' }
  ]

  return (
    <div style={{ padding: '60px 20px' }}>
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
          📚 Featured Courses
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px'
        }}>
          {categories.map((cat, idx) => (
            <div
              key={cat.name}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`,
                borderLeft: `4px solid ${cat.color}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '10px' }}>{cat.icon}</div>
              <h3 style={{ color: cat.color, fontWeight: 'bold' }}>{cat.name}</h3>
              <p style={{ color: '#666', marginTop: '10px' }}>Comprehensive courses</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseCategories
