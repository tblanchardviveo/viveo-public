import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const NAVY = '#111C33';
const BRONZE = '#A67C52';
const CREAM = '#F7F5F1';

const PLAFONDS_REVENUS = {
  A:  [49000,73000,88000,103000,118000,15000],
  B1: [37000,51800,62900,74000,85000,11000],
  B2: [30000,42000,51000,60000,69000,9000],
  C:  [27000,37800,45900,54000,62100,8100],
};
const PLAFONDS_OPERATION = {
  A:  [150000,210000,255000,300000,345000,45000],
  B1: [135000,189000,229500,270000,310500,40500],
  B2: [110000,154000,187000,220000,253000,33000],
  C:  [100000,140000,170000,200000,230000,30000],
};
const QUOTITES = { A: 0.5, B1: 0.5, B2: 0.4, C: 0.4 };

function getPlafond(table, zone, foyer) {
  return table[zone][Math.min(foyer, 5) - 1] + (foyer > 5 ? (foyer - 5) * table[zone][5] : 0);
}
function fmt(n) {
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + ' €';
}

function Slider({ label, value, min, max, step, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontWeight: 600, color: NAVY }}>{label}</label>
        <input type="number" value={value} min={min} max={max} step={step}
          onChange={e => onChange(Number(e.target.value))}
          style={{ width: 110, border: '1px solid #ddd', borderRadius: 6, padding: '2px 8px', textAlign: 'right', color: NAVY }} />
      </div>
      <input type="range" value={value} min={min} max={max} step={step}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: BRONZE }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#888' }}>
        <span>{fmt(min)}</span><span>{fmt(max)}</span>
      </div>
    </div>
  );
}

export default function SimulateurPTZ() {
  const navigate = useNavigate();
  const [zone, setZone] = useState('B1');
  const [foyer, setFoyer] = useState(2);
  const [revenu, setRevenu] = useState(45000);
  const [prix, setPrix] = useState(220000);
  const [apport, setApport] = useState(10000);

  const res = useMemo(() => {
    const plafRev = getPlafond(PLAFONDS_REVENUS, zone, foyer);
    const plafOp = getPlafond(PLAFONDS_OPERATION, zone, foyer);
    if (revenu > plafRev) return { eligible: false, raison: `Revenus (${fmt(revenu)}) dépassent le plafond de ${fmt(plafRev)} pour la zone ${zone} avec ${foyer} personne(s).` };
    const baseOp = Math.min(prix, plafOp);
    const ptz = Math.min(baseOp * QUOTITES[zone], 180000);
    const frais = prix * 0.025;
    const totalFinancer = prix + frais - apport;
    const pretPrincipal = Math.max(0, totalFinancer - ptz);
    return { eligible: true, ptz, frais, totalFinancer, pretPrincipal, plafOp, baseOp };
  }, [zone, foyer, revenu, prix, apport]);

  const col = { background: '#fff', borderRadius: 16, padding: 32 };
  const row = (label, val) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0', color: CREAM }}>
      <span style={{ opacity: 0.7 }}>{label}</span><span style={{ fontWeight: 700 }}>{val}</span>
    </div>
  );

  return (
    <div style={{ background: CREAM, minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: NAVY, fontSize: 40, marginBottom: 8 }}>Simulateur PTZ 2026</h1>
        <p style={{ color: '#666', marginBottom: 40 }}>Estimez votre Prêt à Taux Zéro en quelques secondes.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={col}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, color: NAVY, display: 'block', marginBottom: 6 }}>Zone géographique</label>
              <select value={zone} onChange={e => setZone(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', color: NAVY, fontSize: 15 }}>
                {['A','B1','B2','C'].map(z => <option key={z} value={z}>Zone {z}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, color: NAVY, display: 'block', marginBottom: 6 }}>Personnes dans le foyer</label>
              <select value={foyer} onChange={e => setFoyer(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', color: NAVY, fontSize: 15 }}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} personne{n>1?'s':''}</option>)}
              </select>
            </div>
            <Slider label="Revenus annuels" value={revenu} min={0} max={150000} step={500} onChange={setRevenu} />
            <Slider label="Prix du bien" value={prix} min={50000} max={600000} step={5000} onChange={setPrix} />
            <Slider label="Apport personnel" value={apport} min={0} max={200000} step={1000} onChange={setApport} />
          </div>
          <div style={{ background: NAVY, borderRadius: 16, padding: 32, position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20, background: res.eligible ? '#1a7a4a' : '#9b2020', color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
              {res.eligible ? '✓ Éligible au PTZ' : '✗ Non éligible'}
            </div>
            {res.eligible ? (<>
              <div style={{ fontFamily: 'Playfair Display, serif', color: BRONZE, fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>{fmt(res.ptz)}</div>
              <div style={{ color: CREAM, opacity: 0.7, marginBottom: 24, fontSize: 14 }}>Montant estimé du PTZ</div>
              {row('Plafond opération', fmt(res.plafOp))}
              {row('Frais de notaire (2,5%)', fmt(res.frais))}
              {row('Total à financer', fmt(res.totalFinancer))}
              {row('Prêt principal restant', fmt(res.pretPrincipal))}
              <p style={{ color: CREAM, opacity: 0.5, fontSize: 12, marginTop: 20 }}>* Simulation indicative, sans valeur contractuelle.</p>
            </>) : (
              <p style={{ color: CREAM, marginTop: 8 }}>{res.raison}</p>
            )}
            <button onClick={() => navigate('/rdv-decouverte')}
              style={{ marginTop: 28, width: '100%', background: BRONZE, color: '#fff', border: 'none', borderRadius: 10, padding: '14px 0', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
              Prendre RDV Découverte gratuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
