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

export default function DeficitFoncier() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: '#111C33', padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'DÉFICIT FONCIER'}</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Réduire ses impôts —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'par la rénovation.'}</em>
        </h1>
        <p style={pStyle()}>{'Déficit Foncier — déduisez vos travaux de rénovation de votre revenu global et réduisez immédiatement votre imposition jusqu’à 10 700 €/an.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Simuler</Link>
        </div>
      </section>

      {/* Section 2 — Mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>Comment fonctionne le Déficit Foncier</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Travaux déductibles','Les charges et travaux dépassant les revenus fonciers créent un déficit imputable sur le revenu global dans la limite de 10 700 €/an.'],['Report sur 10 ans','Le déficit excédentaire est reportable pendant 10 ans sur les revenus fonciers futurs.'],['Double levier fiscal','Valorisation du bien + avantage fiscal immédiat dès la première année de travaux.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 3 — Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={{ ...eyeLine, background: '#A67C52' }} /><span style={eyeText}>LES AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>Pourquoi choisir le Déficit Foncier</h2>
        <p style={pStyle('#555')}>{'Un dispositif idéal pour les propriétaires de biens anciens souhaitant réhabiliter et optimiser fiscalement leur patrimoine.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Réduction immédiate','Impact fiscal dès l’année des travaux, sans attendre la revente du bien.'],['Sans plafonnement des niches','Le Déficit Foncier n’entre pas dans le plafond global des niches fiscales (10 000 €).'],['Patrimoine ancien valorisé','Réhabilitation de biens de caractère en centre-ville, alliant piètre et performance.'],['Transmission facilitée','Un bien rénové et optimisé fiscalement constitue un actif patrimonial solide.']].map(([t,d],i) => (
            <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#111C33', marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#666', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 4 — Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>Votre profil investisseur</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['Le contribuable fortement imposé','TMI 30 % ou 41 %, vous souhaitez réduire votre impôt sur le revenu tout en constituant un patrimoine immobilier.'],['Le propriétaire bailleur','Vous possédez déjà des biens locatifs et cherchez à imputer vos défenses de travaux sur vos loyers.'],['L’amateur de patrimoine ancien','Vous appréciez les biens de caractère en centre-ville et souhaitez les réhabiliter intelligemment.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 5 — Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>Notre approche Déficit Foncier</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection de biens à rénover','Nous identifions les opérations éligibles au déficit foncier, en centre-ville, avec fort potentiel de valorisation.'],['Audit fiscal personnalisé','Nous calculons précisément votre économie d’impôt et la durée de report du déficit selon votre situation.'],['Pilotage des travaux','Nous coordonnons l’ensemble du chantier avec des artisans qualifiés et vous livrons un bien clés en main.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 6 — CTA */}
      <Sec bg="#111C33">
        <h2 style={h2Style()}>{'Réduire ses impôts —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'dès cette année.'}</em></h2>
        <p style={pStyle()}>Parlons de votre stratégie Déficit Foncier et identifions ensemble le bien idéal pour votre profil.</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
