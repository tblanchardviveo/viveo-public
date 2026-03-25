import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

// Simple markdown-to-HTML converter
function markdownToHtml(md) {
  if (!md) return ''
  return md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '')
    .split('\n').map(line => line.startsWith('<') ? line : (line ? `<p>${line}</p>` : '')).join('')
}

export default function BlogArticle() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .eq('publie', true)
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
      <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", color: 'var(--bronze)', marginTop: 24, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>← Retour au blog</Link>
    </div>
  )
  return (
    <div style={{ background: 'var(--navy-deep)', minHeight: '80vh' }}>
      {article.meta_description && (
        <head>
          <meta name="description" content={article.meta_description} />
          <title>{article.meta_title || article.titre} - VIVEO Patrimoine</title>
        </head>
      )}
      <div style={{ maxWidth: 740, margin: '0 auto', padding: '80px 24px' }}>
        <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'var(--bronze)', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.06em', display: 'inline-block', marginBottom: 40 }}>← Retour au blog</Link>
        {article.image_url && <img src={article.image_url} alt={article.titre} style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 8, marginBottom: 40 }} />}
        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'var(--bronze)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          {article.created_at ? new Date(article.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
        </span>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 4, fontFamily: "'Raleway', sans-serif", textTransform: 'uppercase', letterSpacing: '0.12em' }}>{article.categorie}</div>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 38, color: '#fff', fontWeight: 400, marginTop: 16, lineHeight: 1.3 }}>{article.titre}</h1>
        <div
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.contenu) }}
          style={{ marginTop: 40, fontFamily: "'Raleway', sans-serif", fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.8 }}
        />
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link to="/blog" style={{ fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'var(--bronze)', textDecoration: 'none', fontWeight: 600 }}>← Tous les articles</Link>
        </div>
      </div>
      <style>{`
        [dangerouslySetInnerHTML] h2, .blog-content h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; color: #fff; font-weight: 400; margin: 40px 0 16px; }
        [dangerouslySetInnerHTML] h3, .blog-content h3 { font-family: 'Raleway', sans-serif; font-size: 18px; color: var(--bronze); font-weight: 600; margin: 32px 0 12px; letter-spacing: 0.04em; }
        [dangerouslySetInnerHTML] p, .blog-content p { margin-bottom: 16px; }
        [dangerouslySetInnerHTML] ul, .blog-content ul { padding-left: 24px; margin-bottom: 16px; }
        [dangerouslySetInnerHTML] li, .blog-content li { margin-bottom: 8px; }
        [dangerouslySetInnerHTML] a, .blog-content a { color: var(--bronze); text-decoration: underline; }
        [dangerouslySetInnerHTML] h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 26px; color: #fff; font-weight: 400; margin: 40px 0 16px; }
        [dangerouslySetInnerHTML] h3 { font-family: 'Raleway', sans-serif; font-size: 18px; color: var(--bronze); font-weight: 600; margin: 32px 0 12px; }
      `}</style>
    </div>
  )
}
