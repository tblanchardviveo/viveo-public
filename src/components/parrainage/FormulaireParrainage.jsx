import { useState, forwardRef } from 'react'

const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

const inputStyle = {
  width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.10)', borderRadius: 10, color: '#fff',
  fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: 'none', boxSizing: 'border-box'
}

const labelStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 500,
  color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em', marginBottom: 6, display: 'block'
}

const FormulaireParrainage = forwardRef(function FormulaireParrainage(props, ref) {
  const [form, setForm] = useState({ parrain_nom: '', parrain_email: '', parrain_tel: '', filleul_nom: '', filleul_email: '', filleul_tel: '', relation: '', message: '' })
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://hook.eu1.make.com/hn6vosbw8m2tygwwlg46mn5ozayxdx31', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
      setForm({ parrain_nom: '', parrain_email: '', parrain_tel: '', filleul_nom: '', filleul_email: '', filleul_tel: '', relation: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section ref={ref} style={{ background: '#0d1526', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Eyebrow>FORMULAIRE</Eyebrow>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 400, color: '#fff', margin: '0 0 12px' }}>
          {"Parrainer un proche"}
        </h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.45)', margin: '0 0 40px', lineHeight: 1.7 }}>
          {"Remplissez ce formulaire et notre \u00e9quipe prendra contact avec votre filleul sous 48\u00a0h."}
        </p>

        {status === 'success' ? (
          <div style={{ background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.3)', borderRadius: 12, padding: '32px 24px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#C4976A', margin: '0 0 8px' }}>{"Merci\u00a0!"}</p>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{"Votre recommandation a bien \u00e9t\u00e9 envoy\u00e9e."}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600, color: '#C4976A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 20px' }}>{"Vos coordonn\u00e9es (parrain)"}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              <div><label style={labelStyle}>{"Nom complet *"}</label><input required style={inputStyle} value={form.parrain_nom} onChange={set('parrain_nom')} placeholder="Jean Dupont" /></div>
              <div><label style={labelStyle}>{"Email *"}</label><input required type="email" style={inputStyle} value={form.parrain_email} onChange={set('parrain_email')} placeholder="jean@email.com" /></div>
              <div><label style={labelStyle}>{"T\u00e9l\u00e9phone"}</label><input style={inputStyle} value={form.parrain_tel} onChange={set('parrain_tel')} placeholder="06 00 00 00 00" /></div>
            </div>

            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600, color: '#C4976A', letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 20px' }}>{"Coordonn\u00e9es du filleul"}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 24 }}>
              <div><label style={labelStyle}>{"Nom complet *"}</label><input required style={inputStyle} value={form.filleul_nom} onChange={set('filleul_nom')} placeholder="Marie Martin" /></div>
              <div><label style={labelStyle}>{"Email *"}</label><input required type="email" style={inputStyle} value={form.filleul_email} onChange={set('filleul_email')} placeholder="marie@email.com" /></div>
              <div><label style={labelStyle}>{"T\u00e9l\u00e9phone *"}</label><input required style={inputStyle} value={form.filleul_tel} onChange={set('filleul_tel')} placeholder="06 00 00 00 00" /></div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>{"Votre relation"}</label>
              <select style={{ ...inputStyle, appearance: 'none' }} value={form.relation} onChange={set('relation')}>
                <option value="">{"S\u00e9lectionnez..."}</option>
                <option value="ami">{"Ami(e)"}</option>
                <option value="famille">{"Famille"}</option>
                <option value="collegue">{"Coll\u00e8gue"}</option>
                <option value="autre">{"Autre"}</option>
              </select>
            </div>

            <div style={{ marginBottom: 32 }}>
              <label style={labelStyle}>{"Message (optionnel)"}</label>
              <textarea style={{ ...inputStyle, minHeight: 100, resize: 'vertical' }} value={form.message} onChange={set('message')} placeholder={"Contexte, projet du filleul..."} />
            </div>

            <button type="submit" disabled={status === 'sending'} style={{
              background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
              color: '#fff', border: 'none', borderRadius: 50, padding: '16px 40px',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
              fontFamily: "'Raleway', sans-serif", cursor: 'pointer', opacity: status === 'sending' ? 0.6 : 1
            }}>{status === 'sending' ? 'Envoi en cours...' : "Envoyer la recommandation \u2192"}</button>

            {status === 'error' && <p style={{ color: '#ef5350', fontSize: 13, marginTop: 12, fontFamily: "'Raleway', sans-serif" }}>{"Une erreur est survenue. Veuillez r\u00e9essayer."}</p>}
          </form>
        )}
      </div>
    </section>
  )
})

export default FormulaireParrainage
