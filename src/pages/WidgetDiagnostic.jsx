import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { qualifyProspect } from '../services/qualificationService'

const STEPS = [
  { key: 'tmi', label: 'Votre tranche marginale d\'imposition ?', options: ['0 %', '11 %', '30 %', '41 %', '45 %'] },
  { key: 'objectif', label: 'Votre objectif principal ?', options: ['Réduire mes impôts', 'Préparer ma retraite', 'Constituer un patrimoine', 'Revenus complémentaires'] },
  { key: 'horizon', label: 'Votre horizon d\'investissement ?', options: ['Court terme (< 5 ans)', 'Moyen terme (5–10 ans)', 'Long terme (> 10 ans)'] },
  { key: 'budget', label: 'Votre budget ?', options: ['< 100 000 €', '100 000 – 300 000 €', '300 000 – 500 000 €', '> 500 000 €'] },
  { key: 'experience', label: 'Votre expérience locative ?', options: ['Aucune', 'Un premier investissement', 'Investisseur confirmé', 'Patrimoine constitué'] },
]

const BASE = 'https://viveo-patrimoine.fr'

export default function WidgetDiagnostic() {
  const [params] = useSearchParams()
  const color = decodeURIComponent(params.get('color') || '#A67C52')
  const cabinetId = params.get('cabinet') || 'demo'
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [contact, setContact] = useState({ prenom: '', nom: '', email: '', telephone: '' })
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState('')

  const select = async (val) => {
    const updated = { ...answers, [STEPS[step].key]: val }
    setAnswers(updated)
    if (step < STEPS.length - 1) { setStep(step + 1); return }
    setLoading(true)
    try {
      const res = await qualifyProspect({ tmi: updated.tmi?.replace(' %',''), objectif: updated.objectif, horizon: updated.horizon, revenus: updated.budget, patrimoine: updated.experience })
      setResult(res)
    } catch (e) { setErr(e.message) }
    setLoading(false)
  }

  const submitLead = async () => {
    if (!contact.email.trim()) { setErr('Email requis'); return }
    try {
      await Promise.all([
        fetch(`${BASE}/api/widget-lead`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contact, cabinet_id: cabinetId, type_widget: 'diagnostic', dispositif_recommande: result?.dispositif || '', source: 'widget' })
        }),
        fetch('https://n8n.viveo-patrimoine.fr/webhook/nouveau-lead', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prenom: contact.prenom, nom: contact.nom, email: contact.email, telephone: contact.telephone, message: '' })
        })
      ])
      setSent(true)
    } catch { setErr('Erreur envoi') }
  }

  const S = {
    page: { minHeight: '100vh', background: '#F7F5F1', padding: '20px 16px', fontFamily: "'Raleway',sans-serif" },
    card: { background: '#fff', borderRadius: 14, padding: '28px 24px', boxShadow: '0 4px 24px rgba(17,28,51,0.07)' },
    step: { fontSize: 10, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color, marginBottom: 10 },
    q: { fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#111C33', marginBottom: 20, lineHeight: 1.4 },
    opt: (sel) => ({ display: 'block', width: '100%', textAlign: 'left', padding: '12px 16px', marginBottom: 8,
      border: `1.5px solid ${sel ? color : 'rgba(17,28,51,0.12)'}`, background: sel ? `${color}14` : '#fff',
      borderRadius: 8, cursor: 'pointer', fontSize: 13, color: sel ? color : '#111C33', fontWeight: sel ? 600 : 400 }),
    input: { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #E8E0D5', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 10 },
    btn: { width: '100%', padding: '13px', border: 'none', borderRadius: 8, cursor: 'pointer', background: `linear-gradient(135deg,${color},#C4976A)`, color: '#fff', fontSize: 13, fontWeight: 700, marginTop: 4 },
  }

  const pct = (step / STEPS.length) * 100

  if (sent) return (
    <div style={S.page}>
      <div style={{ ...S.card, textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 18, color: '#111C33', marginBottom: 8 }}>Merci !</div>
        <div style={{ fontSize: 13, color: 'rgba(17,28,51,0.5)' }}>Votre conseiller vous contacte sous 24h.</div>
      </div>
    </div>
  )

  if (result) return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: '#111C33', marginBottom: 16 }}>Recevez votre analyse complète</div>
        <input style={S.input} placeholder="Prénom" value={contact.prenom} onChange={e => setContact(c => ({...c, prenom: e.target.value}))} />
        <input style={S.input} placeholder="Nom" value={contact.nom} onChange={e => setContact(c => ({...c, nom: e.target.value}))} />
        <input style={S.input} placeholder="Email *" type="email" value={contact.email} onChange={e => setContact(c => ({...c, email: e.target.value}))} />
        <input style={S.input} placeholder="Téléphone" value={contact.telephone} onChange={e => setContact(c => ({...c, telephone: e.target.value}))} />
        {err && <div style={{ color: '#dc2626', fontSize: 12, marginBottom: 8 }}>{err}</div>}
        <button style={S.btn} onClick={submitLead}>Recevoir mon analyse →</button>
      </div>
    </div>
  )

  if (loading) return (
    <div style={S.page}><div style={{ ...S.card, textAlign: 'center', padding: '48px 24px' }}>
      <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: '#111C33' }}>Analyse en cours…</div>
    </div></div>
  )

  return (
    <div style={S.page}>
      <div style={{ height: 3, background: 'rgba(166,124,82,0.15)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: `linear-gradient(90deg,${color},#C4976A)`, borderRadius: 2, transition: 'width .3s' }} />
      </div>
      <div style={S.card}>
        <p style={S.step}>Question {step + 1} / {STEPS.length}</p>
        <p style={S.q}>{STEPS[step].label}</p>
        {STEPS[step].options.map(o => (
          <button key={o} style={S.opt(answers[STEPS[step].key] === o)} onClick={() => select(o)}>{o}</button>
        ))}
        {step > 0 && <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(17,28,51,0.4)', fontSize: 12, marginTop: 8 }} onClick={() => setStep(s => s - 1)}>← Retour</button>}
      </div>
      {err && <div style={{ color: '#dc2626', fontSize: 12, textAlign: 'center', marginTop: 8 }}>{err}</div>}
    </div>
  )
}
