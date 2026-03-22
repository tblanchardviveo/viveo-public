const pStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 300,
  color: 'rgba(255,255,255,0.40)', lineHeight: 1.8, margin: '0 0 16px'
}

export default function MentionsLegalesParrainage() {
  return (
    <section style={{ background: 'var(--navy-deep)', padding: '48px clamp(20px, 4vw, 40px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '0 0 20px' }}>
          {"Conditions du programme de parrainage"}
        </h3>
        <p style={pStyle}>
          {"Le programme de parrainage VIVEO Patrimoine est réservé aux personnes physiques majeures, clientes ou prospects de VIVEO Patrimoine."}
        </p>
        <p style={pStyle}>
          {"Chaque parrain reçoit un code personnel unique (format VIVEO-NOM) à communiquer à ses filleuls lors de la mise en relation. Ce code est le seul moyen de tracer et valider un parrainage — toute recommandation sans code enregistré ne pourra être prise en compte."}
        </p>
        <p style={pStyle}>
          {"Toute recommandation fait l’objet d’une validation préalable par VIVEO Patrimoine. VIVEO Patrimoine se réserve le droit de refuser un parrainage si le filleul est déjà connu de ses services au moment de la mise en relation."}
        </p>
        <p style={pStyle}>
          {"La récompense est versée au parrain lorsque le filleul régularise une acquisition par acte authentique. Le montant est de 400 € si le parrain est prospect, et de 800 € si le parrain est client (acte authentique signé). Le versement intervient dans les 2 mois suivant la régularisation de l’acte authentique du filleul."}
        </p>
        <p style={pStyle}>
          {"VIVEO Patrimoine se réserve le droit de modifier ou suspendre ce programme à tout moment. Les données collectées sont traitées conformément au RGPD et utilisées exclusivement dans le cadre du programme de parrainage."}
        </p>
        <p style={{ ...pStyle, fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>
          {"VIVEO Patrimoine — SARL au capital de 5 000 € — 3 bis rue du Général de Gaulle, 59253 La Gorgue — SIRET 991 869 900 00019"}
        </p>
      </div>
    </section>
  )
}
