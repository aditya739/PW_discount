import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Offers from './pages/Offers'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { authAPI } from './services/api'

const ProtectedRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.verify()
        .then(() => setIsAuth(true))
        .catch(() => {
          localStorage.removeItem('token')
          setIsAuth(false)
        })
    } else {
      setIsAuth(false)
    }
  }, [])

  if (isAuth === null) return <div>Loading...</div>
  return isAuth ? children : <Navigate to="/admin/login" />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
