import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

const eyebrow = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  color: 'var(--bronze)', fontFamily: 'var(--font-body)', fontSize: '0.75rem',
  fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.5rem'
}
const eyebrowLine = { flex: 1, height: 1, background: 'var(--bronze-light)' }

const inputStyle = {
  width: '100%', padding: '0.6rem 0.8rem', borderRadius: 8,
  border: '1.5px solid var(--gris-chaud)', fontFamily: 'var(--font-body)',
  fontSize: '0.9rem', outline: 'none', marginBottom: '0.75rem'
}

export default function FicheProgramme() {
  const { slug } = useParams()
  const [programme, setProgramme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ prenom: '', nom: '', email: '', telephone: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    setLoading(true)
    supabase
      .from('programmes')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        setProgramme(data)
        setLoading(false)
      })
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const { error } = await supabase.from('prospects').insert({
      prenom: formData.prenom,
      nom: formData.nom,
      email: formData.email,
      telephone: formData.telephone,
      programme_id: programme.id,
      programme_nom: programme.nom,
      source: 'viveo-public',
      statut: '01_nouveau'
    })
    setSending(false)
    if (!error) {
      setSent(true)
      setTimeout(() => { setShowModal(false); setSent(false); setFormData({ prenom: '', nom: '', email: '', telephone: '' }) }, 2000)
    }
  }

  const fmt = n => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' EUR' : 'N/C'

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><p style={{ color: 'var(--gris-texte)' }}>Chargement...</p></div>
  if (!programme) return <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}><p>Programme introuvable.</p><Link to="/" style={{ color: 'var(--bronze)' }}>Retour</Link></div>

  const p = programme

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2.5rem 1.5rem' }}>
      {/* Breadcrumb */}
      <Link to="/" style={{ color: 'var(--bronze)', fontSize: '0.85rem', fontFamily: 'var(--font-body)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1.5rem' }}>
        &larr; Retour aux programmes
      </Link>

      {/* Hero image */}
      <div style={{ height: 300, background: 'var(--gris-chaud)', borderRadius: 16, overflow: 'hidden', marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {p.image_url ? <img src={p.image_url} alt={p.nom} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '4rem' }}>\ud83c\udfe2</span>}
      </div>

      {/* Titre */}
      <div style={eyebrow}>
        <span style={eyebrowLine}></span>
        <span>{p.secteur || 'Programme'}</span>
        <span style={eyebrowLine}></span>
      </div>
      <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--navy)', margin: '0.5rem 0' }}>{p.nom}</h1>
      <p style={{ color: 'var(--gris-texte)', fontSize: '1rem', fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>{p.ville} ({p.code_postal})</p>

      {/* Infos principales */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem', fontWeight: 600 }}>Prix a partir de</p>
          <p style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--bronze)', fontFamily: 'var(--font-heading)', margin: 0 }}>{fmt(p.prix_min)}</p>
        </div>
        {p.dispositif && <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem', fontWeight: 600 }}>Dispositif</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', margin: 0 }}>{p.dispositif}</p>
        </div>}
        {p.promoteur && <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem', fontWeight: 600 }}>Promoteur</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', margin: 0 }}>{p.promoteur}</p>
        </div>}
        {p.livraison_trim && <div style={{ background: '#fff', borderRadius: 12, padding: '1.2rem', boxShadow: '0 2px 12px rgba(26,39,68,0.06)' }}>
          <p style={{ fontSize: '0.7rem', color: 'var(--gris-texte)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.3rem', fontWeight: 600 }}>Livraison</p>
          <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--navy)', margin: 0 }}>{p.livraison_trim} {p.livraison_an}</p>
        </div>}
      </div>

      {/* Description */}
      {p.description && (
        <div style={{ background: '#fff', borderRadius: 12, padding: '1.5rem', boxShadow: '0 2px 12px rgba(26,39,68,0.06)', marginBottom: '2rem' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>Description</h2>
          <p style={{ color: 'var(--gris-texte)', lineHeight: 1.7, fontFamily: 'var(--font-body)', fontSize: '0.95rem' }}>{p.description}</p>
        </div>
      )}

      {/* CTA */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: 'var(--gradient-btn)', color: '#fff', border: 'none', padding: '0.8rem 2.5rem', borderRadius: 8, fontSize: '1rem', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer', letterSpacing: 0.5, boxShadow: '0 4px 12px rgba(166,124,82,0.3)' }}
        >
          Etre rappele pour ce programme
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(26,39,68,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={() => setShowModal(false)}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', maxWidth: 440, width: '90%', boxShadow: '0 8px 32px rgba(26,39,68,0.2)' }} onClick={e => e.stopPropagation()}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>\u2705</p>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--navy)' }}>Demande envoyee !</p>
                <p style={{ color: 'var(--gris-texte)', fontSize: '0.9rem' }}>Nous vous recontacterons rapidement.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--navy)', marginBottom: '0.3rem' }}>Demande d'information</h3>
                <p style={{ color: 'var(--gris-texte)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{p.nom} - {p.ville}</p>
                <input placeholder="Prenom" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} style={inputStyle} />
                <input placeholder="Nom" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} style={inputStyle} />
                <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                <input type="tel" placeholder="Telephone" required value={formData.telephone} onChange={e => setFormData({ ...formData, telephone: e.target.value })} style={inputStyle} />
                <button type="submit" disabled={sending} style={{ width: '100%', background: 'var(--gradient-btn)', color: '#fff', border: 'none', padding: '0.7rem', borderRadius: 8, fontSize: '0.95rem', fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer', marginTop: '0.5rem' }}>
                  {sending ? 'Envoi...' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
