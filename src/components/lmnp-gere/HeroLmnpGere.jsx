import { useState, useEffect } from 'react'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52'
}

export default function HeroLmnpGere() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pills = [
    '\u2713 TVA r\u00e9cup\u00e9r\u00e9e',
    '\u2713 Loyers garantis',
    '\u2713 Revenus d\u00e9fiscalis\u00e9s'
  ]

  return (
    <section style={{
      height: '100vh', position: 'relative', overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('${WP}/wp-content/uploads/2026/03/IMG_0660.png')`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(40% + ${scrollY * 0.35}px)`
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg,rgba(17,28,51,0.10) 0%,rgba(17,28,51,0.55) 45%,rgba(17,28,51,0.95) 80%,rgba(17,28,51,1) 100%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 50% at 20% 80%,rgba(166,124,82,0.10) 0%,transparent 60%)'
      }} />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 6vw 8vh', zIndex: 2,
        animation: 'fadeUp 1.2s ease both 0.15s'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
          <span style={eyeLine} /><span style={eyeText}>{'LMNP G\u00c9R\u00c9 \u00b7 R\u00c9SIDENCES SERVICES'}</span>
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300,
          fontSize: 'clamp(44px,7vw,96px)', lineHeight: 0.95,
          letterSpacing: '-0.02em', color: '#fff', margin: 0
        }}>
          {'Investir l\u00e0 o\u00f9 la d\u00e9mographie'}<br />
          <em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'travaille pour vous.'}</em>
        </h1>
        <div style={{ display: 'flex', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
          {pills.map((p, i) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(166,124,82,0.30)',
              borderRadius: 99, padding: '10px 20px',
              fontFamily: "'Raleway',sans-serif", fontWeight: 500,
              fontSize: 12, color: '#fff', letterSpacing: '0.06em'
            }}>{p}</span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 32, marginTop: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <a href="#simulateur" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#A67C52,#C4976A)',
            color: '#fff', borderRadius: 2, padding: '18px 40px',
            fontFamily: "'Raleway',sans-serif", fontWeight: 600,
            fontSize: 14, letterSpacing: '0.06em',
            textTransform: 'uppercase', textDecoration: 'none'
          }}>{'Simuler mon investissement \u2192'}</a>
          <a href={`${WP}/rdv-decouverte/`} style={{
            fontFamily: "'Raleway',sans-serif", fontWeight: 500,
            fontSize: 14, color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none', letterSpacing: '0.04em'
          }}>{'Prendre RDV \u2192'}</a>
        </div>
      </div>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </section>
  )
}
