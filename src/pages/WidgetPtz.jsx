import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const PLAFONDS_OP = {
  A:  [130000, 156000, 169000, 195000, 221000],
  B1: [130000, 156000, 169000, 195000, 221000],
  B2: [110000, 132000, 143000, 165000, 187000],
  C:  [99000,  119000, 129000, 149000, 169000],
}
const PLAFONDS_RES = {
  A:  [49000, 98000, 117600, 137200, 156800],
  B1: [34500, 51750,  62900,  74050,  85200],
  B2: [31500, 47250,  57400,  67550,  77700],
  C:  [28500, 42750,  51900,  61050,  70200],
}
const isZoneAB1 = (z) => z === 'A' || z === 'B1'

function calcQuotite(zone, foyer, revenus) {
  const idx = Math.min(foyer - 1, 4)
  const p = PLAFONDS_RES[zone][idx]
  if (revenus > p) return 0
  if (revenus <= p * 0.5) return isZoneAB1(zone) ? 50 : 40
  if (revenus <= p * 0.7) return isZoneAB1(zone) ? 40 : 30
  if (revenus <= p * 0.85) return isZoneAB1(zone) ? 30 : 20
  return isZoneAB1(zone) ? 20 : 0
}

function fmt(n) { return n.toLocaleString('fr-FR') + ' €' }

const BASE = 'https://viveo-patrimoine.fr'

export default function WidgetPtz() {
  const [params] = useSearchParams()
  const color = decodeURIComponent(params.get('color') || '#A67C52')
  const [zone, setZone] = useState('B1')
  const [foyer, setFoyer] = useState(2)
  const [prix, setPrix] = useState('')
  const [revenus, setRevenus] = useState('')
  const [result, setResult] = useState(null)
  const [err, setErr] = useState('')

  const calculate = () => {
    const p = parseFloat(prix.replace(/\s/g, ''))
    const r = parseFloat(revenus.replace(/\s/g, ''))
    if (!p || !r || p <= 0 || r <= 0) { setErr('Veuillez remplir tous les champs.'); return }
    setErr('')
    const idx = Math.min(foyer - 1, 4)
    const plafondOp = PLAFONDS_OP[zone][idx]
    const quotite = calcQuotite(zone, foyer, r)
    if (quotite === 0) { setResult({ eligible: false }); return }
    const base = Math.min(p, plafondOp)
    const montant = Math.round(base * quotite / 100)
    const mensualite = Math.round(montant / (240)) // 20 ans différé inclus
    const differe = isZoneAB1(zone) ? 10 : 5
    setResult({ eligible: true, montant, mensualite, differe, quotite })
  }

  const S = {
    page: { minHeight: '100vh', background: '#F7F5F1', padding: 20, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif' },
    card: { background: '#fff', borderRadius: 14, padding: '20px 18px', boxShadow: '0 4px 20px rgba(17,28,51,0.07)', marginBottom: 14 },
    label: { display: 'block', fontSize: 10, fontWeight: 700, color: '#111C33', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5 },
    select: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E8E0D5', fontSize: 13, outline: 'none', background: '#fff', marginBottom: 12 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E8E0D5', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 12 },
    btn: { width: '100%', padding: '13px', border: 'none', borderRadius: 8, cursor: 'pointer', background: `linear-gradient(135deg,${color},#C4976A)`, color: '#fff', fontSize: 13, fontWeight: 700 },
    kpi: { textAlign: 'center', flex: 1 },
    kpiVal: { fontSize: 20, fontWeight: 800, color },
    kpiLbl: { fontSize: 10, color: 'rgba(17,28,51,0.5)', marginTop: 2 },
  }

  return (
    <div style={S.page}>
      <div style={{ ...S.card, background: '#111C33', padding: '14px 18px' }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Calculateur PTZ 2026</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Primo-accédants · Barème officiel</div>
      </div>

      <div style={S.card}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div>
            <label style={S.label}>Zone</label>
            <select style={S.select} value={zone} onChange={e => setZone(e.target.value)}>
              {['A', 'B1', 'B2', 'C'].map(z => <option key={z} value={z}>Zone {z}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Personnes dans le foyer</label>
            <select style={S.select} value={foyer} onChange={e => setFoyer(parseInt(e.target.value))}>
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}{n === 5 ? '+' : ''} personne{n > 1 ? 's' : ''}</option>)}
            </select>
          </div>
        </div>
        <label style={S.label}>Prix du bien (€)</label>
        <input style={S.input} type="number" placeholder="ex : 220000" value={prix} onChange={e => setPrix(e.target.value)} />
        <label style={S.label}>Revenu fiscal N-2 (€)</label>
        <input style={S.input} type="number" placeholder="ex : 45000" value={revenus} onChange={e => setRevenus(e.target.value)} />
        {err && <div style={{ color: '#dc2626', fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <button style={S.btn} onClick={calculate}>Calculer mon PTZ →</button>
      </div>

      {result && (
        <div style={S.card}>
          {!result.eligible ? (
            <div style={{ textAlign: 'center', padding: '12px 0' }}>
              <div style={{ fontSize: 22, marginBottom: 8 }}>⚠️</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#111C33' }}>Non éligible au PTZ</div>
              <div style={{ fontSize: 12, color: '#7A7A8A', marginTop: 4 }}>Vos revenus dépassent les plafonds pour cette zone.</div>
            </div>
          ) : (
            <>
              <div style={{ fontFamily: 'Georgia,serif', fontSize: 14, fontWeight: 700, color: '#111C33', marginBottom: 14 }}>Estimation PTZ</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <div style={S.kpi}><div style={S.kpiVal}>{fmt(result.montant)}</div><div style={S.kpiLbl}>PTZ estimé</div></div>
                <div style={{ width: 1, background: '#EDE9E3' }} />
                <div style={S.kpi}><div style={S.kpiVal}>{result.quotite}%</div><div style={S.kpiLbl}>Quotité</div></div>
                <div style={{ width: 1, background: '#EDE9E3' }} />
                <div style={S.kpi}><div style={S.kpiVal}>{result.differe} ans</div><div style={S.kpiLbl}>Différé</div></div>
              </div>
              <a href={`${BASE}/rdv-decouverte`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', padding: '12px', borderRadius: 8, background: color, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
                Simuler mon financement complet →
              </a>
            </>
          )}
        </div>
      )}
      <div style={{ fontSize: 10, color: '#bbb', textAlign: 'center' }}>Propulsé par VIVEO Patrimoine · Simulation indicative</div>
    </div>
  )
}
