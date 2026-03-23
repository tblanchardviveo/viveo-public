import { useState } from 'react';
import { fmt, fmtPct, fmtK, S, DISPOSITIFS, calculerDispositif } from './calcInvestissement.utils.js';
import { Bar, Projection, KPI } from './CalcInvestissementUI.jsx';
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
