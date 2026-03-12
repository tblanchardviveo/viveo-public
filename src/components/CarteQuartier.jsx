import { useEffect, useRef, useState } from 'react'

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const POI_CATEGORIES = [
  { key: 'poi_transports', label: 'Transports', icon: '\uD83D\uDE8C', color: '#3B82F6' },
  { key: 'poi_ecoles', label: '\u00C9coles', icon: '\uD83C\uDFEB', color: '#8B5CF6' },
  { key: 'poi_commerces', label: 'Commerces', icon: '\uD83D\uDED2', color: '#F59E0B' },
  { key: 'poi_sante', label: 'Sant\u00E9', icon: '\uD83C\uDFE5', color: '#EF4444' },
  { key: 'poi_loisirs', label: 'Loisirs & Parcs', icon: '\u26BD', color: '#10B981' },
  { key: 'poi_alimentation', label: 'Alimentation', icon: '\uD83C\uDF4E', color: '#F97316' },
  { key: 'poi_creches', label: 'Cr\u00E8ches', icon: '\uD83D\uDC76', color: '#EC4899' },
  { key: 'poi_services', label: 'Services', icon: '\uD83C\uDFE6', color: '#6366F1' },
]

const mapStyles = [
  { featureType: 'all', elementType: 'geometry.fill', stylers: [{ saturation: -40 }] },
  { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#d4e4f7' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
]

export default function CarteQuartier({ latitude, longitude, nom_programme, poi = {} }) {
  const mapRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!API_KEY || !latitude || !longitude) return
    if (window.google?.maps) { setMapReady(true); return }
    if (document.querySelector('script[src*="maps.googleapis"]')) {
      const check = setInterval(() => {
        if (window.google?.maps) { setMapReady(true); clearInterval(check) }
      }, 200)
      return () => clearInterval(check)
    }
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    script.async = true
    script.onload = () => setMapReady(true)
    script.onerror = () => setError('Carte non disponible')
    document.head.appendChild(script)
  }, [latitude, longitude])

  useEffect(() => {
    if (!mapReady || !mapRef.current) return
    const center = { lat: Number(latitude), lng: Number(longitude) }
    const map = new window.google.maps.Map(mapRef.current, {
      center, zoom: 15, styles: mapStyles,
      disableDefaultUI: true, zoomControl: true,
      fullscreenControl: false, mapTypeControl: false,
    })
    new window.google.maps.Marker({
      position: center, map, title: nom_programme,
      icon: { path: window.google.maps.SymbolPath.CIRCLE,
        scale: 10, fillColor: '#B8860B', fillOpacity: 1,
        strokeColor: '#fff', strokeWeight: 2 },
    })
  }, [mapReady, latitude, longitude, nom_programme])

  if (!API_KEY || !latitude || !longitude) return null
  if (error) return <p style={{ color: 'var(--muted)', fontSize: 13 }}>{error}</p>

  const activePoi = POI_CATEGORIES.filter(c => poi[c.key]?.length > 0)

  return (
    <div>
      <div ref={mapRef} style={{
        width: '100%', height: 'min(400px, 50vh)',
        borderRadius: 16, minHeight: 280,
      }} />
      {activePoi.length > 0 && (
        <div style={{
          marginTop: 16, padding: '16px 20px',
          background: '#FAF8F5', borderRadius: 12,
          display: 'flex', flexWrap: 'wrap', gap: 16,
        }}>
          {activePoi.map(cat => (
            <div key={cat.key} style={{ flex: '1 1 200px' }}>
              <div style={{
                fontSize: 12, fontWeight: 700, marginBottom: 6,
                color: cat.color, fontFamily: "'Raleway', sans-serif",
              }}>{cat.icon} {cat.label}</div>
              {poi[cat.key].slice(0, 4).map((p, i) => (
                <div key={i} style={{
                  fontSize: 12, color: 'var(--navy)', lineHeight: 1.8,
                  fontFamily: "'Raleway', sans-serif",
                }}>{p}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
