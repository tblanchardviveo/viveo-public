import { useState, useEffect, useRef } from 'react'

const eyeLine = { width: 32, height: 1, background: '#111C33' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#111C33'
}

function useCounter(end, duration = 2000) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        const t0 = performance.now()
        const step = (now) => {
          const p = Math.min((now - t0) / duration, 1)
          setVal(Math.round(p * end))
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end, duration])
  return [ref, val]
}

const stats = [
  { end: 50, suffix: '%', prefix: '+', label: 'DE PLACES SENIORS N\u00c9CESSAIRES D\u2019ICI 2050', source: 'Source : INSEE / Haut-Commissariat au Plan' },
  { end: 250000, suffix: '', prefix: '', label: 'LOGEMENTS \u00c9TUDIANTS MANQUANTS EN FRANCE', source: 'Source : Rapport S\u00e9nat 2021', format: true },
  { end: 98, suffix: '%', prefix: '', label: "TAUX D'OCCUPATION MOYEN R\u00c9SIDENCES G\u00c9R\u00c9ES", source: 'Source : Les Belles Ann\u00e9es 2024' }
]

export default function DemographieStats() {
  return (
    <section style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={eyeLine} /><span style={eyeText}>LES DONN\u00c9ES INSEE</span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300,
        lineHeight: 1.1, color: '#111C33', margin: 0
      }}>
        {'Une d\u00e9mographie qui'}<br />
        <em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'cr\u00e9e la demande.'}</em>
      </h2>
      <p style={{
        fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 18,
        color: '#666', maxWidth: 600, marginTop: 20, lineHeight: 1.7
      }}>
        {"En France, un habitant sur trois aura plus de 60 ans en 2050. La population \u00e9tudiante a \u00e9t\u00e9 multipli\u00e9e par 10 depuis les ann\u00e9es 1960. Ces deux r\u00e9alit\u00e9s cr\u00e9ent une demande structurelle que l'offre ne couvrira jamais seule."}
      </p>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
        gap: 0, marginTop: 56, background: '#fff', borderRadius: 4,
        boxShadow: '0 8px 40px rgba(26,39,68,0.08)', overflow: 'hidden'
      }}>
        {stats.map((s, i) => <StatCard key={i} {...s} />)}
      </div>
      <div style={{
        background: '#111C33', padding: 40, borderRadius: 4, marginTop: 56,
        borderLeft: '4px solid #A67C52'
      }}>
        <p style={{
          fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic',
          fontSize: 20, color: '#fff', lineHeight: 1.6, margin: 0
        }}>
          {"\u00abLa France devra augmenter le nombre de places en h\u00e9bergement pour personnes \u00e2g\u00e9es de plus de 50% d'ici 2050 pour maintenir le niveau d'accueil actuel.\u00bb"}
        </p>
        <p style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 13,
          color: 'rgba(255,255,255,0.45)', marginTop: 12
        }}>{"INSEE Premi\u00e8re n\u00b01767 \u2014 Juillet 2019"}</p>
      </div>
    </section>
  )
}

function StatCard({ end, suffix, prefix, label, source, format }) {
  const [ref, val] = useCounter(end)
  const display = format ? val.toLocaleString('fr-FR') : val
  return (
    <div ref={ref} style={{ padding: '48px 40px', borderRight: '1px solid rgba(166,124,82,0.15)' }}>
      <span style={{
        fontFamily: "'Playfair Display',Georgia,serif", fontSize: 72,
        fontWeight: 300, color: '#111C33'
      }}>{prefix}{display}{suffix}</span>
      <p style={{
        fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
        textTransform: 'uppercase', color: '#A67C52', letterSpacing: '0.2em',
        marginTop: 12, lineHeight: 1.6
      }}>{label}</p>
      <p style={{
        fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 11,
        color: '#999', marginTop: 8
      }}>{source}</p>
    </div>
  )
}
