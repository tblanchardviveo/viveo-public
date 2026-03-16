import { Link } from 'react-router-dom'

const avantages = [
  {
    icon: '\ud83c\udfe0',
    title: 'Revenus locatifs d\u00e8s la rentr\u00e9e',
    desc: 'Un bien mis en location g\u00e9n\u00e8re des loyers qui couvrent directement les frais de scolarit\u00e9.'
  },
  {
    icon: '\ud83d\udcc8',
    title: 'Capital qui se construit',
    desc: 'En 15\u00a0ans, votre bien se valorise. Vous pouvez le revendre ou le transmettre au moment des \u00e9tudes.'
  },
  {
    icon: '\ud83c\udf93',
    title: 'Logement \u00e9tudiant int\u00e9gr\u00e9',
    desc: 'Studio ou T2 en r\u00e9sidence \u00e9tudiante : votre enfant y habite, vous \u00e9conomisez le loyer.'
  },
  {
    icon: '\u2696\ufe0f',
    title: 'Fiscalit\u00e9 optimis\u00e9e',
    desc: 'LMNP, d\u00e9ficit foncier, nue-propri\u00e9t\u00e9 : des leviers puissants pour r\u00e9duire l\u2019effort r\u00e9el.'
  }
]

export default function SolutionEtudes() {
  return (
    <section style={{
      background: 'var(--navy-deep)', padding: '100px 24px',
      position: 'relative'
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 60%, rgba(166,124,82,0.04) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
          }}>Notre solution</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300,
          color: '#fff', lineHeight: 1.2, marginBottom: 20, maxWidth: 600
        }}>
          {'L\u2019immobilier comme '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>bourse d'\u00e9tudes</em>
        </h2>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, marginBottom: 56
        }}>
          {'Chez VIVEO, nous aidons les parents \u00e0 transformer un investissement immobilier en solution concr\u00e8te pour financer les \u00e9tudes de leurs enfants.'}
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 20
        }}>
          {avantages.map((a, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '32px 24px',
              transition: 'all 0.3s'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(166,124,82,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{a.icon}</span>
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 18, fontWeight: 400, color: '#fff', marginBottom: 8
              }}>{a.title}</h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300,
                color: 'rgba(255,255,255,0.45)', lineHeight: 1.6
              }}>{a.desc}</p>
            </div>
          ))}
        </div>

        <Link to="/programmes" style={{
          display: 'inline-block', marginTop: 48,
          fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 500,
          color: 'var(--bronze)', textTransform: 'uppercase',
          letterSpacing: '0.08em', textDecoration: 'none',
          transition: 'transform 0.3s'
        }}>{"D\u00e9couvrir nos programmes \u2192"}</Link>
      </div>
    </section>
  )
}
