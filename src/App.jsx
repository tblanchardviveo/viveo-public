import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Programmes from './pages/Programmes'
import FicheProgramme from './pages/FicheProgramme'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

function Header() {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--navy-deep)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      height: 72
    }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 32px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        height: '100%'
      }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 0, textDecoration: 'none' }}>
          <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#fff', fontWeight: 400 }}>VIVEO</span>
          <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 18 }}>&middot;</span>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
        </Link>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <Link to="/" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, transition: 'color 0.2s' }}>Programmes</Link>
          <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
            background: 'var(--bronze)', color: '#fff', borderRadius: 50,
            padding: '10px 24px', fontSize: 12, fontWeight: 600,
            letterSpacing: '0.06em', textTransform: 'uppercase',
            fontFamily: "'Raleway', sans-serif",
            transition: 'all 0.3s var(--ease)'
          }}>Prendre RDV &rarr;</a>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--navy-deep)', padding: '80px 40px 48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60 }}>
        <div style={{ flex: '1 1 55%', minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: '#fff', fontWeight: 400 }}>VIVEO</span>
            <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 20 }}>&middot;</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
          </div>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>L'immobilier, l'esprit libre.</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 24, fontFamily: "'Raleway', sans-serif" }}>06 98 63 97 83</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)', marginTop: 4, fontFamily: "'Raleway', sans-serif" }}>3 bis rue du Général de Gaulle, 59253 La Gorgue</p>
        </div>
        <div style={{ flex: '1 1 35%', minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }}></span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>INVESTIR</span>
          </div>
          {[
            { label: 'LMNP', href: '/lmnp-viveo.html' },
            { label: 'Déficit Foncier', href: '/deficit-foncier-viveo.html' },
            { label: 'Nue-propriété', href: `${WP}/nue-propriete/` },
            { label: 'Monuments Historiques', href: `${WP}/monuments-historiques/` },
            { label: 'Loi Malraux', href: `${WP}/loi-malraux/` },
            { label: 'Loi Jeanbrun', href: '/loi-jeanbrun-viveo.html' },
            { label: 'Loi Denormandie', href: '/loi-denormandie-viveo.html' },
          ].map(l => (
            <a key={l.label} href={l.href} style={{ display: 'block', margin: '8px 0', fontSize: 13, color: 'rgba(255,255,255,0.45)', fontFamily: "'Raleway', sans-serif", transition: 'color 0.2s' }}>{l.label}</a>
          ))}
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '48px auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
        <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif" }}>
          &copy; 2026 VIVEO Patrimoine
          <span style={{ margin: '0 8px' }}>&middot;</span>
          <a href={`${WP}/mentions-legales/`} style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>Mentions légales</a>
          <span style={{ margin: '0 8px' }}>&middot;</span>
          <a href={`${WP}/politique-de-confidentialite/`} style={{ color: 'rgba(255,255,255,0.35)', transition: 'color 0.2s' }}>Politique de confidentialité</a>
        </p>
      </div>
    </footer>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Programmes />} />
            <Route path="/programme/:slug" element={<FicheProgramme />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
