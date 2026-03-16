import { useState } from 'react'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function SimulateurEtudes() {
  const [revenu, setRevenu] = useState(5000)
  const [enfants, setEnfants] = useState(1)
  const [ambition, setAmbition] = useState(2)

  const coutMensuelParEnfant = ambition === 1 ? 820 : ambition === 2 ? 1300 : 2250
  const dureeMois = 60
  const coutTotal = coutMensuelParEnfant * dureeMois * enfants
  const epargneNecessaire = Math.round(coutTotal / (18 * 12))
  const pctRevenu = Math.round((epargneNecessaire / revenu) * 100)

  const fmt = n => n.toLocaleString('fr-FR')

  const sliderStyle = {
    width: '100%', height: 4, borderRadius: 2,
    appearance: 'none', WebkitAppearance: 'none',
    background: 'rgba(255,255,255,0.1)', outline: 'none',
    cursor: 'pointer'
  }

  const labels = ['', 'Université publique', 'École de commerce / ingénieur', 'Grande école + logement Paris']

  return (
    <section id="simulateur" style={{
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
          {'Estimez '}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>{'le coût réel'}</em>
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
                }}>Revenu net mensuel</span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, color: '#fff', fontWeight: 400
                }}>{fmt(revenu)} {'€'}</span>
              </div>
              <input type="range" min={2000} max={15000} step={500}
                value={revenu} onChange={e => setRevenu(+e.target.value)} style={sliderStyle} />
              <style>{`input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--bronze);cursor:pointer;border:2px solid #fff}`}</style>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: 13,
                  fontWeight: 400, color: 'rgba(255,255,255,0.5)'
                }}>Nombre d'enfants</span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, color: '#fff', fontWeight: 400
                }}>{enfants}</span>
              </div>
              <input type="range" min={1} max={4} step={1}
                value={enfants} onChange={e => setEnfants(+e.target.value)} style={sliderStyle} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{
                  fontFamily: "'Raleway', sans-serif", fontSize: 13,
                  fontWeight: 400, color: 'rgba(255,255,255,0.5)'
                }}>Niveau d'ambition</span>
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 16, color: '#fff', fontWeight: 400
                }}>{labels[ambition]}</span>
              </div>
              <input type="range" min={1} max={3} step={1}
                value={ambition} onChange={e => setAmbition(+e.target.value)} style={sliderStyle} />
            </div>
          </div>

          {/* Results */}
          <div style={{
            background: 'rgba(166,124,82,0.06)', border: '1px solid rgba(166,124,82,0.15)',
            borderRadius: 16, padding: '40px 32px'
          }}>
            <div style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
                marginBottom: 4
              }}>Coût total estimé</p>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 40, fontWeight: 300, color: '#fff'
              }}>{fmt(coutTotal)} {'€'}</p>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 13,
                color: 'rgba(255,255,255,0.4)', marginTop: 4
              }}>pour {enfants} enfant{enfants > 1 ? 's' : ''} sur 5 ans</p>
            </div>

            <div style={{ marginBottom: 32 }}>
              <p style={{
                fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 500,
                letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)',
                marginBottom: 4
              }}>{"Épargne mensuelle nécessaire"}</p>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 32, fontWeight: 300, color: 'var(--bronze)'
              }}>{fmt(epargneNecessaire)} {'€'}/mois</p>
            </div>

            {/* Bar */}
            <div style={{
              background: 'rgba(255,255,255,0.06)', borderRadius: 8, height: 8,
              marginBottom: 16, overflow: 'hidden'
            }}>
              <div style={{
                width: `${Math.min(pctRevenu, 100)}%`, height: '100%',
                background: pctRevenu > 30 ? '#e74c3c' : 'var(--bronze)',
                borderRadius: 8, transition: 'width 0.5s'
              }} />
            </div>
            <p style={{
              fontFamily: "'Raleway', sans-serif", fontSize: 13,
              color: 'rgba(255,255,255,0.5)', textAlign: 'center'
            }}>
              {pctRevenu}% de vos revenus
            </p>

            <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', textAlign: 'center', marginTop: 32,
              background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
              color: '#fff', borderRadius: 50, padding: '16px 40px',
              fontSize: 14, fontWeight: 600, letterSpacing: '0.06em',
              textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif",
              textDecoration: 'none', transition: 'all 0.3s'
            }}>{"Anticiper maintenant →"}</a>
          </div>
        </div>
      </div>
    </section>
  )
}
