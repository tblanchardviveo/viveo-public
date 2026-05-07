import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import InternalLinks from '../components/InternalLinks';

const NAVY = '#111C33', BRONZE = '#A67C52', CREAM = '#F7F5F1';
const fmtE = n => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
const fmtP = n => n.toFixed(2) + ' %';
const sel = { border: '1px solid #ddd', borderRadius: 6, padding: '7px 10px', color: NAVY, fontFamily: "'Raleway',sans-serif", width: '100%', marginBottom: 20 };

function Slider({ label, value, min, max, step, onChange, display }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, color: NAVY, fontSize: 14 }}>{label}</label>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: BRONZE, fontSize: 14 }}>{display}</span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: BRONZE }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa' }}>
        <span>{new Intl.NumberFormat('fr-FR').format(min)}</span><span>{new Intl.NumberFormat('fr-FR').format(max)}</span>
      </div>
    </div>
  );
}

export default function SimulateurRendement() {
  const navigate = useNavigate();
  const [prix, setPrix] = useState(200000);
  const [typeBien, setTypeBien] = useState('neuf');
  const [loyer, setLoyer] = useState(800);
  const [charges, setCharges] = useState(2000);
  const [taxe, setTaxe] = useState(800);
  const [gestion, setGestion] = useState('non');
  const [vacance, setVacance] = useState(2);
  const [fiscalite, setFiscalite] = useState('micro-bic');
  const [tmi, setTmi] = useState(30);

  const calc = useMemo(() => {
    const fraisNotaire = typeBien === 'neuf' ? prix * 0.025 : prix * 0.08;
    const prixRevient = prix + fraisNotaire;
    const loyerBrut = loyer * (52 - vacance) / 52 * 12;
    const loyerNet = gestion === 'oui' ? loyerBrut * 0.92 : loyerBrut;
    const chargesTotales = charges + taxe;
    let impots = 0;
    if (fiscalite === 'micro-foncier') impots = loyerNet * 0.7 * tmi / 100 + loyerNet * 0.172;
    else if (fiscalite === 'micro-bic') impots = loyerNet * 0.5 * tmi / 100 + loyerNet * 0.5 * 0.172;
    const revenuNet = loyerNet - chargesTotales - impots;
    const rendBrut = loyerBrut / prix * 100;
    const rendNetCharges = (loyerNet - chargesTotales) / prix * 100;
    const rendNetFiscal = revenuNet / prix * 100;
    const vacanceMontant = loyerBrut - loyer * 12;
    const gestionMontant = gestion === 'oui' ? loyerBrut * 0.08 : 0;
    return { loyerBrut, loyerNet, chargesTotales, impots, revenuNet, rendBrut, rendNetCharges, rendNetFiscal, fraisNotaire, prixRevient, vacanceMontant, gestionMontant };
  }, [prix, typeBien, loyer, charges, taxe, gestion, vacance, fiscalite, tmi]);

  const card = { background: NAVY, borderRadius: 12, padding: '24px 28px', flex: 1, minWidth: 160, textAlign: 'center' };
  const sep = { borderTop: '1px solid rgba(255,255,255,0.12)', margin: '10px 0' };
  const row = (l, v) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Raleway',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>
      <span>{l}</span><span style={{ color: '#fff', fontWeight: 600 }}>{v}</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Raleway',sans-serif" }}>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Simulateur Rendement Locatif Net</h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 40, fontSize: 15 }}>Estimez votre rendement brut, net de charges et net fiscal</p>

        <div style={{ background: '#fff', borderRadius: 14, padding: '32px 32px 8px', boxShadow: '0 2px 20px rgba(17,28,51,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 20, marginBottom: 24 }}>Le bien</h2>
          <Slider label="Prix d'achat" value={prix} min={50000} max={600000} step={5000} onChange={setPrix} display={fmtE(prix)} />
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontFamily: "'Raleway',sans-serif", fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Type de bien</label>
            <select value={typeBien} onChange={e => setTypeBien(e.target.value)} style={sel}>
              <option value="neuf">VEFA / Neuf (frais notaire 2,5 %)</option>
              <option value="ancien">Ancien (frais notaire 8 %)</option>
            </select>
          </div>
          <Slider label="Loyer mensuel HC" value={loyer} min={300} max={3000} step={50} onChange={setLoyer} display={fmtE(loyer) + '/mois'} />
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}><Slider label="Charges copro annuelles" value={charges} min={0} max={5000} step={100} onChange={setCharges} display={fmtE(charges) + '/an'} /></div>
            <div style={{ flex: 1 }}><Slider label="Taxe foncière annuelle" value={taxe} min={0} max={3000} step={50} onChange={setTaxe} display={fmtE(taxe) + '/an'} /></div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: '32px 32px 8px', boxShadow: '0 2px 20px rgba(17,28,51,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 20, marginBottom: 24 }}>Gestion & fiscalité</h2>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Gestion locative</label>
              <select value={gestion} onChange={e => setGestion(e.target.value)} style={sel}>
                <option value="non">Non (gestion directe)</option>
                <option value="oui">Oui (8 % des loyers)</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Vacance locative</label>
              <select value={vacance} onChange={e => setVacance(Number(e.target.value))} style={sel}>
                {[0, 2, 4, 6, 8].map(s => <option key={s} value={s}>{s === 0 ? '0 semaine' : `${s} semaines`}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Régime fiscal</label>
              <select value={fiscalite} onChange={e => setFiscalite(e.target.value)} style={sel}>
                <option value="micro-foncier">Location nue – Micro-foncier (abatt. 30 %)</option>
                <option value="reel-foncier">Location nue – Régime réel</option>
                <option value="micro-bic">LMNP – Micro-BIC (abatt. 50 %)</option>
                <option value="reel-bic">LMNP – Régime réel</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>TMI</label>
              <select value={tmi} onChange={e => setTmi(Number(e.target.value))} style={sel}>
                {[11, 30, 41, 45].map(t => <option key={t} value={t}>{t} %</option>)}
              </select>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
          {[
            { label: 'Rendement brut', value: fmtP(calc.rendBrut) },
            { label: 'Rendement net charges', value: fmtP(calc.rendNetCharges) },
            { label: 'Rendement net fiscal', value: fmtP(calc.rendNetFiscal) },
          ].map(({ label, value }) => (
            <div key={label} style={card}>
              <div style={{ fontFamily: "'Raleway',sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>{label}</div>
              <div style={{ fontFamily: "'Playfair Display',serif", color: BRONZE, fontSize: 38, fontWeight: 700 }}>{value}</div>
            </div>
          ))}
        </div>

        <div style={{ background: NAVY, borderRadius: 12, padding: '24px 28px', marginBottom: 32 }}>
          <div style={{ fontFamily: "'Raleway',sans-serif", color: 'rgba(255,255,255,0.55)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 14 }}>Détail annuel</div>
          {row('Loyer annuel brut', fmtE(calc.loyerBrut))}
          {row('Perte vacance locative', '− ' + fmtE(Math.abs(calc.vacanceMontant)))}
          {calc.gestionMontant > 0 && row('Frais gestion (8 %)', '− ' + fmtE(calc.gestionMontant))}
          <div style={sep} />
          {row('Charges copro + taxe foncière', '− ' + fmtE(calc.chargesTotales))}
          {row('Impôts estimés', fiscalite.includes('reel') ? 'Régime réel (à calculer)' : '− ' + fmtE(calc.impots))}
          <div style={sep} />
          {row('Revenu net annuel', fmtE(calc.revenuNet))}
          <div style={sep} />
          {row("Prix de revient total (frais notaire inclus)", fmtE(calc.prixRevient))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/rdv-decouverte')}
            style={{ background: BRONZE, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 36px', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', letterSpacing: '0.04em' }}>
            Prendre rendez-vous avec un conseiller →
          </button>
        </div>
      </div>
    </div>
  );
}
