export default function ResultCard({ result }) {
  if (!result) return null;
  const card = {
    background: '#fff', borderRadius: 12, padding: 32,
    boxShadow: '0 2px 16px rgba(17,28,51,0.07)',
    border: '1px solid rgba(166,124,82,0.15)', maxWidth: 600, margin: '32px auto'
  };
  const h2 = {
    fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22,
    color: 'var(--navy-deep, #111C33)', marginBottom: 8
  };
  const badge = {
    display: 'inline-block', background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
    color: '#fff', borderRadius: 20, padding: '6px 16px',
    fontSize: 12, fontWeight: 600, letterSpacing: '.06em',
    textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", marginBottom: 16
  };
  const label = {
    fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: '.12em', textTransform: 'uppercase',
    color: 'rgba(17,28,51,0.45)', marginBottom: 6, marginTop: 20
  };
  const val = {
    fontFamily: "'Raleway', sans-serif", fontSize: 14, color: '#111C33', lineHeight: 1.6
  };
  const eco = {
    fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28,
    color: 'var(--bronze, #A67C52)', fontWeight: 400
  };
  return (
    <div style={card}>
      <p style={label}>Dispositif recommandé</p>
      <h2 style={h2}>{result.dispositif_principal}</h2>
      <span style={badge}>Qualification IA</span>
      {result.dispositifs_complementaires?.length > 0 && (
        <>
          <p style={label}>Dispositifs complémentaires</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {result.dispositifs_complementaires.map((d, i) => (
              <span key={i} style={{ ...badge, background: 'rgba(166,124,82,0.1)', color: '#A67C52' }}>{d}</span>
            ))}
          </div>
        </>
      )}
      <p style={label}>Arguments personnalisés</p>
      <ul style={{ paddingLeft: 20, margin: 0 }}>
        {result.arguments?.map((a, i) => (
          <li key={i} style={val}>{a}</li>
        ))}
      </ul>
      <p style={label}>Économie fiscale estimée</p>
      <p style={eco}>
        {result.economie_fiscale_min?.toLocaleString('fr-FR')}€ — {result.economie_fiscale_max?.toLocaleString('fr-FR')}€
        <span style={{ fontSize: 14, color: 'rgba(17,28,51,0.5)', marginLeft: 8 }}>/an</span>
      </p>
      <p style={label}>Profil résumé</p>
      <p style={{ ...val, fontStyle: 'italic', color: 'rgba(17,28,51,0.6)' }}>
        {result.profil_resume}
      </p>
      <div style={{ marginTop: 28, textAlign: 'center' }}>
        <a href="/rdv-decouverte" style={{
          display: 'inline-block', background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
          color: '#fff', borderRadius: 2, padding: '14px 32px', fontSize: 13,
          fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase',
          fontFamily: "'Raleway', sans-serif", textDecoration: 'none'
        }}>Prendre rendez-vous →</a>
      </div>
    </div>
  );
}
