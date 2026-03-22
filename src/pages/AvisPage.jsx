import AvisClient from '../components/AvisClient'

export default function AvisPage() {
  return (
    <div style={{
      minHeight: '70vh',
      padding: '40px 20px',
      fontFamily: "'Raleway', sans-serif"
    }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 12
        }}>
          {"Avis clients"}
        </h1>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          {"Découvrez les témoignages de nos clients accompagnés dans leur projet immobilier."}
        </p>
      </div>
      <AvisClient />
    </div>
  )
}
