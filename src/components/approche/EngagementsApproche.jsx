import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const engagements = [
  { icon: '\u2705', title: 'Z\u00e9ro frais cach\u00e9s', desc: 'Tous nos honoraires sont communiqu\u00e9s d\u00e8s le premier rendez-vous.' },
  { icon: '\u{1F512}', title: 'Confidentialit\u00e9 totale', desc: 'Vos donn\u00e9es patrimoniales sont prot\u00e9g\u00e9es et ne sont jamais partag\u00e9es.' },
  { icon: '\u{1F4C4}', title: 'Conseil \u00e9crit', desc: 'Chaque recommandation est formalis\u00e9e par un rapport d\u00e9taill\u00e9.' },
  { icon: '\u267B\uFE0F', title: 'Droit de r\u00e9tractation', desc: '30 jours pour changer d\u2019avis, sans condition ni p\u00e9nalit\u00e9.' },
  { icon: '\u{1F4DE}', title: 'Disponibilit\u00e9 permanente', desc: 'Un interlocuteur d\u00e9di\u00e9 joignable du lundi au samedi.' },
  { icon: '\u{1F3E0}', title: 'S\u00e9lection ind\u00e9pendante', desc: 'Programmes choisis sur crit\u00e8res objectifs, jamais sur commissions.' },
]

export default function EngagementsApproche() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (d) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.6s ${d}s` })

  return (
    <section ref={ref} style={{ padding: 'clamp(80px,12vw,160px) 6vw', background: C.navy }}>
      <div style={{ textAlign: 'center', marginBottom: 64, ...fade(0) }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.bronze }}>Nos engagements</span>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,52px)', color: '#fff', marginTop: 16 }}>Ce que nous vous<br /><em style={{ color: C.bronzeLight, fontStyle: 'italic' }}>garantissons.</em></h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, maxWidth: 1000, margin: '0 auto' }}>
        {engagements.map((e, i) => (
          <div key={i} style={{ padding: 32, border: '1px solid rgba(166,124,82,0.2)', borderRadius: 12, ...fade(0.1 * (i + 1)) }}>
            <span style={{ fontSize: 24 }}>{e.icon}</span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 18, color: '#fff', marginTop: 12 }}>{e.title}</h3>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.6 }}>{e.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
