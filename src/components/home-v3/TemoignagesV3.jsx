import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

const fallback = [
  { texte: "Apr\u00e8s 3 refus de ma banque qui voulait me vendre son propre programme, VIVEO a trouv\u00e9 le bien en 2 semaines. La diff\u00e9rence ? Ils connaissaient le promoteur de l'int\u00e9rieur.", auteur: 'M. & Mme B., investisseurs LMNP, Lille' },
  { texte: "Le suivi apr\u00e8s la signature m'a surpris. Je pensais ne plus avoir de nouvelles apr\u00e8s la r\u00e9servation. J'ai re\u00e7u un compte-rendu \u00e0 chaque appel de fonds, jusqu'\u00e0 la remise des cl\u00e9s.", auteur: 'Mme C., r\u00e9sidence principale, Roubaix' },
  { texte: "J'avais consult\u00e9 4 CGP. VIVEO est le seul qui m'a expliqu\u00e9 pourquoi deux programmes que je voulais n'\u00e9taient pas adapt\u00e9s \u00e0 mon profil fiscal. Les autres voulaient juste signer.", auteur: 'M. D., investisseur D\u00e9ficit Foncier, Paris' }
]

export default function TemoignagesV3() {
  const [avis, setAvis] = useState([])
  useEffect(() => {
    supabase.from('avis_clients')
      .select('*')
      .eq('autorisation_publication', true)
      .gte('note_globale', 4)
      .order('publie_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data && data.length > 0) setAvis(data) })
  }, [])

  const items = avis.length > 0 ? avis.map(a => ({ texte: a.commentaire, auteur: `${a.prenom} ${a.nom?.charAt(0) || ''}.`, note: a.note_globale })) : fallback

  return (
    <section data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ width: 32, height: 1, background: '#A67C52' }} />
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52' }}>ILS NOUS ONT FAIT CONFIANCE</span>
      </div>
      <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(28px,3.5vw,48px)', color: '#111C33', lineHeight: 1.1, margin: '0 0 48px' }}>
        Ce que nos clients disent,<br />
        <em style={{ color: '#A67C52', fontStyle: 'italic' }}>dans leurs propres mots.</em>
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        {items.map((t, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: 3, boxShadow: '0 4px 24px rgba(17,28,51,0.06)', padding: '36px 32px' }}>
            <span style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 80, fontWeight: 300, color: 'rgba(166,124,82,0.15)', lineHeight: 0.6, display: 'block', marginBottom: 16 }}>"</span>
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontWeight: 300, fontSize: 17, color: '#111C33', lineHeight: 1.7, marginBottom: 24 }}>{t.texte}</p>
            {t.note && <div style={{ marginBottom: 12 }}>{'\u2605'.repeat(t.note)}</div>}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 24, height: 1, background: '#A67C52' }} />
              <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 12, color: '#111C33', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{t.auteur}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
