import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { DURACAO, EASE_SUAVE } from '../lib/movimento';

interface Props {
  children: ReactNode;
  atraso?: number;
  className?: string;
}

/*
 * Entra de leve quando chega na tela, uma única vez.
 * Regras de segurança para nada ficar em branco:
 * - o conteúdo nasce VISÍVEL; só é escondido o que está abaixo da tela na abertura;
 * - aparece quando chega na tela OU quando já passou dela (rolagem rápida,
 *   clique no menu que pula direto para uma seção).
 */
export default function Revelar({ children, atraso = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [escondido, setEscondido] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) setEscondido(true);
  }, []);

  useEffect(() => {
    if (!escondido) return;
    const conferir = () => {
      const el = ref.current;
      if (el && el.getBoundingClientRect().top < window.innerHeight * 0.92) setEscondido(false);
    };
    conferir();
    window.addEventListener('scroll', conferir, { passive: true });
    window.addEventListener('resize', conferir);
    return () => {
      window.removeEventListener('scroll', conferir);
      window.removeEventListener('resize', conferir);
    };
  }, [escondido]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={false}
      animate={escondido ? 'esconder' : 'mostrar'}
      variants={{
        mostrar: { opacity: 1, y: 0, transition: { duration: DURACAO, ease: EASE_SUAVE, delay: atraso } },
        esconder: { opacity: 0, y: 16, transition: { duration: 0 } },
      }}
    >
      {children}
    </motion.div>
  );
}
