const STEPS = [
  { num: '01', title: 'Vous d\u00e9posez votre recommandation', desc: 'Formulaire avant tout contact du filleul.' },
  { num: '02', title: 'VIVEO valide votre parrainage', desc: 'Accus\u00e9 de r\u00e9ception sous 48h.' },
  { num: '03', title: 'Votre filleul signe son acte', desc: 'Acte authentique = d\u00e9clencheur.' },
  { num: '04', title: 'Vous recevez votre r\u00e9compense', desc: 'Bon cadeau dans les 2 mois.' }
]

export default function StepsParrainage() {
  return (
    <section style={{ background: '#F7F5F0', padding: 'clamp(60px, 8vw, 100px) clamp(20px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A67C52', fontFamily: "'Raleway', sans-serif" }}>{"COMMENT \u00c7A MARCHE"}</span>
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, color: '#111C33', marginBottom: 40 }}>
          {"Quatre \u00e9tapes simples"}
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
          {STEPS.map(s => (
            <div key={s.num} style={{ background: '#fff', border: '1px solid rgba(17,28,51,0.06)', borderRadius: 16, padding: '32px 24px', position: 'relative' }}>
              <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 48, color: 'rgba(166,124,82,0.15)', position: 'absolute', top: 12, right: 16 }}>{s.num}</span>
              <h3 style={{ fontFamily: "'Raleway', sans-serif", fontSize: 15, fontWeight: 600, color: '#111C33', margin: '0 0 8px', lineHeight: 1.4 }}>{s.title}</h3>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, fontWeight: 300, color: 'rgba(17,28,51,0.55)', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
