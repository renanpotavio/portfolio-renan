import { ArrowRight, Mail } from 'lucide-react';

export default function Inicio() {
  return (
    <section id="inicio" data-fundo="forte" className="container-site flex min-h-[calc(100svh-4rem)] items-center py-16">
      <div className="relative max-w-2xl">
        {/* Halo da cor do fundo: o chão de pontos não atrapalha a leitura do texto */}
        <div aria-hidden="true" className="absolute -inset-x-4 -inset-y-12 sm:-inset-x-10 -z-[1] rounded-[3rem] bg-fundo/75 blur-2xl" />
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
          <a href="#contato" className="botao-contorno">
            Fale comigo <Mail size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
