import { useState } from 'react'

// ─── Formatage ────────────────────────────────────────────────────────────────────────
export const fmt = (n) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
export const fmtPct = (n) => (Math.round(n * 100) / 100).toFixed(2) + ' %'
export const fmtK = (n) => {
  if (Math.abs(n) >= 1000) return (Math.round(n / 100) / 10) + 'k€'
  return fmt(n)
}

// ─── Styles ───────────────────────────────────────────────────────────────────────────
export const S = {
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
export const DISPOSITIFS = [
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
export function calculerDispositif({ id, prix, loyerAnnuel, chargesAnnuelles, travaux, tmi, niveauOption, dureeEngagement }) {
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
