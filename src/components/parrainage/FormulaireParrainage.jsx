import { useState, forwardRef } from 'react'

const inputStyle = {
  width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, color: '#fff',
  fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box'
}
const labelStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500,
  color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 6, display: 'block'
}

const Field = ({ label, name, type, value, onChange, required }) => (
  <div style={{ flex: '1 1 200px' }}>
    <label style={labelStyle}>{label}{required && ' *'}</label>
    <input type={type || 'text'} name={name} value={value} onChange={onChange} required={required} style={inputStyle} />
  </div>
)

const FormulaireParrainage = forwardRef(function FormulaireParrainage(props, ref) {
  const [form, setForm] = useState({ parrain_prenom: '', parrain_nom: '', parrain_email: '', parrain_tel: '', parrain_statut: 'prospect', filleul_prenom: '', filleul_nom: '', filleul_email: '', filleul_tel: '', filleul_projet: '' })
  const [status, setStatus] = useState('idle')
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/parrainage-submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'ok' : 'error')
    } catch { setStatus('error') }
  }

  const sectionTitle = (text) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '32px 0 16px' }}>
      <span style={{ width: 24, height: 1, background: '#A67C52', display: 'block' }} />
      <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#A67C52', fontFamily: "'Raleway', sans-serif" }}>{text}</span>
    </div>
  )

  return (
    <section id="formulaire" ref={ref} style={{ background: '#111C33', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, color: '#fff', marginBottom: 8 }}>Recommandez un proche</h2>
        <form onSubmit={handleSubmit}>
          {sectionTitle('Vous \u2014 le parrain')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Field label="Pr\u00e9nom" name="parrain_prenom" value={form.parrain_prenom} onChange={set('parrain_prenom')} required />
            <Field label="Nom" name="parrain_nom" value={form.parrain_nom} onChange={set('parrain_nom')} required />
            <Field label="Email" name="parrain_email" type="email" value={form.parrain_email} onChange={set('parrain_email')} required />
            <Field label="T\u00e9l\u00e9phone" name="parrain_tel" type="tel" value={form.parrain_tel} onChange={set('parrain_tel')} required />
            <div style={{ flex: '1 1 200px' }}>
              <label style={labelStyle}>Statut *</label>
              <select name="parrain_statut" value={form.parrain_statut} onChange={set('parrain_statut')} style={{ ...inputStyle, appearance: 'auto' }}>
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
              </select>
            </div>
          </div>
          {sectionTitle('Votre filleul')}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Field label="Pr\u00e9nom" name="filleul_prenom" value={form.filleul_prenom} onChange={set('filleul_prenom')} required />
            <Field label="Nom" name="filleul_nom" value={form.filleul_nom} onChange={set('filleul_nom')} required />
            <Field label="Email" name="filleul_email" type="email" value={form.filleul_email} onChange={set('filleul_email')} required />
            <Field label="T\u00e9l\u00e9phone" name="filleul_tel" type="tel" value={form.filleul_tel} onChange={set('filleul_tel')} required />
            <Field label="Projet (optionnel)" name="filleul_projet" value={form.filleul_projet} onChange={set('filleul_projet')} />
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 24, lineHeight: 1.6, fontFamily: "'Raleway', sans-serif" }}>
            {"Vos donn\u00e9es et celles de votre filleul sont utilis\u00e9es exclusivement dans le cadre du programme de parrainage VIVEO Patrimoine. Elles ne sont ni revendues ni transmises \u00e0 des tiers. Droit d\u2019acc\u00e8s\u00a0: contact@viveo-patrimoine.fr"}
          </p>
          <button type="submit" disabled={status === 'sending'} style={{ marginTop: 24, background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', border: 'none', borderRadius: 2, padding: '14px 32px', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", cursor: 'pointer', opacity: status === 'sending' ? 0.6 : 1 }}>
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer ma recommandation \u2192'}
          </button>
          {status === 'ok' && <p style={{ color: '#4CAF50', marginTop: 12, fontFamily: "'Raleway', sans-serif", fontSize: 14 }}>Recommandation envoy\u00e9e avec succ\u00e8s.</p>}
          {status === 'error' && <p style={{ color: '#f44336', marginTop: 12, fontFamily: "'Raleway', sans-serif", fontSize: 14 }}>Erreur lors de l'envoi. Veuillez r\u00e9essayer.</p>}
        </form>
      </div>
    </section>
  )
})

export default FormulaireParrainage
