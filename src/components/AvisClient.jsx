import { useState } from 'react'

const avisData = [
  {
    nom: "Sophie M.",
    ville: "Lyon",
    note: 5,
    texte: "Accompagnement remarquable du d\u00e9but \u00e0 la fin. L'\u00e9quipe Viveo a su trouver le programme id\u00e9al pour notre investissement locatif.",
    date: "Mars 2025"
  },
  {
    nom: "Thomas D.",
    ville: "Bordeaux",
    note: 5,
    texte: "Tr\u00e8s satisfait de la r\u00e9activit\u00e9 et du professionnalisme. Notre r\u00e9sidence principale a \u00e9t\u00e9 trouv\u00e9e en moins de 2 semaines.",
    date: "F\u00e9vrier 2025"
  },
  {
    nom: "Claire et Julien R.",
    ville: "Toulouse",
    note: 4,
    texte: "Un vrai gain de temps gr\u00e2ce au moteur de recherche et aux simulateurs. On recommande vivement Viveo Patrimoine.",
    date: "Janvier 2025"
  },
  {
    nom: "Marc L.",
    ville: "Nantes",
    note: 5,
    texte: "Le programme de parrainage est un vrai plus. J'ai parrain\u00e9 deux amis et tout le monde y a gagn\u00e9.",
    date: "D\u00e9cembre 2024"
  }
]

function StarRating({ note }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= note ? '#f59e0b' : '#d1d5db', fontSize: 18 }}>
          {"\u2605"}
        </span>
      ))}
    </div>
  )
}

export default function AvisClient() {
  const [visibleCount, setVisibleCount] = useState(3)

  return (
    <section style={{
      maxWidth: 900,
      margin: '0 auto',
      padding: '60px 20px',
      fontFamily: "'Raleway', sans-serif"
    }}>
      <h2 style={{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 700,
        color: 'var(--vert-principal)',
        marginBottom: 12
      }}>
        {"Ce que disent nos clients"}
      </h2>
      <p style={{
        textAlign: 'center',
        fontSize: 14,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 40
      }}>
        {"Avis v\u00e9rifi\u00e9s de nos clients accompagn\u00e9s"}
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: 24
      }}>
        {avisData.slice(0, visibleCount).map((avis, idx) => (
          <div key={idx} style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            padding: 24,
            transition: 'transform 0.2s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <StarRating note={avis.note} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{avis.date}</span>
            </div>
            <p style={{
              fontSize: 13,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: 16,
              fontStyle: 'italic'
            }}>
              {'"' + avis.texte + '"'}
            </p>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', margin: 0 }}>{avis.nom}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>{avis.ville}</p>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < avisData.length && (
        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <button
            onClick={() => setVisibleCount(avisData.length)}
            style={{
              background: 'transparent',
              border: '1px solid var(--vert-principal)',
              color: 'var(--vert-principal)',
              padding: '10px 28px',
              borderRadius: 50,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: "'Raleway', sans-serif",
              transition: 'all 0.3s'
            }}
          >
            {"Voir plus d'avis"}
          </button>
        </div>
      )}
    </section>
  )
}
