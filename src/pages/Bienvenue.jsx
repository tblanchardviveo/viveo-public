import { useSearchParams } from 'react-router-dom'

const S = {
  page: { minHeight: '100vh', background: '#111C33', fontFamily: "'Raleway',sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 },
  card: { maxWidth: 520, width: '100%', textAlign: 'center' },
  check: { width: 72, height: 72, borderRadius: '50%', background: 'rgba(166,124,82,0.15)', border: '2px solid #A67C52', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', fontSize: 32 },
  logo: { fontFamily: "'Playfair Display',Georgia,serif", fontSize: 22, color: '#fff', marginBottom: 32 },
  h1: { fontFamily: "'Playfair Display',serif", fontSize: 30, color: '#fff', fontWeight: 400, marginBottom: 12, lineHeight: 1.3 },
  p: { fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, marginBottom: 8 },
  steps: { margin: '32px auto', maxWidth: 380, textAlign: 'left' },
  step: (done) => ({ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, opacity: done ? 1 : 0.5 }),
  stepIcon: (done) => ({ width: 28, height: 28, borderRadius: '50%', background: done ? '#A67C52' : 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#fff', flexShrink: 0, marginTop: 1 }),
  stepText: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 },
  btn: { display: 'inline-block', padding: '15px 36px', borderRadius: 10, background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 700, letterSpacing: '.04em', marginTop: 8 },
  sub: { fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 24 },
  div: { height: 1, background: 'rgba(255,255,255,0.06)', margin: '28px 0' },
}

const ETAPES = [
  { icon: '✓', label: 'Paiement confirmé', desc: "Votre souscription est activée avec 14 jours d'essai gratuit.", done: true },
  { icon: '⟳', label: 'Création de votre espace', desc: 'Votre back-office VIVEO est en cours de configuration.', done: true },
  { icon: '✉', label: 'Email avec vos identifiants', desc: 'Vous recevrez vos identifiants dans les prochaines minutes.', done: false },
]

export default function Bienvenue() {
  const [params] = useSearchParams()
  const sessionId = params.get('session_id') || ''

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.logo}>VIVEO<span style={{ color: '#A67C52' }}>.</span></div>

        <div style={S.check}>🎉</div>

        <h1 style={S.h1}>Bienvenue dans VIVEO !</h1>
        <p style={S.p}>Votre espace back-office est en cours de création.<br />Vous recevrez vos identifiants par email dans quelques minutes.</p>

        <div style={S.steps}>
          {ETAPES.map((e, i) => (
            <div key={i} style={S.step(e.done)}>
              <div style={S.stepIcon(e.done)}>{e.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: e.done ? '#fff' : 'rgba(255,255,255,0.4)', marginBottom: 2 }}>{e.label}</div>
                <div style={S.stepText}>{e.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={S.div} />

        <a href="https://admin.viveo-patrimoine.fr" style={S.btn}>Accéder à mon espace →</a>

        <p style={S.sub}>
          Une question ? <a href="tel:0967167065" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>09 67 16 70 65</a>
          {sessionId && <span style={{ display: 'block', marginTop: 6, fontFamily: 'monospace', fontSize: 10 }}>Réf. {sessionId.slice(-12)}</span>}
        </p>
      </div>
    </div>
  )
}
