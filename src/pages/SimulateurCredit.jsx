import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import InternalLinks from '../components/InternalLinks';

const NAVY = '#111C33', BRONZE = '#A67C52', CREAM = '#F7F5F1';
const fmt = n => new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(n) + ' €';
const fmtM = n => new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n) + ' €/mois';

function Slider({ label, value, min, max, step, onChange, display }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <label style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 600, color: NAVY, fontSize: 14 }}>{label}</label>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontWeight: 700, color: BRONZE, fontSize: 14 }}>{display ?? fmt(value)}</span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step} onChange={e => onChange(Number(e.target.value))} style={{ width: '100%', accentColor: BRONZE }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#aaa' }}>
        <span>{fmt(min)}</span><span>{fmt(max)}</span>
      </div>
    </div>
  );
}

function Field({ label, value, min, max, step, onChange, suffix = '%' }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: 'block', fontFamily: "'Raleway',sans-serif", fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <input type="number" value={value} min={min} max={max} step={step} onChange={e => onChange(Number(e.target.value))}
          style={{ width: 100, border: '1px solid #ddd', borderRadius: 6, padding: '6px 10px', color: NAVY, fontFamily: "'Raleway',sans-serif" }} />
        <span style={{ color: '#888', fontFamily: "'Raleway',sans-serif" }}>{suffix}</span>
      </div>
    </div>
  );
}

export default function SimulateurCredit() {
  const navigate = useNavigate();
  const [montant, setMontant] = useState(200000);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);
  const [tauxAssurance, setTauxAssurance] = useState(0.35);
  const [revenu, setRevenu] = useState(3500);
  const [charges, setCharges] = useState(0);
  const [tauxEndettement, setTauxEndettement] = useState(35);

  const calc = useMemo(() => {
    const tm = taux / 12 / 100;
    const n = duree * 12;
    const mens = tm === 0 ? montant / n : montant * tm / (1 - Math.pow(1 + tm, -n));
    const mensAss = montant * tauxAssurance / 100 / 12;
    const mensTotal = mens + mensAss;
    const coutCredit = mens * n - montant;
    const coutAss = mensAss * n;
    const capMens = revenu * tauxEndettement / 100 - charges;
    const capEmp = capMens <= 0 ? 0 : (tm === 0 ? capMens * n : capMens / tm * (1 - Math.pow(1 + tm, -n)));
    return { mens, mensAss, mensTotal, coutCredit, coutAss, coutTotal: coutCredit + coutAss, capEmp: Math.max(0, capEmp) };
  }, [montant, taux, duree, tauxAssurance, revenu, charges, tauxEndettement]);

  const card = { background: NAVY, borderRadius: 12, padding: '24px 28px', flex: 1, minWidth: 220 };
  const sep = { borderTop: '1px solid rgba(255,255,255,0.12)', margin: '12px 0' };
  const row = (l, v) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Raleway',sans-serif", fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 6 }}>
      <span>{l}</span><span style={{ color: '#fff', fontWeight: 600 }}>{v}</span>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: CREAM, fontFamily: "'Raleway',sans-serif" }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 32, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>
          Simulateur Crédit Immobilier
        </h1>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 40, fontSize: 15 }}>
          Estimez vos mensualités et votre capacité d'emprunt
        </p>

        <div style={{ background: '#fff', borderRadius: 14, padding: '32px 32px 24px', boxShadow: '0 2px 20px rgba(17,28,51,0.07)', marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 20, marginBottom: 24 }}>Votre projet</h2>
          <Slider label="Montant à emprunter" value={montant} min={50000} max={600000} step={5000} onChange={setMontant} />
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}><Field label="Taux d'intérêt annuel" value={taux} min={0.01} max={10} step={0.01} onChange={setTaux} /></div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Durée d'emprunt</label>
              <select value={duree} onChange={e => setDuree(Number(e.target.value))}
                style={{ width: '100%', border: '1px solid #ddd', borderRadius: 6, padding: '7px 10px', color: NAVY, fontFamily: "'Raleway',sans-serif", marginBottom: 20 }}>
                {[10, 15, 20, 25, 30].map(d => <option key={d} value={d}>{d} ans</option>)}
              </select>
            </div>
            <div style={{ flex: 1 }}><Field label="Taux assurance annuel" value={tauxAssurance} min={0} max={2} step={0.01} onChange={setTauxAssurance} /></div>
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, padding: '32px 32px 24px', boxShadow: '0 2px 20px rgba(17,28,51,0.07)', marginBottom: 32 }}>
          <h2 style={{ fontFamily: "'Playfair Display',serif", color: NAVY, fontSize: 20, marginBottom: 24 }}>Capacité d'emprunt</h2>
          <Slider label="Revenu mensuel net" value={revenu} min={1000} max={15000} step={100} onChange={setRevenu} display={fmtM(revenu)} />
          <Slider label="Charges mensuelles actuelles" value={charges} min={0} max={3000} step={50} onChange={setCharges} display={fmtM(charges)} />
          <div>
            <label style={{ display: 'block', fontWeight: 600, color: NAVY, fontSize: 14, marginBottom: 6 }}>Taux d'endettement maximum</label>
            <select value={tauxEndettement} onChange={e => setTauxEndettement(Number(e.target.value))}
              style={{ border: '1px solid #ddd', borderRadius: 6, padding: '7px 10px', color: NAVY, fontFamily: "'Raleway',sans-serif" }}>
              <option value={33}>33 %</option>
              <option value={35}>35 %</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
          <div style={card}>
            <div style={{ fontFamily: "'Raleway',sans-serif", color: 'rgba(255,255,255,0.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Mensualité totale</div>
            <div style={{ fontFamily: "'Playfair Display',serif", color: BRONZE, fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{fmtM(calc.mensTotal)}</div>
            <div style={sep} />
            {row('Mensualité hors assurance', fmtM(calc.mens))}
            {row('Dont assurance', fmtM(calc.mensAss))}
            <div style={sep} />
            {row('Coût total crédit', fmt(calc.coutCredit))}
            {row('Coût assurance', fmt(calc.coutAss))}
            {row('Coût total', fmt(calc.coutTotal))}
          </div>
          <div style={card}>
            <div style={{ fontFamily: "'Raleway',sans-serif", color: 'rgba(255,255,255,0.6)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Capacité d'emprunt</div>
            <div style={{ fontFamily: "'Playfair Display',serif", color: BRONZE, fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{fmt(calc.capEmp)}</div>
            <div style={sep} />
            {row('Revenu mensuel net', fmtM(revenu))}
            {row('Mensualité max disponible', fmtM(Math.max(0, revenu * tauxEndettement / 100 - charges)))}
            {row('Taux endettement retenu', tauxEndettement + ' %')}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={() => navigate('/rdv-decouverte')}
            style={{ background: BRONZE, color: '#fff', border: 'none', borderRadius: 8, padding: '14px 36px', fontFamily: "'Raleway',sans-serif", fontWeight: 700, fontSize: 15, cursor: 'pointer', letterSpacing: '0.04em' }}>
            Prendre rendez-vous avec un conseiller
          </button>
        </div>
      </div>
    </div>
  );
}
