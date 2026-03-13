import { Link } from 'react-router-dom'
import NewsletterWidget from '../components/NewsletterWidget'
import AvisClient from '../components/AvisClient'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

function HeroHome() {
  return (
    <section style={{
      position: 'relative',
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(166,124,82,0.08) 0%, transparent 60%)'
    }}>
      <div style={{ maxWidth: 700 }}>
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: 400,
          color: '#fff',
          lineHeight: 1.2,
          marginBottom: 20
        }}>
          {"L'immobilier,"}
          <br />
          <span style={{ color: 'var(--bronze)' }}>{"l'esprit libre."}</span>
        </h1>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 16,
          color: 'rgba(255,255,255,0.55)',
          lineHeight: 1.7,
          maxWidth: 520,
          margin: '0 auto 36px'
        }}>
          {"Trouvez votre r\u00e9sidence principale ou investissez dans l'immobilier neuf avec un accompagnement sur-mesure."}
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/programmes" style={{
            background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
            color: '#fff',
            borderRadius: 50,
            padding: '14px 32px',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: "'Raleway', sans-serif",
            textDecoration: 'none',
            transition: 'all 0.3s'
          }}>
            {"Voir les programmes"}
          </Link>
          <Link to="/calculateur" style={{
            background: 'transparent',
            color: 'var(--bronze)',
            border: '1px solid var(--bronze)',
            borderRadius: 50,
            padding: '14px 32px',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: "'Raleway', sans-serif",
            textDecoration: 'none',
            transition: 'all 0.3s'
          }}>
            {"Simuler mon projet"}
          </Link>
        </div>
      </div>
    </section>
  )
}

function ServicesSection() {
  const services = [
    {
      icon: "\ud83c\udfe0",
      titre: "R\u00e9sidence principale",
      desc: "Trouvez le bien id\u00e9al parmi nos programmes neufs s\u00e9lectionn\u00e9s."
    },
    {
      icon: "\ud83d\udcc8",
      titre: "Investissement locatif",
      desc: "Optimisez votre fiscalit\u00e9 avec nos solutions Pinel, LMNP, D\u00e9ficit Foncier."
    },
    {
      icon: "\ud83e\udd1d",
      titre: "Accompagnement",
      desc: "Un conseiller d\u00e9di\u00e9 vous guide de la recherche \u00e0 la livraison."
    }
  ]

  return (
    <section style={{
      maxWidth: 1000,
      margin: '0 auto',
      padding: '60px 20px'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 24
      }}>
        {services.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 16,
            padding: 32,
            textAlign: 'center',
            transition: 'transform 0.2s'
          }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
            <h3 style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 8
            }}>{s.titre}</h3>
            <p style={{
              fontFamily: "'Raleway', sans-serif",
              fontSize: 13,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.6
            }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section style={{
      maxWidth: 700,
      margin: '0 auto',
      padding: '60px 20px',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 28,
        color: '#fff',
        fontWeight: 400,
        marginBottom: 16
      }}>
        {"Pr\u00eat \u00e0 d\u00e9marrer votre projet\u00a0?"}
      </h2>
      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 28,
        lineHeight: 1.7
      }}>
        {"R\u00e9servez un appel d\u00e9couverte gratuit avec l'un de nos conseillers patrimoniaux."}
      </p>
      <a
        href={`${WP}/rdv-decouverte/`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
          color: '#fff',
          borderRadius: 50,
          padding: '14px 36px',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontFamily: "'Raleway', sans-serif",
          textDecoration: 'none',
          transition: 'all 0.3s'
        }}
      >
        {"Prendre rendez-vous \u2192"}
      </a>
    </section>
  )
}

export default function HomePage() {
  return (
    <div>
      <HeroHome />
      <ServicesSection />
      <AvisClient />
      <CTASection />
      <NewsletterWidget />
    </div>
  )
}
