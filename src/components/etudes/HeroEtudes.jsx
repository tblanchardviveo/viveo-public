import { useState, useEffect } from 'react'

export default function HeroEtudes() {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 300); return () => clearTimeout(t) }, [])

  const pills = ['\ud83c\udf93 Université', '\ud83c\udfdb\ufe0f Grande École', '\ud83c\udfe0 Logement inclus']
  const fade = (d) => ({ opacity: vis ? 1 : 0, transform: vis ? 'translateY(0)' : 'translateY(24px)', transition: `all 0.9s cubic-bezier(0.16,1,0.3,1) ${d}s` })

  return (
    <section style={{ minHeight: '100vh', background: '#111C33', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'flex-end', padding: '0 6vw 10vh' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 100% 0%, rgba(166,124,82,0.07) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(26,39,68,0.80) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* SVG Timeline */}
      <div style={{ position: 'absolute', right: '8vw', top: '15%', opacity: vis ? 0.6 : 0, transition: 'opacity 1.5s ease 0.8s' }}>
        <svg width="40" height="260" viewBox="0 0 40 260">
          <line x1="20" y1="16" x2="20" y2="244" stroke="rgba(166,124,82,0.25)" strokeWidth="1" strokeDasharray="4 6" />
          <circle cx="20" cy="16" r="4" fill="#A67C52" />
          <circle cx="20" cy="130" r="4" fill="rgba(255,255,255,0.20)" />
          <circle cx="20" cy="244" r="4" fill="rgba(255,255,255,0.10)" />
        </svg>
        {[{t:"Aujourd'hui",y:4},{t:'Dans 10 ans',y:122},{t:'Études',y:236}].map((l,i) => (
          <span key={i} style={{ position: 'absolute', right: 48, top: l.y, fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 11, color: 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' }}>{l.t}</span>
        ))}
      </div>

      <div style={{ position: 'relative', maxWidth: 720, zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, ...fade(0.1) }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)' }}>Financement des études</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(44px,7.5vw,96px)', fontWeight: 300, color: '#fff', lineHeight: 0.92, letterSpacing: '-0.025em', marginBottom: 0 }}>
          <span style={fade(0.15)}>Avez-vous pensé</span><br />
          <span style={fade(0.25)}>{"à financer les études"}</span><br />
          <em style={{ fontStyle: 'italic', color: 'var(--bronze-light)', ...fade(0.35) }}>de vos enfants&nbsp;?</em>
        </h1>

        <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 'clamp(15px,1.8vw,20px)', fontWeight: 200, color: 'rgba(255,255,255,0.50)', maxWidth: 560, lineHeight: 1.75, marginTop: 32, ...fade(0.5) }}>
          {"Un enfant né aujourd'hui entrera dans l'enseignement supérieur dans 18 ans. Le coût total de ses études peut dépasser 100 000€. La question n'est pas si vous devez préparer — mais comment."}
        </p>

        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', ...fade(0.6) }}>
          {pills.map((p,i) => <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(166,124,82,0.25)', borderRadius: 2, padding: '10px 18px', fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.10em' }}>{p}</span>)}
        </div>

        <a href="#simulateur" style={{ display: 'inline-block', marginTop: 44, fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13, textTransform: 'uppercase', color: 'var(--bronze)', letterSpacing: '0.08em', textDecoration: 'none', transition: 'transform 0.3s', ...fade(0.7) }}>{"Calculer le coût pour mon enfant →"}</a>
      </div>
    </section>
  )
}
