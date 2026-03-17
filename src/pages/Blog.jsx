import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('articles_blog')
        .select('*')
        .eq('statut', 'publie')
        .order('published_at', { ascending: false })
      setArticles(data || [])
      setLoading(false)
    }
    load()
  }, [])

  return (
    <div style={{ background: 'var(--navy-deep)', minHeight: '80vh' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--bronze)' }}>VIVEO Patrimoine</span>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(28px, 5vw, 42px)', color: '#fff', fontWeight: 400, marginTop: 12 }}>Notre Blog</h1>
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.55)', marginTop: 12, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>Conseils, analyses et actualites sur l'investissement immobilier.</p>
        </div>

        {loading && <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontFamily: "'Raleway', sans-serif" }}>Chargement...</p>}

        {!loading && articles.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontFamily: "'Raleway', sans-serif", padding: 60 }}>Aucun article pour le moment.</p>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
          {articles.map(a => (
            <Link key={a.id} to={'/blog/' + a.slug} style={{ textDecoration: 'none', display: 'block' }}>
              <article style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, overflow: 'hidden', transition: 'border-color 0.3s, transform 0.3s' }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,151,106,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)' }} onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}>
                {a.image_url && <img src={a.image_url} alt={a.titre} style={{ width: '100%', height: 180, objectFit: 'cover' }} />}
                <div style={{ padding: '24px 20px' }}>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'var(--bronze)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{a.published_at ? new Date(a.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
                  <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: '#fff', fontWeight: 400, marginTop: 8, lineHeight: 1.4 }}>{a.titre}</h2>
                  {a.meta_description && <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 10, lineHeight: 1.6 }}>{a.meta_description}</p>}
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'var(--bronze)', fontWeight: 600, marginTop: 16, display: 'inline-block', letterSpacing: '0.06em' }}>Lire l'article &rarr;</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
