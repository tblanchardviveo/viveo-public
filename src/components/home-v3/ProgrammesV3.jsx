import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../supabase'

export default function ProgrammesV3() {
  const [progs, setProgs] = useState([])
  useEffect(() => {
    supabase.from('programmes')
      .select('id, nom, ville, slug, prix_min, badge_1, photo_url, description, date_livraison, typologies')
      .eq('actif', true)
      .order('created_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data) setProgs(data) })
  }, [])

  const cards = progs.length > 0 ? progs.slice(0, 2) : []

  return (
    <section data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={{ display: 'flex', gap: 64, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* LEFT */}
        <div style={{ flex: '0 0 35%', minWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ width: 32, height: 1, background: '#A67C52' }} />
            <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.28em', color: '#A67C52' }}>NOS PROGRAMMES</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontWeight: 300, fontSize: 'clamp(36px,4.5vw,58px)', color: '#111C33', lineHeight: 1.1, margin: 0 }}>
            {"Une s\u00e9lection,"}<br />
            <em style={{ color: '#A67C52', fontStyle: 'italic' }}>pas un catalogue.</em>
          </h2>
          <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 17, color: '#666', lineHeight: 1.8, marginTop: 24 }}>
            {"Nous ne r\u00e9f\u00e9ren\u00e7ons pas tous les programmes du march\u00e9. Nous s\u00e9lectionnons ceux qui m\u00e9ritent votre attention \u2014 et nous vous expliquons pourquoi."}
          </p>
          <Link to="/programmes" style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 13, color: '#A67C52', textTransform: 'uppercase', letterSpacing: '0.08em', textDecoration: 'none', display: 'inline-block', marginTop: 24, transition: 'transform 0.2s' }}
            onMouseEnter={e => e.target.style.transform = 'translateX(4px)'}
            onMouseLeave={e => e.target.style.transform = 'none'}
          >{"Voir tous les programmes \u2192"}</Link>
        </div>

        {/* RIGHT - Cards */}
        <div style={{ flex: 1, minWidth: 320 }}>
          {cards.length > 0 ? cards.map((p, i) => (
            <div key={p.id} style={{
              background: '#fff', borderRadius: 3, overflow: 'hidden',
              boxShadow: i === 0 ? '0 24px 80px rgba(17,28,51,0.12)' : '0 12px 40px rgba(17,28,51,0.08)',
              marginTop: i > 0 ? 32 : 0,
              marginLeft: i > 0 ? 40 : 0,
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              cursor: 'pointer'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 40px 100px rgba(17,28,51,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = i === 0 ? '0 24px 80px rgba(17,28,51,0.12)' : '0 12px 40px rgba(17,28,51,0.08)' }}
            >
              <div style={{
                height: 260,
                backgroundImage: p.photo_url ? `url(${p.photo_url})` : 'linear-gradient(135deg, #111C33, #A67C52)',
                backgroundSize: 'cover', backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,28,51,0.80) 0%, transparent 50%)' }} />
                {p.badge_1 && <span style={{ position: 'absolute', top: 16, left: 16, background: '#A67C52', borderRadius: 2, padding: '6px 12px', fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 10, textTransform: 'uppercase', color: '#fff' }}>{p.badge_1}</span>}
                <span style={{ position: 'absolute', bottom: 16, left: 20, fontFamily: "'Raleway',sans-serif", fontWeight: 500, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.70)' }}>{p.ville}</span>
              </div>
              <div style={{ padding: '28px 28px 32px' }}>
                <h3 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 24, color: '#111C33', margin: '0 0 12px' }}>{p.nom}</h3>
                <p style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 14, color: '#777', lineHeight: 1.7, margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                <div style={{ display: 'flex', gap: 24, marginTop: 20, borderTop: '1px solid rgba(17,28,51,0.06)', paddingTop: 16, alignItems: 'center' }}>
                  {p.prix_min && <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 15, color: '#A67C52' }}>{"\u00e0 partir de "}{p.prix_min.toLocaleString()}{"\u00a0\u20ac"}</span>}
                  {p.date_livraison && <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 300, fontSize: 13, color: '#999' }}>{p.date_livraison}</span>}
                </div>
                <Link to={`/programme/${p.slug}`} style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, fontSize: 13, color: '#111C33', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block', marginTop: 16 }}>{"D\u00e9couvrir \u2192"}</Link>
              </div>
            </div>
          )) : (
            <div style={{ background: '#111C33', borderRadius: 3, padding: '80px 40px', textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontStyle: 'italic', fontSize: 24, color: 'rgba(255,255,255,0.30)' }}>Programmes en cours de chargement...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
