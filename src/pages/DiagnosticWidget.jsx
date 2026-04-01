import { useState } from 'react'
import { qualifyProspect } from '../services/qualificationService'
import ResultCard from '../components/ResultCard'

const STEPS = [
  { key: 'tmi', label: 'Quelle est votre tranche marginale d\'imposition ?',
    options: ['0 %', '11 %', '30 %', '41 %', '45 %'] },
  { key: 'objectif', label: 'Quel est votre objectif principal ?',
    options: ['Réduire mes impôts', 'Préparer ma retraite', 'Constituer un patrimoine', 'Générer des revenus complémentaires'] },
  { key: 'horizon', label: 'Quel est votre horizon d\'investissement ?',
    options: ['Court terme (< 5 ans)', 'Moyen terme (5–10 ans)', 'Long terme (> 10 ans)'] },
  { key: 'budget', label: 'Quel est votre budget d\'investissement ?',
    options: ['< 100 000 €', '100 000 – 300 000 €', '300 000 – 500 000 €', '> 500 000 €'] },
  { key: 'experience', label: 'Quelle est votre expérience en investissement locatif ?',
    options: ['Aucune expérience', 'Un premier investissement', 'Investisseur confirmé', 'Patrimoine locatif constitué'] },
]

const S = {
  page:  { minHeight: '100vh', background: '#F7F5F1', padding: '80px 24px 60px', fontFamily: "'Raleway', sans-serif" },
  wrap:  { maxWidth: 560, margin: '0 auto' },
  logo:  { textAlign: 'center', marginBottom: 40 },
  logoT: { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#111C33', letterSpacing: 4 },
  logoDot: { color: '#A67C52' },
  progress: { height: 3, background: 'rgba(166,124,82,0.15)', borderRadius: 2, marginBottom: 40, overflow: 'hidden' },
  progressBar: (pct) => ({ height: '100%', width: `${pct}%`, background: 'linear-gradient(90deg,#A67C52,#C4976A)', borderRadius: 2, transition: 'width .4s ease' }),
  card:  { background: '#fff', borderRadius: 16, padding: '40px 36px', boxShadow: '0 4px 32px rgba(17,28,51,0.07)', border: '1px solid rgba(166,124,82,0.1)' },
  step:  { fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: '#A67C52', marginBottom: 12 },
  q:     { fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, color: '#111C33', marginBottom: 28, lineHeight: 1.4 },
  opt:   (sel) => ({
    display: 'block', width: '100%', textAlign: 'left', padding: '14px 18px', marginBottom: 10,
    border: `1.5px solid ${sel ? '#A67C52' : 'rgba(17,28,51,0.12)'}`,
    background: sel ? 'rgba(166,124,82,0.06)' : '#fff', borderRadius: 8, cursor: 'pointer',
    fontFamily: "'Raleway', sans-serif", fontSize: 14,
    color: sel ? '#A67C52' : '#111C33', fontWeight: sel ? 600 : 400,
    transition: 'all .15s ease',
  }),
  btn:   { width: '100%', padding: '16px', border: 'none', borderRadius: 8, cursor: 'pointer',
    background: 'linear-gradient(135deg,#A67C52 0%,#C4976A 100%)', color: '#fff',
    fontSize: 14, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase',
    fontFamily: "'Raleway', sans-serif", marginTop: 8 },
  back:  { background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(17,28,51,0.4)',
    fontSize: 13, fontFamily: "'Raleway', sans-serif", marginTop: 12, display: 'block', margin: '12px auto 0' },
  err:   { color: '#c0392b', fontSize: 13, textAlign: 'center', marginTop: 12 },
}

export default function DiagnosticWidget() {
  const [step, setStep]       = useState(0)
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)
  const [error, setError]     = useState(null)

  const current = STEPS[step]
  const pct     = ((step) / STEPS.length) * 100

  const select = async (val) => {
    const updated = { ...answers, [current.key]: val }
    setAnswers(updated)
    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setLoading(true); setError(null)
      try {
        const payload = {
          tmi:       updated.tmi?.replace(' %', ''),
          objectif:  updated.objectif,
          horizon:   updated.horizon,
          revenus:   updated.budget,
          patrimoine: updated.experience,
        }
        const res = await qualifyProspect(payload)
        setResult(res)
        setLoading(false)
      } catch (e) {
        setError(e.message)
        setLoading(false)
      }
    }
  }

  const reset = () => { setStep(0); setAnswers({}); setResult(null); setError(null); setLoading(false) }

  return (
    <div style={S.page}>
      <div style={S.wrap}>
        <div style={S.logo}>
          <span style={S.logoT}>VIVEO<span style={S.logoDot}>.</span></span>
        </div>

        {!result && !loading && (
          <>
            <div style={S.progress}><div style={S.progressBar(pct)} /></div>
            <div style={S.card}>
              <p style={S.step}>Question {step + 1} / {STEPS.length}</p>
              <p style={S.q}>{current.label}</p>
              {current.options.map(o => (
                <button key={o} style={S.opt(answers[current.key] === o)} onClick={() => select(o)}>{o}</button>
              ))}
              {step > 0 && <button style={S.back} onClick={() => setStep(step - 1)}>← Retour</button>}
            </div>
          </>
        )}

        {loading && (
          <div style={{ ...S.card, textAlign: 'center', padding: '60px 36px' }}>
            <p style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: '#111C33', marginBottom: 12 }}>Analyse en cours…</p>
            <p style={{ fontSize: 13, color: 'rgba(17,28,51,0.5)' }}>Notre IA analyse votre profil patrimonial</p>
          </div>
        )}

        {result && (
          <>
            <ResultCard result={result} />
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button onClick={reset} style={{ background: 'none', border: '1px solid #A67C52', color: '#A67C52', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontSize: 13, fontFamily: "'Raleway',sans-serif" }}>
                Refaire le diagnostic
              </button>
            </div>
          </>
        )}

        {error && <p style={S.err}>{error}</p>}
      </div>
    </div>
  )
}
