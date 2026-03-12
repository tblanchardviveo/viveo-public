import { useRef } from 'react'
import HeroParrainage from '../components/parrainage/HeroParrainage'
import StepsParrainage from '../components/parrainage/StepsParrainage'
import FormulaireParrainage from '../components/parrainage/FormulaireParrainage'
import MentionsLegalesParrainage from '../components/parrainage/MentionsLegalesParrainage'

export default function Parrainage() {
  const formRef = useRef(null)
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      <HeroParrainage onScrollForm={scrollToForm} />
      <StepsParrainage />
      <FormulaireParrainage ref={formRef} />
      <MentionsLegalesParrainage />
    </>
  )
}
