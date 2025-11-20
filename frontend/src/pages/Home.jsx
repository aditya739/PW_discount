import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import HeroSection from '../components/HeroSection'
import OffersTable from '../components/OffersTable'
import Community from '../components/Community'
import Footer from '../components/Footer'
import { heroImageAPI, noticeAPI, mainDivAPI } from '../services/api'
import { Link } from 'react-router-dom'

const Home = () => {
  const [heroImages, setHeroImages] = useState([])
  const [mainDivs, setMainDivs] = useState([])
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true)
        const [imagesRes, noticesRes, mainDivsRes] = await Promise.all([
          heroImageAPI.getAll(),
          noticeAPI.getAll(),
          mainDivAPI.getAll()
        ])
        
        setHeroImages(imagesRes.data || [])
        setMainDivs(mainDivsRes.data || [])
        setNotices(noticesRes.data.map(n => n.text) || [])
      } catch (err) {
        console.error('Failed to load content:', err)
        // Fallback to localStorage for backward compatibility
        const saved = localStorage.getItem('heroImages')
        if (saved) {
          setHeroImages(JSON.parse(saved))
        } else {
          const defaultImage = { id: 1, imageUrl: '', title: 'Special Offer', position: 'left' }
          setHeroImages([defaultImage])
        }
        const savedNotices = localStorage.getItem('notices')
        if (savedNotices) {
          setNotices(JSON.parse(savedNotices))
        }
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

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

  const convertGoogleDriveUrl = (url) => {
    if (!url) return null
    const driveId = getDriveId(url)
    if (driveId) {
      return `https://drive.google.com/uc?export=view&id=${driveId}`
    }
    return url
  }

  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22600%22%3E%3Crect fill=%22%230066cc%22 width=%22300%22 height=%22600%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2232%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3EPW Deals%3C/text%3E%3C/svg%3E'

  const ImageCard = ({ image }) => {
    const driveId = getDriveId(image.imageUrl)
    const isVideo = image.imageUrl?.toLowerCase().match(/\.(mp4|webm)$/)
    const isPdf = image.imageUrl?.toLowerCase().match(/\.pdf$/)

    const renderContent = () => {
      if (isVideo) {
        return <video src={image.imageUrl} controls style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      }
      if (isPdf) {
        return <iframe src={image.imageUrl} style={{ width: '100%', height: '100%', border: 'none' }} title="PDF" />
      }
      
      // Default to image (Drive or direct)
      const imgSrc = driveId 
        ? `https://drive.google.com/uc?export=view&id=${driveId}` 
        : (image.imageUrl || fallbackImage)

      return (
        <img 
          src={imgSrc} 
          alt={image.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => { 
            // If Drive image fails, try preview (might be video/pdf on Drive)
            if (driveId) {
              const iframe = document.createElement('iframe')
              iframe.src = `https://drive.google.com/file/d/${driveId}/preview`
              iframe.style.cssText = "width:100%;height:100%;border:none;"
              e.target.parentNode.replaceChild(iframe, e.target)
            } else {
              e.target.src = fallbackImage 
            }
          }} 
        />
      )
    }

    return (
      <div className="card" style={{ padding: 0, overflow: 'hidden', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-lg)' }}>
        {renderContent()}
      </div>
    )
  }

  const NoticeBoard = () => (
    <div className="card" style={{ background: '#fff9e6', border: '1px solid #ffeeba', position: 'sticky', top: '100px' }}>
      <h3 style={{ color: '#997404', fontSize: 'var(--font-size-md)', marginBottom: 'var(--spacing-md)' }}>
        📢 Notices
      </h3>
      {notices.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {notices.map((notice, idx) => (
            <div key={idx} style={{
              background: 'white',
              padding: 'var(--spacing-sm) var(--spacing-md)',
              borderRadius: 'var(--radius-sm)',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
              borderLeft: '3px solid #ffc107'
            }}>
              {notice}
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: 'var(--font-size-sm)', margin: 0 }}>No notices at the moment</p>
      )}
    </div>
  )

  const MainContent = () => (
    <div className="animate-fade-in">
      {/* Render Main Divs first */}
      {mainDivs.map((div, idx) => (
        <HeroSection 
          key={`main-${div._id || idx}`}
          heroData={{
            ...div,
            imageUrl: div.backgroundImageUrl // Map backgroundImageUrl to imageUrl for HeroSection
          }}
        />
      ))}

      {/* Render Hero Images stacked */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)', marginTop: mainDivs.length > 0 ? 'var(--spacing-xl)' : 0 }}>
        {heroImages.map((image, idx) => (
          <HeroSection 
            key={image._id || idx}
            heroData={image}
          />
        ))}
      </div>
      
      <div className="section">
        <OffersTable />
      </div>
      <div className="section">
        <Community />
      </div>
    </div>
  )

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Render all Image Cards stacked */}
      {heroImages.map((image, idx) => (
        <ImageCard key={image._id || idx} image={image} />
      ))}
      <NoticeBoard />
    </div>
  )

  if (heroImages.length === 0) {
    return (
      <div>
        <Header />
        <div className="container section">
          <div className="home-layout">
            <SidebarContent />
            <MainContent />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  // Use the position of the first image to determine the layout
  const position = heroImages[0]?.position || 'left'

  // Simplified layout logic - using CSS grid for responsiveness
  const Layout = ({ children }) => (
    <div>
      <Header />
      <div className="container section">
        {children}
      </div>
      <Footer />
    </div>
  )

  if (position === 'right') {
    return (
      <Layout>
        <div className="home-layout right">
          <MainContent />
          <SidebarContent />
        </div>
      </Layout>
    )
  }

  if (position === 'top') {
    return (
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          <SidebarContent />
          <MainContent />
        </div>
      </Layout>
    )
  }

  if (position === 'bottom') {
    return (
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
          <MainContent />
          <SidebarContent />
        </div>
      </Layout>
    )
  }

  // Default Left
  return (
    <Layout>
      <div className="home-layout">
        <SidebarContent />
        <MainContent />
      </div>
    </Layout>
  )
}

export default Home
