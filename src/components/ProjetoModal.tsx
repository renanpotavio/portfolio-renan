import { useEffect, useState, type MouseEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import type { Projeto } from '../data/conteudo';
import { EASE_SUAVE } from '../lib/movimento';

interface Props {
  projeto: Projeto | null;
  aoFechar: () => void;
}

const transicao = { duration: 0.35, ease: EASE_SUAVE };

function Galeria({ projeto }: { projeto: Projeto }) {
  const [indice, setIndice] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const total = projeto.imagens.length;
  const imagem = projeto.imagens[indice];

  const ir = (passo: number) => {
    setZoom(null);
    setIndice((i) => (i + passo + total) % total);
  };

  // Setas do teclado trocam a imagem
  useEffect(() => {
    if (total < 2) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') ir(1);
      if (e.key === 'ArrowLeft') ir(-1);
    };
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total]);

  // Clique amplia no ponto clicado; outro clique volta ao normal.
  const alternarZoom = (e: MouseEvent<HTMLButtonElement>) => {
    if (zoom) return setZoom(null);
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-borda bg-fundo">
        <button
          type="button"
          onClick={alternarZoom}
          aria-label={zoom ? 'Reduzir imagem' : 'Ampliar imagem'}
          className={`block aspect-[16/10] w-full ${zoom ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={imagem.src}
              src={imagem.src}
              alt={imagem.alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, scale: zoom ? 1.8 : 1 }}
              exit={{ opacity: 0 }}
              transition={transicao}
              style={{ transformOrigin: zoom ? `${zoom.x}% ${zoom.y}%` : '50% 50%' }}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </AnimatePresence>
        </button>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => ir(-1)}
              aria-label="Imagem anterior"
              className="absolute top-1/2 left-3 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-borda bg-fundo/80 text-texto backdrop-blur transition-[border-color,scale] hover:border-destaque active:scale-95"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => ir(1)}
              aria-label="Próxima imagem"
              className="absolute top-1/2 right-3 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-borda bg-fundo/80 text-texto backdrop-blur transition-[border-color,scale] hover:border-destaque active:scale-95"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        <span className="absolute right-3 bottom-3 rounded-full bg-fundo/80 px-3 py-1 text-xs font-medium text-suave backdrop-blur" aria-live="polite">
          {indice + 1} / {total}
        </span>
      </div>
    </div>
  );
}

export default function ProjetoModal({ projeto, aoFechar }: Props) {
  return (
    <Dialog.Root open={projeto !== null} onOpenChange={(aberto) => !aberto && aoFechar()}>
      <AnimatePresence>
        {projeto && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transicao}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <motion.div
                className="fixed inset-x-3 top-1/2 z-50 mx-auto max-h-[calc(100svh-1.5rem)] max-w-3xl overflow-y-auto rounded-2xl border border-borda bg-cartao p-4 shadow-2xl sm:inset-x-6 sm:p-6"
                initial={{ opacity: 0, y: '-46%', scale: 0.98 }}
                animate={{ opacity: 1, y: '-50%', scale: 1 }}
                exit={{ opacity: 0, y: '-46%', scale: 0.98 }}
                transition={transicao}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="rotulo">{projeto.categoria}</p>
                    <Dialog.Title className="mt-1 font-titulo text-xl font-bold sm:text-2xl">{projeto.titulo}</Dialog.Title>
                  </div>
                  <Dialog.Close
                    aria-label="Fechar"
                    className="grid size-10 shrink-0 place-items-center rounded-full border border-borda text-suave transition-[color,border-color] hover:border-destaque hover:text-texto"
                  >
                    <X size={18} />
                  </Dialog.Close>
                </div>

                <Galeria key={projeto.id} projeto={projeto} />

                <div className="mt-5 space-y-3 text-sm leading-relaxed text-suave sm:text-base">
                  {projeto.descricao.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {projeto.tecnologias.map((t) => (
                    <li key={t} className="rounded-full border border-borda px-3 py-1 text-xs text-suave">
                      {t}
                    </li>
                  ))}
                </ul>
                {projeto.link && (
                  <a href={projeto.link} target="_blank" rel="noreferrer" className="botao-principal mt-5">
                    Abrir projeto <ExternalLink size={15} />
                  </a>
                )}
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
