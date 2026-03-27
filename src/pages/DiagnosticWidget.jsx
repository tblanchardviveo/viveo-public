import { useState } from 'react';
import { qualifyProspect } from '../services/qualificationService';
import ResultCard from '../components/ResultCard';

const FIELDS = [
  { key: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Votre prénom' },
  { key: 'revenus', label: 'Revenus annuels (€)', type: 'number', placeholder: '60000' },
  { key: 'situation', label: 'Situation familiale', type: 'select',
    options: ['Célibataire', 'Marié(e)', 'Pacsé(e)', 'Divorcé(e)', 'Veuf/ve'] },
  { key: 'objectif', label: 'Objectif principal', type: 'select',
    options: ['Réduire mes impôts', 'Préparer ma retraite', 'Constituer un patrimoine', 'Générer des revenus complémentaires', 'Protéger ma famille'] },
  { key: 'horizon', label: "Horizon d'investissement", type: 'select',
    options: ['Court terme (< 5 ans)', 'Moyen terme (5-10 ans)', 'Long terme (> 10 ans)'] },
  { key: 'tmi', label: 'Tranche marginale (%)', type: 'select',
    options: ['0', '11', '30', '41', '45'] },
  { key: 'epargne', label: 'Épargne mensuelle (€)', type: 'number', placeholder: '500' },
  { key: 'patrimoine', label: 'Patrimoine existant', type: 'select',
    options: ['< 100 000€', '100 000€ - 300 000€', '300 000€ - 500 000€', '500 000€ - 1M€', '> 1M€'] }
];

export default function DiagnosticWidget() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    try {
      const res = await qualifyProspect(form);
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally { setLoading(false); }
  };

  const page = { minHeight: '100vh', background: '#F7F5F0', padding: '80px 24px 60px' };
  const wrap = { maxWidth: 560, margin: '0 auto' };
  const title = {
    fontFamily: "'Playfair Display', Georgia, serif", fontSize: 32,
    color: 'var(--navy-deep, #111C33)', textAlign: 'center', marginBottom: 8
  };
  const sub = {
    fontFamily: "'Raleway', sans-serif", fontSize: 14, color: 'rgba(17,28,51,0.55)',
    textAlign: 'center', marginBottom: 40
  };
  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: 8,
    border: '1px solid rgba(17,28,51,0.12)', fontSize: 14,
    fontFamily: "'Raleway', sans-serif", background: '#fff',
    outline: 'none', boxSizing: 'border-box'
  };
  const labelStyle = {
    fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 600,
    letterSpacing: '.08em', textTransform: 'uppercase',
    color: 'rgba(17,28,51,0.5)', marginBottom: 6, display: 'block'
  };
  const btn = {
    width: '100%', padding: '16px', border: 'none', borderRadius: 2, cursor: 'pointer',
    background: loading ? 'rgba(166,124,82,0.5)' : 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
    color: '#fff', fontSize: 14, fontWeight: 600, letterSpacing: '.06em',
    textTransform: 'uppercase', fontFamily: "'Raleway', sans-serif", marginTop: 24
  };

  return (
    <div style={page}>
      <div style={wrap}>
        <h1 style={title}>Diagnostic Patrimonial</h1>
        <p style={sub}>Recevez votre recommandation fiscale personnalisée en 30 secondes</p>
        {!result ? (
          <form onSubmit={handleSubmit}>
            {FIELDS.map(f => (
              <div key={f.key} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === 'select' ? (
                  <select style={inputStyle} value={form[f.key] || ''}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} required>
                    <option value="">Sélectionner...</option>
                    {f.options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input style={inputStyle} type={f.type} placeholder={f.placeholder}
                    value={form[f.key] || ''}
                    onChange={e => setForm({ ...form, [f.key]: e.target.value })} required />
                )}
              </div>
            ))}
            <button type="submit" disabled={loading} style={btn}>
              {loading ? 'Analyse en cours...' : 'Obtenir mon diagnostic →'}
            </button>
            {error && <p style={{ color: '#c0392b', fontSize: 13, marginTop: 12, textAlign: 'center' }}>{error}</p>}
          </form>
        ) : (
          <>
            <ResultCard result={result} />
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <button onClick={() => { setResult(null); setForm({}); }}
                style={{ ...btn, background: 'transparent', color: '#A67C52', border: '1px solid #A67C52' }}>
                Refaire un diagnostic
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
