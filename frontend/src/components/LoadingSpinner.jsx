import React from 'react'

const LoadingSpinner = ({ fullScreen = false, message = 'Loading...' }) => {
  const containerStyle = fullScreen ? {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-out'
  } : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    minHeight: '400px'
  }

  return (
    <div style={containerStyle}>
      {/* Animated Logo/Icon */}
      <div style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        marginBottom: '24px'
      }}>
        {/* Outer rotating ring */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '4px solid transparent',
          borderTopColor: '#0066cc',
          borderRightColor: '#0066cc',
          borderRadius: '50%',
          animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite'
        }} />
        
        {/* Middle rotating ring */}
        <div style={{
          position: 'absolute',
          width: '70%',
          height: '70%',
          top: '15%',
          left: '15%',
          border: '3px solid transparent',
          borderBottomColor: '#004499',
          borderLeftColor: '#004499',
          borderRadius: '50%',
          animation: 'spin 1.5s cubic-bezier(0.5, 0, 0.5, 1) infinite reverse'
        }} />
        
        {/* Center pulsing dot */}
        <div style={{
          position: 'absolute',
          width: '20px',
          height: '20px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'linear-gradient(135deg, #0066cc, #004499)',
          borderRadius: '50%',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>

      {/* Loading Text */}
      <div style={{
        fontSize: '18px',
        fontWeight: '600',
        color: '#1d1d1f',
        marginBottom: '8px',
        animation: 'fadeIn 0.5s ease-out 0.2s both'
      }}>
        {message}
      </div>

      {/* Animated dots */}
      <div style={{
        display: 'flex',
        gap: '6px',
        animation: 'fadeIn 0.5s ease-out 0.4s both'
      }}>
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#0066cc',
          animation: 'bounce 1.4s ease-in-out infinite'
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#0066cc',
          animation: 'bounce 1.4s ease-in-out 0.2s infinite'
        }} />
        <div style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#0066cc',
          animation: 'bounce 1.4s ease-in-out 0.4s infinite'
        }} />
      </div>

      {/* Inline styles for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.3);
            opacity: 0.7;
          }
        }

        @keyframes bounce {
          0%, 80%, 100% { 
            transform: translateY(0);
            opacity: 0.5;
          }
          40% { 
            transform: translateY(-12px);
            opacity: 1;
          }
        }

        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(10px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingSpinner
