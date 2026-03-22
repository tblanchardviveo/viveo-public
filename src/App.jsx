import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import ChatbotWidget from './components/ChatbotWidget'

const Programmes = lazy(() => import('./pages/Programmes'))
const FicheProgramme = lazy(() => import('./pages/FicheProgramme'))
const Parrainage = lazy(() => import('./pages/Parrainage'))
const Calculateur = lazy(() => import('./pages/Calculateur'))
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'))
const AvisPage = lazy(() => import('./pages/AvisPage'))
const HomePageV3 = lazy(() => import('./pages/HomePageV3'))
const SeLoger = lazy(() => import('./pages/SeLoger'))
const Investir = lazy(() => import('./pages/Investir'))
const ApprocheViveo = lazy(() => import('./pages/ApprocheViveo'))
const Financement = lazy(() => import('./pages/Financement'))
const International = lazy(() => import('./pages/International'))
const Lmnp = lazy(() => import('./pages/fiscal/Lmnp'))
const DeficitFoncier = lazy(() => import('./pages/fiscal/DeficitFoncier'))
const NuePropriete = lazy(() => import('./pages/fiscal/NuePropriete'))
const LoiMalraux = lazy(() => import('./pages/fiscal/LoiMalraux'))
const MonumentsHistoriques = lazy(() => import('./pages/fiscal/MonumentsHistoriques'))
const LoiDenormandie = lazy(() => import('./pages/fiscal/LoiDenormandie'))
const LoiJeanbrun = lazy(() => import('./pages/fiscal/LoiJeanbrun'))
const LmnpGere = lazy(() => import('./pages/fiscal/LmnpGere'))
const Retraite = lazy(() => import('./pages/Retraite'))
const EtudesEnfants = lazy(() => import('./pages/EtudesEnfants'))
const MentionsLegales = lazy(() => import('./pages/MentionsLegales'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const RdvDecouverte = lazy(() => import('./pages/RdvDecouverte'))
const DemoEspaceClient = lazy(() => import('./pages/DemoEspaceClient'))
const PolitiqueConfidentialite = lazy(() => import('./pages/PolitiqueConfidentialite'))

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

function Header() {
  const linkStyle = {
    fontFamily: "'Raleway', sans-serif",
    fontSize: 12, color: 'rgba(255,255,255,0.6)',
    letterSpacing: '0.08em', textTransform: 'uppercase',
    fontWeight: 500, textDecoration: 'none', transition: 'color 0.2s'
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
            <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 18 }}>{"·"}</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
          </Link>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 28, marginLeft: 40 }}>
            <Link to="/programmes" style={linkStyle} onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Programmes</Link>
            <Link to="/se-loger" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Se Loger</Link>
            <Link to="/investir" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Investir</Link>
            <Link to="/approche-viveo" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Notre Approche</Link><Link to="/parrainage" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Parrainage</Link><Link to="/calculateur" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Calculateur</Link><Link to="/international" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>International</Link><Link to="/blog" style={linkStyle} className="nav-hide-mobile" onMouseEnter={e => e.target.style.color='#C4976A'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.6)'}>Blog</Link>
            <a href="https://viveo-patrimoine.fr/partenaire" style={{ padding: '8px 18px', borderRadius: 20, fontSize: 11, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', border: '1px solid #A67C52', color: '#A67C52', background: 'transparent', textDecoration: 'none', whiteSpace: 'nowrap', marginRight: 12 }}>Espace partenaire</a>
            <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{ background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)', color: '#fff', borderRadius: 2, padding: '10px 24px', fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", textDecoration: 'none', transition: 'all 0.3s var(--ease)' }}>{"Prendre RDV →"}</a>
            {isMobile && <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, marginLeft: 8, display: 'flex', alignItems: 'center' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A67C52" strokeWidth="2" strokeLinecap="round">{menuOpen ? <><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></> : <><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></>}</svg></button>}
          </nav>
        </div>
      </header>
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: 72, left: 0, right: 0, background: 'var(--navy-deep)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '16px 24px', zIndex: 99, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Link to="/programmes" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Programmes</Link>
          <Link to="/se-loger" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Se Loger</Link>
          <Link to="/investir" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Investir</Link>
          <Link to="/approche-viveo" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Notre Approche</Link>
          <Link to="/financement" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Financement</Link>
          <Link to="/international" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>International</Link><Link to="/blog" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Blog</Link><Link to="/parrainage" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Parrainage</Link><Link to="/calculateur" onClick={() => setMenuOpen(false)} style={{ ...linkStyle, fontSize: 13, color: '#fff' }}>Calculateur</Link>
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
            <span style={{ color: 'var(--bronze)', margin: '0 8px', fontSize: 20 }}>{"·"}</span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--bronze)', fontWeight: 500 }}>Patrimoine</span>
          </div>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.4)', marginTop: 8 }}>{"L'immobilier, l'esprit libre."}</p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', marginTop: 24, fontFamily: "'Raleway', sans-serif" }}>09 67 16 70 65</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.30)', marginTop: 4, fontFamily: "'Raleway', sans-serif" }}>{"3 bis rue du Général de Gaulle, 59253 La Gorgue"}</p>
        </div>
        <div style={{ flex: '1 1 35%', minWidth: 220 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: 'var(--bronze)', display: 'block' }} />
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)', fontFamily: "'Raleway', sans-serif" }}>EXPLORER</span>
          </div>
          <Link to="/lmnp-gere" style={fl} onMouseEnter={ho} onMouseLeave={hl}>LMNP Géré</Link> <Link to="/lmnp" style={fl} onMouseEnter={ho} onMouseLeave={hl}>LMNP</Link> <Link to="/deficit-foncier" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Déficit Foncier"}</Link> <Link to="/nue-propriete" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Nue-propriété"}</Link> <Link to="/monuments-historiques" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Monuments Historiques</Link> <Link to="/loi-malraux" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Loi Malraux</Link> <Link to="/loi-jeanbrun" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Loi Jeanbrun</Link> <Link to="/loi-denormandie" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Loi Denormandie</Link> <Link to="/se-loger" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Se Loger</Link> <Link to="/financement" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Financement</Link> <Link to="/international" style={fl} onMouseEnter={ho} onMouseLeave={hl}>International</Link> <Link to="/approche-viveo" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Notre Approche</Link> <Link to="/parrainage" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Parrainage</Link> <Link to="/calculateur" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Simulateur</Link> <Link to="/retraite" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Préparer ma retraite"}</Link> <Link to="/etudes-enfants" style={fl} onMouseEnter={ho} onMouseLeave={hl}>{"Financer les études"}</Link> <Link to="/blog" style={fl} onMouseEnter={ho} onMouseLeave={hl}>Blog</Link>
        </div>
      </div>
      <div style={{ maxWidth: 1100, margin: '0 auto', marginTop: 48, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif" }}>{"© 2026 VIVEO Patrimoine"}</span>
        <Link to="/mentions-legales" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif", textDecoration: 'none' }}>Mentions légales</Link>
        <Link to="/politique-de-confidentialite" style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'Raleway', sans-serif", textDecoration: 'none' }}>{"Politique de confidentialité"}</Link>1

      </div>
    </footer>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <main style={{ minHeight: '60vh' }}>
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F5F0' }}>
            <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 20, color: '#A67C52', letterSpacing: '.06em' }}>VIVEO<span style={{ color: '#111C33' }}>.</span></div>
          </div>
        }>
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
            <Route path="/approche-viveo" element={<ApprocheViveo />} />
            <Route path="/financement" element={<Financement />} />
            <Route path="/international" element={<International />} />
            <Route path="/lmnp" element={<Lmnp />} />
            <Route path="/deficit-foncier" element={<DeficitFoncier />} />
            <Route path="/nue-propriete" element={<NuePropriete />} />
            <Route path="/loi-malraux" element={<LoiMalraux />} />
            <Route path="/monuments-historiques" element={<MonumentsHistoriques />} />
            <Route path="/loi-denormandie" element={<LoiDenormandie />} />
            <Route path="/loi-jeanbrun" element={<LoiJeanbrun />} />
            <Route path="/lmnp-gere" element={<LmnpGere />} /> <Route path="/retraite" element={<Retraite />} /> <Route path="/etudes-enfants" element={<EtudesEnfants />} />
            <Route path="/mentions-legales" element={<MentionsLegales />} /> <Route path="/blog" element={<Blog />} /> <Route path="/blog/:slug" element={<BlogArticle />} />
            <Route path="/rdv-decouverte" element={<RdvDecouverte />} /> <Route path="/demo-espace-client" element={<DemoEspaceClient />} />
          <Route path="/politique-de-confidentialite" element={<PolitiqueConfidentialite />} />
            </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatbotWidget />
    </BrowserRouter>
  )
}
