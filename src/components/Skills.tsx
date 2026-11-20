import { Code2, Headset, Palette, Workflow } from 'lucide-react';
import { GRUPOS_SKILLS } from '../data/conteudo';
import Revelar from './Revelar';

const ICONES = { dev: Code2, design: Palette, produto: Workflow, suporte: Headset };

export default function Skills() {
  return (
    <section id="skills" data-fundo="medio" className="container-site py-20 sm:py-24">
      <Revelar className="max-w-xl">
        <p className="rotulo">Skills</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Tecnologias e ferramentas</h2>
        <p className="mt-4 text-suave">O que eu uso no dia a dia, do produto ao código.</p>
      </Revelar>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {GRUPOS_SKILLS.map((g, i) => {
          const Icone = ICONES[g.icone];
          return (
            <Revelar key={g.titulo} atraso={i * 0.05} className="rounded-2xl border border-borda bg-cartao/80 p-5 backdrop-blur-sm sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-xl bg-destaque/12 text-destaque">
                  <Icone size={19} aria-hidden="true" />
                </span>
                <h3 className="font-semibold">{g.titulo}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2">
                {g.itens.map((s) => (
                  <li key={s} className="rounded-lg border border-borda bg-fundo/60 px-3 py-1.5 text-sm text-texto">
                    {s}
                  </li>
                ))}
              </ul>
            </Revelar>
          );
        })}
      </div>
    </section>
  );
}
