import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'

const SECTEURS = [
  { label: 'Hauts-de-France', value: 'HDF' },
  { label: 'Ile-de-France', value: 'IDF' },
  { label: 'Grand Est', value: 'GE' },
  { label: 'Normandie', value: 'NOR' },
  { label: 'PACA', value: 'PACA' },
  { label: 'Occitanie', value: 'OCC' }
]

const DISPOSITIFS = ['LMNP', 'Denormandie', 'Deficit foncier', 'Malraux']
const TYPOLOGIES = ['Appartement', 'Maison', 'Villa']

const eyebrow = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  color: 'var(--bronze)', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
  fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem'
}
const eyebrowLine = { flex: 1, height: 1, background: 'var(--bronze-light)' }

const cardStyle = {
  background: '#fff', borderRadius: 12, overflow: 'hidden',
  boxShadow: '0 2px 16px rgba(26,39,68,0.08)', transition: 'transform 0.2s, box-shadow 0.2s',
  cursor: 'pointer', textDecoration: 'none', color: 'inherit'
}

const toggleBase = {
  padding: '0.4rem 1rem', borderRadius: 20, fontSize: '0.8rem',
  fontFamily: 'var(--font-body)', fontWeight: 500, cursor: 'pointer',
  border: '1.5px solid var(--gris-chaud)', background: 'transparent',
  color: 'var(--navy)', transition: 'all 0.2s'
}
const toggleActive = {
  ...toggleBase, background: 'var(--navy)', color: '#fff', borderColor: 'var(--navy)'
}

export default function Programmes() {
  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)
  const [recherche, setRecherche] = useState('')
  const [secteur, setSecteur] = useState('')
  const [dispositif, setDispositif] = useState('')
  const [typologie, setTypologie] = useState('')
  const [budgetMin, setBudgetMin] = useState(0)
  const [budgetMax, setBudgetMax] = useState(1000000)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('programmes')
      .select('id, nom, slug, ville, code_postal, image_url, prix_min, prix_max, type_bien, dispositif, promoteur, livraison_trim, livraison_an, secteur')
      .eq('statut', 'publie')
      .order('date_publication', { ascending: false })
      .then(({ data, error }) => {
        if (!error) setProgrammes(data || [])
        setLoading(false)
      })
  }, [])

  const filtered = programmes.filter(p => {
    if (recherche && !p.nom?.toLowerCase().includes(recherche.toLowerCase()) && !p.ville?.toLowerCase().includes(recherche.toLowerCase())) return false
    if (secteur && p.secteur !== secteur) return false
    if (dispositif && p.dispositif !== dispositif) return false
    if (typologie && p.type_bien !== typologie) return false
    if (p.prix_min && p.prix_min > budgetMax) return false
    if (p.prix_max && p.prix_max < budgetMin) return false
    return true
  })

  const fmt = n => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' EUR' : ''

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ ...eyebrow, justifyContent: 'center' }}>
          <span style={eyebrowLine}></span>
          <span>Nos programmes</span>
          <span style={eyebrowLine}></span>
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--navy)', margin: '0.5rem 0 0.75rem' }}>Programmes immobiliers</h1>
        <p style={{ color: 'var(--gris-texte)', fontFamily: 'var(--font-body)', fontSize: '1rem', maxWidth: 600, margin: '0 auto' }}>Decouvrez notre selection de programmes neufs en investissement immobilier</p>
      </div>

      {/* Moteur de recherche */}
      <div style={{ background: '#fff', borderRadius: 16, padding: '1.5rem', boxShadow: '0 2px 20px rgba(26,39,68,0.07)', marginBottom: '2rem' }}>
        {/* Recherche + Secteur */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <input
            type="text" placeholder="Rechercher par nom ou ville..."
            value={recherche} onChange={e => setRecherche(e.target.value)}
            style={{ flex: 2, minWidth: 200, padding: '0.65rem 1rem', borderRadius: 8, border: '1.5px solid var(--gris-chaud)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', outline: 'none' }}
          />
          <select
            value={secteur} onChange={e => setSecteur(e.target.value)}
            style={{ flex: 1, minWidth: 160, padding: '0.65rem 1rem', borderRadius: 8, border: '1.5px solid var(--gris-chaud)', fontFamily: 'var(--font-body)', fontSize: '0.9rem', background: '#fff' }}
          >
            <option value="">Tous les secteurs</option>
            {SECTEURS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
        </div>

        {/* Dispositifs toggles */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--gris-texte)', fontFamily: 'var(--font-body)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Dispositif</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setDispositif('')} style={dispositif === '' ? toggleActive : toggleBase}>Tous</button>
            {DISPOSITIFS.map(d => <button key={d} onClick={() => setDispositif(d)} style={dispositif === d ? toggleActive : toggleBase}>{d}</button>)}
          </div>
        </div>

        {/* Typologies toggles */}
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--gris-texte)', fontFamily: 'var(--font-body)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Typologie</p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button onClick={() => setTypologie('')} style={typologie === '' ? toggleActive : toggleBase}>Tous</button>
            {TYPOLOGIES.map(t => <button key={t} onClick={() => setTypologie(t)} style={typologie === t ? toggleActive : toggleBase}>{t}</button>)}
          </div>
        </div>

        {/* Budget range */}
        <div>
          <p style={{ fontSize: '0.75rem', color: 'var(--gris-texte)', fontFamily: 'var(--font-body)', marginBottom: '0.5rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>Budget : {fmt(budgetMin)} - {fmt(budgetMax)}</p>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--gris-texte)' }}>0</span>
            <input type="range" min={0} max={1000000} step={10000} value={budgetMin} onChange={e => { const v = +e.target.value; if (v <= budgetMax) setBudgetMin(v) }} style={{ flex: 1, accentColor: 'var(--bronze)' }} />
            <input type="range" min={0} max={1000000} step={10000} value={budgetMax} onChange={e => { const v = +e.target.value; if (v >= budgetMin) setBudgetMax(v) }} style={{ flex: 1, accentColor: 'var(--bronze)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--gris-texte)' }}>1M</span>
          </div>
        </div>
      </div>

      {/* Resultats */}
      <p style={{ color: 'var(--gris-texte)', fontSize: '0.9rem', marginBottom: '1.5rem', fontFamily: 'var(--font-body)' }}>{filtered.length} programme{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-texte)' }}>Chargement...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '3rem', color: 'var(--gris-texte)' }}>Aucun programme ne correspond a vos criteres.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {filtered.map(p => (
            <Link to={`/programme/${p.slug}`} key={p.id} style={cardStyle}>
              <div style={{ height: 200, background: 'var(--gris-chaud)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {p.image_url ? <img src={p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '3rem' }}>🏢</span>}
              </div>
              <div style={{ padding: '1.2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', margin: '0 0 0.3rem', color: 'var(--navy)' }}>{p.nom}</h3>
                <p style={{ color: 'var(--gris-texte)', fontSize: '0.85rem', margin: '0 0 0.75rem', fontFamily: 'var(--font-body)' }}>{p.ville} ({p.code_postal})</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--bronze)', fontWeight: 600, fontSize: '1rem', fontFamily: 'var(--font-body)' }}>A partir de {fmt(p.prix_min)}</span>
                  {p.dispositif && <span style={{ background: 'var(--navy-light)', color: '#fff', padding: '0.2rem 0.6rem', borderRadius: 12, fontSize: '0.7rem', fontWeight: 500 }}>{p.dispositif}</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
