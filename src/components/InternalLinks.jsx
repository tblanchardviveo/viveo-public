import { useNavigate } from 'react-router-dom'

const DISPOSITIFS = [
  { label: 'LMNP',                  slug: '/dispositifs/lmnp' },
  { label: 'Déficit Foncier',       slug: '/dispositifs/deficit-foncier' },
  { label: 'Nue-propriété',         slug: '/dispositifs/nue-propriete' },
  { label: 'Monuments Historiques', slug: '/dispositifs/monuments-historiques' },
  { label: 'Loi Malraux',           slug: '/dispositifs/loi-malraux' },
  { label: 'Loi Jeanbrun',          slug: '/dispositifs/loi-jeanbrun' },
  { label: 'Loi Denormandie',       slug: '/dispositifs/loi-denormandie' },
]

function LinkCard({ label, slug, active }) {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => navigate(slug)}
      disabled={active}
      style={{
        background: active ? 'rgba(166,124,82,0.12)' : '#fff',
        border: active ? '1.5px solid #A67C52' : '1.5px solid rgba(166,124,82,0.25)',
        borderRadius: 6,
        padding: '10px 16px',
        fontFamily: "'Raleway', sans-serif",
        fontSize: 13,
        fontWeight: 500,
        color: active ? '#A67C52' : '#111C33',
        cursor: active ? 'default' : 'pointer',
        transition: 'border-color 0.2s, color 0.2s, background 0.2s',
        textAlign: 'left',
      }}
      onMouseEnter={e => { if (!active) { e.currentTarget.style.borderColor = '#A67C52'; e.currentTarget.style.color = '#A67C52' } }}
      onMouseLeave={e => { if (!active) { e.currentTarget.style.borderColor = 'rgba(166,124,82,0.25)'; e.currentTarget.style.color = '#111C33' } }}
    >
      {label}
    </button>
  )
}

export default function InternalLinks({ dispositif, context }) {
  const navigate = useNavigate()
  const others = DISPOSITIFS.filter(d => d.label !== dispositif)

  return (
    <section style={{ background: '#F7F5F0', borderRadius: 12, padding: '40px 32px', marginTop: 48 }}>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 22,
        fontWeight: 400,
        color: '#111C33',
        marginBottom: 8,
        letterSpacing: '0.01em',
      }}>
        Pour aller plus loin
      </h3>
      {context && (
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: 14,
          color: 'rgba(17,28,51,0.55)',
          marginBottom: 24,
        }}>
          {context}
        </p>
      )}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: 10,
        marginBottom: 28,
      }}>
        {others.map(d => (
          <LinkCard key={d.slug} label={d.label} slug={d.slug} active={false} />
        ))}
      </div>
      <button
        onClick={() => navigate('/rdv-decouverte')}
        style={{
          background: '#111C33',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '13px 28px',
          fontFamily: "'Raleway', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#1a2a4a' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#111C33' }}
      >
        Prendre rendez-vous →
      </button>
    </section>
  )
}
