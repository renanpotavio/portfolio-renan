import { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Cabecalho from './components/Cabecalho';
import Contato from './components/Contato';
import Experiencia from './components/Experiencia';
import Formacao from './components/Formacao';
import FundoGrade from './components/FundoGrade';
import Inicio from './components/Inicio';
import Projetos from './components/Projetos';
import Rodape from './components/Rodape';
import Skills from './components/Skills';
import Sobre from './components/Sobre';
import { TemaProvider } from './contexts/TemaContext';

export default function App() {
  // Link com âncora (ex.: site/#contato): o conteúdo só existe depois que o React monta,
  // então o navegador não consegue pular sozinho. Pula aqui, logo após montar.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <TemaProvider>
      {/* "user": respeita o "reduzir movimento" do sistema em todas as animações */}
      <MotionConfig reducedMotion="user">
        <FundoGrade />
        <Cabecalho />
        <main className="pt-16">
          <Inicio />
          <Sobre />
          <Projetos />
          <Experiencia />
          <Formacao />
          <Skills />
          <Contato />
        </main>
        <Rodape />
      </MotionConfig>
    </TemaProvider>
  );
}
