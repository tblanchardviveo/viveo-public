import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SIMS = [
  { icon: '🏠', titre: 'Simulateur PTZ 2026', desc: 'Calculez votre éligibilité et montant PTZ selon zone, revenus et foyer.', route: '/simulateur-ptz' },
  { icon: '%', titre: 'Éligibilité TVA 5.5%', desc: 'Vérifiez si votre achat VEFA bénéficie de la TVA réduite en zone ANRU / QPV.', route: '/simulateur-tva' },
  { icon: '🏦', titre: 'Crédit & Capacité d\'emprunt', desc: 'Calculez vos mensualités et votre capacité d\'emprunt avec et sans PTZ.', route: '/simulateur-credit' },
  { icon: '🔑', titre: 'LMNP à l\'amortissement', desc: 'Simulez votre investissement meublé : effort épargne, rendement et fiscalité.', route: '/simulateur-lmnp' },
  { icon: '📈', titre: 'Rendement locatif net', desc: 'Comparez rendement brut, net charges et net fiscal selon votre fiscalité.', route: '/simulateur-rendement' },
]

function Card({ sim, isMobile }) {
  const navigate = useNavigate()
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 16,
        border: hovered ? '1px solid #C4976A' : '1px solid #e8e3dc',
        boxShadow: hovered ? '0 8px 32px rgba(196,151,106,0.18)' : '0 2px 8px rgba(0,0,0,0.05)',
        padding: '32px 28px', display: 'flex', flexDirection: 'column', gap: 12,
        transition: 'border 0.2s, box-shadow 0.2s', cursor: 'default',
      }}
    >
      <span style={{ fontSize: 36 }}>{sim.icon}</span>
      <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, fontWeight: 600, color: '#111C33', margin: 0 }}>{sim.titre}</h2>
      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0, flex: 1 }}>{sim.desc}</p>
      <button
        onClick={() => navigate(sim.route)}
        style={{
          marginTop: 8, alignSelf: 'flex-start',
          background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
          color: '#fff', border: 'none', borderRadius: 4,
          padding: '10px 20px', fontFamily: "'Raleway', sans-serif",
          fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
          textTransform: 'uppercase', cursor: 'pointer',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
        onMouseLeave={e => e.currentTarget.style.opacity = '1'}
      >
        Accéder →
      </button>
    </div>
  )
}

export default function Simulateurs() {
  const navigate = useNavigate()
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div style={{ background: '#F7F5F0', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: '#111C33', padding: isMobile ? '64px 24px 56px' : '80px 40px 72px', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C4976A', margin: '0 0 16px' }}>VIVEO · Outils</p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? 32 : 48, fontWeight: 400, color: '#fff', margin: '0 0 16px', lineHeight: 1.2 }}>Nos Simulateurs</h1>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: isMobile ? 15 : 18, color: 'rgba(255,255,255,0.65)', margin: 0, fontWeight: 300 }}>Calculez votre projet immobilier en temps réel</p>
      </div>

      {/* Grille */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: isMobile ? '48px 20px' : '72px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: 24,
        }}>
          {SIMS.map(sim => <Card key={sim.route} sim={sim} isMobile={isMobile} />)}
        </div>
      </div>

      {/* CTA bas navy */}
      <div style={{ background: '#111C33', padding: isMobile ? '56px 24px' : '80px 40px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: isMobile ? 26 : 36, fontWeight: 400, color: '#fff', margin: '0 0 16px' }}>Besoin d'un conseil personnalisé ?</h2>
        <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, color: 'rgba(255,255,255,0.6)', margin: '0 0 36px', maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          Nos simulateurs donnent des estimations indicatives. Un CGP VIVEO analyse votre situation réelle gratuitement.
        </p>
        <button
          onClick={() => navigate('/rdv-decouverte')}
          style={{
            background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
            color: '#fff', border: 'none', borderRadius: 4,
            padding: '14px 32px', fontFamily: "'Raleway', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: '0.08em',
            textTransform: 'uppercase', cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Prendre RDV Découverte →
        </button>
      </div>
    </div>
  )
}
