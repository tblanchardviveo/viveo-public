import { useState, useRef, useEffect } from 'react'

// ─── Formatage ────────────────────────────────────────────────────────────────
const fmt = (n) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)

// ─── PTZ 2026 — LFI 19/02/2026 + Décret 29/03/2025 ──────────────────────────
const PLAFONDS_RESSOURCES = {
  A:   [49000, 73500, 88200, 102900, 117600, 132300, 147000, 161700],
  B1:  [34500, 51750, 62100, 72450,  82800,  93150,  103500, 113850],
  B2:  [31500, 47250, 56700, 66150,  75600,  85050,  94500,  103950],
  C:   [28500, 42750, 51300, 59850,  68400,  76950,  85500,  94050],
}
PLAFONDS_RESSOURCES['Abis'] = PLAFONDS_RESSOURCES['A']

const PLAFONDS_OPERATION = {
  A:   [150000, 210000, 255000, 300000, 345000, 390000, 435000, 480000],
  Abis:[150000, 210000, 255000, 300000, 345000, 390000, 435000, 480000],
  B1:  [135000, 189000, 230000, 270000, 311000, 351000, 392000, 432000],
  B2:  [99000,  138600, 168300, 198000, 227700, 257400, 287100, 316800],
  C:   [99000,  138600, 168300, 198000, 227700, 257400, 287100, 316800],
}

const QUOTITES = [0.50, 0.40, 0.40, 0.20]
const SEUILS_TRANCHES = [0.51, 0.63, 0.76, 1.00]
const DIFFERE = [10, 8, 2, 0]
const PTZ_MAX = 180000

// ─── Fonction de calcul PTZ ──────────────────────────────────────────────────────────────
function calculerPTZ({ rfr, nbPersonnes, zone, prixBien, premierAchat }) {
  if (!premierAchat) return { eligible: false, montant: 0, tranche: null, differe: 0, raison: 'Non primo-accédant' }

  const idx = Math.min(nbPersonnes, 8) - 1
  const plafondRessources = PLAFONDS_RESSOURCES[zone]?.[idx] ?? 0
  const plafondOperation = PLAFONDS_OPERATION[zone]?.[idx] ?? 0

  if (rfr > plafondRessources) {
    return { eligible: false, montant: 0, tranche: null, differe: 0, raison: `Revenus (${fmt(rfr)}) > plafond (${fmt(plafondRessources)})` }
  }

  const ratio = rfr / plafondRessources
  let tranche = 3
  for (let i = 0; i < SEUILS_TRANCHES.length; i++) {
    if (ratio <= SEUILS_TRANCHES[i]) { tranche = i; break }
  }

  const baseOperation = Math.min(prixBien, plafondOperation)
  const montantBrut = baseOperation * QUOTITES[tranche]
  const montant = Math.min(montantBrut, PTZ_MAX)

  return {
    eligible: true,
    montant: Math.round(montant),
    tranche: tranche + 1,
    quotite: QUOTITES[tranche],
    plafondRessources,
    plafondOperation,
    differe: DIFFERE[tranche],
    raison: null,
  }
}

// ─── Zonage automatique par commune ────────────────────────────────────────────────
const COMMUNES_ZONE = {
  'Lille': 'B1', 'Roubaix': 'B1', 'Tourcoing': 'B1', "Villeneuve-d'Ascq": 'B1',
  'Amiens': 'B1', 'Reims': 'B1',
  'Arras': 'B2', 'Lens': 'B2', 'Douai': 'B2', 'Valenciennes': 'B2',
  'Dunkerque': 'B2', 'Calais': 'B2', 'Boulogne-sur-Mer': 'B2',
  'Béthune': 'B2', 'Liévin': 'B2', 'Hénin-Beaumont': 'B2',
  'Maubeuge': 'B2', 'Saint-Quentin': 'B2', 'Compiègne': 'B2',
  'Cambrai': 'B2', 'Soissons': 'B2', 'Laon': 'B2',
  'Hazebrouck': 'B2', 'Bruay-la-Buissière': 'B2', 'Noyon': 'B2',
  'Aire-sur-la-Lys': 'B2', 'Montreuil-sur-Mer': 'C',
  'Paris': 'Abis', 'Boulogne-Billancourt': 'Abis', 'Versailles': 'Abis',
  'Neuilly-sur-Seine': 'Abis', 'Saint-Denis': 'Abis', 'Montreuil': 'Abis',
  'Nanterre': 'Abis', 'Créteil': 'Abis', 'Courbevoie': 'Abis',
  'Lyon': 'A', 'Marseille': 'A', 'Montpellier': 'A', 'Nice': 'A',
  'Strasbourg': 'A', 'Grenoble': 'A', 'Bordeaux': 'A', 'Toulouse': 'A',
  'Nantes': 'A', 'Rennes': 'A',
  'Rouen': 'B1', 'Toulon': 'B1', 'Angers': 'B1', 'Dijon': 'B1',
  'Caen': 'B1', 'Le Mans': 'B1', 'Clermont-Ferrand': 'B1', 'Tours': 'B1',
  'Perpignan': 'B1', 'Aix-en-Provence': 'B1',
  'Péronne': 'C', 'Hirson': 'C', 'Vervins': 'C',
}

const ZONE_LABELS = {
  'Abis': 'Zone A bis — Paris et proche couronne',
  'A':    'Zone A — Grandes métropoles',
  'B1':   'Zone B1 — Agglomérations > 250 000 hab.',
  'B2':   'Zone B2 — Agglomérations > 50 000 hab.',
  'C':    'Zone C — Reste du territoire',
}

// ─── Styles partagés ────────────────────────────────────────────────────────────────
const inputStyle = {
  width: '100%', padding: '12px 16px', borderRadius: 8,
  border: '1px solid rgba(166,124,82,0.25)', background: 'rgba(255,255,255,0.06)',
  color: '#fff', fontFamily: "'Raleway', sans-serif", fontSize: 14,
  outline: 'none', boxSizing: 'border-box',
}
const labelStyle = {
  fontFamily: "'Raleway', sans-serif", fontSize: 11, fontWeight: 600,
  letterSpacing: '0.09em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)', marginBottom: 6, display: 'block',
}
const selectStyle = {
  ...inputStyle,
  appearance: 'none', cursor: 'pointer',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23A67C52' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
  paddingRight: 36,
}

// ─── Composant autocomplete commune ────────────────────────────────────────────────
function CommuneAutocomplete({ onSelect }) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [detected, setDetected] = useState(null)
  const ref = useRef()

  useEffect(() => {
    if (query.length < 2) { setSuggestions([]); return }
    const q = query.toLowerCase()
    const matches = Object.entries(COMMUNES_ZONE)
      .filter(([nom]) => nom.toLowerCase().startsWith(q))
      .slice(0, 6)
    setSuggestions(matches)
  }, [query])

  const select = ([nom, zone]) => {
    setDetected({ nom, zone })
    setQuery(nom)
    setSuggestions([])
    onSelect(zone)
  }

  return (
    <div style={{ position: 'relative' }} ref={ref}>
      <input
        value={query}
        onChange={e => { setQuery(e.target.value); setDetected(null) }}
        placeholder="Ex : Arras, Dunkerque, Lens…"
        style={{ ...inputStyle, paddingRight: detected ? 40 : 16 }}
      />
      {detected && (
        <span style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(166,124,82,0.2)', color: '#C4976A',
          fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
          letterSpacing: '0.06em',
        }}>
          {detected.zone}
        </span>
      )}
      {suggestions.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10,
          background: '#1a2540', border: '1px solid rgba(166,124,82,0.3)',
          borderRadius: 8, marginTop: 4, overflow: 'hidden',
        }}>
          {suggestions.map(([nom, zone]) => (
            <div
              key={nom}
              onMouseDown={() => select([nom, zone])}
              style={{
                padding: '10px 16px', cursor: 'pointer', display: 'flex',
                justifyContent: 'space-between', alignItems: 'center',
                fontFamily: "'Raleway', sans-serif", fontSize: 14, color: '#fff',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <span>{nom}</span>
              <span style={{ fontSize: 11, color: '#A67C52', fontWeight: 700 }}>{zone}</span>
            </div>
          ))}
        </div>
      )}
      {detected && (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(166,124,82,0.8)', fontFamily: "'Raleway', sans-serif" }}>
          {ZONE_LABELS[detected.zone]}
        </p>
      )}
      {query.length >= 2 && !detected && suggestions.length === 0 && (
        <p style={{ margin: '6px 0 0', fontSize: 12, color: 'rgba(255,255,255,0.35)', fontFamily: "'Raleway', sans-serif" }}>
          Commune non trouvée — sélectionnez la zone manuellement ci-dessous
        </p>
      )}
    </div>
  )
}

// ─── Composant principal ──────────────────────────────────────────────────────────────
export default function CalcResidencePrincipale({ onResult }) {
  const [rfr, setRfr] = useState('')
  const [personnes, setPersonnes] = useState('2')
  const [zone, setZone] = useState('B2')
  const [prixBien, setPrixBien] = useState('')
  const [apport, setApport] = useState('')
  const [duree, setDuree] = useState('20')
  const [taux, setTaux] = useState('3.30')
  const [premierAchat, setPremierAchat] = useState(true)
  const [result, setResult] = useState(null)

  const calculer = () => {
    const rev = parseFloat(rfr) || 0
    const prix = parseFloat(prixBien) || 0
    const app = parseFloat(apport) || 0
    const d = parseInt(duree) || 20
    const tauxMensuel = (parseFloat(taux) || 3.3) / 100 / 12
    const nb = Math.min(Math.max(parseInt(personnes) || 2, 1), 8)

    const ptz = calculerPTZ({ rfr: rev, nbPersonnes: nb, zone, prixBien: prix, premierAchat })

    const montantEmprunt = Math.max(prix - app - ptz.montant, 0)
    const nbMois = d * 12

    const mensualite = montantEmprunt > 0 && tauxMensuel > 0
      ? (montantEmprunt * tauxMensuel) / (1 - Math.pow(1 + tauxMensuel, -nbMois))
      : montantEmprunt / nbMois

    const dureePTZ = Math.max(d - ptz.differe, 5)
    const mensualitePTZ = ptz.montant > 0 ? ptz.montant / (dureePTZ * 12) : 0

    const revenusMensuels = rev / 12
    const tauxEndettement = revenusMensuels > 0
      ? ((mensualite + mensualitePTZ) / revenusMensuels) * 100
      : 0

    const tauxEndettementDiffere = revenusMensuels > 0
      ? (mensualite / revenusMensuels) * 100
      : 0

    const coutTotal = mensualite * nbMois + ptz.montant
    const economiesPTZ = mensualitePTZ * dureePTZ * 12 * ((parseFloat(taux) || 3.3) / 100)

    const res = {
      ptz,
      montantEmprunt: Math.round(montantEmprunt),
      mensualite: Math.round(mensualite),
      mensualitePTZ: Math.round(mensualitePTZ),
      mensualiteTotal: Math.round(mensualite + mensualitePTZ),
      coutTotal: Math.round(coutTotal),
      tauxEndettement: Math.round(tauxEndettement * 10) / 10,
      tauxEndettementDiffere: Math.round(tauxEndettementDiffere * 10) / 10,
      alerteEndettement: tauxEndettement > 35,
      economiesPTZ: Math.round(economiesPTZ),
      dureePTZ,
    }
    setResult(res)
    if (onResult) onResult(res)
  }

  const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }

  return (
    <div style={{
      background: 'var(--navy-deep, #0d1526)', borderRadius: 16,
      padding: 'clamp(24px, 4vw, 40px)', border: '1px solid rgba(166,124,82,0.15)',
    }}>
      {/* ── Commune / Zone ── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...labelStyle, color: '#A67C52', fontSize: 12, marginBottom: 12 }}>
          Localisation du bien
        </p>
        <div style={grid2}>
          <div>
            <label style={labelStyle}>Commune</label>
            <CommuneAutocomplete onSelect={z => setZone(z)} />
          </div>
          <div>
            <label style={labelStyle}>Zone PTZ (auto ou manuel)</label>
            <select value={zone} onChange={e => setZone(e.target.value)} style={selectStyle}>
              <option value="Abis">A bis — Paris proche couronne</option>
              <option value="A">A — Grandes métropoles</option>
              <option value="B1">B1 — Agglo. &gt; 250 000 hab.</option>
              <option value="B2">B2 — Agglo. &gt; 50 000 hab.</option>
              <option value="C">C — Reste du territoire</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(166,124,82,0.1)', marginBottom: 24 }} />

      {/* ── Revenus et foyer ── */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ ...labelStyle, color: '#A67C52', fontSize: 12, marginBottom: 12 }}>
          Situation personnelle
        </p>
        <div style={grid2}>
          <div>
            <label style={labelStyle}>Revenus fiscaux N-2 (€/an)</label>
            <input
              type="number" value={rfr}
              onChange={e => setRfr(e.target.value)}
              placeholder="Ex : 45000"
              style={inputStyle}
            />
            <p style={{ margin: '5px 0 0', fontSize: 11, color: 'rgba(255,255,255,0.35)', fontFamily: "'Raleway', sans-serif" }}>
              RFR 2024 — avis d'imposition 2025
            </p>
          </div>
          <div>
            <label style={labelStyle}>Personnes dans le foyer</label>
            <select value={personnes} onChange={e => setPersonnes(e.target.value)} style={selectStyle}>
              {[1,2,3,4,5,6,7,8].map(n => (
                <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginTop: 16 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <div
              onClick={() => setPremierAchat(!premierAchat)}
              style={{
                width: 42, height: 24, borderRadius: 12, position: 'relative',
                background: premierAchat ? 'linear-gradient(135deg, #A67C52, #C4976A)' : 'rgba(255,255,255,0.1)',
                transition: 'background 0.3s', flexShrink: 0, cursor: 'pointer',
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: premierAchat ? 21 : 3,
                width: 18, height: 18, borderRadius: '50%', background: '#fff',
                transition: 'left 0.3s',
              }} />
            </div>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>
              Primo-accédant (éligible PTZ)
            </span>
          </label>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(166,124,82,0.1)', marginBottom: 24 }} />

            {/* ── Financement ── */}
      <div style={{ marginBottom: 28 }}>
        <p style={{ ...labelStyle, color: '#A67C52', fontSize: 12, marginBottom: 12 }}>
          Projet immobilier
        </p>
        <div style={{ ...grid2, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Prix du bien (€)</label>
            <input type="number" value={prixBien} onChange={e => setPrixBien(e.target.value)} placeholder="Ex : 220000" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Apport personnel (€)</label>
            <input type="number" value={apport} onChange={e => setApport(e.target.value)} placeholder="Ex : 20000" style={inputStyle} />
          </div>
        </div>
        <div style={grid2}>
          <div>
            <label style={labelStyle}>Durée du crédit (ans)</label>
            <select value={duree} onChange={e => setDuree(e.target.value)} style={selectStyle}>
              {[15,20,25].map(d => <option key={d} value={d}>{d} ans</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Taux d'intérêt (%)</label>
            <input
              type="number" step="0.05" value={taux}
              onChange={e => setTaux(e.target.value)}
              placeholder="3.30"
              style={inputStyle}
            />
          </div>
        </div>
      </div>

            {/* ── Bouton ── */}
      <button
        onClick={calculer}
        style={{
          width: '100%', padding: '14px 0',
          background: 'linear-gradient(135deg, #A67C52 0%, #C4976A 100%)',
          color: '#fff', border: 'none', borderRadius: 50,
          fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
          marginBottom: 28,
        }}
      >
        Calculer mon financement →
      </button>

            {/* ── Résultats ── */}
      {result && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>

          {/* Badge PTZ */}
          {result.ptz.eligible ? (
            <div style={{
              background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.3)',
              borderRadius: 10, padding: '14px 18px', marginBottom: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, fontWeight: 700, color: '#27ae60' }}>
                  ✓ Éligible au PTZ 2026 — Tranche {result.ptz.tranche}
                </span>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#27ae60', fontWeight: 400 }}>
                  {fmt(result.ptz.montant)}
                </span>
              </div>
              <div style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(39,174,96,0.8)', lineHeight: 1.5 }}>
                Quotité {Math.round(result.ptz.quotite * 100)}% · Différé {result.ptz.differe} an{result.ptz.differe > 1 ? 's' : ''} · Plafond opération {fmt(result.ptz.plafondOperation)}
              </div>
            </div>
          ) : premierAchat && rfr ? (
            <div style={{
              background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.25)',
              borderRadius: 10, padding: '12px 18px', marginBottom: 20,
            }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(231,76,60,0.9)' }}>
                ✗ Non éligible PTZ — {result.ptz.raison}
              </span>
            </div>
          ) : null}

          {/* Grille résultats */}
          <div style={{ ...grid2, marginBottom: 16 }}>
            <ResultCard
              label="Mensualité crédit principal"
              value={fmt(result.mensualite)}
              sub={`Pendant ${duree} ans`}
            />
            <ResultCard
              label="Montant emprunté"
              value={fmt(result.montantEmprunt)}
              sub="Hors PTZ"
            />
          </div>

          {result.ptz.eligible && result.ptz.differe > 0 && (
            <div style={{
              background: 'rgba(166,124,82,0.08)', border: '1px solid rgba(166,124,82,0.2)',
              borderRadius: 10, padding: '14px 18px', marginBottom: 16,
            }}>
              <p style={{ ...labelStyle, marginBottom: 8 }}>Mensualités par phase</p>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                <div>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    Pendant le différé ({result.ptz.differe} ans)
                  </span>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#C4976A', margin: '4px 0 0' }}>
                    {fmt(result.mensualite)}<span style={{ fontSize: 13, fontWeight: 300 }}>/mois</span>
                  </p>
                  <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.35)', margin: '2px 0 0' }}>
                    Taux endettement : {result.tauxEndettementDiffere}%
                  </p>
                </div>
                <div>
                  <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>
                    Après différé (crédit + PTZ)
                  </span>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#fff', margin: '4px 0 0' }}>
                    {fmt(result.mensualiteTotal)}<span style={{ fontSize: 13, fontWeight: 300 }}>/mois</span>
                  </p>
                  <p style={{
                    fontFamily: "'Raleway', sans-serif", fontSize: 11,
                    color: result.alerteEndettement ? '#e74c3c' : 'rgba(255,255,255,0.35)',
                    margin: '2px 0 0'
                  }}>
                    Taux endettement : {result.tauxEndettement}%
                    {result.alerteEndettement && ' ⚠ > 35%'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!result.ptz.eligible || result.ptz.differe === 0 ? (
            <div style={{
              background: result.alerteEndettement ? 'rgba(231,76,60,0.08)' : 'rgba(166,124,82,0.08)',
              border: `1px solid ${result.alerteEndettement ? 'rgba(231,76,60,0.25)' : 'rgba(166,124,82,0.2)'}`,
              borderRadius: 10, padding: '14px 18px', marginBottom: 16,
            }}>
              <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: result.alerteEndettement ? '#e74c3c' : 'rgba(255,255,255,0.7)' }}>
                Taux d'endettement : {result.tauxEndettement}%
                {result.alerteEndettement ? ' ⚠ Dépasse 35% (limite HCSF)' : ' ✓ Dans les normes HCSF'}
              </span>
            </div>
          ) : null}

          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(166,124,82,0.15)' }}>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
              Coût total du crédit
            </span>
            <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
              {fmt(result.coutTotal)}
            </span>
          </div>

          <p style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 16, lineHeight: 1.5 }}>
            Simulation indicative — Barèmes PTZ 2026 (LFI 19/02/2026, Décret 29/03/2025). Hors assurance emprunteur et frais de notaire. Résultats non contractuels.
          </p>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; }
        input::placeholder { color: rgba(255,255,255,0.25); }
        select option { background: #1a2540; }
      `}</style>
    </div>
  )
}

function ResultCard({ label, value, sub }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', borderRadius: 10,
      padding: '16px 18px', border: '1px solid rgba(166,124,82,0.12)',
    }}>
      <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase' }}>
        {label}
      </span>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: '#C4976A', margin: '8px 0 4px', fontWeight: 400 }}>
        {value}
      </p>
      {sub && <span style={{ fontFamily: "'Raleway', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{sub}</span>}
    </div>
  )
}
