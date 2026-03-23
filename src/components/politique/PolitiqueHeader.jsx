import { Link } from 'react-router-dom'

export default function PolitiqueHeader() {
  const navy='#111C33', bronze='#A67C52'
  return (
    <div style={{background:navy,padding:'80px 40px 64px',position:'relative',overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(circle at 20px 20px,rgba(164,124,82,0.08) 1.5px,transparent 0)',backgroundSize:'40px 40px'}}/>
      <div style={{maxWidth:1100,margin:'0 auto',position:'relative'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:48}}>
          <Link to='/' style={{display:'flex',alignItems:'baseline',gap:0,textDecoration:'none'}}>
            <span style={{fontFamily:'Playfair Display,serif',fontSize:22,color:'#fff',fontWeight:400}}>VIVEO</span>
            <span style={{color:bronze,margin:'0 6px',fontSize:18}}>{'.'}</span>
            <span style={{fontFamily:'Raleway,sans-serif',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:bronze,fontWeight:500}}>Patrimoine</span>
          </Link>
          <Link to='/' style={{fontFamily:'Raleway,sans-serif',fontSize:12,color:'rgba(255,255,255,0.6)',textDecoration:'none',letterSpacing:'0.08em',display:'flex',alignItems:'center',gap:6}}>
            <span style={{fontSize:16}}>&larr;</span> Retour au site
          </Link>
        </div>
        <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(164,124,82,0.12)',border:'1px solid rgba(164,124,82,0.3)',borderRadius:20,padding:'6px 14px',marginBottom:24}}>
          <span style={{width:5,height:5,borderRadius:'50%',background:bronze,display:'inline-block'}}/>
          <span style={{fontFamily:'Raleway,sans-serif',fontSize:11,fontWeight:600,letterSpacing:'0.14em',textTransform:'uppercase',color:bronze}}>Vie privée &amp; Données personnelles</span>
        </div>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(36px,5vw,60px)',fontWeight:400,color:'#fff',margin:'0 0 20px',lineHeight:1.15}}>
          Politique de<br/><em>Confidentialité</em>
        </h1>
        <p style={{fontFamily:'Cormorant Garamond,serif',fontStyle:'italic',fontSize:18,color:'rgba(255,255,255,0.6)',maxWidth:680,lineHeight:1.6,margin:'0 0 32px'}}>
          VIVEO Patrimoine s&apos;engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données.
        </p>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          {[['✅ RGPD Conforme','rgba(46,204,113,0.12)','rgba(46,204,113,0.4)'],[' Mise à jour — Mars 2026','rgba(164,124,82,0.1)','rgba(164,124,82,0.3)']].map(([t,bg,bc],i)=>(<span key={i} style={{fontFamily:'Raleway,sans-serif',fontSize:11,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'#fff',background:bg,border:'1px solid '+bc,borderRadius:20,padding:'5px 14px'}}>{t}</span>))}
        </div>
      </div>
    </div>
  )
}
