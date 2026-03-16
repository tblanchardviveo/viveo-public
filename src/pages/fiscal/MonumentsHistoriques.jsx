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

export default function MonumentsHistoriques() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg,rgba(17,28,51,0.55) 0%,rgba(17,28,51,0.75) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1) 100%), url(${WP}/wp-content/uploads/2026/03/IMG_0490.png) center/cover`, padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>MONUMENTS HISTORIQUES</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Restaurer l’exception —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'déduire sans plafond.'}</em>
        </h1>
        <p style={pStyle()}>{'Monuments Historiques — déduisez 100 % des travaux de restauration de votre revenu global, sans limitation de montant. Le dispositif le plus puissant de la fiscalité immobilière.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Simuler</Link>
        </div>
      </section>

      {/* Section 2 — Mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>Comment fonctionne le dispositif MH</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Déduction 100 % sans plafond','L’intégralité des travaux de restauration est déductible du revenu global, sans limitation de montant, ni plafonnement des niches.'],['Engagement de conservation','Le propriétaire s’engage à conserver et ouvrir le bien au public au moins 40 jours par an.'],['Charges d’exploitation déductibles','Toutes les charges (entretien, intérêts d’emprunt, taxes) sont déductibles des revenus fonciers.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 3 — Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={{ ...eyeLine, background: '#A67C52' }} /><span style={eyeText}>LES AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>Pourquoi choisir les Monuments Historiques</h2>
        <p style={pStyle('#555')}>{'La déduction la plus puissante de la fiscalité française, sans plafond, pour les contribuables fortement imposés souhaitant posséder un bien d’exception.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sans plafonnement des niches','Le régime MH échappe au plafond global de 10 000 €/an des niches fiscales.'],['Imputation sur le revenu global','Contrairement au déficit foncier classique, l’imputation n’est pas limitée à 10 700 €.'],['Patrimoine rare et valorisable','Un bien MH est un actif unique, sécurisé, aux perspectives de valorisation exceptionnelles.'],['Transmission av antageuse','Les droits de succession peuvent être nuls si le bénéficiaire s’engage à conserver le bien.']].map(([t,d],i) => (
            <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#111C33', marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#666', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 4 — Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>Votre profil investisseur</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['Le très haut contribuable','TMI 41 % ou 45 %, vous cherchez à réduire massivement votre impôt sur le revenu sur une ou deux années.'],['L’aménagement du patrimoine','Vous souhaitez posséder un bien d’exception, hors du commun, avec une forte valeur symbolique et patrimoniale.'],['Le passionné d’histoire','Vous désirez contribuer à la préservation du patrimoine historique tout en optimisant votre fiscalité.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 5 — Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>Notre approche Monuments Historiques</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des opérations classées','Nous identifions les biens classés ou inscrits éligibles, avec des porteurs de projets sérieux et des travaux certifiés.'],['Simulation fiscale précise','Nous calculons votre économie d’impôt sur 2 à 5 ans et vérifions la cohérence avec votre situation globale.'],['Accompagnement juridique et notarial','Nous coordonnons les intervenants pour sécuriser l’acquisition et la déduction fiscale dans les règles.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 6 — CTA */}
      <Sec bg="#111C33">
        <h2 style={h2Style()}>{'Parlons de votre stratégie.'}</h2>
        <p style={pStyle()}>{'Accédez aux opérations Monuments Historiques sélectionnées par VIVEO Patrimoine et optimisez votre fiscalité dès cette année.'}</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
