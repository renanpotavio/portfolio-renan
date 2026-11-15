import { MotionConfig } from 'motion/react';
import Cabecalho from './components/Cabecalho';
import FundoGrade from './components/FundoGrade';
import Inicio from './components/Inicio';
import SecaoProvisoria from './components/SecaoProvisoria';
import Sobre from './components/Sobre';
import { TemaProvider } from './contexts/TemaContext';

export default function App() {
  return (
    <TemaProvider>
      {/* "user": respeita o "reduzir movimento" do sistema em todas as animações */}
      <MotionConfig reducedMotion="user">
        <FundoGrade />
        <Cabecalho />
        <main className="pt-16">
          <Inicio />
          <Sobre />
          <SecaoProvisoria id="projetos" rotulo="Projetos" titulo="Da ideia à entrega" />
          <SecaoProvisoria id="experiencia" rotulo="Experiência" titulo="Minha trajetória" />
          <SecaoProvisoria id="formacao" rotulo="Formação" titulo="Estudos e trilhas" />
          <SecaoProvisoria id="skills" rotulo="Skills" titulo="Tecnologias e ferramentas" />
          <SecaoProvisoria id="contato" rotulo="Vamos conversar?" titulo="Aberto a novas oportunidades" />
        </main>
      </MotionConfig>
    </TemaProvider>
  );
}
