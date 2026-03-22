const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52'
}

const cards = [
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0662.png`,
    badge: 'PRIORITÉ VIVEO', badgeBronze: true,
    title: 'Résidences seniors',
    text: "4,8 millions de Français auront plus de 85 ans en 2050 (contre 2 millions aujourd'hui). Le besoin de logements services seniors va tripler. Nous en faisons notre priorité absolue.",
    stat: '+140%', statLabel: ' de seniors d’ici 2050'
  },
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0669.png`,
    badge: 'PRIORITÉ VIVEO', badgeBronze: true,
    title: 'Résidences étudiantes',
    text: "2,7 millions d'étudiants pour seulement 350 000 places en résidences. Un taux d'équipement de 12% seulement. Le déficit est chronique, structurel, national — et ne se résorbe pas.",
    stat: '12%', statLabel: " taux d'équipement seulement (Sénat)"
  },
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0664.png`,
    badge: 'SÉLECTION STRICTE VIVEO', badgeBronze: false,
    title: 'Résidences de tourisme',
    text: "Nous ne référençons que les gestionnaires dont la solidité financière, l'historique de paiement et le taux d'occupation sont vérifiés et documentés. La sélectivité est notre seule règle.",
    note: "Nous refusons les programmes dont le gestionnaire ne satisfait pas à nos critères de solidité."
  }
]

export default function TypesResidences() {
  return (
    <section style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={eyeLine} /><span style={eyeText}>{"TROIS MARCHÉS · UNE LOGIQUE COMMUNE"}</span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300,
        lineHeight: 1.1, color: '#fff', margin: '0 0 56px'
      }}>
        {"La demande dépasse l'offre."}<br />
        <em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'Partout. Durablement.'}</em>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 2 }}>
        {cards.map((c, i) => (
          <div key={i} style={{ borderRadius: 0, overflow: 'hidden' }}>
            <div style={{
              height: 280, backgroundImage: `url('${c.img}')`,
              backgroundSize: 'cover', backgroundPosition: 'center',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom,transparent 40%,rgba(17,28,51,0.85) 100%)'
              }} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: 32 }}>
              <span style={{
                display: 'inline-block', padding: '6px 14px', borderRadius: 20,
                fontSize: 10, fontFamily: "'Raleway',sans-serif", fontWeight: 600,
                letterSpacing: '0.1em', marginBottom: 16,
                background: c.badgeBronze ? 'rgba(166,124,82,0.12)' : 'rgba(255,255,255,0.10)',
                color: c.badgeBronze ? '#A67C52' : 'rgba(255,255,255,0.7)',
                border: c.badgeBronze ? 'none' : '1px solid rgba(255,255,255,0.20)'
              }}>{c.badge}</span>
              <h3 style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 22, color: '#fff', margin: '0 0 12px'
              }}>{c.title}</h3>
              <p style={{
                fontFamily: "'Raleway',sans-serif", fontWeight: 300,
                fontSize: 14, lineHeight: 1.7, color: 'rgba(255,255,255,0.60)', margin: 0
              }}>{c.text}</p>
              {c.stat && (
                <p style={{ marginTop: 20 }}>
                  <span style={{
                    fontFamily: "'Raleway',sans-serif", fontWeight: 700,
                    color: '#A67C52', fontSize: 16
                  }}>{c.stat}</span>
                  <span style={{
                    fontFamily: "'Raleway',sans-serif", fontWeight: 300,
                    fontSize: 12, color: 'rgba(255,255,255,0.40)'
                  }}>{c.statLabel}</span>
                </p>
              )}
              {c.note && (
                <p style={{
                  fontFamily: "'Raleway',sans-serif", fontStyle: 'italic',
                  fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 16
                }}>{c.note}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
