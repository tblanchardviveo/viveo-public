import { Link } from 'react-router-dom';
import PolitiqueHeader from '../components/politique/PolitiqueHeader';
import PolitiqueArticles from '../components/politique/PolitiqueArticles';

const navy = '#111C33';
const bronze = '#A67C52';

export default function PolitiqueConfidentialite() {
  return (
    <div style={{background:'#F9F6F1',minHeight:'100vh'}}>
      <PolitiqueHeader />
      <div style={{maxWidth:900,margin:'0 auto',padding:'40px 24px'}}>
        <PolitiqueArticles />
      </div>
      <footer style={{background:navy,padding:'32px 24px',textAlign:'center'}}>
        <p style={{color:'#fff',fontFamily:'Raleway,sans-serif',fontSize:13,margin:0}}>
          © {new Date().getFullYear()} VIVEO Patrimoine — <Link to='/mentions-legales' style={{color:bronze,textDecoration:'underline'}}>Mentions légales</Link>
        </p>
      </footer>
    </div>
  );
}