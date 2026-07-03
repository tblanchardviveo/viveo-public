const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : null
const FISCA_COLORS = {
  'LMNP/LMP':       { color:'#1B5E7B', bg:'#1B5E7B18' },
  'JEANBRUN':       { color:'#5B3B8C', bg:'#5B3B8C18' },
  'LLI TVA 10%':   { color:'#2D7D52', bg:'#2D7D5218' },
  'DEFICIT FONCIER':{ color:'#A67C52', bg:'#A67C5218' },
}
const S = {
  card: { background:'#fff', border:'1px solid #E8E4DC', borderRadius:10, overflow:'hidden',
    cursor:'pointer', transition:'box-shadow .2s,transform .2s', display:'flex', flexDirection:'column' },
  hd:   { background:'#111C33', padding:'20px 20px 14px' },
  lib:  { fontFamily:'Playfair Display,Georgia,serif', fontSize:16, color:'#fff', fontWeight:700,
    marginBottom:4, lineHeight:1.3 },
  loc:  { fontFamily:'Raleway,sans-serif', fontSize:12, color:'rgba(255,255,255,0.55)' },
  body: { padding:'14px 20px', flex:1, display:'flex', flexDirection:'column', gap:10 },
  row:  { display:'flex', justifyContent:'space-between', alignItems:'center' },
  prix: { fontFamily:'Playfair Display,serif', fontSize:18, color:'#A67C52', fontWeight:700 },
  sub:  { fontSize:10, color:'#9A8A7A', fontFamily:'Raleway,sans-serif', textTransform:'uppercase', letterSpacing:'.06em' },
  lots: { fontSize:12, fontFamily:'Raleway,sans-serif', color:'#2D7D52', fontWeight:700, background:'#2D7D5218',
    padding:'3px 10px', borderRadius:10 },
  zone: { fontSize:11, fontFamily:'Raleway,sans-serif', color:'#6B6B7B', background:'#F0ECE6', padding:'2px 8px', borderRadius:8 },
  tags: { display:'flex', flexWrap:'wrap', gap:4, marginTop:2 },
  tag:  c => ({ fontSize:10, fontWeight:700, fontFamily:'Raleway,sans-serif', padding:'2px 8px', borderRadius:8,
    color: c?.color||'#6B6B7B', background: c?.bg||'#eee' }),
  cta:  { margin:'0 20px 16px', padding:'10px', background:'#111C33', color:'#fff', borderRadius:7,
    border:'none', cursor:'pointer', fontFamily:'Raleway,sans-serif', fontSize:12, fontWeight:700,
    letterSpacing:'.06em', textTransform:'uppercase', transition:'background .2s' },
}

export default function CartePNeufs({ prog, onSelect }) {
  const prixText = prog.prixMin ? `À partir de ${eur(prog.prixMin)}` : null
  const fiscas = prog.fiscalites || []
  return (
    <div style={S.card}
      onMouseEnter={e => { e.currentTarget.style.boxShadow='0 8px 32px rgba(17,28,51,.12)'; e.currentTarget.style.transform='translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='none' }}>
      <div style={S.hd}>
        <div style={S.lib}>{prog.libelle}</div>
        <div style={S.loc}>{prog.ville} · {prog.code_postal}</div>
      </div>
      <div style={S.body}>
        <div style={S.row}>
          {prixText ? <div><div style={S.prix}>{prixText}</div><div style={S.sub}>HT immobilier</div></div> : <span style={{color:'#9A8A7A',fontSize:13}}>Prix non communiqué</span>}
          <span style={S.lots}>{prog.nb_lots_libres} lot{prog.nb_lots_libres>1?'s':''} libre{prog.nb_lots_libres>1?'s':''}</span>
        </div>
        {prog.zone_fiscale && <span style={S.zone}>{prog.zone_fiscale}</span>}
        {fiscas.length > 0 && (
          <div style={S.tags}>
            {fiscas.slice(0,4).map(f => {
              const norm = Object.keys(FISCA_COLORS).find(k => f.includes(k.split('/')[0]))
              return <span key={f} style={S.tag(FISCA_COLORS[norm])}>{f.replace('NON DEFINIE 20%','TVA 20%')}</span>
            })}
          </div>
        )}
      </div>
      <button style={S.cta} onClick={() => onSelect(prog)}>Voir les lots →</button>
    </div>
  )
}
