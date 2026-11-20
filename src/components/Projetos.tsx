import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PROJETOS, type Projeto } from '../data/conteudo';
import { EASE_SUAVE } from '../lib/movimento';
import ProjetoModal from './ProjetoModal';
import Revelar from './Revelar';

// Filtros saem dos próprios dados: nunca aparece um filtro vazio.
const FILTROS = ['Todos', ...new Set(PROJETOS.map((p) => p.categoria))];

export default function Projetos() {
  const [filtro, setFiltro] = useState('Todos');
  const [aberto, setAberto] = useState<Projeto | null>(null);
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
          {lista.map((p) => (
            <motion.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: EASE_SUAVE }}
            >
              <button
                type="button"
                onClick={() => setAberto(p)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-borda bg-cartao text-left transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-destaque/60"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={p.imagens[0].src}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-[scale] duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-titulo text-lg font-semibold">{p.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-suave">{p.resumo}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.tecnologias.map((t) => (
                      <li key={t} className="rounded-full border border-borda px-2.5 py-0.5 text-xs text-suave">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-destaque">
                    Ver projeto
                    <ArrowRight size={15} className="transition-[translate] group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjetoModal projeto={aberto} aoFechar={() => setAberto(null)} />
    </section>
  );
}
