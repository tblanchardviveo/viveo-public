import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function BlogArticle() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('articles_blog')
        .select('*')
        .eq('slug', slug)
        .eq('statut', 'publie')
        .single()
      setArticle(data)
      setLoading(false)
    }
    load()
  }, [slug])

  if (loading) return (
    <div style={{ background: 'var(--navy-deep)', minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Raleway', sans-serif" }}>Chargement...</p>
    </div>
  )

  if (!article) return (
    <div style={{ background: 'var(--navy-deep)', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32, color: '#fff', fontWeight: 400 }}>Article introuvable</h1>
      <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", color: 'var(--bronze)', marginTop: 24, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>&larr; Retour au blog</Link>
    </div>
  )

  return (
    <div style={{ background: 'var(--navy-deep)', minHeight: '80vh' }}>
      {article.meta_description && (
        <head>
          <meta name="description" content={article.meta_description} />
          <title>{article.titre} - VIVEO Patrimoine</title>
        </head>
      )}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '80px 24px' }}>
        <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'var(--bronze)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em', display: 'inline-block', marginBottom: 40 }}>&larr; Retour au blog</Link>

        {article.image_url && <img src={article.image_url} alt={article.titre} style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 8, marginBottom: 40 }} />}

        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'var(--bronze)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{article.published_at ? new Date(article.published_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}</span>
        {article.auteur && <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', marginLeft: 16 }}>par {article.auteur}</span>}

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, color: '#fff', fontWeight: 400, marginTop: 16, lineHeight: 1.3 }}>{article.titre}</h1>

        <div
          dangerouslySetInnerHTML={{ __html: article.contenu }}
          style={{ marginTop: 40, fontFamily: "'Raleway', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}
        />

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'var(--bronze)', textDecoration: 'none', fontWeight: 600 }}>&larr; Tous les articles</Link>
        </div>
      </div>

      <style>{`
        [dangerouslySetInnerHTML] h2, .blog-content h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; color: #fff; font-weight: 400; margin: 40px 0 16px; }
        [dangerouslySetInnerHTML] h3, .blog-content h3 { font-family: 'Raleway', sans-serif; font-size: 18px; color: var(--bronze); font-weight: 600; margin: 32px 0 12px; letter-spacing: 0.04em; }
        [dangerouslySetInnerHTML] p, .blog-content p { margin-bottom: 16px; }
        [dangerouslySetInnerHTML] ul, .blog-content ul { padding-left: 24px; margin-bottom: 16px; }
        [dangerouslySetInnerHTML] li, .blog-content li { margin-bottom: 8px; }
        [dangerouslySetInnerHTML] a, .blog-content a { color: var(--bronze); text-decoration: underline; }
      `}</style>
    </div>
  )
}
