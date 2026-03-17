import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const steps = [
  { num: '01', title: 'Écoute & Diagnostic', desc: 'Analyse complète de votre situation patrimoniale, fiscale et personnelle. Aucune recommandation avant de vous connaître.' },
  { num: '02', title: 'Stratégie sur mesure', desc: 'Construction d’un plan d’investissement aligné sur vos objectifs : rendement, défiscalisation, transmission.' },
  { num: '03', title: 'Sélection rigoureuse', desc: 'Choix des meilleurs programmes parmi 200+ références, négociation des conditions, vérification juridique.' },
  { num: '04', title: 'Accompagnement complet', desc: 'Signature, financement, livraison, mise en location, déclarations fiscales. Tout est géré.' },
  { num: '05', title: 'Suivi pérenne', desc: 'Bilan annuel, ajustements stratégiques, optimisation continue de votre patrimoine.' },
]

export default function ProcessApproche() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (d) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0)' : 'translateX(-40px)', transition: `all 0.7s ${d}s` })

  return (
    <section ref={ref} style={{ padding: 'clamp(80px,12vw,160px) 6vw', background: '#FAFAF8' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64, ...fade(0) }}>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.bronze }}>Notre processus</span>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,52px)', color: C.navy, marginTop: 16 }}>5 étapes vers<br /><em style={{ color: C.bronzeLight, fontStyle: 'italic' }}>votre réussite patrimoniale.</em></h2>
        </div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 32, marginBottom: 48, alignItems: 'flex-start', ...fade(0.12 * (i + 1)) }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, fontWeight: 200, color: C.bronze, lineHeight: 1, minWidth: 64 }}>{s.num}</span>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: 22, color: C.navy }}>{s.title}</h3>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 15, color: 'rgba(17,28,51,0.6)', marginTop: 8, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
