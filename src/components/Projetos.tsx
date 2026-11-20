import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Box, Check, Globe } from 'lucide-react';
import { PROJETOS } from '../data/conteudo';
import { EASE_SUAVE } from '../lib/movimento';
import Revelar from './Revelar';

// Filtros saem dos próprios dados: nunca aparece um filtro vazio.
const FILTROS = ['Todos', ...new Set(PROJETOS.map((p) => p.categoria))];
const ICONE_CATEGORIA = { 'VR/AR': Box, Web: Globe };

export default function Projetos() {
  const [filtro, setFiltro] = useState('Todos');
  const lista = filtro === 'Todos' ? PROJETOS : PROJETOS.filter((p) => p.categoria === filtro);

  return (
    <section id="projetos" data-fundo="medio" className="container-site py-20 sm:py-24">
      <Revelar className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <p className="rotulo">Projetos</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Da ideia à entrega</h2>
          <p className="mt-4 text-suave">
            Projetos dos quais participei, mostrando como aplico tecnologia e visão de produto para
            resolver problemas reais.
          </p>
        </div>
        <div role="group" aria-label="Filtrar projetos" className="flex flex-wrap gap-2">
          {FILTROS.map((f) => {
            const ativo = f === filtro;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={ativo}
                onClick={() => setFiltro(f)}
                className={`relative isolate rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  ativo ? 'text-sobre-destaque' : 'border border-borda text-suave hover:text-texto'
                }`}
              >
                {ativo && (
                  <motion.span
                    layoutId="filtro-ativo"
                    className="absolute inset-0 -z-[1] rounded-full bg-destaque"
                    transition={{ duration: 0.35, ease: EASE_SUAVE }}
                  />
                )}
                {f}
              </button>
            );
          })}
        </div>
      </Revelar>

      <motion.ul layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {lista.map((p) => {
            const Icone = ICONE_CATEGORIA[p.categoria];
            return (
              <motion.li
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35, ease: EASE_SUAVE }}
                className="flex flex-col rounded-2xl border border-borda bg-cartao/85 p-6 backdrop-blur-sm transition-[border-color] duration-300 hover:border-destaque/60"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-destaque/12 text-destaque">
                    <Icone size={20} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-suave uppercase">{p.categoria}</span>
                </div>
                <h3 className="mt-5 font-titulo text-lg font-semibold">{p.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-suave">{p.resumo}</p>

                {p.contribuicoes.length > 0 && (
                  <ul className="mt-4 space-y-1.5 text-sm text-texto">
                    {p.contribuicoes.map((c) => (
                      <li key={c} className="flex gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-destaque" aria-hidden="true" />
                        {c}
                      </li>
                    ))}
                  </ul>
                )}

                <ul aria-label="Tecnologias" className="mt-auto flex flex-wrap gap-2 pt-5">
                  {p.tecnologias.map((t) => (
                    <li key={t} className="rounded-full border border-borda px-2.5 py-0.5 text-xs text-suave">
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}
