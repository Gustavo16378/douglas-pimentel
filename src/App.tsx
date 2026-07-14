import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CredibilityBar from './components/CredibilityBar'
import Atuacao from './components/Atuacao'
import Calculadora from './components/Calculadora'
import SeusDireitos from './components/SeusDireitos'
import MitosVerdades from './components/MitosVerdades'
import Palestras from './components/Palestras'
import Sobre from './components/Sobre'
import Depoimentos from './components/Depoimentos'
import OndeEncontrar from './components/OndeEncontrar'
import CTAFinal from './components/CTAFinal'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

export default function App() {
  return (
    <div className="w-full overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <CredibilityBar />
        <Atuacao />
        <Calculadora />
        <SeusDireitos />
        <Palestras />
        <MitosVerdades />
        <Sobre />
        <Depoimentos />
        <OndeEncontrar />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
