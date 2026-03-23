import React from 'react'

const navy = '#111C33', bronze = '#A67C52'

export default function PolitiqueArticles() {
  return (
    <div>
      <section id="responsable" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>01</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Responsable du traitement</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<div style={{background:'#fff',borderLeft:'3px solid #A67C52',padding:'20px 24px',borderRadius:'0 8px 8px 0',marginBottom:8}}>
        <p style={{margin:'0 0 4px',fontFamily:'Raleway,sans-serif',fontSize:14,fontWeight:600,color:'#111C33'}}>VIVEO Patrimoine &mdash; SARL au capital de 5 000 &euro;</p>
        <p style={{margin:'0 0 4px',fontFamily:'Raleway,sans-serif',fontSize:13,color:'#555'}}>3 bis rue du Général de Gaulle &middot; 59253 La Gorgue</p>
        <p style={{margin:'0 0 4px',fontFamily:'Raleway,sans-serif',fontSize:13,color:'#555'}}>SIRET : 991 869 900 00019</p>
        <p style={{margin:0,fontFamily:'Raleway,sans-serif',fontSize:13,color:'#555'}}><a href="mailto:contact@viveo-patrimoine.fr" style={{color:'#A67C52'}}>contact@viveo-patrimoine.fr</a> &middot; 09 67 16 70 65</p>
      </div>`}} />
      </section>
      <section id="donnees" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>02</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Données collectées</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li>Données d’identification (nom, prénom, date de naissance)</li><li>Données de contact (adresse, email, téléphone)</li><li>Données professionnelles (situation, revenus, patrimoine)</li><li>Données fiscales (situation fiscale, TMI)</li><li>Données de navigation (IP, cookies analytiques)</li><li>Données liées au projet (budget, financement, nature du projet)</li></ul>`}} />
      </section>
      <section id="finalites" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>03</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Finalités du traitement</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li>Répondre aux demandes de contact et de rendez-vous</li><li>Réaliser l’étude patrimoniale et fiscale</li><li>Proposer des programmes immobiliers adaptés</li><li>Assurer le suivi du dossier VEFA</li><li>Envoyer des communications commerciales avec consentement</li><li>Respecter les obligations légales et réglementaires</li><li>Améliorer la qualité des services</li></ul>`}} />
      </section>
      <section id="base-legale" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>04</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Base légale</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li><strong>Consentement</strong> — communications commerciales et certains cookies</li><li><strong>Exécution d’un contrat</strong> — relation de conseil et suivi acquisitions</li><li><strong>Intérêt légitime</strong> — gestion de la relation commerciale</li><li><strong>Obligations légales</strong> — lutte contre le blanchiment, conseil financier</li></ul>`}} />
      </section>
      <section id="destinataires" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>05</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Destinataires</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<p style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.7,marginBottom:12}}>Vos données sont destinées aux seuls membres de l’équipe VIVEO.</p>
      <ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20,marginBottom:16}}><li>Promoteurs immobiliers</li><li>Établissements bancaires</li><li>Notaires</li><li>Prestataires techniques</li></ul>
      <div style={{background:'rgba(164,124,82,0.06)',border:'1px solid rgba(164,124,82,0.2)',borderRadius:8,padding:'12px 16px'}}>
        <p style={{margin:0,fontFamily:'Raleway,sans-serif',fontSize:13,fontWeight:600,color:'#A67C52'}}>Vos données ne sont en aucun cas revendues à des tiers.</p>
      </div>`}} />
      </section>
      <section id="duree" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>06</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Durée de conservation</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li>Prospects : 3 ans à compter du dernier contact</li><li>Clients : 10 ans à compter de la fin de la relation</li><li>Données de navigation : 13 mois maximum</li><li>Communications commerciales : jusqu’au retrait du consentement</li></ul>`}} />
      </section>
      <section id="droits" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>07</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Vos droits</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:20}}><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>👁️</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit d’accès</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Obtenir une copie de vos données</div></div><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>✏️</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit de rectification</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Corriger des données inexactes</div></div><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>🗑️</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit à l’effacement</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Demander la suppression</div></div><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>⏸️</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit à la limitation</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Restreindre le traitement</div></div><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>🚫</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit d’opposition</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Vous opposer au traitement</div></div><div style={{background:'rgba(17,28,51,0.04)',borderRadius:8,padding:'14px 16px',border:'1px solid rgba(17,28,51,0.08)'}}><div style={{fontSize:18,marginBottom:6}}>📦</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:12,fontWeight:700,color:'${navy}',marginBottom:2}}>Droit à la portabilité</div><div style={{fontFamily:'Raleway,sans-serif',fontSize:11,color:'#666'}}>Recevoir vos données</div></div></div>
      <div style={{background:'rgba(164,124,82,0.06)',border:'1px solid rgba(164,124,82,0.2)',borderRadius:8,padding:'12px 16px'}}>
        <p style={{margin:'0 0 4px',fontFamily:'Raleway,sans-serif',fontSize:13,color:'#444'}}>Pour exercer vos droits : <a href="mailto:contact@viveo-patrimoine.fr" style={{color:'#A67C52',fontWeight:600}}>contact@viveo-patrimoine.fr</a></p>
        <p style={{margin:0,fontFamily:'Raleway,sans-serif',fontSize:13,color:'#444'}}>En cas de réclamation : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" style={{color:'#A67C52',fontWeight:600}}>www.cnil.fr</a></p>
      </div>`}} />
      </section>
      <section id="cookies" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>08</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Cookies</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li><strong>Cookies nécessaires</strong> : fonctionnement du site, pas de consentement requis</li><li><strong>Cookies analytiques</strong> : Google Analytics GA4, soumis à consentement</li><li><strong>Cookies de préférence</strong> : mémorisation des choix</li></ul>`}} />
      </section>
      <section id="securite" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>09</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Sécurité</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<ul style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.8,paddingLeft:20}}><li>Chiffrement HTTPS/TLS</li><li>Accès limité aux personnes habilitées</li><li>Hébergement sécurisé en Europe</li><li>Sauvegardes régulières</li></ul>`}} />
      </section>
      <section id="modifications" style={{paddingBottom:40,marginBottom:40,borderBottom:'1px solid rgba(17,28,51,0.08)'}}>
        <div style={{display:'flex',alignItems:'baseline',gap:12,marginBottom:16}}>
          <span style={{fontFamily:'Playfair Display,serif',fontSize:13,fontWeight:400,color:bronze,letterSpacing:'0.1em'}}>10</span>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:20,fontWeight:400,color:navy,margin:0}}>Modifications</h2>
        </div>
        <div dangerouslySetInnerHTML={{__html: `<p style={{fontFamily:'Raleway,sans-serif',fontSize:14,color:'#444',lineHeight:1.7}}>VIVEO Patrimoine se réserve le droit de modifier cette politique. La date de mise à jour figure en en-tête de cette page. En cas de modifications substantielles, vous en serez informé.</p>`}} />
      </section>
    </div>
  )
}
