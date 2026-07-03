import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const eur = n => n ? new Intl.NumberFormat('fr-FR',{style:'currency',currency:'EUR',maximumFractionDigits:0}).format(n) : '—'
const surf = n => n && n > 0 ? `${n} m²` : '—'

const S = {
  overlay: { position:'fixed', inset:0, background:'rgba(17,28,51,0.6)', zIndex:1000, display:'flex',
    alignItems:'center', justifyContent:'center', padding:'20px' },
  box:     { background:'#fff', borderRadius:12, maxWidth:900, width:'100%', maxHeight:'90vh',
    display:'flex', flexDirection:'column', overflow:'hidden', boxShadow:'0 24px 80px rgba(17,28,51,.3)' },
  hd:      { background:'#111C33', padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'flex-start' },
  titre:   { fontFamily:'Playfair Display,serif', fontSize:20, color:'#fff', fontWeight:700, marginBottom:4 },
  sous:    { fontFamily:'Raleway,sans-serif', fontSize:13, color:'rgba(255,255,255,0.55)' },
  close:   { background:'none', border:'none', color:'rgba(255,255,255,0.6)', fontSize:22, cursor:'pointer', lineHeight:1 },
  scroll:  { flex:1, overflowY:'auto', padding:'0 0 8px' },
  table:   { width:'100%', borderCollapse:'collapse', fontSize:13, fontFamily:'Raleway,sans-serif' },
  th:      { padding:'10px 16px', textAlign:'left', background:'#F7F5F1', borderBottom:'2px solid #E8E4DC',
    fontSize:11, fontWeight:700, color:'#6B6B7B', textTransform:'uppercase', letterSpacing:'.05em' },
  td:      { padding:'10px 16px', borderBottom:'1px solid #F0ECE6', color:'#111C33', verticalAlign:'middle' },
  empty:   { padding:48, textAlign:'center', color:'#9A8A7A', fontFamily:'Raleway,sans-serif', fontSize:13 },
  foot:    { padding:'16px 28px', borderTop:'1px solid #E8E4DC', background:'#F7F5F1', display:'flex',
    justifyContent:'flex-end', gap:12, alignItems:'center' },
  cta:     { padding:'12px 28px', background:'linear-gradient(135deg,#A67C52,#C4976A)', color:'#fff',
    border:'none', borderRadius:8, fontFamily:'Raleway,sans-serif', fontSize:13, fontWeight:700,
    letterSpacing:'.06em', cursor:'pointer' },
  cancel:  { padding:'12px 20px', background:'none', border:'1px solid #D4C8B8', borderRadius:8,
    fontFamily:'Raleway,sans-serif', fontSize:13, color:'#6B6B7B', cursor:'pointer' },
  tag:     { display:'inline-block', fontSize:10, fontWeight:700, padding:'2px 7px', borderRadius:8,
    background:'#F0ECE6', color:'#6B6B7B', margin:'1px' },
}
const COLS = ['Surface','Pièces','Prix HT','Fiscalités','Livraison']

export default function ModalPNeufs({ prog, lots, loading, onClose }) {
  const navigate = useNavigate()
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const libres = lots.filter(l => l.statut === 'libre')

  const handleRdv = () => {
    sessionStorage.setItem('rdv_programme', prog.libelle)
    navigate('/rdv-decouverte')
  }

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.box}>
        <div style={S.hd}>
          <div>
            <div style={S.titre}>{prog.libelle}</div>
            <div style={S.sous}>{prog.ville} · {prog.code_postal} · {prog.zone_fiscale}</div>
          </div>
          <button style={S.close} onClick={onClose}>✕</button>
        </div>
        <div style={S.scroll}>
          {loading ? (
            <p style={S.empty}>Chargement des lots...</p>
          ) : libres.length === 0 ? (
            <p style={S.empty}>Aucun lot libre disponible</p>
          ) : (
            <table style={S.table}>
              <thead>
                <tr>{COLS.map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {libres.map(l => (
                  <tr key={l.id}>
                    <td style={S.td}>{surf(l.surface_habitable)}</td>
                    <td style={S.td}>{l.nb_pieces ? `${l.nb_pieces}P` : '—'}</td>
                    <td style={{ ...S.td, fontWeight:700, color:'#A67C52' }}>{eur(l.prix_ht_immobilier)}</td>
                    <td style={S.td}>{(l.fiscalites||[]).filter(f=>!f.includes('NON DEFINIE')).map(f=><span key={f} style={S.tag}>{f}</span>)}</td>
                    <td style={S.td}>{l.date_livraison_label||'—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div style={S.foot}>
          <button style={S.cancel} onClick={onClose}>Fermer</button>
          <button style={S.cta} onClick={handleRdv}>Je suis intéressé →</button>
        </div>
      </div>
    </div>
  )
}
