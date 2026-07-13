import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import InternalLinks from '../components/InternalLinks';

const NAVY = '#111C33';
const BRONZE = '#A67C52';
const CREAM = '#F7F5F1';

const PLAFONDS = { 1:22985, 2:30651, 3:36986, 4:44706, 5:52423, 6:59020, 7:65694, 8:72358 };

const DEPTS = [
  '01 - Ain','02 - Aisne','03 - Allier','04 - Alpes-de-Haute-Provence','05 - Hautes-Alpes',
  '06 - Alpes-Maritimes','07 - Ardèche','08 - Ardennes','09 - Ariège','10 - Aube',
  '11 - Aude','12 - Aveyron','13 - Bouches-du-Rhône','14 - Calvados','15 - Cantal',
  '16 - Charente','17 - Charente-Maritime','18 - Cher','19 - Corrèze',"21 - Côte-d'Or",
  "22 - Côtes-d'Armor",'23 - Creuse','24 - Dordogne','25 - Doubs','26 - Drôme',
  '27 - Eure','28 - Eure-et-Loir','29 - Finistère','30 - Gard','31 - Haute-Garonne',
  '32 - Gers','33 - Gironde','34 - Hérault','35 - Ille-et-Vilaine','36 - Indre',
  '37 - Indre-et-Loire','38 - Isère','39 - Jura','40 - Landes','41 - Loir-et-Cher',
  '42 - Loire','43 - Haute-Loire','44 - Loire-Atlantique','45 - Loiret','46 - Lot',
  '47 - Lot-et-Garonne','48 - Lozère','49 - Maine-et-Loire','50 - Manche','51 - Marne',
  '52 - Haute-Marne','53 - Mayenne','54 - Meurthe-et-Moselle','55 - Meuse','56 - Morbihan',
  '57 - Moselle','58 - Nièvre','59 - Nord','60 - Oise','61 - Orne',
  '62 - Pas-de-Calais','63 - Puy-de-Dôme','64 - Pyrénées-Atlantiques','65 - Hautes-Pyrénées','66 - Pyrénées-Orientales',
  '67 - Bas-Rhin','68 - Haut-Rhin','69 - Rhône','70 - Haute-Saône','71 - Saône-et-Loire',
  '72 - Sarthe','73 - Savoie','74 - Haute-Savoie','75 - Paris','76 - Seine-Maritime',
  '77 - Seine-et-Marne','78 - Yvelines','79 - Deux-Sèvres','80 - Somme','81 - Tarn',
  '82 - Tarn-et-Garonne','83 - Var','84 - Vaucluse','85 - Vendée','86 - Vienne',
  '87 - Haute-Vienne','88 - Vosges','89 - Yonne','90 - Territoire de Belfort','91 - Essonne',
  '92 - Hauts-de-Seine','93 - Seine-Saint-Denis','94 - Val-de-Marne',"95 - Val-d'Oise",
  '971 - Guadeloupe','972 - Martinique','973 - Guyane','974 - La Réunion','976 - Mayotte',
];

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

export default function SimulateurTVA() {
  const navigate = useNavigate();
  const [zone, setZone] = useState('anru');
  const [foyer, setFoyer] = useState(2);
  const [revenu, setRevenu] = useState(25000);
  const [prix, setPrix] = useState(150000);
  const [dept, setDept] = useState('75 - Paris');

  const res = useMemo(() => {
    if (zone === 'hors') return { eligible: false, raison: 'Le bien n\'est pas situé en Zone ANRU ou QPV.' };
    const plafond = PLAFONDS[foyer] || PLAFONDS[8];
    if (revenu > plafond) {
      return { eligible: false, raison: `Revenus (${fmt(revenu)}) dépassent le plafond de ${fmt(plafond)} pour ${foyer} personne(s).` };
    }
    const prixTTCNormal = prix * 1.20;
    const prixTTCReduit = prix * 1.055;
    const economie = prix * 0.145;
    return { eligible: true, prixTTCNormal, prixTTCReduit, economie, plafond };
  }, [zone, foyer, revenu, prix]);

  const col = { background: '#fff', borderRadius: 16, padding: 32 };
  const row = (label, val) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 0', color: CREAM }}>
      <span style={{ opacity: 0.7 }}>{label}</span><span style={{ fontWeight: 700 }}>{val}</span>
    </div>
  );

  return (
    <div style={{ background: CREAM, minHeight: '100vh', padding: '48px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', color: NAVY, fontSize: 40, marginBottom: 8 }}>Simulateur TVA Réduite</h1>
        <p style={{ color: '#666', marginBottom: 40 }}>TVA à 5,5 % en VEFA neuf (Zone ANRU/QPV) — plafonds 2024.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <div style={col}>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, color: NAVY, display: 'block', marginBottom: 6 }}>Zone d'éligibilité</label>
              <select value={zone} onChange={e => setZone(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', color: NAVY, fontSize: 15 }}>
                <option value="anru">Zone ANRU / QPV</option>
                <option value="hors">Hors zone</option>
              </select>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, color: NAVY, display: 'block', marginBottom: 6 }}>Composition du foyer</label>
              <select value={foyer} onChange={e => setFoyer(Number(e.target.value))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', color: NAVY, fontSize: 15 }}>
                {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} personne{n>1?'s':''}</option>)}
              </select>
            </div>
            <Slider label="Revenu fiscal N-2" value={revenu} min={0} max={120000} step={500} onChange={setRevenu} />
            <Slider label="Prix du bien HT" value={prix} min={50000} max={400000} step={5000} onChange={setPrix} />
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontWeight: 600, color: NAVY, display: 'block', marginBottom: 6 }}>Département</label>
              <select value={dept} onChange={e => setDept(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd', color: NAVY, fontSize: 15 }}>
                {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ background: NAVY, borderRadius: 16, padding: 32, position: 'sticky', top: 100, alignSelf: 'start' }}>
            <div style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 20, background: res.eligible ? '#1a7a4a' : '#9b2020', color: '#fff', fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
              {res.eligible ? '✓ Éligible TVA 5,5 %' : '✗ Non éligible'}
            </div>
            {res.eligible ? (<>
              <div style={{ fontFamily: 'Playfair Display, serif', color: BRONZE, fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 8 }}>{fmt(res.economie)}</div>
              <div style={{ color: CREAM, opacity: 0.7, marginBottom: 24, fontSize: 14 }}>Économie de TVA estimée</div>
              {row('Prix TTC à taux normal (20 %)', fmt(res.prixTTCNormal))}
              {row('Prix TTC à taux réduit (5,5 %)', fmt(res.prixTTCReduit))}
              {row('Économie réalisée', fmt(res.economie))}
              <p style={{ color: CREAM, opacity: 0.5, fontSize: 12, marginTop: 20 }}>* Sous réserve d'accord du promoteur et vérification par la CAF. Simulation indicative.</p>
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
