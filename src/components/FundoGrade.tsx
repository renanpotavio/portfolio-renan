import { useEffect, useRef } from 'react';
import { desenharGrade, type Cores } from '../lib/gradeVR';

/*
 * Canvas fixo atrás do conteúdo.
 * - Desenha só quando algo muda (rolagem, tamanho da tela, tema): nada roda parado.
 * - Com "reduzir movimento", desenha um quadro fixo e não acompanha a rolagem.
 * - Fica apagado atrás de seções com texto longo (data-fundo="fraco").
 */

const OPACIDADE = { forte: '1', medio: '0.55', fraco: '0.18' } as const;
type Nivel = keyof typeof OPACIDADE;

function lerCores(): Cores {
  const estilo = getComputedStyle(document.documentElement);
  return {
    ponto: estilo.getPropertyValue('--color-suave').trim(),
    destaque: estilo.getPropertyValue('--color-destaque').trim(),
  };
}

export default function FundoGrade() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cores = lerCores();
    let largura = 0;
    let altura = 0;
    let pedido = 0;

    const desenhar = () => {
      pedido = 0;
      const rolagem = reduzir.matches ? 0 : window.scrollY;
      desenharGrade(ctx, largura, altura, rolagem, cores);
    };
    const agendar = () => {
      if (!pedido) pedido = requestAnimationFrame(desenhar);
    };

    const medir = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      largura = window.innerWidth;
      altura = window.innerHeight;
      canvas.width = Math.round(largura * dpr);
      canvas.height = Math.round(altura * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      agendar();
    };

    const aoRolar = () => {
      if (!reduzir.matches) agendar();
    };

    // Tema trocado: relê as cores e redesenha.
    const observadorTema = new MutationObserver(() => {
      cores = lerCores();
      agendar();
    });
    observadorTema.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Qual seção ocupa o meio da tela decide a intensidade do fundo.
    const observadorSecoes = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const nivel = ((e.target as HTMLElement).dataset.fundo ?? 'medio') as Nivel;
          canvas.style.opacity = OPACIDADE[nivel] ?? OPACIDADE.medio;
        }
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => observadorSecoes.observe(s));

    medir();
    window.addEventListener('resize', medir);
    window.addEventListener('scroll', aoRolar, { passive: true });
    reduzir.addEventListener('change', agendar);

    return () => {
      cancelAnimationFrame(pedido);
      observadorTema.disconnect();
      observadorSecoes.disconnect();
      window.removeEventListener('resize', medir);
      window.removeEventListener('scroll', aoRolar);
      reduzir.removeEventListener('change', agendar);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full transition-opacity duration-700"
    />
  );
}
