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
    {num:'Article 01',title:'Responsable du traitement',content:"VIVEO Patrimoine — SARL au capital de 5 000 €\n3 bis rue du Général de Gaulle · 59253 La Gorgue\nSIRET : 991 869 900 00019\nEmail : contact@viveo-patrimoine.fr · Tél : 09 67 16 70 65"},
    {num:'Article 02',title:'Données collectées',content:"Données d'identification (nom, prénom), de contact (email, téléphone, adresse), professionnelles et fiscales, de navigation (cookies analytiques GA4)."},
    {num:'Article 03',title:'Finalités du traitement',content:"Répondre à vos demandes de contact et de rendez-vous, réaliser votre étude patrimoniale, vous proposer des programmes adaptés, assurer le suivi de votre dossier VEFA, communications avec consentement."},
    {num:'Article 04',title:'Base légale',content:"Consentement · Exécution d'un contrat · Intérêt légitime · Obligations légales."},
    {num:'Article 05',title:'Destinataires',content:"VIVEO Patrimoine. Transmission possible aux promoteurs immobiliers, banques, notaires et prestataires techniques dans la stricte limite du nécessaire.\nVos données ne sont jamais revendues."},
    {num:'Article 06',title:'Durée de conservation',content:"Prospects : 3 ans · Clients : 10 ans · Navigation : 13 mois · Communications : jusqu'au retrait du consentement."},
    {num:'Article 07',title:'Vos droits',content:"Conformément au RGPD : accès, rectification, effacement, limitation, opposition, portabilité, retrait du consentement.\nContact : contact@viveo-patrimoine.fr\nRéclamation : www.cnil.fr"},
    {num:'Article 08',title:'Cookies',content:"Cookies nécessaires (fonctionnement) et analytiques Google Analytics GA4 (soumis à consentement). Gestion via les paramètres de votre navigateur."},
    {num:'Article 09',title:'Sécurité',content:"Chiffrement HTTPS/TLS · Accès limité · Hébergement sécurisé en Europe · Sauvegardes régulières."},
    {num:'Article 10',title:'Modifications',content:"VIVEO Patrimoine se réserve le droit de modifier cette politique. Date de mise à jour en haut de page."},
  ]
  return (
    <div style={S.page}>
    <div style={S.header}>
      <div style={S.logo}>VIVEO<span style={S.logoSpan}>.</span></div>
      <div style={S.sub}>Politique de confidentialité — Mise à jour Mars 2026</div>
    </div>
    <div style={S.container}>
      <h1 style={S.h1}>Politique de Confidentialité</h1>
      <p style={S.intro}>VIVEO Patrimoine s'engage à protéger vos données personnelles et à respecter votre vie privée. Cette politique décrit comment nous collectons, utilisons et protégeons vos informations.</p>
      {articles.map((a,i) => (
        <div key={i} style={{...S.art,...(i===articles.length-1?{borderBottom:'none'}:{})}}>
          <div style={S.artNum}>{a.num}</div>
          <div style={S.artTitle}>{a.title}</div>
          <div style={S.artBody}>{a.content}</div>
        </div>
      ))}
      <div style={S.hl}>Pour exercer vos droits : <strong>contact@viveo-patrimoine.fr</strong> · 09 67 16 70 65 · 3 bis rue du Général de Gaulle, 59253 La Gorgue</div>
    </div>
    <div style={S.footer}>
      <div style={S.fLogo}>VIVEO<span style={{color:'rgba(166,124,82,.4)'}}>.</span></div>
      <div style={S.fText}>Politique de confidentialité · Mars 2026</div>
    </div>
    </div>
  )
}
