import { useState, useEffect, useRef } from 'react'

const C = { navy: '#111C33', bronze: '#A67C52' }

const data = [
  { val: 850, suffix: '+', label: 'Clients accompagn\u00e9s' },
  { val: 27, suffix: ' ans', label: "D'exp\u00e9rience" },
  { val: 98, suffix: '%', label: 'Taux de satisfaction' },
  { val: 120, suffix: 'M\u20ac', label: 'Patrimoine g\u00e9r\u00e9' },
]

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let start = 0
    const step = Math.ceil(target / 40)
    const id = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(id) }
      else setCount(start)
    }, 30)
    return () => clearInterval(id)
  }, [target])
  return <>{count}{suffix}</>
}

export default function StatsApproche() {
  const [visible, setVisible] = useState(false)
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding: 'clamp(80px,10vw,140px) 6vw', background: C.navy }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 48, maxWidth: 1100, margin: '0 auto' }}>
        {data.map((d, i) => (
          <div key={i} style={{ textAlign: 'center', flex: '1 1 200px', opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.8)', transition: `all 0.6s ${i * 0.15}s` }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 200, fontSize: 'clamp(40px,6vw,64px)', color: C.bronze }}>
              {visible ? <Counter target={d.val} suffix={d.suffix} /> : '0'}
            </span>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{d.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
