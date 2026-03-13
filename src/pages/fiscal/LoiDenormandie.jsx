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

export default function LoiDenormandie() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: '#111C33', padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LOI DENORMANDIE</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Investir dans l’ancien —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'avec réduction d’impôt.'}</em>
        </h1>
        <p style={pStyle()}>{'La Loi Denormandie combine investissement locatif dans l’ancien, travaux de rénovation et réduction d’impôt de 12 à 21 % du prix d’acquisition.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Calculateur</Link>
        </div>
      </section>

      {/* Section 2 - Le mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>{'Comment fonctionne la Loi Denormandie'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction 12 à 21 %', '12 % pour 6 ans d’engagement, 18 % pour 9 ans, 21 % pour 12 ans. La réduction s’applique sur le prix du bien + travaux.'], ['Zone éligible', 'Communes du plan Action Cœur de Ville et communes signataires d’une ORT (Opération de Revitalisation du Territoire).'], ['Travaux obligatoires', 'Les travaux doivent représenter au minimum 25 % du coût total de l’opération pour valider l’éligibilité.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 3 - Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>{'Les atouts du dispositif —'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'pour l’investisseur.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Double valorisation', 'Le bien rénové prend de la valeur tout en générant une réduction fiscale immédiate.'], ['Centre-ville', 'Investir dans des quartiers historiques en cours de revitalisation, à fort potentiel locatif.'], ['Loyers plafonnés', 'Loyers et ressources du locataire plafonnés, garantissant une demande locative stable et sécurisée.']].map(([t, d], i) => <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 4 - Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>{'Votre profil investisseur'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['TMI 30 % ou plus', 'La Loi Denormandie est optimale pour les contribuables avec un impôt annuel supérieur à 5 000 €.'], ['Goût du patrimoine ancien', 'Idéal pour qui veut allier charme de l’ancien, revitalisation urbaine et performance fiscale.'], ['Horizon 6 à 12 ans', 'Engagement locatif à choisir selon votre horizon patrimonial pour optimiser la réduction.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 5 - Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>{'Notre approche Loi Denormandie'}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des opérations', 'Nous identifions les biens éligibles en zones Action Cœur de Ville, avec des maîtres d’œuvre sélectionnés.'], ['Optimisation de la tranche', 'Nous calons le montant investi sur votre TMI réel pour maximiser la réduction sans sur-exposition.'], ['Suivi des travaux', 'Accompagnement de la phase de rénovation à la livraison, puis mise en gestion locative sécurisée.']].map(([t, d], i) => <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* Section 6 - CTA */}
      <Sec bg="#111C33" style={{ textAlign: 'center' }}>
        <h2 style={h2Style()}>{'Parlons de votre stratégie.'}</h2>
        <p style={pStyle()}>{'Découvrons ensemble les opérations Denormandie sélectionnées par VIVEO et calculons votre réduction d’impôt précise.'}</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
