const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'

export default function CtaV3() {
  return (
    <section data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: '22vh 6vw', textAlign: 'center' }}>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontWeight: 300, letterSpacing: '-0.025em',
        fontSize: 'clamp(44px, 7vw, 88px)',
        color: '#111C33', lineHeight: 1.0, margin: 0
      }}>
        Votre projet commence<br />
        <em style={{ color: '#A67C52', fontStyle: 'italic' }}>par une conversation.</em>
      </h2>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 20, color: '#888', marginTop: 32 }}>
        45 minutes. En visio. Gratuit.
      </p>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 13, color: '#bbb', marginTop: 8, marginBottom: 56 }}>
        {"Teams ou FaceTime \u00b7 R\u00e9ponse sous 24h \u00b7 Sans engagement"}
      </p>

      <a href={`${WP}/rdv-decouverte/`} target="_blank" rel="noopener noreferrer" style={{
        display: 'inline-block',
        background: 'linear-gradient(135deg, #A67C52, #C4976A)',
        borderRadius: 2, padding: '20px 60px',
        fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 14,
        textTransform: 'uppercase', letterSpacing: '0.08em',
        color: '#fff', textDecoration: 'none',
        boxShadow: '0 8px 40px rgba(166,124,82,0.22)',
        transition: 'transform 0.2s'
      }}>
        R\u00e9server mon appel d\u00e9couverte
      </a>
    </section>
  )
}
