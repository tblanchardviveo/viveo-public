import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Programmes from './pages/Programmes'
import FicheProgramme from './pages/FicheProgramme'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Programmes />} />
        <Route path="/programme/:slug" element={<FicheProgramme />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
