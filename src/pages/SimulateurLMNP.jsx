import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NAVY = "#111C33";
const BRONZE = "#A67C52";
const CREAM = "#F7F5F1";

function fmt(n) { return new Intl.NumberFormat("fr-FR").format(Math.round(n)) + " €"; }
function fmtp(n) { return n.toFixed(2) + " %"; }

function Slider({ label, value, min, max, step, onChange, unit }) {
  const display = unit === "€" ? fmt(value) : value + (unit || "");
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <label style={{ fontWeight: 600, color: NAVY, fontSize: 14 }}>{label}</label>
        <span style={{ fontWeight: 700, color: BRONZE, fontSize: 14 }}>{display}</span>
      </div>
      <input type="range" value={value} min={min} max={max} step={step}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: BRONZE }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#aaa" }}>
        <span>{unit === "€" ? fmt(min) : min + (unit || "")}</span>
        <span>{unit === "€" ? fmt(max) : max + (unit || "")}</span>
      </div>
    </div>
  );
}

function Row({ label, value, big }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "9px 0", color: CREAM }}>
      <span style={{ opacity: 0.7, fontSize: 13 }}>{label}</span>
      <span style={{ fontWeight: big ? 800 : 600, fontSize: big ? 17 : 14 }}>{value}</span>
    </div>
  );
}

export default function SimulateurLMNP() {
  const navigate = useNavigate();
  const [prix, setPrix] = useState(200000);
  const [travaux, setTravaux] = useState(0);
  const [mobilier, setMobilier] = useState(10000);
  const [loyer, setLoyer] = useState(700);
  const [charges, setCharges] = useState(1500);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);
  const [apport, setApport] = useState(20000);
  const [imposition, setImposition] = useState(30);

  const r = useMemo(() => {
    const fraisNotaire = prix * 0.025;
    const emprunte = Math.max(0, prix + fraisNotaire - apport);
    const tauxM = taux / 100 / 12;
    const n = duree * 12;
    const mensualite = tauxM > 0 ? emprunte * tauxM / (1 - Math.pow(1 + tauxM, -n)) : emprunte / n;
    const loyerAnnuel = loyer * 12;
    const chargesDeductibles = charges + mensualite * 12 * 0.7;
    const amortissement = prix * 0.85 / 30 + mobilier / 7 + travaux / 10;
    const resultatFiscal = Math.max(0, loyerAnnuel - chargesDeductibles - amortissement);
    const economieImpot = resultatFiscal === 0 ? loyerAnnuel * (imposition / 100) * 0.3 : 0;
    const effort = mensualite + charges / 12 - loyer;
    const rendBrut = (loyerAnnuel / prix) * 100;
    const rendNet = ((loyerAnnuel - charges) / prix) * 100;
    return { fraisNotaire, emprunte, mensualite, loyerAnnuel, chargesDeductibles, amortissement, resultatFiscal, economieImpot, effort, rendBrut, rendNet };
  }, [prix, travaux, mobilier, loyer, charges, taux, duree, apport, imposition]);

  const col = { background: "#fff", borderRadius: 16, padding: 28 };
  const sel = { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", color: NAVY, fontSize: 14, marginBottom: 18 };

  return (
    <div style={{ background: CREAM, minHeight: "100vh", padding: "48px 24px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h1 style={{ fontFamily: "Playfair Display, serif", color: NAVY, fontSize: 38, marginBottom: 6 }}>Simulateur LMNP Amortissement</h1>
        <p style={{ color: "#666", marginBottom: 36, fontSize: 15 }}>Estimez l'effort d'épargne et les avantages fiscaux du statut LMNP.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div>
            <div style={col}>
              <h3 style={{ color: NAVY, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>Le bien</h3>
              <Slider label="Prix d'acquisition" value={prix} min={50000} max={500000} step={5000} onChange={setPrix} unit="€" />
              <div style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <label style={{ fontWeight: 600, color: NAVY, fontSize: 14 }}>Frais de notaire (2,5% neuf)</label>
                  <span style={{ fontWeight: 700, color: "#aaa", fontSize: 14 }}>{fmt(prix * 0.025)}</span>
                </div>
                <input type="range" value={prix * 0.025} min={0} max={12500} disabled style={{ width: "100%", accentColor: "#ccc", opacity: 0.5 }} />
              </div>
              <Slider label="Travaux" value={travaux} min={0} max={50000} step={1000} onChange={setTravaux} unit="€" />
              <Slider label="Mobilier" value={mobilier} min={0} max={30000} step={500} onChange={setMobilier} unit="€" />
            </div>
            <div style={{ ...col, marginTop: 20 }}>
              <h3 style={{ color: NAVY, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>Revenus & charges</h3>
              <Slider label="Loyer mensuel HC" value={loyer} min={300} max={3000} step={50} onChange={setLoyer} unit="€" />
              <Slider label="Charges annuelles (copro + gestion)" value={charges} min={0} max={5000} step={100} onChange={setCharges} unit="€" />
            </div>
            <div style={{ ...col, marginTop: 20 }}>
              <h3 style={{ color: NAVY, marginBottom: 16, fontSize: 16, fontWeight: 700 }}>Financement</h3>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 600, color: NAVY, fontSize: 14, display: "block", marginBottom: 6 }}>Taux crédit (%)</label>
                <input type="number" value={taux} min={0} max={10} step={0.01} onChange={e => setTaux(Number(e.target.value))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #ddd", color: NAVY, fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 600, color: NAVY, fontSize: 14, display: "block", marginBottom: 6 }}>Durée du crédit</label>
                <select value={duree} onChange={e => setDuree(Number(e.target.value))} style={sel}>
                  {[15, 20, 25].map(d => <option key={d} value={d}>{d} ans</option>)}
                </select>
              </div>
              <Slider label="Apport personnel" value={apport} min={0} max={150000} step={1000} onChange={setApport} unit="€" />
              <div>
                <label style={{ fontWeight: 600, color: NAVY, fontSize: 14, display: "block", marginBottom: 6 }}>Taux marginal d'imposition</label>
                <select value={imposition} onChange={e => setImposition(Number(e.target.value))} style={{ ...sel, marginBottom: 0 }}>
                  {[11, 30, 41, 45].map(t => <option key={t} value={t}>{t} %</option>)}
                </select>
              </div>
            </div>
          </div>
          <div style={{ background: NAVY, borderRadius: 16, padding: 32, position: "sticky", top: 100, alignSelf: "start" }}>
            <p style={{ color: CREAM, opacity: 0.6, fontSize: 13, marginBottom: 6 }}>Effort d'épargne mensuel</p>
            <div style={{ fontFamily: "Playfair Display, serif", color: BRONZE, fontSize: 52, fontWeight: 700, lineHeight: 1.1, marginBottom: 4 }}>
              {r.effort >= 0 ? "+" : ""}{fmt(Math.abs(r.effort)).replace(" €", "")} <span style={{ fontSize: 26 }}>€</span>
            </div>
            <p style={{ color: CREAM, opacity: 0.5, fontSize: 12, marginBottom: 24 }}>{r.effort >= 0 ? "à débourser chaque mois" : "autofinancement mensuel"}</p>
            <Row label="Rendement brut" value={fmtp(r.rendBrut)} />
            <Row label="Rendement net" value={fmtp(r.rendNet)} />
            <Row label="Loyer annuel" value={fmt(r.loyerAnnuel)} />
            <Row label="Total charges annuelles" value={fmt(r.chargesDeductibles)} />
            <Row label="Mensualité crédit" value={fmt(r.mensualite)} />
            <Row label="Amortissement LMNP/an" value={fmt(r.amortissement)} />
            <Row label="Résultat fiscal" value={r.resultatFiscal === 0 ? "Déficit reportable" : fmt(r.resultatFiscal)} />
            <p style={{ color: CREAM, opacity: 0.4, fontSize: 11, marginTop: 16, lineHeight: 1.5 }}>
              Simulation indicative — amortissement LMNP simplifié (structure 30 ans, mobilier 7 ans, travaux 10 ans). Sans valeur contractuelle.
            </p>
            <button onClick={() => navigate("/rdv-decouverte")}
              style={{ marginTop: 24, width: "100%", background: BRONZE, color: "#fff", border: "none", borderRadius: 10, padding: "14px 0", fontSize: 16, fontWeight: 700, cursor: "pointer" }}>
              Prendre RDV Découverte gratuit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
