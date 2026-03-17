import { useState, useEffect } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

const stats = [
  { val: '27', label: "ans d'expertise" },
  { val: '0\u20ac', label: 'frais conseiller' },
  { val: '1', label: 'interlocuteur' },
  { val: 'A\u2192Z', label: 'suivi complet' },
]

export default function HeroApproche() {
  const [show, setShow] = useState(false)
  useEffect(() => { setShow(true) }, [])
  const fade = (d) => ({ opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 0.8s ${d}s, transform 0.8s ${d}s` })

  return (
    <section style={{ height: '100vh', position: 'relative', overflow: 'hidden', background: `${C.navy} radial-gradient(ellipse 80% 60% at 100% 0%, rgba(166,124,82,0.08) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 0% 100%, rgba(26,39,68,0.60) 0%, transparent 50%)` }}>
      <span style={{ position: 'absolute', right: '6vw', top: '15%', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(300px, 40vw, 480px)', fontWeight: 200, color: 'rgba(166,124,82,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>V</span>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 6vw 10vh' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, ...fade(0.1) }}>
          <span style={{ width: 32, height: 1, background: C.bronze, display: 'block' }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: C.bronze }}>Notre philosophie</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(48px, 8vw, 100px)', lineHeight: 0.92, letterSpacing: '-0.025em', marginTop: 20, ...fade(0.2) }}>
          <span style={{ color: '#fff', display: 'block' }}>Un conseil ind\u00e9pendant.</span>
          <em style={{ color: C.bronzeLight, fontStyle: 'italic', display: 'block' }}>Engag\u00e9. Sans compromis.</em>
        </h1>

        <div style={{ width: show ? 48 : 0, height: 1, background: C.bronze, marginTop: 32, transition: 'width 0.8s ease 0.45s' }} />

        <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 'clamp(16px,2vw,21px)', color: 'rgba(255,255,255,0.50)', maxWidth: 580, lineHeight: 1.7, marginTop: 24, ...fade(0.5) }}>
          Pourquoi choisir un conseil ind\u00e9pendant plut\u00f4t qu'une banque ou un CGP g\u00e9n\u00e9raliste ? 27 ans d'exp\u00e9rience c\u00f4t\u00e9 promoteur. La r\u00e9ponse est dans notre approche.
        </p>

        <div style={{ display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap', ...fade(0.6) }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
              <div>
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, fontWeight: 200, color: '#fff', display: 'block' }}>{s.val}</span>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.30)' }}>{s.label}</span>
              </div>
              {i < stats.length - 1 && <div style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.08)' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 32, right: '6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: show ? 0.3 : 0, transition: 'opacity 1s 1s' }}>
        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#fff', writingMode: 'vertical-rl' }}>scroll</span>
        <div style={{ width: 1, height: 40, background: C.bronze }} />
      </div>
    </section>
  )
}
