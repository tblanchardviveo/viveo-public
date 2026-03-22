import { useReveal } from '../../hooks/useReveal'

export default function StatementHome() {
  const [ref, visible] = useReveal()

  const s = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(32px)',
    transition: 'opacity 0.8s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)'
  }

  return (
    <section ref={ref} data-bg="#F7F5F1" style={{ background: '#F7F5F1', padding: '15vh 6vw' }}>
      <div style={s}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <span style={{ width: 32, height: 1, background: '#A67C52', display: 'block' }} />
          <span style={{
            fontFamily: "'Raleway', sans-serif", fontWeight: 500,
            fontSize: 11, textTransform: 'uppercase',
            letterSpacing: '0.25em', color: '#A67C52'
          }}>{"UNE APPROCHE DIFFÉRENTE"}</span>
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(42px, 7vw, 96px)', fontWeight: 400,
          lineHeight: 1.0, color: '#111C33',
          letterSpacing: '-0.02em', maxWidth: 900
        }}>
          Pas un agent.<br />
          {"Un expert côté"}<br />
          <em style={{ fontStyle: 'italic', color: '#A67C52' }}>promoteur.</em>
        </h2>
        <p style={{
          fontFamily: "'Raleway', sans-serif", fontWeight: 300,
          fontSize: 'clamp(16px, 1.6vw, 20px)', color: '#555',
          maxWidth: 540, lineHeight: 1.8, marginTop: 40
        }}>
          {"Bouygues Immobilier, Nexity, Promogim, Demathieu & Bard. Nous avons travaillé pour eux. Aujourd’hui, nous travaillons pour vous — avec une connaissance de l’intérieur que peu de conseillers peuvent revendiquer."}
        </p>
      </div>
    </section>
  )
}
