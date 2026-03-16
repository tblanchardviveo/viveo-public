const WP = 'https://viveopromotion-t3jrcqwfw3.live-website.com'
const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52'
}

const cards = [
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0662.png`,
    badge: 'PRIORIT\u00c9 VIVEO', badgeBronze: true,
    title: 'R\u00e9sidences seniors',
    text: "4,8 millions de Fran\u00e7ais auront plus de 85 ans en 2050 (contre 2 millions aujourd'hui). Le besoin de logements services seniors va tripler. Nous en faisons notre priorit\u00e9 absolue.",
    stat: '+140%', statLabel: ' de seniors d\u2019ici 2050'
  },
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0659.png`,
    badge: 'PRIORIT\u00c9 VIVEO', badgeBronze: true,
    title: 'R\u00e9sidences \u00e9tudiantes',
    text: "2,7 millions d'\u00e9tudiants pour seulement 350 000 places en r\u00e9sidences. Un taux d'\u00e9quipement de 12% seulement. Le d\u00e9ficit est chronique, structurel, national \u2014 et ne se r\u00e9sorbe pas.",
    stat: '12%', statLabel: " taux d'\u00e9quipement seulement (S\u00e9nat)"
  },
  {
    img: `${WP}/wp-content/uploads/2026/03/IMG_0664.png`,
    badge: 'S\u00c9LECTION STRICTE VIVEO', badgeBronze: false,
    title: 'R\u00e9sidences de tourisme',
    text: "Nous ne r\u00e9f\u00e9ren\u00e7ons que les gestionnaires dont la solidit\u00e9 financi\u00e8re, l'historique de paiement et le taux d'occupation sont v\u00e9rifi\u00e9s et document\u00e9s. La s\u00e9lectivit\u00e9 est notre seule r\u00e8gle.",
    note: "Nous refusons les programmes dont le gestionnaire ne satisfait pas \u00e0 nos crit\u00e8res de solidit\u00e9."
  }
]

export default function TypesResidences() {
  return (
    <section style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={eyeLine} /><span style={eyeText}>{"TROIS MARCH\u00c9S \u00b7 UNE LOGIQUE COMMUNE"}</span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300,
        lineHeight: 1.1, color: '#fff', margin: '0 0 56px'
      }}>
        {"La demande d\u00e9passe l'offre."}<br />
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
