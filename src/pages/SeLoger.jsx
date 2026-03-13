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

export default function SeLoger() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0481.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={eye}><span style={eyeLine} /><span style={eyeText}>SE LOGER</span></div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{'Votre chez-vous \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>sans les complications.</em></h1>
          <p style={pStyle()}>{'R\u00e9sidence principale ou secondaire, neuf ou en VEFA \u2014 VIVEO vous accompagne de la recherche du programme jusqu\u2019\u00e0 la remise des cl\u00e9s.'}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <span style={pill}>{'R\u00e9sidence Principale'}</span>
            <span style={pill}>{'R\u00e9sidence Secondaire'}</span>
            <Link to="/programmes" style={pill}>Nos Programmes</Link>
          </div>
        </div>
      </section>

      {/* Section 2 - Residence Principale */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'R\u00c9SIDENCE PRINCIPALE'}</span></div>
        <h2 style={h2Style()}>{'Acheter sa r\u00e9sidence principale \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'le projet d\u2019une vie.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Premier achat</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'PTZ, dispositifs primo-acc\u00e9dants, accompagnement financement.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Changement de vie</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Vente + achat simultan\u00e9, bridge loan, coordination notaires.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Construction neuve</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'VEFA, garanties, suivi chantier, appels de fonds, livraison.'}</p></div>
        </div>
        <Link to="/programmes" style={cta}>{'Voir les programmes \u2192'}</Link>
      </Sec>

      {/* Section 3 - Residence Secondaire */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'R\u00c9SIDENCE SECONDAIRE'}</span></div>
        <h2 style={h2Style('#111C33')}>{'Un pied-\u00e0-terre.'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>Un investissement.</em></h2>
        <p style={pStyle('#555')}>{'C\u00f4te d\u2019Opale, M\u00e9diterran\u00e9e, Alpes \u2014 VIVEO identifie les programmes qui allient plaisir d\u2019usage et valorisation patrimoniale. \u00c0 2h de Bruxelles, 1h30 de Londres via l\u2019Eurotunnel.'}</p>
        <div style={{ marginTop: 24 }}>
          {['Programmes dans les zones \u00e0 fort potentiel touristique', 'Dispositifs fiscaux adapt\u00e9s (LMNP, Nue-propri\u00e9t\u00e9)', 'Accompagnement financement et gestion locative'].map((t, i) => <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>{'\u2713'} {t}</p>)}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {["C\u00f4te d'Opale",'M\u00e9diterran\u00e9e','Alpes'].map((z, i) => <span key={i} style={{ padding: '10px 20px', borderRadius: 20, background: 'rgba(166,124,82,0.12)', color: '#A67C52', fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13 }}>{z}</span>)}
        </div>
      </Sec>

      {/* Section 4 - Pourquoi le neuf */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POURQUOI LE NEUF ?</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 32 }}>
          {[['Garanties','D\u00e9cennale + parfait ach\u00e8vement'],['Frais r\u00e9duits','Frais de notaire 2-3% vs 7-8%'],['Performance','RT2020, basse consommation'],['Personnalisation','Choix des mat\u00e9riaux avant construction']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>Parlons de votre projet.</h2>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV D\u00e9couverte \u2192'}</a>
      </Sec>
    </>
  )
}
