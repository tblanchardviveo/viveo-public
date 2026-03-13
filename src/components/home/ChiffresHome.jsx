import { useState, useEffect } from 'react'
import { useReveal } from '../../hooks/useReveal'

function useCounter(target, duration = 1500, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [active, target, duration])
  return count
}

export default function ChiffresHome() {
  const [ref, visible] = useReveal(0.3)
  const c27 = useCounter(27, 1500, visible)
  const c100 = useCounter(100, 1500, visible)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  const numStyle = {
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: isMobile ? 'clamp(64px,15vw,96px)' : 'clamp(80px,12vw,160px)',
    fontWeight: 300, color: '#fff', lineHeight: 1
  }
  const labelStyle = {
    fontFamily: "'Raleway', sans-serif", fontWeight: 500,
    fontSize: 11, textTransform: 'uppercase',
    letterSpacing: '0.25em', color: 'rgba(255,255,255,0.40)', marginTop: 16
  }
  const detailStyle = {
    fontFamily: "'Raleway', sans-serif", fontWeight: 300,
    fontSize: 14, color: '#C4976A', marginTop: 8
  }
  const sepStyle = isMobile
    ? { width: 60, height: 1, background: 'rgba(166,124,82,0.30)', flexShrink: 0 }
    : { width: 1, height: 120, background: 'rgba(166,124,82,0.30)', flexShrink: 0 }

  return (
    <section ref={ref} data-bg="#111C33" style={{ background: '#111C33', padding: isMobile ? '10vh 6vw' : '15vh 6vw' }}>
      <div style={{
        ...s,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'center', alignItems: 'center',
        gap: isMobile ? 48 : 0
      }}>
        <div style={{ flex: 1, textAlign: 'center', padding: '0 40px' }}>
          <div style={numStyle}>{c27}</div>
          <div style={labelStyle}>{"ANS D'EXP\u00c9RIENCE"}</div>
          <div style={detailStyle}>{"c\u00f4t\u00e9 promoteur"}</div>
        </div>
        <div style={sepStyle} />
        <div style={{ flex: 1, textAlign: 'center', padding: '0 40px' }}>
          <div style={numStyle}>{c100}%</div>
          <div style={labelStyle}>{"IND\u00c9PENDANT"}</div>
          <div style={detailStyle}>{"aucune exclusivit\u00e9 promoteur"}</div>
        </div>
        <div style={sepStyle} />
        <div style={{ flex: 1, textAlign: 'center', padding: '0 40px' }}>
          <div style={numStyle}>{"A\u2192Z"}</div>
          <div style={labelStyle}>ACCOMPAGNEMENT</div>
          <div style={detailStyle}>{"de la recherche \u00e0 la remise des cl\u00e9s"}</div>
        </div>
      </div>
    </section>
  )
}
