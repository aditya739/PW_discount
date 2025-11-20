import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import CouponCard from '../components/CouponCard'
import { couponAPI, bannerAPI, analyticsAPI, authAPI, heroImageAPI, noticeAPI, mainDivAPI, courseCategoryAPI } from '../services/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('coupons')
  const [coupons, setCoupons] = useState([])
  const [banners, setBanners] = useState([])
  const [analytics, setAnalytics] = useState([])
  const [formData, setFormData] = useState({})
  const [bannerFormData, setBannerFormData] = useState({})
  const [heroImages, setHeroImages] = useState([])
  const [mainDivs, setMainDivs] = useState([])
  const [courseCategories, setCourseCategories] = useState([])
  const [heroFormData, setHeroFormData] = useState({ imageUrl: '', title: '', position: 'left' })
  const [mainDivFormData, setMainDivFormData] = useState({ title: '', headline: '', subHeadline: '', offerCode: '', discountText: '', buttonText: 'Explore All Courses', buttonLink: '/offers', backgroundImageUrl: '' })
  const [categoryFormData, setCategoryFormData] = useState({ name: '', discountText: '', applicableCode: '', iconUrl: '' })
  const [editingImageId, setEditingImageId] = useState(null)
  const [editingMainDivId, setEditingMainDivId] = useState(null)
  const [editingCategoryId, setEditingCategoryId] = useState(null)
  const [notices, setNotices] = useState([])
  const [noticeMap, setNoticeMap] = useState({}) // Map notice text to ID for deletion
  const [noticeInput, setNoticeInput] = useState('')
  const [previewCoupon, setPreviewCoupon] = useState(null)
  const [editingBannerId, setEditingBannerId] = useState(null)
  const [isAuthorized, setIsAuthorized] = useState(null)

  useEffect(() => {
    // Check admin authorization
    const verifyAdmin = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setIsAuthorized(false)
          return
        }
        
        const res = await authAPI.verify()
        if (res.data.valid) {
          setIsAuthorized(true)
        } else {
          setIsAuthorized(false)
        }
      } catch (err) {
        console.error('Auth verification failed:', err)
        setIsAuthorized(false)
      }
    }
    
    verifyAdmin()
  }, [])

  useEffect(() => {
    if (isAuthorized) {
      loadData()
      loadImageSection()
    }
  }, [activeTab, isAuthorized])

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

  const loadImageSection = async () => {
    try {
      const [imagesRes, noticesRes, mainDivsRes, categoriesRes] = await Promise.all([
        heroImageAPI.getAll(),
        noticeAPI.getAll(),
        mainDivAPI.getAdminAll(),
        courseCategoryAPI.getAll()
      ])
      setHeroImages(imagesRes.data || [])
      setMainDivs(mainDivsRes.data || [])
      setCourseCategories(categoriesRes.data || [])
      
      // Create a map of text to ID for easy deletion
      const noticesData = noticesRes.data || []
      setNotices(noticesData.map(n => n.text))
      const map = {}
      noticesData.forEach(n => {
        map[n.text] = n._id
      })
      setNoticeMap(map)
    } catch (err) {
      console.error('Failed to load images and notices:', err)
    }
  }

  const handleAddHeroImage = async () => {
    if (heroFormData.imageUrl && heroFormData.title) {
      try {
        if (editingImageId) {
          await heroImageAPI.update(editingImageId, {
            imageUrl: heroFormData.imageUrl,
            title: heroFormData.title,
            position: heroFormData.position,
            headline: heroFormData.headline,
            subHeadline: heroFormData.subHeadline,
            offerCode: heroFormData.offerCode,
            discountText: heroFormData.discountText,
            buttonText: heroFormData.buttonText,
            buttonLink: heroFormData.buttonLink
          })
          alert('✅ Hero image updated')
          setEditingImageId(null)
        } else {
          await heroImageAPI.create({
            imageUrl: heroFormData.imageUrl,
            title: heroFormData.title,
            position: heroFormData.position,
            headline: heroFormData.headline,
            subHeadline: heroFormData.subHeadline,
            offerCode: heroFormData.offerCode,
            discountText: heroFormData.discountText,
            buttonText: heroFormData.buttonText,
            buttonLink: heroFormData.buttonLink
          })
          alert('✅ Hero image added')
        }
        setHeroFormData({ imageUrl: '', title: '', position: 'left' })
        await loadImageSection()
      } catch (err) {
        console.error('Error saving hero image:', err)
        alert('❌ Failed to save hero image')
      }
    }
  }

  const handleDeleteHeroImage = async (id) => {
    try {
      await heroImageAPI.delete(id)
      await loadImageSection()
      alert('✅ Hero image deleted')
    } catch (err) {
      alert('❌ Failed to delete hero image')
    }
  }

  const handleAddMainDiv = async () => {
    if (mainDivFormData.title) {
      try {
        if (editingMainDivId) {
          await mainDivAPI.update(editingMainDivId, mainDivFormData)
          alert('✅ Main Div updated')
          setEditingMainDivId(null)
        } else {
          await mainDivAPI.create(mainDivFormData)
          alert('✅ Main Div added')
        }
        setMainDivFormData({ title: '', headline: '', subHeadline: '', offerCode: '', discountText: '', buttonText: 'Explore All Courses', buttonLink: '/offers', backgroundImageUrl: '' })
        await loadImageSection()
      } catch (err) {
        console.error('Error saving main div:', err)
        alert('❌ Failed to save main div')
      }
    }
  }

  const handleDeleteMainDiv = async (id) => {
    try {
      await mainDivAPI.delete(id)
      await loadImageSection()
      alert('✅ Main Div deleted')
    } catch (err) {
      alert('❌ Failed to delete main div')
    }
  }

  const handleEditMainDiv = (div) => {
    setEditingMainDivId(div._id || div.id)
    setMainDivFormData(div)
  }

  const handleAddCategory = async () => {
    if (categoryFormData.name && categoryFormData.applicableCode) {
      try {
        if (editingCategoryId) {
          await courseCategoryAPI.update(editingCategoryId, categoryFormData)
          alert('✅ Category updated')
          setEditingCategoryId(null)
        } else {
          await courseCategoryAPI.create(categoryFormData)
          alert('✅ Category added')
        }
        setCategoryFormData({ name: '', discountText: '', applicableCode: '', iconUrl: '' })
        await loadImageSection()
      } catch (err) {
        alert('❌ Failed to save category')
      }
    }
  }

  const handleDeleteCategory = async (id) => {
    try {
      await courseCategoryAPI.delete(id)
      await loadImageSection()
      alert('✅ Category deleted')
    } catch (err) {
      alert('❌ Failed to delete category')
    }
  }

  const handleEditCategory = (cat) => {
    setEditingCategoryId(cat._id || cat.id)
    setCategoryFormData(cat)
  }

  const handleEditHeroImage = (image) => {
    setEditingImageId(image._id || image.id)
    setHeroFormData(image)
  }

  const handleAddNotice = async () => {
    if (noticeInput.trim()) {
      try {
        await noticeAPI.create({ text: noticeInput })
        setNoticeInput('')
        await loadImageSection()
        alert('✅ Notice added successfully')
      } catch (err) {
        alert('❌ Failed to add notice')
      }
    }
  }

  const handleDeleteNotice = async (noticeText) => {
    try {
      const noticeId = noticeMap[noticeText]
      if (noticeId) {
        await noticeAPI.delete(noticeId)
        await loadImageSection()
      }
    } catch (err) {
      alert('❌ Failed to delete notice')
    }
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
    <>
      {isAuthorized === null && (
        <div style={{ padding: '100px 20px', textAlign: 'center' }}>
          <h2>Verifying access...</h2>
        </div>
      )}
      
      {isAuthorized === false && <Navigate to="/admin/login" />}
      
      {isAuthorized === true && (
        <div className="container" style={{ marginTop: '30px', animation: 'fadeIn 0.6s ease-out' }}>
      <h1 style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #007bff, #0056b3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        📊 Admin Dashboard
      </h1>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button className={`btn ${activeTab === 'coupons' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('coupons')} style={{ animation: 'slideInLeft 0.5s ease-out' }}>🎟️ Coupons</button>
        <button className={`btn ${activeTab === 'banners' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('banners')} style={{ animation: 'slideInLeft 0.6s ease-out' }}>🖼️ Banners</button>
        <button className={`btn ${activeTab === 'mainDiv' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('mainDiv')} style={{ animation: 'slideInLeft 0.62s ease-out' }}>⭐ Main Div</button>
        <button className={`btn ${activeTab === 'categories' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('categories')} style={{ animation: 'slideInLeft 0.64s ease-out' }}>📚 Course Offers</button>
        <button className={`btn ${activeTab === 'images' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('images')} style={{ animation: 'slideInLeft 0.65s ease-out' }}>🖼️ Hero Images</button>
        <button className={`btn ${activeTab === 'notices' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('notices')} style={{ animation: 'slideInLeft 0.7s ease-out' }}>📢 Notices</button>
        <button className={`btn ${activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveTab('analytics')} style={{ animation: 'slideInLeft 0.75s ease-out' }}>📈 Analytics</button>
      </div>

      {activeTab === 'mainDiv' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Main Div (Hero Section)</h2>
          <form style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <input type="text" placeholder="Internal Title (e.g. Main Hero)" value={mainDivFormData.title} onChange={(e) => setMainDivFormData({ ...mainDivFormData, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Background Image URL" value={mainDivFormData.backgroundImageUrl} onChange={(e) => setMainDivFormData({ ...mainDivFormData, backgroundImageUrl: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Headline" value={mainDivFormData.headline || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, headline: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Sub Headline" value={mainDivFormData.subHeadline || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, subHeadline: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Offer Code" value={mainDivFormData.offerCode || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, offerCode: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Discount Text" value={mainDivFormData.discountText || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, discountText: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Button Text" value={mainDivFormData.buttonText || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, buttonText: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Button Link" value={mainDivFormData.buttonLink || ''} onChange={(e) => setMainDivFormData({ ...mainDivFormData, buttonLink: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="button" onClick={handleAddMainDiv} className="btn btn-primary">
                {editingMainDivId ? '✏️ Update Main Div' : '➕ Add Main Div'}
              </button>
              {editingMainDivId && (
                <button type="button" onClick={() => { setEditingMainDivId(null); setMainDivFormData({ title: '', headline: '', subHeadline: '', offerCode: '', discountText: '', buttonText: 'Explore All Courses', buttonLink: '/offers', backgroundImageUrl: '' }) }} className="btn btn-secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {mainDivs.map((div, idx) => (
              <div key={div._id || div.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both` }}>
                <div style={{ height: '100px', background: div.backgroundImageUrl ? `url(${div.backgroundImageUrl}) center/cover` : '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {!div.backgroundImageUrl && <span style={{ color: '#999' }}>No Image</span>}
                </div>
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '5px', color: '#1a1a2e' }}>{div.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>Headline: {div.headline}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEditMainDiv(div)} className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>✏️ Edit</button>
                    <button onClick={() => handleDeleteMainDiv(div._id || div.id)} className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {mainDivs.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No main div configured. Add one to get started!</p>}
        </div>
      )}

      {activeTab === 'categories' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Course Offers</h2>
          <form style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Category Name (e.g. JEE)" value={categoryFormData.name} onChange={(e) => setCategoryFormData({ ...categoryFormData, name: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Discount Text (e.g. 10% OFF)" value={categoryFormData.discountText} onChange={(e) => setCategoryFormData({ ...categoryFormData, discountText: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Applicable Code (e.g. CPCA0300)" value={categoryFormData.applicableCode} onChange={(e) => setCategoryFormData({ ...categoryFormData, applicableCode: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Icon URL (Optional)" value={categoryFormData.iconUrl || ''} onChange={(e) => setCategoryFormData({ ...categoryFormData, iconUrl: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="button" onClick={handleAddCategory} className="btn btn-primary">
                {editingCategoryId ? '✏️ Update Category' : '➕ Add Category'}
              </button>
              {editingCategoryId && (
                <button type="button" onClick={() => { setEditingCategoryId(null); setCategoryFormData({ name: '', discountText: '', applicableCode: '', iconUrl: '' }) }} className="btn btn-secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {courseCategories.map((cat, idx) => (
              <div key={cat._id || idx} style={{ background: 'white', borderRadius: '8px', padding: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', gap: '10px', animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {cat.iconUrl && <img src={cat.iconUrl} alt="" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />}
                  <h4 style={{ margin: 0, color: '#1a1a2e' }}>{cat.name}</h4>
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  <p style={{ margin: '5px 0' }}><strong>Discount:</strong> {cat.discountText}</p>
                  <p style={{ margin: '5px 0' }}><strong>Code:</strong> <span style={{ color: '#007bff', fontWeight: 'bold' }}>{cat.applicableCode}</span></p>
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                  <button onClick={() => handleEditCategory(cat)} className="btn btn-primary" style={{ fontSize: '12px', padding: '5px', flex: 1 }}>✏️ Edit</button>
                  <button onClick={() => handleDeleteCategory(cat._id || cat.id)} className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px', flex: 1 }}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'images' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Hero Images</h2>

          <form style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <input type="text" placeholder="Image Title" value={heroFormData.title} onChange={(e) => setHeroFormData({ ...heroFormData, title: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Image URL (Google Drive, Unsplash, etc.)" value={heroFormData.imageUrl} onChange={(e) => setHeroFormData({ ...heroFormData, imageUrl: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Headline (e.g. UNLOCK YOUR EXAM BOOST)" value={heroFormData.headline || ''} onChange={(e) => setHeroFormData({ ...heroFormData, headline: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Sub Headline" value={heroFormData.subHeadline || ''} onChange={(e) => setHeroFormData({ ...heroFormData, subHeadline: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Offer Code (e.g. CPCA0300)" value={heroFormData.offerCode || ''} onChange={(e) => setHeroFormData({ ...heroFormData, offerCode: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Discount Text (e.g. 30% OFF)" value={heroFormData.discountText || ''} onChange={(e) => setHeroFormData({ ...heroFormData, discountText: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <input type="text" placeholder="Button Text" value={heroFormData.buttonText || ''} onChange={(e) => setHeroFormData({ ...heroFormData, buttonText: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
                <input type="text" placeholder="Button Link" value={heroFormData.buttonLink || ''} onChange={(e) => setHeroFormData({ ...heroFormData, buttonLink: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              </div>

              <select value={heroFormData.position} onChange={(e) => setHeroFormData({ ...heroFormData, position: e.target.value })} style={{ width: '100%', padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}>
                <option value="left">Left Sidebar</option>
                <option value="right">Right Sidebar</option>
                <option value="top">Top Banner</option>
                <option value="bottom">Bottom Banner</option>
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="button" onClick={handleAddHeroImage} className="btn btn-primary">
                {editingImageId ? '✏️ Update Image' : '➕ Add Image'}
              </button>
              {editingImageId && (
                <button type="button" onClick={() => { setEditingImageId(null); setHeroFormData({ imageUrl: '', title: '', position: 'left' }) }} className="btn btn-secondary">
                  ❌ Cancel
                </button>
              )}
            </div>
          </form>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {heroImages.map((image, idx) => (
              <div key={image._id || image.id} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both` }}>
                <img src={image.imageUrl} alt={image.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22200%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22200%22/%3E%3C/svg%3E' }} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '5px', color: '#1a1a2e' }}>{image.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>Position: {image.position}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEditHeroImage(image)} className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>✏️ Edit</button>
                    <button onClick={() => handleDeleteHeroImage(image._id || image.id)} className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>🗑️ Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {heroImages.length === 0 && <p style={{ textAlign: 'center', color: '#999', marginTop: '20px' }}>No hero images yet. Add one to get started!</p>}
        </div>
      )}

      {activeTab === 'notices' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Notices</h2>
          <div style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
              <input type="text" placeholder="Enter notice text..." value={noticeInput} onChange={(e) => setNoticeInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAddNotice()} style={{ flex: 1, padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <button onClick={handleAddNotice} className="btn btn-primary">➕ Add Notice</button>
            </div>
          </div>
          <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', padding: '20px' }}>
            <h3 style={{ marginBottom: '15px', color: '#1a1a2e' }}>Current Notices</h3>
            {notices.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {notices.map((notice, idx) => (
                  <div key={idx} style={{ background: '#fff3cd', border: '2px solid #ffc107', borderRadius: '6px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#856404', fontWeight: '500' }}>{notice}</span>
                    <button onClick={() => handleDeleteNotice(notice)} className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px' }}>🗑️ Delete</button>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#999', textAlign: 'center' }}>No notices yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'coupons' && (
        <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
          <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Manage Coupons</h2>
          <form onSubmit={handleCreateCoupon} style={{ marginBottom: '30px', background: 'linear-gradient(135deg, #f8f9fa, #e8f4f8)', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <input type="text" placeholder="Coupon Code" value={formData.code || ''} onChange={(e) => setFormData({ ...formData, code: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="number" placeholder="Discount %" value={formData.discount || ''} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="datetime-local" placeholder="Start Date" value={formData.startDate || ''} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="datetime-local" placeholder="End Date" value={formData.endDate || ''} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="number" placeholder="Usage Limit" value={formData.totalUsageLimit || ''} onChange={(e) => setFormData({ ...formData, totalUsageLimit: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Description" value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary">➕ Create Coupon</button>
              <button type="button" onClick={handlePreview} className="btn btn-secondary">👁️ Preview Design</button>
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
              {coupons && coupons.map((coupon, idx) => (
                <tr key={coupon._id || idx} style={{ borderBottom: '1px solid #ddd', animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
                  <td style={{ padding: '10px', fontWeight: 'bold', color: '#007bff' }}>{coupon.code}</td>
                  <td style={{ padding: '10px' }}>{coupon.discount}%</td>
                  <td style={{ padding: '10px' }}>{coupon.currentUsage}/{coupon.totalUsageLimit || '∞'}</td>
                  <td style={{ padding: '10px' }}>{new Date(coupon.endDate).toLocaleDateString()}</td>
                  <td style={{ padding: '10px' }}><button className="btn btn-secondary" onClick={() => handleDeleteCoupon(coupon._id)} style={{ fontSize: '12px', padding: '5px 10px' }}>🗑️ Delete</button></td>
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
              <input type="text" placeholder="Banner Title" value={bannerFormData.title || ''} onChange={(e) => setBannerFormData({ ...bannerFormData, title: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="text" placeholder="Image URL" value={bannerFormData.imageUrl || ''} onChange={(e) => setBannerFormData({ ...bannerFormData, imageUrl: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="datetime-local" placeholder="Start Date" value={bannerFormData.startDate || ''} onChange={(e) => setBannerFormData({ ...bannerFormData, startDate: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <input type="datetime-local" placeholder="End Date" value={bannerFormData.endDate || ''} onChange={(e) => setBannerFormData({ ...bannerFormData, endDate: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }} />
              <select value={bannerFormData.placement || 'hero'} onChange={(e) => setBannerFormData({ ...bannerFormData, placement: e.target.value })} style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}>
                <option value="hero">Hero</option>
                <option value="sticky">Sticky</option>
                <option value="sidebar">Sidebar</option>
              </select>
              <select value={bannerFormData.couponCode || ''} onChange={(e) => setBannerFormData({ ...bannerFormData, couponCode: e.target.value })} required style={{ padding: '10px', border: '2px solid #ddd', borderRadius: '4px' }}>
                <option value="">Select Coupon</option>
                {coupons.map(coupon => (<option key={coupon._id} value={coupon._id}>{coupon.code}</option>))}
              </select>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
              <button type="submit" className="btn btn-primary">{editingBannerId ? '✏️ Update Banner' : '➕ Create Banner'}</button>
              {editingBannerId && (<button type="button" onClick={() => { setEditingBannerId(null); setBannerFormData({}) }} className="btn btn-secondary">❌ Cancel</button>)}
            </div>
          </form>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {banners && banners.map((banner, idx) => (
              <div key={banner._id || idx} style={{ background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', animation: `fadeIn 0.6s ease-out ${idx * 0.1}s both`, border: editingBannerId === banner._id ? '2px solid #007bff' : '1px solid #e0e0e0' }}>
                <img src={banner.imageUrl} alt={banner.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=Banner' }} />
                <div style={{ padding: '15px' }}>
                  <h4 style={{ marginBottom: '10px', color: '#1a1a2e' }}>{banner.title}</h4>
                  <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>{new Date(banner.startDate).toLocaleDateString()} - {new Date(banner.endDate).toLocaleDateString()}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEditBanner(banner)} className="btn btn-primary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>✏️ Edit</button>
                    <button onClick={() => handleDeleteBanner(banner._id)} className="btn btn-secondary" style={{ fontSize: '12px', padding: '5px 10px', flex: 1 }}>🗑️ Delete</button>
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
              {analytics && analytics.map((record, idx) => (
                <tr key={record._id || idx} style={{ borderBottom: '1px solid #ddd', animation: `fadeIn 0.6s ease-out ${idx * 0.05}s both` }}>
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
      )}
    </>
  )
}

export default AdminDashboard
