import { useState, useEffect, useMemo } from 'react'
import { supabase } from '../supabase'
import FiltresPNeufs from '../components/programmes-neufs/FiltresPNeufs'
import CartePNeufs from '../components/programmes-neufs/CartePNeufs'
import ModalPNeufs from '../components/programmes-neufs/ModalPNeufs'

const INIT = { region:'', pieces:'', prixMax:'', fiscas:[], zone:'' }

const S = {
  hero: { background:'#111C33', padding:'80px 24px 48px', textAlign:'center' },
  h1:   { fontFamily:'Playfair Display,serif', fontSize:'clamp(28px,4vw,44px)', color:'#fff', fontWeight:400, marginBottom:12 },
  sub:  { fontFamily:'Raleway,sans-serif', fontSize:15, color:'rgba(255,255,255,0.55)', maxWidth:560, margin:'0 auto' },
  main: { maxWidth:1200, margin:'0 auto', padding:'32px 24px' },
  grid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:20 },
  none: { textAlign:'center', padding:'60px 24px', fontFamily:'Raleway,sans-serif', fontSize:14, color:'#9A8A7A' },
  count:{ fontFamily:'Raleway,sans-serif', fontSize:13, color:'#6B6B7B', marginBottom:20 },
}

export default function ProgrammesNeufs() {
  const [programmes, setProgrammes] = useState([])
  const [lots, setLots]             = useState([])
  const [filtres, setFiltres]       = useState(INIT)
  const [sel, setSel]               = useState(null)
  const [modalLots, setModalLots]   = useState([])
  const [modalLoad, setModalLoad]   = useState(false)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    Promise.all([
      supabase.from('nx_programmes').select('id,libelle,ville,code_postal,region,zone_fiscale,nb_lots_libres').eq('statut','actif').order('ville'),
      supabase.from('nx_lots').select('programme_id,prix_ht_immobilier,fiscalites,nb_pieces,statut').eq('statut','libre'),
    ]).then(([{data:progs},{data:ls}]) => {
      const lotsData = ls || []
      const byProg = {}
      lotsData.forEach(l => { byProg[l.programme_id] = byProg[l.programme_id] || []; byProg[l.programme_id].push(l) })
      const enriched = (progs||[]).map(p => {
        const pl = byProg[p.id] || []
        const prices = pl.map(l=>l.prix_ht_immobilier).filter(Boolean)
        const allFiscas = [...new Set(pl.flatMap(l=>l.fiscalites||[]).filter(f=>!f.includes('NON DEFINIE')))]
        return { ...p, prixMin: prices.length ? Math.min(...prices) : null, fiscalites: allFiscas }
      })
      setProgrammes(enriched)
      setLots(lotsData)
      setLoading(false)
    })
  }, [])

  const regions = useMemo(() => [...new Set(programmes.map(p=>p.region).filter(Boolean))].sort(), [programmes])

  const filtered = useMemo(() => programmes.filter(p => {
    if (filtres.region && p.region !== filtres.region) return false
    if (filtres.zone && p.zone_fiscale !== filtres.zone) return false
    if (filtres.prixMax && p.prixMin && p.prixMin > Number(filtres.prixMax)) return false
    if (filtres.fiscas?.length) {
      const hasFisca = filtres.fiscas.every(f => (p.fiscalites||[]).some(pf=>pf.includes(f.split('/')[0])))
      if (!hasFisca) return false
    }
    if (filtres.pieces) {
      const prog_lots = lots.filter(l=>l.programme_id===p.id)
      const n = filtres.pieces === '5+' ? 5 : Number(filtres.pieces)
      const has = filtres.pieces === '5+' ? prog_lots.some(l=>l.nb_pieces>=5) : prog_lots.some(l=>l.nb_pieces===n)
      if (!has) return false
    }
    return true
  }), [programmes, lots, filtres])

  const handleSelect = async (prog) => {
    setSel(prog)
    setModalLoad(true)
    setModalLots([])
    const { data } = await supabase.from('nx_lots')
      .select('id,famille,nature,nb_pieces,surface_habitable,fiscalites,statut,prix_ht_immobilier,date_livraison_label')
      .eq('programme_id', prog.id).eq('statut','libre').order('prix_ht_immobilier')
    setModalLots(data || [])
    setModalLoad(false)
  }

  return (
    <div>
      <div style={S.hero}>
        <h1 style={S.h1}>Programmes neufs</h1>
        <p style={S.sub}>Découvrez notre sélection de programmes immobiliers neufs en France</p>
      </div>
      <FiltresPNeufs filtres={filtres} onChange={setFiltres} regions={regions} />
      <div style={S.main}>
        <div style={S.count}>
          {loading ? 'Chargement...' : `${filtered.length} programme${filtered.length>1?'s':''} trouvé${filtered.length>1?'s':''}`}
        </div>
        {!loading && filtered.length === 0
          ? <div style={S.none}>Aucun programme ne correspond à vos critères.</div>
          : <div style={S.grid}>{filtered.map(p => <CartePNeufs key={p.id} prog={p} onSelect={handleSelect}/>)}</div>
        }
      </div>
      {sel && <ModalPNeufs prog={sel} lots={modalLots} loading={modalLoad} onClose={() => setSel(null)} />}
    </div>
  )
}
