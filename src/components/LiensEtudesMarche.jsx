const ETUDES = [
  { titre: 'March\u00e9 immobilier neuf - INSEE', url: 'https://www.insee.fr/fr/statistiques?theme=104', icon: '\ud83d\udcca', desc: 'Statistiques officielles sur la construction neuve et les prix.' },
  { titre: 'DVF - Donn\u00e9es de valeurs fonci\u00e8res', url: 'https://app.dvf.etalab.gouv.fr/', icon: '\ud83c\udfe0', desc: 'Consultez les prix de vente r\u00e9els dans votre secteur.' },
  { titre: 'Notaires de France - Immobilier', url: 'https://www.notaires.fr/fr/immobilier', icon: '\u2696\ufe0f', desc: 'Indices de prix et tendances du march\u00e9 par les notaires.' },
  { titre: 'SITADEL - Permis de construire', url: 'https://www.statistiques.developpement-durable.gouv.fr/sitadel', icon: '\ud83d\udcc4', desc: 'Base de donn\u00e9es des permis de construire en France.' },
  { titre: 'Observatoire des loyers (ANIL)', url: 'https://www.anil.org/outils/indices-et-chiffres/', icon: '\ud83d\udcb0', desc: 'Indices de r\u00e9f\u00e9rence des loyers et tendances locatives.' },
  { titre: 'F\u00e9d\u00e9ration des Promoteurs Immobiliers', url: 'https://www.fpimmo.fr/', icon: '\ud83c\udfd7\ufe0f', desc: 'Conjoncture et \u00e9tudes du march\u00e9 de la promotion immobili\u00e8re.' },
]

export default function LiensEtudesMarche() {
  return (
    <section style={{ padding: '80px 24px', background: '#FAF9F6' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ width: 32, height: 1, background: '#A67C52' }} />
            <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A67C52' }}>RESSOURCES</span>
            <span style={{ width: 32, height: 1, background: '#A67C52' }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(28px,4vw,42px)', fontWeight: 400, color: '#1A2744', margin: 0 }}>{'\u00c9tudes de march\u00e9'}</h2>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontSize: 15, color: 'rgba(26,39,68,0.6)', marginTop: 12, maxWidth: 600, margin: '12px auto 0' }}>{'Acc\u00e9dez aux donn\u00e9es cl\u00e9s pour comprendre le march\u00e9 immobilier et prendre les meilleures d\u00e9cisions.'}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {ETUDES.map((e, i) => (
            <a key={i} href={e.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', padding: 24, background: '#fff', borderRadius: 12,
              border: '1px solid rgba(0,0,0,0.06)', textDecoration: 'none',
              transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
            onMouseEnter={ev => { ev.currentTarget.style.borderColor = '#A67C52'; ev.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={ev => { ev.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)'; ev.currentTarget.style.transform = 'none' }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{e.icon}</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 15, fontWeight: 700, color: '#1A2744', marginBottom: 6 }}>{e.titre}</div>
              <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: 13, color: 'rgba(26,39,68,0.55)', lineHeight: 1.6 }}>{e.desc}</div>
              <div style={{ marginTop: 12, fontFamily: "'Raleway',sans-serif", fontSize: 12, fontWeight: 600, color: '#A67C52' }}>{'Consulter \u2192'}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
