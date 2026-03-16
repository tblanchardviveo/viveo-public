import { Link } from 'react-router-dom'

const avantages = [
  {
    icon: '\ud83c\udfe0',
    title: 'Revenus locatifs dès la rentrée',
    desc: 'Un bien mis en location génère des loyers qui couvrent directement les frais de scolarité.'
  },
  {
    icon: '\ud83d\udcc8',
    title: 'Capital qui se construit',
    desc: 'En 15 ans, votre bien se valorise. Vous pouvez le revendre ou le transmettre au moment des études.'
  },
  {
    icon: '\ud83c\udf93',
    title: 'Logement étudiant intégré',
    desc: 'Studio ou T2 en résidence étudiante : votre enfant y habite, vous économisez le loyer.'
  },
  {
    icon: '\u2696\ufe0f',
    title: 'Fiscalité optimisée',
    desc: 'LMNP, déficit foncier, nue-propriété : des leviers puissants pour réduire l’effort réel.'
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
          {'L’immobilier comme '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>bourse d'études</em>
        </h2>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, marginBottom: 56
        }}>
          {'Chez VIVEO, nous aidons les parents à transformer un investissement immobilier en solution concrète pour financer les études de leurs enfants.'}
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
        }}>{"Découvrir nos programmes →"}</Link>
      </div>
    </section>
  )
}
