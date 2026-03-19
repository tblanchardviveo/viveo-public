import { useState } from 'react'

// ─── Formatage ────────────────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
const fmtPct = (n) => (Math.round(n * 100) / 100).toFixed(2) + ' %'
const fmtK = (n) => {
  if (Math.abs(n) >= 1000) return (Math.round(n / 100) / 10) + 'k€'
  return fmt(n)
}

// ─── Styles ───────────────────────────────────────────────────────────────────────────
const S = {
  input: {
    width: '100%', padding: '12px 16px', borderRadius: 8, boxSizing: 'border-box',
    border: '1px solid rgba(166,124,82,0.25)', background: 'rgba(255,255,255,0.05)',
    color: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: 'none',
  },
  label: {
    fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: '0.09em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block',
  },
  select: {
    width: '100%', padding: '12px 36px 12px 16px', borderRadius: 8, boxSizing: 'border-box',
    border: '1px solid rgba(166,124,82,0.25)', background: 'rgba(255,255,255,0.05)',
    color: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 14, outline: 'none',
    appearance: 'none', cursor: 'pointer',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A67C52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
  },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 },
  divider: { height: 1, background: 'rgba(166,124,82,0.12)', margin: '24px 0' },
  note: { fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, lineHeight: 1.5 },
  sectionTitle: {
    fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 700,
    letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A67C52',
    marginBottom: 14, display: 'flex', alignItems: 'center', gap: 10,
  },
}

// ─── LISTE DES DISPOSITIFS 2026 ───────────────────────────────────────────────────────
const DISPOSITIFS = [
  { id: 'jeanbrun',        short: 'Jeanbrun',          label: 'Loi Jeanbrun — Statut du bailleur privé (neuf)',    couleur: '#A67C52' },
  { id: 'lmnp',            short: 'LMNP',              label: 'LMNP — Loueur Meublé Non Professionnel',            couleur: '#3498db' },
  { id: 'deficit_foncier', short: 'Déficit Foncier',   label: 'Déficit Foncier — Location nue (charges/travaux)', couleur: '#9b59b6' },
  { id: 'loc_avantages',   short: "Loc'Avantages",     label: "Loc'Avantages — Convention ANAH (prorogé 2027)",    couleur: '#16a085' },
  { id: 'denormandie',     short: 'Denormandie',       label: 'Loi Denormandie — Ancien avec travaux (prorogé 2027)', couleur: '#27ae60' },
  { id: 'malraux',         short: 'Malraux',           label: 'Loi Malraux — Restauration patrimoine',             couleur: '#e67e22' },
  { id: 'monuments',       short: 'Monuments Hist.',   label: 'Monuments Historiques — TMI 41-45%',                couleur: '#c0392b' },
  { id: 'nue_propriete',   short: 'Nue-propriété',     label: 'Nue-propriété — Démembrement',                      couleur: '#7f8c8d' },
]

// ─── MOTEUR DE CALCUL ─────────────────────────────────────────────────────────────
function calculerDispositif({ id, prix, loyerAnnuel, chargesAnnuelles, travaux, tmi, niveauOption, dureeEngagement }) {
  const tmiD = tmi / 100

  switch (id) {

    case 'lmnp': {
      const amortBien     = (prix * 0.85) / 25
      const amortMobilier = (prix * 0.10) / 7
      const amortTotal    = amortBien + amortMobilier
      const resultatBIC = Math.max(loyerAnnuel - chargesAnnuelles - amortTotal, 0)
      const impotSans = (loyerAnnuel - chargesAnnuelles) * tmiD
      const impotAvec = resultatBIC * tmiD
      const ps = resultatBIC * 0.186
      const avantFiscal = Math.max(Math.round(impotSans - impotAvec - ps), 0)
      return {
        avantFiscalAnnuel: avantFiscal,
        detail: `Amortissement ${fmt(Math.round(amortTotal))}/an — revenus quasi non imposés`,
        alerte: 'Amortissements réintégrés dans la plus-value à la revente (LFI 2025). Prélèvements sociaux 18,6% sur revenus BIC (LFSS 2026).',
        compatible: true,
      }
    }

    case 'jeanbrun': {
      const configs = [
        { label: 'Intermédiaire (−15%)', taux: 0.035, plafond: 8000 },
        { label: 'Social (−30%)',        taux: 0.045, plafond: 10000 },
        { label: 'Très social (−45%)',   taux: 0.055, plafond: 12000 },
      ]
      const cfg = configs[Math.min(niveauOption || 0, 2)]
      const baseAmort    = prix * 0.80
      const amortBrut    = baseAmort * cfg.taux
      const amortRetenu  = Math.min(amortBrut, cfg.plafond)
      const economie     = amortRetenu * tmiD
      const revenusNets  = loyerAnnuel - chargesAnnuelles
      const deficit      = Math.max(amortRetenu - revenusNets, 0)
      const deficitImput = Math.min(deficit, 10700)
      const economieSup  = deficitImput * tmiD
      return {
        avantFiscalAnnuel: Math.round(economie + economieSup),
        detail: `80% × ${fmt(prix)} × ${cfg.taux * 100}% = ${fmt(Math.round(amortBrut))} → plafonné ${fmt(cfg.plafond)}/an`,
        alerte: `Loyer ${cfg.label} · Engagement 9 ans min · Appartements collectifs uniquement (neuf VEFA ou ancien rénov.) · Acquisition 20/02/2026–31/12/2028 · Amortissements réintégrés à la revente`,
        compatible: true,
        niveauLabel: cfg.label,
      }
    }

    case 'deficit_foncier': {
      const base = chargesAnnuelles + travaux
      const plafond  = travaux > 0 ? 21400 : 10700
      const imputable = Math.min(base, plafond)
      const economie  = imputable * tmiD
      return {
        avantFiscalAnnuel: Math.round(economie),
        detail: `${fmt(Math.round(imputable))}/an déductibles × TMI ${tmi}%${travaux > 0 ? ' (plafond 21 400€ rénov. énerg.)' : ''}`,
        alerte: "Plafond 10 700€/an sur revenu global (21 400€ si rénovation énergétique jusqu'en 2027). Excédent reportable 10 ans sur revenus fonciers.",
        compatible: true,
      }
    }

    case 'loc_avantages': {
      const niveaux = [
        { label: 'Loc1 (−15%)', taux: 0.15 },
        { label: 'Loc2 (−30%)', taux: 0.35 },
        { label: 'Loc3 (intermédiation)', taux: 0.65 },
      ]
      const cfg = niveaux[Math.min(niveauOption || 0, 2)]
      const reduction = loyerAnnuel * cfg.taux
      return {
        avantFiscalAnnuel: Math.round(reduction),
        detail: `${Math.round(cfg.taux * 100)}% × ${fmt(Math.round(loyerAnnuel))} loyers annuels`,
        alerte: `Convention ANAH obligatoire · Niveau ${cfg.label} · Tout le territoire · Prorogé 31/12/2027 · Engagement 6 ans min`,
        compatible: true,
        niveauLabel: cfg.label,
      }
    }

    case 'denormandie': {
      const base  = Math.min(prix + travaux, 300000)
      const taux  = dureeEngagement >= 12 ? 0.21 : dureeEngagement >= 9 ? 0.18 : 0.12
      const total = base * taux
      return {
        avantFiscalAnnuel: Math.round(total / dureeEngagement),
        reductionTotale:   Math.round(total),
        detail: `${Math.round(taux * 100)}% × ${fmt(Math.min(prix + travaux, 300000))} sur ${dureeEngagement} ans`,
        alerte: "Logement ancien, travaux ≥ 25% du coût total. Villes Action Cœur de Ville / ORT uniquement. Prorogé 31/12/2027.",
        compatible: travaux > 0,
        incompatibleMsg: travaux === 0 ? 'Indiquez un budget travaux pour activer ce dispositif' : null,
      }
    }

    case 'malraux': {
      const travauxRetenus = Math.min(travaux, 400000)
      const total          = travauxRetenus * 0.30
      return {
        avantFiscalAnnuel: Math.round(total / 4),
        reductionTotale:   Math.round(total),
        detail: `30% × ${fmt(Math.round(travauxRetenus))} travaux, étalés sur 4 ans`,
        alerte: "Site Patrimonial Remarquable avec PSMV : 30% · PVAP : 22%. Plafond 400 000€ sur 4 ans. Hors plafonnement niches fiscales.",
        compatible: travaux > 0,
        incompatibleMsg: travaux === 0 ? 'Indiquez un budget travaux de restauration' : null,
      }
    }

    case 'monuments': {
      const base    = chargesAnnuelles + travaux
      const economie = base * tmiD
      return {
        avantFiscalAnnuel: Math.round(economie),
        detail: `100% des charges (${fmt(Math.round(base))}/an) × TMI ${tmi}% — sans plafond`,
        alerte: "Classé ou inscrit aux MH uniquement. Déduction totale sur revenu global, sans plafond. Hors plafonnement niches fiscales. Recommandé TMI 41-45%.",
        compatible: tmi >= 41,
        incompatibleMsg: tmi < 41 ? `Peu optimal à TMI ${tmi}% — ce dispositif est conçu pour TMI 41-45%` : null,
      }
    }

    case 'nue_propriete': {
      return {
        avantFiscalAnnuel: 0,
        economiePrix: Math.round(prix * 0.40),
        detail: `Décote ~40% à l'achat = ${fmt(Math.round(prix * 0.40))} d'économie immédiate`,
        alerte: "Pas de revenus ni de charges pendant le démembrement (15-20 ans). Récupération pleine propriété sans fiscalité supplémentaire. Stratégie patrimoniale long terme.",
        compatible: true,
      }
    }

    default:
      return { avantFiscalAnnuel: 0, detail: '', alerte: '', compatible: true }
  }
}

// ─── Mini barre de progression ──────────────────────────────────────────────────────
function Bar({ value, max, couleur }) {
  const pct = max > 0 ? Math.min((value / max) * 100, 100) : 0
  return (
    <div style={{ height: 5, background: 'rgba(255,255,255,0.07)', borderRadius: 3, marginTop: 8, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: pct + '%', background: couleur, borderRadius: 3, transition: 'width 0.7s ease' }} />
    </div>
  )
}

// ─── Graphique projection SVG ───────────────────────────────────────────────────────
function Projection({ cashflowMensuel, avantFiscalMensuel, duree }) {
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
function KPI({ label, value, color, sub }) {
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
export default function CalcInvestissement({ onResult }) {
  const [prixBien,        setPrixBien]        = useState('')
  const [loyerMensuel,    setLoyerMensuel]    = useState('')
  const [charges,         setCharges]         = useState('')
  const [travaux,         setTravaux]         = useState('')
  const [apport,          setApport]          = useState('')
  const [duree,           setDuree]           = useState('20')
  const [taux,            setTaux]            = useState('3.30')
  const [tmi,             setTmi]             = useState('30')
  const [dispositif,      setDispositif]      = useState('jeanbrun')
  const [niveauOption,    setNiveauOption]    = useState(0)
  const [dureeEngagement, setDureeEngagement] = useState('9')
  const [result,          setResult]          = useState(null)
  const [activeTab,       setActiveTab]       = useState('detail')

  const disp         = DISPOSITIFS.find(d => d.id === dispositif)
  const needsTravaux = ['denormandie','deficit_foncier','malraux','monuments'].includes(dispositif)
  const needsNiveau  = ['jeanbrun','loc_avantages'].includes(dispositif)
  const needsDuree   = dispositif === 'denormandie'

  const niveauxJeanbrun = [
    { label: 'Intermédiaire', sub: '−15% marché · 3,5%/an · 8 000€ max' },
    { label: 'Social',        sub: '−30% marché · 4,5%/an · 10 000€ max' },
    { label: 'Très social',   sub: '−45% marché · 5,5%/an · 12 000€ max' },
  ]
  const niveauxLoc = [
    { label: 'Loc1', sub: '−15% marché · 15% réduction' },
    { label: 'Loc2', sub: '−30% marché · 35% réduction' },
    { label: 'Loc3', sub: 'Intermédiation · 65% réduction' },
  ]
  const niveaux = dispositif === 'jeanbrun' ? niveauxJeanbrun : niveauxLoc

  const calculer = () => {
    const prix    = parseFloat(prixBien)    || 0
    const loyer   = parseFloat(loyerMensuel) || 0
    const ch      = parseFloat(charges)    || 0
    const trx     = parseFloat(travaux)    || 0
    const app     = parseFloat(apport)     || 0
    const d       = parseInt(duree)        || 20
    const tauxM   = (parseFloat(taux) || 3.3) / 100 / 12
    const tmiN    = parseInt(tmi)          || 30
    const dEng    = parseInt(dureeEngagement) || 9

    const emprunt  = Math.max(prix - app, 0)
    const nbMois   = d * 12
    const mensualite = emprunt > 0 && tauxM > 0
      ? (emprunt * tauxM) / (1 - Math.pow(1 + tauxM, -nbMois))
      : emprunt / nbMois

    const loyerAnnuel    = loyer * 12
    const chargesAnnuelles = ch * 12
    const fraisNotaire   = prix * 0.025
    const prixRevient    = prix + fraisNotaire
    const rendBrut  = prix > 0 ? (loyerAnnuel / prix) * 100 : 0
    const rendNet   = prixRevient > 0 ? ((loyerAnnuel - chargesAnnuelles) / prixRevient) * 100 : 0
    const cashflowMensuel = loyer - mensualite - ch

    const params = { id: dispositif, prix, loyerAnnuel, chargesAnnuelles, travaux: trx, tmi: tmiN, niveauOption, dureeEngagement: dEng }
    const fiscal  = calculerDispositif(params)

    const comparateur = DISPOSITIFS.map(dd => {
      const r = calculerDispositif({ ...params, id: dd.id })
      return { ...dd, ...r }
    }).sort((a, b) => {
      const va = a.avantFiscalAnnuel || (a.economiePrix ? a.economiePrix * 0.1 : 0)
      const vb = b.avantFiscalAnnuel || (b.economiePrix ? b.economiePrix * 0.1 : 0)
      return vb - va
    })

    const maxAvantage   = Math.max(...comparateur.map(d => d.avantFiscalAnnuel || 0), 1)
    const cashflowFiscal = cashflowMensuel + fiscal.avantFiscalAnnuel / 12
    const rendNetNet    = prixRevient > 0
      ? ((loyerAnnuel - chargesAnnuelles + fiscal.avantFiscalAnnuel) / prixRevient) * 100
      : 0

    const res = {
      mensualite: Math.round(mensualite),
      emprunt: Math.round(emprunt),
      fraisNotaire: Math.round(fraisNotaire),
      cashflowMensuel: Math.round(cashflowMensuel),
      cashflowFiscal:  Math.round(cashflowFiscal),
      rendBrut:   Math.round(rendBrut  * 100) / 100,
      rendNet:    Math.round(rendNet   * 100) / 100,
      rendNetNet: Math.round(rendNetNet * 100) / 100,
      fiscal, comparateur, maxAvantage,
      duree: d, dispositifLabel: disp?.short || '',
    }
    setResult(res)
    if (onResult) onResult(res)
  }

  return (
    <div style={{ background: 'var(--navy-deep, #0d1526)', borderRadius: 16, padding: 'clamp(24px, 4vw, 40px)', border: '1px solid rgba(166,124,82,0.15)' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
        <span style={{ width: 28, height: 1, background: '#A67C52', display: 'block' }} />
        <span style={{ ...S.label, margin: 0, color: '#A67C52' }}>Rendement & Fiscalité 2026</span>
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(20px, 3vw, 28px)', color: '#fff', fontWeight: 400, marginBottom: 32 }}>
        Investissement locatif
      </h3>

      {/* ── DISPOSITIF ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.sectionTitle}><span style={{ width: 20, height: 1, background: '#A67C52', display: 'block' }} />Dispositif fiscal</div>
        <div style={{ ...S.grid2, marginBottom: 14 }}>
          <div>
            <label style={S.label}>Dispositif</label>
            <select value={dispositif} onChange={e => { setDispositif(e.target.value); setNiveauOption(0) }} style={S.select}>
              {DISPOSITIFS.map(d => <option key={d.id} value={d.id} style={{ background: '#0d1526' }}>{d.short}</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Tranche marginale (TMI)</label>
            <select value={tmi} onChange={e => setTmi(e.target.value)} style={S.select}>
              {[0, 11, 30, 41, 45].map(n => <option key={n} value={n} style={{ background: '#0d1526' }}>{n} %</option>)}
            </select>
          </div>
        </div>

        {disp && (
          <div style={{ padding: '10px 14px', background: 'rgba(166,124,82,0.07)', borderRadius: 8, border: '1px solid rgba(166,124,82,0.15)', marginBottom: 14 }}>
            <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
              {disp.label}
            </p>
          </div>
        )}

        {needsNiveau && (
          <div>
            <label style={S.label}>Niveau de loyer</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {niveaux.map((n, i) => (
                <button key={i} onClick={() => setNiveauOption(i)} style={{
                  flex: 1, minWidth: 110, padding: '10px 12px', borderRadius: 8, cursor: 'pointer', textAlign: 'left', border: 'none',
                  borderLeft: niveauOption === i ? `3px solid #A67C52` : '3px solid rgba(255,255,255,0.1)',
                  background: niveauOption === i ? 'rgba(166,124,82,0.1)' : 'rgba(255,255,255,0.03)',
                }}>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: 700, color: niveauOption === i ? '#C4976A' : 'rgba(255,255,255,0.55)' }}>{n.label}</div>
                  <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{n.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {needsDuree && (
          <div style={{ marginTop: 14 }}>
            <label style={S.label}>Durée d'engagement</label>
            <div style={{ display: 'flex', gap: 8 }}>
              {[[6,'12%'],[9,'18%'],[12,'21%']].map(([n, p]) => (
                <button key={n} onClick={() => setDureeEngagement(String(n))} style={{
                  flex: 1, padding: '10px 0', borderRadius: 8, cursor: 'pointer', border: 'none',
                  borderBottom: dureeEngagement === String(n) ? '2px solid #A67C52' : '2px solid rgba(255,255,255,0.1)',
                  background: dureeEngagement === String(n) ? 'rgba(166,124,82,0.1)' : 'rgba(255,255,255,0.03)',
                  color: dureeEngagement === String(n) ? '#C4976A' : 'rgba(255,255,255,0.45)',
                  fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700,
                }}>
                  {n} ans <span style={{ fontSize: 11, opacity: .7 }}>({p})</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div style={S.divider} />

      {/* ── BIEN ── */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.sectionTitle}><span style={{ width: 20, height: 1, background: '#A67C52', display: 'block' }} />Bien et revenus</div>
        <div style={{ ...S.grid2, marginBottom: 16 }}>
          <div>
            <label style={S.label}>Prix du bien (€)</label>
            <input type="number" value={prixBien} onChange={e => setPrixBien(e.target.value)} placeholder="200 000" style={S.input} />
          </div>
          <div>
            <label style={S.label}>Loyer mensuel (€)</label>
            <input type="number" value={loyerMensuel} onChange={e => setLoyerMensuel(e.target.value)} placeholder="800" style={S.input} />
          </div>
        </div>
        <div style={S.grid2}>
          <div>
            <label style={S.label}>Charges mensuelles (€)</label>
            <input type="number" value={charges} onChange={e => setCharges(e.target.value)} placeholder="150" style={S.input} />
            <p style={S.note}>Copro, taxe foncière, assurance, gestion…</p>
          </div>
          <div>
            <label style={S.label}>{needsTravaux ? 'Budget travaux (€)' : 'Apport personnel (€)'}</label>
            <input type="number"
              value={needsTravaux ? travaux : apport}
              onChange={e => needsTravaux ? setTravaux(e.target.value) : setApport(e.target.value)}
              placeholder={needsTravaux ? '30 000' : '20 000'} style={S.input} />
            {needsTravaux && <p style={S.note}>Travaux déductibles / base de calcul</p>}
          </div>
        </div>
        {needsTravaux && (
          <div style={{ marginTop: 16 }}>
            <label style={S.label}>Apport personnel (€)</label>
            <input type="number" value={apport} onChange={e => setApport(e.target.value)} placeholder="20 000"
              style={{ ...S.input, maxWidth: 'calc(50% - 8px)' }} />
          </div>
        )}
      </div>

      <div style={S.divider} />

      {/* ── CRÉDIT ── */}
      <div style={{ marginBottom: 28 }}>
        <div style={S.sectionTitle}><span style={{ width: 20, height: 1, background: '#A67C52', display: 'block' }} />Financement</div>
        <div style={S.grid2}>
          <div>
            <label style={S.label}>Durée du crédit (ans)</label>
            <select value={duree} onChange={e => setDuree(e.target.value)} style={S.select}>
              {[10, 15, 20, 25].map(n => <option key={n} value={n} style={{ background: '#0d1526' }}>{n} ans</option>)}
            </select>
          </div>
          <div>
            <label style={S.label}>Taux d'intérêt (%)</label>
            <input type="number" step="0.05" value={taux} onChange={e => setTaux(e.target.value)} placeholder="3.30" style={S.input} />
          </div>
        </div>
      </div>

      {/* ── BOUTON ── */}
      <button onClick={calculer} style={{
        width: '100%', padding: '15px 0',
        background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
        color: '#fff', border: 'none', borderRadius: 50,
        fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700,
        letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', marginBottom: 36,
      }}>
        Simuler mon investissement →
      </button>

      {/* ── RÉSULTATS ── */}
      {result && (
        <div style={{ animation: 'fadeIn 0.4s ease' }}>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: 4 }}>
            {[['detail','Détail'],['comparateur','Comparateur 2026'],['projection','Projection']].map(([key, lbl]) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                flex: 1, padding: '9px 4px', borderRadius: 7, cursor: 'pointer', border: 'none',
                background: activeTab === key ? 'rgba(166,124,82,0.18)' : 'transparent',
                color: activeTab === key ? '#C4976A' : 'rgba(255,255,255,0.38)',
                fontFamily: "'Raleway', sans-serif", fontSize: 12, fontWeight: activeTab === key ? 700 : 400,
              }}>{lbl}</button>
            ))}
          </div>

          {/* TAB DÉTAIL */}
          {activeTab === 'detail' && (
            <div>
              <div style={{ ...S.grid3, marginBottom: 12 }}>
                <KPI label="Rendement brut"    value={fmtPct(result.rendBrut)}    color="#C4976A" />
                <KPI label="Rendement net"     value={fmtPct(result.rendNet)}     color="#fff" />
                <KPI label="Rendement net-net" value={fmtPct(result.rendNetNet)}  color="#A67C52" sub="Avec avantage fiscal" />
              </div>
              <div style={{ ...S.grid2, marginBottom: 12 }}>
                <KPI label="Cashflow mensuel"
                  value={`${result.cashflowMensuel >= 0 ? '+' : ''}${fmt(result.cashflowMensuel)}`}
                  color={result.cashflowMensuel >= 0 ? '#2ecc71' : '#e74c3c'}
                  sub="Loyer − mensualité − charges" />
                <KPI label="Cashflow avec avantage fiscal"
                  value={`${result.cashflowFiscal >= 0 ? '+' : ''}${fmt(result.cashflowFiscal)}`}
                  color={result.cashflowFiscal >= 0 ? '#2ecc71' : '#e74c3c'}
                  sub={`${fmt(result.fiscal.avantFiscalAnnuel)}/an d'économie fiscale`} />
              </div>
              <div style={{ ...S.grid2, marginBottom: 20 }}>
                <KPI label="Mensualité crédit" value={fmt(result.mensualite)} color="#fff" />
                <KPI label="Frais de notaire" value={fmt(result.fraisNotaire)} color="rgba(255,255,255,0.45)" sub="~2,5% neuf" />
              </div>

              {/* Badge dispositif */}
              <div style={{ padding: '18px 20px', borderRadius: 10, marginBottom: 12, background: (disp?.couleur || '#A67C52') + '12', border: `1px solid ${disp?.couleur || '#A67C52'}35` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8, flexWrap: 'wrap', gap: 8 }}>
                  <div>
                    <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700, color: disp?.couleur || '#A67C52' }}>
                      {result.dispositifLabel}
                    </span>
                    {result.fiscal.niveauLabel && (
                      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)', marginLeft: 8 }}>
                        — {result.fiscal.niveauLabel}
                      </span>
                    )}
                  </div>
                  {result.fiscal.avantFiscalAnnuel > 0 ? (
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: disp?.couleur || '#A67C52' }}>
                      {fmt(result.fiscal.avantFiscalAnnuel)}<span style={{ fontSize: 13 }}>/an</span>
                    </span>
                  ) : result.fiscal.economiePrix ? (
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#27ae60' }}>
                      −{fmt(result.fiscal.economiePrix)} à l'achat
                    </span>
                  ) : null}
                </div>
                {result.fiscal.detail && (
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: (disp?.couleur || '#A67C52') + 'cc', margin: '0 0 8px' }}>{result.fiscal.detail}</p>
                )}
                {result.fiscal.reductionTotale > 0 && (
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: '#27ae60', fontWeight: 600, margin: '0 0 8px' }}>
                    Réduction totale : {fmt(result.fiscal.reductionTotale)}
                  </p>
                )}
                {result.fiscal.alerte && (
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 8 }}>
                    ⚠ {result.fiscal.alerte}
                  </p>
                )}
                {result.fiscal.incompatibleMsg && (
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: '#e67e22', margin: '6px 0 0' }}>
                    ⚠ {result.fiscal.incompatibleMsg}
                  </p>
                )}
              </div>

              <p style={{ ...S.note, marginTop: 12 }}>
                Simulation indicative — barèmes LFI 19/02/2026 + LFSS 2026. Hors vacance locative et assurance emprunteur. Résultats non contractuels.
              </p>
            </div>
          )}

          {/* TAB COMPARATEUR */}
          {activeTab === 'comparateur' && (
            <div>
              <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 20, lineHeight: 1.6 }}>
                Tous les dispositifs 2026 calculés avec votre situation.{' '}
                <span style={{ color: '#A67C52' }}>Sélectionné : {result.dispositifLabel}</span>
              </p>
              {result.comparateur.map((d, i) => (
                <div key={d.id} style={{
                  padding: '13px 16px', borderRadius: 10, marginBottom: 8, cursor: 'pointer',
                  background: d.id === dispositif ? d.couleur + '14' : 'rgba(255,255,255,0.03)',
                  border: d.id === dispositif ? `1.5px solid ${d.couleur}45` : '1px solid rgba(255,255,255,0.07)',
                  transition: 'all .2s',
                }} onClick={() => { setDispositif(d.id); setActiveTab('detail') }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 700, color: d.couleur, minWidth: 22 }}>#{i + 1}</span>
                      <div>
                        <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 600, color: d.id === dispositif ? d.couleur : '#fff' }}>
                          {d.short}
                        </span>
                        {d.incompatibleMsg && (
                          <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 10, color: '#e67e22', marginLeft: 8, background: 'rgba(230,126,34,0.1)', padding: '1px 6px', borderRadius: 4 }}>
                            ⚠ Conditions
                          </span>
                        )}
                      </div>
                    </div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: d.avantFiscalAnnuel > 0 ? d.couleur : 'rgba(255,255,255,0.25)' }}>
                      {d.avantFiscalAnnuel > 0 ? fmt(d.avantFiscalAnnuel) + '/an'
                        : d.economiePrix ? '−' + fmt(d.economiePrix) + ' achat' : '—'}
                    </span>
                  </div>
                  <Bar value={d.avantFiscalAnnuel || 0} max={result.maxAvantage} couleur={d.couleur} />
                  <p style={{ ...S.note, marginTop: 5 }}>{d.detail || '—'}</p>
                </div>
              ))}
              <p style={{ ...S.note, marginTop: 14 }}>
                Cliquez sur un dispositif pour afficher son détail. Classement par avantage fiscal annuel estimé avec votre situation.
              </p>
            </div>
          )}

          {/* TAB PROJECTION */}
          {activeTab === 'projection' && (
            <div>
              <div style={{ ...S.grid2, marginBottom: 20 }}>
                <KPI label={`Cashflow cumulé brut / ${result.duree} ans`}
                  value={fmt(result.cashflowMensuel * 12 * result.duree)}
                  color={result.cashflowMensuel >= 0 ? '#2ecc71' : '#e74c3c'}
                  sub="Sans avantage fiscal" />
                <KPI label={`Cashflow cumulé net-net / ${result.duree} ans`}
                  value={fmt(result.cashflowFiscal * 12 * result.duree)}
                  color={result.cashflowFiscal >= 0 ? '#A67C52' : '#e74c3c'}
                  sub={`Avec ${result.dispositifLabel}`} />
              </div>
              <div style={{ marginBottom: 6 }}>
                <p style={{ ...S.label, marginBottom: 10 }}>Cashflow cumulé sur {result.duree} ans</p>
                <Projection
                  cashflowMensuel={result.cashflowMensuel}
                  avantFiscalMensuel={result.fiscal.avantFiscalAnnuel / 12}
                  duree={result.duree}
                />
              </div>
              <div style={{ marginTop: 20, padding: '14px 18px', background: 'rgba(166,124,82,0.07)', borderRadius: 10, border: '1px solid rgba(166,124,82,0.2)' }}>
                <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: '#C4976A', fontWeight: 600, margin: '0 0 6px' }}>
                  Gain fiscal total estimé sur {result.duree} ans : {fmt(result.fiscal.avantFiscalAnnuel * result.duree)}
                </p>
                <p style={{ ...S.note, margin: 0 }}>
                  Projection linéaire indicative. Ne tient pas compte de la revalorisation des loyers, de l'évolution des taux ou des réformes fiscales futures.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px) } to { opacity:1; transform:none } }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance:none }
        input::placeholder { color:rgba(255,255,255,0.2) }
        select option { background:#0d1526; color:#fff }
      `}</style>
    </div>
  )
}
