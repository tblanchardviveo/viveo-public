import { useState, useRef, useEffect } from 'react'

const QUICK_REPLIES = [
  'Je cherche un programme neuf',
  'Comment fonctionne le LMNP ?',
  'Je souhaite prendre rendez-vous',
  'Quels sont vos dispositifs fiscaux ?',
]

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de VIVEO Patrimoine, cabinet de gestion de patrimoine spécialisé en immobilier neuf (VEFA).
Ton rôle : répondre aux questions des visiteurs sur les programmes, les dispositifs fiscaux (LMNP, Déficit Foncier, Nue-Propriété, Loi Malraux, Monuments Historiques, Denormandie, Jeanbrun, LMNP Géré), le financement et l'accompagnement VIVEO.
Sois concis (max 3 phrases), professionnel et chaleureux. Propose toujours de prendre rendez-vous si pertinent.
Ne donne jamais de conseil fiscal personnalisé — oriente vers un conseiller VIVEO.`

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Bonjour ! Je suis l'assistant VIVEO Patrimoine. Comment puis-je vous aider ?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef(null)
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (text) => {
    if (!text.trim() || loading) return
    const userMsg = { from: 'user', text: text.trim() }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)

    try {
      const apiMessages = updatedMessages
        .filter(m => m.from !== 'system')
        .map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: SYSTEM_PROMPT, messages: apiMessages })
      })

      if (!res.ok) throw new Error('Erreur serveur')
      const data = await res.json()
      const reply = data.content?.[0]?.text || "Désolé, je n'ai pas pu traiter votre demande."
      setMessages(prev => [...prev, { from: 'bot', text: reply }])
    } catch {
      setMessages(prev => [...prev, { from: 'bot', text: "Désolé, une erreur s'est produite. N'hésitez pas à nous contacter directement." }])
    } finally {
      setLoading(false)
    }
  }

  if (!open) {
    return (
    <button onClick={() => setOpen(true)} style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      width: 56, height: 56, borderRadius: '50%',
      background: 'linear-gradient(135deg, #A67C52, #C4976A)',
      border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(166,124,82,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'transform 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
    </button>
    )
  }
  return (
  <div style={{
    position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
    width: 360, maxWidth: 'calc(100vw - 48px)', height: 500, maxHeight: 'calc(100vh - 100px)',
    background: '#fff', borderRadius: 16, overflow: 'hidden',
    boxShadow: '0 8px 40px rgba(0,0,0,0.15)', display: 'flex', flexDirection: 'column',
    fontFamily: "'Raleway', sans-serif",
  }}>
    <div style={{
      background: 'linear-gradient(135deg, #1A2744, #243352)',
      padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <div>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 14 }}>VIVEO Patrimoine</div>
        <div style={{ color: '#A67C52', fontSize: 11 }}>Assistant IA</div>
      </div>
      <button onClick={() => setOpen(false)} style={{
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)',
        fontSize: 20, cursor: 'pointer', padding: 4
      }}>{"✕"}</button>
    </div>
    <div style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {messages.map((m, i) => (
        <div key={i} style={{
          alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start',
          maxWidth: '80%',
          padding: '10px 14px', borderRadius: 12,
          background: m.from === 'user' ? 'linear-gradient(135deg, #A67C52, #C4976A)' : '#f3f4f6',
          color: m.from === 'user' ? '#fff' : '#1A2744',
          fontSize: 13, lineHeight: 1.5,
        }}>{m.text}</div>
      ))}
      {loading && <div style={{ alignSelf: 'flex-start', padding: '10px 14px', borderRadius: 12, background: '#f3f4f6', color: '#999', fontSize: 13 }}>...</div>}
      <div ref={endRef} />
    </div>
    {messages.length <= 2 && (
      <div style={{ padding: '0 16px 8px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {QUICK_REPLIES.map((q, i) => (
          <button key={i} onClick={() => send(q)} style={{
            padding: '6px 12px', borderRadius: 20, border: '1px solid #A67C52',
            background: 'transparent', color: '#A67C52', fontSize: 11,
            cursor: 'pointer', fontFamily: "'Raleway', sans-serif",
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.background = '#A67C52'; e.target.style.color = '#fff' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#A67C52' }}>
            {q}
          </button>
        ))}
      </div>
    )}
    <div style={{ padding: '12px 16px', borderTop: '1px solid #eee', display: 'flex', gap: 8 }}>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && send(input)}
        placeholder="Votre message..."
        style={{
          flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid #e5e7eb',
          fontSize: 13, fontFamily: "'Raleway', sans-serif", outline: 'none',
        }}
      />
      <button onClick={() => send(input)} style={{
        padding: '10px 16px', borderRadius: 8, border: 'none',
        background: 'linear-gradient(135deg, #A67C52, #C4976A)',
        color: '#fff', cursor: 'pointer', fontSize: 13, fontWeight: 600,
      }}>{"→"}</button>
    </div>
  </div>
  )
}
