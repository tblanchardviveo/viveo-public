import { useState } from 'react'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function RdvDecouverte() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', message: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.nom || !form.email) return
    try {
      await fetch('https://hook.eu1.make.com/ffvq0m0r3891jpiikk7cb3h2g3y9nq24', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      setSent(true)
    } catch { setSent(true) }
  }

  const sectionStyle = {
    maxWidth: 680, margin: '0 auto', padding: '80px 24px',
    fontFamily: "'Raleway', sans-serif"
  }
  const inputStyle = {
    width: '100%', padding: '12px 16px', border: '1px solid #ddd',
    borderRadius: 8, fontSize: 14, fontFamily: "'Raleway', sans-serif",
    outline: 'none', boxSizing: 'border-box'
  }

  if (sent) return (
    <div style={sectionStyle}>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: 'var(--navy-deep)', marginBottom: 16 }}>
        Merci pour votre demande
      </h1>
      <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7 }}>
        Notre equipe vous recontactera dans les 24h pour planifier votre rendez-vous decouverte.
      </p>
    </div>
  )

  return (
    <div style={sectionStyle}>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: 'var(--navy-deep)', marginBottom: 8 }}>
        Rendez-vous decouverte
      </h1>
      <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, marginBottom: 32 }}>
        Echangez avec un conseiller VIVEO pour definir votre projet immobilier.
      </p>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <input style={inputStyle} placeholder="Nom *" value={form.nom} onChange={e => set('nom', e.target.value)} required />
          <input style={inputStyle} placeholder="Prenom" value={form.prenom} onChange={e => set('prenom', e.target.value)} />
        </div>
        <input style={inputStyle} placeholder="Email *" type="email" value={form.email} onChange={e => set('email', e.target.value)} required />
        <input style={inputStyle} placeholder="Telephone" type="tel" value={form.telephone} onChange={e => set('telephone', e.target.value)} />
        <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} placeholder="Votre projet en quelques mots..." value={form.message} onChange={e => set('message', e.target.value)} />
        <button type="submit" style={{
          background: 'var(--bronze)', color: '#fff', border: 'none',
          padding: '14px 32px', borderRadius: 8, fontSize: 15,
          fontWeight: 600, cursor: 'pointer', fontFamily: "'Raleway', sans-serif"
        }}>Demander un rendez-vous</button>
      </form>
    </div>
  )
}
