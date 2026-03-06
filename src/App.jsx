import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Programmes from './pages/Programmes'
import FicheProgramme from './pages/FicheProgramme'

function Header() {
  return (
    <header style={{ background: 'var(--navy)', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 2px 12px rgba(26,39,68,0.15)' }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: 'var(--bronze)', fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: 1 }}>VIVEO</span>
        <span style={{ color: 'var(--blanc-casse)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: 2, textTransform: 'uppercase' }}>Patrimoine</span>
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: 'var(--gris-chaud)', textDecoration: 'none', fontSize: '0.9rem', fontFamily: 'var(--font-body)', fontWeight: 500, letterSpacing: 0.5, transition: 'color 0.2s' }}>Programmes</Link>
        <a href="mailto:contact@viveo-patrimoine.fr" style={{ background: 'var(--gradient-btn)', color: '#fff', padding: '0.5rem 1.2rem', borderRadius: 6, textDecoration: 'none', fontSize: '0.85rem', fontFamily: 'var(--font-body)', fontWeight: 600, letterSpacing: 0.5, transition: 'opacity 0.2s' }}>Contact</a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: 'var(--gris-texte)', padding: '2.5rem 2rem', textAlign: 'center', marginTop: '4rem' }}>
      <p style={{ margin: '0 0 0.4rem', color: 'var(--bronze)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600 }}>VIVEO Patrimoine</p>
      <p style={{ margin: 0, fontSize: '0.85rem', fontFamily: 'var(--font-body)', color: 'var(--gris-chaud)' }}>Investissement immobilier neuf</p>
      <div style={{ width: 40, height: 2, background: 'var(--bronze)', margin: '1rem auto' }}></div>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem', fontFamily: 'var(--font-body)' }}>&copy; {new Date().getFullYear()} VIVEO Patrimoine. Tous droits reserves.</p>
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
