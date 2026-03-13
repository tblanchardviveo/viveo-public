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
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease,transform 0.8s ease', ...style }}>{children}</section>
}

export default function LoiMalraux() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: '#111C33', padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LOI MALRAUX</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Rénover l’exception —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'réduire jusqu’à 30 %.'}</em>
        </h1>
        <p style={pStyle()}>{'Loi Malraux — une réduction d’impôt directe de 22 à 30 % sur les travaux de restauration de biens situés dans des secteurs sauvegardés. Un cadre d’exception pour un patrimoine d’exception.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Simuler</Link>
        </div>
      </section>

      {/* Section 2 — Mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>Comment fonctionne la Loi Malraux</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction directe d’impôt','22 % en Zone de Protection du Patrimoine Architectural, 30 % en Secteur Sauvegardé. La réduction s’impute directement sur l’impôt dû.'],['Travaux éligibles','Restauration complète supervisée par un Architecte des Bâtiments de France, dans le cadre d’une opération groupée.'],['Hors niches fiscales','La réduction Malraux n’entre pas dans le plafond des niches fiscales de 10 000 €/an.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 3 — Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={{ ...eyeLine, background: '#A67C52' }} /><span style={eyeText}>LES AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>Pourquoi choisir la Loi Malraux</h2>
        <p style={pStyle('#555')}>{'Un dispositif idéal pour les contribuables fortement imposés qui souhaitent allîr optimisation fiscale et possession d’un bien immobilier de caractère.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction immédiate','Imputation sur l’impôt de l’année de paiement des travaux, sans attendre la location.'],['Bien valorisé','Un bien restauré en secteur protégé prend de la valeur et reste rare.'],['Loyers libres','Pas de plafond de loyer ni de ressources locataires après la période de location obligée.'],['Transmission','Un bien Malraux est un actif patrimonial solide, facilement transmissible.']].map(([t,d],i) => (
            <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#111C33', marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#666', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 4 — Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>Votre profil investisseur</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['Le très haut contribuable','TMI 41 % ou 45 %, impôt annuel supérieur à 20 000 €. La Loi Malraux permet de le réduire substantiellement sur 2 à 4 ans.'],['Le passionné de patrimoine','Vous appréciez les immeubles anciens en cœur de ville et souhaitez participer à leur restauration.'],['L’investisseur sélect if','Vous préférez la qualité à la quantité et recherchez un actif rare, valorisable sur le long terme.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 5 — Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>Notre approche Loi Malraux</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des opérations classées','Nous identifions les programmes Malraux en secteurs sauvegardés, portés par des opérateurs reconnus.'],['Simulation fiscale personnalisée','Nous calculons précisément votre réduction d’impôt et le montant optimal à investir selon votre TMI.'],['Accompagnement jusqu’à la livraison','Suivi de l’opération, de la signature à la remise des clés et à la mise en location.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 6 — CTA */}
      <Sec bg="#111C33">
        <h2 style={h2Style()}>{'Parlons de votre stratégie.'}</h2>
        <p style={pStyle()}>{'Découvrons ensemble les opérations Malraux sélectionnées par VIVEO et calculons votre réduction d’impôt précise.'}</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
