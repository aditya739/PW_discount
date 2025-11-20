import React from 'react'
import { FaInstagram, FaReddit, FaWhatsapp, FaTelegram } from 'react-icons/fa'

const Community = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#f9f9f9' }} id="community">
      <div className="container">
        <h2 style={{ textAlign: 'center', marginBottom: '60px', color: '#1a1a1a' }}>
          Join Our Official Study Network
        </h2>

        <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          {[
            { icon: <FaInstagram />, name: 'Instagram', url: 'https://www.instagram.com/physics_wallah_discount?igsh=YXN3ZDVuYnN1czRl', color: '#E1306C' },
            { icon: <FaWhatsapp />, name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbC2rxAL2AU3nJjiaP40', color: '#25D366' },
            { icon: <FaTelegram />, name: 'Telegram', url: 'https://t.me/physicswallahdisc', color: '#0088cc' },
            { icon: <FaReddit />, name: 'Reddit', url: 'https://reddit.com/r/physicswallah', color: '#FF4500' }
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '40px',
                color: social.color,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none'
              }}
              className="social-icon"
              title={social.name}
            >
              <div style={{ 
                background: 'white', 
                padding: '20px', 
                borderRadius: '50%', 
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80px',
                height: '80px'
              }}>
                {social.icon}
              </div>
              <span style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>{social.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community
