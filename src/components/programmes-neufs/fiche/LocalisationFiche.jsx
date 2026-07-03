const S = {
  box:  { background:'#fff', border:'1px solid #E8E4DC', borderRadius:12, overflow:'hidden' },
  hd:   { padding:'14px 20px', borderBottom:'1px solid #E8E4DC', fontFamily:'Playfair Display,serif',
          fontSize:16, color:'#111C33', fontWeight:700 },
  none: { height:200, display:'flex', alignItems:'center', justifyContent:'center',
          color:'#9A8A7A', fontFamily:'Raleway,sans-serif', fontSize:13 },
  map:  { width:'100%', height:320, border:'none', display:'block' },
}
export default function LocalisationFiche({ prog }) {
  const { latitude:lat, longitude:lon, libelle } = prog
  if (!lat || !lon) return (
    <div style={S.box}>
      <div style={S.hd}>Localisation</div>
      <div style={S.none}>Coordonnées non disponibles</div>
    </div>
  )
  const d = 0.025
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon-d},${lat-d},${lon+d},${lat+d}&layer=mapnik&marker=${lat},${lon}`
  return (
    <div style={S.box}>
      <div style={S.hd}>Localisation · {prog.ville}</div>
      <iframe src={src} style={S.map} title={`Localisation ${libelle}`} loading="lazy" />
    </div>
  )
}
