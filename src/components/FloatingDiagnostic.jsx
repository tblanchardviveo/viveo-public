import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FloatingDiagnostic() {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <>
      <style>{`
        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(166,124,82,0.55), 0 4px 24px rgba(166,124,82,0.35); }
          40%       { box-shadow: 0 0 0 14px rgba(166,124,82,0), 0 4px 24px rgba(166,124,82,0.35); }
          80%       { box-shadow: 0 0 0 0 rgba(166,124,82,0), 0 4px 24px rgba(166,124,82,0.35); }
        }
      `}</style>
      <button
        onClick={() => navigate('/rdv-decouverte')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Diagnostic VEFA gratuit"
        style={{
          position: 'fixed',
          bottom: 32,
          right: 28,
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          background: '#A67C52',
          color: '#fff',
          border: 'none',
          borderRadius: 32,
          height: 52,
          padding: '0 16px 0 14px',
          cursor: 'pointer',
          animation: 'fabPulse 9s ease-in-out infinite',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        <svg
          width="22" height="22" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="1.7"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ flexShrink: 0 }}
        >
          <path d="M3 12L12 3l9 9" />
          <path d="M9 21V12h6v9" />
        </svg>
        <span style={{
          maxWidth: hovered ? 180 : 0,
          opacity: hovered ? 1 : 0,
          overflow: 'hidden',
          transition: 'max-width 0.35s ease, opacity 0.25s ease, margin-left 0.35s ease',
          fontFamily: "'Raleway', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          marginLeft: hovered ? 10 : 0,
        }}>
          Diagnostic VEFA gratuit
        </span>
      </button>
    </>
  )
}
