import { useEffect, useRef, useState } from 'react'

function useCounter(end, duration, start) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const p = Math.min((ts - startTime) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(ease * end))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, end, duration])
  return val
}

export default function ChiffresV3() {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const c1 = useCounter(27, 1800, vis)
  const c2 = useCounter(100, 1800, vis)

  const numStyle = {
    fontFamily: "'Playfair Display',Georgia,serif",
    fontWeight: 200,
    fontSize: 'clamp(100px, 18vw, 220px)',
    lineHeight: 0.85, color: '#fff',
    letterSpacing: '-0.04em', margin: 0
  }
  const labelStyle = {
    fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 12,
    textTransform: 'uppercase', letterSpacing: '0.35em',
    color: 'rgba(255,255,255,0.30)', marginTop: 8
  }
  const detailStyle = {
    fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 14,
    color: '#C4976A', marginTop: 4
  }
  const sepStyle = {
    height: '60%', width: 1, alignSelf: 'center',
    background: 'linear-gradient(to bottom, transparent, rgba(166,124,82,0.25), transparent)'
  }

  return (
    <section ref={ref} data-bg="#111C33" style={{
      background: '#111C33', padding: '15vh 6vw'
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-end', flexWrap: 'wrap', gap: 40
      }}>
        {/* 27 */}
        <div>
          <div style={numStyle}>{c1}</div>
          <div style={labelStyle}>ANS</div>
          <div style={detailStyle}>{"d'exp\u00e9rience c\u00f4t\u00e9 promoteur"}</div>
        </div>

        <div style={sepStyle} />

        {/* 100% */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={numStyle}>{c2}</span>
            <span style={{
              fontFamily: "'Raleway',sans-serif", fontWeight: 300,
              fontSize: 'clamp(40px,6vw,80px)',
              color: 'rgba(255,255,255,0.40)', marginTop: 16
            }}>%</span>
          </div>
          <div style={labelStyle}>{"IND\u00c9PENDANT"}</div>
          <div style={detailStyle}>{"aucune exclusivit\u00e9 promoteur"}</div>
        </div>

        <div style={sepStyle} />

        {/* A->Z */}
        <div style={{
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)',
          transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s'
        }}>
          <div style={numStyle}>
            <span style={{ color: '#fff' }}>A</span>
            <span style={{ color: '#C4976A' }}>{"\u2192Z"}</span>
          </div>
          <div style={labelStyle}>ACCOMPAGNEMENT</div>
          <div style={detailStyle}>{"de la recherche \u00e0 la remise des cl\u00e9s"}</div>
        </div>
      </div>

      <p style={{
        fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 17,
        color: 'rgba(255,255,255,0.25)', maxWidth: 600, lineHeight: 1.7,
        marginTop: 80
      }}>
        {"Ces chiffres ne sont pas des arguments marketing. Ce sont 27\u00a0ans de chantiers, de promoteurs, de n\u00e9gociations et de clients accompagn\u00e9s jusqu'au bout."}
      </p>
    </section>
  )
}
