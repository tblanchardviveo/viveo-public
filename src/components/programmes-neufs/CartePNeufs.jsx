const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : null
const initiales = s => s.split(/\s+/).filter(w=>/^[A-Za-z\u00C0-\u024F]/.test(w)).slice(0,2).map(w=>w[0].toUpperCase()).join('')
const FC = { LMNP:{color:'#7EC8E3',bg:'rgba(126,200,227,.15)'}, JEAN:{color:'#C4A8E0',bg:'rgba(196,168,224,.15)'},
             LLI:{color:'#7ED4A8',bg:'rgba(126,212,168,.15)'}, DEFI:{color:'#E0C490',bg:'rgba(224,196,144,.15)'} }
const fStyle = f => { const k=Object.keys(FC).find(k=>f.toUpperCase().includes(k)); const c=FC[k]||{color:'rgba(255,255,255,.5)',bg:'rgba(255,255,255,.08)'}; return {fontSize:10,fontWeight:700,fontFamily:'Raleway,sans-serif',padding:'2px 8px',borderRadius:12,color:c.color,background:c.bg} }
const S = {
  card: { background:'#fff',border:'1px solid #E8E4DC',borderRadius:12,overflow:'hidden',cursor:'pointer',
          transition:'box-shadow .2s,transform .2s',display:'flex',flexDirection:'column' },
  photo:{ height:160,background:'linear-gradient(135deg,#111C33 0%,#1A2B4A 100%)',display:'flex',alignItems:'center',justifyContent:'center' },
  init: { fontFamily:'Playfair Display,serif',fontSize:52,color:'#A67C52',fontWeight:400,letterSpacing:6,opacity:.7 },
  body: { padding:'16px 20px',flex:1,display:'flex',flexDirection:'column',gap:8 },
  lib:  { fontFamily:'Playfair Display,serif',fontSize:15,color:'#111C33',fontWeight:700,lineHeight:1.3 },
  loc:  { fontFamily:'Raleway,sans-serif',fontSize:12,color:'#6B6B7B' },
  row:  { display:'flex',justifyContent:'space-between',alignItems:'center',gap:8,marginTop:4,flexWrap:'wrap' },
  prix: { fontFamily:'Playfair Display,serif',fontSize:15,color:'#A67C52',fontWeight:700 },
  lots: { fontSize:11,fontFamily:'Raleway,sans-serif',color:'#2D7D52',fontWeight:700,background:'#2D7D5218',padding:'2px 8px',borderRadius:10,whiteSpace:'nowrap' },
  zone: { fontSize:10,fontFamily:'Raleway,sans-serif',color:'#6B6B7B',background:'#F0ECE6',padding:'2px 8px',borderRadius:8,display:'inline-block' },
  tags: { display:'flex',flexWrap:'wrap',gap:4,marginTop:2 },
  cta:  { margin:'8px 20px 16px',padding:'9px',background:'#111C33',color:'#fff',borderRadius:8,border:'none',
          cursor:'pointer',fontFamily:'Raleway,sans-serif',fontSize:11,fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase' },
}
export default function CartePNeufs({ prog, onSelect }) {
  return (
    <div style={S.card}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow='0 8px 32px rgba(17,28,51,.12)';e.currentTarget.style.transform='translateY(-2px)'}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow='none';e.currentTarget.style.transform='none'}}>
      <div style={S.photo}>
        <span style={S.init}>{initiales(prog.libelle)}</span>
      </div>
      <div style={S.body}>
        <div style={S.lib}>{prog.libelle}</div>
        <div style={S.loc}>{prog.ville} · {prog.code_postal}</div>
        <div style={S.row}>
          {prog.prixMin
            ? <span style={S.prix}>À partir de {eur(prog.prixMin)}</span>
            : <span style={{...S.loc,fontStyle:'italic'}}>Prix sur demande</span>}
          <span style={S.lots}>{prog.nb_lots_libres} lot{prog.nb_lots_libres>1?'s':''} libre{prog.nb_lots_libres>1?'s':''}</span>
        </div>
        {prog.zone_fiscale && <span style={S.zone}>{prog.zone_fiscale}</span>}
        {(prog.fiscalites||[]).length>0 && <div style={S.tags}>{prog.fiscalites.slice(0,3).map(f=><span key={f} style={fStyle(f)}>{f}</span>)}</div>}
      </div>
      <button style={S.cta} onClick={onSelect}>Voir le programme →</button>
    </div>
  )
}
