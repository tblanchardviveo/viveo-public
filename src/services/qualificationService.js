import { supabase } from '../supabase';
import { QUALIFICATION_SYSTEM_PROMPT } from '../prompts/qualificationPrompt';

export async function qualifyProspect(profileData) {
  const userMessage = buildUserMessage(profileData);

  const response = await fetch('/api/qualify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
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
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    result = JSON.parse(cleaned)
  } catch {
    throw new Error('Réponse IA invalide (JSON attendu)')
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
