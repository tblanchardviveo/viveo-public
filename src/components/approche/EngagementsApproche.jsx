import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const engagements = [
  { icon: '✅', title: 'Zéro frais cachés', desc: 'Tous nos honoraires sont communiqués dès le premier rendez-vous.' },
  { icon: '🔒', title: 'Confidentialité totale', desc: 'Vos données patrimoniales sont protégées et ne sont jamais partagées.' },
  { icon: '📄', title: 'Conseil écrit', desc: 'Chaque recommandation est formalisée par un rapport détaillé.' },
  { icon: '♻️', title: 'Droit de rétractation', desc: '30 jours pour changer d’avis, sans condition ni pénalité.' },
  { icon: '📞', title: 'Disponibilité permanente', desc: 'Un interlocuteur dédié joignable du lundi au samedi.' },
  { icon: '🏠', title: 'Sélection indépendante', desc: 'Programmes choisis sur critères objectifs, jamais sur commissions.' },
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
