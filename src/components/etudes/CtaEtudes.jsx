const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function CtaEtudes() {
  return (
    <section style={{
      background: 'linear-gradient(170deg, rgba(166,124,82,0.12) 0%, var(--navy-deep) 50%)',
      padding: '100px 24px', textAlign: 'center'
    }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 24 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)'
          }}>Passez {"à"} l'action</span>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300,
          color: '#fff', lineHeight: 1.2, marginBottom: 20
        }}>
          {'Chaque année qui passe '}
          <em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>{"coûte plus cher"}</em>
        </h2>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 16, fontWeight: 300,
          color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 48
        }}>
          {'Un RDV de 30 minutes avec un conseiller VIVEO pour établir votre stratégie de financement des études. Sans engagement, sans surprise.'}
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href={'/rdv-decouverte'} target="_blank" rel="noopener noreferrer" style={{
            background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
            color: '#fff', borderRadius: 50, padding: '16px 40px',
            fontSize: 14, fontWeight: 600, letterSpacing: '0.06em',
            textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif",
            textDecoration: 'none', transition: 'all 0.3s'
          }}>{"RDV découverte →"}</a>

          <a href="tel:+33967167065" style={{
            border: '1px solid rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.6)', borderRadius: 50,
            padding: '16px 32px', fontSize: 13, fontWeight: 400,
            fontFamily: "'Raleway', sans-serif",
            textDecoration: 'none', transition: 'all 0.3s'
          }}>09 67 16 70 65</a>
        </div>

        <p style={{
          fontFamily: "'Raleway', sans-serif", fontSize: 12,
          fontWeight: 300, color: 'rgba(255,255,255,0.25)',
          marginTop: 32
        }}>
          {"✓ Gratuit  ·  ✓ Sans engagement  ·  ✓ 30 min"}
        </p>
      </div>
    </section>
  )
}
