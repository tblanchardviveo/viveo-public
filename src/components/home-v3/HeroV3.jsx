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

  const pills = ['✓ Ind\u00e9pendant', '✓ 27 ans promoteur', '✓ A\u2192Z']

  return (
    <section style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Background parallax */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${WP}/wp-content/uploads/2026/03/IMG_0668.png), url(${WP}/wp-content/uploads/2026/03/IMG_0602.png)`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(35% + ${scrollY * 0.35}px)`
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
        background: 'linear-gradient(to right, rgba(17,28,51,0.30) 0%, transparent 50%)'
      }} />

      {/* Content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 6vw 10vh', zIndex: 2
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
          margin: 0,
          fontSize: 'clamp(56px, 10vw, 120px)',
          lineHeight: 0.90,
          letterSpacing: '-0.025em',
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s'
        }}>
          <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, color: '#fff', display: 'block' }}>
            {"L'immobilier,"}
          </span>
          <em style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 400, fontStyle: 'italic', color: '#C4976A', display: 'block' }}>
            {"l'esprit libre."}
          </em>
        </h1>

        {/* Separator */}
        <div style={{
          width: loaded ? 48 : 0, height: 1, background: '#A67C52',
          marginTop: 28, marginBottom: 24,
          transition: 'width 0.8s ease 0.5s'
        }} />

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 200,
          fontSize: 'clamp(16px,2vw,22px)',
          color: 'rgba(255,255,255,0.55)', maxWidth: 560, lineHeight: 1.65,
          margin: 0,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s'
        }}>
          {"27 ans d'exp\u00e9rience c\u00f4t\u00e9 promoteur."}<br />
          {"Un conseil ind\u00e9pendant, sans exclusivit\u00e9,"}<br />
          {"sans conflit d'int\u00e9r\u00eat."}
        </p>

        {/* Pills */}
        <div style={{
          display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap',
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s'
        }}>
          {pills.map((p, i) => (
            <span key={i} style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(166,124,82,0.25)',
              borderRadius: 2, padding: '10px 18px',
              fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
              color: '#fff', textTransform: 'uppercase', letterSpacing: '0.10em',
              transition: `opacity 0.6s ease ${0.65 + i * 0.08}s`
            }}>{p}</span>
          ))}
        </div>

        {/* CTAs */}
        <div style={{
          display: 'flex', gap: 40, alignItems: 'center', marginTop: 44,
          opacity: loaded ? 1 : 0, transform: loaded ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.8s ease 0.75s, transform 0.8s ease 0.75s'
        }}>
          <Link to="/programmes" style={{
            background: 'linear-gradient(135deg, #A67C52, #C4976A)',
            borderRadius: 2, padding: '16px 36px',
            fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: '#fff', textDecoration: 'none',
            transition: 'transform 0.3s, filter 0.3s'
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.filter = 'brightness(1.08)' }}
            onMouseLeave={e => { e.target.style.transform = 'none'; e.target.style.filter = 'none' }}
          >{"D\u00e9couvrir nos programmes"}</Link>
          <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'rgba(255,255,255,0.60)', textDecoration: 'none',
            transition: 'color 0.2s'
          }}
            onMouseEnter={e => e.target.style.color = '#C4976A'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.60)'}
          >{"RDV D\u00e9couverte \u2192"}</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, right: '6vw', zIndex: 2,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        opacity: loaded ? 1 : 0, transition: 'opacity 1s ease 1s'
      }}>
        <span style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 10,
          textTransform: 'uppercase', letterSpacing: '0.30em',
          color: 'rgba(255,255,255,0.25)'
        }}>{"D\u00c9FILER"}</span>
        <div style={{ width: 1, height: 40, background: 'rgba(166,124,82,0.30)', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            width: 1, height: 16, background: '#A67C52',
            position: 'absolute', top: -16,
            animation: 'scrollLine 1.8s ease-in-out infinite'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes scrollLine {
          0% { top: -16px; }
          100% { top: 40px; }
        }
      `}</style>
    </section>
  )
}
