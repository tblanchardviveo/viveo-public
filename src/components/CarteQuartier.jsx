import { useState } from 'react'

const CATEGORIES = [
  { key: 'poi_ecoles', label: 'Écoles & Formation', icon: '🎓' },
  { key: 'poi_transports', label: 'Transports', icon: '🚆' },
  { key: 'poi_commerces', label: 'Commerces', icon: '🛍️' },
  { key: 'poi_sante', label: 'Santé', icon: '🏥' },
  { key: 'poi_loisirs', label: 'Loisirs', icon: '⚽' },
  { key: 'poi_alimentation', label: 'Alimentation', icon: '🛒' },
  { key: 'poi_creches', label: 'Crèches', icon: '👶' },
  { key: 'poi_services', label: 'Services', icon: '🏛️' },
]

const pillStyle = (active) => ({
  display: 'inline-flex', alignItems: 'center', gap: 6,
  padding: '8px 18px', borderRadius: 50, fontSize: 13, fontWeight: 500,
  fontFamily: '"Raleway", sans-serif', cursor: 'pointer', transition: 'all 0.2s',
  border: active ? '1.5px solid var(--bronze)' : '1.5px solid #E5E3E0',
  background: active ? 'rgba(166,124,82,0.08)' : '#fff',
  color: active ? 'var(--bronze)' : 'var(--navy)',
})

const parsePoi = (item) => {
  const m = item.match(/^(.+?)\s*\((\d+)m\)$/)
  return m ? { name: m[1].trim(), dist: parseInt(m[2], 10) } : { name: item, dist: null }
}

export default function CarteQuartier({ latitude, longitude, nom_programme, poi }) {
  const [activeCat, setActiveCat] = useState(null)

  const hasPoi = poi && CATEGORIES.some(c => poi[c.key] && poi[c.key].length > 0)
  const hasCoords = latitude && longitude

  if (!hasCoords && !hasPoi) {
    return (
      <div style={{ padding: 16, background: '#F7F5F0', borderRadius: 8 }}>
        <p style={{ color: '#6B7280', fontSize: 14 }}>Carte du quartier disponible prochainement.</p>
      </div>
    )
  }

  const availCats = CATEGORIES.filter(c => poi && poi[c.key] && poi[c.key].length > 0)
  const current = activeCat || (availCats.length > 0 ? availCats[0].key : null)
  const currentItems = current && poi && poi[current] ? poi[current].map(parsePoi).sort((a, b) => (a.dist || 9999) - (b.dist || 9999)) : []

  return (
    <div>
      {hasCoords && (
        <iframe
          title="carte quartier"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyAF-pzcNWC0rRmKVRHrGtRlKT1ro2gXlHw&q=${latitude},${longitude}&zoom=15&maptype=roadmap`}
          style={{ width: '100%', height: 320, border: '1.5px solid #E5E3E0', borderRadius: 12 }}
        />
      )}

      {availCats.length > 0 && (
        <div style={{ marginTop: 28 }}>
          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
            {availCats.map(c => (
              <button
                key={c.key}
                onClick={() => setActiveCat(c.key)}
                style={pillStyle(current === c.key)}
              >
                <span>{c.icon}</span> {c.label}
              </button>
            ))}
          </div>

          {/* POI list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {currentItems.map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: i < currentItems.length - 1 ? '1px solid rgba(26,39,68,0.06)' : 'none',
                }}
              >
                <span style={{ fontSize: 14, color: 'var(--navy)', fontFamily: '"Raleway", sans-serif' }}>
                  {item.name}
                </span>
                {item.dist !== null && (
                  <span style={{
                    fontSize: 12, fontWeight: 600, color: 'var(--bronze)',
                    fontFamily: '"Raleway", sans-serif', whiteSpace: 'nowrap', marginLeft: 16,
                  }}>
                    {item.dist >= 1000 ? `${(item.dist / 1000).toFixed(1)} km` : `${item.dist} m`}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
