import React from 'react'

const Instructions = () => {
  return (
    <div style={{ padding: '60px 20px', background: 'white' }}>
      <div className="container">
        <h2 style={{
          fontSize: '36px',
          marginBottom: '50px',
          textAlign: 'center',
          color: '#1a1a2e'
        }}>
          How to Get Your Discount
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          marginBottom: '50px'
        }}>
          {[
            { icon: '🖱️', title: 'Click COPY CODE', desc: 'Select the coupon code above' },
            { icon: '📱', title: 'Open PW App', desc: 'Launch Physics Wallah App' },
            { icon: '💰', title: 'Paste & Save!', desc: 'Paste code at checkout' }
          ].map((step, idx) => (
            <div
              key={idx}
              style={{
                textAlign: 'center',
                animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
              }}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '15px'
              }}>
                {step.icon}
              </div>
              <h3 style={{ color: '#1a1a2e', marginBottom: '10px', fontSize: '18px' }}>
                {step.title}
              </h3>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f5f7fa, #e8f4f8)',
          padding: '40px',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ color: '#1a1a2e', marginBottom: '20px', fontSize: '24px' }}>
            🤝 Join Our Community
          </h3>
          <p style={{ color: '#666', marginBottom: '25px', fontSize: '14px' }}>
            Connect with thousands of students and get exclusive updates
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            {[
              { icon: '📱', name: 'Telegram', url: 'https://t.me/physicswallah' },
              { icon: '📷', name: 'Instagram', url: 'https://instagram.com/physicswallah' },
              { icon: '▶️', name: 'YouTube', url: 'https://youtube.com/physicswallah' },
              { icon: '👍', name: 'Facebook', url: 'https://facebook.com/physicswallah' }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#FF6B00',
                  color: 'white',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '14px',
                  transition: 'all 0.3s ease',
                  animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-3px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(255, 107, 0, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                <span>{social.icon}</span>
                Join {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Instructions
