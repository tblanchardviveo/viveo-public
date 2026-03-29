import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro:     process.env.STRIPE_PRICE_PRO,
  premium: process.env.STRIPE_PRICE_PREMIUM,
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const BASE = 'https://viveo-patrimoine.fr'

export default async function handler(req, res) {
  Object.entries(CORS).forEach(([k, v]) => res.setHeader(k, v))
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { plan, prenom, nom, cabinet, email, telephone, siret } = req.body || {}

  if (!email || !plan || !PRICE_IDS[plan]) {
    return res.status(400).json({ error: 'Plan ou email manquant' })
  }

  try {
    // 1. Créer le Customer Stripe
    const customer = await stripe.customers.create({
      email,
      name: `${prenom || ''} ${nom || ''}`.trim(),
      phone: telephone || undefined,
      metadata: { prenom: prenom || '', nom: nom || '', cabinet: cabinet || '', plan, siret: siret || '' },
    })

    // 2. Créer la Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
      subscription_data: { trial_period_days: 14 },
      success_url: `${BASE}/bienvenue?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${BASE}/souscrire`,
      locale: 'fr',
      customer_update: { address: 'auto', name: 'auto' },
      billing_address_collection: 'required',
      metadata: { prenom: prenom || '', nom: nom || '', cabinet: cabinet || '', plan },
    })

    return res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err.message)
    return res.status(500).json({ error: err.message })
  }
}
