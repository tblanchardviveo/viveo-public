import NewsletterWidget from '../components/NewsletterWidget'

export default function NewsletterPage() {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 20px',
      fontFamily: "'Raleway', sans-serif"
    }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#fff',
          marginBottom: 12
        }}>
          {"Newsletter Viveo Patrimoine"}
        </h1>
        <p style={{
          fontSize: 15,
          color: 'rgba(255,255,255,0.5)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.7
        }}>
          {"Recevez chaque mois nos meilleures opportunit\u00e9s immobili\u00e8res, conseils patrimoniaux et analyses de march\u00e9."}
        </p>
      </div>
      <NewsletterWidget />
    </div>
  )
}
