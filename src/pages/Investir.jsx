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

export default function Investir() {
  return (
    <>
      {/* Hero */}
            <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0602.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
                      <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
                      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>INVESTIR</span></div>
        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{'Construire un patrimoine \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'intelligemment.'}</em></h1>
        <p style={pStyle()}>{'LMNP, Nue-propri\u00e9t\u00e9, D\u00e9ficit foncier \u2014 nous structurons chaque investissement pour maximiser rendement et avantage fiscal, en toute s\u00e9r\u00e9nit\u00e9.'}</p>
        <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
          <Link to="/investir/lmnp" style={pill}>LMNP</Link>
          <Link to="/investir/nue-propriete" style={pill}>{'Nue-propri\u00e9t\u00e9'}</Link>
          <Link to="/investir/deficit-foncier" style={pill}>{'D\u00e9ficit foncier'}</Link>
        </div>
              </div>
                      </section>

      {/* Section 2 - LMNP */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>LMNP</span></div>
        <h2 style={h2Style()}>{'Loueur Meubl\u00e9 Non Professionnel \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'des revenus optimis\u00e9s.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Amortissement comptable</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'R\u00e9duction de la base imposable gr\u00e2ce \u00e0 l\u2019amortissement du bien et du mobilier.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{'R\u00e9gime BIC'}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Fiscalit\u00e9 avantageuse au r\u00e9el ou micro-BIC selon votre situation.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Gestion locative</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Nous s\u00e9lectionnons des gestionnaires de confiance pour un revenu passif.'}</p></div>
        </div>
      </Sec>

      {/* Section 3 - Nue-propriete */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'NUE-PROPRI\u00c9T\u00c9'}</span></div>
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 40%', minWidth: 280 }}>
            <h2 style={h2Style('#111C33')}>{'Acqu\u00e9rir \u00e0 prix r\u00e9duit \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'r\u00e9cup\u00e9rer la pleine propri\u00e9t\u00e9.'}</em></h2>
            <p style={pStyle('#555')}>{'D\u00e9cote de 30 \u00e0 40% \u00e0 l\u2019achat, aucune gestion locative, aucune fiscalit\u00e9 sur les revenus fonciers pendant la dur\u00e9e du d\u00e9membrement. Un investissement patrimonial long terme.'}</p>
            <div style={{ marginTop: 24 }}>
              {['D\u00e9cote significative sur le prix d\u2019achat', 'Z\u00e9ro gestion, z\u00e9ro charges, z\u00e9ro fiscalit\u00e9 fonci\u00e8re', 'R\u00e9cup\u00e9ration automatique de la pleine propri\u00e9t\u00e9'].map((t, i) => <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>{'\u2713'} {t}</p>)}
            </div>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: 260, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['15 ans', '20 ans'].map((z, i) => <span key={i} style={{ padding: '14px 28px', borderRadius: 24, background: 'rgba(166,124,82,0.12)', color: '#A67C52', fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13, letterSpacing: '0.06em' }}>{z}</span>)}
          </div>
        </div>
      </Sec>

      {/* Section 4 - Deficit foncier */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'D\u00c9FICIT FONCIER'}</span></div>
        <h2 style={h2Style()}>{'R\u00e9duire ses imp\u00f4ts \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'par la r\u00e9novation.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 32 }}>
          {[
            ['Travaux d\u00e9ductibles', 'Imp\u00fbtation sur le revenu global jusqu\u2019\u00e0 10 700\u00a0\u20ac/an'],
            ['Patrimoine ancien', 'R\u00e9habilitation de biens de caract\u00e8re en centre-ville'],
            ['Double levier', 'Valorisation du bien + avantage fiscal imm\u00e9diat'],
            ['Report possible', 'D\u00e9ficit reportable sur 10 ans sur les revenus fonciers']
          ].map(([t, d], i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>{'Parlons de votre strat\u00e9gie.'}</h2>
        <div style={{ marginTop: 8 }}>
          <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV D\u00e9couverte \u2192'}</a>
        </div>
      </Sec>
    </>
  )
}
