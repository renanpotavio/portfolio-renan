import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';

export type Tema = 'escuro' | 'claro';

interface TemaValor {
  tema: Tema;
  alternarTema: () => void;
}

const TemaContext = createContext<TemaValor | null>(null);

function temaInicial(): Tema {
  return document.documentElement.classList.contains('claro') ? 'claro' : 'escuro';
}

function aplicar(tema: Tema) {
  document.documentElement.className = tema;
  try {
    localStorage.setItem('tema', tema);
  } catch {
    /* armazenamento bloqueado: o tema só não fica salvo */
  }
}

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useState<Tema>(temaInicial);

  const alternarTema = useCallback(() => {
    const proximo: Tema = tema === 'escuro' ? 'claro' : 'escuro';
    const trocar = () => {
      flushSync(() => setTema(proximo));
      aplicar(proximo);
    };
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Navegador com View Transitions: dissolve suave. Sem suporte: troca direta.
    if (!reduzir && 'startViewTransition' in document) {
      document.startViewTransition(trocar);
    } else {
      trocar();
    }
  }, [tema]);

  const valor = useMemo(() => ({ tema, alternarTema }), [tema, alternarTema]);
  return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTema(): TemaValor {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error('useTema precisa estar dentro de TemaProvider');
  return ctx;
}
