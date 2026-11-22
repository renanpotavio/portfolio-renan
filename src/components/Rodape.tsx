import { Mail } from 'lucide-react';
import { CONTATO } from '../data/conteudo';
import IconeGithub from './IconeGithub';
import IconeLinkedin from './IconeLinkedin';

const botao =
  'grid size-9 place-items-center rounded-full border border-borda transition-[color,border-color] hover:border-destaque hover:text-texto';

export default function Rodape() {
  return (
    <footer className="border-t border-borda bg-fundo/80 backdrop-blur-sm">
      <div className="container-site flex flex-col items-center gap-4 py-8 text-sm text-suave sm:flex-row sm:justify-between">
        <p className="font-titulo font-semibold text-texto">Renan Pinheiro</p>
        <p>Tecnologia · Produto · Pessoas</p>
        <div className="flex items-center gap-2">
          <a href={CONTATO.github} target="_blank" rel="noreferrer" aria-label="GitHub" className={botao}>
            <IconeGithub size={16} />
          </a>
          <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={botao}>
            <IconeLinkedin size={16} />
          </a>
          <a href={`mailto:${CONTATO.email}`} aria-label="E-mail" className={botao}>
            <Mail size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
