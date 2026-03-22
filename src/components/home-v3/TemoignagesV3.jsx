import { useEffect, useState } from 'react'
import { supabase } from '../../supabase'

const fallback = [
  { texte: "Après 3 refus de ma banque qui voulait me vendre son propre programme, VIVEO a trouvé le bien en 2 semaines. La différence ? Ils connaissaient le promoteur de l'intérieur.", auteur: 'M. & Mme B., investisseurs LMNP, Lille' },
  { texte: "Le suivi après la signature m'a surpris. Je pensais ne plus avoir de nouvelles après la réservation. J'ai reçu un compte-rendu à chaque appel de fonds, jusqu'à la remise des clés.", auteur: 'Mme C., résidence principale, Roubaix' },
  { texte: "J'avais consulté 4 CGP. VIVEO est le seul qui m'a expliqué pourquoi deux programmes que je voulais n'étaient pas adaptés à mon profil fiscal. Les autres voulaient juste signer.", auteur: 'M. D., investisseur Déficit Foncier, Paris' }
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
          <div key={i} style={{ background: '#fff', borderRadius: 3, padding: '40px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {t.note && <div style={{ marginBottom: 12, color: '#A67C52', fontSize: 18, letterSpacing: 2 }}>{'★'.repeat(t.note)}</div>}
            <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 17, fontStyle: 'italic', color: '#111C33', lineHeight: 1.7, flex: 1 }}>
              {'«'} {t.texte} {'»'}
            </p>
            <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 13, color: '#A67C52', marginTop: 24 }}>{t.auteur}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
