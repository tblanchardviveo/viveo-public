import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const pillars = [
  { icon: '\u{1F3AF}', title: 'Ind\u00e9pendance totale', desc: 'Aucun lien capitalistique avec les promoteurs. Nos recommandations sont guid\u00e9es uniquement par votre int\u00e9r\u00eat.' },
  { icon: '\u{1F50D}', title: 'Transparence absolue', desc: 'Chaque frais, chaque commission, chaque d\u00e9tail est expliqu\u00e9 clairement avant toute signature.' },
  { icon: '\u{1F91D}', title: 'Accompagnement durable', desc: 'Notre relation ne s\u2019arr\u00eate pas \u00e0 la vente. Suivi fiscal, locatif et patrimonial ann\u00e9e apr\u00e8s ann\u00e9e.' },
]

export default function ManifestoApproche() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (d) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `opacity 0.8s ${d}s, transform 0.8s ${d}s` })

  return (
    <section ref={ref} style={{ padding: 'clamp(80px,12vw,160px) 6vw', background: '#fff' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', ...fade(0) }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.bronze }}>Notre manifeste</span>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,56px)', color: C.navy, marginTop: 16, lineHeight: 1.15 }}>
          Nous croyons qu\u2019un conseil<br /><em style={{ color: C.bronzeLight, fontStyle: 'italic' }}>doit servir vos int\u00e9r\u00eats, pas les n\u00f4tres.</em>
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(17,28,51,0.6)', marginTop: 24, maxWidth: 700, margin: '24px auto 0' }}>
          Depuis 27 ans, Viveo Patrimoine d\u00e9fend une vision simple : placer l\u2019humain au c\u0153ur de chaque d\u00e9cision patrimoniale.
        </p>
      </div>
      <div style={{ display: 'flex', gap: 32, marginTop: 64, flexWrap: 'wrap', justifyContent: 'center' }}>
        {pillars.map((p, i) => (
          <div key={i} style={{ flex: '1 1 280px', maxWidth: 340, padding: 40, background: C.navy, borderRadius: 16, ...fade(0.15 * (i + 1)) }}>
            <span style={{ fontSize: 32 }}>{p.icon}</span>
            <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: '#fff', marginTop: 16 }}>{p.title}</h3>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 15, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
