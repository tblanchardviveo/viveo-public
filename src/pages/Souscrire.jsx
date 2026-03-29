import { useState } from 'react'

const PLANS = [
  { id: 'starter', label: 'Starter', price: 99, users: 1, ia: 100,
    features: ['1 utilisateur', '100 appels IA/mois', 'Chatbot widget', 'Simulateur fiscal', 'Support email'] },
  { id: 'pro', label: 'Pro', price: 199, users: 3, ia: 500, recommended: true,
    features: ['3 utilisateurs', '500 appels IA/mois', 'Tous les widgets', 'Pipeline & Matching', 'Dashboard manager', 'Support prioritaire'] },
  { id: 'premium', label: 'Premium', price: 349, users: '∞', ia: '∞',
    features: ['Utilisateurs illimités', 'IA illimitée', 'Toutes fonctionnalités', 'Marque blanche widgets', 'Support dédié', 'Onboarding personnalisé'] },
]

const S = {
  page: { minHeight: '100vh', background: '#111C33', fontFamily: "'Raleway',sans-serif", padding: '48px 24px' },
  logo: { textAlign: 'center', marginBottom: 36 },
  logoT: { fontFamily: "'Playfair Display',Georgia,serif", fontSize: 28, color: '#fff', fontWeight: 400 },
  sub: { fontSize: 13, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginBottom: 40, letterSpacing: '.08em', textTransform: 'uppercase' },
  grid: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 900, margin: '0 auto 40px' },
  card: (rec, sel) => ({
    flex: '1 1 240px', maxWidth: 280, background: rec ? '#A67C52' : sel ? 'rgba(166,124,82,0.15)' : 'rgba(255,255,255,0.05)',
    border: `2px solid ${rec ? '#C4976A' : sel ? '#A67C52' : 'rgba(255,255,255,0.1)'}`,
    borderRadius: 16, padding: '28px 22px', cursor: 'pointer', position: 'relative', transition: 'all .2s',
  }),
  badge: { position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#A67C52', fontSize: 10, fontWeight: 800, padding: '4px 12px', borderRadius: 20, letterSpacing: '.1em', whiteSpace: 'nowrap' },
  price: { fontFamily: "'Playfair Display',serif", fontSize: 38, fontWeight: 700, color: '#fff', margin: '16px 0 4px' },
  feat: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 },
  form: { maxWidth: 480, margin: '0 auto', background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '32px 28px', border: '1px solid rgba(255,255,255,0.08)' },
  label: { display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 5 },
  input: { width: '100%', padding: '11px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', color: '#fff', fontSize: 13, outline: 'none', boxSizing: 'border-box', marginBottom: 14, fontFamily: 'Raleway,sans-serif' },
  btn: { width: '100%', padding: '15px', border: 'none', borderRadius: 10, background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', fontSize: 14, fontWeight: 800, cursor: 'pointer', letterSpacing: '.04em', marginTop: 4 },
}

export default function Souscrire() {
  const [plan, setPlan] = useState('pro')
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ prenom: '', nom: '', cabinet: '', email: '', telephone: '', siret: '' })
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    if (!form.prenom || !form.nom || !form.email || !form.cabinet) { setErr('Veuillez remplir les champs obligatoires.'); return }
    setErr(''); setLoading(true)
    try {
      const r = await fetch('/api/create-checkout', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, ...form }),
      })
      const data = await r.json()
      if (data.url) window.location.href = data.url
      else setErr(data.error || 'Une erreur est survenue.')
    } catch { setErr('Erreur réseau.') }
    setLoading(false)
  }

  return (
    <div style={S.page}>
      <div style={S.logo}>
        <span style={S.logoT}>VIVEO<span style={{ color: '#A67C52' }}>.</span></span>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '.18em', textTransform: 'uppercase', marginTop: 4 }}>Patrimoine</div>
      </div>

      {step === 1 ? (
        <>
          <h2 style={{ textAlign: 'center', color: '#fff', fontFamily: "'Playfair Display',serif", fontWeight: 400, marginBottom: 8, fontSize: 24 }}>Choisissez votre plan</h2>
          <p style={S.sub}>14 jours d'essai gratuit · Sans engagement · Résiliable à tout moment</p>
          <div style={S.grid}>
            {PLANS.map(p => (
              <div key={p.id} style={S.card(p.recommended, plan === p.id)} onClick={() => setPlan(p.id)}>
                {p.recommended && <div style={S.badge}>★ RECOMMANDÉ</div>}
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{p.label}</div>
                <div style={S.price}>{p.price}<span style={{ fontSize: 16, fontWeight: 400 }}>€</span></div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>HT / mois</div>
                {p.features.map(f => <div key={f} style={S.feat}><span style={{ color: '#C4976A' }}>✓</span>{f}</div>)}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setStep(2)} style={{ ...S.btn, width: 'auto', padding: '15px 40px' }}>
              Démarrer l'essai gratuit →
            </button>
          </div>
        </>
      ) : (
        <div style={S.form}>
          <div style={{ fontSize: 12, color: '#A67C52', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: 18 }}>
            Plan {PLANS.find(p => p.id === plan)?.label} · {PLANS.find(p => p.id === plan)?.price}€ HT/mois
            <span onClick={() => setStep(1)} style={{ marginLeft: 12, cursor: 'pointer', color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>Changer</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {[['prenom','Prénom *'], ['nom','Nom *']].map(([k, l]) => (
              <div key={k}><label style={S.label}>{l}</label><input style={S.input} value={form[k]} onChange={set(k)} placeholder={l.replace(' *','')} /></div>
            ))}
          </div>
          {[['cabinet','Cabinet / Société *'], ['email','Email professionnel *'], ['telephone','Téléphone'], ['siret','SIRET (optionnel)']].map(([k, l]) => (
            <div key={k}><label style={S.label}>{l}</label><input style={S.input} type={k === 'email' ? 'email' : 'text'} value={form[k]} onChange={set(k)} placeholder={l.replace(' *','').replace(' (optionnel)','')} /></div>
          ))}
          {err && <div style={{ color: '#f87171', fontSize: 12, marginBottom: 10 }}>{err}</div>}
          <button onClick={submit} disabled={loading} style={{ ...S.btn, opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Redirection…' : 'Continuer vers le paiement →'}
          </button>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', textAlign: 'center', marginTop: 12 }}>🔒 Paiement sécurisé par Stripe · 14 jours d'essai gratuit</div>
        </div>
      )}
    </div>
  )
}
