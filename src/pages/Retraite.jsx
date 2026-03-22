import { useEffect } from 'react'
import HeroRetraite from '../components/retraite/HeroRetraite'
import VeriteRetraite from '../components/retraite/VeriteRetraite'
import ProfilsRetraite from '../components/retraite/ProfilsRetraite'
import SimulateurRetraite from '../components/retraite/SimulateurRetraite'
import SolutionViveo from '../components/retraite/SolutionViveo'
import CtaRetraite from '../components/retraite/CtaRetraite'

export default function Retraite() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Préparer ma retraite | VIVEO Patrimoine'
  }, [])

  return (
    <div style={{ background: 'var(--navy-deep)' }}>
      <HeroRetraite />
      <VeriteRetraite />
      <ProfilsRetraite />
      <SimulateurRetraite />
      <SolutionViveo />
      <CtaRetraite />
    </div>
  )
}
