import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Programmes from './pages/Programmes'
import FicheProgramme from './pages/FicheProgramme'

function Header() {
  return (
    <header style={{ background: '#1a1a2e', padding: '0.75rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 100 }}>
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ color: '#c8a96e', fontSize: '1.4rem', fontWeight: 700, letterSpacing: 1 }}>VIVEO</span>
        <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 300 }}>Patrimoine</span>
      </Link>
      <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <Link to="/" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Programmes</Link>
        <a href="mailto:contact@viveo-patrimoine.fr" style={{ background: '#c8a96e', color: '#fff', padding: '0.4rem 1rem', borderRadius: 6, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}>Contact</a>
      </nav>
    </header>
  )
}

function Footer() {
  return (
    <footer style={{ background: '#1a1a2e', color: '#999', padding: '2rem', textAlign: 'center', marginTop: '4rem' }}>
      <p style={{ margin: '0 0 0.5rem', color: '#c8a96e', fontWeight: 600 }}>VIVEO Patrimoine</p>
      <p style={{ margin: 0, fontSize: '0.85rem' }}>Investissement immobilier neuf</p>
      <p style={{ margin: '0.5rem 0 0', fontSize: '0.75rem' }}>&copy; {new Date().getFullYear()} VIVEO Patrimoine. Tous droits reserves.</p>
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
