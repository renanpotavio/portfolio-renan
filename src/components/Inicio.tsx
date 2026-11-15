import { ArrowRight, Mail } from 'lucide-react';
import { CONTATO } from '../data/conteudo';
import IconeLinkedin from './IconeLinkedin';

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

      {/* PROVISÓRIO: a foto do Renan entra aqui, no lugar do monograma */}
      <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-borda bg-cartao">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_srgb,var(--color-destaque)_35%,transparent),transparent_60%)]"
          />
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-titulo text-8xl font-extrabold tracking-tighter text-texto/90">RP</span>
          </div>
        </div>
        <div className="absolute -bottom-5 left-4 rounded-2xl border border-borda bg-cartao/95 px-4 py-3 shadow-xl backdrop-blur sm:-left-6">
          <p className="flex items-center gap-2 text-sm font-medium">
            <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" /> Em constante evolução
          </p>
          <p className="mt-1 text-xs text-suave">Tecnologia · Produto · Pessoas</p>
        </div>
      </div>
    </section>
  );
}
