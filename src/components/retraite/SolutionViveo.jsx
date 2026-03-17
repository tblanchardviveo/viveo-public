import { Link } from 'react-router-dom'

const avantages = [
  {
    icon: '\ud83c\udfe0',
    title: 'Revenus locatifs index\u00e9s',
    desc: 'Les loyers suivent l\u2019inflation, contrairement aux pensions fig\u00e9es.'
  },
  {
    icon: '\ud83d\udcc8',
    title: 'Patrimoine qui se valorise',
    desc: 'L\u2019immobilier prend de la valeur dans la Durée, une double performance.'
  },
  {
    icon: '\ud83d\udee1\ufe0f',
    title: 'Protection du conjoint',
    desc: 'Un bien transmissible, contrairement \u00e0 la r\u00e9version souvent partielle.'
  },
  {
    icon: '\u2696\ufe0f',
    title: 'Fiscalit\u00e9 optimis\u00e9e',
    desc: 'LMNP, d\u00e9ficit foncier, nue-propri\u00e9t\u00e9 : des leviers puissants.'
  }
]

export default function SolutionViveo() {
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
          {'L\u2019immobilier comme '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>seconde pension</em>
        </h2>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, marginBottom: 56
        }}>
          {'Chez VIVEO, nous accompagnons nos clients dans la cr\u00e9ation d\u2019un compl\u00e9ment de revenu durable, \u00e0 travers l\u2019immobilier neuf s\u00e9lectionn\u00e9 avec rigueur.'}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 24
        }}>
          {avantages.map((a, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '32px 24px',
              transition: 'border-color 0.3s, transform 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(166,124,82,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: 32, display: 'block', marginBottom: 16 }}>{a.icon}</span>
              <h3 style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 15,
                fontWeight: 600, color: '#fff', marginBottom: 8
              }}>{a.title}</h3>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 13,
                fontWeight: 300, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6
              }}>{a.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <Link to="/programmes" style={{
            display: 'inline-block',
            border: '1px solid var(--bronze)', color: 'var(--bronze)',
            borderRadius: 50, padding: '14px 32px',
            fontSize: 13, fontWeight: 500, letterSpacing: '0.06em',
            textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif",
            textDecoration: 'none', transition: 'all 0.3s'
          }}>{"D\u00e9couvrir nos programmes \u2192"}</Link>
        </div>
      </div>
    </section>
  )
}
