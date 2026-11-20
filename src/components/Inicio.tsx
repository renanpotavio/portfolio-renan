import { ArrowRight, Box, Headset, Mail, MapPin, Target } from 'lucide-react';
import { CONTATO } from '../data/conteudo';
import IconeLinkedin from './IconeLinkedin';

const FOCOS = [
  { icone: Target, titulo: 'Produto', texto: 'Rumo a Product Owner Júnior, com formação na PM3.' },
  { icone: Box, titulo: 'Tecnologia', texto: 'Unity, C# e Blender em projetos de VR/AR.' },
  { icone: Headset, titulo: 'Pessoas', texto: 'Suporte N1, atendimento e comunicação com usuários.' },
];

const botaoRede =
  'grid size-10 place-items-center rounded-full border border-borda transition-[color,border-color] hover:border-destaque hover:text-texto';

export default function Inicio() {
  return (
    <section
      id="inicio"
      data-fundo="forte"
      className="container-site grid min-h-[calc(100svh-4rem)] items-center gap-14 py-16 lg:grid-cols-[1.3fr_1fr]"
    >
      <div className="relative max-w-2xl">
        {/* Halo da cor do fundo: o chão de pontos não atrapalha a leitura do texto */}
        <div aria-hidden="true" className="absolute -inset-x-4 -inset-y-12 -z-[1] rounded-[3rem] bg-fundo/75 blur-2xl sm:-inset-x-10" />
        <p className="rotulo">Olá, eu sou</p>
        <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-6xl">
          Renan Pinheiro
          <span className="block text-destaque">Product &amp; Tech</span>
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-suave sm:text-lg">
          Estudante de Análise e Desenvolvimento de Sistemas, com experiência em suporte técnico e
          projetos de VR/AR, e foco em Produto. Gosto de conectar pessoas, tecnologia e necessidades
          reais para gerar soluções que fazem sentido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projetos" className="botao-principal">
            Ver projetos <ArrowRight size={16} />
          </a>
          <a href="#sobre" className="botao-contorno">
            Conhecer mais
          </a>
        </div>
        <div className="mt-8 flex items-center gap-2 text-suave">
          <a href={CONTATO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={botaoRede}>
            <IconeLinkedin size={17} />
          </a>
          <a href={`mailto:${CONTATO.email}`} aria-label="E-mail" className={botaoRede}>
            <Mail size={17} />
          </a>
        </div>
      </div>

      {/* Sem foto por enquanto: um cartão com os três focos do Renan */}
      <div className="relative w-full max-w-md rounded-[2rem] border border-borda bg-cartao/85 p-6 backdrop-blur-sm sm:p-7 lg:justify-self-end">
        <p className="flex items-center gap-2 text-sm font-medium">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" /> Em constante evolução
        </p>
        <ul className="mt-6 space-y-5">
          {FOCOS.map(({ icone: Icone, titulo, texto }) => (
            <li key={titulo} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-destaque/12 text-destaque">
                <Icone size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="font-titulo font-semibold">{titulo}</p>
                <p className="mt-0.5 text-sm text-suave">{texto}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 border-t border-borda pt-5 text-sm text-suave">
          <MapPin size={15} aria-hidden="true" /> {CONTATO.cidade}
        </p>
      </div>
    </section>
  );
}
