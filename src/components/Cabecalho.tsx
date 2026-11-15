import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useTema } from '../contexts/TemaContext';
import { SECOES } from '../data/secoes';
import { EASE_SUAVE } from '../lib/movimento';

const CURRICULO = '/curriculo-renan-pinheiro.pdf';

function BotaoTema() {
  const { tema, alternarTema } = useTema();
  const escuro = tema === 'escuro';
  return (
    <button
      type="button"
      onClick={alternarTema}
      aria-label={escuro ? 'Ativar tema claro' : 'Ativar tema escuro'}
      className="grid size-10 place-items-center rounded-full border border-borda text-suave transition-[color,border-color] hover:border-destaque hover:text-texto"
    >
      {escuro ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener('scroll', aoRolar, { passive: true });
    return () => window.removeEventListener('scroll', aoRolar);
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => e.key === 'Escape' && setAberto(false);
    window.addEventListener('keydown', aoTeclar);
    return () => window.removeEventListener('keydown', aoTeclar);
  }, [aberto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] ${
        rolou || aberto
          ? 'border-b border-borda bg-fundo/80 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a href="#inicio" className="font-titulo text-base font-bold tracking-tight">
          Renan Pinheiro
        </a>

        <nav aria-label="Seções" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm text-suave">
            {SECOES.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="transition-colors hover:text-texto">
                  {s.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={CURRICULO} download className="botao-contorno hidden !py-2 sm:inline-flex">
            Baixar currículo <Download size={15} />
          </a>
          <BotaoTema />
          <button
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-celular"
            aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
            className="grid size-10 place-items-center rounded-full border border-borda text-texto lg:hidden"
          >
            {aberto ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.nav
            id="menu-celular"
            aria-label="Seções"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE_SUAVE }}
            className="container-site pb-5 lg:hidden"
          >
            <ul className="flex flex-col">
              {SECOES.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    onClick={() => setAberto(false)}
                    className="block border-b border-borda py-3 text-base text-suave transition-colors hover:text-texto"
                  >
                    {s.rotulo}
                  </a>
                </li>
              ))}
            </ul>
            <a href={CURRICULO} download className="botao-principal mt-5 sm:hidden">
              Baixar currículo <Download size={15} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
