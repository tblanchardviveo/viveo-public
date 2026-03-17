import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52', bronzeLight: '#C4976A' }

export default function CTAApproche() {
  const [visible, setVisible] = useState(false)
  const [hover, setHover] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const fade = (d) => ({ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(32px)', transition: `all 0.8s ${d}s` })

  return (
    <section ref={ref} style={{ padding: 'clamp(100px,14vw,200px) 6vw', background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${C.navy} 0%, #0a1220 100%)`, textAlign: 'center' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', ...fade(0) }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 300, fontSize: 'clamp(32px,5vw,56px)', color: '#fff', lineHeight: 1.15 }}>
          Prêt à construire<br /><em style={{ color: C.bronzeLight, fontStyle: 'italic' }}>votre avenir patrimonial ?</em>
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 200, fontSize: 'clamp(15px,1.8vw,19px)', color: 'rgba(255,255,255,0.5)', marginTop: 24 }}>
          Prenez rendez-vous pour un premier échange gratuit et sans engagement.
        </p>
        <a
          href="/contact"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'inline-block', marginTop: 40, padding: '16px 48px',
            background: hover ? C.bronzeLight : C.bronze, color: '#fff',
            fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 13,
            textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none',
            borderRadius: 8, transition: 'background 0.3s',
            ...fade(0.2)
          }}
        >
          Prendre rendez-vous
        </a>
      </div>
    </section>
  )
}
