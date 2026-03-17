import { useState } from 'react'

const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
const pct = (n) => (Math.round(n * 100) / 100).toFixed(2) + '%'

const DISPOSITIFS = [
  { id: 'lmnp', label: 'LMNP', amortissement: true, dureeAmort: 25 },
  { id: 'denormandie', label: 'Denormandie', reductionMax: 0.21, dureeMax: 12 },
  { id: 'deficit_foncier', label: "D\u00e9ficit Foncier", plafond: 10700 },
  { id: 'malraux', label: 'Malraux', reductionTravaux: 0.30 },
  { id: 'monuments', label: 'Monuments Historiques', deductionTotale: true },
  { id: 'nue_propriete', label: "Nue-propri\u00e9t\u00e9", decote: 0.40 }
]

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

export default function CalcInvestissement({ onResult }) {
  const [prixBien, setPrixBien] = useState('')
  const [loyerMensuel, setLoyerMensuel] = useState('')
  const [charges, setCharges] = useState('')
  const [apport, setApport] = useState('')
  const [duree, setDuree] = useState('20')
  const [taux, setTaux] = useState('3.5')
  const [dispositif, setDispositif] = useState('lmnp')
  const [trancheMarg, setTrancheMarg] = useState('30')
  const [result, setResult] = useState(null)

  const calculer = () => {
    const prix = parseFloat(prixBien) || 0
    const loyer = parseFloat(loyerMensuel) || 0
    const ch = parseFloat(charges) || 0
    const app = parseFloat(apport) || 0
    const d = parseInt(duree) || 20
    const t = (parseFloat(taux) || 3.5) / 100 / 12
    const tmi = parseInt(trancheMarg) || 30

    const montantEmprunt = prix - app
    const nbMois = d * 12
    const mensualite = montantEmprunt > 0 ? (montantEmprunt * t) / (1 - Math.pow(1 + t, -nbMois)) : 0

    const loyerAnnuel = loyer * 12
    const chargesAnnuelles = ch * 12
    const cashflowMensuel = loyer - mensualite - ch
    const rendementBrut = prix > 0 ? (loyerAnnuel / prix) * 100 : 0
    const rendementNet = prix > 0 ? ((loyerAnnuel - chargesAnnuelles) / prix) * 100 : 0

    let avantFiscal = 0
    const disp = DISPOSITIFS.find(dd => dd.id === dispositif)
    if (dispositif === 'lmnp') {
      const amortAnnuel = prix / 25
      avantFiscal = amortAnnuel * (tmi / 100)
    } else if (dispositif === 'denormandie') {
      avantFiscal = (prix * 0.21 / 12) * (tmi > 0 ? 1 : 0)
    } else if (dispositif === 'deficit_foncier') {
      avantFiscal = Math.min(10700, chargesAnnuelles) * (tmi / 100)
    } else if (dispositif === 'malraux') {
      avantFiscal = prix * 0.30 * 0.30
    } else if (dispositif === 'monuments') {
      avantFiscal = chargesAnnuelles * (tmi / 100)
    } else if (dispositif === 'nue_propriete') {
      avantFiscal = prix * 0.40 / d
    }

    const res = {
      mensualite: Math.round(mensualite),
      cashflowMensuel: Math.round(cashflowMensuel),
      rendementBrut: Math.round(rendementBrut * 100) / 100,
      rendementNet: Math.round(rendementNet * 100) / 100,
      avantFiscalAnnuel: Math.round(avantFiscal),
      coutTotal: Math.round(mensualite * nbMois),
      montantEmprunt: Math.round(montantEmprunt),
      dispositifLabel: disp ? disp.label : ''
    }
    setResult(res)
    if (onResult) onResult(res)
  }

  return (
    <div style={{ background: 'var(--navy-deep)', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', border: '1px solid rgba(166,124,82,0.15)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>
          {"Rendement & Fiscalit\u00e9"}
        </span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', fontWeight: 400, marginBottom: 32 }}>
        Investissement locatif
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 24 }}>
        <div>
          <label style={labelStyle}>Prix du bien</label>
          <input type="number" value={prixBien} onChange={e => setPrixBien(e.target.value)} placeholder="200 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Loyer mensuel</label>
          <input type="number" value={loyerMensuel} onChange={e => setLoyerMensuel(e.target.value)} placeholder="800" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Charges mensuelles</label>
          <input type="number" value={charges} onChange={e => setCharges(e.target.value)} placeholder="150" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Apport</label>
          <input type="number" value={apport} onChange={e => setApport(e.target.value)} placeholder="20 000" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{"Durée (ann\u00e9es)"}</label>
          <select value={duree} onChange={e => setDuree(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {[10,15,20,25].map(n => <option key={n} value={n} style={{ background: '#1A2744' }}>{n} ans</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>Taux (%)</label>
          <input type="number" step="0.1" value={taux} onChange={e => setTaux(e.target.value)} placeholder="3.5" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Dispositif fiscal</label>
          <select value={dispositif} onChange={e => setDispositif(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {DISPOSITIFS.map(d => <option key={d.id} value={d.id} style={{ background: '#1A2744' }}>{d.label}</option>)}
          </select>
        </div>
        <div>
          <label style={labelStyle}>TMI (%)</label>
          <select value={trancheMarg} onChange={e => setTrancheMarg(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {[0,11,30,41,45].map(n => <option key={n} value={n} style={{ background: '#1A2744' }}>{n}%</option>)}
          </select>
        </div>
      </div>

      <button onClick={calculer} style={{
        background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff',
        border: 'none', borderRadius: 50, padding: '14px 40px', fontSize: 13,
        fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
        fontFamily: "'Raleway', sans-serif", cursor: 'pointer', transition: 'all 0.3s',
        width: '100%', marginTop: 8
      }}>
        {"Simuler \u2192"}
      </button>

      {result && (
        <div style={{ marginTop: 32, padding: 24, background: 'rgba(166,124,82,0.08)', borderRadius: 12, border: '1px solid rgba(166,124,82,0.15)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 20 }}>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Rendement brut</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: 'var(--bronze)', fontWeight: 400 }}>{result.rendementBrut}%</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Rendement net</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>{result.rendementNet}%</p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>Cashflow</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: result.cashflowMensuel >= 0 ? '#2ecc71' : '#e74c3c', fontWeight: 400 }}>{fmt(result.cashflowMensuel)}<span style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)' }}>/mois</span></p>
            </div>
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{"Mensualit\u00e9"}</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#fff', fontWeight: 400 }}>{fmt(result.mensualite)}</p>
            </div>
          </div>
          <div style={{ marginTop: 20, padding: '16px 20px', background: 'rgba(166,124,82,0.12)', borderRadius: 8 }}>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'var(--bronze)', fontWeight: 600 }}>
              {result.dispositifLabel}{" \u2014 Avantage fiscal estim\u00e9 : "}{fmt(result.avantFiscalAnnuel)}{"/an"}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
