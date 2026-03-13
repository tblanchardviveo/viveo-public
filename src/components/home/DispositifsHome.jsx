import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const dispos = [
  'LMNP', 'D\u00e9ficit Foncier', 'Nue-propri\u00e9t\u00e9',
  'Monuments Historiques', 'Loi Malraux', 'Loi Jeanbrun', 'Loi Denormandie'
]

export default function DispositifsHome() {
  const [ref, visible] = useReveal()
  const [hovered, setHovered] = useState(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  return (
    <section ref={ref} data-bg="#1A2744" style={{ background: '#1A2744', padding: isMobile ? '10vh 6vw' : '15vh 6vw' }}>
      <div style={s}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#fff' }}>7 DISPOSITIFS FISCAUX</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 400, color: '#fff', lineHeight: 1.1 }}>
          Le bon dispositif.<br />
          <em style={{ fontStyle: 'italic', color: '#C4976A' }}>Pour le bon profil.</em>
        </h2>
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 80, alignItems: 'flex-start', marginTop: 48 }}>
          <div style={{ flex: '0 0 45%' }}>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 17, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 440 }}>
              {"LMNP, D\u00e9ficit Foncier, Monuments Historiques, Nue-propri\u00e9t\u00e9, Loi Malraux, Loi Jeanbrun, Loi Denormandie. Selon votre TMI, vos objectifs et votre situation, nous identifions le cadre le plus adapt\u00e9."}
            </p>
            <Link to="/calculateur" style={{
              display: 'inline-block', marginTop: 32,
              background: 'linear-gradient(135deg, #A67C52, #C4976A)',
              color: '#fff', borderRadius: 2, padding: '16px 36px',
              fontFamily: "'Raleway', sans-serif", fontWeight: 500,
              fontSize: 13, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none'
            }}>{"Simuler mon investissement \u2192"}</Link>
          </div>
          <div style={{ flex: '0 0 55%' }}>
            {dispos.map((d, i) => (
              <div key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 20,
                  padding: '20px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  borderTop: i === 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  cursor: 'default',
                  transition: 'transform 0.2s ease',
                  transform: hovered === i ? 'translateX(8px)' : 'none'
                }}>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, color: 'rgba(255,255,255,0.25)', minWidth: 28 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20,
                  color: hovered === i ? '#C4976A' : '#fff',
                  transition: 'color 0.2s ease'
                }}>{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
