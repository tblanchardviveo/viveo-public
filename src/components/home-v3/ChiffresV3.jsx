import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

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
    fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 200,
    fontSize: 'clamp(100px, 18vw, 220px)', lineHeight: 0.85,
    color: '#ffffff', letterSpacing: '-0.04em'
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
  const sep = {
    height: '60%', width: 1, alignSelf: 'center',
    background: 'linear-gradient(to bottom, transparent, rgba(166,124,82,0.25), transparent)'
  }

  return (
    <section ref={ref} data-bg="#111C33" style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 0, flexWrap: 'wrap' }}>
        {/* 27 */}
        <div>
          <div style={numStyle}>{c1}</div>
          <div style={labelStyle}>ANS</div>
          <div style={detailStyle}>{"d'expérience côté promoteur"}</div>
        </div>
        <div style={sep} />
        {/* 100% */}
        <div>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span style={numStyle}>{c2}</span>
            <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 'clamp(40px,6vw,80px)', color: 'rgba(255,255,255,0.40)', marginTop: 16 }}>%</span>
          </div>
          <div style={labelStyle}>{"INDÉPENDANT"}</div>
          <div style={detailStyle}>{"aucune exclusivité promoteur"}</div>
        </div>
        <div style={sep} />
        {/* A->Z */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s' }}>
          <div style={numStyle}>A<span style={{ color: '#C4976A' }}>{"→Z"}</span></div>
          <div style={labelStyle}>ACCOMPAGNEMENT</div>
          <div style={detailStyle}>{"de la recherche à la remise des clés"}</div>
        </div>
      </div>

      {/* Bottom text */}
      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 17, color: 'rgba(255,255,255,0.25)', maxWidth: 600, marginTop: 80, lineHeight: 1.7 }}>
        {"Ces chiffres ne sont pas des arguments marketing. Ce sont 27 ans de chantiers, de promoteurs, de négociations et de clients accompagnés jusqu'au bout."}
      </p>

      {/* Retraite encart */}
      <div style={{
        marginTop: 48, background: 'rgba(166,124,82,0.08)',
        border: '1px solid rgba(166,124,82,0.20)', borderRadius: 3,
        padding: '24px 32px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', gap: 24, flexWrap: 'wrap'
      }}>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.55)' }}>
          {"Vous ne savez pas combien vous toucherez à la retraite ?"}
        </span>
        <Link to="/retraite" style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 13,
          textTransform: 'uppercase', color: '#C4976A', letterSpacing: '0.08em',
          textDecoration: 'none', transition: 'color 0.2s', whiteSpace: 'nowrap'
        }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#C4976A'}
        >{"Calculez maintenant →"}</Link>
      </div>
    </section>
  )
}
