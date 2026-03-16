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

export default function NuePropriete() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: `linear-gradient(160deg,rgba(17,28,51,0.55) 0%,rgba(17,28,51,0.75) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1) 100%), url('${WP}/wp-content/uploads/2026/03/IMG_0650.png') center/cover no-repeat`, padding: '120px 6vw 80px' }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'NUE-PROPRIÉTÉ'}</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>
          {'Acquérir à prix réduit —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'récupérer la pleine propriété.'}</em>
        </h1>
        <p style={pStyle()}>{'Nue-propriété — achetez 30 à 40 % moins cher, sans gestion locative, sans fiscalité foncière. La pleine propriété vous revient automatiquement à terme du démembrement.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir" style={pill}>Investir</Link>
          <Link to="/programmes" style={pill}>Programmes</Link>
          <Link to="/calculateur" style={pill}>Simuler</Link>
        </div>
      </section>

      {/* Section 2 — Mécanisme */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LE MÉCANISME</span></div>
        <h2 style={h2Style()}>Comment fonctionne la Nue-propriété</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Démembrement de propriété','Vous achetez la nue-propriété (60–70 % de la valeur). L’usufruitier occupe ou loue le bien pendant 15 à 20 ans.'],['Zéro charge et gestion','Pendant toute la durée, vous ne gérez rien, ne payez aucune charge, aucune taxe foncière, aucun impôt sur les revenus.'],['Récupération automatique','Au terme du démembrement, vous devenez plein propriétaire sans frais ni démarche supplémentaire.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 3 — Avantages */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={{ ...eyeLine, background: '#A67C52' }} /><span style={eyeText}>LES AVANTAGES</span></div>
        <h2 style={h2Style('#111C33')}>{'Décote de 30 à 40 % à l’achat'}</h2>
        <p style={pStyle('#555')}>{'Zéro gestion, zéro charges, zéro fiscalité foncière — un investissement patrimonial long terme idéal pour préparer sa retraite.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Décote significative','Achat à 60–70 % de la valeur vénale, créant une plus-value latente immédiate.'],['Hors IFI pendant le démembrement','La nue-propriété n’intègre pas l’assiette de l’Impôt sur la Fortune Immobilière.'],['Transmission optimisée','Donation de la nue-propriété avec une valorisation réduite pour les droits de succession.'],['Retraite tranquille','À terme, un bien libre de toute charge et fiscalité pour compléter ses revenus.']].map(([t,d],i) => (
            <div key={i} style={{ ...card('#fff'), border: '1px solid #E8E0D5' }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#111C33', marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#666', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 4 — Durées */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LES DURÉES</span></div>
        <h2 style={h2Style()}>Choisissez votre horizon</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 24, marginTop: 48 }}>
          {[['15 ans','Décote d’environ 35 %. Idéal pour un investisseur proche de la retraite souhaitant récupérer le bien à moyen terme.'],['20 ans','Décote d’environ 40 %. Pour les investisseurs à long terme, maximisant la décote et la valorisation finale.'],['Donation','Transmission de la nue-propriété à ses enfants avec une valorisation réduite pour les droits de succession.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#C4976A', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 5 — Accompagnement VIVEO */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VIVEO PATRIMOINE</span></div>
        <h2 style={h2Style()}>Notre approche Nue-propriété</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {[['Sélection des opérations','Nous identifions les programmes en démembrement offrant les meilleures décotes et les usufruitiers les plus sérieux.'],['Audit patrimonial','Nous vérifions que la nue-propriété s’intègre parfaitement dans votre stratégie globale de patrimoine.'],['Suivi jusqu’au terme','Nous assurons un suivi régulier et vous accompagnons lors de la récupération de la pleine propriété.']].map(([t,d],i) => (
            <div key={i} style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>
          ))}
        </div>
      </Sec>

      {/* Section 6 — CTA */}
      <Sec bg="#111C33">
        <h2 style={h2Style()}>{'Parlons de votre stratégie.'}</h2>
        <p style={pStyle()}>{'Découvrons ensemble les opérations en démembrement adaptées à votre horizon et votre profil patrimonial.'}</p>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>Demander mon RDV Découverte &rarr;</a>
      </Sec>
    </>
  )
}
