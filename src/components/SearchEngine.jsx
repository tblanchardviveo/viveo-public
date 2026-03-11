import { useState } from 'react'
import { supabase } from '../supabase'

const labelStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
  letterSpacing: '0.12em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.85)', display: 'block', marginBottom: 6
}
const inputStyle = {
  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 10, color: '#fff', padding: '10px 14px',
  fontFamily: "'Raleway', sans-serif", fontSize: 13, width: '100%', outline: 'none'
}
const pillOff = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.55)', borderRadius: 50, padding: '10px 24px',
  fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 500,
  cursor: 'pointer', transition: 'all 0.2s'
}
const pillOn = {
  background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
  border: '1px solid transparent', color: '#fff', borderRadius: 50,
  padding: '10px 24px', fontFamily: "'Raleway', sans-serif", fontSize: 13,
  fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s'
}
const typoPillOff = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.55)', borderRadius: 50, padding: '6px 16px',
  fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500,
  cursor: 'pointer', transition: 'all 0.2s'
}
const typoPillOn = {
  background: 'rgba(166,124,82,0.12)', border: '1px solid #A67C52',
  color: '#C4976A', borderRadius: 50, padding: '6px 16px',
  fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500,
  cursor: 'pointer', transition: 'all 0.2s'
}

export default function SearchEngine({ onResults, onRechercheEffectuee }) {
  const [projet, setProjet] = useState(null)
  const [secteur, setSecteur] = useState('')
  const [ville, setVille] = useState('')
  const [rayon, setRayon] = useState(10)
  const [typologies, setTypologies] = useState([])
  const [budget, setBudget] = useState([100000, 800000])
  const [dispositif, setDispositif] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const disabled = projet === null
  const disabledStyle = disabled ? { opacity: 0.4, pointerEvents: 'none' } : {}

  const toggleTypo = (t) => {
    setTypologies(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  }

  const fmtBudget = (v) => new Intl.NumberFormat('fr-FR').format(v) + ' \u20ac'

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from('programmes').select('*')
      if (projet) query = query.contains('type_projet', [projet])
      if (secteur) query = query.eq('secteur_viveo', secteur)
      if (ville) query = query.or(`ville.ilike.%${ville}%,code_postal.ilike.%${ville}%`)
      // TODO: rayon geographique - requires geodata column
      if (typologies.length > 0) query = query.contains('typologies', typologies)
      query = query.gte('prix_min', budget[0]).lte('prix_min', budget[1])
      if (dispositif) query = query.contains('dispositifs_fiscaux', [dispositif])
      const { data, error: err } = await query
      if (err) throw err
      onResults(data || [])
      onRechercheEffectuee(true)
    } catch (e) {
      console.error(e)
      setError('Erreur lors de la recherche. Veuillez r\u00e9essayer.')
      onResults([])
      onRechercheEffectuee(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', borderRadius: 20, padding: 32 }}>

      {/* LIGNE 1: PROJET */}
      <div style={{ marginBottom: 24 }}>
        <span style={labelStyle}>PROJET</span>
        <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
          <button style={projet === 'se_loger' ? pillOn : pillOff} onClick={() => setProjet(projet === 'se_loger' ? null : 'se_loger')}>Se loger</button>
          <button style={projet === 'investir' ? pillOn : pillOff} onClick={() => setProjet(projet === 'investir' ? null : 'investir')}>Investir</button>
        </div>
      </div>

      {/* LIGNE 2: GEOGRAPHIE */}
      <div style={{ ...disabledStyle, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>SECTEUR</span>
            <select value={secteur} onChange={e => setSecteur(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
              <option value="">Tous les secteurs</option>
              <option value="nord">Nord {"\u2014"} Hauts-de-France</option>
              <option value="idf">{"\u00cele-de-France"}</option>
              <option value="grand_ouest">Grand Ouest</option>
              <option value="rhone_alpes">{"Rh\u00f4ne-Alpes"}</option>
              <option value="sud_est">Sud-Est</option>
              <option value="sud_ouest">Sud-Ouest</option>
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <span style={labelStyle}>VILLE OU CODE POSTAL</span>
            <input type="text" placeholder="Ex : Lille, 59000, Lyon..." value={ville} onChange={e => setVille(e.target.value)} style={inputStyle} onFocus={e => e.target.style.borderColor = '#A67C52'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.14)'} />
          </div>
        </div>
        {ville && (
          <div style={{ marginTop: 16 }}>
            <span style={labelStyle}>RAYON : {rayon} km</span>
            <input type="range" min={5} max={30} step={5} value={rayon} onChange={e => setRayon(Number(e.target.value))} style={{ width: '100%', accentColor: '#A67C52' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'rgba(255,255,255,0.35)', fontFamily: "'Raleway', sans-serif" }}>
              <span>5 km</span><span>10</span><span>15</span><span>20</span><span>25</span><span>30 km</span>
            </div>
          </div>
        )}
      </div>

      {/* LIGNE 3: TYPOLOGIES */}
      <div style={{ ...disabledStyle, marginBottom: 24 }}>
        <span style={labelStyle}>TYPOLOGIES</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 4 }}>
          {['T1', 'T2', 'T3', 'T4', 'T5+', 'Maison', 'Appartement'].map(t => (
            <button key={t} style={typologies.includes(t) ? typoPillOn : typoPillOff} onClick={() => toggleTypo(t)}>{t}</button>
          ))}
        </div>
      </div>

      {/* LIGNE 4: BUDGET */}
      <div style={{ ...disabledStyle, marginBottom: 24 }}>
        <span style={labelStyle}>BUDGET : {fmtBudget(budget[0])} {"\u2014"} {fmtBudget(budget[1])}</span>
        <div style={{ position: 'relative', height: 40, marginTop: 8 }}>
          <input type="range" min={50000} max={1500000} step={10000} value={budget[0]} onChange={e => { const v = Number(e.target.value); if (v <= budget[1]) setBudget([v, budget[1]]) }} style={{ position: 'absolute', width: '100%', top: 8, height: 4, accentColor: '#A67C52', background: 'transparent', zIndex: 2, pointerEvents: 'auto', appearance: 'none', WebkitAppearance: 'none' }} />
          <input type="range" min={50000} max={1500000} step={10000} value={budget[1]} onChange={e => { const v = Number(e.target.value); if (v >= budget[0]) setBudget([budget[0], v]) }} style={{ position: 'absolute', width: '100%', top: 8, height: 4, accentColor: '#A67C52', background: 'transparent', zIndex: 2, pointerEvents: 'auto', appearance: 'none', WebkitAppearance: 'none' }} />
          <div style={{ position: 'absolute', top: 14, left: 0, right: 0, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ position: 'absolute', left: `${((budget[0] - 50000) / 1450000) * 100}%`, right: `${100 - ((budget[1] - 50000) / 1450000) * 100}%`, height: '100%', background: 'linear-gradient(135deg, #A67C52, #C4976A)', borderRadius: 2 }} />
          </div>
        </div>
        <style>{`
          input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #A67C52; cursor: pointer; border: 2px solid #fff; position: relative; z-index: 3; }
          input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #A67C52; cursor: pointer; border: 2px solid #fff; }
        `}</style>
      </div>

      {/* LIGNE 5: DISPOSITIFS FISCAUX */}
      {projet === 'investir' && (
        <div style={{ marginBottom: 24 }}>
          <span style={labelStyle}>DISPOSITIF FISCAL</span>
          <select value={dispositif} onChange={e => setDispositif(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            <option value="">Tous les dispositifs</option>
            <option value="LMNP">LMNP</option>
            <option value="Déficit Foncier">{"D\u00e9ficit Foncier"}</option>
            <option value="Nue-propriété">{"Nue-propri\u00e9t\u00e9"}</option>
            <option value="Monuments Historiques">Monuments Historiques</option>
            <option value="Loi Malraux">Loi Malraux</option>
            <option value="Loi Jeanbrun">Loi Jeanbrun</option>
            <option value="Loi Denormandie">Loi Denormandie</option>
          </select>
        </div>
      )}

      {/* BOUTON RECHERCHE */}
      <button onClick={handleSearch} disabled={disabled || loading} style={{ width: '100%', background: disabled ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', borderRadius: 50, padding: '16px 48px', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', fontFamily: "'Raleway', sans-serif", cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.4 : 1, transition: 'all 0.3s', border: 'none' }}
        onMouseEnter={e => { if (!disabled) { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(166,124,82,0.35)' } }}
        onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
      >{loading ? 'Recherche en cours...' : 'Rechercher les programmes \u2192'}</button>

      {error && <p style={{ marginTop: 12, fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,80,80,0.8)', textAlign: 'center' }}>{error}</p>}
    </div>
  )
}
