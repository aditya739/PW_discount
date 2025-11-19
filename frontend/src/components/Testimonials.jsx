import React from 'react'

const Testimonials = () => {
  const testimonials = [
    { name: 'Rahul K.', quote: 'Saved ₹5000 with these coupons! Amazing platform.' },
    { name: 'Priya S.', quote: 'Best way to find Physics Wallah discounts. Highly recommended!' },
    { name: 'Arjun M.', quote: 'Great community and exclusive offers. Love it!' },
    { name: 'Neha P.', quote: 'Easy to use and super helpful. Thanks for the deals!' }
  ]

  return (
    <div style={{ padding: '60px 20px', background: 'white' }}>
      <div className="container">
        <h2 style={{
          fontSize: '36px',
          marginBottom: '40px',
          textAlign: 'center',
          color: '#1a1a2e'
        }}>
          Student Testimonials
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px'
        }}>
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              style={{
                background: '#f5f7fa',
                padding: '25px',
                borderRadius: '8px',
                borderLeft: '4px solid #FF6B00',
                animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              <p style={{
                color: '#666',
                fontStyle: 'italic',
                marginBottom: '15px',
                fontSize: '14px'
              }}>
                "{testimonial.quote}"
              </p>
              <p style={{
                color: '#FF6B00',
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                — {testimonial.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
