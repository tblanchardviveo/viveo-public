import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'
const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const N = '#111C33', B = '#A67C52', BL = '#C4976A', CR = '#F7F5F1', NV = '#1A2744'
const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: B }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: B }
const h2 = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,4vw,52px)', fontWeight: 400, lineHeight: 1.1, color: c || '#fff', letterSpacing: '-0.02em' })
const ps = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', marginTop: 16 })
const pill = () => ({ padding: '9px 22px', borderRadius: 20, fontSize: 12, fontFamily: "'Raleway',sans-serif", fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', textDecoration: 'none' })
function Sec({ children, bg, center }) {
  const [ref, vis] = useReveal()
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease,transform 0.8s ease', textAlign: center ? 'center' : 'left' }}>{children}</section>
}
export default function LoiMalraux() {
  return (<>
    <section style={{ background: N, padding: '120px 6vw 80px' }}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LOI MALRAUX</span></div>
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>Investir dans les quartiers historiques &mdash;<br/><em style={{ fontStyle: 'italic', color: BL }}>jusqu'a 30% de reduction d'impot.</em></h1>
      <p style={{ ...ps(), maxWidth: 580 }}>La Loi Malraux offre une reduction d'impot directe de 22 a 30% sur les travaux de restauration, dans les secteurs sauvegardes.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Link to="/investir" style={pill()}>Investir</Link>
        <Link to="/programmes" style={pill()}>Programmes</Link>
        <Link to="/calculateur" style={pill()}>Calculateur</Link>
      </div>
    </section>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LE MECANISME</span></div>
      <h2 style={h2()}>Comment fonctionne la Loi Malraux</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden', marginTop: 48 }}>
        {[['Reduction directe sur l\'impot','22% en Zone de Protection du Patrimoine Architectural, 30% en Secteur Sauvegarde. La reduction s\'applique directement sur l\'impot du, pas sur le revenu imposable.'],['Plafond 400 000 EUR sur 4 ans','Les travaux eligibles sont plafonnes a 400 000 EUR sur 4 annees consecutives, soit une reduction maximale de 120 000 EUR (30%).'],['Hors plafonnement global','La reduction Malraux n\'entre pas dans le calcul du plafond global des niches fiscales de 10 000 EUR. Elle s\'ajoute a vos autres avantages fiscaux existants.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px 32px' }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.18)', color: B, borderRadius: 20, padding: '6px 16px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR}>
      <div style={eye}><span style={{ ...eyeLine, background: B }}/><span style={eyeText}>POUR QUI ?</span></div>
      <h2 style={h2(N)}>Votre profil investisseur</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 1, marginTop: 48 }}>
        {[['L\'investisseur fortement fiscalise','Vous payez plus de 30 000 EUR d\'impot annuel et cherchez une reduction directe et immediate.',['Impot annuel superieur a 30k EUR','TMI 41% ou 45%','Reduction jusqu\'a 120 000 EUR sur 4 ans','Hors plafonnement global niches']],['L\'amoureux des centres historiques','Vous souhaitez investir dans des biens d\'exception situes au coeur des villes historiques.',['Gout pour l\'architecture ancienne','Biens en secteur sauvegarde','Valorisation centre-ville forte','Engagement locatif 9 ans minimum']]].map(([t,d,steps],i) => <div key={i} style={{ background: '#fff', borderLeft: `3px solid ${B}`, padding: '32px 28px', borderRadius: 4 }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.12)', color: B, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: N, marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{d}</p>{steps.map((s,j) => <p key={j} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, color: '#444', marginBottom: 8 }}><span style={{ color: B, marginRight: 8, fontWeight: 600 }}>{j+1}.</span>{s}</p>)}</div>)}
      </div>
    </Sec>
    <Sec bg={N}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LES ATOUTS</span></div>
      <h2 style={h2()}>Les avantages de la Loi Malraux</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
        {[['Reduction directe','Reduction d\'impot directe, pas simple deduction : 1 EUR investi = 30 cents d\'impot en moins'],['Hors plafonnement global','Ne s\'impute pas sur les 10 000 EUR de plafond, s\'additionne a tous vos avantages existants'],['Report possible sur 3 ans','Si la reduction depasse l\'impot de l\'annee, le surplus est reportable sur les 3 annees suivantes'],['Secteurs valorises','Investissement dans des centres historiques a fort potentiel de valorisation patrimoniale']].map(([t,d],i) => <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', borderLeft: `3px solid ${B}` }}><span style={{ fontSize: 10, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: B, display: 'block', marginBottom: 10 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: N, marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>L'ACCOMPAGNEMENT VIVEO</span></div>
      <h2 style={h2()}>Notre approche Loi Malraux</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, marginTop: 48 }}>
        {[['Selection programmes Malraux','Nous identifions les operations en secteur sauvegarde les mieux positionnees pour votre capacite fiscale.'],['Optimisation fiscale','Nous calculons le taux de reduction applicable et structurons les annees de travaux pour maximiser l\'impact.'],['Suivi complet','Nous accompagnons le chantier, le suivi ABF et la mise en location jusqu\'a la livraison.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '36px 28px', border: '1px solid rgba(255,255,255,0.07)' }}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 20 }}><circle cx="16" cy="16" r="15" stroke={B} strokeWidth="1.5"/><path d="M10 16l4 4 8-8" stroke={B} strokeWidth="1.5" strokeLinecap="round"/></svg><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR} center>
      <h2 style={{ ...h2(N), fontStyle: 'italic' }}>Une reduction d'impot puissante <em style={{ color: B }}>dans un cadre d'exception.</em></h2>
      <p style={{ ...ps('#555'), maxWidth: 480, margin: '16px auto 0' }}>Prenons le temps d'analyser votre situation et de structurer votre investissement Malraux.</p>
      <a href={`${WP}/rdv-decouverte/`} style={{ display: 'inline-block', background: `linear-gradient(135deg,${B},${BL})`, color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }}>Prendre RDV Decouverte</a>
    </Sec>
  </>)
}
