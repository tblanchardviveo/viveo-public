const reseaux = [
  '\u2717 Li\u00e9 \u00e0 un ou quelques promoteurs partenaires',
  '\u2717 Commission d\'entr\u00e9e non n\u00e9goci\u00e9e',
  '\u2717 Absent apr\u00e8s la signature',
  '\u2717 Pas de suivi chantier ni de coordination livraison',
  '\u2717 Objectifs commerciaux mensuels \u00e0 atteindre',
  '\u2717 Connaissance th\u00e9orique des programmes'
]

const viveo = [
  '\u2713 Ind\u00e9pendant de tout promoteur',
  '\u2713 27 ans de n\u00e9gociation c\u00f4t\u00e9 promoteur',
  '\u2713 Pr\u00e9sent de la r\u00e9servation \u00e0 la remise des cl\u00e9s',
  '\u2713 Suivi chantier, appels de fonds, livraison',
  '\u2713 Aucun objectif commercial \u2014 seulement le v\u00f4tre',
  '\u2713 Connaissance de l\'int\u00e9rieur des programmes'
]

export default function BanquesV3() {
  return (
    <section data-bg="#111C33" style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ width: 32, height: 1, background: '#A67C52' }} />
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52' }}>{"UNE QUESTION \u00c0 SE POSER"}</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,60px)', color: '#fff', lineHeight: 1.0, margin: 0 }}>
        Votre banquier vous conseille.<br />
                    <em style={{ color: '#C4976A', fontStyle: 'italic' }}>Pour qui travaille-t-il ?</em>
      </h2>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 17, color: 'rgba(255,255,255,0.50)', maxWidth: 560, marginTop: 24, lineHeight: 1.7 }}>
        {"Un conseiller bancaire ou un CGP r\u00e9seau a un contrat avec son employeur. Un catalogue de produits \u00e0 placer. Des objectifs commerciaux mensuels. VIVEO n'a qu'un seul contrat \u2014 celui que vous nous confiez."}
      </p>

      <div style={{ display: 'flex', gap: 2, marginTop: 64, flexWrap: 'wrap' }}>
        {/* LEFT - Reseaux */}
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.03)', borderRadius: '3px 0 0 3px', padding: '40px 36px' }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.25)', marginBottom: 32 }}>{"LES R\u00c9SEAUX BANCAIRES & CGP"}</div>
          {reseaux.map((r, i) => (
            <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: '0 0 8px' }}>{r}</p>
          ))}
        </div>
        {/* RIGHT - VIVEO */}
        <div style={{ flex: 1, background: 'rgba(166,124,82,0.08)', border: '1px solid rgba(166,124,82,0.20)', borderRadius: '0 3px 3px 0', padding: '40px 36px' }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.20em', color: '#C4976A', marginBottom: 32 }}>VIVEO PATRIMOINE</div>
          {viveo.map((v, i) => (
            <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: '0 0 8px' }}>{v}</p>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 40 }}>
        {"Ces diff\u00e9rences ne sont pas des arguments marketing. Ce sont les cons\u00e9quences directes de notre ind\u00e9pendance."}
      </p>
    </section>
  )
}
