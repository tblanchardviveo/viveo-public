import { useTranslation } from 'react-i18next'
import { useReveal } from '../hooks/useReveal'
import LanguageSwitcher from '../components/LanguageSwitcher'

const eye = { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = { fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52' }
const h2Style = (c) => ({ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.1, color: c || '#fff', letterSpacing: '-0.02em' })
const pStyle = (c) => ({ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 16, lineHeight: 1.8, color: c || 'rgba(255,255,255,0.55)', maxWidth: 540, marginTop: 20 })
const cta = { display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', borderRadius: 2, padding: '18px 40px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', marginTop: 32 }
const pill = { padding: '8px 20px', borderRadius: 20, fontSize: 12, fontFamily: "'Raleway',sans-serif", fontWeight: 500, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.15)', textDecoration: 'none', textTransform: 'uppercase' }
const card = (bg) => ({ background: bg || 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 28, border: '1px solid rgba(255,255,255,0.06)' })
const heroOverlay = 'linear-gradient(160deg,rgba(17,28,51,0.15) 0%,rgba(17,28,51,0.55) 45%,rgba(17,28,51,0.92) 75%,rgba(17,28,51,1.00) 100%)'

function Sec({ children, bg, style }) {
  const [ref, vis] = useReveal()
  return <section ref={ref} style={{ padding: '100px 6vw', background: bg, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(32px)', transition: 'opacity 0.8s ease, transform 0.8s ease', ...style }}>{children}</section>
}

export default function International() {
  const { t } = useTranslation()

  return (
    <>
      <LanguageSwitcher />

      {/* Hero */}
      <section style={{ position: 'relative', backgroundImage: "url('/images/IMG_0498.png')", backgroundSize: 'cover', backgroundPosition: 'center', padding: '120px 6vw 80px' }}>
        <div style={{ position: 'absolute', inset: 0, background: heroOverlay }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={eye}><span style={eyeLine} /><span style={eyeText}>{t('eye_international')}</span></div>
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(42px,7vw,80px)', fontWeight: 300, lineHeight: 1, color: '#fff', letterSpacing: '-0.02em' }}>{t('hero_h1_1')}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{t('hero_h1_2')}</em></h1>
          <p style={pStyle()}>{t('hero_p')}</p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            {[t('pill_1'), t('pill_2'), t('pill_3'), t('pill_4')].map((p, i) => <span key={i} style={pill}>{p}</span>)}
          </div>
        </div>
      </section>

      {/* Section 2 - Accompagnement */}
      <Sec bg="#1A2744">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{t('eye_accompagnement')}</span></div>
        <h2 style={h2Style()}>{t('accomp_h2_1')}<br /><em style={{ fontStyle: 'italic', color: '#C4976A' }}>{t('accomp_h2_2')}</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginTop: 48 }}>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t('card1_title')}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{t('card1_text')}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t('card2_title')}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{t('card2_text')}</p></div>
          <div style={card()}><h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#fff', marginBottom: 12 }}>{t('card3_title')}</h3><p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{t('card3_text')}</p></div>
        </div>
      </Sec>

      {/* Section 3 - Zones */}
      <Sec bg="#F7F5F1">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{t('eye_zones')}</span></div>
        <h2 style={h2Style('#111C33')}>{t('zones_h2_1')}<br /><em style={{ fontStyle: 'italic', color: '#A67C52' }}>{t('zones_h2_2')}</em></h2>
        <p style={pStyle('#555')}>{t('zones_p')}</p>
        <div style={{ marginTop: 24 }}>
          {[t('bullet_1'), t('bullet_2'), t('bullet_3'), t('bullet_4')].map((txt, i) => <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, color: '#555', marginBottom: 8 }}>✓ {txt}</p>)}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
          {[t('zone_1'), t('zone_2'), t('zone_3'), t('zone_4')].map((z, i) => <span key={i} style={{ padding: '10px 20px', borderRadius: 20, background: 'rgba(166,124,82,0.12)', color: '#A67C52', fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 13 }}>{z}</span>)}
        </div>
      </Sec>

      {/* Section 4 - Avantages */}
      <Sec bg="#111C33">
        <div style={eye}><span style={eyeLine} /><span style={eyeText}>{t('eye_avantages')}</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: 20, marginTop: 32 }}>
          {[[t('adv1_title'), t('adv1_text')], [t('adv2_title'), t('adv2_text')], [t('adv3_title'), t('adv3_text')], [t('adv4_title'), t('adv4_text')]].map(([title, desc], i) => (
            <div key={i} style={{ background: '#F7F5F1', borderRadius: 8, padding: 28 }}>
              <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, color: '#111C33', marginBottom: 8 }}>{title}</h3>
              <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#555', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </Sec>

      {/* CTA Final */}
      <Sec bg="#F7F5F1" style={{ textAlign: 'center' }}>
        <h2 style={h2Style('#111C33')}>{t('cta_h2')}</h2>
        <a href="/rdv-decouverte" style={cta}>{t('cta_btn')}</a>
      </Sec>
    </>
  )
}
