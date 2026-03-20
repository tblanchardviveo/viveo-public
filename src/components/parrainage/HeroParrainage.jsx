const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A67C52', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

const Card = ({ title, amount, subtitle, highlight }) => (
  <div style={{ background: 'rgba(166,124,82,0.12)', border: highlight ? '2px solid #A67C52' : '1px solid rgba(166,124,82,0.3)', borderRadius: 16, padding: '32px 28px', flex: '1 1 260px', maxWidth: 340, textAlign: 'center' }}>
    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 12 }}>{title}</p>
    <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, color: '#C4976A', display: 'block' }}>{amount}</span>
    <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 12, display: 'block' }}>{subtitle}</p>
  </div>
)

export default function HeroParrainage({ onScrollForm }) {
  return (
    <section style={{ background: '#111C33', padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px) 60px', position: 'relative' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Eyebrow>Programme de parrainage</Eyebrow>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 400, color: '#fff', lineHeight: 1.2 }}>
          {"Recommandez VIVEO \u2014 et soyez r\u00e9compens\u00e9."}
        </h1>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontStyle: 'italic', fontSize: 16, color: '#C4976A', marginTop: 16, maxWidth: 600 }}>
          {"Vous connaissez quelqu\u2019un qui cherche \u00e0 investir ou acqu\u00e9rir sa r\u00e9sidence ? Mettez-nous en relation \u2014 nous nous occupons du reste."}
        </p>
        <div style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}>
          <Card title="Vous \u00eates prospect VIVEO" amount="400\u00a0\u20ac" subtitle="Vers\u00e9 apr\u00e8s signature de l\u2019acte authentique par votre filleul" />
          <Card title="Vous \u00eates client VIVEO" amount="800\u00a0\u20ac" subtitle="Vers\u00e9 apr\u00e8s signature de l\u2019acte authentique par votre filleul" highlight />
        </div>
        <button onClick={onScrollForm} style={{ marginTop: 40, background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', border: 'none', borderRadius: 2, padding: '14px 32px', fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", cursor: 'pointer' }}>
          {"Parrainer un proche \u2192"}
        </button>
      </div>
    </section>
  )
}
