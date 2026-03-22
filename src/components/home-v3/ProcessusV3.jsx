const etapes = [
  { num: '01', titre: 'RDV DÉCOUVERTE', texte: "45 minutes en visio, gratuites et sans engagement. Nous posons les bonnes questions sur votre situation fiscale, patrimoniale et vos objectifs." },
  { num: '02', titre: 'SÉLECTION PERSONNALISÉE', texte: "Nous filtrons notre catalogue et identifions les 1 à 3 programmes qui correspondent vraiment à votre profil." },
  { num: '03', titre: 'ACCOMPAGNEMENT COMPLET', texte: "Financement, réservation, suivi chantier, appels de fonds — notre équipe coordonne tout jusqu'à la livraison." },
  { num: '04', titre: 'REMISE DES CLÉS & AU-DELÀ', texte: "Pré-livraison, livraison, garanties décennale et biennale — nous restons à vos côtés après la signature." }
]

export default function ProcessusV3() {
  return (
    <section data-bg="#111C33" style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ width: 32, height: 1, background: '#A67C52' }} />
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52' }}>{"NOTRE MÉTHODE"}</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,58px)', color: '#fff', lineHeight: 1.1, margin: '0 0 64px' }}>
        Un parcours simple.<br />
        <em style={{ color: '#C4976A', fontStyle: 'italic' }}>{"Un résultat sur mesure."}</em>
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
            <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', color: '#A67C52', letterSpacing: '0.20em', marginBottom: 12 }}>{e.num}</div>
            <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 400, fontSize: 22, color: '#fff', margin: '8px 0 16px' }}>{e.titre}</h3>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: 'rgba(255,255,255,0.50)', lineHeight: 1.7 }}>{e.texte}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
