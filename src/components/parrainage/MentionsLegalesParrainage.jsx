const pStyle = { fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.40)', lineHeight: 1.8, margin: '0 0 16px' }
const hStyle = { fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 600, color: '#C4976A', margin: '24px 0 8px' }

const ARTICLES = [
  ['Mise en place', 'VIVEO Patrimoine se r\u00e9serve le droit de modifier ou suspendre ce programme, sans porter pr\u00e9judice aux parrainages d\u00e9j\u00e0 valid\u00e9s.'],
  ['Conditions d\u2019\u00e9ligibilit\u00e9 du parrain', 'Ouvert \u00e0 toute personne physique majeure connue de VIVEO Patrimoine en qualit\u00e9 de prospect (sans acte authentique sign\u00e9) ou de client (acte authentique sign\u00e9).'],
  ['Conditions d\u2019\u00e9ligibilit\u00e9 du filleul', 'Le filleul doit \u00eatre totalement inconnu de VIVEO Patrimoine au moment de la d\u00e9claration. Un filleul d\u00e9j\u00e0 r\u00e9f\u00e9renc\u00e9 ne peut faire l\u2019objet d\u2019un parrainage.'],
  ['D\u00e9claration et validation pr\u00e9alable', 'Le parrain d\u00e9clare son filleul via le formulaire en ligne AVANT tout premier contact du filleul avec VIVEO Patrimoine. Le parrainage ne peut pas \u00eatre r\u00e9troactif. Toute recommandation fait l\u2019objet d\u2019une validation pr\u00e9alable par VIVEO Patrimoine. Accus\u00e9 de r\u00e9ception sous 48h. VIVEO Patrimoine se r\u00e9serve le droit de refuser un parrainage si les conditions ne sont pas remplies.'],
  ['Conflit de parrain', 'Si deux personnes d\u00e9clarent le m\u00eame filleul, la r\u00e9compense est attribu\u00e9e au parrain dont la d\u00e9claration a \u00e9t\u00e9 enregistr\u00e9e en premier.'],
  ['D\u00e9clencheur de la r\u00e9compense', 'La r\u00e9compense est due uniquement \u00e0 la signature de l\u2019acte authentique d\u2019acquisition par le filleul. La signature d\u2019un contrat de r\u00e9servation ne constitue pas un d\u00e9clencheur suffisant.'],
  ['Montant et versement de la r\u00e9compense', 'Parrain prospect VIVEO\u00a0: 400\u00a0\u20ac \u2014 Parrain client VIVEO\u00a0: 800\u00a0\u20ac. Versement sous forme de bon cadeau ou toute modalit\u00e9 d\u00e9finie par VIVEO Patrimoine, dans les 2 mois suivant la r\u00e9gularisation de l\u2019acte authentique par le filleul.'],
  ['Nombre de parrainages', 'Limit\u00e9 \u00e0 3 par ann\u00e9e civile, dans la limite d\u2019un plafond de 2\u00a0000\u00a0\u20ac par an et par parrain.'],
  ['Auto-parrainage', 'Strictement interdit. Toute tentative entra\u00eene l\u2019annulation du parrainage.'],
  ['Fiscalit\u00e9', 'La r\u00e9compense est susceptible d\u2019\u00eatre assujettie \u00e0 l\u2019imp\u00f4t sur le revenu. Il appartient au parrain de la d\u00e9clarer. VIVEO Patrimoine ne peut \u00eatre tenu responsable des obligations fiscales du parrain.'],
  ['Donn\u00e9es personnelles', 'Donn\u00e9es trait\u00e9es conform\u00e9ment au RGPD, utilis\u00e9es exclusivement dans le cadre de ce programme. Contact\u00a0: contact@viveo-patrimoine.fr']
]

export default function MentionsLegalesParrainage() {
  return (
    <section style={{ background: '#111C33', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 400, color: '#fff', marginBottom: 4 }}>
          {"R\u00e8glement du programme de parrainage"}
        </h2>
        <p style={{ ...pStyle, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>Version du 20 mars 2026</p>
        {ARTICLES.map(([title, text], i) => (
          <div key={i}>
            <h3 style={hStyle}>{`Article ${i + 1} \u2014 ${title}`}</h3>
            <p style={pStyle}>{text}</p>
          </div>
        ))}
        <p style={{ ...pStyle, fontSize: 11, color: 'rgba(255,255,255,0.20)', marginTop: 40, textAlign: 'center' }}>
          {"VIVEO Patrimoine \u2014 SARL au capital de 5\u00a0000\u00a0\u20ac \u2014 3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue \u2014 SIRET 991 869 900 00019"}
        </p>
      </div>
    </section>
  )
}
