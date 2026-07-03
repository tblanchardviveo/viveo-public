import { useState } from 'react'
const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : '—'
const surf = n => n && n > 0 ? `${n} m²` : '—'
const prixLot = l => l.prix_ttc_20 || l.prix_ttc_10 || l.prix_ttc_55 || l.prix_ht_immobilier
const FILTERS = ['Tous','1','2','3','4','5+']
const S = {
  box:  { background:'#fff', border:'1px solid #E8E4DC', borderRadius:12, overflow:'hidden' },
  hd:   { padding:'14px 20px', borderBottom:'1px solid #E8E4DC', display:'flex', justifyContent:'space-between',
          alignItems:'center', flexWrap:'wrap', gap:8 },
  titl: { fontFamily:'Playfair Display,serif', fontSize:16, color:'#111C33', fontWeight:700 },
  ftabs:{ display:'flex', gap:4, flexWrap:'wrap' },
  ftb:  a=>({ padding:'4px 10px', borderRadius:6, border:'none', fontFamily:'Raleway,sans-serif', fontSize:11,
              fontWeight:700, cursor:'pointer', background:a?'#111C33':'#F0ECE6', color:a?'#fff':'#6B6B7B' }),
  scrl: { overflowX:'auto' },
  tbl:  { width:'100%', borderCollapse:'collapse', fontSize:13, fontFamily:'Raleway,sans-serif' },
  th:   { padding:'10px 14px', textAlign:'left', background:'#F7F5F1', borderBottom:'2px solid #E8E4DC',
          fontSize:11, fontWeight:700, color:'#6B6B7B', textTransform:'uppercase', letterSpacing:'.05em', whiteSpace:'nowrap' },
  td:   { padding:'10px 14px', borderBottom:'1px solid #F0ECE6', color:'#111C33', verticalAlign:'middle' },
  ptag: { display:'inline-block', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:8,
          background:'#F0ECE6', color:'#6B6B7B', margin:'1px' },
  none: { padding:'40px 20px', textAlign:'center', color:'#9A8A7A', fontFamily:'Raleway,sans-serif', fontSize:13 },
}
const COLS = ['Lot','Type','Surface','Étage','Prix TTC','Dispositifs','Livraison']
export default function TableauLotsFiche({ lots }) {
  const [fp, setFp] = useState('Tous')
  const vis = fp === 'Tous' ? lots
    : fp === '5+' ? lots.filter(l=>l.nb_pieces>=5)
    : lots.filter(l=>l.nb_pieces===Number(fp))
  return (
    <div style={S.box}>
      <div style={S.hd}>
        <span style={S.titl}>Lots disponibles ({vis.length})</span>
        <div style={S.ftabs}>
          {FILTERS.map(p=>(
            <button key={p} style={S.ftb(fp===p)} onClick={()=>setFp(p)}>
              {p === 'Tous' ? 'Tous' : p === '5+' ? '5 P+' : `${p} P`}
            </button>
          ))}
        </div>
      </div>
      <div style={S.scrl}>
        {vis.length === 0
          ? <div style={S.none}>Aucun lot pour ce filtre</div>
          : <table style={S.tbl}>
              <thead><tr>{COLS.map(h=><th key={h} style={S.th}>{h}</th>)}</tr></thead>
              <tbody>
                {vis.map(l=>(
                  <tr key={l.id}>
                    <td style={S.td}><strong>{l.code_lot}</strong></td>
                    <td style={S.td}>{[l.famille,l.nature].filter(Boolean).join(' · ')||'—'}</td>
                    <td style={S.td}>{surf(l.surface_habitable)}</td>
                    <td style={S.td}>{l.etage||'—'}</td>
                    <td style={{...S.td,fontWeight:700,color:'#A67C52'}}>{eur(prixLot(l))}</td>
                    <td style={S.td}>{(l.fiscalites||[]).filter(f=>!f.includes('NON DEFINIE')).map(f=><span key={f} style={S.ptag}>{f}</span>)}</td>
                    <td style={S.td}>{l.date_livraison_label||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>}
      </div>
    </div>
  )
}
