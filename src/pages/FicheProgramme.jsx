import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function FicheProgramme() {
  const { slug } = useParams()
  const [programme, setProgramme] = useState(null)
  const [lots, setLots] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('programmes')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        setProgramme(data)
        if (data) {
          supabase
            .from('lots')
            .select('*')
            .eq('programme_id', data.id)
            .order('prix', { ascending: true })
            .then(({ data: lotsData }) => setLots(lotsData || []))
        }
        setLoading(false)
      })
  }, [slug])

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><p style={{ color: '#999' }}>Chargement...</p></div>
  if (!programme) return <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}><p>Programme introuvable.</p><Link to="/" style={{ color: '#c8a96e' }}>Retour aux programmes</Link></div>

  const p = programme
  const lotsDisponibles = lots.filter(l => l.statut === 'Disponible')

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Navigation */}
      <Link to="/" style={{ color: '#c8a96e', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: '1.5rem' }}>
        &#8592; Retour aux programmes
      </Link>

      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          {p.etiquette && <span style={{ background: '#c8a96e', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{p.etiquette}</span>}
          {p.dispositif && <span style={{ background: '#1a1a2e', color: '#fff', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{p.dispositif}</span>}
          {p.type_bien && <span style={{ background: '#e8f4f8', color: '#2a7ab5', padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600 }}>{p.type_bien}</span>}
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#1a1a2e', margin: '0 0 0.25rem' }}>{p.nom}</h1>
        <p style={{ color: '#666', fontSize: '1.1rem' }}>{p.ville} ({p.code_postal}) {p.secteur && `- ${p.secteur}`}</p>
        {p.adresse && <p style={{ color: '#999', fontSize: '0.9rem' }}>{p.adresse}</p>}
      </div>

      {/* Image */}
      {p.image_url && (
        <div style={{ marginBottom: '2rem', borderRadius: 12, overflow: 'hidden' }}>
          <img src={p.image_url} alt={p.nom} style={{ width: '100%', maxHeight: 450, objectFit: 'cover' }} />
        </div>
      )}

      {/* Infos principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {p.prix_min && (
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: 4 }}>A partir de</div>
            <div style={{ fontWeight: 700, color: '#c8a96e', fontSize: '1.3rem' }}>{Number(p.prix_min).toLocaleString('fr-FR')} EUR</div>
          </div>
        )}
        {p.livraison_trim && p.livraison_an && (
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: 4 }}>Livraison</div>
            <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>{p.livraison_trim} {p.livraison_an}</div>
          </div>
        )}
        {p.promoteur && (
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: 4 }}>Promoteur</div>
            <div style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '1.1rem' }}>{p.promoteur}</div>
          </div>
        )}
        {lotsDisponibles.length > 0 && (
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: 8, textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.8rem', marginBottom: 4 }}>Lots disponibles</div>
            <div style={{ fontWeight: 700, color: '#27ae60', fontSize: '1.1rem' }}>{lotsDisponibles.length}</div>
          </div>
        )}
      </div>

      {/* Description */}
      {p.description && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.75rem' }}>Description</h2>
          <p style={{ color: '#444', lineHeight: 1.7 }}>{p.description}</p>
        </div>
      )}

      {/* Lots disponibles */}
      {lots.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.75rem' }}>Lots disponibles</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#666', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#666', fontWeight: 600 }}>Surface</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#666', fontWeight: 600 }}>Etage</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', color: '#666', fontWeight: 600 }}>Prix</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: '#666', fontWeight: 600 }}>Statut</th>
                </tr>
              </thead>
              <tbody>
                {lots.map(l => (
                  <tr key={l.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '0.75rem' }}>{l.type_lot}</td>
                    <td style={{ padding: '0.75rem' }}>{l.surface} m2</td>
                    <td style={{ padding: '0.75rem' }}>{l.etage}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'right', fontWeight: 600 }}>{l.prix ? `${Number(l.prix).toLocaleString('fr-FR')} EUR` : '-'}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{ padding: '3px 10px', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600, background: l.statut === 'Disponible' ? '#d4edda' : '#f8d7da', color: l.statut === 'Disponible' ? '#155724' : '#721c24' }}>{l.statut}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Avantages fiscaux */}
      {p.dispositif && (
        <div style={{ marginBottom: '2rem', background: '#f0f4ff', padding: '1.5rem', borderRadius: 12 }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#1a1a2e', marginBottom: '0.75rem' }}>Avantage fiscal</h2>
          <p style={{ color: '#444' }}>Ce programme est eligible au dispositif <strong>{p.dispositif}</strong>.</p>
          {p.tva_reduite && p.tva_reduite !== 'non' && <p style={{ color: '#444', marginTop: '0.5rem' }}>TVA reduite applicable.</p>}
        </div>
      )}

      {/* Contact CTA */}
      <div style={{ background: '#1a1a2e', color: '#fff', padding: '2rem', borderRadius: 12, textAlign: 'center', marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem' }}>Interesse par ce programme ?</h2>
        <p style={{ color: '#ccc', marginBottom: '1rem' }}>Contactez nos conseillers pour plus d'informations</p>
        <a href="mailto:contact@viveo-patrimoine.fr" style={{ display: 'inline-block', background: '#c8a96e', color: '#fff', padding: '0.75rem 2rem', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Nous contacter</a>
      </div>
    </div>
  )
}
