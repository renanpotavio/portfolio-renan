import { useState, type FormEvent } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { CONTATO } from '../data/conteudo';
import IconeGithub from './IconeGithub';
import IconeLinkedin from './IconeLinkedin';
import Revelar from './Revelar';

const CANAIS = [
  { icone: Mail, texto: CONTATO.email, href: `mailto:${CONTATO.email}` },
  { icone: Phone, texto: CONTATO.telefone, href: `tel:${CONTATO.telefoneLink}` },
  { icone: IconeLinkedin, texto: CONTATO.linkedinTexto, href: CONTATO.linkedin },
  { icone: IconeGithub, texto: CONTATO.githubTexto, href: CONTATO.github },
  { icone: MapPin, texto: CONTATO.cidade, href: undefined },
];

const campo =
  'w-full rounded-xl border border-borda bg-fundo/70 px-4 py-3 text-sm text-texto placeholder:text-suave transition-[border-color] focus:border-destaque focus:outline-none';

const iconeCaixa = 'grid size-9 shrink-0 place-items-center rounded-lg bg-destaque/12 text-destaque';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  // Sem servidor: o formulário abre o app de e-mail de quem visita, já preenchido.
  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const assunto = encodeURIComponent(`Contato pelo portfólio: ${nome}`);
    const corpo = encodeURIComponent(`${mensagem}\n\n${nome}`);
    window.location.href = `mailto:${CONTATO.email}?subject=${assunto}&body=${corpo}`;
  };

  return (
    <section id="contato" data-fundo="forte" className="container-site py-20 sm:py-24">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <Revelar>
          <p className="rotulo">Vamos conversar?</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Estou aberto a novas oportunidades!</h2>
          <p className="mt-4 max-w-md text-suave">
            Se você gostou do meu perfil e quer conversar sobre uma vaga ou parceria, me chama pelo
            e-mail ou no LinkedIn.
          </p>
          <ul className="mt-8 space-y-4">
            {CANAIS.map(({ icone: Icone, texto, href }) => {
              const conteudo = (
                <>
                  <span className={iconeCaixa}>
                    <Icone size={17} />
                  </span>
                  <span className="min-w-0 break-words">{texto}</span>
                </>
              );
              const externo = href?.startsWith('http');
              return (
                <li key={texto}>
                  {href ? (
                    <a
                      href={href}
                      target={externo ? '_blank' : undefined}
                      rel={externo ? 'noreferrer' : undefined}
                      className="inline-flex max-w-full items-center gap-3 text-texto transition-colors hover:text-destaque"
                    >
                      {conteudo}
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-3 text-texto">{conteudo}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </Revelar>

        <Revelar atraso={0.08}>
          <form onSubmit={enviar} className="space-y-4 rounded-2xl border border-borda bg-cartao/85 p-5 backdrop-blur-sm sm:p-7">
            <h3 className="font-semibold">Envie uma mensagem</h3>
            <label className="block">
              <span className="sr-only">Seu nome</span>
              <input
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                autoComplete="name"
                className={campo}
              />
            </label>
            <label className="block">
              <span className="sr-only">Mensagem</span>
              <textarea
                required
                rows={5}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                placeholder="Mensagem"
                className={`${campo} resize-none`}
              />
            </label>
            <button type="submit" className="botao-principal w-full justify-center">
              Enviar pelo e-mail <Send size={15} />
            </button>
            <p className="text-center text-xs text-suave">Abre o seu app de e-mail com a mensagem pronta.</p>
          </form>
        </Revelar>
      </div>
    </section>
  );
}
