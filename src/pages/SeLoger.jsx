import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }
const h2Style = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.02em', color: c || '#fff' })
const pStyle = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: 20 })
const cta = { display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }
const pill = { padding: '8px 20px', borderRadius: 20, fontSize: 12, fontFamily: "'Raleway',sans-serif", fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', textTransform: 'uppercase', cursor: 'pointer' }
const pillActive = { ...pill, background: 'rgba(166,124,82,0.2)', border: '1px solid rgba(166,124,82,0.5)', color: '#C4976A' }
const card = (bg) => ({ background: bg || 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 28, border: '1px solid rgba(255,255,255,0.06)' })
const cardLight = (bg) => ({ background: bg || '#fff', borderRadius: 8, padding: 28, border: '1px solid rgba(0,0,0,0.08)' })
const heroOverlay = 'linear-gradient(160deg,rgba(17,28,51,0.15) 0%,rgba(17,28,51,0.55) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1.00) 100%)'

const tabsData = [
  { id: 'premier-achat', title: 'Premier achat', subtitle: 'PTZ, dispositifs primo-acc\u00e9dants, accompagnement financement.', content: "Vous achetez pour la premi\u00e8re fois ? VIVEO vous guide \u00e0 chaque \u00e9tape : identification du programme id\u00e9al, montage du dossier PTZ (Pr\u00eat \u00e0 Taux Z\u00e9ro), simulation de financement et coordination avec nos partenaires bancaires. B\u00e9n\u00e9ficiez de frais de notaire r\u00e9duits (2 \u00e0 3\u00a0%) et d\u2019un accompagnement personnalis\u00e9 jusqu\u2019\u00e0 la remise des cl\u00e9s.", points: ['\u00c9ligibilit\u00e9 PTZ v\u00e9rifi\u00e9e et optimis\u00e9e', 'Frais de notaire r\u00e9duits dans le neuf', 'Accompagnement financement de A \u00e0 Z', 'Choix des mat\u00e9riaux et personnalisation'] },
  { id: 'changement-vie', title: 'Changement de vie', subtitle: 'Vente + achat simultan\u00e9, bridge loan, coordination notaires.', content: "Vous changez de r\u00e9gion, agrandissez votre famille ou souhaitez un cadre de vie diff\u00e9rent ? VIVEO coordonne la vente de votre bien actuel et l\u2019acquisition de votre nouveau logement neuf. Nous g\u00e9rons le calendrier, le pr\u00eat-relais et la synchronisation entre notaires pour une transition fluide et sans stress.", points: ['Coordination vente / achat simultan\u00e9', 'Pr\u00eat-relais et bridge loan optimis\u00e9s', 'Synchronisation des notaires', 'Z\u00e9ro p\u00e9riode sans logement'] },
  { id: 'construction-neuve', title: 'Construction neuve', subtitle: 'VEFA, garanties, suivi chantier, appels de fonds, livraison.', content: "Acheter en VEFA (Vente en l\u2019\u00c9tat Futur d\u2019Ach\u00e8vement), c\u2019est b\u00e9n\u00e9ficier d\u2019un logement aux derni\u00e8res normes \u00e9nerg\u00e9tiques avec des garanties solides. VIVEO vous accompagne dans le suivi du chantier, le calendrier des appels de fonds et les \u00e9tapes cl\u00e9s jusqu\u2019\u00e0 la livraison et la lev\u00e9e de r\u00e9serves.", points: ['Garantie d\u00e9cennale et parfait ach\u00e8vement', 'Suivi chantier et appels de fonds', 'Normes RT2020, basse consommation', 'Personnalisation des finitions'] }
]

const tabsSecondaire = [
  { id: 'pied-a-terre', title: 'Pied-\u00e0-terre', subtitle: 'C\u00f4te d\u2019Opale, M\u00e9diterran\u00e9e, Alpes \u2014 investissement plaisir.', content: "Vous r\u00eavez d\u2019un pied-\u00e0-terre sur la C\u00f4te d\u2019Opale, en M\u00e9diterran\u00e9e ou dans les Alpes ? VIVEO identifie les programmes qui allient plaisir d\u2019usage et valorisation patrimoniale. \u00c0 2h de Bruxelles, 1h30 de Londres via l\u2019Eurotunnel.", points: ['Programmes en zones touristiques premium', 'Dispositifs fiscaux adapt\u00e9s (LMNP, Nue-propri\u00e9t\u00e9)', 'Accompagnement financement et gestion locative', 'Valorisation patrimoniale \u00e0 long terme'] },
  { id: 'investissement-locatif', title: 'Investissement locatif', subtitle: 'Rendement, fiscalit\u00e9, gestion locative cl\u00e9 en main.', content: "Investir dans une r\u00e9sidence secondaire \u00e0 vocation locative, c\u2019est allier rendement et plaisir. VIVEO vous accompagne dans le choix du programme, l\u2019optimisation fiscale et la mise en place d\u2019une gestion locative professionnelle.", points: ['S\u00e9lection de programmes \u00e0 fort potentiel locatif', 'Optimisation fiscale personnalis\u00e9e', 'Gestion locative cl\u00e9 en main', 'Rendement net optimis\u00e9'] },
  { id: 'resid-services', title: 'R\u00e9sidences services', subtitle: 'Tourisme, seniors, \u00e9tudiants \u2014 bail commercial s\u00e9curis\u00e9.', content: "Les r\u00e9sidences services (tourisme, seniors, \u00e9tudiants) offrent un cadre d\u2019investissement s\u00e9curis\u00e9 avec bail commercial. VIVEO s\u00e9lectionne les meilleurs exploitants et emplacements pour vous garantir des revenus r\u00e9guliers.", points: ['Bail commercial avec exploitant professionnel', 'Revenus locatifs garantis', 'R\u00e9cup\u00e9ration de TVA possible', 'Aucune gestion locative \u00e0 assurer'] }
]

const Sec = ({ bg, children, id }) => { const ref = useReveal(); return <section ref={ref} id={id} style={{ background: bg || '#111C33', padding: 'clamp(60px,10vw,120px) clamp(20px,5vw,80px)' }}>{children}</section> }

export default function SeLoger() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeTabSec, setActiveTabSec] = useState(0)
  const secPrincipaleRef = useRef(null)
  const secSecondaireRef = useRef(null)
  const scrollTo = (ref) => { if (ref.current) ref.current.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', background: `${heroOverlay}, url('${WP}/wp-content/uploads/2025/01/salon-design-lumineux.jpg') center/cover` }}>
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(100px,12vw,160px) clamp(20px,5vw,80px) clamp(60px,8vw,100px)' }}>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 400, lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
            {'Votre chez-vous \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>sans les complications.</em>
          </h1>
          <p style={pStyle()}>{'R\u00e9sidence principale ou secondaire, neuf ou en VEFA \u2014 VIVEO vous accompagne de la recherche du programme jusqu\u2019\u00e0 la remise des cl\u00e9s.'}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <span style={pillActive} onClick={() => scrollTo(secPrincipaleRef)}>R\u00e9sidence Principale</span>
            <span style={pill} onClick={() => scrollTo(secSecondaireRef)}>R\u00e9sidence Secondaire</span>
            <Link to="/programmes" style={pill}>Nos Programmes</Link>
          </div>
        </div>
      </section>

      {/* Section 2 - Residence Principale */}
      <Sec bg="#1A2744" id="residence-principale">
        <div ref={secPrincipaleRef} style={{ marginTop: -20 }} />
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>R\u00c9SIDENCE PRINCIPALE</span></div>
        <h2 style={h2Style()}>{'Acheter sa r\u00e9sidence principale \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'le projet d\u2019une vie.'}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {tabsData.map((tab, i) => (
            <div key={tab.id} onClick={() => setActiveTab(i)} style={{ ...card(activeTab === i ? 'rgba(166,124,82,0.15)' : undefined), border: activeTab === i ? '1px solid rgba(166,124,82,0.4)' : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: activeTab === i ? '#C4976A' : '#fff', marginBottom: 12, transition: 'color 0.3s ease' }}>{tab.title}</h3>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{tab.subtitle}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 36, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(166,124,82,0.2)', transition: 'all 0.4s ease' }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', color: '#C4976A', marginBottom: 16 }}>{tabsData[activeTab].title}</h3>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 700 }}>{tabsData[activeTab].content}</p>
          <div style={{ marginTop: 24 }}>{tabsData[activeTab].points.map((pt, i) => (<p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{'\u2713'} {pt}</p>))}</div>
          <Link to="/programmes" style={cta}>{'Voir les programmes \u2192'}</Link>
        </div>
      </Sec>

      {/* Section 3 - Residence Secondaire */}
      <Sec bg="#F7F5F1" id="residence-secondaire">
        <div ref={secSecondaireRef} style={{ marginTop: -20 }} />
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>R\u00c9SIDENCE SECONDAIRE</span></div>
        <h2 style={h2Style('#111C33')}>{'Un pied-\u00e0-terre.'}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>Un investissement.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {tabsSecondaire.map((tab, i) => (
            <div key={tab.id} onClick={() => setActiveTabSec(i)} style={{ ...cardLight(activeTabSec === i ? 'rgba(166,124,82,0.08)' : undefined), border: activeTabSec === i ? '1px solid rgba(166,124,82,0.3)' : '1px solid rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: activeTabSec === i ? '#A67C52' : '#111C33', marginBottom: 12, transition: 'color 0.3s ease' }}>{tab.title}</h3>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{tab.subtitle}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 36, background: '#fff', borderRadius: 12, border: '1px solid rgba(166,124,82,0.15)', transition: 'all 0.4s ease' }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', color: '#A67C52', marginBottom: 16 }}>{tabsSecondaire[activeTabSec].title}</h3>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 700 }}>{tabsSecondaire[activeTabSec].content}</p>
          <div style={{ marginTop: 24 }}>{tabsSecondaire[activeTabSec].points.map((pt, i) => (<p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>{'\u2713'} {pt}</p>))}</div>
          <Link to="/programmes" style={cta}>{'Voir les programmes \u2192'}</Link>
        </div>
      </Sec>

      {/* Section 4 - Pourquoi le neuf */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>POURQUOI LE NEUF ?</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 32 }}>
          {[['Garanties','D\u00e9cennale + parfait ach\u00e8vement'],['Frais r\u00e9duits','Frais de notaire 2-3% vs 7-8%'],['Performance','RT2020, basse consommation'],['Personnalisation','Choix des mat\u00e9riaux avant construction']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>Parlons de votre projet.</h2>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV D\u00e9couverte \u2192'}</a>
      </Sec>
    </>
  )
}
