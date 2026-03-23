import { useReveal } from '../../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function CtaHome() {
  const [ref, visible] = useReveal()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  return (
    <section ref={ref} data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: isMobile ? '10vh 6vw' : '20vh 6vw', textAlign: 'center' }}>
      <div style={s}>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(40px, 6vw, 80px)', fontWeight: 300,
          color: '#111C33', letterSpacing: '-0.02em', lineHeight: 1.1
        }}>
          Votre projet commence<br />
          <em style={{ fontStyle: 'italic', color: '#A67C52' }}>par une conversation.</em>
        </h2>
        <p style={{
          fontFamily: "'Raleway', sans-serif", fontWeight: 300,
          fontSize: 18, color: '#777', marginTop: 24
        }}>45 minutes. En visio. Gratuit.</p>
        <p style={{
          fontFamily: "'Raleway', sans-serif", fontWeight: 200,
          fontSize: 14, color: '#999', marginTop: 12, marginBottom: 48
        }}>{"Teams ou FaceTime · Réponse sous 24h"}</p>
        <a href={'/rdv-decouverte'} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #A67C52, #C4976A)',
          color: '#fff', borderRadius: 2,
          padding: '22px 64px', width: isMobile ? '100%' : 'auto',
          fontFamily: "'Raleway', sans-serif", fontWeight: 600,
          fontSize: 15, letterSpacing: '0.06em',
          textTransform: 'uppercase', textDecoration: 'none',
          boxShadow: '0 8px 32px rgba(166,124,82,0.25)',
          transition: 'all 0.3s ease'
        }}>{"Demander mon RDV Découverte"}</a>
      </div>
    </section>
  )
}
