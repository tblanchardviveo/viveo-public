const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : '—'
const items = (prog, prixMin, livraisonLabel) => [
  { icon:'⚡', lbl:'Chauffage',        val: prog.type_chauffage || 'Non précisé' },
  { icon:'📍', lbl:'Zone fiscale',     val: prog.zone_fiscale || '—' },
  { icon:'🏢', lbl:'Lots au total',    val: prog.nb_lots_total ? `${prog.nb_lots_total} lots` : '—' },
  { icon:'🟢', lbl:'Lots disponibles', val: `${prog.nb_lots_libres || 0} lots libres` },
  { icon:'💰', lbl:'Prix à partir de', val: prixMin ? eur(prixMin) : '—' },
  { icon:'📅', lbl:'1ère livraison',   val: livraisonLabel || '—' },
]
const S = {
  box:  { background:'#fff', border:'1px solid #E8E4DC', borderRadius:12, padding:'20px' },
  hd:   { fontFamily:'Playfair Display,serif', fontSize:16, color:'#111C33', fontWeight:700, marginBottom:16,
          paddingBottom:12, borderBottom:'1px solid #F0ECE6' },
  list: { display:'flex', flexDirection:'column', gap:12 },
  item: { display:'flex', alignItems:'center', gap:12 },
  ico:  { width:36, height:36, background:'#F7F5F1', borderRadius:8, display:'flex', alignItems:'center',
          justifyContent:'center', fontSize:16, flexShrink:0 },
  lbl:  { fontSize:10, fontWeight:700, color:'#9A8A7A', textTransform:'uppercase', letterSpacing:'.07em',
          fontFamily:'Raleway,sans-serif', marginBottom:2 },
  val:  { fontSize:13, color:'#111C33', fontFamily:'Raleway,sans-serif', fontWeight:600 },
}
export default function PointsFortsFiche({ prog, prixMin, livraisonLabel }) {
  return (
    <div style={S.box}>
      <div style={S.hd}>Points clés</div>
      <div style={S.list}>
        {items(prog, prixMin, livraisonLabel).map(it => (
          <div key={it.lbl} style={S.item}>
            <div style={S.ico}>{it.icon}</div>
            <div><div style={S.lbl}>{it.lbl}</div><div style={S.val}>{it.val}</div></div>
          </div>
        ))}
      </div>
    </div>
  )
}
