import React, { useState, useEffect } from 'react'
import { bannerAPI } from '../services/api'

const BannerCarousel = () => {
  const [banners, setBanners] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bannerAPI.getAll()
      .then(res => {
        console.log('Banners fetched:', res.data)
        setBanners(res.data || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch banners:', err)
        setLoading(false)
      })
  }, [])

  const convertImageUrl = (url) => {
    if (!url) return url

    // Decode all HTML entities
    const textarea = document.createElement('textarea')
    textarea.innerHTML = url
    const decoded = textarea.value

    // Handle Google Images URLs (extract imgurl parameter)
    if (decoded.includes('google.com/imgres')) {
      const urlObj = new URL(decoded)
      const imgurl = urlObj.searchParams.get('imgurl')
      if (imgurl) {
        console.log('Extracted image URL from Google Images:', imgurl)
        return decodeURIComponent(imgurl)
      }
    }

    // Extract file ID from various Google Drive URL formats
    const fileIdMatch = decoded.match(/\/d\/([a-zA-Z0-9-_]+)|id=([a-zA-Z0-9-_]+)/)
    if (fileIdMatch) {
      const fileId = fileIdMatch[1] || fileIdMatch[2]
      const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
      console.log('Converted Google Drive URL:', directUrl)
      return directUrl
    }

    return decoded
  }

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading banner...</div>
  }

  if (!banners.length) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #003d99, #002d6f)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center',
        borderRadius: '12px',
        marginBottom: '40px'
      }}>
        <h2 style={{ fontSize: '40px', fontWeight: '700', marginBottom: '10px' }}>
          CPCA0300
        </h2>
        <p style={{ fontSize: '18px' }}>30% OFF on Physics Wallah Courses</p>
      </div>
    )
  }

  const current = banners[currentIndex]
  const imageUrl = convertGoogleDriveUrl(current.imageUrl)
  const fallbackImage = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%22400%22%3E%3Crect fill=%22%23003d99%22 width=%221200%22 height=%22400%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2248%22 fill=%22white%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22 font-weight=%22bold%22%3ECPCA0300 - 30%25 OFF%3C/text%3E%3C/svg%3E'

  return (
    <div style={{ marginBottom: '40px' }}>
      <div style={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        background: '#f0f0f0',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={imageUrl}
          alt={current.title}
          style={{
            width: '100%',
            height: '400px',
            objectFit: 'cover',
            display: 'block'
          }}
          onError={(e) => {
            console.error('Image failed to load')
            e.target.src = fallbackImage
            e.target.style.height = '400px'
          }}
          onLoad={() => console.log('Image loaded successfully!')}
        />
      </div>

      {banners.length > 1 && (
        <div style={{ textAlign: 'center', marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '8px' }}>
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: idx === currentIndex ? '#003d99' : '#ddd',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default BannerCarousel
