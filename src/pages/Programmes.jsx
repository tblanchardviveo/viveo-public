import { useEffect, useState } from 'react'
import { supabase } from '../supabase'
import { Link } from 'react-router-dom'

export default function Programmes() {
  const [programmes, setProgrammes] = useState([])

  useEffect(() => {
    supabase
      .from('programmes')
      .select('*')
      .eq('statut', 'publie')
      .then(({ data }) => setProgrammes(data || []))
  }, [])

  return (
    <div>
      <h1>Nos programmes immobiliers</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {programmes.map(p => (
          <Link key={p.id} to={`/programme/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
              {p.image_url && <img src={p.image_url} alt={p.nom} style={{ width: '100%', height: 200, objectFit: 'cover' }} />}
              <div style={{ padding: '1rem' }}>
                <h2>{p.nom}</h2>
                <p>{p.ville} ({p.code_postal})</p>
                <p>A partir de {p.prix_min?.toLocaleString()} EUR</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
