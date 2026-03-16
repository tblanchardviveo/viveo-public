import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Programmes from './pages/Programmes'
import FicheProgramme from './pages/FicheProgramme'
import Parrainage from './pages/Parrainage'
import Calculateur from './pages/Calculateur'
import NewsletterPage from './pages/NewsletterPage'
import AvisPage from './pages/AvisPage'
import HomePage from './pages/HomePage'
import HomePageV3 from './pages/HomePageV3'
import SeLoger from './pages/SeLoger'
import Investir from './pages/Investir'
import ApprocheViveo from './pages/ApprocheViveo'
import Financement from './pages/Financement'
import International from './pages/International'
import Lmnp from './pages/fiscal/Lmnp'
import DeficitFoncier from './pages/fiscal/DeficitFoncier'
import NuePropriete from './pages/fiscal/NuePropriete'
import LoiMalraux from './pages/fiscal/LoiMalraux'
import MonumentsHistoriques from './pages/fiscal/MonumentsHistoriques'
import LoiDenormandie from './pages/fiscal/LoiDenormandie'
import LoiJeanbrun from './pages/fiscal/LoiJeanbrun'
import LmnpGere from './pages/fiscal/LmnpGere'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

function Header() {
  const linkStyle = {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 500,
    textDecoration: 'none',
    transition: 'color 0.2s'
  }
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <>
      <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--navy-deep)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)', height: 72 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'baseline', gap: 0, textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#fff', fontWeight: 400 }}>VIVEO</span>
            <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 18 }}>{"\u00b7"}</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 40 }}>
            <Link to="/programmes" style={linkStyle} onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Programmes</Link>
            <Link to="/se-loger" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Se Loger</Link>
            <Link to="/investir" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Investir</Link>
            <Link to="/approche" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Notre Approche</Link><Link to="/parrainage" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Parrainage</Link><Link to="/calculateur" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Calculateur</Link><Link to="/international" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>International</Link>
            <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', borderRadius: 50, padding: '10px 24px', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", textDecoration: 'none', transition: 'all 0.3s var(--ease)' }}>{"Prendre RDV \u2192"}</a>
            {isMobile && <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: 8, display: 'flex', alignItems: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A67C52" strokeWidth="2" strokeLinecap="round">{menuOpen ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}</svg></button>}
          </nav>
        </div>
      </header>
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, background: 'var(--navy-deep)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link to="/programmes" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Programmes</Link>
          <Link to="/se-loger" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Se Loger</Link>
          <Link to="/investir" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Investir</Link>
          <Link to="/approche" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Notre Approche</Link>
          <Link to="/financement" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Financement</Link>
          <Link to="/international" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>International</Link><Link to="/parrainage" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Parrainage</Link><Link to="/calculateur" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Calculateur</Link>
        </div>
      )}
    </>
  )
}

function Footer() {
  const fl = { fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', display: 'block', marginBottom: 6, transition: 'color 0.2s' }
  const ho = e => e.target.style.color = '#C4976A'
  const hl = e => e.target.style.color = 'rgba(255,255,255,0.45)'
  return (
    <footer style={{ background: 'var(--navy-deep)', padding: '80px 40px 48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60 }}>
        <div style={{ flex: '1 1 55%', minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 26, color: '#fff', fontWeight: 400 }}>VIVEO</span>
            <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 20 }}>{"\u00b7"}</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
          </div>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>{"L'immobilier, l'esprit libre."}</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 24, fontFamily: "'Raleway', sans-serif" }}>06 98 63 97 83</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)', marginTop: 4, fontFamily: "'Raleway', sans-serif" }}>{"3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue"}</p>
        </div>
        <div style={{ flex: '1 1 35%', minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>EXPLORER</span>
          </div>
          <Link to="/investir" style={fl} onMouseEnter={ho} onMouseLeave={hl}>LMNP</Link>
          <Link to="/investir" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"D\u00e9ficit Foncier"}</Link>
          <Link to="/investir" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Nue-propri\u00e9t\u00e9"}</Link>
          <Link to="/se-loger" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Se Loger</Link>
          <Link to="/financement" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Financement</Link>
          <Link to="/international" style={fl} onMouseEnter={ho} onMouseLeave={hl}>International</Link>
          <Link to="/approche" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Notre Approche</Link><Link to="/parrainage" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Parrainage</Link><Link to="/calculateur" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Simulateur</Link><Link to="/retraite" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Pr\u00e9parer ma retraite"}</Link><Link to="/retraite" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Pr\u00e9parer ma retraite"}</Link><Link to="/retraite" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Pr\u00e9parer ma retraite"}</Link>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif" }}>{"\u00a9 2025 VIVEO Patrimoine"}</span>
        <a href={`${WP}/mentions-legales/`} style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif", textDecoration: 'none' }}>{"Mentions l\u00e9gales"}</a>
        <a href={`${WP}/politique-de-confidentialite/`} style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif", textDecoration: 'none' }}>{"Politique de confidentialit\u00e9"}</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <style>{`
        @media (max-width: 768px) {
          .nav-hide-mobile { display: none !important; }
        }
      `}</style>
      <Header />
      <main style={{ minHeight: '60vh' }}>
        <Routes>
                    <Route path="/" element={<HomePageV3 />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/programme/:slug" element={<FicheProgramme />} />
          <Route path="/parrainage" element={<Parrainage />} />
          <Route path="/calculateur" element={<Calculateur />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/avis" element={<AvisPage />} />
          <Route path="/se-loger" element={<SeLoger />} />
          <Route path="/investir" element={<Investir />} />
          <Route path="/approche" element={<ApprocheViveo />} />
          <Route path="/financement" element={<Financement />} />
          <Route path="/international" element={<International />} />
                                  <Route path="/lmnp" element={<Lmnp />} />
                        <Route path="/deficit-foncier" element={<DeficitFoncier />} />
                        <Route path="/nue-propriete" element={<NuePropriete />} />
                        <Route path="/loi-malraux" element={<LoiMalraux />} />
                        <Route path="/monuments-historiques" element={<MonumentsHistoriques />} />
                        <Route path="/loi-denormandie" element={<LoiDenormandie />} />
                        <Route path="/loi-jeanbrun" element={<LoiJeanbrun />} />
                      <Route path="/lmnp-gere" element={<LmnpGere />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}
