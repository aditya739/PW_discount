import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const HeroSection = ({ heroData }) => {
  const [copied, setCopied] = useState(false)

  // Default values if no dynamic data is provided
  const {
    imageUrl,
    title,
    headline = 'UNLOCK YOUR EXAM BOOST',
    subHeadline = 'Applies to: JEE Main/Advanced, NEET, and Foundation Batches.',
    offerCode = 'CPCA0300',
    discountText = '30% OFF on all courses',
    buttonText = 'Explore All Courses',
    buttonLink = '/offers'
  } = heroData || {}

  const handleCopy = () => {
    if (offerCode) {
      navigator.clipboard.writeText(offerCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Helper to extract Drive File ID
  const getDriveId = (url) => {
    if (!url) return null
    const patterns = [
      /\/d\/([a-zA-Z0-9-_]+)/,
      /id=([a-zA-Z0-9-_]+)/,
      /open\?id=([a-zA-Z0-9-_]+)/
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match) return match[1]
    }
    return null
  }

  // Determine media type and source
  const getMediaInfo = (url) => {
    if (!url) return { type: 'none' }
    
    const driveId = getDriveId(url)
    const cleanUrl = url.split('?')[0].toLowerCase()
    
    if (driveId) {
      return { 
        type: 'drive_image', 
        src: `https://drive.google.com/uc?export=view&id=${driveId}`,
        previewSrc: `https://drive.google.com/file/d/${driveId}/preview`
      }
    }

    if (cleanUrl.endsWith('.mp4') || cleanUrl.endsWith('.webm')) {
      return { type: 'video', src: url }
    }

    if (cleanUrl.endsWith('.pdf')) {
      return { type: 'pdf', src: url }
    }

    return { type: 'image', src: url }
  }

  const mediaInfo = getMediaInfo(imageUrl)

  // Render media content
  const renderMedia = () => {
    if (mediaInfo.type === 'none') return null

    const commonStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
      borderRadius: 'var(--radius-lg)'
    }

    if (mediaInfo.type === 'video') {
      return (
        <video 
          src={mediaInfo.src} 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={commonStyle} 
        />
      )
    }

    if (mediaInfo.type === 'pdf') {
      return (
        <iframe 
          src={mediaInfo.src} 
          style={{ ...commonStyle, border: 'none' }} 
          title="PDF Viewer"
        />
      )
    }

    if (mediaInfo.type === 'drive_image' || mediaInfo.type === 'image') {
      return (
        <img 
          src={mediaInfo.src} 
          alt={title || 'Hero'} 
          style={commonStyle}
          onError={(e) => {
            if (mediaInfo.type === 'drive_image') {
              const iframe = document.createElement('iframe')
              iframe.src = mediaInfo.previewSrc
              iframe.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;z-index:0;border-radius:12px;"
              iframe.title = "Media Preview"
              e.target.parentNode.replaceChild(iframe, e.target)
            }
          }}
        />
      )
    }

    return null
  }

  const hasMedia = mediaInfo.type !== 'none'

  return (
    <div className="section" style={{ background: 'var(--color-bg)' }}>
      <div className="container">
        <div 
          className="hero-container"
          style={{
            background: hasMedia ? 'transparent' : 'var(--color-bg-secondary)',
            borderRadius: 'var(--radius-lg)',
            textAlign: 'center',
            border: hasMedia ? 'none' : '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: hasMedia ? 'var(--shadow-lg)' : 'none'
          }}
        >
          {/* Media Background */}
          {renderMedia()}

          {/* Overlay */}
          {hasMedia && (
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 1
            }} />
          )}
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 2, maxWidth: '800px', width: '100%', padding: '20px' }}>
            <p style={{ 
              fontSize: 'var(--font-size-sm)', 
              color: hasMedia ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)', 
              marginBottom: 'var(--spacing-md)', 
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}>
              Limited Time Offer
            </p>

            <h1 style={{
              fontSize: 'var(--font-size-xxl)',
              fontWeight: 'var(--font-weight-bold)',
              color: hasMedia ? '#ffffff' : 'var(--color-text-primary)',
              marginBottom: 'var(--spacing-xl)',
              textShadow: hasMedia ? '0 2px 4px rgba(0,0,0,0.2)' : 'none'
            }}>
              {headline}
            </h1>

            {offerCode && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-xl)',
                flexWrap: 'wrap'
              }}>
                <div style={{
                  border: '2px dashed var(--color-accent)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--spacing-lg) var(--spacing-xl)',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <div style={{
                    fontSize: 'var(--font-size-xxl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-accent)',
                    fontFamily: 'monospace',
                    letterSpacing: '2px'
                  }}>
                    {offerCode}
                  </div>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginTop: 'var(--spacing-xs)', margin: 0 }}>
                    {discountText}
                  </p>
                </div>

                <button
                  onClick={handleCopy}
                  className="btn btn-primary"
                  style={{
                    padding: '16px 32px',
                    fontSize: 'var(--font-size-md)',
                    minWidth: '160px',
                    height: 'fit-content'
                  }}
                >
                  {copied ? '✓ Copied!' : '📋 Copy Code'}
                </button>
              </div>
            )}

            <p style={{ 
              fontSize: 'var(--font-size-md)', 
              color: hasMedia ? 'rgba(255,255,255,0.9)' : 'var(--color-text-secondary)', 
              marginBottom: 'var(--spacing-lg)',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-lg)'
            }}>
              {subHeadline}
            </p>

            <Link to={buttonLink} className="btn btn-secondary" style={{ 
              background: hasMedia ? 'rgba(255,255,255,0.2)' : undefined,
              color: hasMedia ? '#ffffff' : undefined,
              backdropFilter: hasMedia ? 'blur(10px)' : undefined,
              border: hasMedia ? '1px solid rgba(255,255,255,0.3)' : undefined,
              textDecoration: 'none'
            }}>
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection