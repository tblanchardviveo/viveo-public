import { useState, useEffect, useRef } from 'react'

function Counter({ end, suffix = '', duration = 2000 }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect() }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const step = duration / end
    let current = 0
    const interval = setInterval(() => {
      current++
      setVal(current)
      if (current >= end) clearInterval(interval)
    }, step)
    return () => clearInterval(interval)
  }, [started, end, duration])

  return <span ref={ref}>{val}{suffix}</span>
}

export default function VeriteRetraite() {
  const stats = [
    { value: 47, suffix: '%', label: 'Perte moyenne de revenus', desc: 'entre le dernier salaire et la pension' },
    { value: 1, suffix: '/2', label: 'Un retrait\u00e9 sur deux', desc: 'vit avec moins de 1 400\u20ac/mois' },
    { value: 72, suffix: '%', label: 'Des actifs inquiets', desc: 'pour leur niveau de vie futur' }
  ]

  return (
    <section style={{
      background: '#0D1528', padding: '100px 24px', position: 'relative'
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
          }}>{"La v\u00e9rit\u00e9 en chiffres"}</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300,
          color: '#fff', lineHeight: 1.2, marginBottom: 60
        }}>
          Ce que personne <em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>ne vous dit</em>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 40
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '48px 32px',
              textAlign: 'center',
              transition: 'border-color 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(166,124,82,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 56, fontWeight: 300, color: 'var(--bronze)',
                lineHeight: 1, marginBottom: 16
              }}>
                <Counter end={s.value} suffix={s.suffix} />
              </div>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 16,
                fontWeight: 500, color: '#fff', marginBottom: 8
              }}>{s.label}</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 13,
                fontWeight: 300, color: 'rgba(255,255,255,0.4)'
              }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
