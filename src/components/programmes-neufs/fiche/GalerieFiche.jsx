const LAYOUT = [
  { gridColumn:'1/3', gridRow:'1' },
  { gridColumn:'3',   gridRow:'1' },
  { gridColumn:'1',   gridRow:'2' },
  { gridColumn:'2/4', gridRow:'2' },
]
const S = {
  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gridTemplateRows:'220px 160px',
          gap:6, borderRadius:14, overflow:'hidden', margin:'28px 0 0' },
  ph:   { background:'linear-gradient(135deg,#111C33 0%,#162240 100%)', display:'flex',
          flexDirection:'column', alignItems:'center', justifyContent:'center', gap:10 },
  icon: { fontSize:28, opacity:.25 },
  txt:  { fontFamily:'Raleway,sans-serif', fontSize:10, color:'rgba(255,255,255,.25)',
          textTransform:'uppercase', letterSpacing:'.12em', textAlign:'center', padding:'0 16px' },
}
export default function GalerieFiche() {
  return (
    <div style={S.grid}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{...S.ph,...LAYOUT[i]}}>
          <span style={S.icon}>📷</span>
          <span style={S.txt}>Photo disponible prochainement</span>
        </div>
      ))}
    </div>
  )
}
