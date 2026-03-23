import { useState } from 'react'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function SimulateurRetraite() {
  const [salaire, setSalaire] = useState(4000)
  const [age, setAge] = useState(35)

  const tauxRemplacement = salaire <= 2500 ? 0.60 : salaire <= 4000 ? 0.53 : salaire <= 6000 ? 0.45 : 0.38
  const pension = Math.round(salaire * tauxRemplacement)
  const ecart = salaire - pension
  const pctPerte = Math.round((1 - tauxRemplacement) * 100)
  const anneesFuture = 64 - age
  const ecartCumule = ecart * 12 * 20

  const fmt = n => n.toLocaleString('fr-FR')

  const sliderStyle = {
    width: '100%', height: 4, borderRadius: 2,
    appearance: 'none', WebkitAppearance: 'none',
    background: 'rgba(255,255,255,0.1)', outline: 'none',
    cursor: 'pointer'
  }

  return (
    <section id="simulateur-retraite" style={{
      background: '#0D1528', padding: '100px 24px'
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
          }}>Simulateur</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 300,
          color: '#fff', lineHeight: 1.2, marginBottom: 48
        }}>
          {'Estimez '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>{'votre écart'}</em>
        </h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: 48, alignItems: 'start'
        }}>
          {/* Sliders */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: 13,
                  fontWeight: 400, color: 'rgba(255,255,255,0.5)'
                }}>Salaire net mensuel</span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, color: '#fff', fontWeight: 400
                }}>{fmt(salaire)} {'€'}</span>
              </div>
              <input type="range" min={1500} max={12000} step={100}
                value={salaire} onChange={e => setSalaire(+e.target.value)}
                style={sliderStyle}
              />
              <style>{`input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--bronze);cursor:pointer;border:2px solid #fff}`}</style>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: 13,
                  fontWeight: 400, color: 'rgba(255,255,255,0.5)'
                }}>{"Âge actuel"}</span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, color: '#fff', fontWeight: 400
                }}>{age} ans</span>
              </div>
              <input type="range" min={25} max={60} step={1}
                value={age} onChange={e => setAge(+e.target.value)}
                style={sliderStyle}
              />
            </div>
          </div>

          {/* Results */}
          <div style={{
            background: 'rgba(166,124,82,0.06)',
            border: '1px solid rgba(166,124,82,0.2)',
            borderRadius: 16, padding: '40px 32px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <div>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Pension estim{"é"}e</p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: '#fff', fontWeight: 300 }}>{fmt(pension)} {'€'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{"Écart mensuel"}</p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: 'var(--bronze)', fontWeight: 300 }}>-{fmt(ecart)} {'€'}</p>
              </div>
            </div>

            {/* Bar */}
            <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 8, marginBottom: 24, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 8,
                background: 'linear-gradient(90deg, var(--bronze), #C4976A)',
                width: `${tauxRemplacement * 100}%`,
                transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 32 }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{pctPerte}% de perte</span>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{anneesFuture} ans pour agir</span>
            </div>

            <div style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: 10,
              padding: '16px 20px', marginBottom: 24
            }}>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>{"Manque à gagner sur 20 ans de retraite"}</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: '#fff' }}>{fmt(ecartCumule)} {'€'}</p>
            </div>

            <a href={'/rdv-decouverte'} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textAlign: 'center',
              background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
              color: '#fff', borderRadius: 50, padding: '14px 32px',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif",
              textDecoration: 'none'
            }}>{"Anticiper maintenant →"}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
