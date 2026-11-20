import { Download, GraduationCap, MessagesSquare, Target, Users } from 'lucide-react';
import Revelar from './Revelar';
import { CURRICULO } from '../data/links';

const PILARES = [
  { icone: MessagesSquare, titulo: 'Comunicação', texto: 'Facilidade para alinhar pessoas e ideias.' },
  { icone: Target, titulo: 'Visão de Produto', texto: 'Foco no usuário e no valor do negócio.' },
  { icone: GraduationCap, titulo: 'Aprendizado Contínuo', texto: 'Sempre em busca de novos conhecimentos.' },
  { icone: Users, titulo: 'Trabalho em Equipe', texto: 'Acredito em colaboração para grandes resultados.' },
];

export default function Sobre() {
  return (
    <section id="sobre" data-fundo="fraco" className="container-site py-20 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <Revelar>
          <p className="rotulo">Sobre mim</p>
          <h2 className="mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Mais do que tecnologia, meu foco é em pessoas.
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-suave">
            <p>
              Sou estudante de Análise e Desenvolvimento de Sistemas e estou me especializando em
              Gestão de Produtos pela PM3. Tenho experiência em suporte técnico, desenvolvimento de
              aplicações e projetos em VR/AR, o que me deu uma visão completa de como a tecnologia
              pode resolver problemas reais.
            </p>
            <p>
              Hoje, meu objetivo é atuar como <strong className="font-semibold text-texto">Product Owner Júnior</strong>,
              unindo minha bagagem técnica, facilidade de comunicação e olhar analítico para
              transformar necessidades dos usuários em soluções que gerem valor para o produto e
              para o negócio.
            </p>
          </div>
          <a href={CURRICULO} download className="botao-contorno mt-8">
            Baixar currículo <Download size={16} />
          </a>
        </Revelar>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {PILARES.map(({ icone: Icone, titulo, texto }, i) => (
            <li key={titulo}>
              <Revelar atraso={i * 0.06} className="flex h-full gap-4 rounded-2xl border border-borda bg-cartao/80 p-5 backdrop-blur-sm">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-destaque/12 text-destaque">
                  <Icone size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-semibold">{titulo}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-suave">{texto}</p>
                </div>
              </Revelar>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
