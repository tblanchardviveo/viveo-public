import { useState, useEffect } from 'react'
const S = {
  box:  { background:'linear-gradient(160deg,#0D1627 0%,#111C33 100%)', borderRadius:12, padding:'24px' },
  hd:   { display:'flex', alignItems:'center', gap:12, marginBottom:16 },
  ico:  { width:40, height:40, background:'rgba(166,124,82,.2)', borderRadius:10, display:'flex',
          alignItems:'center', justifyContent:'center', fontSize:18, flexShrink:0 },
  titl: { fontFamily:'Playfair Display,serif', fontSize:16, color:'#fff', fontWeight:700 },
  sub:  { fontSize:10, color:'rgba(255,255,255,.35)', fontFamily:'Raleway,sans-serif', letterSpacing:'.05em', marginTop:2 },
  spin: { textAlign:'center', padding:'20px 0' },
  dot:  { display:'inline-block', width:6, height:6, borderRadius:'50%', background:'#A67C52',
          animation:'pulse 1.2s ease-in-out infinite', margin:'0 3px' },
  txt:  { fontFamily:'Raleway,sans-serif', fontSize:14, color:'rgba(255,255,255,.78)', lineHeight:1.75 },
  na:   { color:'rgba(255,255,255,.35)', fontFamily:'Raleway,sans-serif', fontSize:13 },
}
const FALLBACK = 'Analyse fiscale disponible sur rendez-vous'
export default function AnalyseFiscale({ prog, fiscalites, prixMin }) {
  const [texte, setTexte] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!prog) return
    if (!fiscalites.length) { setLoading(false); return }
    const key = import.meta.env.VITE_ANTHROPIC_KEY
    if (!key) { setTexte(FALLBACK); setLoading(false); return }
    const prixStr = prixMin ? Math.round(prixMin).toLocaleString('fr-FR') + ' €' : 'non communiqué'
    const prompt = `Programme immobilier neuf "${prog.libelle}" à ${prog.ville} (${prog.zone_fiscale||'zone non précisée'}). Dispositifs fiscaux disponibles : ${fiscalites.join(', ')}. Prix à partir de ${prixStr}. En 150 mots maximum, rédigez une analyse fiscale concise expliquant quel dispositif est le plus adapté pour un investisseur type et pourquoi, avec un exemple chiffré simplifié (loyer, rendement ou économie fiscale). Ton expert et accessible.`
    fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', 'anthropic-dangerous-direct-browser-access': 'true' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 350, messages: [{ role: 'user', content: prompt }] })
    })
    .then(r => { if (!r.ok) { setTexte(FALLBACK); setLoading(false); return null } return r.json() })
    .then(d => { if (!d) return; setTexte(d.content?.[0]?.text || FALLBACK); setLoading(false) })
    .catch(() => { setTexte(FALLBACK); setLoading(false) })
  }, [prog?.id])

  return (
    <div style={S.box}>
      <style>{`@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
      <div style={S.hd}>
        <div style={S.ico}>✦</div>
        <div>
          <div style={S.titl}>Analyse fiscale VIVEO</div>
          <div style={S.sub}>Généré par Claude AI · À titre indicatif uniquement</div>
        </div>
      </div>
      {loading
        ? <div style={S.spin}><span style={{...S.dot,animationDelay:'0s'}}/><span style={{...S.dot,animationDelay:'.2s'}}/><span style={{...S.dot,animationDelay:'.4s'}}/></div>
        : !fiscalites.length ? <div style={S.na}>Aucun dispositif fiscal renseigné pour ce programme.</div>
        : <div style={S.txt}>{texte}</div>}
    </div>
  )
}
