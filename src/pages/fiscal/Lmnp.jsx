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

export default function Lmnp() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg,rgba(17,28,51,0.55) 0%,rgba(17,28,51,0.75) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1) 100%), url(${WP}/wp-content/uploads/2026/03/IMG_0657.png) center/cover`, padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LMNP</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Investir en meublé —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'sans payer d’impôts.'}</em>
        </h1>
        <p style={pStyle()}>{'LMNP, Loueur Meublé Non Professionnel — amortissez votre bien et votre mobilier pour rendre vos revenus locatifs quasi non fiscalisés pendant 20 à 30 ans.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Simuler</Link>
        </div>
      </section>

      {/* Section 2 — Mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>Comment fonctionne le LMNP</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Amortissement comptable','Le bien et le mobilier sont amortis sur leur durée de vie, créant une charge déductible qui efface la quasi-totalité des loyers imposables.'],['Statut non professionnel','Applicable tant que vos recettes locatives ne dépassent pas 23 000 €/an ou 50 % de vos revenus. Zéro contrainte de gestion.'],['Récupération de TVA','En VEFA avec résidence services, vous récupérez la TVA (20 %) sur le prix d’achat, réduisant votre coût d’acquisition.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 3 — Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={{ ...eyeLine, background: '#A67C52' }} /><span style={eyeText}>LES AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>Pourquoi choisir le LMNP</h2>
        <p style={pStyle('#555')}>{'Le seul dispositif permettant d’amortir simultanément le bien immobilier ET le mobilier, générant une économie fiscale immédiate et durable.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Revenus quasi nets d’impôt','Pendant 20 à 30 ans, vos loyers échappent à l’imposition grâce à l’amortissement.'],['Régime BIC avantageux','Choisissez entre micro-BIC (abattement 50 %) ou régime réel selon votre situation.'],['Flexibilité locative','Pas de plafond de loyer, pas de plafond de ressources locataires.'],['Valorisation patrimoniale','L’amortissement neutralise la fiscalité sans réduire la valeur du bien à la revente.']].map(([t,d],i) => (
            <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#111C33', marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#666', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 4 — Profils */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POUR QUI ?</span></div>
        <h2 style={h2Style()}>Votre profil investisseur</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['Le primo-investisseur','Budget 150–300 k€, financement crédit, résidence services ou meublé classique, gestion déléguée.'],['Le cadre fiscalisé','TMI 30 % ou 41 %, revenus locatifs existants, bascule au régime réel, économie fiscale dès la 1ère année.'],['L’investisseur aguerri','Plusieurs biens, optimisation globale du patrimoine, stratégie d’amortissement sur 25 ans.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 5 — Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>Notre approche LMNP</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des programmes','Nous identifions les résidences services et meublés les mieux adaptés à votre profil et budget.'],['Optimisation fiscale','Nous analysons votre TMI pour arbitrer entre micro-BIC et régime réel, et maximiser l’amortissement.'],['Suivi jusqu’à la livraison','Accompagnement complet de la réservation à la remise des clés et mise en location effective.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 6 — CTA */}
      <Sec bg="#111C33">
        <h2 style={h2Style()}>{'Vos premiers loyers défiscalisés —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'dès cette année.'}</em></h2>
        <p style={pStyle()}>Prenons le temps d’analyser votre situation et de structurer votre investissement LMNP optimisé.</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
