import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../supabase'
import HeaderFiche from '../components/programmes-neufs/fiche/HeaderFiche'
import GalerieFiche from '../components/programmes-neufs/fiche/GalerieFiche'
import PointsFortsFiche from '../components/programmes-neufs/fiche/PointsFortsFiche'
import TableauLotsFiche from '../components/programmes-neufs/fiche/TableauLotsFiche'
import AnalyseFiscale from '../components/programmes-neufs/fiche/AnalyseFiscale'
import LocalisationFiche from '../components/programmes-neufs/fiche/LocalisationFiche'
import CtaFiche from '../components/programmes-neufs/fiche/CtaFiche'

const S = {
  page: { minHeight:'100vh', background:'#F7F5F1' },
  nav:  { maxWidth:1100, margin:'0 auto', padding:'16px 24px' },
  back: { background:'none', border:'none', fontFamily:'Raleway,sans-serif', fontSize:12,
          color:'#A67C52', cursor:'pointer', padding:0 },
  wrap: { maxWidth:1100, margin:'0 auto', padding:'0 24px 80px' },
  grid: { display:'grid', gridTemplateColumns:'2fr 1fr', gap:28, alignItems:'start' },
  col:  { display:'flex', flexDirection:'column', gap:24 },
  load: { textAlign:'center', padding:120, fontFamily:'Playfair Display,serif', fontSize:18, color:'#A67C52' },
  err:  { textAlign:'center', padding:80, fontFamily:'Raleway,sans-serif', fontSize:16, color:'#DC2626' },
  lerr: { background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:8, padding:'10px 14px',
          fontFamily:'Raleway,sans-serif', fontSize:12, color:'#DC2626', marginBottom:12 },
}

export default function FicheProgrammeNeufs() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [prog, setProg]       = useState(null)
  const [lots, setLots]       = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)
  const [lotsErr, setLotsErr] = useState(null)

  useEffect(() => {
    if (!id) return
    supabase.from('nx_programmes')
      .select('id,libelle,ville,code_postal,region,zone_fiscale,latitude,longitude,type_chauffage,nb_lots_libres,nb_lots_total')
      .eq('id', id).single()
      .then(({ data: p, error: e }) => {
        if (e || !p) { setError('Programme introuvable'); setLoading(false); return }
        setProg(p)
        supabase.from('nx_lots')
          .select('id,code_lot,famille,nature,nb_pieces,etage,surface_habitable,fiscalites,statut,prix_ttc_20,prix_ttc_10,prix_ttc_55,prix_ht_immobilier,date_livraison_label,date_livraison_estimee')
          .eq('programme_id', id)
          .order('prix_ht_immobilier')
          .then(({ data: ls, error: le }) => {
            if (le) {
              console.error('[FicheProgramme] lots error:', le.message, le.code, le.details)
              setLotsErr(`Erreur lots : ${le.message} (code ${le.code})`)
            }
            setLots(ls || [])
            setLoading(false)
          })
      })
  }, [id])

  if (loading) return <div style={S.load}>Chargement...</div>
  if (error)   return <div style={S.err}>{error}</div>

  const prices = lots.filter(l=>l.famille!=='ANNEXE').map(l=>l.prix_ht_immobilier).filter(Boolean)
  const prixMin = prices.length ? Math.min(...prices) : null
  const dates = lots.map(l=>l.date_livraison_estimee).filter(Boolean).sort()
  const livraisonEst = dates[0] || null
  const livraisonLabel = lots.find(l=>l.date_livraison_estimee===livraisonEst)?.date_livraison_label || null
  const fiscalites = [...new Set(lots.flatMap(l=>l.fiscalites||[]).filter(f=>!f.includes('NON DEFINIE')))]

  return (
    <div style={S.page}>
      <div style={S.nav}>
        <button style={S.back} onClick={()=>navigate('/programmes')}>← Retour aux programmes</button>
      </div>
      <HeaderFiche prog={prog} prixMin={prixMin} fiscalites={fiscalites} livraisonLabel={livraisonLabel} />
      <div style={S.wrap}>
        <GalerieFiche prog={prog} />
        <div style={{height:28}} />
        <div style={S.grid}>
          <div style={S.col}>
            {lotsErr && <div style={S.lerr}>{lotsErr}</div>}
            <TableauLotsFiche lots={lots} />
            <AnalyseFiscale prog={prog} fiscalites={fiscalites} prixMin={prixMin} />
            <LocalisationFiche prog={prog} />
          </div>
          <div style={S.col}>
            <PointsFortsFiche prog={prog} prixMin={prixMin} livraisonLabel={livraisonLabel} />
            <CtaFiche prog={prog} />
          </div>
        </div>
      </div>
    </div>
  )
}
