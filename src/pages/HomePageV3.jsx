import HeroV3 from '../components/home-v3/HeroV3'
import ManifestoV3 from '../components/home-v3/ManifestoV3'
import ChiffresV3 from '../components/home-v3/ChiffresV3'
import ProgrammesV3 from '../components/home-v3/ProgrammesV3'
import DispostifsV3 from '../components/home-v3/DispostifsV3'
import BanquesV3 from '../components/home-v3/BanquesV3'
import TemoignagesV3 from '../components/home-v3/TemoignagesV3'
import ProcessusV3 from '../components/home-v3/ProcessusV3'
import CtaV3 from '../components/home-v3/CtaV3'
import { Link } from 'react-router-dom'

export default function HomePageV3() {
  return (
    <>
      <HeroV3 />
      <ManifestoV3 />
      <ChiffresV3 />
      <ProgrammesV3 />
      <DispostifsV3 />
      <BanquesV3 />
      <TemoignagesV3 />
      <ProcessusV3 />
              <section style={{ padding: '60px 20px', background: '#f8f6f3', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: '#1a1a2e', marginBottom: 12 }}>Votre espace client</h2>
          <p style={{ color: '#555', maxWidth: 520, margin: '0 auto 24px', fontSize: 15 }}>Suivez vos investissements, consultez vos documents et pilotez votre patrimoine en toute autonomie.</p>
          <Link to="/demo-espace-client" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#A67C52,#C4976A)', color: '#fff', padding: '12px 28px', borderRadius: 4, fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>Decouvrir la demo</Link>
        </section>
      <CtaV3 />
    </>
  )
}
