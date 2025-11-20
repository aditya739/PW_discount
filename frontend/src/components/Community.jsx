import React from 'react'
import { FaInstagram, FaReddit, FaWhatsapp, FaTelegram } from 'react-icons/fa'

const Community = () => {
  const socialLinks = [
    { icon: <FaInstagram />, name: 'Instagram', url: 'https://www.instagram.com/physics_wallah_discount?igsh=YXN3ZDVuYnN1czRl', color: '#E1306C' },
    { icon: <FaWhatsapp />, name: 'WhatsApp', url: 'https://whatsapp.com/channel/0029VbC2rxAL2AU3nJjiaP40', color: '#25D366' },
    { icon: <FaTelegram />, name: 'Telegram', url: 'https://t.me/physicswallahdisc', color: '#0088cc' },
    { icon: <FaReddit />, name: 'Reddit', url: 'https://reddit.com/r/physicswallah', color: '#FF4500' }
  ]

  return (
    <div style={{ 
      padding: 'var(--spacing-xxl) var(--spacing-lg)', 
      background: '#f9f9f9' 
    }} id="community">
      <div className="container">
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: 'var(--spacing-xxl)', 
          color: '#1a1a1a',
          fontSize: 'var(--font-size-xl)'
        }}>
          Join Our Official Study Network
        </h2>

        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: 'var(--spacing-xl)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {socialLinks.map((social, idx) => (
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
              <div className="social-icon-circle">
                {social.icon}
              </div>
              <span style={{ 
                fontSize: 'var(--font-size-sm)', 
                color: '#666', 
                fontWeight: '500' 
              }}>
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .social-icon-circle {
          background: white;
          padding: 20px;
          border-radius: 50%;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .social-icon:hover .social-icon-circle {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        @media (max-width: 768px) {
          .social-icon-circle {
            width: 60px;
            height: 60px;
            padding: 15px;
          }
        }

        @media (max-width: 480px) {
          .social-icon-circle {
            width: 48px;
            height: 48px;
            padding: 12px;
          }
          
          .social-icon {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Community

