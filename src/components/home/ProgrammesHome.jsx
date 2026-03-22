import { Link } from 'react-router-dom'
import { useReveal } from '../../hooks/useReveal'

const Card = ({ ville, nom, dispo, prix, slug, style: cs }) => (
  <div style={{
    background: '#fff', borderRadius: 4, overflow: 'hidden',
    boxShadow: '0 20px 60px rgba(26,39,68,0.12)',
    width: '100%', maxWidth: 420, ...cs
  }}>
    <div style={{
      height: 220, background: 'linear-gradient(135deg, #111C33, #1A2744)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 24, color: 'rgba(255,255,255,0.20)' }}>{nom}</span>
    </div>
    <div style={{ padding: 28 }}>
      <div style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A67C52' }}>{ville}</div>
      <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#111C33', marginTop: 8 }}>{nom}</div>
      <span style={{ display: 'inline-block', background: 'rgba(166,124,82,0.12)', color: '#A67C52', fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, padding: '4px 12px', borderRadius: 10, marginTop: 12 }}>{dispo}</span>
      <div style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 600, fontSize: 16, color: '#A67C52', marginTop: 16 }}>{prix}</div>
      <Link to={`/programme/${slug}`} style={{ display: 'inline-block', marginTop: 12, fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 13, color: '#1A2744', textDecoration: 'none', transition: 'color 0.2s' }}>{"Découvrir →"}</Link>
    </div>
  </div>
)

export default function ProgrammesHome() {
  const [ref, visible] = useReveal()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  return (
    <section ref={ref} data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: isMobile ? '10vh 6vw' : '15vh 6vw' }}>
      <div style={{ ...s, display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 60, alignItems: 'flex-start' }}>
        <div style={{ flex: '0 0 40%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
            <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
            <span style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.25em', color: '#A67C52' }}>{"PROGRAMMES SÉLECTIONNÉS"}</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#111C33', lineHeight: 1.1, marginTop: 32 }}>
            {"Une sélection,"}<br />
            <em style={{ fontStyle: 'italic', color: '#A67C52' }}>pas un catalogue.</em>
          </h2>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 16, color: '#555', lineHeight: 1.8, marginTop: 24, maxWidth: 400 }}>
            {"Nous ne référençons pas tous les programmes du marché. Nous sélectionnons ceux qui méritent votre attention — et nous vous expliquons pourquoi."}
          </p>
          <Link to="/programmes" style={{ display: 'inline-block', marginTop: 32, fontFamily: "'Raleway', sans-serif", fontWeight: 500, fontSize: 14, color: '#A67C52', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'border-color 0.2s' }}>
            {"Voir tous les programmes →"}
          </Link>
        </div>
        <div style={{ flex: '0 0 60%', position: 'relative', minHeight: isMobile ? 'auto' : 520 }}>
          <Card ville="ROUBAIX" nom="L'Angora" dispo="LMNP" prix={"À partir de 168 900 €"} slug="l-angora"
            style={isMobile ? {} : { position: 'relative', zIndex: 2 }} />
          <Card ville="DUNKERQUE" nom="Les Balcons des Gables" dispo="LMNP" prix={"À partir de 145 000 €"} slug="les-balcons-des-gables"
            style={isMobile ? { marginTop: -20, marginLeft: 20 } : { position: 'absolute', top: 40, left: 40, zIndex: 1 }} />
        </div>
      </div>
    </section>
  )
}
