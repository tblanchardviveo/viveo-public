// api/chat.js — Vercel Serverless Function
// Proxy sécurisé pour le chatbot VIVEO

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log('API KEY present:', !!process.env.ANTHROPIC_API_KEY);
  console.log('Key first 10:', process.env.ANTHROPIC_API_KEY?.substring(0,10));
  console.log('Request body:', JSON.stringify(req.body));

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Méthode non autorisée' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'Configuration serveur manquante' });

  try {
    const { messages, system } = req.body;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-opus-4-6',
        max_tokens: 1000,
        system: system || '',
        messages
      })
    });

    if (!response.ok) {
      const errBody = await response.json();
      console.log('Anthropic error:', JSON.stringify(errBody));
      return res.status(response.status).json({ error: errBody });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    console.error('Erreur proxy chat:', err);
    return res.status(500).json({ error: 'Erreur serveur interne' });
  }
}
