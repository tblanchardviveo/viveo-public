import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchEngine from '../components/SearchEngine'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const PER_PAGE = 12

const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

const fmt = (n) => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' €' : ''

export default function Programmes() {
  const [programmes, setProgrammes] = useState([])
  const [rechercheEffectuee, setRechercheEffectuee] = useState(false)
  const [page, setPage] = useState(0)

  const totalPages = Math.ceil(programmes.length / PER_PAGE)
  const paginated = programmes.slice(page * PER_PAGE, (page + 1) * PER_PAGE)

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--navy-deep)', backgroundImage: 'url(/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px) 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 75% 30%, rgba(166,124,82,0.10) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow>CATALOGUE VIVEO</Eyebrow>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(38px, 5vw, 64px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, animation: 'fadeUp 0.6s ease 0.1s both' }}>
            Trouvez votre programme {"—"}<br />
            <em style={{ fontStyle: 'italic', color: '#C4976A' }}>au bon endroit.</em>
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.55)', maxWidth: 600, marginTop: 24, lineHeight: 1.6, animation: 'fadeUp 0.6s ease 0.2s both' }}>
            27 ans d'expertise promoteur. Des programmes vérifiés, négociés. Pas un catalogue — une sélection d'expert.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap', animation: 'fadeUp 0.6s ease 0.3s both' }}>
            {[['Se Loger', '/se-loger/'], ['Investir', '/investir/'], ["L'Approche VIVEO", '/approche-viveo/']].map(([label, path]) => (
              <a key={label} href={`${WP}${path}`} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 99, padding: '8px 18px', fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.background = 'rgba(166,124,82,0.12)'; e.target.style.borderColor = '#A67C52'; e.target.style.color = '#C4976A' }}
                onMouseLeave={e => { e.target.style.background = 'rgba(255,255,255,0.06)'; e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'rgba(255,255,255,0.65)' }}
              >{label}</a>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH ENGINE */}
      <section style={{ background: 'var(--navy-deep)', padding: '0 40px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <SearchEngine onResults={setProgrammes} onRechercheEffectuee={setRechercheEffectuee} />
        </div>
      </section>

      {/* RESULTS GRID */}
      {rechercheEffectuee && (
        <section style={{ background: 'var(--cream)', padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 40px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {programmes.length === 0 ? (
              <p style={{ textAlign: 'center', fontFamily: "'Raleway', sans-serif", fontSize: 15, color: '#666' }}>Aucun programme ne correspond à cette recherche.</p>
            ) : (
              <>
                <Eyebrow>RÉSULTATS</Eyebrow>
                <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 400, color: 'var(--navy-deep)', marginBottom: 40 }}>Programmes sélectionnés</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: 24 }}>
                  {paginated.map((p, i) => (
                    <div key={p.id || i} style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 24px rgba(26,39,68,0.08)', transition: 'all 0.3s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 40px rgba(26,39,68,0.14)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 24px rgba(26,39,68,0.08)' }}
                    >
                      {p.photo_url ? (
                        <img src={p.photo_url} alt={p.nom} style={{ width: '100%', height: 200, objectFit: 'cover' }} />
                      ) : (
                        <div style={{ width: '100%', height: 200, background: 'var(--navy-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontSize: 48, color: 'var(--bronze)', opacity: 0.4 }}>{"⌂"}</span>
                        </div>
                      )}
                      <div style={{ padding: 24 }}>
                        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{p.ville || p.secteur_viveo || ''}</span>
                        <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 18, fontWeight: 500, color: 'var(--navy-deep)', margin: '8px 0 12px' }}>{p.nom}</h3>
                        {p.dispositifs_fiscaux && p.dispositifs_fiscaux.length > 0 && (
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                            {p.dispositifs_fiscaux.map(d => (
                              <span key={d} style={{ background: 'rgba(166,124,82,0.12)', color: 'var(--bronze)', borderRadius: 99, padding: '4px 10px', fontSize: 11, fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>{d}</span>
                            ))}
                          </div>
                        )}
                        {p.prix_min && (
                          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'var(--bronze)', fontWeight: 600, marginBottom: 16 }}>{"À partir de "}{fmt(p.prix_min)}</p>
                        )}
                        <Link to={`/programme/${p.slug}`} style={{ display: 'inline-block', background: 'var(--navy-deep)', color: '#fff', borderRadius: 50, padding: '10px 24px', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", textDecoration: 'none', transition: 'background 0.3s' }}
                          onMouseEnter={e => e.target.style.background = 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)'}
                          onMouseLeave={e => e.target.style.background = 'var(--navy-deep)'}
                        >{"Découvrir →"}</Link>
                      </div>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 48 }}>
                    <button disabled={page === 0} onClick={() => setPage(page - 1)} style={{ padding: '10px 24px', borderRadius: 50, border: '1px solid rgba(26,39,68,0.15)', background: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--navy-deep)', cursor: page === 0 ? 'default' : 'pointer', opacity: page === 0 ? 0.4 : 1 }}>{"← Précédent"}</button>
                    <button disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)} style={{ padding: '10px 24px', borderRadius: 50, border: '1px solid rgba(26,39,68,0.15)', background: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 500, color: 'var(--navy-deep)', cursor: page >= totalPages - 1 ? 'default' : 'pointer', opacity: page >= totalPages - 1 ? 0.4 : 1 }}>{"Suivant →"}</button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      {/* POURQUOI VIVEO */}
      <section style={{ background: 'var(--navy)', padding: '100px 40px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Eyebrow>NOTRE DIFFÉRENCE</Eyebrow>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#fff', marginBottom: 48 }}>
            Pas un agent. <em style={{ fontStyle: 'italic', color: '#C4976A' }}>Un expert côté promoteur.</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden' }}>
            {[
              { badge: "27 ANS D'EXPÉRIENCE", title: "L'œil du professionnel côté promoteur", text: "Thomas Blanchard a travaillé pour Bouygues Immobilier, Nexity, Promogim, Demathieu & Bard. Il connaît les programmes de l'intérieur." },
              { badge: "INDÉPENDANCE TOTALE", title: "Aucune exclusivité, aucun conflit d'intérêt", text: "VIVEO n'est lié à aucun promoteur. Nous sélectionnons les programmes selon leur qualité réelle, pas selon les commissions proposées." },
              { badge: "ACCOMPAGNEMENT COMPLET", title: "De la recherche à la remise des clés", text: "Financement, fiscalité, suivi chantier, livraison — VIVEO reste à vos côtés à chaque étape, sans disparaître après la signature." }
            ].map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px 32px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
              >
                <span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.12)', color: 'var(--bronze)', borderRadius: 99, padding: '6px 14px', fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', fontFamily: "'Raleway', sans-serif", marginBottom: 20 }}>{c.badge}</span>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 400, color: '#fff', marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 13, color: 'rgba(255,255,255,0.48)', lineHeight: 1.7 }}>{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ background: 'var(--cream)', padding: '100px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, justifyContent: 'center' }}>
            <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>VOTRE PROJET</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: 'var(--navy-deep)', marginBottom: 20, lineHeight: 1.2 }}>
            Premier achat ou investissement {"—"}<br />
            <em style={{ fontStyle: 'italic', color: '#C4976A' }}>parlons de votre projet.</em>
          </h2>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 15, color: '#666', lineHeight: 1.7, marginBottom: 40 }}>
            45 minutes pour faire le point sur votre situation, votre budget et vos options. VIVEO vous accompagne de A à Z.
          </p>
          <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', borderRadius: 50, padding: '18px 40px', fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', fontFamily: "'Raleway', sans-serif", textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 12px 40px rgba(166,124,82,0.35)' }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = 'none' }}
          >{"Demander mon RDV Découverte →"}</a>
        </div>
      </section>
    </>
  )
}
