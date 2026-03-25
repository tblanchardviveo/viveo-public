import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../supabase'
export default function Blog() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('publie', true)
        .order('created_at', { ascending: false })
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
          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.55)', marginTop: 12, maxWidth: 560, marginLeft: 'auto', marginRight: 'auto' }}>Conseils, analyses et actualités sur l'investissement immobilier.</p>
        </div>
        {loading && <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontFamily: "'Raleway', sans-serif" }}>Chargement...</p>}
        {!loading && articles.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontFamily: "'Raleway', sans-serif", padding: 60 }}>Aucun article pour le moment.</p>
        )}
        {!loading && articles.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
            {articles.map(a => (
              <Link key={a.id} to={`/blog/${a.slug || a.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, overflow: 'hidden', transition: 'transform 0.2s', cursor: 'pointer' }}>
                  {a.image_url && (
                    <div style={{ height: 160, background: `url(${a.image_url}) center/cover` }} />
                  )}
                  <div style={{ padding: '20px 24px' }}>
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--bronze)' }}>{a.categorie}</span>
                    <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 20, color: '#fff', fontWeight: 400, marginTop: 8, marginBottom: 12, lineHeight: 1.4 }}>{a.titre}</h2>
                    {a.extrait && (
                      <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, marginBottom: 16 }}>{a.extrait.substring(0, 120)}...</p>
                    )}
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'var(--bronze)', fontWeight: 600 }}>Lire l'article →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
