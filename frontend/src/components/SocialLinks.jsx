import React from 'react'

const SocialLinks = () => {
  const socials = [
    { name: 'Telegram', url: 'https://t.me/physicswallah', icon: '📱' },
    { name: 'Facebook', url: 'https://facebook.com/physicswallah', icon: '👍' },
    { name: 'Instagram', url: 'https://instagram.com/physicswallah', icon: '📷' },
    { name: 'YouTube', url: 'https://youtube.com/physicswallah', icon: '▶️' }
  ]

  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '20px', 
      background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', 
      borderRadius: '8px', 
      margin: '20px 0',
      animation: 'fadeIn 0.8s ease-out',
      boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
    }}>
      <h3 style={{ 
        marginBottom: '15px',
        background: 'linear-gradient(135deg, #007bff, #0056b3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        🌟 Join Our Community
      </h3>
      <div className="social-links">
        {socials.map((social, idx) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            title={social.name}
            style={{
              animationDelay: `${idx * 0.1}s`
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default SocialLinks
