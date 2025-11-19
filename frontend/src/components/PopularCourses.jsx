import React from 'react'

const PopularCourses = () => {
  const courses = [
    { title: 'NEET Crash Course', rating: 4.8, students: '12K+', desc: 'Complete NEET preparation' },
    { title: 'JEE Main 2024', rating: 4.9, students: '15K+', desc: 'Advanced JEE coaching' },
    { title: 'Class 11 Foundations', rating: 4.7, students: '8K+', desc: 'Build strong fundamentals' },
    { title: 'Class 12 Boards', rating: 4.8, students: '10K+', desc: 'Board exam preparation' }
  ]

  return (
    <div style={{ padding: '60px 20px', background: '#f5f7fa' }}>
      <div className="container">
        <h2 style={{
          fontSize: '36px',
          marginBottom: '40px',
          textAlign: 'center',
          color: '#1a1a2e'
        }}>
          Popular Courses
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {courses.map((course, idx) => (
            <div
              key={idx}
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
                fontSize: '40px',
                marginBottom: '15px',
                textAlign: 'center'
              }}>
                📚
              </div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '10px', fontSize: '18px' }}>
                {course.title}
              </h3>
              <p style={{ color: '#666', fontSize: '14px', marginBottom: '15px' }}>
                {course.desc}
              </p>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '15px',
                borderTop: '1px solid #e0e0e0'
              }}>
                <span style={{ color: '#FF6B00', fontWeight: 'bold', fontSize: '14px' }}>
                  ⭐ {course.rating}
                </span>
                <span style={{ color: '#666', fontSize: '12px' }}>
                  {course.students} students
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PopularCourses
