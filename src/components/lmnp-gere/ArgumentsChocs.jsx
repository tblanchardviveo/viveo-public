const eyeLine = { width: 32, height: 1, background: '#A67C52' }
const eyeText = {
  fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11,
  textTransform: 'uppercase', letterSpacing: '0.22em', color: '#A67C52'
}

const args = [
  {
    num: '01', pill: 'R\u00c9CUP\u00c9RATION DE TVA',
    title: '20% du prix r\u00e9cup\u00e9r\u00e9s d\u00e8s la signature.',
    text: "\u00c0 l'acquisition d'un bien en r\u00e9sidence g\u00e9r\u00e9e avec TVA, vous r\u00e9cup\u00e9rez int\u00e9gralement la TVA \u00e0 20% sur le prix de revient. Un bien affich\u00e9 \u00e0 200\u202f000\u20ac TTC vous revient r\u00e9ellement \u00e0 166\u202f667\u20ac HT. Cette r\u00e9cup\u00e9ration est imm\u00e9diate, l\u00e9gale, et d\u00e9finitive d\u00e8s lors que vous conservez le statut LMNP."
  },
  {
    num: '02', pill: 'LOYERS GARANTIS BAIL COMMERCIAL',
    title: 'Appartement vide ou occup\u00e9 \u2014 les loyers tombent.',
    text: "Le bail commercial vous lie au gestionnaire de la r\u00e9sidence \u2014 pas au locataire final. Que votre appartement soit occup\u00e9, en travaux ou entre deux locataires, les loyers vous sont vers\u00e9s \u00e0 date fixe, chaque mois, sans exception. C'est la diff\u00e9rence fondamentale avec l'immobilier classique."
  },
  {
    num: '03', pill: 'REVENUS D\u00c9FISCALIS\u00c9S 20-30 ANS',
    title: 'Vous percevez. Vous ne payez pas d\u2019imp\u00f4t.',
    text: "L'amortissement comptable du bien immobilier et du mobilier cr\u00e9e une charge d\u00e9ductible qui neutralise la quasi-totalit\u00e9 de vos revenus locatifs imposables. R\u00e9sultat : vous percevez des loyers nets d'imp\u00f4t pendant 20 \u00e0 30 ans selon votre situation fiscale."
  }
]

export default function ArgumentsChocs() {
  return (
    <section style={{ background: '#111C33', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        <span style={eyeLine} />
        <span style={eyeText}>{"CE QUE L\u2019IMMOBILIER CLASSIQUE NE PEUT PAS OFFRIR"}</span>
      </div>
      <h2 style={{
        fontFamily: "'Playfair Display',Georgia,serif",
        fontSize: 'clamp(36px,5vw,64px)', fontWeight: 300,
        lineHeight: 1.1, color: '#fff', letterSpacing: '-0.02em', margin: 0
      }}>
        {'Trois avantages.'}<br />
        <em style={{ fontStyle: 'italic', color: '#C4976A' }}>{'Aucun \u00e9quivalent.'}</em>
      </h2>
      <div style={{ marginTop: 64 }}>
        {args.map((a, i) => (
          <div key={i} style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '48px 0', display: 'flex', gap: 80,
            alignItems: 'flex-start', flexWrap: 'wrap'
          }}>
            <div style={{ flex: '0 0 80px' }}>
              <span style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 56, fontWeight: 300, color: 'rgba(166,124,82,0.35)'
              }}>{a.num}</span>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <span style={{
                display: 'inline-block', background: 'rgba(166,124,82,0.12)',
                padding: '6px 16px', borderRadius: 4, marginBottom: 16,
                fontFamily: "'Raleway',sans-serif", fontWeight: 600,
                fontSize: 11, color: '#A67C52', letterSpacing: '0.12em'
              }}>{a.pill}</span>
              <h3 style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: 28, fontWeight: 400, fontStyle: 'italic',
                color: '#fff', margin: '0 0 16px', lineHeight: 1.3
              }}>{a.title}</h3>
              <p style={{
                fontFamily: "'Raleway',sans-serif", fontWeight: 300,
                fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)',
                maxWidth: 540, margin: 0
              }}>{a.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
