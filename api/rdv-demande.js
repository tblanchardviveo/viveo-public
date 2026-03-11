// ═══════════════════════════════════════════════════════════
// api/rdv-demande.js — PARTIE 1/2
// Endpoint Vercel serverless : RDV Découverte VIVEO
// ═══════════════════════════════════════════════════════════

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

// ── Helpers ──────────────────────────────────────────────
const PROJET_LABELS = {
  se_loger: 'Se loger',
  investir: 'Investir',
  les_deux: 'Se loger & Investir'
};
const VISIO_LABELS = { teams: 'Microsoft Teams', facetime: 'FaceTime' };

function formatDateFR(date) {
  return new Date(date).toLocaleString('fr-FR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris'
  });
}

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Email Thomas (notification) ─────────────────────────
function buildEmailThomas(d) {
  const date = formatDateFR(d.created_at || new Date());
  const projetLabel = PROJET_LABELS[d.projet] || d.projet;
  const visioLabel = VISIO_LABELS[d.visio] || d.visio;
  const adresseFull = [d.adresse, d.code_postal, d.ville].filter(Boolean).join(', ');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Raleway',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
  <tr><td style="background:#111C33;padding:28px 32px;text-align:center">
    <span style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#fff;letter-spacing:0.02em">VIVEO</span>
    <span style="color:#A67C52;font-size:22px;margin:0 6px">&middot;</span>
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:13px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase">Patrimoine</span>
  </td></tr>
  <tr><td style="background:linear-gradient(135deg,#A67C52,#C4976A);padding:18px 32px;text-align:center">
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:15px;font-weight:600;color:#fff;letter-spacing:0.06em">Nouvelle demande de RDV D&eacute;couverte</span>
  </td></tr>
  <tr><td style="background:#fff;padding:32px">
    <table width="100%" style="border-left:4px solid #A67C52;padding-left:20px" cellpadding="0" cellspacing="0">
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Pr&eacute;nom / Nom</td>
          <td style="padding:6px 0;font-size:14px;font-weight:600;color:#111C33">${esc(d.prenom)} ${esc(d.nom)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Email</td>
          <td style="padding:6px 0;font-size:14px"><a href="mailto:${esc(d.email)}" style="color:#A67C52">${esc(d.email)}</a></td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">T&eacute;l&eacute;phone</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.telephone) || '—'}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Adresse</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(adresseFull) || '—'}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Projet</td>
          <td style="padding:6px 0;font-size:14px;font-weight:600;color:#A67C52">${esc(projetLabel)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Visio pr&eacute;f&eacute;r&eacute;e</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(visioLabel)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Disponibilit&eacute;s</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.disponibilites) || '—'}</td></tr>
      ${d.message ? `<tr><td style="padding:6px 0;font-size:13px;color:#666">Message</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.message)}</td></tr>` : ''}
      ${d.programme_nom ? `<tr><td style="padding:6px 0;font-size:13px;color:#666">Programme</td>
          <td style="padding:6px 0;font-size:14px;font-weight:600;color:#111C33">${esc(d.programme_nom)}</td></tr>` : ''}
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Date demande</td>
          <td style="padding:6px 0;font-size:14px;color:#111C33">${date}</td></tr>
    </table>
  </td></tr>
  <tr><td style="background:#fff;padding:0 32px 32px;text-align:center">
    <a href="https://viveo-admin.vercel.app/rdv" style="display:inline-block;background:linear-gradient(135deg,#A67C52,#C4976A);color:#fff;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.04em;font-family:'Raleway',Arial,sans-serif">Voir dans VIVEO Admin &rarr;</a>
  </td></tr>
  <tr><td style="background:#111C33;padding:20px 32px;text-align:center">
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:12px;font-weight:300;color:rgba(255,255,255,0.4)">VIVEO Patrimoine &mdash; 06 98 63 97 83</span>
  </td></tr>
</table>
</body></html>`;
}

// ═══ FIN PARTIE 1/2 — suite dans PARTIE 2/2 ci-dessous ═══
// ═══════════════════════════════════════════════════════════
// api/rdv-demande.js — PARTIE 2/2
// (coller directement à la suite de PARTIE 1/2)
// ═══════════════════════════════════════════════════════════

// ── Email Prospect (confirmation) ───────────────────────
function buildEmailProspect(d) {
  const projetLabel = PROJET_LABELS[d.projet] || d.projet;
  const visioLabel = VISIO_LABELS[d.visio] || d.visio;

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:'Raleway',Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
  <tr><td style="background:#111C33;padding:28px 32px;text-align:center">
    <span style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#fff;letter-spacing:0.02em">VIVEO</span>
    <span style="color:#A67C52;font-size:22px;margin:0 6px">&middot;</span>
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:13px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase">Patrimoine</span>
  </td></tr>
  <tr><td style="background:#fff;padding:40px 32px 24px">
    <p style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-style:italic;color:#111C33;margin:0 0 20px;line-height:1.4">Bonjour ${esc(d.prenom)}, votre demande a bien &eacute;t&eacute; re&ccedil;ue.</p>
    <p style="font-size:15px;font-weight:300;color:#444;line-height:1.7;margin:0 0 28px">Thomas Blanchard prendra contact avec vous dans les 24&nbsp;heures pour confirmer votre rendez-vous en visioconf&eacute;rence (${esc(visioLabel)}).</p>
    <table width="100%" style="border-top:1px solid #eee;padding-top:20px" cellpadding="0" cellspacing="0">
      <tr><td style="padding:5px 0;font-size:13px;color:#999;width:140px">Projet</td>
          <td style="padding:5px 0;font-size:14px;color:#111C33">${esc(projetLabel)}</td></tr>
      <tr><td style="padding:5px 0;font-size:13px;color:#999">Visio</td>
          <td style="padding:5px 0;font-size:14px;color:#111C33">${esc(visioLabel)}</td></tr>
      ${d.disponibilites ? `<tr><td style="padding:5px 0;font-size:13px;color:#999">Disponibilit&eacute;s</td>
          <td style="padding:5px 0;font-size:14px;color:#111C33">${esc(d.disponibilites)}</td></tr>` : ''}
    </table>
  </td></tr>
  <tr><td style="padding:0 32px 32px;background:#fff">
    <div style="background:rgba(166,124,82,0.08);border-left:4px solid #A67C52;padding:20px 24px;border-radius:0 8px 8px 0;margin-top:8px">
      <p style="font-size:14px;color:#111C33;line-height:1.6;margin:0">Ce rendez-vous de 45&nbsp;minutes est <strong>gratuit et sans engagement</strong>. VIVEO vous accompagne de A &agrave; Z &mdash; du plan de financement jusqu&rsquo;&agrave; la remise des cl&eacute;s.</p>
    </div>
  </td></tr>
  <tr><td style="background:#fff;padding:0 32px 36px;text-align:center">
    <a href="https://viveo-public.vercel.app" style="display:inline-block;background:linear-gradient(135deg,#A67C52,#C4976A);color:#fff;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.04em;font-family:'Raleway',Arial,sans-serif">D&eacute;couvrir nos programmes &rarr;</a>
  </td></tr>
  <tr><td style="background:#111C33;padding:24px 32px;text-align:center">
    <p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.5);margin:0 0 4px;line-height:1.5">VIVEO Patrimoine &middot; Thomas Blanchard</p>
    <p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.35);margin:0 0 4px;line-height:1.5">06 98 63 97 83 &middot; 3 bis rue du G&eacute;n&eacute;ral de Gaulle, 59253 La Gorgue</p>
    <p style="font-size:11px;font-weight:300;color:rgba(255,255,255,0.3);margin:8px 0 0">Pour toute question, r&eacute;pondez simplement &agrave; cet email.</p>
  </td></tr>
</table>
</body></html>`;
}

// ── Handler principal ───────────────────────────────────
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const {
    prenom, nom, email, telephone,
    adresse, ville, code_postal,
    projet, visio, disponibilites, message,
    programme_id, programme_nom
  } = req.body || {};

  // ── Validation ──
  const missing = [];
  if (!prenom) missing.push('prenom');
  if (!nom) missing.push('nom');
  if (!email) missing.push('email');
  if (!telephone) missing.push('telephone');
  if (!projet) missing.push('projet');
  if (!visio) missing.push('visio');
  if (missing.length > 0) {
    return res.status(400).json({ error: 'Champs requis manquants', missing });
  }

  // ── Données enrichies ──
  const adresseFull = [adresse, code_postal, ville].filter(Boolean).join(', ');
  const projetLabel = PROJET_LABELS[projet] || projet;
  const visioLabel = VISIO_LABELS[visio] || visio;

  try {
    // ── 1. Insert Supabase ──
    const { data: inserted, error: dbError } = await supabase
      .from('demandes_rdv')
      .insert({
        prenom, nom, email, telephone,
        adresse, ville, code_postal,
        projet, visio, disponibilites, message,
        programme_id: programme_id || null,
        programme_nom: programme_nom || null
      })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return res.status(500).json({ error: 'Erreur base de données', details: dbError.message });
    }

    // ── 2. Email Thomas (notification) ──
    const emailThomas = buildEmailThomas({
      ...inserted,
      projetLabel,
      visioLabel,
      adresseFull,
      date: formatDateFR(inserted.created_at || new Date())
    });

    await resend.emails.send({
      from: 'VIVEO Patrimoine <rdv@viveo-patrimoine.fr>',
      to: 'tblanchard@viveo-patrimoine.fr',
            subject: `Nouvelle demande RDV — ${prenom} ${nom}`,
      html: emailThomas
    });

    // ── 3. Email Prospect (confirmation) ──
    const emailProspect = buildEmailProspect({
      ...inserted,
      projetLabel,
      visioLabel
    });

    await resend.emails.send({
      from: 'VIVEO Patrimoine <rdv@viveo-patrimoine.fr>',
      to: email,
      subject: 'Votre demande de rendez-vous VIVEO',
      html: emailProspect
    });

    // ── Réponse succès ──
    return res.status(200).json({
      success: true,
      message: 'Demande enregistrée et emails envoyés',
      id: inserted.id
    });

  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
