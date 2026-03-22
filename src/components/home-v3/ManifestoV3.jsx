import { useEffect, useRef, useState } from 'react'

const allLines = [
  { text: 'Nous avons passé 27 ans', italic: false },
  { text: 'à construire vos programmes.', italic: false },
  { text: "Aujourd'hui, nous construisons", italic: false },
  { text: 'votre patrimoine.', italic: true }
]

export default function ManifestoV3() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} data-bg="#F7F5F1" style={{
      background: '#F7F5F1', padding: '18vh 6vw', position: 'relative',
      minHeight: '60vh', display: 'flex', alignItems: 'center'
    }}>
      {/* Decorative line */}
      <div style={{
        position: 'absolute', left: '6vw', top: '50%', transform: 'translateY(-50%)',
        width: 1, height: 80,
        background: 'linear-gradient(to bottom, transparent, #A67C52, transparent)'
      }} />

      <div style={{ maxWidth: 820, marginLeft: 48 }}>
        {/* Text lines */}
        {allLines.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <div style={{
              transform: visible ? 'translateY(0)' : 'translateY(100%)',
              transition: `transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94) ${i * 0.12}s`
            }}>
              {line.italic ? (
                <em style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: 'clamp(28px, 4.5vw, 62px)', fontWeight: 300,
                  lineHeight: 1.15, letterSpacing: '-0.02em',
                  color: '#A67C52', fontStyle: 'italic', display: 'block'
                }}>{line.text}</em>
              ) : (
                <span style={{
                  fontFamily: "'Playfair Display',Georgia,serif",
                  fontSize: 'clamp(28px, 4.5vw, 62px)', fontWeight: 300,
                  lineHeight: 1.15, letterSpacing: '-0.02em',
                  color: '#111C33', display: 'block'
                }}>{line.text}</span>
              )}
            </div>
          </div>
        ))}

        {/* Signature */}
        <p style={{
          fontFamily: "'Raleway',sans-serif", fontWeight: 200, fontSize: 13,
          color: 'rgba(166,124,82,0.50)', letterSpacing: '0.15em',
          marginTop: 48, textAlign: 'right',
          opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.6s'
        }}>{"— L'équipe VIVEO Patrimoine"}</p>
      </div>
    </section>
  )
}
