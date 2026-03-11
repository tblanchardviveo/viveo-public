import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)
const fmt = (n) => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' €' : ''

export default function FicheProgramme() {
  const { slug } = useParams()
  const [programme, setProgramme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase.from('programmes').select('*').eq('slug', slug)
      .in('statut', ['Disponible', 'Bientot disponible']).single()
      .then(({ data }) => { setProgramme(data); setLoading(false) })
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const { error } = await supabase.from('prospects').insert({
      prenom: formData.prenom, nom: formData.nom, email: formData.email,
      telephone: formData.telephone, message: formData.message || null,
      programme_id: programme.id, programme_nom: programme.nom,
      source: 'viveo-public', statut: '01_nouveau'
    })
    setSending(false)
    if (!error) { setSent(true); setTimeout(() => { setShowModal(false); setSent(false); setFormData({ prenom: '', nom: '', email: '', telephone: '', message: '' }) }, 2500) }
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><p style={{ color: 'var(--muted)', fontFamily: "'Raleway', sans-serif" }}>Chargement...</p></div>
  if (!programme) return <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}><p style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: 'var(--navy)' }}>Programme introuvable.</p><Link to="/" style={{ color: 'var(--bronze)', fontSize: 14, marginTop: 16, display: 'inline-block' }}>← Retour</Link></div>

  const p = programme
  const dispoLinks = { 'LMNP': '/lmnp-viveo.html', 'Deficit Foncier': '/deficit-foncier-viveo.html', 'Loi Denormandie': '/loi-denormandie-viveo.html', 'Loi Jeanbrun': '/loi-jeanbrun-viveo.html', 'Monuments Historiques': `${WP}/monuments-historiques/`, 'Loi Malraux': `${WP}/loi-malraux/`, 'Nue-propriete': `${WP}/nue-propriete/` }

  return (
    <div>
      {/* HERO */}
      <div style={{ height: 'min(60vh, 560px)', position: 'relative', overflow: 'hidden', backgroundImage: p.photo_url ? `url(${p.photo_url})` : 'none', backgroundColor: 'var(--navy-deep)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,28,51,0.20) 0%, rgba(17,28,51,0.82) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 48, maxWidth: 800, zIndex: 1 }}>
          <Link to="/" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', marginBottom: 16, display: 'inline-block' }}>← Tous les programmes</Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ width: 24, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)' }}>{p.ville}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 4vw, 54px)', color: '#fff', fontWeight: 400, lineHeight: 1.1, margin: 0 }}>{p.nom}</h1>
          {p.livraison && <p style={{ fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.55)', marginTop: 12 }}>🗓 Livraison {p.livraison}</p>}
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
            {[p.badge_1, p.badge_2, p.badge_3].filter(Boolean).map((b, i) => (
              <span key={i} style={{ background: i === 0 ? 'rgba(17,28,51,0.85)' : 'var(--bronze)', color: '#fff', fontSize: 10, textTransform: 'uppercase', padding: '4px 14px', borderRadius: 99, fontWeight: 600 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* BARRE 4 CHIFFRES */}
      <div style={{ background: 'var(--white)', borderBottom: '1px solid rgba(26,39,68,0.06)', padding: '40px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', textAlign: 'center' }}>
          {[
            { val: p.typo_min ? `T${p.typo_min}${p.typo_max && p.typo_max !== p.typo_min ? ` → T${p.typo_max}` : ''}` : '—', label: 'Typologies' },
            { val: p.surface_min ? `${p.surface_min}${p.surface_max ? `–${p.surface_max}` : ''} m²` : '—', label: 'Surfaces' },
            { val: p.prix_min ? fmt(p.prix_min) : '—', label: 'À partir de', bronze: true },
            { val: p.livraison || '—', label: 'Livraison' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '0 20px', borderRight: i < 3 ? '1px solid var(--bronze-pale)' : 'none' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: item.bronze ? 'var(--bronze)' : 'var(--navy)' }}>{item.val}</div>
              <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CORPS */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 40px', display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* GAUCHE */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {p.description && <div style={{ marginBottom: 48 }}><Eyebrow>LE PROGRAMME</Eyebrow><p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 16, color: 'var(--text)', lineHeight: 1.7 }}>{p.description}</p></div>}

          {p.points_forts && p.points_forts.length > 0 && (
            <div style={{ marginBottom: 48 }}><Eyebrow>POINTS FORTS</Eyebrow>
              {p.points_forts.map((pt, i) => <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 10 }}><span style={{ color: 'var(--bronze)', fontWeight: 600 }}>✓</span><span style={{ fontSize: 14, color: 'var(--text)' }}>{pt}</span></div>)}
            </div>
          )}

          {p.dispositifs_fiscaux && p.dispositifs_fiscaux.length > 0 && (
            <div style={{ marginBottom: 48 }}><Eyebrow>DISPOSITIFS FISCAUX</Eyebrow>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {p.dispositifs_fiscaux.map(d => <a key={d} href={dispoLinks[d] || '#'} style={{ background: 'var(--white)', borderRadius: 14, padding: '20px 24px', borderLeft: '3px solid var(--bronze)', boxShadow: '0 2px 16px rgba(26,39,68,0.06)', fontSize: 14, fontWeight: 500, color: 'var(--navy)', textDecoration: 'none' }}>{d} →</a>)}
              </div>
            </div>
          )}

          {(p.latitude && p.longitude) && (
            <div style={{ marginBottom: 48 }}><Eyebrow>LOCALISATION</Eyebrow>
              <iframe title="carte" width="100%" height="320" style={{ border: 'none', borderRadius: 16 }}
                src={`https://maps.google.com/maps?q=${encodeURIComponent((p.adresse || '') + ' ' + p.ville)}&output=embed`} />
            </div>
          )}
        </div>

        {/* DROITE - STICKY */}
        <div style={{ width: 340, position: 'sticky', top: 88, flexShrink: 0 }}>
          <div style={{ background: 'var(--white)', borderRadius: 20, boxShadow: '0 8px 40px rgba(26,39,68,0.12)', padding: 36 }}>
            <span style={{ fontSize: 11, color: 'var(--bronze)', opacity: 0.7 }}>À partir de</span>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, color: 'var(--bronze)' }}>{fmt(p.prix_min)}</div>
            {p.prix_max && <p style={{ fontSize: 13, color: 'var(--muted)', margin: '4px 0 0' }}>jusqu'à {fmt(p.prix_max)}</p>}

            <div style={{ borderTop: '1px solid rgba(26,39,68,0.06)', margin: '20px 0', paddingTop: 20 }}>
              {[
                { label: 'Typologies', val: p.typo_min ? `T${p.typo_min}${p.typo_max && p.typo_max !== p.typo_min ? ` → T${p.typo_max}` : ''}` : null },
                { label: 'Surfaces', val: p.surface_min ? `${p.surface_min}${p.surface_max ? `–${p.surface_max}` : ''} m²` : null },
                { label: 'Livraison', val: p.livraison },
              ].filter(x => x.val).map((x, i) => (
                <div key={i} style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{x.label}</div>
                  <div style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 600 }}>{x.val}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid rgba(26,39,68,0.06)', margin: '20px 0', paddingTop: 20 }}>
              <button onClick={() => setShowModal(true)} style={{
                width: '100%', background: 'linear-gradient(135deg, var(--bronze) 0%, var(--bronze-light) 100%)',
                color: '#fff', borderRadius: 50, padding: 16, fontSize: 14, fontWeight: 600, border: 'none',
                cursor: 'pointer', fontFamily: "'Raleway', sans-serif", marginBottom: 12
              }}>Recevoir la plaquette →</button>
              <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
                display: 'block', width: '100%', textAlign: 'center', border: '1.5px solid var(--navy)',
                background: 'transparent', color: 'var(--navy)', borderRadius: 50, padding: 14,
                fontSize: 13, fontWeight: 600, fontFamily: "'Raleway', sans-serif", boxSizing: 'border-box'
              }}>Prendre RDV Découverte</a>
            </div>
            <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', marginTop: 16, lineHeight: 1.5 }}>
              Réponse sous 24h · Sans engagement · Conseiller dédié
            </p>
          </div>
                  </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(17,28,51,0.65)',
          backdropFilter: 'blur(4px)', zIndex: 200,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 20, padding: 48,
            maxWidth: 480, width: '90%', animation: 'fadeUp 0.3s var(--ease)'
          }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: 'var(--navy)' }}>Demande envoyée !</h3>
                <p style={{ fontWeight: 300, fontSize: 14, color: 'var(--muted)', marginTop: 8 }}>Un conseiller vous contactera sous 24h.</p>
                <button onClick={() => setShowModal(false)} style={{
                  marginTop: 24, border: '1.5px solid var(--navy)', background: 'transparent',
                  color: 'var(--navy)', borderRadius: 50, padding: '12px 32px', fontSize: 13,
                  fontWeight: 600, cursor: 'pointer'
                }}>Fermer</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)' }}>DEMANDE DE PLAQUETTE</span>
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: 'var(--navy)', margin: '0 0 6px' }}>Recevoir la documentation</h3>
                <p style={{ fontWeight: 300, fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>Un conseiller VIVEO vous contacte sous 24h.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {['prenom', 'nom', 'email', 'telephone'].map(f => (
                    <input key={f} type={f === 'email' ? 'email' : f === 'telephone' ? 'tel' : 'text'}
                      placeholder={f === 'prenom' ? 'Prénom' : f === 'nom' ? 'Nom' : f === 'email' ? 'Email' : 'Téléphone'}
                      required value={formData[f]} onChange={e => setFormData({ ...formData, [f]: e.target.value })}
                      style={{ padding: '14px 18px', borderRadius: 10, border: '1.5px solid #E5E3E0', fontSize: 14, color: 'var(--navy)', background: 'var(--cream)', outline: 'none' }} />
                  ))}
                  <textarea placeholder="Message (optionnel)" rows={3} value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ padding: '14px 18px', borderRadius: 10, border: '1.5px solid #E5E3E0', fontSize: 14, color: 'var(--navy)', background: 'var(--cream)', outline: 'none', resize: 'vertical' }} />
                </div>
                <button type="submit" disabled={sending} style={{
                  width: '100%', marginTop: 24,
                  background: 'linear-gradient(135deg, var(--bronze) 0%, var(--bronze-light) 100%)',
                  color: '#fff', borderRadius: 50, padding: 16, fontSize: 14, fontWeight: 600,
                  border: 'none', cursor: 'pointer'
                }}>{sending ? 'Envoi...' : 'Envoyer ma demande'}</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

        
