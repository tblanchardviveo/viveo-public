# RAPPORT-VIVEO — Audit Global Ecosystem
> Date : 2025-03-21 | Auteur : Sonnet (IA) | Mode : LECTURE SEULE

---

## 1. STRUCTURE DES REPOS

### viveo-admin (Back-office)
| Metric | Valeur |
|---|---|
| Commits | 527 |
| Pages (src/pages) | 35 |
| Components (src/components) | 11 + 9 rdv/ |
| API (api/) | 12 serverless functions |
| Lib (src/lib) | 6 fichiers (auth, githubApi, hubspot, scoring, simulateurFiscalEngine, supabase) |
| Vercel | 🟢 Production green |
| Routing | Custom SPA router (BASE_PATH=/pilotage) |
| Lazy loading | 🟢 44 pages lazy-loaded |

### viveo-public (Site vitrine)
| Metric | Valeur |
|---|---|
| Commits | 304 |
| Pages (src/pages) | 21 + 8 fiscal/ |
| Components | 18+ (home/, home-v3/, etudes/, parrainage/, approche/, retraite/, lmnp-gere/) |
| API (api/) | 2 (parrainage-submit, rdv-demande) |
| Hooks | 1 (useReveal) |
| Vercel | 🟢 Production green |
| Routing | react-router-dom BrowserRouter |
| Lazy loading | 🔴 AUCUN — tous les imports sont directs |
| CI/CD | .github/workflows/check-charte.yml |

### viveo-client (Espace client + partenaire)
| Metric | Valeur |
|---|---|
| Commits | 93 |
| Pages (src/pages) | 15 |
| Screens (src/screens) | 9 (React Native Expo legacy) |
| Components | 6 |
| Lib | 4 (auth, authPartenaire, simulateurFiscalEngine, supabase) |
| Navigation | src/navigation/ |
| Vercel | 🟢 Production green |
| Routing | react-router-dom BrowserRouter (basename=/app) |

---

## 2. QUALITÉ CODE — Violations 150 lignes

### 🔴 viveo-admin (CRITIQUE)
| Fichier | Lignes | Ratio |
|---|---|---|
| src/lib/supabase.js | 783 | x5.2 |
| src/pages/FicheProgramme.jsx | 821 | x5.5 |
| src/pages/FicheClient.jsx | 529 | x3.5 |
| src/pages/SimulateurFiscal.jsx | 491 | x3.3 |
| src/pages/Denonciations.jsx | 400 | x2.7 |
| src/components/UI.jsx | 358 | x2.4 |
| src/pages/Promoteurs.jsx | 287 | x1.9 |
| src/pages/Matching.jsx | 244 | x1.6 |
| src/pages/Programmes.jsx | 228 | x1.5 |
| src/pages/ComparateurSimulations.jsx | 227 | x1.5 |
| src/App.jsx | 225 | x1.5 |
| src/pages/Relances.jsx | 196 | x1.3 |
| src/pages/MarcheLocal.jsx | 171 | x1.1 |

### 🔴 viveo-public
| Fichier | Lignes | Ratio |
|---|---|---|
| src/components/CalcInvestissement.jsx | 676 | x4.5 |
| src/components/CalcResidencePrincipale.jsx | 524 | x3.5 |
| src/pages/FicheProgramme.jsx | 223 | x1.5 |
| src/components/SearchEngine.jsx | 179 | x1.2 |
| src/pages/Programmes.jsx | 161 | x1.1 |
| src/App.jsx | 152 | x1.0 |

### 🟡 viveo-client
| Fichier | Lignes | Ratio |
|---|---|---|
| src/pages/SimulateurFiscal.jsx | 439 | x2.9 |
| src/lib/simulateurFiscalEngine.js | 285 | x1.9 |

---

## 3. SÉCURITÉ

| Item | Statut | Détail |
|---|---|---|
| Clés Supabase | 🟢 OK | import.meta.env partout (3 repos) |
| API keys backend | 🟢 OK | process.env dans api/ (CLAUDE_API_KEY, HUBSPOT_TOKEN, RESEND_API_KEY) |
| .env.example | 🟢 OK | Présent viveo-public + viveo-client |
| .env.example viveo-admin | 🟡 ABSENT | Pas de .env.example |
| CORS API | 🟡 WARN | Access-Control-Allow-Origin: * sur toutes les API viveo-admin |
| Repo viveo-public | 🔴 PUBLIC | Code source visible (pas de secrets mais architecture exposée) |
| Repo viveo-admin | 🟢 PRIVÉ | OK |
| Repo viveo-client | 🟢 PRIVÉ | OK |

---

## 4. PERFORMANCE

| Item | Statut | Détail |
|---|---|---|
| Lazy loading viveo-admin | 🟢 OK | 44 pages en React.lazy() |
| Lazy loading viveo-public | 🔴 CRITIQUE | 0 pages lazy-loaded, tous imports directs dans App.jsx |
| Lazy loading viveo-client | 🟡 ABSENT | Imports directs (15 pages) |
| Bundle viveo-public | 🔴 GROS | CalcInvestissement 676L + CalcResidencePrincipale 524L chargés même sans visite |
| Images | 🟡 WARN | Images PNG non optimisées dans public/images/ (viveo-public) |
| WordPress API | 🟡 WARN | URL WordPress hardcodée dans plusieurs fichiers viveo-public |

---

## 5. INTÉGRATIONS

| Service | Repo | Statut |
|---|---|---|
| Supabase | 3 repos | 🟢 OK — client init via env vars |
| Supabase API (viveo-admin) | viveo-admin | 🟢 783L, 50+ fonctions |
| Vercel | 3 repos | 🟢 3 deployments Production green |
| Vercel Serverless | viveo-admin | 🟢 12 functions (api/) |
| Vercel Serverless | viveo-public | 🟢 2 functions (api/) |
| HubSpot | viveo-admin | 🟢 api/hubspot.js |
| Resend (email) | viveo-admin | 🟢 api/notify.js, api/send-denonciation.js |
| Claude AI | viveo-admin | 🟢 api/generate.js |
| Google Analytics | viveo-public | 🟢 G-NJKN70F5R8 dans index.html |
| Make.com | viveo-client | 🟡 Prévu (commentaires specs LoginPartenaire) |
| WordPress API | viveo-public | 🟢 viveo-promotion WP headless CMS |

---

## 6. RECOMMANDATIONS PRIORITAIRES

| # | Priorité | Action |
|---|---|---|
| 1 | 🔴 URGENT | Scission FicheProgramme.jsx (821L) viveo-admin |
| 2 | 🔴 URGENT | Scission supabase.js (783L) viveo-admin en modules |
| 3 | 🔴 URGENT | Scission CalcInvestissement.jsx (676L) viveo-public |
| 4 | 🔴 URGENT | Ajouter lazy loading viveo-public (29 pages/routes) |
| 5 | 🟡 HIGH | Scission FicheClient.jsx (529L), SimulateurFiscal.jsx (491L) viveo-admin |
| 6 | 🟡 HIGH | Scission CalcResidencePrincipale.jsx (524L) viveo-public |
| 7 | 🟡 HIGH | Scission SimulateurFiscal.jsx (439L) viveo-client |
| 8 | 🟡 MED | Ajouter .env.example viveo-admin |
| 9 | 🟡 MED | Restreindre CORS API (remplacer * par domaines VIVEO) |
| 10 | 🟡 MED | Passer viveo-public en PRIVÉ si possible |
| 11 | 🟢 LOW | Ajouter lazy loading viveo-client (15 pages) |
| 12 | 🟢 LOW | Optimiser images PNG viveo-public (WebP/AVIF) |

---

> Total fichiers >150 lignes : **13 viveo-admin + 6 viveo-public + 2 viveo-client = 21 fichiers**
> Fichier le plus critique : FicheProgramme.jsx viveo-admin (821 lignes)
