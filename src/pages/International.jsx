import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }
const h2Style = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, color: c || '#fff', letterSpacing: '-0.02em' })
const pStyle = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: 20 })
const cta = { display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }
const pill = { padding: '8px 20px', borderRadius: 20, fontSize: 12, fontFamily: "'Raleway',sans-serif", fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', textTransform: 'uppercase' }
const card = (bg) => ({ background: bg || 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 28, border: '1px solid rgba(255,255,255,0.06)' })
const heroOverlay = 'linear-gradient(160deg,rgba(17,28,51,0.15) 0%,rgba(17,28,51,0.55) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1.00) 100%)'

function Sec({ children, bg, style }) {
  const [ref, vis] = useReveal()
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease', ...style }}>{children}</section>
}

export default function International() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0498.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={eye}><span style={eyeLine} /><span style={eyeText}>INTERNATIONAL</span></div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{'Investir en France \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'depuis l\u2019\u00e9tranger.'}</em></h1>
          <p style={pStyle()}>{'Belgique, Luxembourg, Suisse, Royaume-Uni \u2014 nous accompagnons les non-r\u00e9sidents dans leurs projets immobiliers en France, du financement transfrontalier \u00e0 la fiscalit\u00e9 internationale.'}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <span style={pill}>Belgique</span>
            <span style={pill}>Luxembourg</span>
            <span style={pill}>Suisse</span>
            <span style={pill}>Royaume-Uni</span>
          </div>
        </div>
      </section>

      {/* Section 2 - Accompagnement */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>ACCOMPAGNEMENT</span></div>
        <h2 style={h2Style()}>{'Un parcours d\u00e9di\u00e9 \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'aux non-r\u00e9sidents.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Financement transfrontalier</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Acc\u00e8s aux banques fran\u00e7aises et partenaires sp\u00e9cialis\u00e9s non-r\u00e9sidents.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{'Fiscalit\u00e9 internationale'}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Conventions fiscales, imp\u00f4t sur le revenu foncier, plus-values \u2014 nous clarifions tout.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{'Gestion \u00e0 distance'}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Signature \u00e9lectronique, visioconf\u00e9rence, gestion locative d\u00e9l\u00e9gu\u00e9e.'}</p></div>
        </div>
      </Sec>

      {/* Section 3 - Zones */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>ZONES CIBLES</span></div>
        <h2 style={h2Style('#111C33')}>{'Des march\u00e9s s\u00e9lectionn\u00e9s \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'pour leur potentiel.'}</em></h2>
        <p style={pStyle('#555')}>{'C\u00f4te d\u2019Azur, M\u00e9diterran\u00e9e, Alpes, C\u00f4te d\u2019Opale \u2014 des zones \u00e0 forte attractivit\u00e9 touristique et patrimoniale, accessibles depuis la Belgique et le Royaume-Uni.'}</p>
        <div style={{ marginTop: 24 }}>
          {['\u00c0 2h de Bruxelles via le TGV','\u00c0 1h30 de Londres via l\u2019Eurotunnel','March\u00e9s \u00e0 forte demande locative','Valorisation patrimoniale long terme'].map((t,i) => <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>{'\u2713'} {t}</p>)}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {["C\u00f4te d'Azur","C\u00f4te d'Opale",'M\u00e9diterran\u00e9e','Alpes'].map((z,i) => <span key={i} style={{ padding: '10px 20px', borderRadius: 20, background: 'rgba(166,124,82,0.12)', color: '#A67C52', fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13 }}>{z}</span>)}
        </div>
      </Sec>

      {/* Section 4 - Avantages */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>VOS AVANTAGES</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 32 }}>
          {[['100% \u00e0 distance','Tout le parcours peut se faire en visio et signature \u00e9lectronique.'],['Interlocuteur unique','Un chef de projet d\u00e9di\u00e9 qui parle votre langue.'],['R\u00e9seau bancaire','Partenaires sp\u00e9cialis\u00e9s dans le financement des non-r\u00e9sidents.'],['Expertise fiscale','Ma\u00eetrise des conventions bilat\u00e9rales et de la fiscalit\u00e9 crois\u00e9e.']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>{'Parlons de votre projet international.'}</h2>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV D\u00e9couverte \u2192'}</a>
      </Sec>
    </>
  )
}
