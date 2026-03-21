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
          {"Le programme de parrainage VIVEO Patrimoine est r\u00e9serv\u00e9 aux personnes physiques majeures, clientes ou prospects de VIVEO Patrimoine."}
        </p>
        <p style={pStyle}>
          {"Chaque parrain re\u00e7oit un code personnel unique (format VIVEO-NOM) \u00e0 communiquer \u00e0 ses filleuls lors de la mise en relation. Ce code est le seul moyen de tracer et valider un parrainage \u2014 toute recommandation sans code enregistr\u00e9 ne pourra \u00eatre prise en compte."}
        </p>
        <p style={pStyle}>
          {"Toute recommandation fait l\u2019objet d\u2019une validation pr\u00e9alable par VIVEO Patrimoine. VIVEO Patrimoine se r\u00e9serve le droit de refuser un parrainage si le filleul est d\u00e9j\u00e0 connu de ses services au moment de la mise en relation."}
        </p>
        <p style={pStyle}>
          {"La r\u00e9compense est vers\u00e9e au parrain lorsque le filleul r\u00e9gularise une acquisition par acte authentique. Le montant est de 400\u00a0\u20ac si le parrain est prospect, et de 800\u00a0\u20ac si le parrain est client (acte authentique sign\u00e9). Le versement intervient dans les 2 mois suivant la r\u00e9gularisation de l\u2019acte authentique du filleul."}
        </p>
        <p style={pStyle}>
          {"VIVEO Patrimoine se r\u00e9serve le droit de modifier ou suspendre ce programme \u00e0 tout moment. Les donn\u00e9es collect\u00e9es sont trait\u00e9es conform\u00e9ment au RGPD et utilis\u00e9es exclusivement dans le cadre du programme de parrainage."}
        </p>
        <p style={{ ...pStyle, fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>
          {"VIVEO Patrimoine \u2014 SARL au capital de 5\u00a0000\u00a0\u20ac \u2014 3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue \u2014 SIRET 991 869 900 00019"}
        </p>
      </div>
    </section>
  )
}
