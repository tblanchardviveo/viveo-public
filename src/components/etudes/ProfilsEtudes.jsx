import { useState } from 'react'

const profils = [
  {
    title: 'Enfant en maternelle',
    icon: '\ud83c\udf92',
    budget: '49 000 \u00e0 95 000 \u20ac',
    detail: 'Vous avez 15 ans devant vous. C\u2019est le moment id\u00e9al pour commencer \u00e0 investir : m\u00eame un petit effort mensuel peut g\u00e9n\u00e9rer un capital cons\u00e9quent.'
  },
  {
    title: 'Enfant au coll\u00e8ge',
    icon: '\ud83d\udcda',
    budget: '49 000 \u00e0 135 000 \u20ac',
    detail: 'Il reste 6 \u00e0 8 ans. L\u2019urgence monte, mais des solutions immobili\u00e8res existent encore : LMNP, nue-propri\u00e9t\u00e9 courte, SCPI.'
  },
  {
    title: 'Enfant au lyc\u00e9e',
    icon: '\ud83c\udf93',
    budget: '49 000 \u00e0 135 000 \u20ac',
    detail: 'Le sup\u00e9rieur approche. Chaque ann\u00e9e compte. Un investissement bien calibr\u00e9 peut encore couvrir une grande partie du budget.'
  },
  {
    title: 'Famille avec 2+ enfants',
    icon: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    budget: '100 000 \u00e0 270 000 \u20ac',
    detail: 'Le budget se multiplie avec chaque enfant. Une strat\u00e9gie patrimoniale globale devient indispensable pour \u00e9viter de sacrifier votre niveau de vie.'
  },
  {
    title: 'Parent solo',
    icon: '\ud83d\udcaa',
    budget: '49 000 \u00e0 135 000 \u20ac',
    detail: 'Revenus uniques, charges doubles. L\u2019anticipation est votre meilleur alli\u00e9 pour offrir les m\u00eames chances \u00e0 vos enfants.'
  }
]

export default function ProfilsEtudes() {
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
          {'Quel budget '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>selon votre profil\u00a0?</em>
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
                  }}>{p.budget}</span>
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
