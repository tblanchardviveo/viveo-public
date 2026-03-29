import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const BASE = 'https://viveo-patrimoine.fr'

export default function WidgetContact() {
  const [params] = useSearchParams()
  const color = decodeURIComponent(params.get('color') || '#A67C52')
  const cabinetId = params.get('cabinet') || 'demo'
  const [form, setForm] = useState({ prenom: '', nom: '', email: '', telephone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.prenom.trim() || !form.email.trim()) { setErr('Prénom et email requis'); return }
    setErr(''); setLoading(true)
    try {
      const r = await fetch(`${BASE}/api/widget-lead`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, cabinet_id: cabinetId, type_widget: 'contact', source: 'widget' })
      })
      if (!r.ok) throw new Error()
      setSent(true)
    } catch { setErr('Erreur lors de l\'envoi. Veuillez réessayer.') }
    setLoading(false)
  }

  const S = {
    page: { minHeight: '100vh', background: '#fff', padding: 20, fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', display: 'flex', flexDirection: 'column' },
    header: { background: '#111C33', margin: '-20px -20px 20px', padding: '16px 20px', borderRadius: '0 0 0 0' },
    label: { display: 'block', fontSize: 10, fontWeight: 700, color: '#111C33', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5 },
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E8E0D5', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' },
    field: { marginBottom: 12 },
    btn: { width: '100%', padding: '13px', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#ccc' : color, color: '#fff', fontSize: 13, fontWeight: 700, fontFamily: 'inherit', marginTop: 4 },
  }

  if (sent) return (
    <div style={{ ...S.page, alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#111C33', marginBottom: 6 }}>Merci !</div>
      <div style={{ fontSize: 13, color: '#7A7A8A' }}>Nous vous contactons sous 24h.</div>
    </div>
  )

  return (
    <div style={S.page}>
      <div style={S.header}>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Prendre rendez-vous</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Réponse sous 24h</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
        <div>
          <label style={S.label}>Prénom *</label>
          <input style={S.input} value={form.prenom} onChange={set('prenom')} placeholder="Jean" />
        </div>
        <div>
          <label style={S.label}>Nom</label>
          <input style={S.input} value={form.nom} onChange={set('nom')} placeholder="Dupont" />
        </div>
      </div>

      <div style={S.field}>
        <label style={S.label}>Email *</label>
        <input style={S.input} type="email" value={form.email} onChange={set('email')} placeholder="jean@exemple.fr" />
      </div>

      <div style={S.field}>
        <label style={S.label}>Téléphone</label>
        <input style={S.input} type="tel" value={form.telephone} onChange={set('telephone')} placeholder="06 00 00 00 00" />
      </div>

      <div style={S.field}>
        <label style={S.label}>Message (optionnel)</label>
        <textarea style={{ ...S.input, resize: 'vertical', minHeight: 70 }} value={form.message} onChange={set('message')} placeholder="Votre projet…" />
      </div>

      {err && <div style={{ color: '#dc2626', fontSize: 12, marginBottom: 8 }}>{err}</div>}

      <button style={S.btn} onClick={submit} disabled={loading}>
        {loading ? 'Envoi…' : 'Prendre rendez-vous →'}
      </button>

      <div style={{ fontSize: 10, color: '#bbb', textAlign: 'center', marginTop: 12 }}>Propulsé par VIVEO Patrimoine</div>
    </div>
  )
}
