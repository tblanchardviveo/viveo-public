import { useState } from 'react'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

const ZONES_PTZ = {
  A: { plafond1: 150000, plafond2: 210000, plafond3: 255000, plafond4: 300000, quotite: 0.40 },
  Abis: { plafond1: 150000, plafond2: 210000, plafond3: 255000, plafond4: 300000, quotite: 0.40 },
  B1: { plafond1: 135000, plafond2: 189000, plafond3: 230000, plafond4: 270000, quotite: 0.40 },
  B2: { plafond1: 110000, plafond2: 154000, plafond3: 187000, plafond4: 220000, quotite: 0.20 },
  C: { plafond1: 100000, plafond2: 140000, plafond3: 170000, plafond4: 200000, quotite: 0.20 }
}

const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 8,
  border: '1px solid rgba(166,124,82,0.25)', background: 'rgba(255,255,255,0.06)',
  color: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 14,
  outline: 'none', transition: 'border-color 0.2s'
}

const labelStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600,
  letterSpacing: '0.08em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.6)', marginBottom: 6, display: 'block'
}

export default function CalcResidencePrincipale({ onResult }) {
  const [revenus, setRevenus] = useState('')
  const [personnes, setPersonnes] = useState('1')
  const [zone, setZone] = useState('B1')
  const [prixBien, setPrixBien] = useState('')
  const [apport, setApport] = useState('')
  const [duree, setDuree] = useState('20')
  const [taux, setTaux] = useState('3.5')
  const [premierAchat, setPremierAchat] = useState(true)
  const [result, setResult] = useState(null)

  const calculer = () => {
    const rev = parseFloat(revenus) || 0
    const prix = parseFloat(prixBien) || 0
    const app = parseFloat(apport) || 0
    const d = parseInt(duree) || 20
    const t = (parseFloat(taux) || 3.5) / 100 / 12
    const nbPersonnes = parseInt(personnes) || 1

    const zoneData = ZONES_PTZ[zone]
    const plafondKey = nbPersonnes >= 4 ? 'plafond4' : `plafond${nbPersonnes}`
    const plafondRevenus = zoneData[plafondKey]

    let ptz = 0
    let eligiblePTZ = false
    if (premierAchat && rev <= plafondRevenus) {
      eligiblePTZ = true
      ptz = Math.min(prix * zoneData.quotite, plafondRevenus)
    }

    const montantEmprunt = prix - app - ptz
    const nbMois = d * 12
    const mensualite = montantEmprunt > 0 ? (montantEmprunt * t) / (1 - Math.pow(1 + t, -nbMois)) : 0
    const coutTotal = mensualite * nbMois
    const tauxEndettement = rev > 0 ? ((mensualite * 12) / rev) * 100 : 0

    const res = {
      eligiblePTZ, ptz, montantEmprunt,
      mensualite: Math.round(mensualite),
      coutTotal: Math.round(coutTotal),
      tauxEndettement: Math.round(tauxEndettement * 10) / 10,
      alerteEndettement: tauxEndettement > 35
    }
    setResult(res)
    if (onResult) onResult(res)
  }

  return (
    <div style={{ background: 'var(--navy-deep)', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', border: '1px solid rgba(166,124,82,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>
          {"\u00c9ligibilit\u00e9 & Financement"}
        </span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', fontWeight: 400, marginBottom: 32 }}>
        {"R\u00e9sidence principale"}
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Revenus annuels</label>
          <input type="number" value={revenus} onChange={e => setRevenus(e.target.value)} placeholder="45 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Personnes au foyer</label>
          <select value={personnes} onChange={e => setPersonnes(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {[1,2,3,4,5,6].map(n => <option key={n} value={n} style={{ background: '#1A2744' }}>{n} {n === 1 ? 'personne' : 'personnes'}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Zone PTZ</label>
          <select value={zone} onChange={e => setZone(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {Object.keys(ZONES_PTZ).map(z => <option key={z} value={z} style={{ background: '#1A2744' }}>{z}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Prix du bien</label>
          <input type="number" value={prixBien} onChange={e => setPrixBien(e.target.value)} placeholder="250 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Apport personnel</label>
          <input type="number" value={apport} onChange={e => setApport(e.target.value)} placeholder="25 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{"Durée (ann\u00e9es)"}</label>
          <select value={duree} onChange={e => setDuree(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {[10,15,20,25,30].map(n => <option key={n} value={n} style={{ background: '#1A2744' }}>{n} ans</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Taux (%)</label>
          <input type="number" step="0.1" value={taux} onChange={e => setTaux(e.target.value)} placeholder="3.5" style={inputStyle} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 24 }}>
          <input type="checkbox" checked={premierAchat} onChange={e => setPremierAchat(e.target.checked)} style={{ width: 18, height: 18, accentColor: '#A67C52' }} />
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)' }}>Premier achat</span>
        </div>
      </div>

      <button onClick={calculer} style={{
        background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff',
        border: 'none', borderRadius: 50, padding: '14px 40px', fontSize: 13,
        fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
        fontFamily: "'Raleway', sans-serif", cursor: 'pointer', transition: 'all 0.3s',
        width: '100%', marginTop: 8
      }}>
        {"Calculer \u2192"}
      </button>

      {result && (
        <div style={{ marginTop: 32, padding: 24, background: 'rgba(166,124,82,0.08)', borderRadius: 12, border: '1px solid rgba(166,124,82,0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{"Mensualit\u00e9"}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--bronze)', fontWeight: 400 }}>{fmt(result.mensualite)}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mois</span></p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Emprunt</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>{fmt(result.montantEmprunt)}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{"Co\u00fbt total"}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>{fmt(result.coutTotal)}</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Endettement</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: result.alerteEndettement ? '#e74c3c' : '#2ecc71', fontWeight: 400 }}>{result.tauxEndettement}%</p>
              {result.alerteEndettement && <p style={{ fontSize: 11, color: '#e74c3c', marginTop: 4, fontFamily: "'Raleway', sans-serif" }}>{"Au-del\u00e0 du seuil de 35%"}</p>}
            </div>
          </div>
          {result.eligiblePTZ && (
            <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(46,204,113,0.1)', borderRadius: 8, border: '1px solid rgba(46,204,113,0.2)' }}>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: '#2ecc71', fontWeight: 600 }}>
                {"\u2713 \u00c9ligible au PTZ : "}{fmt(result.ptz)}{" de pr\u00eat \u00e0 taux z\u00e9ro"}
              </p>
            </div>
          )}
          {!result.eligiblePTZ && premierAchat && (
            <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(231,76,60,0.1)', borderRadius: 8, border: '1px solid rgba(231,76,60,0.2)' }}>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: '#e74c3c' }}>
                {"Revenus sup\u00e9rieurs au plafond PTZ pour la zone "}{zone}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
