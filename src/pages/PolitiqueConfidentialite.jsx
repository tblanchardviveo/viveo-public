import { useEffect } from 'react'

export default function PolitiqueConfidentialite() {
  useEffect(() => { window.scrollTo(0,0) }, [])
  const S = {
    page:{background:'#F7F5F0',minHeight:'100vh'},
    header:{background:'#111C33',padding:'48px 80px'},
    logo:{fontFamily:'Playfair Display,serif',fontSize:22,fontWeight:700,color:'#fff',letterSpacing:'.06em'},
    logoSpan:{color:'#C4976A'},
    sub:{fontSize:10,color:'rgba(255,255,255,.3)',letterSpacing:'.18em',textTransform:'uppercase',marginTop:4},
    container:{maxWidth:800,margin:'0 auto',padding:'56px 40px'},
    h1:{fontFamily:'Playfair Display,serif',fontSize:32,fontWeight:700,color:'#111C33',marginBottom:8},
    intro:{fontSize:14,color:'#7A7A8A',lineHeight:1.75,marginBottom:48,paddingBottom:32,borderBottom:'1px solid #E8E0D5'},
    art:{marginBottom:40,paddingBottom:40,borderBottom:'1px solid #E8E0D5'},
    artNum:{fontSize:10,fontWeight:700,color:'#A67C52',letterSpacing:'.16em',textTransform:'uppercase',marginBottom:8},
    artTitle:{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:700,color:'#111C33',marginBottom:12},
    artBody:{fontSize:14,color:'#3A3A4A',lineHeight:1.8,whiteSpace:'pre-line'},
    hl:{background:'#fff',borderRadius:10,borderLeft:'3px solid #A67C52',padding:'16px 20px',margin:'16px 0',fontSize:13,color:'#111C33',lineHeight:1.7},
    footer:{background:'#111C33',padding:'28px 80px',display:'flex',justifyContent:'space-between',alignItems:'center'},
    fLogo:{fontFamily:'Playfair Display,serif',fontSize:16,fontWeight:700,color:'rgba(255,255,255,.3)'},
    fText:{fontSize:10,color:'rgba(255,255,255,.2)'},
  }
  const articles = [
    {num:'Article 01',title:'Responsable du traitement',content:"VIVEO Patrimoine \u2014 SARL au capital de 5 000 \u20ac\n3 bis rue du G\u00e9n\u00e9ral de Gaulle \u00b7 59253 La Gorgue\nSIRET : 991 869 900 00019\nEmail : contact@viveo-patrimoine.fr \u00b7 T\u00e9l : 09 67 16 70 65"},
    {num:'Article 02',title:'Donn\u00e9es collect\u00e9es',content:"Donn\u00e9es d'identification (nom, pr\u00e9nom), de contact (email, t\u00e9l\u00e9phone, adresse), professionnelles et fiscales, de navigation (cookies analytiques GA4)."},
    {num:'Article 03',title:'Finalit\u00e9s du traitement',content:"R\u00e9pondre \u00e0 vos demandes de contact et de rendez-vous, r\u00e9aliser votre \u00e9tude patrimoniale, vous proposer des programmes adapt\u00e9s, assurer le suivi de votre dossier VEFA, communications avec consentement."},
    {num:'Article 04',title:'Base l\u00e9gale',content:"Consentement \u00b7 Ex\u00e9cution d'un contrat \u00b7 Int\u00e9r\u00eat l\u00e9gitime \u00b7 Obligations l\u00e9gales."},
    {num:'Article 05',title:'Destinataires',content:"VIVEO Patrimoine. Transmission possible aux promoteurs immobiliers, banques, notaires et prestataires techniques dans la stricte limite du n\u00e9cessaire.\nVos donn\u00e9es ne sont jamais revendues."},
    {num:'Article 06',title:'Dur\u00e9e de conservation',content:"Prospects : 3 ans \u00b7 Clients : 10 ans \u00b7 Navigation : 13 mois \u00b7 Communications : jusqu'au retrait du consentement."},
    {num:'Article 07',title:'Vos droits',content:"Conform\u00e9ment au RGPD : acc\u00e8s, rectification, effacement, limitation, opposition, portabilit\u00e9, retrait du consentement.\nContact : contact@viveo-patrimoine.fr\nR\u00e9clamation : www.cnil.fr"},
    {num:'Article 08',title:'Cookies',content:"Cookies n\u00e9cessaires (fonctionnement) et analytiques Google Analytics GA4 (soumis \u00e0 consentement). Gestion via les param\u00e8tres de votre navigateur."},
    {num:'Article 09',title:'S\u00e9curit\u00e9',content:"Chiffrement HTTPS/TLS \u00b7 Acc\u00e8s limit\u00e9 \u00b7 H\u00e9bergement s\u00e9curis\u00e9 en Europe \u00b7 Sauvegardes r\u00e9guli\u00e8res."},
    {num:'Article 10',title:'Modifications',content:"VIVEO Patrimoine se r\u00e9serve le droit de modifier cette politique. Date de mise \u00e0 jour en haut de page."},
  ]
  return (
    <div style={S.page}>
    <div style={S.header}>
      <div style={S.logo}>VIVEO<span style={S.logoSpan}>.</span></div>
      <div style={S.sub}>Politique de confidentialit\u00e9 \u2014 Mise \u00e0 jour Mars 2026</div>
    </div>
    <div style={S.container}>
      <h1 style={S.h1}>Politique de Confidentialit\u00e9</h1>
      <p style={S.intro}>VIVEO Patrimoine s'engage \u00e0 prot\u00e9ger vos donn\u00e9es personnelles et \u00e0 respecter votre vie priv\u00e9e. Cette politique d\u00e9crit comment nous collectons, utilisons et prot\u00e9geons vos informations.</p>
      {articles.map((a,i) => (
        <div key={i} style={{...S.art,...(i===articles.length-1?{borderBottom:'none'}:{})}}>
          <div style={S.artNum}>{a.num}</div>
          <div style={S.artTitle}>{a.title}</div>
          <div style={S.artBody}>{a.content}</div>
        </div>
      ))}
      <div style={S.hl}>Pour exercer vos droits : <strong>contact@viveo-patrimoine.fr</strong> \u00b7 09 67 16 70 65 \u00b7 3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue</div>
    </div>
    <div style={S.footer}>
      <div style={S.fLogo}>VIVEO<span style={{color:'rgba(166,124,82,.4)'}}>.</span></div>
      <div style={S.fText}>Politique de confidentialit\u00e9 \u00b7 Mars 2026</div>
    </div>
    </div>
  )
}
