interface Props {
  id: string;
  rotulo: string;
  titulo: string;
}

// Esqueleto de seção: some quando cada seção real for construída.
export default function SecaoProvisoria({ id, rotulo, titulo }: Props) {
  return (
    <section id={id} className="container-site py-24">
      <p className="rotulo">{rotulo}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{titulo}</h2>
      <div className="mt-8 grid min-h-48 place-items-center rounded-2xl border border-dashed border-borda bg-cartao text-sm text-suave">
        PROVISÓRIO: conteúdo em construção
      </div>
    </section>
  );
}
