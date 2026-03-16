import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const dispositifs = [
  { num: '01', nom: 'LMNP G\u00e9r\u00e9', route: '/lmnp-gere' },
  { num: '02', nom: 'LMNP', route: '/lmnp' },
  { num: '03', nom: 'D\u00e9ficit Foncier', route: '/deficit-foncier' },
  { num: '04', nom: 'Nue-propri\u00e9t\u00e9', route: '/nue-propriete' },
  { num: '05', nom: 'Monuments Historiques', route: '/monuments-historiques' },
  { num: '06', nom: 'Loi Malraux', route: '/loi-malraux' },
  { num: '07', nom: 'Loi Jeanbrun', route: '/loi-jeanbrun' },
  { num: '08', nom: 'Loi Denormandie', route: '/loi-denormandie' }
]

export default function DispostifsV3() {
  const [hov, setHov] = useState(null)
  const nav = useNavigate()

  return (
    <section data-bg="#1A2744" style={{ background: '#1A2744', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', gap: 80, flexWrap: 'wrap' }}>
        {/* LEFT */}
        <div style={{ flex: '0 0 38%', minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: '#A67C52' }} />
            <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#fff' }}>DISPOSITIFS FISCAUX</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(36px,5vw,64px)', color: '#fff', lineHeight: 1.1, margin: 0 }}>
            Le bon dispositif.<br />
            <em style={{ color: '#C4976A', fontStyle: 'italic' }}>Pour le bon profil.</em>
          </h2>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 17, color: 'rgba(255,255,255,0.50)', lineHeight: 1.8, marginTop: 24 }}>
            {"LMNP, D\u00e9ficit Foncier, Nue-propri\u00e9t\u00e9, Monuments Historiques, Malraux, Jeanbrun, Denormandie. Selon votre TMI, vos revenus et vos objectifs, nous identifions le seul dispositif qui a du sens pour vous."}
          </p>
          <Link to="/calculateur" style={{
            display: 'inline-block', marginTop: 32, padding: '14px 32px',
            background: 'linear-gradient(135deg,#A67C52,#C4976A)',
            color: '#fff', fontFamily: "'Raleway',sans-serif",
            fontWeight: 600, fontSize: 13, letterSpacing: '0.08em',
            textTransform: 'uppercase', textDecoration: 'none',
            borderRadius: 2, transition: 'transform 0.2s'
          }} onMouseEnter={e => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.target.style.transform = 'none'}
          >{"Simuler mon investissement \u2192"}</Link>
        </div>

        {/* RIGHT */}
        <div style={{ flex: 1 }}>
          {dispositifs.map((d, i) => (
            <div key={i}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              onClick={() => nav(d.route)}
              style={{
                display: 'flex', alignItems: 'center', gap: 24,
                padding: '22px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer', position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
                transform: hov === i ? 'translateX(12px)' : 'none',
                background: hov === i ? 'rgba(166,124,82,0.04)' : 'transparent'
              }}>
              <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, color: 'rgba(255,255,255,0.20)', minWidth: 24 }}>{d.num}</span>
              <span style={{
                fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, fontWeight: 400,
                color: hov === i ? '#C4976A' : '#fff', transition: 'color 0.3s'
              }}>{d.nom}</span>
              <span style={{
                position: 'absolute', right: 0, fontFamily: "'Raleway',sans-serif", fontSize: 16,
                color: '#C4976A', opacity: hov === i ? 1 : 0,
                transform: hov === i ? 'translateX(0)' : 'translateX(-8px)',
                transition: 'opacity 0.3s, transform 0.3s'
              }}>{"\u2192"}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
