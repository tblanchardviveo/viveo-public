import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: '"Raleway", sans-serif' }}>{children}</span>
  </div>
)

const fmt = (n) => n ? new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' \u20ac' : ''

const inputStyle = { padding: '14px 18px', borderRadius: 10, border: '1.5px solid #E5E3E0', fontSize: 14, color: 'var(--navy)', width: '100%', boxSizing: 'border-box', fontFamily: '"Raleway", sans-serif' }
const selectStyle = { ...inputStyle, appearance: 'none', background: '#fff url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'8\'%3E%3Cpath d=\'M1 1l5 5 5-5\' stroke=\'%23111C33\' stroke-width=\'1.5\' fill=\'none\'/%3E%3C/svg%3E") no-repeat right 16px center' }

export default function FicheProgramme() {
  const { slug } = useParams()
  const [programme, setProgramme] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    prenom: '', nom: '', email: '', telephone: '',
    adresse: '', ville: '', code_postal: '',
    projet: '', visio: '', disponibilites: '', message: ''
  })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  const emptyForm = { prenom: '', nom: '', email: '', telephone: '', adresse: '', ville: '', code_postal: '', projet: '', visio: '', disponibilites: '', message: '' }

  useEffect(() => {
    setLoading(true)
    supabase.from('programmes').select('*').eq('slug', slug)
      .in('statut', ['Disponible', 'Bientot disponible']).single()
      .then(({ data }) => { setProgramme(data); setLoading(false) })
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/rdv-demande', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          programme_id: programme?.id || null,
          programme_nom: programme?.nom || null
        })
      })
      const json = await res.json()
      if (!res.ok) {
        setError(json.error || 'Une erreur est survenue')
        setSending(false)
        return
      }
      setSending(false)
      setSent(true)
      setTimeout(() => { setShowModal(false); setSent(false); setFormData(emptyForm) }, 2500)
    } catch (err) {
      setError('Erreur r\u00e9seau, veuillez r\u00e9essayer')
      setSending(false)
    }
  }

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}><p style={{ color: 'var(--muted)', fontFamily: '"Raleway", sans-serif' }}>Chargement...</p></div>
  if (!programme) return <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 40px', textAlign: 'center' }}><p style={{ fontFamily: '"Playfair Display", serif', fontSize: 24, color: 'var(--navy)' }}>Programme introuvable.</p><p style={{ color: 'var(--bronze)', fontSize: 14, marginTop: 16, display: 'inline-block' }}><Link to="/">&larr; Retour</Link></p></div>

  const p = programme
  const dispoLinks = { 'LMNP': '/lmnp-viveo.html', 'Deficit Foncier': '/deficit-foncier-viveo.html', 'Loi Denormandie': '/loi-denormandie-viveo.html', 'Loi Jeanbrun': '/loi-jeanbrun-viveo.html', 'Monuments Historiques': `${WP}/monuments-historiques/`, 'Loi Malraux': `${WP}/loi-malraux/`, 'Nue-propriete': `${WP}/nue-propriete/` }

  return (
    <div>
      {/* HERO */}
      <div style={{ height: 'min(60vh, 560px)', position: 'relative', overflow: 'hidden', backgroundImage: p.photo_url ? `url(${p.photo_url})` : 'none', backgroundColor: 'var(--navy-deep)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,28,51,0.20) 0%, rgba(17,28,51,0.82) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 48, maxWidth: 800, zIndex: 1 }}>
          <p style={{ fontFamily: '"Raleway", sans-serif', fontSize: 13, color: 'rgb(255,255,255,0.55)', marginBottom: 16, display: 'inline-block' }}><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>&larr; Tous les programmes</Link></p>
          <Eyebrow>{p.ville}</Eyebrow>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(32px,5vw,52px)', color: '#fff', margin: 0, lineHeight: 1.15 }}>{p.nom}</h1>
          {p.livraison && <p style={{ color: 'var(--bronze-light)', fontSize: 14, marginTop: 16 }}>{String.fromCharCode(128197)} Livraison {p.livraison}</p>}
          {[p.badge_1, p.badge_2, p.badge_3].filter(Boolean).map((b, i) => (<span key={i} style={{ display: 'inline-block', background: 'rgba(166,124,82,0.18)', color: 'var(--bronze)', fontSize: 12, fontWeight: 600, padding: '6px 14px', borderRadius: 50, marginRight: 8, marginTop: 12 }}>{b}</span>))}
        </div>
      </div>

      {/* BARRE 4 CHIFFRES */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, background: 'var(--navy)', padding: '28px 24px', flexWrap: 'wrap' }}>
        {[
          { val: p.typo_min ? `T${p.typo_min}${p.typo_max && p.typo_max !== p.typo_min ? ` \u2192 T${p.typo_max}` : ''}` : '\u2014', label: 'Typologies' },
          { val: p.surface_min ? `${p.surface_min}${p.surface_max ? `\u2013${p.surface_max}` : ''} m\u00b2` : '\u2014', label: 'Surfaces' },
          { val: p.prix_min ? fmt(p.prix_min) : '\u2014', label: '\u00c0 partir de', bronze: true },
          { val: p.livraison || '\u2014', label: 'Livraison' },
        ].map((item, i) => (
          <div key={i} style={{ flex: '1 1 140px', textAlign: 'center', padding: '12px 20px' }}>
            <p style={{ fontSize: 22, fontWeight: 700, color: item.bronze ? 'var(--bronze)' : '#fff', fontFamily: '"Playfair Display", serif', margin: '0 0 4px' }}>{item.val}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.12em', fontFamily: '"Raleway", sans-serif', margin: 0 }}>{item.label}</p>
          </div>
        ))}
      </div>

      {/* CORPS */}
      <div style={{ display: 'flex', maxWidth: 1100, margin: '0 auto', padding: '60px 32px', gap: 48, flexWrap: 'wrap' }}>
        {/* GAUCHE */}
        <div style={{ flex: '1 1 500px' }}>
          {p.description && <><Eyebrow>LE PROGRAMME</Eyebrow><p style={{ fontSize: 15, lineHeight: 1.8, color: 'var(--navy)', fontFamily: '"Raleway", sans-serif' }}>{p.description}</p></>}
          {p.points_forts && p.points_forts.length > 0 && (
            <div style={{ marginTop: 40 }}><Eyebrow>POINTS FORTS</Eyebrow>
              {p.points_forts.map((pt, i) => <p key={i} style={{ fontSize: 14, lineHeight: 2, color: 'var(--navy)', fontFamily: '"Raleway", sans-serif' }}><span style={{ color: 'var(--bronze)', marginRight: 8 }}>\u2713</span> {pt}</p>)}
            </div>)}
          {p.dispositifs_fiscaux && p.dispositifs_fiscaux.length > 0 && (
            <div style={{ marginTop: 40 }}><Eyebrow>DISPOSITIFS FISCAUX</Eyebrow>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {p.dispositifs_fiscaux.map(d => <a key={d} href={dispoLinks[d]} style={{ display: 'inline-block', padding: '10px 20px', border: '1.5px solid var(--bronze)', borderRadius: 50, color: 'var(--bronze)', fontSize: 13, fontWeight: 600, textDecoration: 'none', fontFamily: '"Raleway", sans-serif' }}>{d} &rarr;</a>)}
              </div>
            </div>)}
          {(p.latitude && p.longitude) && (
            <div style={{ marginTop: 40 }}><Eyebrow>LOCALISATION</Eyebrow>
              <iframe title="carte" src={`https://www.openstreetmap.org/export/embed.html?bbox=${p.longitude-0.01},${p.latitude-0.007},${p.longitude+0.01},${p.latitude+0.007}&layer=mapnik&marker=${p.latitude},${p.longitude}`} style={{ width: '100%', height: 300, border: '1.5px solid #E5E3E0', borderRadius: 12 }} />
            </div>)}
        </div>
        {/* SIDEBAR */}
        <div style={{ flex: '0 0 320px' }}>
          <div style={{ background: 'var(--navy)', borderRadius: 16, padding: 32, color: '#fff', position: 'sticky', top: 32 }}>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: 20, margin: '0 0 8px' }}>Int\u00e9ress\u00e9(e) ?</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontFamily: '"Raleway", sans-serif', margin: '0 0 24px' }}>R\u00e9servez un RDV D\u00e9couverte gratuit de 45 min en visio avec Thomas Blanchard.</p>
            <button onClick={() => setShowModal(true)} style={{ width: '100%', padding: 16, background: 'linear-gradient(135deg, var(--bronze) 0%, var(--bronze-light) 100%)', color: '#fff', border: 'none', borderRadius: 50, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: '"Raleway", sans-serif' }}>Prendre rendez-vous</button>
          </div>
        </div>
      </div>

      {/* MODAL RDV */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(17,28,51,0.6)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#fff', borderRadius: 20, padding: 40, maxWidth: 520, width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            {sent ? (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <p style={{ fontSize: 48 }}>{String.fromCharCode(9989)}</p>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 22, color: 'var(--navy)', margin: '16px 0 8px' }}>Demande envoy\u00e9e !</h3>
                <p style={{ color: 'var(--muted)', fontSize: 14 }}>Thomas vous recontacte sous 24h.</p>
              </div>
            ) : (
              <>
                <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--muted)' }}>{String.fromCharCode(10005)}</button>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: '"Raleway", sans-serif' }}>RDV D\u00e9couverte</span>
                </div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 26, color: 'var(--navy)', margin: '0 0 6px' }}>Recevoir un appel</h3>
                <p style={{ fontWeight: 300, fontSize: 14, color: 'var(--muted)', marginBottom: 28 }}>Un conseiller VIVEO vous contacte pour un RDV gratuit de 45 min en visio.</p>
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Pr\u00e9nom / Nom */}
                    <div style={{ display: 'flex', gap: 12 }}>
                      <input placeholder="Pr\u00e9nom" required value={formData.prenom} onChange={e => setFormData({ ...formData, prenom: e.target.value })} style={inputStyle} />
                      <input placeholder="Nom" required value={formData.nom} onChange={e => setFormData({ ...formData, nom: e.target.value })} style={inputStyle} />
                    </div>
                    <input type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
                    <input type="tel" placeholder="T\u00e9l\u00e9phone" required value={formData.telephone} onChange={e => setFormData({ ...formData, telephone: e.target.value })} style={inputStyle} />
                    {/* Adresse */}
                    <input placeholder="Adresse (optionnel)" value={formData.adresse} onChange={e => setFormData({ ...formData, adresse: e.target.value })} style={inputStyle} />
                    <div style={{ display: 'flex', gap: 12 }}>
                      <input placeholder="Code postal" value={formData.code_postal} onChange={e => setFormData({ ...formData, code_postal: e.target.value })} style={{ ...inputStyle, flex: '0 0 120px' }} />
                      <input placeholder="Ville" value={formData.ville} onChange={e => setFormData({ ...formData, ville: e.target.value })} style={inputStyle} />
                    </div>
                    {/* Projet */}
                    <select required value={formData.projet} onChange={e => setFormData({ ...formData, projet: e.target.value })} style={selectStyle}>
                      <option value="" disabled>Votre projet *</option>
                      <option value="se_loger">Se loger</option>
                      <option value="investir">Investir</option>
                      <option value="les_deux">Se loger & Investir</option>
                    </select>
                    {/* Visio */}
                    <select required value={formData.visio} onChange={e => setFormData({ ...formData, visio: e.target.value })} style={selectStyle}>
                      <option value="" disabled>Visio pr\u00e9f\u00e9r\u00e9e *</option>
                      <option value="teams">Microsoft Teams</option>
                      <option value="facetime">FaceTime</option>
                    </select>
                    <input placeholder="Disponibilit\u00e9s (ex: mardi 14h, jeudi matin...)" value={formData.disponibilites} onChange={e => setFormData({ ...formData, disponibilites: e.target.value })} style={inputStyle} />
                    <textarea placeholder="Message (optionnel)" rows={3} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ ...inputStyle, resize: 'vertical' }} />
                  </div>
                  {error && <p style={{ color: '#c0392b', fontSize: 13, marginTop: 12 }}>{error}</p>}
                  <button type="submit" disabled={sending} style={{ width: '100%', marginTop: 24, background: 'linear-gradient(135deg, var(--bronze) 0%, var(--bronze-light) 100%)', color: '#fff', borderRadius: 50, padding: 16, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', fontFamily: '"Raleway", sans-serif' }}>{sending ? 'Envoi...' : 'Envoyer ma demande'}</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
