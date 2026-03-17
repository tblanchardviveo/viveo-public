import { useState } from 'react'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eyeLine = { width: 32, height: 1, background: '#111C33' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#111C33'
}
const fmt = v => v.toLocaleString('fr-FR') + ' \u20ac'
const lbl = { fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13, color: '#111C33', marginBottom: 6 }
const note = { fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 11, color: '#999', marginTop: 4 }

export default function SimulateurLmnp() {
  const [budget, setBudget] = useState(185000)
  const [apport, setApport] = useState(30000)
  const [duree, setDuree] = useState(20)
  const [rdt, setRdt] = useState(3.85)
  const [tmi, setTmi] = useState(30)

  const tauxCredit = 3.45
  const prixHT = Math.round(budget / 1.20)
  const tvaRec = budget - prixHT
  const montantFin = prixHT - apport
  const tm = (tauxCredit / 100) / 12
  const n = duree * 12
  const mensualite = montantFin > 0 ? Math.round(montantFin * (tm * Math.pow(1 + tm, n)) / (Math.pow(1 + tm, n) - 1)) : 0
  const loyerM = Math.round((prixHT * rdt / 100) / 12)
  const effort = mensualite - loyerM
  const ecoFisc = Math.round(loyerM * 12 * (tmi / 100))

  const pLoyer = mensualite > 0 ? Math.min(100, Math.round(loyerM / mensualite * 100)) : 0
  const pFisc = mensualite > 0 ? Math.min(100 - pLoyer, Math.round((ecoFisc / 12) / mensualite * 100)) : 0
  const pEffort = Math.max(0, 100 - pLoyer - pFisc)

  return (
    <section id="simulateur" style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={eyeLine} /><span style={eyeText}>{"SIMULATEUR LMNP G\u00c9R\u00c9"}</span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300,
        color: '#111C33', margin: '0 0 48px'
      }}>
        {'Calculez votre investissement'}<br />
        <em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'en temps r\u00e9el.'}</em>
      </h2>
      <div style={{ display: 'flex', gap: 56, flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 45%', minWidth: 300 }}>
          <Slider label="Budget d'acquisition TTC" value={budget} set={setBudget} min={80000} max={500000} step={5000} display={fmt(budget)} />
          <Slider label="Apport personnel" value={apport} set={setApport} min={0} max={150000} step={5000} display={fmt(apport)} noteText={"0\u20ac = financement total"} />
          <Slider label="Durée du crédit" value={duree} set={setDuree} min={10} max={25} step={5} display={`${duree} ans`} />
          <Slider label="Rendement locatif brut" value={rdt} set={setRdt} min={3.0} max={5.5} step={0.1} display={`${rdt.toFixed(1)}%`} noteText={"Taux constat\u00e9 sur nos programmes"} />
          <div style={{ marginBottom: 28 }}>
            <p style={lbl}>Votre TMI</p>
            <select value={tmi} onChange={e => setTmi(Number(e.target.value))} style={{
              width: '100%', padding: '12px 16px', borderRadius: 4,
              border: '1px solid rgba(26,39,68,0.15)', fontSize: 14,
              fontFamily: "'Raleway',sans-serif", background: '#fff'
            }}>
              {[11, 30, 41, 45].map(v => <option key={v} value={v}>{v}%</option>)}
            </select>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 12 }}>
            <Card bg="#111C33" color="#C4976A" label="PRIX R\u00c9EL APR\u00c8S TVA" value={fmt(prixHT)} sub={`soit ${fmt(tvaRec)} \u00e9conomis\u00e9s`} />
            <Card bg="rgba(166,124,82,0.12)" color="#111C33" label="LOYER MENSUEL GARANTI" value={fmt(loyerM)} sub="vers\u00e9 bail commercial" />
            <Card bg="#fff" color="#111C33" label="MENSUALIT\u00c9 CR\u00c9DIT" value={fmt(mensualite)} sub={`sur ${duree} ans, hors assurance`} />
            <Card bg={effort <= 0 ? '#111C33' : '#1a3a2a'} color={effort <= 0 ? '#C4976A' : '#7dcea0'} label="EFFORT NET MENSUEL" value={fmt(Math.abs(effort))} sub={effort > 0 ? 'Cash-flow positif !' : 'Votre effort r\u00e9el apr\u00e8s loyers'} />
            <Card bg="rgba(166,124,82,0.12)" color="#111C33" label="\u00c9CONOMIE FISCALE /AN" value={`${ecoFisc.toLocaleString('fr-FR')} \u20ac/an`} sub="revenus neutralis\u00e9s par amortissement" />
          </div>
          <Pie pLoyer={pLoyer} pFisc={pFisc} pEffort={pEffort} />
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 16, color: '#666' }}>
              {"Ces chiffres vous int\u00e9ressent ? Parlons-en."}
            </p>
            <a href={`${WP}/rdv-decouverte/`} style={{
              display: 'inline-block', marginTop: 16,
              background: 'linear-gradient(135deg,#A67C52,#C4976A)',
              color: '#fff', borderRadius: 2, padding: '18px 40px',
              fontFamily: "'Raleway',sans-serif", fontWeight: 600,
              fontSize: 14, textDecoration: 'none', textTransform: 'uppercase'
            }}>{"Demander mon RDV D\u00e9couverte \u2192"}</a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Slider({ label, value, set, min, max, step, display, noteText }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <p style={lbl}>{label}</p>
        <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: '#A67C52', fontWeight: 400 }}>{display}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => set(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#A67C52' }} />
      {noteText && <p style={note}>{noteText}</p>}
    </div>
  )
}

function Card({ bg, color, label, value, sub }) {
  return (
    <div style={{ background: bg, borderRadius: 8, padding: '24px 20px' }}>
      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.1em', color: typeof color === 'string' && color.startsWith('#1') ? 'rgba(255,255,255,0.5)' : '#999', margin: 0, textTransform: 'uppercase' }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, fontWeight: 300, color, margin: '8px 0 4px' }}>{value}</p>
      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 12, color: typeof color === 'string' && color.startsWith('#1') ? 'rgba(255,255,255,0.4)' : '#999', margin: 0 }}>{sub}</p>
    </div>
  )
}

function Pie({ pLoyer, pFisc, pEffort }) {
  const r = 80, cx = 100, cy = 100
  const arc = (start, pct, fill) => {
    if (pct <= 0) return null
    const a1 = (start / 100) * 2 * Math.PI - Math.PI / 2
    const a2 = ((start + pct) / 100) * 2 * Math.PI - Math.PI / 2
    const large = pct > 50 ? 1 : 0
    const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1)
    const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2)
    return <path d={`M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large},1 ${x2},${y2} Z`} fill={fill} />
  }
  const items = [
    { color: '#A67C52', label: 'Loyer gestionnaire', pct: pLoyer },
    { color: '#1A2744', label: '\u00c9conomie fiscale', pct: pFisc },
    { color: '#F7F5F1', label: 'Effort personnel', pct: pEffort }
  ]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginTop: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 200" width={160} height={160}>
        {arc(0, pLoyer, '#A67C52')}
        {arc(pLoyer, pFisc, '#1A2744')}
        {arc(pLoyer + pFisc, pEffort, '#E8E4DE')}
        <circle cx={cx} cy={cy} r={40} fill="#F7F5F1" />
      </svg>
      <div>
        {items.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: it.color, border: it.color === '#F7F5F1' ? '1px solid #ccc' : 'none' }} />
            <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, color: '#555' }}>{it.label} ({it.pct}%)</span>
          </div>
        ))}
      </div>
    </div>
  )
}
