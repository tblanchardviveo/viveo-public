import { useEffect } from 'react'
import HeroEtudes from '../components/etudes/HeroEtudes'
import CoutEtudes from '../components/etudes/CoutEtudes'
import ProfilsEtudes from '../components/etudes/ProfilsEtudes'
import SimulateurEtudes from '../components/etudes/SimulateurEtudes'
import SolutionEtudes from '../components/etudes/SolutionEtudes'
import CtaEtudes from '../components/etudes/CtaEtudes'

export default function EtudesEnfants() {
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Financer les études de vos enfants | VIVEO Patrimoine'
  }, [])

  return (
    <div style={{ background: 'var(--navy-deep)' }}>
      <HeroEtudes />
      <CoutEtudes />
      <ProfilsEtudes />
      <SimulateurEtudes />
      <SolutionEtudes />
      <CtaEtudes />
    </div>
  )
}
