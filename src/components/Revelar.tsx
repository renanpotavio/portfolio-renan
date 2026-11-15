import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { DURACAO, EASE_SUAVE } from '../lib/movimento';

interface Props {
  children: ReactNode;
  atraso?: number;
  className?: string;
}

// Entra de leve quando aparece na tela, uma única vez.
// Com "reduzir movimento", o MotionConfig do App tira o deslocamento.
export default function Revelar({ children, atraso = 0, className }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: DURACAO, ease: EASE_SUAVE, delay: atraso }}
    >
      {children}
    </motion.div>
  );
}
