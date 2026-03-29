import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

// Raw body requis pour vérification signature Stripe
export const config = { api: { bodyParser: false } }

const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY)
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const resend   = new Resend(process.env.RESEND_API_KEY)

const QUOTAS = { starter: 100, pro: 500, premium: -1 }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', c => chunks.push(typeof c === 'string' ? Buffer.from(c) : c))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

function genPassword(len = 12) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#'
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const rawBody = await getRawBody(req)
  const sig     = req.headers['stripe-signature']

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  if (event.type !== 'checkout.session.completed') return res.status(200).json({ received: true })

  const session  = event.data.object
  const meta     = session.metadata || {}
  const prenom   = meta.prenom || ''
  const nom      = meta.nom || ''
  const cabinet  = meta.cabinet || ''
  const plan     = meta.plan || 'starter'
  const email    = session.customer_details?.email || meta.email || ''
  const customerId = session.customer

  if (!email) { console.error('No email in session'); return res.status(200).json({ received: true }) }

  try {
    // 1. Créer le cabinet dans Supabase
    const { data: cab, error: cabErr } = await supabase.from('cabinets').insert({
      nom: cabinet || `${prenom} ${nom}`.trim(),
      email_contact: email,
      plan_abonnement: plan,
      quota_ia_mensuel: QUOTAS[plan] ?? 100,
      stripe_customer_id: customerId,
      actif: true,
      created_at: new Date().toISOString(),
    }).select().single()

    if (cabErr) { console.error('Cabinet insert:', cabErr.message); return res.status(200).json({ received: true }) }

    // 2. Inviter l'utilisateur via Supabase Auth Admin
    const tmpPassword = genPassword()
    const { data: authUser, error: authErr } = await supabase.auth.admin.createUser({
      email, password: tmpPassword, email_confirm: true,
      user_metadata: { prenom, nom, cabinet_id: cab.id, role: 'directeur' },
    })
    if (authErr) console.error('Auth createUser:', authErr.message)

    // 3. INSERT utilisateur
    const { error: userErr } = await supabase.from('utilisateurs_admin').insert({
      prenom, nom, email, role: 'directeur',
      cabinet_id: cab.id,
      auth_id: authUser?.user?.id || null,
      created_at: new Date().toISOString(),
    })
    if (userErr) console.error('User insert:', userErr.message)

    // 4. Email de bienvenue
    await resend.emails.send({
      from: 'VIVEO Patrimoine <bienvenue@viveo-patrimoine.fr>',
      to: email,
      subject: '🎉 Bienvenue sur VIVEO — vos identifiants',
      html: `
        <div style="font-family:'Raleway',sans-serif;max-width:520px;margin:0 auto;background:#fff;padding:32px;">
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:26px;color:#111C33;margin-bottom:4px;">
            VIVEO<span style="color:#A67C52">.</span>
          </div>
          <p style="color:#A67C52;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin-top:0;">Patrimoine</p>
          <h2 style="color:#111C33;font-size:20px;margin:24px 0 8px;">Bonjour ${prenom || nom} 👋</h2>
          <p style="color:#555;font-size:14px;line-height:1.7;">Bienvenue sur VIVEO ! Votre espace back-office est prêt. Vous pouvez vous connecter dès maintenant.</p>
          <div style="background:#F7F5F1;border-radius:10px;padding:20px;margin:24px 0;">
            <div style="font-size:13px;color:#111C33;margin-bottom:8px;"><strong>Email :</strong> ${email}</div>
            <div style="font-size:13px;color:#111C33;"><strong>Mot de passe temporaire :</strong> <code style="background:#fff;padding:3px 8px;border-radius:4px;">${tmpPassword}</code></div>
          </div>
          <a href="https://admin.viveo-patrimoine.fr" style="display:inline-block;background:linear-gradient(135deg,#A67C52,#C4976A);color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:700;">Accéder à mon espace →</a>
          <p style="color:#999;font-size:12px;margin-top:24px;">Plan souscrit : <strong>${plan.charAt(0).toUpperCase() + plan.slice(1)}</strong> · 14 jours d'essai gratuit</p>
          <p style="color:#999;font-size:12px;">L'équipe VIVEO · 09 67 16 70 65</p>
        </div>
      `,
    })

    console.log(`✅ Cabinet créé : ${cab.id} — ${email} (plan: ${plan})`)
    return res.status(200).json({ received: true })
  } catch (err) {
    console.error('Webhook handler error:', err.message)
    return res.status(200).json({ received: true }) // Toujours 200 pour éviter retry Stripe
  }
}
