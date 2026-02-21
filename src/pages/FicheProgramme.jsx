import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../supabase'

export default function FicheProgramme() {
  const { slug } = useParams()
  const [programme, setProgramme] = useState(null)
  const [lots, setLots] = useState([])

  useEffect(() => {
    supabase
      .from('programmes')
      .select('*')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        setProgramme(data)
        if (data) {
          supabase
            .from('lots')
            .select('*')
            .eq('programme_id', data.id)
            .then(({ data: lotsData }) => setLots(lotsData || []))
        }
      })
  }, [slug])

  if (!programme) return <p>Chargement...</p>

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
      <Link to="/">Retour aux programmes</Link>
      <h1>{programme.nom}</h1>
      <p>{programme.ville} ({programme.code_postal})</p>
      <p>{programme.description}</p>
      {programme.image_url && <img src={programme.image_url} alt={programme.nom} style={{ width: '100%', borderRadius: 8 }} />}
      <h2>Lots disponibles</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Type</th><th>Surface</th><th>Etage</th><th>Prix</th><th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {lots.map(l => (
            <tr key={l.id}>
              <td>{l.type_lot}</td>
              <td>{l.surface} m2</td>
              <td>{l.etage}</td>
              <td>{l.prix?.toLocaleString()} EUR</td>
              <td>{l.statut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
