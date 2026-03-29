import { useState, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

const BASE = 'https://viveo-patrimoine.fr'
const SYSTEM = `Tu es un assistant patrimonial expert. Réponds en français, de façon concise (2-3 phrases max), professionnelle et bienveillante. Tu aides les prospects à comprendre leurs besoins en investissement immobilier.`

export default function WidgetChatbot() {
  const [params] = useSearchParams()
  const color = decodeURIComponent(params.get('color') || '#A67C52')
  const [msgs, setMsgs] = useState([
    { role: 'assistant', content: 'Bonjour\u00a0! Je suis votre assistant patrimonial. Comment puis-je vous aider\u00a0?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showCta, setShowCta] = useState(false)
  const ref = useRef(null)
  const userCount = msgs.filter(m => m.role === 'user').length

  useEffect(() => { if (userCount >= 3) setShowCta(true) }, [userCount])
  useEffect(() => { ref.current?.scrollTo(0, ref.current.scrollHeight) }, [msgs])

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = { role: 'user', content: input.trim() }
    const newMsgs = [...msgs, userMsg]
    setMsgs(newMsgs); setInput(''); setLoading(true)
    try {
      const r = await fetch(`${BASE}/api/chat`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM, messages: newMsgs })
      })
      const data = await r.json()
      setMsgs(m => [...m, { role: 'assistant', content: data.content?.[0]?.text || 'Je n\'ai pas pu répondre.' }])
    } catch {
      setMsgs(m => [...m, { role: 'assistant', content: 'Une erreur est survenue.' }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: '-apple-system,BlinkMacSystemFont,sans-serif', overflow: 'hidden' }}>
      <div style={{ background: '#111C33', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Assistant patrimonial</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>Répond en quelques secondes</div>
        </div>
      </div>

      <div ref={ref} style={{ flex: 1, overflowY: 'auto', padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '82%', padding: '9px 13px', fontSize: 13, lineHeight: 1.5,
              borderRadius: m.role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
              background: m.role === 'user' ? color : '#F7F5F1',
              color: m.role === 'user' ? '#fff' : '#111C33',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex' }}>
            <div style={{ padding: '9px 14px', borderRadius: '14px 14px 14px 4px', background: '#F7F5F1', fontSize: 13, color: '#999' }}>…</div>
          </div>
        )}
        {showCta && (
          <div style={{ textAlign: 'center', padding: '6px 0' }}>
            <a href={`${BASE}/rdv-decouverte`} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-block', padding: '10px 18px', borderRadius: 8, background: color, color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>
              Prendre rendez-vous →
            </a>
          </div>
        )}
      </div>

      <div style={{ padding: '10px 12px', borderTop: '1px solid #EDE9E3', display: 'flex', gap: 8, flexShrink: 0 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Votre question…"
          style={{ flex: 1, padding: '9px 12px', borderRadius: 8, border: '1px solid #EDE9E3', fontSize: 13, outline: 'none' }} />
        <button onClick={send} disabled={loading}
          style={{ padding: '9px 16px', borderRadius: 8, background: color, border: 'none', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 16, opacity: loading ? 0.6 : 1 }}>→</button>
      </div>
    </div>
  )
}
