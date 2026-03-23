import React from 'react';
const P=[{i:'🎯',t:'Analyse personnalisée',d:'Votre situation fiscale, vos objectifs, votre horizon — tout est étudié ensemble.'},{i:'🔒',t:'100% indépendant',d:'Nous sommes rémunérés par les promoteurs — jamais par vous. Zéro conflit d\u2019intérêt.'},{i:'⚡',t:'Réponse sous 24h',d:'Notre équipe vous rappelle personnellement pour confirmer votre créneau.'}];
const S=[{n:'27',l:'Années d\u2019expertise VEFA'},{n:'0€',l:'Aucun frais de conseil'},{n:"45'",l:'Pour changer de perspective'}];
export default function RdvGauche(){
  return(
    <div style={{background:'#111C33',color:'#F7F5F0',padding:'48px 40px',display:'flex',flexDirection:'column',justifyContent:'space-between',minHeight:'100vh',boxSizing:'border-box'}}>
      <div>
        <a href="/" style={{display:'inline-block',marginBottom:'40px',textDecoration:'none'}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:'24px',fontWeight:700,color:'#F7F5F0',letterSpacing:'0.02em'}}>VIVEO.</span>
        </a>
        <h1 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(24px,2.8vw,36px)',fontWeight:700,lineHeight:1.25,marginBottom:16,color:'#F7F5F0'}}>
          45 minutes pour{' '}
          <em style={{fontStyle:'italic',color:'#C4976A'}}>changer votre vision</em>
          {' '}du patrimoine.
        </h1>
        <p style={{fontFamily:"'Cormorant Garamond','Playfair Display',serif",fontStyle:'italic',fontSize:18,lineHeight:1.6,color:'#B8C4D4',marginBottom:32}}>
          Un échange gratuit, sans engagement, avec un conseiller VIVEO indépendant qui ne travaille que pour vous.
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {P.map((p,i)=>(
            <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start'}}>
              <div style={{background:'rgba(196,151,106,0.15)',borderRadius:10,padding:'9px 11px',fontSize:18,flexShrink:0}}>{p.i}</div>
              <div>
                <div style={{fontFamily:'Playfair Display,serif',fontWeight:600,fontSize:14,marginBottom:3,color:'#F7F5F0'}}>{p.t}</div>
                <div style={{fontSize:12,color:'#8A9BB5',lineHeight:1.5}}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{border:'1px solid rgba(196,151,106,0.3)',borderRadius:12,padding:'20px 24px',display:'flex',justifyContent:'space-around',marginBottom:24}}>
          {S.map((s,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:26,fontWeight:700,color:'#C4976A'}}>{s.n}</div>
              <div style={{fontSize:10,color:'#8A9BB5',marginTop:3,maxWidth:80,lineHeight:1.3}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{borderLeft:'2px solid #C4976A',paddingLeft:16}}>
          <p style={{fontFamily:"'Cormorant Garamond','Playfair Display',serif",fontStyle:'italic',fontSize:14,color:'#B8C4D4',lineHeight:1.6,margin:'0 0 6px'}}>
            « Un premier échange qui m'a tout de suite mis à l'aise. VIVEO a compris ma situation en quelques minutes et m'a proposé une solution que je n'avais pas envisagée. »
          </p>
          <div style={{fontSize:11,color:'#8A9BB5'}}>— Marie-Claire D. · Accompagnée par VIVEO</div>
        </div>
      </div>
    </div>
  );
}