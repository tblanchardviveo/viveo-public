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
          {"Le programme de parrainage VIVEO Patrimoine est r\u00e9serv\u00e9 aux personnes physiques majeures. Le parrain doit \u00eatre un ancien client ou prospect de VIVEO Patrimoine."}
        </p>
        <p style={pStyle}>
          {"La prime de 400\u00a0\u20ac est vers\u00e9e au parrain lorsque le filleul signe un contrat de r\u00e9servation suite \u00e0 la mise en relation. La prime de 800\u00a0\u20ac s\u2019applique lorsque le parrain est d\u00e9j\u00e0 client (acte authentique sign\u00e9). Le versement intervient dans les 30\u00a0jours suivant la signature du contrat de r\u00e9servation du filleul."}
        </p>
        <p style={pStyle}>
          {"VIVEO Patrimoine se r\u00e9serve le droit de modifier ou suspendre ce programme \u00e0 tout moment. Les donn\u00e9es collect\u00e9es via ce formulaire sont trait\u00e9es conform\u00e9ment au RGPD et utilis\u00e9es exclusivement dans le cadre du programme de parrainage."}
        </p>
        <p style={{ ...pStyle, fontSize: 11, color: 'rgba(255,255,255,0.20)' }}>
          {"VIVEO Patrimoine \u2014 SAS au capital de 1\u00a0000\u00a0\u20ac \u2014 3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue \u2014 SIRET 123 456 789 00012"}
        </p>
      </div>
    </section>
  )
}
