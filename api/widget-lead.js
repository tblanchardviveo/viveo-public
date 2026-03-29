import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const resend = new Resend(process.env.RESEND_API_KEY)

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { cabinet_id, prenom, nom, email, telephone, type_widget, dispositif_recommande, message, source } = req.body || {}

  if (!email) return res.status(400).json({ error: 'Email requis' })

  // 1. INSERT lead dans Supabase
  const { error: dbErr } = await supabase.from('leads').insert({
    cabinet_id: cabinet_id || null,
    prenom: prenom || null,
    nom: nom || null,
    email,
    telephone: telephone || null,
    message: message || null,
    dispositif_recommande: dispositif_recommande || null,
    type_widget: type_widget || 'contact',
    source: source || 'widget',
    created_at: new Date().toISOString(),
  })

  if (dbErr) console.error('Supabase insert error:', dbErr.message)

  // 2. Notification email au cabinet
  try {
    const typeLabel = { chatbot: 'Chatbot IA', diagnostic: 'Diagnostic patrimonial', contact: 'Formulaire contact', ptz: 'Calculateur PTZ' }[type_widget] || type_widget
    await resend.emails.send({
      from: 'VIVEO Widgets <noreply@viveo-patrimoine.fr>',
      to: 'thomas.blanchard@viveo-patrimoine.fr',
      subject: `🔔 Nouveau lead widget — ${typeLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
          <h2 style="color:#111C33;margin-bottom:4px;">Nouveau lead via widget</h2>
          <p style="color:#A67C52;font-size:14px;margin-top:0;">Source : ${typeLabel}</p>
          <table style="width:100%;border-collapse:collapse;font-size:14px;">
            ${prenom || nom ? `<tr><td style="padding:8px 0;color:#666;width:120px">Nom</td><td style="color:#111C33;font-weight:600">${[prenom, nom].filter(Boolean).join(' ')}</td></tr>` : ''}
            <tr><td style="padding:8px 0;color:#666">Email</td><td style="color:#111C33;font-weight:600">${email}</td></tr>
            ${telephone ? `<tr><td style="padding:8px 0;color:#666">Téléphone</td><td style="color:#111C33">${telephone}</td></tr>` : ''}
            ${dispositif_recommande ? `<tr><td style="padding:8px 0;color:#666">Dispositif</td><td style="color:#A67C52;font-weight:600">${dispositif_recommande}</td></tr>` : ''}
            ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Message</td><td style="color:#111C33">${message}</td></tr>` : ''}
          </table>
          <div style="margin-top:20px;padding:12px 16px;background:#F7F5F1;border-radius:8px;font-size:12px;color:#999;">
            Cabinet ID : ${cabinet_id || 'demo'} · ${new Date().toLocaleString('fr-FR')}
          </div>
        </div>
      `,
    })
  } catch (emailErr) {
    console.error('Resend error:', emailErr.message)
  }

  return res.status(200).json({ success: true })
}
