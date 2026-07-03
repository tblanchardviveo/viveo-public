const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : null
const FC = { LMNP:{c:'#7EC8E3',b:'rgba(126,200,227,.18)'}, JEAN:{c:'#C4A8E0',b:'rgba(196,168,224,.18)'},
             LLI:{c:'#7ED4A8',b:'rgba(126,212,168,.18)'}, DEFI:{c:'#E0C490',b:'rgba(224,196,144,.18)'},
             DEFAULT:{c:'rgba(255,255,255,.6)',b:'rgba(255,255,255,.1)'} }
const fc = f => { const k=Object.keys(FC).find(k=>k!=='DEFAULT'&&f.toUpperCase().includes(k)); return FC[k]||FC.DEFAULT }
const S = {
  hd:   { background:'linear-gradient(160deg,#0D1627 0%,#111C33 60%,#162240 100%)', padding:'52px 24px 44px' },
  in:   { maxWidth:1100, margin:'0 auto' },
  eyeb: { display:'flex', alignItems:'center', gap:8, marginBottom:18 },
  bar:  { width:28, height:1, background:'#A67C52', display:'block', flexShrink:0 },
  eye:  { fontSize:10, fontWeight:700, letterSpacing:'.18em', textTransform:'uppercase', color:'#A67C52', fontFamily:'Raleway,sans-serif' },
  h1:   { fontFamily:'Playfair Display,serif', fontSize:'clamp(24px,3.5vw,40px)', color:'#fff', fontWeight:400, marginBottom:10, lineHeight:1.2 },
  loc:  { fontFamily:'Raleway,sans-serif', fontSize:14, color:'rgba(255,255,255,.5)', marginBottom:24 },
  row:  { display:'flex', flexWrap:'wrap', gap:24, alignItems:'flex-end', marginBottom:24 },
  prix: { fontFamily:'Playfair Display,serif', fontSize:32, color:'#A67C52', fontWeight:700, lineHeight:1 },
  psub: { fontSize:10, color:'rgba(255,255,255,.4)', fontFamily:'Raleway,sans-serif', textTransform:'uppercase', letterSpacing:'.08em', marginTop:4 },
  livr: { fontFamily:'Raleway,sans-serif', fontSize:13, color:'rgba(255,255,255,.6)', background:'rgba(255,255,255,.06)', padding:'8px 14px', borderRadius:8 },
  tags: { display:'flex', flexWrap:'wrap', gap:6 },
  tag:  c => ({ fontSize:11, fontWeight:700, fontFamily:'Raleway,sans-serif', padding:'4px 12px', borderRadius:20,
    color:c.c, background:c.b, border:`1px solid ${c.c}40` }),
}
export default function HeaderFiche({ prog, prixMin, fiscalites, livraisonLabel }) {
  return (
    <div style={S.hd}>
      <div style={S.in}>
        <div style={S.eyeb}><span style={S.bar}/><span style={S.eye}>Programme Nexity · {prog.region||prog.ville}</span></div>
        <h1 style={S.h1}>{prog.libelle}</h1>
        <div style={S.loc}>{prog.ville} · {prog.code_postal}{prog.zone_fiscale ? ` · ${prog.zone_fiscale}` : ''}</div>
        <div style={S.row}>
          {prixMin && (
            <div>
              <div style={S.prix}>{eur(prixMin)}</div>
              <div style={S.psub}>À partir de · HT immobilier</div>
            </div>
          )}
          {livraisonLabel && (
            <div style={S.livr}>📅 Livraison estimée : <strong style={{color:'#fff'}}>{livraisonLabel}</strong></div>
          )}
        </div>
        {fiscalites.length > 0 && (
          <div style={S.tags}>{fiscalites.map(f=><span key={f} style={S.tag(fc(f))}>{f}</span>)}</div>
        )}
      </div>
    </div>
  )
}
