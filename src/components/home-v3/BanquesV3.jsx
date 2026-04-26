const reseaux = [
  '✗ Lié à un ou quelques promoteurs partenaires',
  '✗ Commission d\'entrée non négociée',
  '✗ Absent après la signature',
  '✗ Pas de suivi chantier ni de coordination livraison',
  '✗ Objectifs commerciaux mensuels à atteindre',
  '✗ Connaissance théorique des programmes'
]

const viveo = [
  '✓ Indépendant de tout promoteur',
  '✓ 27 ans de négociation côté promoteur',
  '✓ Présent de la réservation à la remise des clés',
  '✓ Suivi chantier, appels de fonds, livraison',
  '✓ Aucun objectif commercial — seulement le vôtre',
  '✓ Connaissance de l\'intérieur des programmes'
]

export default function BanquesV3() {
  return (
    <section data-bg="#111C33" style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ width: 32, height: 1, background: '#A67C52' }} />
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52' }}>{"UNE QUESTION À SE POSER"}</span>
      </div>

      <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(32px,4.5vw,60px)', color: '#fff', lineHeight: 1.0, margin: 0 }}>
        Votre banquier vous conseille.<br />
                    <em style={{ color: '#C4976A', fontStyle: 'italic' }}>Pour qui travaille-t-il ?</em>
      </h2>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 17, color: 'rgba(255,255,255,0.50)', maxWidth: 560, marginTop: 24, lineHeight: 1.7 }}>
        {"Un conseiller bancaire ou un CGP réseau a un contrat avec son employeur. Un catalogue de produits à placer. Des objectifs commerciaux mensuels. VIVEO n'a qu'un seul contrat — celui que vous nous confiez."}
      </p>

      <div style={{ display: 'flex', gap: 2, marginTop: 64, flexWrap: 'wrap' }}>
        {/* LEFT - Reseaux */}
        <div style={{ flex: 1, minWidth: 280, background: 'rgba(255,255,255,0.03)', borderRadius: '3px 0 0 3px', padding: '40px 36px' }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.25)', marginBottom: 32 }}>{"LES RÉSEAUX BANCAIRES & CGP"}</div>
          {reseaux.map((r, i) => (
            <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, margin: '0 0 8px' }}>{r}</p>
          ))}
        </div>
        {/* RIGHT - VIVEO */}
        <div style={{ flex: 1, minWidth: 280, background: 'rgba(166,124,82,0.08)', border: '1px solid rgba(166,124,82,0.20)', borderRadius: '0 3px 3px 0', padding: '40px 36px' }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.20em', color: '#C4976A', marginBottom: 32 }}>VIVEO PATRIMOINE</div>
          {viveo.map((v, i) => (
            <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 15, color: 'rgba(255,255,255,0.80)', lineHeight: 1.7, margin: '0 0 8px' }}>{v}</p>
          ))}
        </div>
      </div>

      <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontStyle: 'italic', fontSize: 13, color: 'rgba(255,255,255,0.25)', marginTop: 40 }}>
        {"Ces différences ne sont pas des arguments marketing. Ce sont les conséquences directes de notre indépendance."}
      </p>
    </section>
  )
}
