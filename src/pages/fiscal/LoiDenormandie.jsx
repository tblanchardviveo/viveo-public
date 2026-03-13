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
export default function LoiDenormandie() {
  return (<>
    <section style={{ background: N, padding: '120px 6vw 80px' }}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LOI DENORMANDIE</span></div>
      <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(48px,7vw,88px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>Renover en centre-ville &mdash;<br/><em style={{ fontStyle: 'italic', color: BL }}>et beneficier d'une reduction attractive.</em></h1>
      <p style={{ ...ps(), maxWidth: 580 }}>La Loi Denormandie combine investissement locatif dans l'ancien, travaux de renovation, et reduction d'impot de 12 a 21% selon la duree d'engagement.</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Link to="/investir" style={pill()}>Investir</Link>
        <Link to="/programmes" style={pill()}>Programmes</Link>
        <Link to="/calculateur" style={pill()}>Calculateur</Link>
      </div>
    </section>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LE MECANISME</span></div>
      <h2 style={h2()}>Comment fonctionne la Loi Denormandie</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 20, overflow: 'hidden', marginTop: 48 }}>
        {[['Reduction 12 a 21%','12% pour 6 ans d\'engagement, 18% pour 9 ans, 21% pour 12 ans. La reduction s\'applique sur le prix du bien et des travaux dans la limite de 300 000 EUR par an.'],['242 villes eligibles','Le programme Action Coeur de Ville cible 242 villes moyennes francaises. Des marches locatifs stables avec des prix d\'entree bien inferieurs aux grandes metropoles.'],['Travaux obligatoires 25%','Le montant des travaux doit representer au moins 25% du cout total de l\'operation. Ces travaux ameliorent les performances energetiques du logement.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px 32px' }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.18)', color: B, borderRadius: 20, padding: '6px 16px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR}>
      <div style={eye}><span style={{ ...eyeLine, background: B }}/><span style={eyeText}>POUR QUI ?</span></div>
      <h2 style={h2(N)}>Votre profil investisseur</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 1, marginTop: 48 }}>
        {[['L\'investisseur budget intermediaire','Vous souhaitez investir dans l\'immobilier locatif sans les prix des grandes metropoles.',['Budget 150-250k EUR','Villes moyennes accessibles','Travaux inclus dans le financement','Reduction jusqu\'a 21%']],['L\'investisseur engage','Vous souhaitez allier fiscalite avantageuse et contribution a la revitalisation des centres-villes francais.',['Gout pour la renovation','Impact positif sur les centres-villes','Marches locatifs stables','Engagement 6 a 12 ans']]].map(([t,d,steps],i) => <div key={i} style={{ background: '#fff', borderLeft: `3px solid ${B}`, padding: '32px 28px', borderRadius: 4 }}><span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.12)', color: B, borderRadius: 20, padding: '5px 14px', fontSize: 11, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: N, marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7, marginBottom: 20 }}>{d}</p>{steps.map((s,j) => <p key={j} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, color: '#444', marginBottom: 8 }}><span style={{ color: B, marginRight: 8, fontWeight: 600 }}>{j+1}.</span>{s}</p>)}</div>)}
      </div>
    </Sec>
    <Sec bg={N}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>LES ATOUTS</span></div>
      <h2 style={h2()}>Les avantages de la Loi Denormandie</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 48 }}>
        {[['Prix d\'entree moindre','Investissement dans l\'ancien en ville moyenne : tickets d\'entree 30 a 50% inferieurs aux metropoles'],['Reduction jusqu\'a 21%','12% sur 6 ans, 18% sur 9 ans, 21% sur 12 ans — appliquee sur le prix bien et travaux'],['Marches locatifs stables','Les 242 villes Action Coeur de Ville beneficient d\'une demande locative stable et reguliere'],['Valorisation centres-villes','Les travaux de renovation participent a la revalorisation du patrimoine urbain']].map(([t,d],i) => <div key={i} style={{ background: '#fff', borderRadius: 14, padding: '28px 24px', borderLeft: `3px solid ${B}` }}><span style={{ fontSize: 10, fontFamily: "'Raleway',sans-serif", fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: B, display: 'block', marginBottom: 10 }}>{t}</span><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, color: N, marginBottom: 10 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={NV}>
      <div style={eye}><span style={eyeLine}/><span style={eyeText}>L'ACCOMPAGNEMENT VIVEO</span></div>
      <h2 style={h2()}>Notre approche Loi Denormandie</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24, marginTop: 48 }}>
        {[['Selection programmes Denormandie','Nous identifions les meilleures opportunites parmi les 242 villes eligibles pour votre profil.'],['Optimisation fiscale','Nous calculons la duree d\'engagement optimale et la structuration travaux/bien pour maximiser la reduction.'],['Suivi complet','Nous accompagnons le suivi des travaux, la livraison et la mise en location jusqu\'a la fin de l\'engagement.']].map(([t,d],i) => <div key={i} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 16, padding: '36px 28px', border: '1px solid rgba(255,255,255,0.07)' }}><svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: 20 }}><circle cx="16" cy="16" r="15" stroke={B} strokeWidth="1.5"/><path d="M10 16l4 4 8-8" stroke={B} strokeWidth="1.5" strokeLinecap="round"/></svg><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 19, color: '#fff', marginBottom: 12 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{d}</p></div>)}
      </div>
    </Sec>
    <Sec bg={CR} center>
      <h2 style={{ ...h2(N), fontStyle: 'italic' }}>Un investissement utile <em style={{ color: B }}>et fiscalement optimise.</em></h2>
      <p style={{ ...ps('#555'), maxWidth: 480, margin: '16px auto 0' }}>Prenons le temps d'analyser votre situation et d'identifier les meilleures opportunites Denormandie.</p>
      <a href={`${WP}/rdv-decouverte/`} style={{ display: 'inline-block', background: `linear-gradient(135deg,${B},${BL})`, color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }}>Prendre RDV Decouverte</a>
    </Sec>
  </>)
}
