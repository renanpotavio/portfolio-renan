import { EXPERIENCIAS } from '../data/conteudo';
import Revelar from './Revelar';

export default function Experiencia() {
  return (
    <section id="experiencia" data-fundo="fraco" className="container-site py-20 sm:py-24">
      <Revelar>
        <p className="rotulo">Experiência</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Minha trajetória</h2>
      </Revelar>

      {/* Linha do tempo: a linha fica à esquerda, cada experiência é um ponto nela */}
      <ol className="relative mt-12 space-y-10 border-l border-borda pl-7 sm:pl-10">
        {EXPERIENCIAS.map((e, i) => (
          <li key={e.empresa} className="relative">
            <span
              aria-hidden="true"
              className="absolute top-1.5 -left-[calc(1.75rem+5px)] size-[9px] rounded-full bg-destaque ring-4 ring-fundo sm:-left-[calc(2.5rem+5px)]"
            />
            <Revelar atraso={i * 0.05}>
              <p className="text-xs font-semibold tracking-wide text-suave uppercase">{e.periodo}</p>
              <h3 className="mt-1.5 font-titulo text-lg font-semibold sm:text-xl">{e.cargo}</h3>
              <p className="text-sm font-medium text-destaque">{e.empresa}</p>
              <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-suave sm:text-base">
                {e.itens.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-[0.6em] size-1 shrink-0 rounded-full bg-suave" />
                    {item}
                  </li>
                ))}
              </ul>
            </Revelar>
          </li>
        ))}
      </ol>
    </section>
  );
}
