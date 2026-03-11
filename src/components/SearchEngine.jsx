import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

const GOLD = 'linear-gradient(135deg, #735238, #D9B991, #A67C52)'
const NAVY = '#1A2744'
const BRONZE = '#A67C52'

const labelStyle = {
  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
  textTransform: 'uppercase', color: '#fff', marginBottom: 6, display: 'block'
}
const selectStyle = {
  width: '100%', background: 'transparent', border: 'none', outline: 'none',
  color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', fontWeight: 300,
  fontFamily: 'Raleway, sans-serif', cursor: 'pointer',
  WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none'
}
const optionStyle = { color: NAVY, background: '#fff' }
const cellStyle = {
  flex: 1, minWidth: 140, padding: '16px 20px',
  borderRight: '1px solid rgba(255,255,255,0.3)'
}

export default function SearchEngine({ mode = 'public', onResults }) {
  const [loc, setLoc] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSugg, setShowSugg] = useState(false)
  const [selectedGeo, setSelectedGeo] = useState(null)
  const [perimetre, setPerimetre] = useState('15')
  const [projet, setProjet] = useState('')
  const [residence, setResidence] = useState('')
  const [situation, setSituation] = useState('')
  const [typologie, setTypologie] = useState('')
  const [livraison, setLivraison] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [loading, setLoading] = useState(false)
  const [ptzEligible, setPtzEligible] = useState(false)
  const sugRef = useRef(null)

  useEffect(() => {
    if (loc.length < 3) { setSuggestions([]); return }
    const t = setTimeout(async () => {
      try {
        const isCP = /^\d{2,5}$/.test(loc)
        const url = isCP
          ? `https://geo.api.gouv.fr/communes?codePostal=${loc}&fields=nom,code,codesPostaux,departement,region,centre&limit=10`
          : `https://geo.api.gouv.fr/communes?nom=${encodeURIComponent(loc)}&fields=nom,code,codesPostaux,departement,region,centre&boost=population&limit=10`
        const r = await fetch(url)
        const data = await r.json()
        setSuggestions(data.map(c => ({
          label: `${c.nom} (${c.departement?.nom || ''}) - ${c.codesPostaux?.[0] || ''}`,
          nom: c.nom, code: c.code, cp: c.codesPostaux?.[0],
          dep: c.departement?.code, depNom: c.departement?.nom,
          region: c.region?.nom,
          lat: c.centre?.coordinates?.[1], lon: c.centre?.coordinates?.[0]
        })))
        setShowSugg(true)
      } catch (e) { console.error(e) }
    }, 300)
    return () => clearTimeout(t)
  }, [loc])

  useEffect(() => {
    setPtzEligible(projet === 'se-loger' && residence === 'principale' && situation === 'premier-achat')
  }, [projet, residence, situation])

  useEffect(() => {
    const handler = (e) => {
      if (sugRef.current && !sugRef.current.contains(e.target)) setShowSugg(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleSearch = async () => {
    setLoading(true)
    try {
      let query = supabase.from('programmes')
        .select('id, nom, slug, ville, code_postal, photo_url, prix_min, prix_max, vocation, dispositifs_fiscaux, typo_min, typo_max, surface_min, surface_max, badge_1, badge_2, livraison, secteur, latitude, longitude, created_at')
        .in('statut', ['Disponible', 'Bientot disponible'])

      if (projet === 'se-loger') {
        query = query.or('vocation.cs.{"RP"},vocation.cs.{"RS"}')
      }
      if (projet === 'investir') {
        query = query.contains('vocation', ['INV'])
      }
      if (typologie) {
        const t = parseInt(typologie)
        query = query.lte('typo_min', t).gte('typo_max', t)
      }
      if (budgetMin) query = query.gte('prix_min', parseInt(budgetMin))
      if (budgetMax) query = query.lte('prix_max', parseInt(budgetMax))
      if (livraison) query = query.lte('livraison', livraison)

      const { data, error } = await query
      if (error) throw error

      let filtered = data || []

      if (selectedGeo?.lat && selectedGeo?.lon && perimetre) {
        const km = parseInt(perimetre)
        filtered = filtered.filter(p => {
          if (!p.latitude || !p.longitude) return true
          const R = 6371
          const dLat = (p.latitude - selectedGeo.lat) * Math.PI / 180
          const dLon = (p.longitude - selectedGeo.lon) * Math.PI / 180
          const a = Math.sin(dLat / 2) ** 2 + Math.cos(selectedGeo.lat * Math.PI / 180) * Math.cos(p.latitude * Math.PI / 180) * Math.sin(dLon / 2) ** 2
          const dist = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          p._distance = Math.round(dist * 10) / 10
          return dist <= km
        })
        filtered.sort((a, b) => (a._distance || 999) - (b._distance || 999))
      }

      if (onResults) onResults(filtered)
    } catch (e) {
      console.error('Search error', e)
      if (onResults) onResults([])
    }
    setLoading(false)
  }

  const resetFilters = () => {
    setLoc(''); setSelectedGeo(null); setPerimetre('15'); setProjet('')
    setResidence(''); setSituation(''); setTypologie('')
    setLivraison(''); setBudgetMin(''); setBudgetMax('')
    if (onResults) onResults(null)
  }

  return (
    <div style={{ fontFamily: 'Raleway, sans-serif' }}>
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 0,
        background: GOLD, borderRadius: 30, overflow: 'hidden', marginBottom: 12
      }}>
        <div style={{ ...cellStyle, flex: 2, minWidth: 200, position: 'relative' }} ref={sugRef}>
          <span style={labelStyle}>Localisation</span>
          <input type="text" value={loc}
            onChange={e => { setLoc(e.target.value); setSelectedGeo(null) }}
            onFocus={() => suggestions.length > 0 && setShowSugg(true)}
            placeholder="Ville, code postal…"
            style={{ ...selectStyle, color: loc ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)', padding: 0 }}
          />
          {showSugg && suggestions.length > 0 && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 999,
              background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              maxHeight: 240, overflowY: 'auto', marginTop: 4
            }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => { setLoc(s.label); setSelectedGeo(s); setShowSugg(false) }}
                  style={{ padding: '10px 16px', cursor: 'pointer', fontSize: 14, color: NAVY, borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f7f4ef'}
                  onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                >{s.label}</div>
              ))}
            </div>
          )}
        </div>
        <div style={cellStyle}>
          <span style={labelStyle}>Périmètre</span>
          <select value={perimetre} onChange={e => setPerimetre(e.target.value)} style={selectStyle}>
            {['5', '10', '15', '20', '30'].map(v => <option key={v} value={v} style={optionStyle}>{v} km</option>)}
          </select>
        </div>
        <div style={cellStyle}>
          <span style={labelStyle}>Votre projet</span>
          <select value={projet} onChange={e => { setProjet(e.target.value); setResidence(''); setSituation('') }} style={selectStyle}>
            <option value="" style={optionStyle}>Choisir...</option>
            <option value="se-loger" style={optionStyle}>Se Loger</option>
            <option value="investir" style={optionStyle}>Investir</option>
          </select>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px 32px', background: '#fff', cursor: 'pointer',
          borderRadius: '0 30px 30px 0', minWidth: 160
        }} onClick={handleSearch}>
          <span style={{ color: BRONZE, fontWeight: 600, fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {loading ? 'Recherche...' : 'Rechercher'}
          </span>
        </div>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 0,
        background: GOLD, borderRadius: 30, overflow: 'hidden',
        opacity: projet ? 1 : 0.4, transition: 'opacity 0.3s',
        pointerEvents: projet ? 'auto' : 'none'
      }}>
        {projet === 'se-loger' && (
          <div style={cellStyle}>
            <span style={labelStyle}>Résidence</span>
            <select value={residence} onChange={e => { setResidence(e.target.value); setSituation('') }} style={selectStyle}>
              <option value="" style={optionStyle}>Choisir...</option>
              <option value="principale" style={optionStyle}>Résidence principale</option>
              <option value="secondaire" style={optionStyle}>Résidence secondaire</option>
            </select>
          </div>
        )}
        {projet === 'se-loger' && residence === 'principale' && (
          <div style={cellStyle}>
            <span style={labelStyle}>Situation</span>
            <select value={situation} onChange={e => setSituation(e.target.value)} style={selectStyle}>
              <option value="" style={optionStyle}>Choisir...</option>
              <option value="premier-achat" style={optionStyle}>Premier achat</option>
              <option value="second-achat" style={optionStyle}>Second achat</option>
            </select>
          </div>
        )}
        <div style={cellStyle}>
          <span style={labelStyle}>Typologie</span>
          <select value={typologie} onChange={e => setTypologie(e.target.value)} style={selectStyle}>
            <option value="" style={optionStyle}>Toutes</option>
            {[1, 2, 3, 4, 5].map(t => <option key={t} value={t} style={optionStyle}>T{t}{t === 5 ? '+' : ''}</option>)}
          </select>
        </div>
        <div style={cellStyle}>
          <span style={labelStyle}>Livraison max</span>
          <select value={livraison} onChange={e => setLivraison(e.target.value)} style={selectStyle}>
            <option value="" style={optionStyle}>Peu importe</option>
            <option value="2026-06-30" style={optionStyle}>Immédiate</option>
            <option value="2026-12-31" style={optionStyle}>{'< 6 mois'}</option>
            <option value="2027-03-31" style={optionStyle}>{'< 1 an'}</option>
            <option value="2028-03-31" style={optionStyle}>{'< 2 ans'}</option>
            <option value="2029-03-31" style={optionStyle}>{'< 3 ans'}</option>
          </select>
        </div>
        <div style={{ ...cellStyle, borderRight: 'none' }}>
          <span style={labelStyle}>Budget</span>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="number" placeholder="Min €" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} style={{ ...selectStyle, width: '45%' }} />
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>–</span>
            <input type="number" placeholder="Max €" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} style={{ ...selectStyle, width: '45%' }} />
          </div>
        </div>
      </div>

      {ptzEligible && (
        <div style={{
          marginTop: 16, padding: '12px 24px', borderRadius: 12,
          background: 'linear-gradient(135deg, #D4AF37, #F5E6A3, #D4AF37)',
          color: '#5C3D1A', fontWeight: 600, fontSize: 14,
          display: 'inline-flex', alignItems: 'center', gap: 8
        }}>
          Éligibilité PTZ détectée — Premier achat, résidence principale
        </div>
      )}

      {(projet || loc) && (
        <div style
