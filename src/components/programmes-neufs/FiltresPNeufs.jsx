const S = {
  wrap: { background: '#F7F5F1', borderBottom: '1px solid #E0D8CE', padding: '16px 24px' },
  row:  { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end', maxWidth: 1200, margin: '0 auto' },
  grp:  { display: 'flex', flexDirection: 'column', gap: 4, minWidth: 160 },
  lbl:  { fontSize: 10, fontWeight: 700, color: '#6B6B7B', textTransform: 'uppercase', letterSpacing: '.08em', fontFamily: 'Raleway,sans-serif' },
  sel:  { padding: '8px 12px', border: '1px solid #D4C8B8', borderRadius: 6, fontFamily: 'Raleway,sans-serif',
          fontSize: 13, color: '#111C33', background: '#fff', cursor: 'pointer', outline: 'none' },
  inp:  { padding: '8px 12px', border: '1px solid #D4C8B8', borderRadius: 6, fontFamily: 'Raleway,sans-serif',
          fontSize: 13, color: '#111C33', background: '#fff', width: 110 },
  chk:  { display: 'flex', flexWrap: 'wrap', gap: '6px 14px', alignItems: 'center' },
  cl:   { display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontFamily: 'Raleway,sans-serif',
          color: '#111C33', cursor: 'pointer' },
  rst:  { padding: '8px 14px', border: '1px solid #A67C52', borderRadius: 6, background: 'none',
          color: '#A67C52', fontSize: 12, fontWeight: 700, fontFamily: 'Raleway,sans-serif', cursor: 'pointer' },
}
const REGIONS = ['BASSE-NORMANDIE','BRETAGNE','ILE-DE-FRANCE','NORD-PAS-DE-CALAIS','NOUVELLE-AQUITAINE',
  'OCCITANIE','PACA','PAYS-DE-LA-LOIRE','RHONE-ALPES','GRAND-EST','BOURGOGNE-FRANCHE-COMTE','CENTRE-VAL-DE-LOIRE']
const ZONES = ['ZONE A BIS','ZONE A','ZONE B1','ZONE B2','ZONE C']
const FISCAS = ['LMNP/LMP','JEANBRUN','LLI TVA 10%','DEFICIT FONCIER']
const PIECES = ['1','2','3','4','5+']

export default function FiltresPNeufs({ filtres, onChange, regions }) {
  const set = (k, v) => onChange({ ...filtres, [k]: v })
  const toggleFisca = f => {
    const cur = filtres.fiscas || []
    set('fiscas', cur.includes(f) ? cur.filter(x => x !== f) : [...cur, f])
  }
  const reset = () => onChange({ region: '', pieces: '', prixMax: '', fiscas: [], zone: '' })
  return (
    <div style={S.wrap}>
      <div style={S.row}>
        <div style={S.grp}>
          <span style={S.lbl}>Région</span>
          <select style={S.sel} value={filtres.region} onChange={e => set('region', e.target.value)}>
            <option value="">Toutes</option>
            {(regions.length ? regions : REGIONS).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div style={S.grp}>
          <span style={S.lbl}>Nb pièces</span>
          <select style={S.sel} value={filtres.pieces} onChange={e => set('pieces', e.target.value)}>
            <option value="">Tous</option>
            {PIECES.map(p => <option key={p} value={p}>{p} {p === '5+' ? 'pièces et +' : 'pièce(s)'}</option>)}
          </select>
        </div>
        <div style={S.grp}>
          <span style={S.lbl}>Prix max (€)</span>
          <input style={S.inp} type="number" placeholder="Sans limite" value={filtres.prixMax}
            onChange={e => set('prixMax', e.target.value)} />
        </div>
        <div style={S.grp}>
          <span style={S.lbl}>Zone fiscale</span>
          <select style={S.sel} value={filtres.zone} onChange={e => set('zone', e.target.value)}>
            <option value="">Toutes</option>
            {ZONES.map(z => <option key={z} value={z}>{z}</option>)}
          </select>
        </div>
        <div style={S.grp}>
          <span style={S.lbl}>Dispositif fiscal</span>
          <div style={S.chk}>
            {FISCAS.map(f => (
              <label key={f} style={S.cl}>
                <input type="checkbox" checked={(filtres.fiscas||[]).includes(f)} onChange={() => toggleFisca(f)} />
                {f}
              </label>
            ))}
          </div>
        </div>
        <button style={S.rst} onClick={reset}>Réinitialiser</button>
      </div>
    </div>
  )
}
