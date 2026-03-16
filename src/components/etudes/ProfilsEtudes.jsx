import { useState } from 'react'

const profils = [
  {
    title: 'Enfant en maternelle',
    icon: '\ud83c\udf92',
    budget: '49 000 à 95 000 €',
    detail: 'Vous avez 15 ans devant vous. C’est le moment idéal pour commencer à investir : même un petit effort mensuel peut générer un capital conséquent.'
  },
  {
    title: 'Enfant au collège',
    icon: '\ud83d\udcda',
    budget: '49 000 à 135 000 €',
    detail: 'Il reste 6 à 8 ans. L’urgence monte, mais des solutions immobilières existent encore : LMNP, nue-propriété courte, SCPI.'
  },
  {
    title: 'Enfant au lycée',
    icon: '\ud83c\udf93',
    budget: '49 000 à 135 000 €',
    detail: 'Le supérieur approche. Chaque année compte. Un investissement bien calibré peut encore couvrir une grande partie du budget.'
  },
  {
    title: 'Famille avec 2+ enfants',
    icon: '\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66',
    budget: '100 000 à 270 000 €',
    detail: 'Le budget se multiplie avec chaque enfant. Une stratégie patrimoniale globale devient indispensable pour éviter de sacrifier votre niveau de vie.'
  },
  {
    title: 'Parent solo',
    icon: '\ud83d\udcaa',
    budget: '49 000 à 135 000 €',
    detail: 'Revenus uniques, charges doubles. L’anticipation est votre meilleur allié pour offrir les mêmes chances à vos enfants.'
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
          {'Quel budget '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>selon votre profil ?</em>
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
                  }}>{"▾"}</span>
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
