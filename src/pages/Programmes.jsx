import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'

const FILTERS = {
  villes: [],
  dispositifs: ['Pinel', 'LMNP', 'Denormandie', 'Malraux', 'Deficit foncier'],
  types: ['Appartement', 'Maison', 'Villa']
}

export default function Programmes() {
  const [programmes, setProgrammes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtreVille, setFiltreVille] = useState('')
  const [filtreDispositif, setFiltreDispositif] = useState('')
  const [filtreType, setFiltreType] = useState('')
  const [recherche, setRecherche] = useState('')

  useEffect(() => {
    setLoading(true)
    supabase
      .from('programmes')
      .select('id, nom, slug, ville, code_postal, image_url, prix_min, type_bien, dispositif, promoteur, livraison_trim, livraison_an, secteur, etiquette')
      .eq('statut', 'publie')
      .order('date_publication', { ascending: false })
      .then(({ data, error }) => {
        if (!error) {
          setProgrammes(data || [])
          const villes = [...new Set((data || []).map(p => p.ville).filter(Boolean))]
          FILTERS.villes = villes
        }
        setLoading(false)
      })
  }, [])

  const filtered = programmes.filter(p => {
    if (filtreVille && p.ville !== filtreVille) return false
    if (filtreDispositif && p.dispositif !== filtreDispositif) return false
    if (filtreType && p.type_bien !== filtreType) return false
    if (recherche && !p.nom?.toLowerCase().includes(recherche.toLowerCase()) && !p.ville?.toLowerCase().includes(recherche.toLowerCase())) return false
    return true
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '0.5rem' }}>Nos programmes immobiliers</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>Decouvrez notre selection de programmes neufs en investissement immobilier</p>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: 8 }}>
        <input
          type="text"
          placeholder="Rechercher par nom ou ville..."
          value={recherche}
          onChange={e => setRecherche(e.target.value)}
          style={{ flex: 1, minWidth: 200, padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.9rem' }}
        />
        <select value={filtreVille} onChange={e => setFiltreVille(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6 }}>
          <option value="">Toutes les villes</option>
          {FILTERS.villes.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select value={filtreDispositif} onChange={e => setFiltreDispositif(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6 }}>
          <option value="">Tous les dispositifs</option>
          {FILTERS.dispositifs.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filtreType} onChange={e => setFiltreType(e.target.value)} style={{ padding: '0.5rem 1rem', border: '1px solid #ddd', borderRadius: 6 }}>
          <option value="">Tous les types</option>
          {FILTERS.types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '3rem' }}>Chargement...</p>
      ) : filtered.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '3rem' }}>Aucun programme ne correspond a vos criteres.</p>
      ) : (
        <>
          <p style={{ color: '#666', marginBottom: '1rem' }}>{filtered.length} programme{filtered.length > 1 ? 's' : ''} disponible{filtered.length > 1 ? 's' : ''}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(p => (
              <Link key={p.id} to={`/programme/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, overflow: 'hidden', transition: 'box-shadow 0.2s, transform 0.2s', cursor: 'pointer' }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}>
                  <div style={{ position: 'relative', height: 220, background: '#f0f0f0', overflow: 'hidden' }}>
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#bbb', fontSize: '3rem' }}>&#127970;</div>
                    )}
                    {p.etiquette && (
                      <span style={{ position: 'absolute', top: 12, left: 12, background: '#c8a96e', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{p.etiquette}</span>
                    )}
                    {p.dispositif && (
                      <span style={{ position: 'absolute', top: 12, right: 12, background: '#1a1a2e', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{p.dispositif}</span>
                    )}
                  </div>
                  <div style={{ padding: '1.25rem' }}>
                    <h2 style={{ fontSize: '1.15rem', fontWeight: 600, color: '#1a1a2e', margin: '0 0 0.5rem' }}>{p.nom}</h2>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.75rem' }}>{p.ville} ({p.code_postal})</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, color: '#c8a96e', fontSize: '1.1rem' }}>{p.prix_min ? `A partir de ${Number(p.prix_min).toLocaleString('fr-FR')} EUR` : 'Prix sur demande'}</span>
                      {p.livraison_trim && p.livraison_an && (
                        <span style={{ fontSize: '0.8rem', color: '#999' }}>Livraison {p.livraison_trim} {p.livraison_an}</span>
                      )}
                    </div>
                    {p.promoteur && <p style={{ fontSize: '0.8rem', color: '#999', marginTop: '0.5rem' }}>Par {p.promoteur}</p>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
