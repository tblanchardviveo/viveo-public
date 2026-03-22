import { useState } from 'react'
import { supabase } from '../supabase'

export default function NewsletterWidget() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setLoading(true)
    setStatus(null)
    try {
      const { error } = await supabase.from('newsletter').insert({ email, source: 'viveo-public' })
      if (error && error.code === '23505') {
        setStatus('exists')
      } else if (error) {
        setStatus('error')
      } else {
        setStatus('success')
        setEmail('')
      }
    } catch {
      setStatus('error')
    }
    setLoading(false)
  }

  return (
    <section style={{ background: 'var(--navy-deep)', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 4vw, 40px)', borderTop: '1px solid rgba(166,124,82,0.1)' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
          <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>
            NEWSLETTER
          </span>
          <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 4vw, 32px)', color: '#fff', fontWeight: 400, marginBottom: 12 }}>
          {"Restez informé"}
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.6 }}>
          {"Recevez nos nouveaux programmes, conseils patrimoniaux et opportunités d'investissement."}
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="Votre adresse email"
            style={{
              flex: '1 1 280px', padding: '14px 20px', borderRadius: 50,
              border: '1px solid rgba(166,124,82,0.25)', background: 'rgba(255,255,255,0.06)',
              color: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 14,
              outline: 'none', minWidth: 200
            }}
          />
          <button type="submit" disabled={loading} style={{
            background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
            color: '#fff', border: 'none', borderRadius: 50, padding: '14px 32px',
            fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'Raleway', sans-serif", cursor: loading ? 'wait' : 'pointer',
            transition: 'all 0.3s', opacity: loading ? 0.7 : 1
          }}>
            {loading ? '...' : "S'inscrire"}
          </button>
        </form>
        {status === 'success' && (
          <p style={{ marginTop: 16, fontFamily: "'Raleway', sans-serif", fontSize: 13, color: '#2ecc71' }}>
            {"✓ Inscription confirmée. Merci !"}
          </p>
        )}
        {status === 'exists' && (
          <p style={{ marginTop: 16, fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'var(--bronze)' }}>
            {"Cette adresse est déjà inscrite."}
          </p>
        )}
        {status === 'error' && (
          <p style={{ marginTop: 16, fontFamily: "'Raleway', sans-serif", fontSize: 13, color: '#e74c3c' }}>
            {"Une erreur est survenue. Réessayez."}
          </p>
        )}
        <p style={{ marginTop: 20, fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          {"Pas de spam. Désinscription en un clic."}
        </p>
      </div>
    </section>
  )
}
