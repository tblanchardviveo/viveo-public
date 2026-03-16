const etapes = [
  { num: '01', titre: 'RDV D\u00c9COUVERTE', texte: "45 minutes en visio, gratuites et sans engagement. Nous posons les bonnes questions sur votre situation, votre TMI, votre capacit\u00e9 d'emprunt et vos objectifs." },
  { num: '02', titre: 'S\u00c9LECTION PERSONNALIS\u00c9E', texte: "Nous filtrons notre catalogue et identifions les 1 \u00e0 3 programmes qui correspondent exactement \u00e0 votre profil. Nous vous expliquons pourquoi chacun \u2014 et pourquoi nous avons \u00e9cart\u00e9 les autres." },
  { num: '03', titre: 'ACCOMPAGNEMENT COMPLET', texte: "Financement, r\u00e9servation, suivi chantier, appels de fonds \u2014 notre \u00e9quipe coordonne chaque \u00e9tape pour vous. Vous ne g\u00e9rez rien. Vous d\u00e9cidez." },
  { num: '04', titre: 'REMISE DES CL\u00c9S & AU-DEL\u00c0', texte: "Pr\u00e9-livraison, livraison, garanties d\u00e9cennale et biennale \u2014 nous restons disponibles bien apr\u00e8s que les autres ont encaiss\u00e9 leur commission." }
]

export default function ProcessusV3() {
  return (
    <section data-bg="#111C33" style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ width: 32, height: 1, background: '#A67C52' }} />
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#fff' }}>COMMENT \u00c7A MARCHE</span>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,58px)', color: '#fff', lineHeight: 1.1, margin: '0 0 48px' }}>
        Un parcours simple.<br />
        <em style={{ color: '#C4976A', fontStyle: 'italic' }}>Un r\u00e9sultat sur mesure.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2 }}>
        {etapes.map((e, i) => (
          <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
            <span style={{
              position: 'absolute', top: -20, right: 24,
              fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 200,
              fontSize: 'clamp(80px,12vw,140px)',
              color: 'rgba(166,124,82,0.07)', lineHeight: 1, userSelect: 'none'
            }}>{e.num}</span>
            <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: '#A67C52', letterSpacing: '0.15em' }}>{"\u00c9TAPE "}{e.num}</div>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 400, fontSize: 22, color: '#fff', margin: '8px 0 16px' }}>{e.titre}</h3>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.50)', lineHeight: 1.7, margin: 0 }}>{e.texte}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
