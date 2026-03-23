import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }
const h2Style = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, color: c || '#fff', letterSpacing: '-0.02em' })
const pStyle = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: 20 })
const cta = { display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }
const pill = { padding: '8px 20px', borderRadius: 20, fontSize: 12, fontFamily: "'Raleway',sans-serif", fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', textTransform: 'uppercase' }
const card = (bg) => ({ background: bg || 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 28, border: '1px solid rgba(255,255,255,0.06)' })

function Sec({ children, bg, style }) {
  const [ref, vis] = useReveal()
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease', ...style }}>{children}</section>
}

export default function LoiJeanbrun() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg,rgba(17,28,51,0.55) 0%,rgba(17,28,51,0.75) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1) 100%), url('${WP}/wp-content/uploads/2026/03/IMG_0656.png') center/cover no-repeat`, padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LOI JEANBRUN</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Investir dans le neuf —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'avec la loi Jeanbrun.'}</em>
        </h1>
        <p style={pStyle()}>{'La Loi Jeanbrun modernise l’investissement locatif dans le neuf en zone tendue, avec des avantages fiscaux attractifs pour les contribuables fortement imposés.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Calculateur</Link>
        </div>
      </section>

      {/* Section 2 - Le mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>{'Comment fonctionne la Loi Jeanbrun'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction fiscale directe', 'Réduction d’impôt sur le prix d’acquisition d’un logement neuf destiné à la location, avec loyer plafonné.'], ['Zone tendue', 'Dispositif concentré sur les zones à forte demande locative pour maximiser l’utilité sociale et le rendement.'], ['Plafond de loyer', 'Loyers plafonnés pour assurer l’accessibilité au logement tout en garantissant un rendement stable.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 3 - Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>{'Les bénéfices clés —'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'pour votre patrimoine.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction immédiate', 'Avantage fiscal obtenu dès la première année de mise en location du bien.'], ['Patrimoine neuf', 'Acquisition d’un bien sans travaux, avec garanties constructeur et normes BBC/RE2020.'], ['Flexibilité de revente', 'Possibilité de revente à l’issue de la période d’engagement ou de continuer à louer.']].map(([t, d], i) => <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 4 - Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>{'Votre profil investisseur'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['TMI 30 % ou plus', 'La Loi Jeanbrun est particulièrement adaptée aux contribuables avec une tranche marginale élevée.'], ['Primo-investisseur', 'Dispositif accessible et sécurisé pour débuter dans l’investissement locatif neuf.'], ['Recherche de simplicité', 'Pas de travaux, pas de gestion complexe : un investissement clé-en-main.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 5 - Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>{'Notre approche Loi Jeanbrun'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des opérations', 'Nous identifions les programmes Jeanbrun en zones tendues, portés par des opérateurs sérieux avec un historique de livraison.'], ['Optimisation fiscale', 'Nous calons le montant investi sur votre situation fiscale réelle pour maximiser la réduction sans sur-exposition.'], ['Suivi jusqu’à la livraison', 'Accompagnement de la réservation à la remise des clés, puis mise en gestion locative si souhaité.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 6 - CTA */}
      <Sec bg="#111C33" style={{ textAlign: 'center' }}>
        <h2 style={h2Style()}>{'Parlons de votre stratégie.'}</h2>
        <p style={pStyle()}>{'Découvrons ensemble les opérations Jeanbrun sélectionnées par VIVEO et calculons votre réduction d’impôt précise.'}</p>
        <a href={'/rdv-decouverte'} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
