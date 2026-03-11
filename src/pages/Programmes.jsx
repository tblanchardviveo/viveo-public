import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SearchEngine from '../components/SearchEngine'

const PER_PAGE = 12

export default function Programmes() {
  const [programmes, setProgrammes] = useState([])
  const [rechercheEffectuee, setRechercheEffectuee] = useState(false)
  const [page, setPage] = useState(1)
  const gridRef = useRef(null)

  const handleResults = (results) => {
    if (results === null) {
      setProgrammes([])
      setRechercheEffectuee(false)
      setPage(1)
      return
    }
    setProgrammes(results)
    setRechercheEffectuee(true)
    setPage(1)
  }

  const totalPages = Math.ceil(programmes.length / PER_PAGE)
  const paginated = programmes.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const isNew = (d) => d && (Date.now() - new Date(d).getTime()) < 30 * 86400000
  const fmt = (n) => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' \u20ac' : ''

  const changePage = (p) => {
    setPage(p)
    if (gridRef.current) gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div>
      {/* HERO */}
      <div style={{
        background: 'var(--navy-deep)', padding: '120px 40px 80px',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 75% 30%, rgba(166,124,82,0.08) 0%, transparent 60%)'
        }} />
        <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{
              fontSize: 11, fontWeight: 600, letterSpacing: '0.22em',
              textTransform: 'uppercase', color: 'var(--bronze)',
              fontFamily: "'Raleway', sans-serif"
            }}>PROGRAMMES IMMOBILIERS NEUFS</span>
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(38px, 5vw, 60px)', color: '#fff', fontWeight: 400,
            lineHeight: 1.1, margin: 0,
            animation: 'fadeUp 0.6s ease 0.1s both'
          }}>
            Trouvez votre programme<br />
            <em style={{ color: 'var(--bronze-light)' }}>partout en France</em>
          </h1>
          <p style={{
            fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 17,
            color: 'rgba(255,255,255,0.55)', maxWidth: 560, marginTop: 20, lineHeight: 1.6,
            animation: 'fadeUp 0.6s ease 0.2s both'
          }}>
            Des programmes neufs sélectionnés pour leur qualité et leur potentiel patrimonial. De la Côte d'Opale à la Méditerranée.
          </p>
        </div>
      </div>

      {/* SEARCH ENGINE */}
      <div style={{
        maxWidth: 960, margin: '-40px auto 0', position: 'relative', zIndex: 10,
        padding: '32px 36px', background: 'var(--white)', borderRadius: 20,
        boxShadow: '0 8px 48px rgba(0,0,0,0.16)'
      }}>
        <SearchEngine mode="public" onResults={handleResults} />
      </div>

      {/* RESULTATS */}
      {rechercheEffectuee && (
        <div style={{ background: 'var(--cream)', padding: '80px 40px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={gridRef}>
            <p style={{
              fontFamily: "'Raleway', sans-serif", fontSize: 13,
              color: 'var(--muted)', marginBottom: 32
            }}>
              {programmes.length} programme{programmes.length !== 1 ? 's' : ''} trouvé{programmes.length !== 1 ? 's' : ''}
            </p>

            {programmes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🏗</div>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 24, color: 'var(--navy)', fontWeight: 400
                }}>Aucun programme ne correspond</h2>
                <p style={{
                  fontFamily: "'Raleway', sans-serif", fontWeight: 300,
                  fontSize: 14, color: 'var(--muted)', marginTop: 8
                }}>Essayez d'élargir votre périmètre ou vos critères.</p>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: 28
                }}>
                  {paginated.map(p => (
                    <Link to={`/programme/${p.slug}`} key={p.id} style={{
                      background: 'var(--white)', borderRadius: 16, overflow: 'hidden',
                      boxShadow: '0 2px 16px rgba(26,39,68,0.06)',
                      transition: 'transform 0.3s var(--ease), box-shadow 0.3s var(--ease)',
                      textDecoration: 'none', color: 'inherit', display: 'block'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(26,39,68,0.14)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(26,39,68,0.06)' }}
                    >
                      {/* Image */}
                      <div style={{ height: 220, position: 'relative', overflow: 'hidden' }}>
                        {p.photo_url ? (
                          <img src={p.photo_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{
                            width: '100%', height: '100%', background: 'var(--navy-deep)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'rgba(255,255,255,0.3)' }}>
                              {(p.nom || 'P').charAt(0)}
                            </span>
                          </div>
                        )}
                        {/* Badges */}
                        <div style={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 6 }}>
                          {isNew(p.created_at) && (
                            <span style={{ background: '#059669', color: '#fff', fontSize: 10, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>Nouveau</span>
                          )}
                          {p.badge_1 && (
                            <span style={{ background: 'rgba(17,28,51,0.85)', color: '#fff', fontSize: 10, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>{p.badge_1}</span>
                          )}
                          {p.badge_2 && (
                            <span style={{ background: 'var(--bronze)', color: '#fff', fontSize: 10, textTransform: 'uppercase', padding: '4px 12px', borderRadius: 99, fontWeight: 600 }}>{p.badge_2}</span>
                          )}
                        </div>
                      </div>

                      {/* Corps */}
                      <div style={{ padding: 24 }}>
                        {/* Eyebrow ville */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                          <span style={{ width: 20, height: 1, background: 'var(--bronze)', display: 'block' }} />
                          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>
                            {p.ville}
                          </span>
                        </div>

                        <h3 style={{
                          fontFamily: "'Playfair Display', Georgia, serif",
                          fontSize: 20, color: 'var(--navy)', fontWeight: 400,
                          margin: '0 0 6px', lineHeight: 1.2
                        }}>{p.nom}</h3>

                        {p.livraison && (
                          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'var(--muted)', margin: 0 }}>
                            🗓 {p.livraison}
                          </p>
                        )}

                        <div style={{ borderTop: '1px solid rgba(26,39,68,0.06)', margin: '16px 0', paddingTop: 16 }}>
                          {(p.typo_min || p.surface_min) && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                              {p.typo_min && (
                                <div>
                                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'var(--navy)', fontWeight: 600 }}>
                                    T{p.typo_min}{p.typo_max && p.typo_max !== p.typo_min ? ` → T${p.typo_max}` : ''}
                                  </div>
                                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Raleway', sans-serif" }}>Typologies</div>
                                </div>
                              )}
                              {p.surface_min && (
                                <div>
                                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'var(--navy)', fontWeight: 600 }}>
                                    {p.surface_min}{p.surface_max ? `–${p.surface_max}` : ''} m²
                                  </div>
                                  <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'Raleway', sans-serif" }}>Surfaces</div>
                                </div>
                              )}
                            </div>
                          )}

                          {p.prix_min && (
                            <div>
                              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'var(--bronze)', opacity: 0.7 }}>À partir de</span>
                              <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: 'var(--bronze)' }}>
                                {fmt(p.prix_min)}
                              </div>
                            </div>
                          )}

                          {p.dispositifs_fiscaux && p.dispositifs_fiscaux.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                              {p.dispositifs_fiscaux.map(d => (
                                <span key={d} style={{
                                  background: 'var(--bronze-pale)', color: 'var(--bronze)',
                                  borderRadius: 99, fontSize: 10, fontWeight: 600,
                                  letterSpacing: '0.08em', padding: '3px 10px', textTransform: 'uppercase',
                                  fontFamily: "'Raleway', sans-serif"
                                }}>{d}</span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'var(--bronze)', fontWeight: 600 }}>
                            Découvrir →
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 48 }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button key={n} onClick={() => changePage(n)} style={{
                        width: 36, height: 36, borderRadius: '50%', border: 'none',
                        background: n === page ? 'var(--navy)' : 'var(--white)',
                        color: n === page ? '#fff' : 'var(--navy)',
                        fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600,
                        cursor: 'pointer', boxShadow: n === page ? 'none' : '0 1px 4px rgba(26,39,68,0.1)',
                        transition: 'all 0.2s'
                      }}>{n}</button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
