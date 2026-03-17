import { useState, useEffect } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const stats = [
  { val: '27', label: "ans d'expertise" },
  { val: '0€', label: 'frais conseiller' },
  { val: '1', label: 'interlocuteur' },
  { val: 'A→Z', label: 'suivi complet' },
]

export default function HeroApproche() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(true) }, [])
  const fade = (d) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.8s ${d}s, transform 0.8s ${d}s` })

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: `${C.navy} radial-gradient(ellipse 80% 60% at 30% 50%, rgba(166,124,82,0.08) 0%, transparent 70%)` }}>
      <span style={{ position: 'absolute', right: '6vw', top: '15%', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(300px,40vw,500px)', fontWeight: 200, color: 'rgba(166,124,82,0.04)', lineHeight: 0.85, userSelect: 'none' }}>V</span>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 6vw 10vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...fade(0.1) }}>
          <span style={{ width: 32, height: 1, background: C.bronze, display: 'block' }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: C.bronze }}>Notre philosophie</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 0.95, color: '#fff', marginTop: 24, ...fade(0.2) }}>
          <span style={{ color: '#fff', display: 'block' }}>Un conseil indépendant.</span>
          <em style={{ color: C.bronzeLight, fontStyle: 'italic', display: 'block' }}>Engagé. Sans compromis.</em>
        </h1>

        <div style={{ width: show ? 48 : 0, height: 1, background: C.bronze, marginTop: 32, transition: 'width 0.8s ease 0.45s' }} />

        <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 'clamp(15px, 1.8vw, 19px)', color: 'rgba(255,255,255,0.5)', maxWidth: 520, marginTop: 24, lineHeight: 1.7, ...fade(0.4) }}>
          Depuis 27 ans, nous accompagnons chaque projet immobilier avec une exigence simple : votre intérêt avant tout.
        </p>

        <div style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap', ...fade(0.55) }}>
          {stats.map((s, i) => (
            <div key={i}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 200, fontSize: 32, color: C.bronze }}>{s.val}</span>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
