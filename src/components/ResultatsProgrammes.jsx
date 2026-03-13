import { Link } from 'react-router-dom'

const fmt = (n) => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' \u20ac' : ''

export default function ResultatsProgrammes({ programmes = [], loading = false }) {
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(166,124,82,0.2)', borderTopColor: 'var(--bronze)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginTop: 16 }}>Recherche en cours...</p>
      </div>
    )
  }

  if (programmes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: 60 }}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: '#fff', marginBottom: 8 }}>Aucun programme</p>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
          {"Modifiez vos crit\u00e8res de recherche pour trouver des programmes correspondants."}
        </p>
      </div>
    )
  }

  return (
    <div>
      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 24, letterSpacing: '0.05em' }}>
        {programmes.length} programme{programmes.length > 1 ? 's' : ''} {programmes.length > 1 ? 'correspondent' : 'correspond'} {"\u00e0 votre recherche"}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: 24 }}>
        {programmes.map((p, i) => (
          <Link key={p.id || i} to={`/programme/${p.slug}`} style={{ textDecoration: 'none', animation: `fadeUp 0.5s ease ${i * 0.1}s both` }}>
            <div style={{
              background: 'var(--navy-deep)', borderRadius: 12, overflow: 'hidden',
              border: '1px solid rgba(166,124,82,0.12)', transition: 'transform 0.3s, box-shadow 0.3s',
              cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{ height: 200, background: p.photo_url ? `url(${p.photo_url}) center/cover` : 'linear-gradient(135deg, #1A2744, #2a3a5c)', position: 'relative' }}>
                {p.statut && (
                  <span style={{
                    position: 'absolute', top: 12, left: 12, background: 'rgba(166,124,82,0.9)',
                    color: '#fff', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em',
                    textTransform: 'uppercase', padding: '4px 10px', borderRadius: 4,
                    fontFamily: "'Raleway', sans-serif"
                  }}>{p.statut}</span>
                )}
                {p.dispositifs_fiscaux && p.dispositifs_fiscaux.length > 0 && (
                  <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {p.dispositifs_fiscaux.slice(0, 3).map((d, j) => (
                      <span key={j} style={{
                        background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                        color: 'var(--bronze)', fontSize: 9, fontWeight: 600, padding: '3px 8px',
                        borderRadius: 3, fontFamily: "'Raleway', sans-serif", textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}>{d}</span>
                    ))}
                  </div>
                )}
              </div>
              <div style={{ padding: '20px 20px 24px' }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'var(--bronze)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                  {p.ville || p.secteur_viveo || ''}
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#fff', fontWeight: 400, marginBottom: 12, lineHeight: 1.3 }}>
                  {p.nom}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {p.typologies || ''}{p.surface_min ? ` \u00b7 d\u00e8s ${p.surface_min}m\u00b2` : ''}
                  </span>
                  {p.prix_min && (
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: 'var(--bronze)' }}>
                      {fmt(p.prix_min)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </div>
  )
}
