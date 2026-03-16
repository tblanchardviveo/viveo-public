import { useState } from 'react'

const profils = [
  {
    title: 'Salari\u00e9 du priv\u00e9',
    icon: '\ud83c\udfe2',
    perte: '40 \u00e0 50%',
    detail: 'Plafonnement des cotisations, d\u00e9cote si d\u00e9part anticip\u00e9. Le choc est souvent brutal.'
  },
  {
    title: 'Cadre sup\u00e9rieur',
    icon: '\ud83d\udcbc',
    perte: '50 \u00e0 60%',
    detail: 'Au-del\u00e0 du PASS, la retraite ne compense presque plus. Plus le salaire est haut, plus l\u2019\u00e9cart est violent.'
  },
  {
    title: 'Profession lib\u00e9rale',
    icon: '\u2696\ufe0f',
    perte: '60 \u00e0 70%',
    detail: 'R\u00e9gimes sp\u00e9cifiques souvent sous-dot\u00e9s. La pr\u00e9paration individuelle est indispensable.'
  },
  {
    title: 'Chef d\u2019entreprise',
    icon: '\ud83d\ude80',
    perte: '55 \u00e0 65%',
    detail: 'Faibles cotisations, patrimoine souvent bloqu\u00e9 dans l\u2019entreprise. Diversifier est vital.'
  },
  {
    title: 'Fonctionnaire',
    icon: '\ud83c\udfdb\ufe0f',
    perte: '25 \u00e0 35%',
    detail: 'Le syst\u00e8me est plus protecteur, mais les primes ne sont pas int\u00e9gr\u00e9es. L\u2019\u00e9cart reste significatif.'
  }
]

export default function ProfilsRetraite() {
  const [open, setOpen] = useState(null)

  return (
    <section style={{
      background: 'var(--navy-deep)', padding: '100px 24px'
    }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
          }}>Votre situation</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300,
          color: '#fff', lineHeight: 1.2, marginBottom: 48
        }}>
          {'Quel impact '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>sur votre profil ?</em>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {profils.map((p, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '20px 24px',
                  background: open === i ? 'rgba(166,124,82,0.08)' : 'rgba(255,255,255,0.02)',
                  border: '1px solid',
                  borderColor: open === i ? 'rgba(166,124,82,0.25)' : 'rgba(255,255,255,0.06)',
                  borderRadius: open === i ? '12px 12px 0 0' : 12,
                  cursor: 'pointer', transition: 'all 0.3s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 24 }}>{p.icon}</span>
                  <span style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: 15,
                    fontWeight: 500, color: '#fff'
                  }}>{p.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 18, color: 'var(--bronze)', fontWeight: 400
                  }}>{p.perte}</span>
                  <span style={{
                    color: 'rgba(255,255,255,0.4)', fontSize: 18,
                    transform: open === i ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.3s'
                  }}>{"\u25be"}</span>
                </div>
              </button>
              {open === i && (
                <div style={{
                  padding: '20px 24px', background: 'rgba(166,124,82,0.04)',
                  border: '1px solid rgba(166,124,82,0.15)',
                  borderTop: 'none', borderRadius: '0 0 12px 12px'
                }}>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: 14,
                    fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7
                  }}>{p.detail}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
