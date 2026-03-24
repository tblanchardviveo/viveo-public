const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

const STEPS = [
  { num: '01', title: 'Recommandez', desc: 'Partagez le nom et les coordonnées de votre proche via le formulaire ci-dessous.' },
  { num: '02', title: 'Nous contactons', desc: 'VIVEO prend contact avec votre filleul pour un rendez-vous découverte personnalisé.' },
  { num: '03', title: 'Vous êtes récompensé', desc: 'Dès la signature, recevez 400€ (prospect) ou 800€ (client) selon programme de parrainage.' }
]

export default function StepsParrainage() {
  return (
    <section style={{ background: 'var(--navy-deep)', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Eyebrow>{"COMMENT ÇA MARCHE"}</Eyebrow>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 400, color: '#fff', margin: '0 0 48px' }}>
          {"Trois étapes simples"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {STEPS.map(s => (
            <div key={s.num} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, padding: '32px 28px', position: 'relative' }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, color: 'rgba(196,151,106,0.15)', position: 'absolute', top: 16, right: 24 }}>{s.num}</span>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: 18, fontWeight: 600, color: '#C4976A', margin: '0 0 12px' }}>{s.title}</h3>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
