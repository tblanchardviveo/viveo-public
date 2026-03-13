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
export default function NuePropriete() {
  return (<>
    <section style={{ background: N, padding: '120px 6vw 80px' }}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>NUE-PROPRIETE</span></div>
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>Acquerir a prix reduit &mdash;<br/><em style={{ fontStyle: 'italic', color: BL }}>et recuperer plein proprietaire a terme.</em></h1>
      <p style={{ ...ps(), maxWidth: 580 }}>La Nue-propriete permet d'acquerir un bien a 60-70% de sa valeur, sans gestion locative, hors IFI, avec recuperation de la pleine propriete a l'issue de l'usufruit.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Link to="/investir" style={pill()}>Investir</Link>
        <Link to="/programmes" style={pill()}>Programmes</Link>
        <Link to="/calculateur" style={pill()}>Calculateur</Link>
      </div>
    </section>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LE MECANISME</span></div>
      <h2 style={h2()}>Comment fonctionne la Nue-propriete</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden', marginTop: 48 }}>
        {[['Demembrement de propriete','Vous achetez la nue-propriete du bien (60-70% de la valeur). L\'usufruit est cede temporairement a un bailleur social ou institutionnel pour 15 a 20 ans.'],['Recuperation pleine propriete','A l\'issue de la periode, vous recuperez automatiquement la pleine propriete sans frais supplementaires. Le bien a ete entretenu par l\'usufruitier.'],['Avantages fiscaux immediats','Pendant toute la periode : aucun revenu locatif imposable, bien exclu de l\'IFI, pas de gestion locative, pas de taxe fonciere a votre charge.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px 32px' }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.18)', color: B, borderRadius: 20, padding: '6px 16px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR}>
      <div style={eye}><span style={{ ...eyeLine, background: B }}/><span style={eyeText}>POUR QUI ?</span></div>
      <h2 style={h2(N)}>Votre profil investisseur</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 1, marginTop: 48 }}>
        {[['L\'investisseur patient','Vous n\'avez pas besoin de revenus immediats et preparez votre retraite ou votre transmission.',['Horizon 15-20 ans','Pas de besoin de cash-flow immediat','Preparation retraite ou succession','Gestion zero pendant la periode']],['Le contribuable soumis a l\'IFI','Vous cherchez a investir dans l\'immobilier sans alourdir votre base IFI.',['Patrimoine immobilier existant important','Reduction de la base IFI','Investissement long terme','Transmission facilitee a terme']]].map(([t,d,steps],i) => <div key={i} style={{ background: '#fff', borderLeft: `3px solid ${B}`, padding: '32px 28px', borderRadius: 4 }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.12)', color: B, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: N, marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{d}</p>{steps.map((s,j) => <p key={j} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, color: '#444', marginBottom: 8 }}><span style={{ color: B, marginRight: 8, fontWeight: 600 }}>{j+1}.</span>{s}</p>)}</div>)}
      </div>
    </Sec>
    <Sec bg={N}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LES ATOUTS</span></div>
      <h2 style={h2()}>Les avantages de la Nue-propriete</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
        {[['Decote a l\'achat','Acquerir a 60-70% de la valeur reelle du bien, une decote immediate et certaine'],['Hors IFI','Le bien en nue-propriete n\'entre pas dans le calcul de l\'IFI pendant toute la periode'],['Zero gestion locative','Aucune contrainte de gestion, l\'usufruitier gere integralement le bien'],['Transmission facilitee','La nue-propriete se transmet avec une base taxable reduite, optimisant la succession']].map(([t,d],i) => <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', borderLeft: `3px solid ${B}` }}><span style={{ fontSize: 10, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: B, display: 'block', marginBottom: 10 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: N, marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>L'ACCOMPAGNEMENT VIVEO</span></div>
      <h2 style={h2()}>Notre approche Nue-propriete</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, marginTop: 48 }}>
        {[['Selection programmes','Nous identifions les programmes en demembrement les mieux adaptes a votre horizon et votre fiscalite.'],['Optimisation fiscale','Nous analysons l\'impact IFI et successoral pour maximiser le benefice du demembrement.'],['Suivi complet','Nous assurons le suivi jusqu\'a la reunion de l\'usufruit et la pleine propriete.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '36px 28px', border: '1px solid rgba(255,255,255,0.07)' }}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 20 }}><circle cx="16" cy="16" r="15" stroke={B} strokeWidth="1.5"/><path d="M10 16l4 4 8-8" stroke={B} strokeWidth="1.5" strokeLinecap="round"/></svg><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR} center>
      <h2 style={{ ...h2(N), fontStyle: 'italic' }}>Un patrimoine qui se construit <em style={{ color: B }}>sans les contraintes.</em></h2>
      <p style={{ ...ps('#555'), maxWidth: 480, margin: '16px auto 0' }}>Prenons le temps d'analyser votre situation et de structurer votre investissement en nue-propriete.</p>
      <a href={`${WP}/rdv-decouverte/`} style={{ display: 'inline-block', background: `linear-gradient(135deg,${B},${BL})`, color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }}>Prendre RDV Decouverte &rarr;</a>
    </Sec>
  </>)
}
