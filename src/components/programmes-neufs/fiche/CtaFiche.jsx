import { useNavigate } from 'react-router-dom'
const S = {
  box: { background:'#111C33', borderRadius:12, padding:'28px 24px', textAlign:'center' },
  h:   { fontFamily:'Playfair Display,serif', fontSize:20, color:'#fff', fontWeight:400, marginBottom:10, lineHeight:1.3 },
  p:   { fontFamily:'Raleway,sans-serif', fontSize:13, color:'rgba(255,255,255,.5)', marginBottom:24, lineHeight:1.65, maxWidth:280, margin:'0 auto 24px' },
  btn: { display:'block', width:'100%', padding:'15px 24px', background:'linear-gradient(135deg,#A67C52 0%,#C4976A 100%)',
         color:'#fff', border:'none', borderRadius:8, fontFamily:'Raleway,sans-serif', fontSize:14,
         fontWeight:700, letterSpacing:'.07em', cursor:'pointer', transition:'opacity .2s' },
  sep: { margin:'20px auto', width:40, height:1, background:'rgba(255,255,255,.12)', display:'block' },
  tel: { fontFamily:'Raleway,sans-serif', fontSize:12, color:'rgba(255,255,255,.3)' },
  lnk: { color:'#A67C52', textDecoration:'none' },
}
export default function CtaFiche({ prog }) {
  const navigate = useNavigate()
  const handleRdv = () => {
    sessionStorage.setItem('rdv_programme', prog.libelle)
    navigate('/rdv-decouverte')
  }
  return (
    <div style={S.box}>
      <div style={S.h}>Étudier ce programme avec Thomas</div>
      <p style={S.p}>Simulation personnalisée, analyse fiscale complète et stratégie financement inclus — réponse sous 24h.</p>
      <button style={S.btn}
        onMouseEnter={e=>e.currentTarget.style.opacity='.85'}
        onMouseLeave={e=>e.currentTarget.style.opacity='1'}
        onClick={handleRdv}>
        Prendre rendez-vous →
      </button>
      <span style={S.sep}/>
      <div style={S.tel}>ou appelez le <a href="tel:+33967167065" style={S.lnk}>09 67 16 70 65</a></div>
    </div>
  )
}
