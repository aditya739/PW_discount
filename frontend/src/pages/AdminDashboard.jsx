import React, { useState, useEffect } from 'react'
import CouponCard from '../components/CouponCard'
import { couponAPI, bannerAPI, analyticsAPI } from '../services/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('coupons')
  const [coupons, setCoupons] = useState([])
  const [banners, setBanners] = useState([])
  const [analytics, setAnalytics] = useState([])
  const [formData, setFormData] = useState({})
  const [bannerFormData, setBannerFormData] = useState({})
  const [imageSection, setImageSection] = useState({
    headline: 'CPCA0300 - 30% OFF',
    imageUrl: '',
    description: 'Physics Wallah Exclusive Offer'
  })
  const [previewCoupon, setPreviewCoupon] = useState(null)
  const [editingBannerId, setEditingBannerId] = useState(null)

  useEffect(() => {
    loadData()
    loadImageSection()
  }, [activeTab])

  const loadData = async () => {
    try {
      if (activeTab === 'coupons') {
        const res = await couponAPI.getAll()
        setCoupons(res.data)
      } else if (activeTab === 'banners') {
        const res = await bannerAPI.getAll()
        setBanners(res.data)
      } else if (activeTab === 'analytics') {
        const res = await analyticsAPI.getAll()
        setAnalytics(res.data)
      }
    } catch (err) {
      console.error('Failed to load data:', err)
    }
  }

  const loadImageSection = () => {
    const saved = localStorage.getItem('imageSection')
    if (saved) {
      setImageSection(JSON.parse(saved))
    }
  }

  const handleSaveImageSection = () => {
    localStorage.setItem('imageSection', JSON.stringify(imageSection))
    alert('✅ Image section saved successfully')
  }

  const handleCreateCoupon = async (e) => {
    e.preventDefault()
    try {
      await couponAPI.create(formData)
      setFormData({})
      setPreviewCoupon(null)
      loadData()
      alert('✅ Coupon created successfully')
    } catch (err) {
      alert('❌ Failed to create coupon')
    }
  }

  const handleDeleteCoupon = async (id) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        await couponAPI.delete(id)
        loadData()
      } catch (err) {
        alert('Failed to delete coupon')
      }
    }
  }

  const handleCreateBanner = async (e) => {
    e.preventDefault()
    try {
      if (editingBannerId) {
        await bannerAPI.update(editingBannerId, bannerFormData)
        alert('✅ Banner updated successfully')
        setEditingBannerId(null)
      } else {
        await bannerAPI.create(bannerFormData)
        alert('✅ Banner created successfully')
      }
      setBannerFormData({})
      loadData()
    } catch (err) {
      alert('❌ Failed to save banner')
    }
  }

  const handleEditBanner = (banner) => {
    setEditingBannerId(banner._id)
    setBannerFormData({
      title: banner.title,
      imageUrl: banner.imageUrl,
      startDate: banner.startDate.split('T')[0] + 'T' + banner.startDate.split('T')[1].split('.')[0],
      endDate: banner.endDate.split('T')[0] + 'T' + banner.endDate.split('T')[1].split('.')[0],
      placement: banner.placement,
      couponCode: banner.couponCode._id
    })
  }

  const handleDeleteBanner = async (id) => {
    if (window.confirm('Delete this banner?')) {
      try {
        await bannerAPI.delete(id)
        loadData()
      } catch (err) {
        alert('Failed to delete banner')
      }
    }
  }

  const handlePreview = () => {
    if (formData.code && formData.discount && formData.endDate) {
      setPreviewCoupon({
        code: formData.code.toUpperCase(),
        discount: formData.discount,
        discountType: formData.discountType || 'percentage',
        description: formData.description || 'Special Offer',
        endDate: formData.endDate,
        currentUsage: 0,
        totalUsageLimit: formData.totalUsageLimit
      })
    } else {
      alert('Please fill in Code, Discount, and End Date to preview')
    }
  }

  return (
    <div className="container" style={{ marginTop: '30px', animation: 'fadeIn 0.6s ease-out' }}>
      <h1 style={{ 
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #007bff, #0056b3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        📊 Admin Dashboard
      </h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button
          className={`btn ${activeTab === 'coupons' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('coupons')}
          style={{ animation: 'slideInLeft 0.5s ease-out' }}
        >
          🎟️ Coupons
        </button>
        <button
          className={`btn ${activeTab === 'banners' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('banners')}
          style={{ animation: 'slideInLeft 0.6s ease-out' }}
        >
          🖼️ Banners
        </button>
        <button
          className={`btn ${activeTab === 'images' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('images')}
          style={{ animation: 'slideInLeft 0.65s ease-out' }}
        >
          🖼️ Hero Image
        </button>
        <button
          className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('analytics')}
          style={{ animation: 'slideInLeft 0.7s ease-out' }}
        >
          📈 Analytics
        </button>
      </div>

      {activeTab === 'images' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Hero Image Section</h2>

          <form style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <div>
                <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>Headline</label>
                <input
                  type="text"
                  placeholder="Enter headline (e.g., CPCA0300 - 30% OFF)"
                  value={imageSection.headline}
                  onChange={(e) => setImageSection({ ...imageSection, headline: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>Description</label>
                <input
                  type="text"
                  placeholder="Enter description"
                  value={imageSection.description}
                  onChange={(e) => setImageSection({ ...imageSection, description: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
                />
              </div>

              <div>
                <label style={{ fontWeight: '600', color: '#333', display: 'block', marginBottom: '8px' }}>Image URL</label>
                <input
                  type="text"
                  placeholder="Paste image URL (Google Drive, Unsplash, etc.)"
                  value={imageSection.imageUrl}
                  onChange={(e) => setImageSection({ ...imageSection, imageUrl: e.target.value })}
                  style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
                />
                <p style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                  💡 Tip: Use Google Drive link or Unsplash URL
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSaveImageSection}
              className="btn btn-primary"
              style={{ marginTop: '15px' }}
            >
              💾 Save Image Section
            </button>
          </form>

          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            border: '2px solid #e5e5e5'
          }}>
            <h3 style={{ marginBottom: '20px', color: '#1a1a2e' }}>Preview</h3>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              background: '#f0f0f0',
              minHeight: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {imageSection.imageUrl ? (
                <img
                  src={imageSection.imageUrl}
                  alt="Preview"
                  style={{
                    width: '100%',
                    height: '300px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/1200x300/003d99/FFFFFF?text=Image+Preview'
                  }}
                />
              ) : (
                <div style={{ textAlign: 'center', color: '#999' }}>
                  <p style={{ fontSize: '18px' }}>No image URL provided</p>
                </div>
              )}
            </div>
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              <h4 style={{ color: '#003d99', fontSize: '24px', fontWeight: '700' }}>{imageSection.headline}</h4>
              <p style={{ color: '#666', marginTop: '8px' }}>{imageSection.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Coupons</h2>
          
          <form onSubmit={handleCreateCoupon} style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                type="text"
                placeholder="Coupon Code"
                value={formData.code || ''}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <input
                type="number"
                placeholder="Discount %"
                value={formData.discount || ''}
                onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={formData.startDate || ''}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <input
                type="datetime-local"
                placeholder="End Date"
                value={formData.endDate || ''}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <input
                type="number"
                placeholder="Usage Limit"
                value={formData.totalUsageLimit || ''}
                onChange={(e) => setFormData({ ...formData, totalUsageLimit: e.target.value })}
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
              <input
                type="text"
                placeholder="Description"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px', transition: 'all 0.3s ease' }}
                onFocus={(e) => e.target.style.borderColor = '#007bff'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary">
                ➕ Create Coupon
              </button>
              <button type="button" onClick={handlePreview} className="btn btn-secondary">
                👁️ Preview Design
              </button>
            </div>
          </form>

          {previewCoupon && (
            <div style={{ marginBottom: '30px', padding: '20px', background: '#e7f3ff', borderRadius: '8px', border: '2px solid #007bff' }}>
              <h3 style={{ marginBottom: '15px', color: '#007bff' }}>🎨 Design Preview</h3>
              <CouponCard coupon={previewCoupon} />
            </div>
          )}

          <table style={{ width: '100%', borderCollapse: 'collapse', animation: 'fadeIn 0.8s ease-out' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Code</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Discount</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Usage</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Expires</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon, idx) => (
                <tr key={coupon._id} style={{ borderBottom: '1px solid #ddd', animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#007bff' }}>{coupon.code}</td>
                  <td style={{ padding: '10px' }}>{coupon.discount}%</td>
                  <td style={{ padding: '10px' }}>{coupon.currentUsage}/{coupon.totalUsageLimit || '∞'}</td>
                  <td style={{ padding: '10px' }}>{new Date(coupon.endDate).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleDeleteCoupon(coupon._id)}
                      style={{ fontSize: '12px', padding: '5px 10px' }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'banners' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Banners</h2>

          <form onSubmit={handleCreateBanner} style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input
                type="text"
                placeholder="Banner Title"
                value={bannerFormData.title || ''}
                onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              />
              <input
                type="text"
                placeholder="Image URL"
                value={bannerFormData.imageUrl || ''}
                onChange={(e) => setBannerFormData({ ...bannerFormData, imageUrl: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              />
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={bannerFormData.startDate || ''}
                onChange={(e) => setBannerFormData({ ...bannerFormData, startDate: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              />
              <input
                type="datetime-local"
                placeholder="End Date"
                value={bannerFormData.endDate || ''}
                onChange={(e) => setBannerFormData({ ...bannerFormData, endDate: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              />
              <select
                value={bannerFormData.placement || 'hero'}
                onChange={(e) => setBannerFormData({ ...bannerFormData, placement: e.target.value })}
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              >
                <option value="hero">Hero</option>
                <option value="sticky">Sticky</option>
                <option value="sidebar">Sidebar</option>
              </select>
              <select
                value={bannerFormData.couponCode || ''}
                onChange={(e) => setBannerFormData({ ...bannerFormData, couponCode: e.target.value })}
                required
                style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}
              >
                <option value="">Select Coupon</option>
                {coupons.map(coupon => (
                  <option key={coupon._id} value={coupon._id}>{coupon.code}</option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary">
                {editingBannerId ? '✏️ Update Banner' : '➕ Create Banner'}
              </button>
              {editingBannerId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBannerId(null)
                    setBannerFormData({})
                  }}
                  className="btn btn-secondary"
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {banners.map((banner, idx) => (
              <div
                key={banner._id}
                style={{
                  background: 'white',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`,
                  border: editingBannerId === banner._id ? '2px solid #007bff' : '1px solid #e0e0e0'
                }}
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Banner'
                  }}
                />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '10px', color: '#1a1a2e' }}>{banner.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                    {new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}
                  </p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => handleEditBanner(banner)}
                      className="btn btn-primary"
                      style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner._id)}
                      className="btn btn-secondary"
                      style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Analytics</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)' }}>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Coupon</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>User ID</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Discount</th>
                <th style={{ padding: '10px', textAlign: 'left', borderBottom: '2px solid #007bff' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {analytics.map((record, idx) => (
                <tr key={record._id} style={{ borderBottom: '1px solid #ddd', animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
                  <td style={{ padding: '10px', fontWeight: 'bold' }}>{record.couponCode?.code || 'N/A'}</td>
                  <td style={{ padding: '10px' }}>{record.userId}</td>
                  <td style={{ padding: '10px' }}>₹{record.discountAmount}</td>
                  <td style={{ padding: '10px' }}>{new Date(record.redemptionDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
