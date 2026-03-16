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
  { id: 'premier-achat', title: 'Premier achat', subtitle: 'PTZ, dispositifs primo-accédants, accompagnement financement.', content: "Vous achetez pour la première fois ? VIVEO vous guide à chaque étape : identification du programme idéal, montage du dossier PTZ (Prêt à Taux Zéro), simulation de financement et coordination avec nos partenaires bancaires. Bénéficiez de frais de notaire réduits (2 à 3\u00a0%) et d'un accompagnement personnalisé jusqu'à la remise des clés.", points: ['Éligibilité PTZ vérifiée et optimisée', 'Frais de notaire réduits dans le neuf', 'Accompagnement financement de A à Z', 'Choix des matériaux et personnalisation'] },
  { id: 'changement-vie', title: 'Changement de vie', subtitle: 'Vente + achat simultané, bridge loan, coordination notaires.', content: "Vous changez de région, agrandissez votre famille ou souhaitez un cadre de vie différent ? VIVEO coordonne la vente de votre bien actuel et l'acquisition de votre nouveau logement neuf. Nous gérons le calendrier, le prêt-relais et la synchronisation entre notaires pour une transition fluide et sans stress.", points: ['Coordination vente / achat simultané', 'Prêt-relais et bridge loan optimisés', 'Synchronisation des notaires', 'Zéro période sans logement'] },
  { id: 'construction-neuve', title: 'Construction neuve', subtitle: 'VEFA, garanties, suivi chantier, appels de fonds, livraison.', content: "Acheter en VEFA (Vente en l'État Futur d'Achèvement), c'est bénéficier d'un logement aux dernières normes énergétiques avec des garanties solides. VIVEO vous accompagne dans le suivi du chantier, le calendrier des appels de fonds et les étapes clés jusqu'à la livraison et la levée de réserves.", points: ['Garantie décennale et parfait achèvement', 'Suivi chantier et appels de fonds', 'Normes RT2020, basse consommation', 'Personnalisation des finitions'] }
]

const tabsSecondaire = [
  { id: 'pied-a-terre', title: 'Pied-à-terre', subtitle: "Côte d'Opale, Méditerranée, Alpes — investissement plaisir.", content: "Vous rêvez d'un pied-à-terre sur la Côte d'Opale, en Méditerranée ou dans les Alpes ? VIVEO identifie les programmes qui allient plaisir d'usage et valorisation patrimoniale. À 2h de Bruxelles, 1h30 de Londres via l'Eurotunnel.", points: ['Programmes en zones touristiques premium', 'Dispositifs fiscaux adaptés (LMNP, Nue-propriété)', 'Accompagnement financement et gestion locative', 'Valorisation patrimoniale à long terme'] },
  { id: 'investissement-locatif', title: 'Investissement locatif', subtitle: 'Rendement, fiscalité, gestion locative clé en main.', content: "Investir dans une résidence secondaire à vocation locative, c'est allier rendement et plaisir. VIVEO vous accompagne dans le choix du programme, l'optimisation fiscale et la mise en place d'une gestion locative professionnelle.", points: ['Sélection de programmes à fort potentiel locatif', 'Optimisation fiscale personnalisée', 'Gestion locative clé en main', 'Rendement net optimisé'] },
  { id: 'resid-services', title: 'Résidences services', subtitle: 'Tourisme, seniors, étudiants — bail commercial sécurisé.', content: "Les résidences services (tourisme, seniors, étudiants) offrent un cadre d'investissement sécurisé avec bail commercial. VIVEO sélectionne les meilleurs exploitants et emplacements pour vous garantir des revenus réguliers.", points: ['Bail commercial avec exploitant professionnel', 'Revenus locatifs garantis', 'Récupération de TVA possible', 'Aucune gestion locative à assurer'] }
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
          <p style={pStyle()}>{'Résidence principale ou secondaire, neuf ou en VEFA \u2014 VIVEO vous accompagne de la recherche du programme jusqu\u2019à la remise des clés.'}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <span style={pillActive} onClick={() => scrollTo(secPrincipaleRef)}>{'RÉSIDENCE PRINCIPALE'}</span>
            <span style={pill} onClick={() => scrollTo(secSecondaireRef)}>{'RÉSIDENCE SECONDAIRE'}</span>
            <Link to="/programmes" style={pill}>{'NOS PROGRAMMES'}</Link>
          </div>
        </div>
      </section>

      {/* Section Résidence Principale */}
      <Sec bg="#1A2744" id="residence-principale">
        <div ref={secPrincipaleRef} style={{ marginTop: -20 }} />
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'RÉSIDENCE PRINCIPALE'}</span></div>
        <h2 style={h2Style()}>{'Acheter sa résidence principale \u2014'}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{"le projet d\u2019une vie."}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {tabsData.map((tab, i) => (
            <div key={tab.id} onClick={() => setActiveTab(i)} style={{ ...card(activeTab === i ? 'rgba(166,124,82,0.15)' : undefined), border: activeTab === i ? '1px solid rgba(166,124,82,0.4)' : '1px solid rgba(255,255,255,0.06)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: activeTab === i ? '#C4976A' : '#fff', marginBottom: 12, transition: 'color 0.3s ease' }}>{tab.title}</h3>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{tab.subtitle}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 36, background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(166,124,82,0.2)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', color: '#C4976A', marginBottom: 16 }}>{tabsData[activeTab].title}</h3>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.8, maxWidth: 700 }}>{tabsData[activeTab].content}</p>
          <div style={{ marginTop: 24 }}>{tabsData[activeTab].points.map((pt, i) => (<p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.55)', marginBottom: 8 }}>{'\u2713'} {pt}</p>))}</div>
          <Link to="/programmes" style={cta}>{'Voir les programmes \u2192'}</Link>
        </div>
      </Sec>

      {/* Section Résidence Secondaire */}
      <Sec bg="#F7F5F1" id="residence-secondaire">
        <div ref={secSecondaireRef} style={{ marginTop: -20 }} />
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'RÉSIDENCE SECONDAIRE'}</span></div>
        <h2 style={h2Style('#111C33')}>{"Un pied-à-terre."}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>Un investissement.</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          {tabsSecondaire.map((tab, i) => (
            <div key={tab.id} onClick={() => setActiveTabSec(i)} style={{ ...cardLight(activeTabSec === i ? 'rgba(166,124,82,0.08)' : undefined), border: activeTabSec === i ? '1px solid rgba(166,124,82,0.3)' : '1px solid rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: activeTabSec === i ? '#A67C52' : '#111C33', marginBottom: 12, transition: 'color 0.3s ease' }}>{tab.title}</h3>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{tab.subtitle}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: 36, background: '#fff', borderRadius: 12, border: '1px solid rgba(166,124,82,0.15)' }}>
          <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,3vw,28px)', color: '#A67C52', marginBottom: 16 }}>{tabsSecondaire[activeTabSec].title}</h3>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: '#555', lineHeight: 1.8, maxWidth: 700 }}>{tabsSecondaire[activeTabSec].content}</p>
          <div style={{ marginTop: 24 }}>{tabsSecondaire[activeTabSec].points.map((pt, i) => (<p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>{'\u2713'} {pt}</p>))}</div>
          <Link to="/programmes" style={cta}>{'Voir les programmes \u2192'}</Link>
        </div>
      </Sec>

      {/* Pourquoi le neuf */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{'POURQUOI LE NEUF ?'}</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20, marginTop: 32 }}>
          {[['Garanties','Décennale + parfait achèvement'],['Frais réduits','Frais de notaire 2-3% vs 7-8%'],['Performance','RT2020, basse consommation'],['Personnalisation','Choix des matériaux avant construction']].map(([t,d],i) => <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{t}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{d}</p></div>)}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1">
        <h2 style={h2Style('#111C33')}>Parlons de votre projet.</h2>
        <a href={`${WP}/rdv-decouverte/`} style={cta}>{'Demander mon RDV Découverte \u2192'}</a>
      </Sec>
    </>
  )
}
