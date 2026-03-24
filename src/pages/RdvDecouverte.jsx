import React,{useState} from 'react';
import RdvGauche from '../components/rdv/RdvGauche';

const WEBHOOK='https://hook.eu1.make.com/roc0nqisnjanoip0deovdrrtyfaf3186';
const LEADS_API='https://viveo-admin.vercel.app/api/leads';
const PROJETS=[{id:'rp',e:'🏠',t:'Résidence principale',d:'Devenir propriétaire de ma résidence'},{id:'loc',e:'📈',t:'Investissement locatif',d:'Générer des revenus et réduire mes impôts'},{id:'rs',e:'🌊',t:'Résidence secondaire',d:'Un bien de plaisir sur le littoral ou en montagne'},{id:'sg',e:'🏛️',t:'Stratégie globale',d:"Optimiser l'ensemble de mon patrimoine"}];
const FORMATS=[{id:'pres',e:'🤝',t:'Présentiel',d:'La Gorgue'},{id:'visio',e:'💻',t:'Visio',d:'En ligne'},{id:'tel',e:'📞',t:'Téléphone',d:'Rappel direct'}];
const DISPOS=['Lundi-Vendredi','Week-end','Matin','Après-midi','Soir'];

const inp={width:'100%',padding:'10px 12px',border:'1px solid #E0D8CE',borderRadius:8,fontFamily:'Raleway,sans-serif',fontSize:14,outline:'none',boxSizing:'border-box',background:'#fff',color:'#3D3D4E'};
const lbl={display:'block',fontSize:12,fontWeight:600,color:'#6B7280',marginBottom:4,textTransform:'uppercase',letterSpacing:'0.05em'};

export default function RdvDecouverte(){
  const [step,setStep]=useState(1);
  const [projet,setProjet]=useState('');
  const [format,setFormat]=useState('');
  const [dispos,setDispos]=useState([]);
  const [msg,setMsg]=useState('');
  const [rgpd,setRgpd]=useState(false);
  const [f,setF]=useState({prenom:'',nom:'',email:'',telephone:'',code_postal:'',ville:''});
  const [sent,setSent]=useState(false);
  const [err,setErr]=useState('');

  const pct=step===1?33:step===2?66:100;
  const tD=(id)=>setDispos(d=>d.includes(id)?d.filter(x=>x!==id):[...d,id]);

  const valide2=()=>{
    if(!f.prenom||!f.nom||!f.email||!f.telephone||!f.ville){setErr('Merci de remplir tous les champs obligatoires.');return false;}
    if(!/^[^@]+@[^@]+\.[^@]+$/.test(f.email)){setErr('Adresse email invalide.');return false;}
    setErr('');return true;
  };

  const submit=async()=>{
    if(!rgpd){setErr('Veuillez accepter la politique de confidentialité.');return;}
    const now=new Date();
    const payload={...f,projet:PROJETS.find(p=>p.id===projet)?.t||projet,format_rdv:FORMATS.find(x=>x.id===format)?.t||format,disponibilites:dispos.join(' · '),type:'rdv',message:msg,date:now.toLocaleDateString('fr-FR'),heure:now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})};
    try{
      await Promise.all([
        fetch(WEBHOOK,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}),
        fetch(LEADS_API,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({nom:f.nom,prenom:f.prenom,email:f.email,telephone:f.telephone,code_postal:f.code_postal,ville:f.ville,projet:PROJETS.find(p=>p.id===projet)?.t||projet,source_programme:'RDV Découverte'})})
      ]);
    }catch(e){}
    setSent(true);
  };

  if(sent) return(
    <div style={{display:'flex',minHeight:'100vh'}}>
      <div style={{flex:'0 0 45%',maxWidth:520}}><RdvGauche/></div>
      <div style={{flex:1,background:'#F7F5F0',display:'flex',alignItems:'center',justifyContent:'center',padding:40}}>
        <div style={{textAlign:'center',maxWidth:440}}>
          <div style={{width:72,height:72,borderRadius:'50%',background:'linear-gradient(135deg,#A67C52,#C4976A)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,margin:'0 auto 24px'}}>✦</div>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:28,color:'#111C33',marginBottom:12}}>Demande envoyée</h2>
          <p style={{color:'#6B7280',fontSize:15,marginBottom:24}}>Notre équipe vous contactera sous 24 heures pour confirmer votre créneau.</p>
          <div style={{background:'#fff',borderRadius:12,padding:'20px 24px',textAlign:'left',border:'1px solid #E0D8CE',fontSize:13,color:'#3D3D4E',lineHeight:1.7}}>
            <div><strong>Projet :</strong> {PROJETS.find(p=>p.id===projet)?.t}</div>
            <div><strong>Format :</strong> {FORMATS.find(x=>x.id===format)?.t}</div>
            {dispos.length>0&&<div><strong>Disponibilités :</strong> {dispos.join(' · ')}</div>}
            <div><strong>Contact :</strong> {f.prenom} — {f.email}</div>
          </div>
          <div style={{marginTop:24,fontSize:13,color:'#8A9BB5'}}>
            <a href="tel:+33XXXXXXXXX" style={{color:'#C4976A',textDecoration:'none'}}>📞 Nous appeler</a>
            {' · '}
            <a href="mailto:contact@viveo-patrimoine.fr" style={{color:'#C4976A',textDecoration:'none'}}>✉️ contact@viveo-patrimoine.fr</a>
          </div>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{display:'flex',minHeight:'100vh',fontFamily:'Raleway,sans-serif'}}>
      <div style={{position:'fixed',top:0,left:0,right:0,height:2,background:'#E0D8CE',zIndex:100}}>
        <div style={{height:'100%',width:pct+'%',background:'linear-gradient(90deg,#A67C52,#C4976A)',transition:'width 0.4s ease'}}/>
      </div>
      <div style={{flex:'0 0 45%',maxWidth:520,position:'sticky',top:0,height:'100vh',overflowY:'auto'}}><RdvGauche/></div>
      <div style={{flex:1,background:'#F7F5F0',padding:'60px 48px 48px',overflowY:'auto'}}>
        <div style={{maxWidth:500,margin:'0 auto'}}>
          <div style={{display:'flex',gap:8,marginBottom:32}}>
            {[1,2,3].map(n=><div key={n} style={{width:8,height:8,borderRadius:'50%',background:step>=n?'#111C33':'#D4C8B8'}}/>)}
          </div>

          {step===1&&(
            <div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:24,color:'#111C33',marginBottom:8}}>Votre projet</h2>
              <p style={{color:'#6B7280',fontSize:14,marginBottom:24}}>Quel est l'objectif principal de votre démarche ?</p>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:32}}>
                {PROJETS.map(p=>(
                  <div key={p.id} onClick={()=>setProjet(p.id)} style={{border:projet===p.id?'2px solid #111C33':'2px solid #E0D8CE',borderRadius:12,padding:'16px 14px',cursor:'pointer',background:projet===p.id?'rgba(17,28,51,0.04)':'#fff',transition:'all 0.2s'}}>
                    <div style={{fontSize:24,marginBottom:6}}>{p.e}</div>
                    <div style={{fontWeight:600,fontSize:13,color:'#111C33',marginBottom:4}}>{p.t}</div>
                    <div style={{fontSize:12,color:'#6B7280',lineHeight:1.4}}>{p.d}</div>
                  </div>
                ))}
              </div>
              <button disabled={!projet} onClick={()=>setStep(2)} style={{width:'100%',padding:'14px',background:projet?'#111C33':'#C8C0B4',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontFamily:'Raleway,sans-serif',fontWeight:600,cursor:projet?'pointer':'not-allowed'}}>Continuer →</button>
            </div>
          )}

          {step===2&&(
            <div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:24,color:'#111C33',marginBottom:8}}>Vos coordonnées</h2>
              <p style={{color:'#6B7280',fontSize:14,marginBottom:24}}>Pour que notre conseiller puisse vous contacter.</p>
              {err&&<div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'10px 14px',color:'#DC2626',fontSize:13,marginBottom:16}}>{err}</div>}
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginBottom:12}}>
                <div><label style={lbl}>Prénom *</label><input style={inp} value={f.prenom} onChange={e=>setF({...f,prenom:e.target.value})} placeholder="Marie"/></div>
                <div><label style={lbl}>Nom *</label><input style={inp} value={f.nom} onChange={e=>setF({...f,nom:e.target.value})} placeholder="Dupont"/></div>
              </div>
              <div style={{marginBottom:12}}><label style={lbl}>Email *</label><input style={inp} type="email" value={f.email} onChange={e=>setF({...f,email:e.target.value})} placeholder="marie@exemple.fr"/></div>
              <div style={{marginBottom:12}}><label style={lbl}>Téléphone *</label><input style={inp} type="tel" value={f.telephone} onChange={e=>setF({...f,telephone:e.target.value})} placeholder="06 XX XX XX XX"/></div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 2fr',gap:12,marginBottom:24}}>
                <div><label style={lbl}>Code postal</label><input style={inp} value={f.code_postal} onChange={e=>setF({...f,code_postal:e.target.value})} placeholder="59253"/></div>
                <div><label style={lbl}>Ville *</label><input style={inp} value={f.ville} onChange={e=>setF({...f,ville:e.target.value})} placeholder="La Gorgue"/></div>
              </div>
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>setStep(1)} style={{padding:'14px 20px',background:'transparent',color:'#6B7280',border:'1px solid #E0D8CE',borderRadius:10,fontSize:14,fontFamily:'Raleway,sans-serif',cursor:'pointer'}}>← Retour</button>
                <button onClick={()=>valide2()&&setStep(3)} style={{flex:1,padding:'14px',background:'#111C33',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontFamily:'Raleway,sans-serif',fontWeight:600,cursor:'pointer'}}>Continuer →</button>
              </div>
            </div>
          )}

          {step===3&&(
            <div>
              <h2 style={{fontFamily:'Playfair Display,serif',fontSize:24,color:'#111C33',marginBottom:8}}>Votre rendez-vous</h2>
              <p style={{color:'#6B7280',fontSize:14,marginBottom:20}}>Choisissez le format et vos disponibilités.</p>
              <div style={{display:'flex',gap:10,marginBottom:24}}>
                {FORMATS.map(fm=>(
                  <div key={fm.id} onClick={()=>setFormat(fm.id)} style={{flex:1,border:format===fm.id?'2px solid #111C33':'2px solid #E0D8CE',borderRadius:10,padding:'12px 8px',cursor:'pointer',textAlign:'center',background:format===fm.id?'rgba(17,28,51,0.04)':'#fff'}}>
                    <div style={{fontSize:22,marginBottom:4}}>{fm.e}</div>
                    <div style={{fontWeight:600,fontSize:12,color:'#111C33'}}>{fm.t}</div>
                    <div style={{fontSize:11,color:'#8A9BB5'}}>{fm.d}</div>
                  </div>
                ))}
              </div>
              <div style={{marginBottom:16}}>
                <label style={lbl}>Disponibilités</label>
                <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                  {DISPOS.map(d=>(
                    <div key={d} onClick={()=>tD(d)} style={{padding:'6px 14px',borderRadius:20,border:'1px solid',borderColor:dispos.includes(d)?'#111C33':'#E0D8CE',background:dispos.includes(d)?'#111C33':'#fff',color:dispos.includes(d)?'#fff':'#6B7280',fontSize:13,cursor:'pointer',transition:'all 0.15s'}}>{d}</div>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}><label style={lbl}>Message (optionnel)</label><textarea style={{...inp,height:80,resize:'vertical'}} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Précisez votre situation si vous le souhaitez..."/></div>
              <div style={{display:'flex',alignItems:'flex-start',gap:10,marginBottom:20,padding:'12px 14px',background:'#fff',borderRadius:8,border:'1px solid #E0D8CE'}}>
                <input type="checkbox" id="rgpd" checked={rgpd} onChange={e=>setRgpd(e.target.checked)} style={{marginTop:2,accentColor:'#111C33'}}/>
                <label htmlFor="rgpd" style={{fontSize:12,color:'#6B7280',lineHeight:1.5,cursor:'pointer'}}>J'accepte que mes données soient utilisées pour traiter ma demande. <a href="/politique-de-confidentialite" style={{color:'#C4976A'}}>Politique de confidentialité</a></label>
              </div>
              {err&&<div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:8,padding:'10px 14px',color:'#DC2626',fontSize:13,marginBottom:16}}>{err}</div>}
              <div style={{display:'flex',gap:12}}>
                <button onClick={()=>setStep(2)} style={{padding:'14px 20px',background:'transparent',color:'#6B7280',border:'1px solid #E0D8CE',borderRadius:10,fontSize:14,fontFamily:'Raleway,sans-serif',cursor:'pointer'}}>← Retour</button>
                <button onClick={submit} style={{flex:1,padding:'14px',background:'linear-gradient(135deg,#A67C52,#C4976A)',color:'#fff',border:'none',borderRadius:10,fontSize:15,fontFamily:'Raleway,sans-serif',fontWeight:600,cursor:'pointer'}}>Confirmer mon rendez-vous →</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
