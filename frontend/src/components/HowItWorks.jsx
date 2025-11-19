import React from 'react'

const HowItWorks = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#f5f5f7' }}>
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px' }}>How It Works</h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px'
        }}>
          {[
            { num: '1', title: 'Copy Code', desc: 'Select and copy any coupon code' },
            { num: '2', title: 'Open App', desc: 'Launch Physics Wallah app' },
            { num: '3', title: 'Paste & Save', desc: 'Paste code at checkout' }
          ].map((step, idx) => (
            <div key={idx} style={{ textAlign: 'center', animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: '#000',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                fontWeight: '700',
                margin: '0 auto 20px'
              }}>
                {step.num}
              </div>
              <h3 style={{ marginBottom: '10px' }}>{step.title}</h3>
              <p style={{ fontSize: '14px', color: '#666' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
