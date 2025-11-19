import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import BannerCarousel from '../components/BannerCarousel'
import HeroSection from '../components/HeroSection'
import OffersTable from '../components/OffersTable'
import Community from '../components/Community'
import Footer from '../components/Footer'

const Home = () => {
  const [imageSection, setImageSection] = useState({
    headline: 'CPCA0300 - 30% OFF',
    imageUrl: '',
    description: 'Physics Wallah Exclusive Offer'
  })

  useEffect(() => {
    const saved = localStorage.getItem('imageSection')
    if (saved) {
      setImageSection(JSON.parse(saved))
    }
  }, [])

  const convertGoogleDriveUrl = (url) => {
    if (!url) return url
    const textarea = document.createElement('textarea')
    textarea.innerHTML = url
    const decoded = textarea.value
    const fileIdMatch = decoded.match(/\/d\/([a-zA-Z0-9-_]+)/)
    if (fileIdMatch) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
    }
    return decoded
  }

  const imageUrl = convertGoogleDriveUrl(imageSection.imageUrl)
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%22400%22%3E%3Crect fill=%22%23003d99%22 width=%221200%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ECPCA0300 - 30%25 OFF%3C/text%3E%3C/svg%3E'

  return (
    <div>
      <Header />
      
      <div className="container" style={{ marginTop: '20px' }}>
        {/* Hero Image Section */}
        <div style={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: '#f0f0f0',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <img
            src={imageUrl || fallbackImage}
            alt={imageSection.headline}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              display: 'block'
            }}
            onError={(e) => {
              e.target.src = fallbackImage
            }}
          />
        </div>

        {/* Headline and Description */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '32px', fontWeight: '700', color: '#003d99', marginBottom: '10px' }}>
            {imageSection.headline}
          </h2>
          <p style={{ fontSize: '16px', color: '#666' }}>
            {imageSection.description}
          </p>
        </div>
      </div>

      <BannerCarousel />
      <HeroSection />
      <OffersTable />
      <Community />
      <Footer />
    </div>
  )
}

export default Home
