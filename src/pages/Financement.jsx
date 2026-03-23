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

export default function Financement() {
  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0617.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={eye}><span style={eyeLine} /><span style={eyeText}>FINANCEMENT</span></div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{'Votre financement —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'sur mesure.'}</em></h1>
          <p style={pStyle()}>{'Nous coordonnons l’ensemble de votre montage financier : courtage, PTZ, prêt relais, financement transfrontalier. Un seul interlocuteur, zéro stress.'}</p>
        </div>
      </section>

      {/* Section 2 - Courtage */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>COURTAGE</span></div>
        <h2 style={h2Style()}>{'Négocier les meilleures conditions —'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'à votre place.'}</em></h2>
        <p style={pStyle()}>{'Grâce à nos partenaires bancaires, nous obtenons des taux et conditions optimisés pour chaque profil d’emprunteur.'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Taux optimaux</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Accès aux meilleures offres bancaires grâce à notre réseau de partenaires.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>Montage complet</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Constitution du dossier, négociation, assurance emprunteur, délégation.'}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{'Suivi jusqu’au déblocage'}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{'Coordination avec le notaire et le promoteur pour un déblocage fluide des fonds.'}</p></div>
        </div>
      </Sec>

      {/* Section 3 - Dispositifs */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>DISPOSITIFS</span></div>
        <div style={{ display: 'flex', gap: 60, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ flex: '1 1 40%', minWidth: 280 }}>
            <h2 style={h2Style('#111C33')}>{'Des solutions adaptées —'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{'à chaque situation.'}</em></h2>
            <p style={pStyle('#555')}>{'Premier achat, investissement locatif, résidence secondaire — chaque projet a son montage financier optimal.'}</p>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: 260 }}>
            {[['PTZ','Prêt à Taux Zéro pour les primo-accédants, sous conditions de ressources.'],['Prêt relais','Acquérir avant de vendre, avec un pont de financement sécurisé.'],['Crédit investisseur','Montage spécifique pour l’investissement locatif : différé, amortissement.'],['Financement transfrontalier','Solutions pour les résidents belges, luxembourgeois et suisses.']].map(([t,d],i) => <div key={i} style={{ display: 'flex', gap: 20, marginBottom: 28 }}><span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: '#A67C52', fontWeight: 300 }}>{'0'+(i+1)}</span><div><h3 style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 16, color: '#111C33', marginBottom: 4 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div></div>)}
          </div>
        </div>
      </Sec>

      {/* Section 4 - Pourquoi nous */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POURQUOI NOUS</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 32 }}>
          {[['Indépendance','Nous ne sommes liés à aucune banque. Notre conseil est 100% objectif.'],['Rapidité','Réponse de principe en 48h, offre ferme en 2 semaines.'],['Transparence','Aucun frais caché. Nos honoraires sont clairement présentés en amont.'],['Expertise','Spécialistes du neuf et du financement transfrontalier depuis 2018.']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>{'Simulons votre financement.'}</h2>
        <a href={'/rdv-decouverte'} style={cta}>{'Demander mon RDV Découverte →'}</a>
      </Sec>
    </>
  )
}
