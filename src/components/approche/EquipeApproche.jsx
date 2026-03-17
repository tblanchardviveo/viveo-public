import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const team = [
  { name: 'Thomas Blanchard', role: 'Fondateur & Directeur', bio: '27 ans d’expérience en gestion de patrimoine immobilier.', initials: 'TB' },
  { name: 'Sophie Martin', role: 'Directrice Conseil', bio: 'Spécialiste fiscalité immobilière et stratégies de défiscalisation.', initials: 'SM' },
  { name: 'Marc Dupont', role: 'Responsable Programmes', bio: 'Sélection et analyse des programmes neufs sur tout le territoire.', initials: 'MD' },
]

export default function EquipeApproche() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (d) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `all 0.7s ${d}s` })

  return (
    <section ref={ref} style={{ padding: 'clamp(80px,12vw,160px) 6vw', background: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: 64, ...fade(0) }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.bronze }}>Notre équipe</span>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,52px)', color: C.navy, marginTop: 16 }}>Des experts<br /><em style={{ color: C.bronzeLight, fontStyle: 'italic' }}>à votre service.</em></h2>
      </div>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 1000, margin: '0 auto' }}>
        {team.map((t, i) => (
          <div key={i} style={{ flex: '1 1 280px', maxWidth: 320, textAlign: 'center', ...fade(0.15 * (i + 1)) }}>
            <div style={{ width: 100, height: 100, borderRadius: '50%', background: C.navy, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, color: C.bronze }}>{t.initials}</span>
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 20, color: C.navy, marginTop: 20 }}>{t.name}</h3>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.1em', color: C.bronze }}>{t.role}</span>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 14, color: 'rgba(17,28,51,0.6)', marginTop: 12, lineHeight: 1.6 }}>{t.bio}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
