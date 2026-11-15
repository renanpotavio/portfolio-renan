import Cabecalho from './components/Cabecalho';
import Inicio from './components/Inicio';
import SecaoProvisoria from './components/SecaoProvisoria';
import { TemaProvider } from './contexts/TemaContext';

export default function App() {
  return (
    <TemaProvider>
      <Cabecalho />
      <main className="pt-16">
        <Inicio />
        <SecaoProvisoria id="sobre" rotulo="Sobre mim" titulo="Mais do que tecnologia, meu foco é em pessoas" />
        <SecaoProvisoria id="projetos" rotulo="Projetos" titulo="Da ideia à entrega" />
        <SecaoProvisoria id="experiencia" rotulo="Experiência" titulo="Minha trajetória" />
        <SecaoProvisoria id="formacao" rotulo="Formação" titulo="Estudos e trilhas" />
        <SecaoProvisoria id="skills" rotulo="Skills" titulo="Tecnologias e ferramentas" />
        <SecaoProvisoria id="contato" rotulo="Vamos conversar?" titulo="Aberto a novas oportunidades" />
      </main>
    </TemaProvider>
  );
}
