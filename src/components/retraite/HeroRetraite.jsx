import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

export default function HeroRetraite() {
  const [visible, setVisible] = useState(false)
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const target = 47
    const duration = 2000
    const step = duration / target
    let current = 0
    const interval = setInterval(() => {
      current++
      setCount(current)
      if (current >= target) clearInterval(interval)
    }, step)
    return () => clearInterval(interval)
  }, [visible])

  const circleSize = 340
  const stroke = 3
  const radius = (circleSize - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const progress = visible ? 0.47 : 0

  return (
    <section style={{
      minHeight: '100vh',
      background: 'var(--navy-deep)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '120px 24px 80px'
    }}>
      {/* Grain overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 30% 40%, rgba(166,124,82,0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 60
      }}>
        {/* Left: text */}
        <div style={{
          flex: '1 1 480px', minWidth: 300,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{
              fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
            }}>Retraite</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 300,
            color: '#fff', lineHeight: 1.15, marginBottom: 24
          }}>
            Connaissez-vous<br />
            <em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>votre future retraite&nbsp;?</em>
          </h1>

          <p style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 17, fontWeight: 300,
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, maxWidth: 480,
            marginBottom: 40
          }}>
            {"La majorit\u00e9 des actifs fran\u00e7ais d\u00e9couvrent trop tard"}
            {" l'\u00e9cart entre leur dernier salaire et leur pension."}
            <br />
            {"Anticiper, c'est se lib\u00e9rer."}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a href="#simulateur-retraite" style={{
              background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
              color: '#fff', borderRadius: 50, padding: '14px 32px',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif",
              textDecoration: 'none', transition: 'all 0.3s',
              border: 'none', cursor: 'pointer'
            }}>{"Simuler mon \u00e9cart \u2192"}</a>
          </div>
        </div>

        {/* Right: SVG circle */}
        <div style={{
          flex: '0 0 auto', position: 'relative',
          width: circleSize, height: circleSize,
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.8)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.4s'
        }}>
          <svg width={circleSize} height={circleSize} viewBox={`0 0 ${circleSize} ${circleSize}`}>
            {/* Background circle */}
            <circle
              cx={circleSize / 2} cy={circleSize / 2} r={radius}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke}
            />
            {/* Progress arc */}
            <circle
              cx={circleSize / 2} cy={circleSize / 2} r={radius}
              fill="none" stroke="var(--bronze)" strokeWidth={stroke}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              strokeLinecap="round"
              transform={`rotate(-90 ${circleSize / 2} ${circleSize / 2})`}
              style={{ transition: 'stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)' }}
            />
          </svg>
          {/* Center text */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center'
          }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 72, fontWeight: 300, color: '#fff', lineHeight: 1
            }}>{count}<span style={{ fontSize: 40, color: 'var(--bronze)' }}>%</span></span>
            <span style={{
              fontFamily: "'Raleway', sans-serif", fontSize: 12,
              fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.45)', marginTop: 8
            }}>perte moyenne</span>
            <span style={{
              fontFamily: "'Raleway', sans-serif", fontSize: 11,
              fontWeight: 300, color: 'rgba(255,255,255,0.3)', marginTop: 4
            }}>de revenus</span>
          </div>
        </div>
      </div>
    </section>
  )
}
