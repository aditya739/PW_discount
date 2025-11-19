import React from 'react'

const Community = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#f9f9f9' }} id="community">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
          Join Our Official Study Network
        </h2>

        <div className="social-links">
          {[
            { icon: '📷', name: 'Instagram', url: 'https://instagram.com/physicswallah' },
            { icon: '🔗', name: 'Reddit', url: 'https://reddit.com/r/physicswallah' },
            { icon: '💬', name: 'WhatsApp', url: 'https://whatsapp.com/physicswallah' },
            { icon: '✈️', name: 'Telegram', url: 'https://t.me/physicswallah' }
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '48px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                opacity: 0.7
              }}
              onMouseEnter={(e) => e.target.style.opacity = '1'}
              onMouseLeave={(e) => e.target.style.opacity = '0.7'}
              title={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
