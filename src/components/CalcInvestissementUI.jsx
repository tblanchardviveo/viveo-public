import { fmt, fmtK } from './calcInvestissement.utils.js';
// ─── Mini barre de progression ──────────────────────────────────────────────────────
export function Bar({ value, max, couleur }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: pct + '%', background: couleur, borderRadius: 3, transition: 'width 0.7s ease' }} />
    </div>
  )
}

// ─── Graphique projection SVG ───────────────────────────────────────────────────────
export function Projection({ cashflowMensuel, avantFiscalMensuel, duree }) {
  const W = 600, H = 170, PL = 64, PR = 16, PT = 16, PB = 28
  const iW = W - PL - PR
  const iH = H - PT - PB

  const data = Array.from({ length: duree + 1 }, (_, i) => ({
    sans:  cashflowMensuel * 12 * i,
    avec: (cashflowMensuel + avantFiscalMensuel) * 12 * i,
  }))

  const allVals = data.flatMap(d => [d.sans, d.avec])
  const minV = Math.min(...allVals), maxV = Math.max(...allVals)
  const range = maxV - minV || 1

  const toX = (i) => PL + (i / duree) * iW
  const toY = (v) => PT + iH - ((v - minV) / range) * iH
  const pathD = (key) => data.map((d, i) => `${i === 0 ? 'M' : 'L'}${toX(i).toFixed(1)},${toY(d[key]).toFixed(1)}`).join(' ')
  const zeroY = toY(0)

  const tickVals = [minV, (minV + maxV) / 2, maxV]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', display: 'block' }}>
      {[0, 0.5, 1].map(t => (
        <line key={t} x1={PL} x2={W - PR} y1={PT + iH * t} y2={PT + iH * t}
          stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      ))}
      {zeroY >= PT && zeroY <= PT + iH && (
        <line x1={PL} x2={W - PR} y1={zeroY} y2={zeroY}
          stroke="rgba(255,255,255,0.18)" strokeWidth="1" strokeDasharray="4 3" />
      )}
      <path d={pathD('sans')} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="5 3" />
      <path d={`${pathD('avec')} L${toX(duree)},${PT + iH} L${PL},${PT + iH} Z`}
        fill="rgba(166,124,82,0.08)" />
      <path d={pathD('avec')} fill="none" stroke="#A67C52" strokeWidth="2" strokeLinecap="round" />
      {tickVals.map((v, i) => (
        <text key={i} x={PL - 6} y={toY(v) + 4} textAnchor="end"
          fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Raleway,sans-serif">
          {fmtK(Math.round(v))}
        </text>
      ))}
      {[0, Math.round(duree / 2), duree].map(a => a > 0 && (
        <text key={a} x={toX(a)} y={H - 6} textAnchor="middle"
          fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="Raleway,sans-serif">
          {a}a
        </text>
      ))}
      <line x1={PL} x2={PL + 16} y1={PT + 9} y2={PT + 9} stroke="#A67C52" strokeWidth="2" />
      <text x={PL + 20} y={PT + 13} fill="rgba(255,255,255,0.6)" fontSize="9" fontFamily="Raleway,sans-serif">Avec avantage fiscal</text>
      <line x1={PL + 118} x2={PL + 134} y1={PT + 9} y2={PT + 9} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" strokeDasharray="5 3" />
      <text x={PL + 138} y={PT + 13} fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="Raleway,sans-serif">Sans avantage fiscal</text>
    </svg>
  )
}

// ─── KPI Card ───────────────────────────────────────────────────────────────────────
export function KPI({ label, value, color, sub }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(166,124,82,0.1)' }}>
      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, color: color || '#C4976A', margin: '6px 0 2px', fontWeight: 400 }}>
        {value}
      </p>
      {sub && <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{sub}</span>}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────────