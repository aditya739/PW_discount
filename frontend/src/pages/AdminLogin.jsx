import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from '../services/api'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await authAPI.login(email, password)
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="container" style={{ maxWidth: '400px', margin: '100px auto', animation: 'fadeIn 0.6s ease-out' }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #007bff, #0056b3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        🔐 Admin Login
      </h2>
      {error && (
        <p style={{ 
          color: 'white', 
          background: '#dc3545', 
          padding: '10px', 
          borderRadius: '4px',
          marginBottom: '15px',
          animation: 'pulse 1s infinite'
        }}>
          ⚠️ {error}
        </p>
      )}
      <form onSubmit={handleSubmit} style={{
        background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '5px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ fontWeight: 'bold', color: '#333' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ 
              width: '100%', 
              padding: '10px', 
              marginTop: '5px',
              border: '2px solid #ddd',
              borderRadius: '4px',
              transition: 'all 0.3s ease',
              fontSize: '14px'
            }}
            onFocus={(e) => e.target.style.borderColor = '#007bff'}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }}>
          🔓 Login
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
