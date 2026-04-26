import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function HeroV3() {
  const [scrollY, setScrollY] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const pills = ['✓ Indépendant', '✓ 27 ans promoteur', '✓ A→Z']

  return (
    <section style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Background parallax */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/images/IMG_0602.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 25%'
      }} />
      {/* Overlay 1 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(170deg, rgba(17,28,51,0.05) 0%, rgba(17,28,51,0.20) 25%, rgba(17,28,51,0.70) 55%, rgba(17,28,51,0.97) 80%, rgba(17,28,51,1.00) 100%)'
      }} />
      {/* Overlay 2 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 60% 40% at 75% 25%, rgba(166,124,82,0.08) 0%, transparent 65%)'
      }} />
      {/* Overlay 3 */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(17,28,51,0.85) 0%, rgba(17,28,51,0.40) 40%, transparent 70%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 6vw 10vh',
        zIndex: 2
      }}>
        {/* Eyebrow */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s'
        }}>
          <span style={{ width: 32, height: 1, background: '#A67C52' }} />
          <span style={{
            fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
            textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52'
          }}>VIVEO PATRIMOINE</span>
        </div>

        {/* H1 */}
        <h1 style={{
          fontFamily: "'Playfair Display',Georgia,serif",
          fontSize: 'clamp(29px, 10vw, 120px)', fontWeight: 300, lineHeight: 0.90,
          color: '#fff', letterSpacing: '-0.025em', margin: 0,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
        }}>
          {"L'immobilier,"}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{"l'esprit libre."}</em>
        </h1>

        {/* Separator */}
        <div style={{
          width: loaded ? 48 : 0, height: 1, background: '#A67C52', margin: '28px 0',
          transition: 'width 0.8s ease 0.5s'
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 'clamp(16px,2vw,22px)',
          lineHeight: 1.65, color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 0 0',
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(12px)',
          transition: 'opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s'
        }}>
          {"27 ans d'expérience côté promoteur."}<br />
          {"Un conseil indépendant, sans exclusivité,"}<br />
          {"sans conflit d'intérêt."}
        </p>

        {/* Pills */}
        <div style={{
          display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s'
        }}>
          {pills.map((p, i) => (
            <span key={i} style={{
              padding: '10px 18px', borderRadius: 2, fontSize: 11,
              fontFamily: "'Raleway',sans-serif", fontWeight: 500,
              letterSpacing: '0.10em', textTransform: 'uppercase',
              color: '#fff',
              border: '1px solid rgba(166,124,82,0.25)',
              background: 'rgba(255,255,255,0.06)',
              transition: `opacity 0.6s ease ${0.65 + i * 0.08}s, transform 0.6s ease ${0.65 + i * 0.08}s`,
              opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(8px)'
            }}>{p}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 40, flexWrap: 'wrap', marginTop: 44,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(10px)',
          transition: 'opacity 0.8s ease 0.75s, transform 0.8s ease 0.75s'
        }}>
          <Link to="/programmes" style={{
            display: 'inline-block',
            padding: '16px 36px',
            background: 'linear-gradient(135deg,#A67C52,#C4976A)',
            color: '#fff', fontFamily: "'Raleway',sans-serif",
            fontWeight: 600, fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: 2, transition: 'transform 0.2s, filter 0.2s'
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.filter = 'brightness(1.08)' }}
          onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.filter = 'none' }}
          >{"Découvrir nos programmes"}</Link>
          <a href={'/rdv-decouverte'} style={{
            color: 'rgba(255,255,255,0.60)', fontFamily: "'Raleway',sans-serif",
            fontWeight: 500, fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s'
          }}
          onMouseEnter={e => e.target.style.color = '#C4976A'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.60)'}
          >{"RDV Découverte →"}</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, right: '6vw', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: loaded ? 0.5 : 0, transition: 'opacity 1s ease 1s'
      }}>
        <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.15)', borderRadius: 1, overflow: 'hidden', position: 'relative' }}>
          <div style={{ width: 1, height: 16, background: '#A67C52', position: 'absolute', animation: 'scrollLine 1.8s ease-in-out infinite' }} />
        </div>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 10, fontWeight: 200, letterSpacing: '0.30em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>{"DÉFILER"}</span>
      </div>

      <style>{`
        @keyframes scrollLine { 0% { top: -16px; } 100% { top: 40px; } }
      `}</style>
    </section>
  )
}
