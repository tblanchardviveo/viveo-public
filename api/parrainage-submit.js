// ===================================================================
// api/parrainage-submit.js
// Endpoint Vercel serverless : Programme de Parrainage VIVEO
// ===================================================================

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
const resend = new Resend(process.env.RESEND_API_KEY);

function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const RELATION_LABELS = { ami: 'Ami(e)', famille: 'Famille', collegue: 'Coll\u00e8gue', autre: 'Autre' };

// -- Email Thomas (notification interne) --
function buildEmailThomas(d) {
  const rel = RELATION_LABELS[d.relation] || d.relation || '\u2014';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Raleway',Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
  <tr><td style="background:#111C33;padding:28px 32px;text-align:center">
    <span style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#fff">VIVEO</span>
    <span style="color:#A67C52;font-size:22px;margin:0 6px">\u00b7</span>
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:13px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase">Patrimoine</span>
  </td></tr>
  <tr><td style="background:linear-gradient(135deg,#A67C52,#C4976A);padding:18px 32px;text-align:center">
    <span style="font-size:15px;font-weight:600;color:#fff;letter-spacing:0.06em">Nouveau parrainage re\u00e7u</span>
  </td></tr>
  <tr><td style="background:#fff;padding:32px">
    <table width="100%" style="border-left:4px solid #A67C52;padding-left:20px" cellpadding="0" cellspacing="0">
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Parrain</td>
        <td style="padding:6px 0;font-size:14px;font-weight:600;color:#111C33">${esc(d.parrain_nom)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Email parrain</td>
        <td style="padding:6px 0;font-size:14px"><a href="mailto:${esc(d.parrain_email)}" style="color:#A67C52">${esc(d.parrain_email)}</a></td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">T\u00e9l. parrain</td>
        <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.parrain_tel) || '\u2014'}</td></tr>
      <tr><td colspan="2" style="padding:16px 0 6px;font-size:12px;font-weight:600;color:#A67C52;text-transform:uppercase;letter-spacing:0.08em">Filleul</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Nom</td>
        <td style="padding:6px 0;font-size:14px;font-weight:600;color:#111C33">${esc(d.filleul_nom)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Email</td>
        <td style="padding:6px 0;font-size:14px"><a href="mailto:${esc(d.filleul_email)}" style="color:#A67C52">${esc(d.filleul_email)}</a></td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">T\u00e9l\u00e9phone</td>
        <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.filleul_tel)}</td></tr>
      <tr><td style="padding:6px 0;font-size:13px;color:#666">Relation</td>
        <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(rel)}</td></tr>
      ${d.message ? `<tr><td style="padding:6px 0;font-size:13px;color:#666">Message</td>
        <td style="padding:6px 0;font-size:14px;color:#111C33">${esc(d.message)}</td></tr>` : ''}
    </table>
  </td></tr>
  <tr><td style="background:#fff;padding:0 32px 32px;text-align:center">
    <a href="https://viveo-admin.vercel.app/parrainages" style="display:inline-block;background:linear-gradient(135deg,#A67C52,#C4976A);color:#fff;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.04em">Voir dans VIVEO Admin \u2192</a>
  </td></tr>
  <tr><td style="background:#111C33;padding:20px 32px;text-align:center">
    <span style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.4)">VIVEO Patrimoine \u2014 06 98 63 97 83</span>
  </td></tr></table></body></html>`;
}

// -- Email Parrain (confirmation) --
function buildEmailParrain(d) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f4f4f4;font-family:'Raleway',Arial,sans-serif"><table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto">
  <tr><td style="background:#111C33;padding:28px 32px;text-align:center">
    <span style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#fff">VIVEO</span>
    <span style="color:#A67C52;font-size:22px;margin:0 6px">\u00b7</span>
    <span style="font-family:'Raleway',Arial,sans-serif;font-size:13px;color:#A67C52;letter-spacing:0.18em;text-transform:uppercase">Patrimoine</span>
  </td></tr>
  <tr><td style="background:#fff;padding:40px 32px 24px">
    <p style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-style:italic;color:#111C33;margin:0 0 20px;line-height:1.4">Merci pour votre recommandation\u00a0!</p>
    <p style="font-size:15px;font-weight:300;color:#444;line-height:1.7;margin:0 0 28px">Votre parrainage de <strong>${esc(d.filleul_nom)}</strong> a bien \u00e9t\u00e9 enregistr\u00e9. Notre \u00e9quipe prendra contact avec votre filleul dans les 48\u00a0heures.</p>
    <div style="background:rgba(166,124,82,0.08);border-left:4px solid #A67C52;padding:20px 24px;border-radius:0 8px 8px 0">
      <p style="font-size:14px;color:#111C33;line-height:1.6;margin:0"><strong>Rappel des primes\u00a0:</strong><br>400\u00a0\u20ac si votre filleul signe en tant que prospect<br>800\u00a0\u20ac si vous \u00eates d\u00e9j\u00e0 client VIVEO</p>
    </div>
  </td></tr>
  <tr><td style="background:#fff;padding:24px 32px 36px;text-align:center">
    <a href="https://viveo-public.vercel.app/parrainage" style="display:inline-block;background:linear-gradient(135deg,#A67C52,#C4976A);color:#fff;padding:14px 36px;border-radius:50px;font-size:14px;font-weight:600;text-decoration:none;letter-spacing:0.04em">Parrainer un autre proche \u2192</a>
  </td></tr>
  <tr><td style="background:#111C33;padding:24px 32px;text-align:center">
    <p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.5);margin:0 0 4px">VIVEO Patrimoine \u00b7 Thomas Blanchard</p>
    <p style="font-size:12px;font-weight:300;color:rgba(255,255,255,0.35);margin:0 0 4px">06 98 63 97 83 \u00b7 3 bis rue du G\u00e9n\u00e9ral de Gaulle, 59253 La Gorgue</p>
    <p style="font-size:11px;font-weight:300;color:rgba(255,255,255,0.3);margin:8px 0 0">Pour toute question, r\u00e9pondez simplement \u00e0 cet email.</p>
  </td></tr></table></body></html>`;
}

// -- Handler principal --
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'M\u00e9thode non autoris\u00e9e' });

  const { parrain_nom, parrain_email, parrain_tel, filleul_nom, filleul_email, filleul_tel, relation, message } = req.body || {};

  const missing = [];
  if (!parrain_nom) missing.push('parrain_nom');
  if (!parrain_email) missing.push('parrain_email');
  if (!filleul_nom) missing.push('filleul_nom');
  if (!filleul_email) missing.push('filleul_email');
  if (!filleul_tel) missing.push('filleul_tel');
  if (missing.length > 0) return res.status(400).json({ error: 'Champs requis manquants', missing });

  try {
    // 1. Insert Supabase
    const { data: inserted, error: dbError } = await supabase
      .from('parrainages')
      .insert({ parrain_nom, parrain_email, parrain_tel, filleul_nom, filleul_email, filleul_tel, relation, message })
      .select()
      .single();

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return res.status(500).json({ error: 'Erreur base de donn\u00e9es', details: dbError.message });
    }

    // 2. Email Thomas
    await resend.emails.send({
      from: 'VIVEO Patrimoine <rdv@viveo-patrimoine.fr>',
      to: 'tblanchard@viveo-patrimoine.fr',
      subject: `Nouveau parrainage \u2014 ${parrain_nom} recommande ${filleul_nom}`,
      html: buildEmailThomas(inserted)
    });

    // 3. Email Parrain (confirmation)
    await resend.emails.send({
      from: 'VIVEO Patrimoine <rdv@viveo-patrimoine.fr>',
      to: parrain_email,
      subject: 'Votre parrainage VIVEO a bien \u00e9t\u00e9 enregistr\u00e9',
      html: buildEmailParrain(inserted)
    });

    return res.status(200).json({ success: true, message: 'Parrainage enregistr\u00e9 et emails envoy\u00e9s', id: inserted.id });
  } catch (err) {
    console.error('Handler error:', err);
    return res.status(500).json({ error: 'Erreur serveur', details: err.message });
  }
}
