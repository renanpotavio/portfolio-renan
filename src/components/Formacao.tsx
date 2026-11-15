import { GraduationCap, Target } from 'lucide-react';
import { FORMACAO, OBJETIVO, TRILHAS_PM3 } from '../data/conteudo';
import Revelar from './Revelar';

export default function Formacao() {
  return (
    <section id="formacao" data-fundo="medio" className="container-site py-24 sm:py-32">
      <Revelar>
        <p className="rotulo">Formação</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Estudos e trilhas</h2>
      </Revelar>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <div className="space-y-5">
          {FORMACAO.map((f, i) => (
            <Revelar key={f.curso} atraso={i * 0.05} className="flex gap-4 rounded-2xl border border-borda bg-cartao/80 p-5 backdrop-blur-sm">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-destaque/12 text-destaque">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold">{f.curso}</h3>
                <p className="mt-1 text-sm text-suave">
                  {f.instituicao} · {f.periodo}
                </p>
              </div>
            </Revelar>
          ))}

          <Revelar atraso={0.1} className="rounded-2xl border border-destaque/40 bg-cartao/90 p-5 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-destaque">
              <Target size={18} aria-hidden="true" />
              <h3 className="text-sm font-semibold tracking-wide uppercase">Objetivo</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-texto sm:text-base">{OBJETIVO}</p>
          </Revelar>
        </div>

        <Revelar atraso={0.05} className="rounded-2xl border border-borda bg-cartao/80 p-5 backdrop-blur-sm sm:p-6">
          <h3 className="font-semibold">PM3: formações e especializações</h3>
          <p className="mt-1 text-sm text-suave">Escola de Produto, com foco em gestão de produtos digitais e IA.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {TRILHAS_PM3.map((t) => (
              <li key={t} className="rounded-full border border-borda bg-fundo/60 px-3 py-1.5 text-sm text-texto">
                {t}
              </li>
            ))}
          </ul>
        </Revelar>
      </div>
    </section>
  );
}
