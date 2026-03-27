import { supabase } from '../supabase';
import { QUALIFICATION_SYSTEM_PROMPT } from '../prompts/qualificationPrompt';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';

export async function qualifyProspect(profileData) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Clé API Anthropic manquante');

  const userMessage = buildUserMessage(profileData);

  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: QUALIFICATION_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Erreur API: ${response.status} - ${err}`);
  }

  const data = await response.json();
  const raw = data.content[0].text;

  let result;
  try {
    result = JSON.parse(raw);
  } catch {
    throw new Error('Réponse IA invalide (JSON attendu)');
  }

  await saveQualification(profileData, result);
  return result;
}

function buildUserMessage(p) {
  return `Profil prospect :
- Prénom : ${p.prenom || 'Non renseigné'}
- Revenus annuels : ${p.revenus || 'Non renseigné'}€
- Situation familiale : ${p.situation || 'Non renseigné'}
- Objectif principal : ${p.objectif || 'Non renseigné'}
- Horizon d'investissement : ${p.horizon || 'Non renseigné'}
- TMI (tranche marginale) : ${p.tmi || 'Non renseigné'}%
- Capacité d'épargne mensuelle : ${p.epargne || 'Non renseigné'}€
- Patrimoine existant : ${p.patrimoine || 'Non renseigné'}`;
}

async function saveQualification(profile, result) {
  const { error } = await supabase
    .from('qualifications')
    .insert({
      prenom: profile.prenom,
      revenus: Number(profile.revenus) || null,
      situation: profile.situation,
      objectif: profile.objectif,
      horizon: profile.horizon,
      tmi: Number(profile.tmi) || null,
      epargne: Number(profile.epargne) || null,
      patrimoine: profile.patrimoine,
      dispositif_principal: result.dispositif_principal,
      dispositifs_complementaires: result.dispositifs_complementaires,
      arguments: result.arguments,
      economie_fiscale_min: result.economie_fiscale_min,
      economie_fiscale_max: result.economie_fiscale_max,
      profil_resume: result.profil_resume,
      created_at: new Date().toISOString()
    });
  if (error) console.error('Erreur sauvegarde Supabase:', error);
}
