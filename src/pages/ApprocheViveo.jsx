import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }
const h2Style = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, color: c || '#fff', letterSpacing: '-0.02em' })
const pStyle = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: 20 })
const cta = { display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }
const card = (bg) => ({ background: bg || 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 28, border: '1px solid rgba(255,255,255,0.06)' })
const heroOverlay = 'linear-gradient(160deg,rgba(17,28,51,0.15) 0%,rgba(17,28,51,0.55) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1.00) 100%)'

function Sec({ children, bg, style }) {
  const [ref, vis] = useReveal()
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease', ...style }}>{children}</section>
}

export default function ApprocheViveo() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0603.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={eye}><span style={eyeLine} /><span style={eyeText}>NOTRE APPROCHE</span></div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{'L’immobilier —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'autrement.'}</em></h1>
          <p style={pStyle()}>{'Nous ne vendons pas de biens. Nous structurons des projets immobiliers sur mesure, du conseil initial à la livraison, avec une exigence de transparence totale.'}</p>
        </div>
      </section>

      {/* Section 2 - Qui sommes-nous */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>QUI SOMMES-NOUS</span></div>
        <h2 style={h2Style()}>{'Une équipe dédiée —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'\u00e0 vos côtés.'}</em></h2>
        <p style={pStyle()}>{'VIVEO Patrimoine réunit des experts en immobilier neuf, financement et fiscalité. Chaque projet est piloté par un interlocuteur unique qui coordonne l’ensemble des parties prenantes.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Conseil personnalisé</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Analyse de votre situation, objectifs et capacité d’investissement avant toute proposition.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{'Sélection rigoureuse'}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Nous auditons chaque promoteur et chaque programme avant de le proposer à nos clients.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Suivi complet</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'De la réservation à la livraison, nous restons votre point de contact unique.'}</p></div>
        </div>
      </Sec>

      {/* Section 3 - Methodologie */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'MÉTHODOLOGIE'}</span></div>
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 40%', minWidth: 280 }}>
            <h2 style={h2Style('#111C33')}>{'Un processus éprouvé —'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'en 4 étapes.'}</em></h2>
            <p style={pStyle('#555')}>{'Chaque projet suit un parcours structuré pour garantir la meilleure expérience et le meilleur résultat.'}</p>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: 260 }}>
            {[['01','Découverte','RDV approfondi pour comprendre vos objectifs, votre fiscalité et votre horizon.'],['02','Recommandation','Présentation de programmes sélectionnés et simulation financière détaillée.'],['03','Accompagnement','Réservation, financement, notaire — nous coordonnons chaque étape.'],['04','Livraison & suivi','Vérification du bien, mise en gestion, suivi fiscal annuel.']].map(([n,t,d],i) => <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28 }}><span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: '#A67C52', fontWeight: 300 }}>{n}</span><div><h3 style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 16, color: '#111C33', marginBottom: 4 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div></div>)}
          </div>
        </div>
      </Sec>

      {/* Section 4 - Nos valeurs */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>NOS VALEURS</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 32 }}>
          {[['Transparence','Aucun frais caché, aucune commission opaque. Vous savez exactement ce que vous payez.'],['Indépendance','Nous ne sommes liés à aucun promoteur. Notre conseil est objectif.'],['Excellence','Chaque détail compte. De la sélection du bien au suivi post-livraison.'],['Engagement','Un interlocuteur unique, disponible, qui s’investit dans votre réussite.']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>{'Rencontrons-nous.'}</h2>
        <div style={{ marginTop: 8 }}>
          <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV Découverte →'}</a>
        </div>
      </Sec>
    </>
  )
}
