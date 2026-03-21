const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

export default function HeroParrainage({ onScrollForm }) {
  return (
    <section style={{
      background: 'var(--navy-deep)',
      backgroundImage: 'url(/images/IMG_0625.png)',
      backgroundSize: 'cover', backgroundPosition: 'center',
      position: 'relative', overflow: 'hidden',
      padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px) 60px'
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,28,51,0.55) 0%, rgba(17,28,51,0.75) 60%, rgba(17,28,51,0.90) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto' }}>
        <Eyebrow>PROGRAMME DE PARRAINAGE</Eyebrow>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: '#fff', lineHeight: 1.1 }}>
          Recommandez VIVEO {"\u2014"}<br />
          <em style={{ fontStyle: 'italic', color: '#C4976A' }}>et soyez récompensé.</em>
        </h1>
        <div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
          {[['400 \u20ac', '\u00b7 Vous êtes prospect VIVEO'], ['800 \u20ac', '\u00b7 Vous êtes client VIVEO']].map(([montant, label]) => (
            <div key={label} style={{ background: 'rgba(166,124,82,0.12)', border: '1px solid rgba(166,124,82,0.3)', borderRadius: 16, padding: '24px 32px', textAlign: 'center', minWidth: 200 }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 40, color: '#C4976A', display: 'block' }}>{montant}</span>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.65)', marginTop: 8, display: 'block' }}>{label}</span>
            </div>
          ))}
        </div>
        <button onClick={onScrollForm} style={{
          marginTop: 40, background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
          color: '#fff', border: 'none', borderRadius: 50, padding: '16px 36px',
          fontSize: 13, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
          fontFamily: "'Raleway', sans-serif", cursor: 'pointer'
        }}>{"Parrainer un proche \u2192"}</button>
      </div>
    </section>
  )
}
