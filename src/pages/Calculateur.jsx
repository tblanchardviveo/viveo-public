import { useState } from 'react'
import CalcResidencePrincipale from '../components/CalcResidencePrincipale'
import CalcInvestissement from '../components/CalcInvestissement'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

const Eyebrow = ({ children }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
    <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
    <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>{children}</span>
  </div>
)

export default function Calculateur() {
  const [mode, setMode] = useState('residence')

  const tabStyle = (active) => ({
    background: active ? 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)' : 'rgba(255,255,255,0.06)',
    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
    border: active ? 'none' : '1px solid rgba(255,255,255,0.12)',
    borderRadius: 50, padding: '10px 28px', fontSize: 13, fontWeight: 600,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    fontFamily: "'Raleway', sans-serif", cursor: 'pointer',
    transition: 'all 0.3s'
  })

  return (
    <>
      <section style={{ background: 'var(--navy)', padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px) 0', position: 'relative' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Eyebrow>SIMULATEURS</Eyebrow>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 400, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
            {"Calculez votre"}<br />
            <em style={{ fontStyle: 'italic', color: '#C4976A' }}>projet immobilier</em>
          </h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 'clamp(14px, 2.5vw, 17px)', color: 'rgba(255,255,255,0.55)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            {"Estimez vos mensualités, votre éligibilité au PTZ, ou le rendement de votre investissement locatif."}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <button onClick={() => setMode('residence')} style={tabStyle(mode === 'residence')}>
              {"Résidence principale"}
            </button>
            <button onClick={() => setMode('investissement')} style={tabStyle(mode === 'investissement')}>
              Investissement
            </button>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--navy)', padding: '0 clamp(20px, 4vw, 40px) clamp(60px, 10vw, 100px)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {mode === 'residence' && <CalcResidencePrincipale />}
          {mode === 'investissement' && <CalcInvestissement />}
        </div>
      </section>

      <section style={{ background: 'var(--navy-deep)', padding: '80px 40px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(22px, 4vw, 32px)', color: '#fff', fontWeight: 400, marginBottom: 16 }}>
            {"Besoin d'un accompagnement ?"}
          </h2>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.5)', marginBottom: 32, lineHeight: 1.6 }}>
            {"Nos conseillers analysent votre situation et vous proposent les meilleures solutions."}
          </p>
          <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-block', background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
            color: '#fff', borderRadius: 50, padding: '14px 36px', fontSize: 13,
            fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'Raleway', sans-serif", textDecoration: 'none', transition: 'all 0.3s'
          }}>
            {"Prendre rendez-vous →"}
          </a>
        </div>
      </section>
    </>
  )
}
