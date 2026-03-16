const cards = [
  { badge: 'LE PLUS ACCESSIBLE', badgeColor: 'bronze', title: 'Universit\u00e9 publique', sub: 'En ville de province', lines: [['Scolarit\u00e9 / an','178 \u20ac'],['Logement / mois','450 \u20ac'],['Vie courante / mois','350 \u20ac'],['Total / mois','800 \u20ac']], total: '9 800', cycles: ['Sur 3 ans (licence) : ~29 400 \u20ac','Sur 5 ans (master) : ~49 000 \u20ac'], dark: false, border: false },
  { badge: 'LA R\u00c9ALIT\u00c9 FRANCILIENNE', badgeColor: 'navy', title: 'Universit\u00e9 publique', sub: '\u00c0 Paris ou petite couronne', lines: [['Scolarit\u00e9 / an','178 \u20ac'],['Logement / mois','850 \u20ac'],['Vie courante / mois','450 \u20ac'],['Total / mois','1 300 \u20ac']], total: '15 600', cycles: ['Sur 3 ans (licence) : ~46 800 \u20ac','Sur 5 ans (master) : ~78 000 \u20ac'], dark: false, border: true },
  { badge: 'LA R\u00c9ALIT\u00c9 DE NOMBREUX PARENTS', badgeColor: 'bronze', title: '\u00c9tablissement priv\u00e9', sub: 'Scolarit\u00e9 priv\u00e9e + d\u00e9part du domicile', note: 'Chiffres r\u00e9els constat\u00e9s', lines: [['Scolarit\u00e9 / an','7 500 \u20ac'],['Logement / mois','550 \u20ac'],['Nourriture / mois','300 \u20ac'],['Transport / mois','100 \u20ac'],['Total / mois','1 550 \u20ac']], total: '19 100', cycles: ['Sur 3 ans : ~57 000 \u20ac','Sur 5 ans : ~95 000 \u20ac'], dark: false, border: true, footnote: 'Sans compter les activit\u00e9s, voyages scolaires, \u00e9quipements informatiques.' },
  { badge: 'LE CHOIX AMBITIEUX', badgeColor: 'bronze', title: '\u00c9cole de commerce / ing\u00e9nieurs', sub: 'Top 20 fran\u00e7ais', lines: [['Scolarit\u00e9 / an','12 000 \u20ac'],['Logement / mois','650 \u20ac'],['Vie courante / mois','400 \u20ac'],['Total / mois','2 250 \u20ac']], total: '27 000', cycles: ['Sur 5 ans : ~135 000 \u20ac'], dark: true, border: false }
]

function Card({ c }) {
  const isDark = c.dark
  const bg = isDark ? '#111C33' : '#fff'
  const txt = isDark ? '#fff' : '#111C33'
  const sub = isDark ? 'rgba(255,255,255,0.50)' : '#999'
  const line = isDark ? 'rgba(255,255,255,0.08)' : '#f0f0f0'
  return (
    <div style={{ background: bg, borderRadius: 3, padding: 32, boxShadow: isDark ? 'none' : '0 4px 24px rgba(17,28,51,0.06)', border: c.border ? (isDark ? 'none' : '2px solid rgba(166,124,82,0.30)') : 'none' }}>
      <span style={{ display: 'inline-block', background: isDark ? 'rgba(166,124,82,0.15)' : 'rgba(166,124,82,0.12)', color: 'var(--bronze)', fontFamily: "'Raleway',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', padding: '5px 12px', borderRadius: 2, marginBottom: 12 }}>{c.badge}</span>
      <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 20, fontWeight: 400, color: txt, marginBottom: 4 }}>{c.title}</h3>
      <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, fontWeight: 300, color: sub, marginBottom: c.note ? 4 : 16 }}>{c.sub}</p>
      {c.note && <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 12, fontWeight: 200, fontStyle: 'italic', color: 'var(--bronze)', marginBottom: 16 }}>{c.note}</p>}
      {c.lines.map(([l,v],i) => <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: `1px solid ${line}`, fontFamily: "'Raleway',sans-serif", fontSize: 14 }}><span style={{ fontWeight: 300, color: sub }}>{l}</span><span style={{ fontWeight: 500, color: l.includes('Total') ? (isDark ? 'var(--bronze-light)' : txt) : txt }}>{v}</span></div>)}
      <div style={{ background: isDark ? 'rgba(166,124,82,0.12)' : '#111C33', padding: '16px 20px', borderRadius: 2, marginTop: 16, border: isDark ? '1px solid rgba(166,124,82,0.25)' : 'none' }}>
        <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 500, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)', marginBottom: 4 }}>{"CO\u00dbT ANNUEL ESTIM\u00c9"}</p>
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, fontWeight: 300, color: '#fff' }}>{c.total} {'\u20ac'}</p>
      </div>
      {c.cycles.map((cy,i) => <p key={i} style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, fontWeight: 300, color: isDark ? 'rgba(255,255,255,0.50)' : '#999', marginTop: i === 0 ? 8 : 2 }}>{cy}</p>)}
      {c.footnote && <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 12, fontWeight: 200, fontStyle: 'italic', color: 'var(--bronze)', marginTop: 12 }}>{c.footnote}</p>}
    </div>
  )
}

export default function CoutEtudes() {
  return (
    <section style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <span style={{ width: 40, height: 1, background: 'var(--bronze)', display: 'block' }} />
          <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)' }}>La vraie facture</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(36px,5vw,60px)', fontWeight: 300, color: '#111C33', lineHeight: 1.15, marginBottom: 24 }}>{"Les frais d'inscription, c'est la partie "}<em style={{ fontStyle: 'italic', color: 'var(--bronze)' }}>{"visible de l'iceberg."}</em></h2>
        <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 17, fontWeight: 300, color: '#666', maxWidth: 580, lineHeight: 1.7, marginBottom: 48 }}>{"En France, les frais universitaires publics sont parmi les plus bas d'Europe. Mais le logement, la vie courante, les fournitures \u2014 c'est l\u00e0 que se joue vraiment la question."}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          {cards.map((c,i) => <Card key={i} c={c} />)}
        </div>
        {/* Encart choc */}
        <div style={{ background: '#1A2744', padding: 40, borderRadius: 3, marginTop: 48, display: 'flex', gap: 48, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '0 0 auto' }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 64, fontWeight: 200, color: 'var(--bronze-light)' }}>100 000</span>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 32, color: 'rgba(255,255,255,0.40)', marginLeft: 4 }}>{"\u20ac"}</span>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.40)', marginTop: 4 }}>{"en moyenne pour une grande \u00e9cole \u00e0 Paris"}</p>
          </div>
          <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.10)' }} />
          <div style={{ flex: 1, minWidth: 260 }}>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 18, fontStyle: 'italic', color: '#fff', lineHeight: 1.6 }}>{"C'est le budget que certains parents doivent mobiliser pour offrir \u00e0 leur enfant les meilleures chances. Sans pr\u00e9paration, ce montant est impossible \u00e0 r\u00e9unir en quelques ann\u00e9es."}</p>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>{"Sources : L'\u00c9tudiant 2025 / Service-public.fr 2025"}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
