import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function HeroHome() {
  const [scrollY, setScrollY] = useState(0)
  const [ref, visible] = useReveal(0.1)

  useEffect(() => {
    const h = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  const scrollLineKf = `@keyframes scrollLine{0%{transform:scaleY(0);transform-origin:top;opacity:1}50%{transform:scaleY(1);transform-origin:top;opacity:1}51%{transform:scaleY(1);transform-origin:bottom;opacity:1}100%{transform:scaleY(0);transform-origin:bottom;opacity:0}}`
  const heroKf = `@keyframes heroTitle{to{opacity:1;transform:translateY(0)}}@keyframes heroSub{to{opacity:1;transform:translateY(0)}}@keyframes fadeIn{to{opacity:1}}`

  return (
    <section ref={ref} data-bg="#111C33" style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <style>{scrollLineKf}{heroKf}</style>
      {/* BG with parallax */}
      <div style={{
        position: 'absolute', inset: 0,
                  background: "url('/images/IMG_0602.png') center 30% / cover no-repeat",
        backgroundPositionY: `calc(30% + ${scrollY * 0.4}px)`
      }} />
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, rgba(17,28,51,0.15) 0%, rgba(17,28,51,0.50) 40%, rgba(17,28,51,0.92) 75%, rgba(17,28,51,1.00) 100%)'
      }} />
      {/* Bronze radial glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 70% 20%, rgba(166,124,82,0.12) 0%, transparent 60%)'
      }} />
      {/* Content */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 6vw 8vh', zIndex: 2 }}>
        <div style={{ width: 48, height: 1, background: '#A67C52', marginBottom: 24, opacity: 0, animation: 'fadeIn 0.6s cubic-bezier(0.25,0.46,0.45,0.94) 0.1s forwards' }} />
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(52px, 9vw, 110px)', fontWeight: 300,
          lineHeight: 0.95, letterSpacing: '-0.02em', color: '#fff',
          opacity: 0, transform: 'translateY(40px)',
          animation: 'heroTitle 1.2s cubic-bezier(0.25,0.46,0.45,0.94) 0.2s forwards'
        }}>
          {"L'immobilier,"}<br />
          <em style={{ fontStyle: 'italic', color: '#C4976A' }}>{"l'esprit libre."}</em>
        </h1>
        <p style={{
          fontFamily: "'Raleway', sans-serif", fontWeight: 200,
          fontSize: 'clamp(15px, 1.8vw, 20px)', color: 'rgba(255,255,255,0.60)',
          maxWidth: 480, marginTop: 24, lineHeight: 1.6,
          opacity: 0, transform: 'translateY(20px)',
          animation: 'heroSub 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.5s forwards'
        }}>
          {"27 ans d'exp\u00e9rience c\u00f4t\u00e9 promoteur."}<br />
          {"Un conseil ind\u00e9pendant, sans compromis."}
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 40, marginTop: 48,
          opacity: 0, animation: 'heroSub 1s cubic-bezier(0.25,0.46,0.45,0.94) 0.7s forwards'
        }}>
          <Link to="/programmes" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #A67C52, #C4976A)',
            color: '#fff', borderRadius: 2, padding: '16px 36px',
            fontFamily: "'Raleway', sans-serif", fontWeight: 500,
            fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'all 0.3s ease'
          }}>{"Nos programmes \u2192"}</Link>
          <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
            color: 'rgba(255,255,255,0.65)',
            fontFamily: "'Raleway', sans-serif", fontWeight: 500,
            fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
            transition: 'color 0.2s'
          }}>{"RDV D\u00e9couverte \u2192"}</a>
        </div>
      </div>
      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 32, right: '6vw', display: 'flex', alignItems: 'center', gap: 8, zIndex: 2 }}>
        <span style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 11,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.35)'
        }}>{"D\u00c9FILER"}</span>
        <div style={{
          width: 1, height: 40, background: '#A67C52',
          animation: 'scrollLine 2s ease infinite', transformOrigin: 'top'
        }} />
      </div>
    </section>
  )
}
