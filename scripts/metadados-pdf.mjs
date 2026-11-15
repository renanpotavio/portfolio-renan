/*
 * Grava título, assunto, palavras-chave e autor num PDF, sem dependências.
 * Faz uma "atualização incremental": o PDF original fica intacto e um bloco
 * novo é acrescentado no fim (é assim que os editores de PDF salvam alterações).
 * Uso: node scripts/metadados-pdf.mjs <entrada.pdf> <saida.pdf>
 */
import { readFileSync, writeFileSync } from 'node:fs';

const [entrada, saida] = process.argv.slice(2);
if (!entrada || !saida) throw new Error('Uso: node scripts/metadados-pdf.mjs <entrada.pdf> <saida.pdf>');

const META = {
  Title: 'Renan Pinheiro | Currículo | Product & Tech',
  Subject: 'Currículo de Renan Pinheiro Otávio: Product Owner Júnior, suporte técnico N1 e desenvolvimento VR/AR em Goiânia (GO).',
  Keywords: 'Renan Pinheiro, Product Owner Júnior, Product Management, PM3, Suporte Técnico N1, Unity, C#, Blender, VR, AR, Jira, Scrum, Kanban, Goiânia',
  Author: 'Renan Pinheiro Otávio',
  Creator: 'Portfólio Renan Pinheiro',
};

const pdf = readFileSync(entrada);
const texto = pdf.toString('latin1');

const startxref = Number(/startxref\s+(\d+)\s+%%EOF\s*$/.exec(texto)?.[1]);
if (!startxref) throw new Error('startxref não encontrado');
const trailer = texto.slice(startxref);
const pegar = (re) => re.exec(trailer)?.[1];
const tamanho = Number(pegar(/\/Size\s+(\d+)/));
const raiz = pegar(/\/Root\s+(\d+\s+\d+\s+R)/);
const id = pegar(/\/ID\s*(\[[^\]]*\])/);
if (!tamanho || !raiz) throw new Error('trailer sem /Size ou /Root');

// Texto em UTF-16 (aceita acentos): <FEFF....>
const strPdf = (s) => {
  const b = Buffer.from('\ufeff' + s, 'utf16le').swap16();
  return `<${b.toString('hex').toUpperCase()}>`;
};
const agora = new Date();
const p2 = (n) => String(n).padStart(2, '0');
const dataPdf = `(D:${agora.getUTCFullYear()}${p2(agora.getUTCMonth() + 1)}${p2(agora.getUTCDate())}${p2(agora.getUTCHours())}${p2(agora.getUTCMinutes())}${p2(agora.getUTCSeconds())}Z)`;

const numInfo = tamanho; // objeto novo
const numXref = tamanho + 1;
const partes = [pdf, Buffer.from('\n', 'latin1')];
let pos = pdf.length + 1;

const info =
  `${numInfo} 0 obj\n<<\n` +
  Object.entries(META).map(([k, v]) => `/${k} ${strPdf(v)}`).join('\n') +
  `\n/ModDate ${dataPdf}\n>>\nendobj\n`;
const posInfo = pos;
partes.push(Buffer.from(info, 'latin1'));
pos += Buffer.byteLength(info, 'latin1');

// Tabela de referências em formato stream (o mesmo tipo do arquivo original)
const posXref = pos;
const linha = (offset) => Buffer.from([1, (offset >>> 24) & 255, (offset >>> 16) & 255, (offset >>> 8) & 255, offset & 255, 0, 0]);
const dados = Buffer.concat([linha(posInfo), linha(posXref)]);
const cabecalho =
  `${numXref} 0 obj\n<<\n/Type /XRef\n/Size ${numXref + 1}\n/Root ${raiz}\n/Info ${numInfo} 0 R\n` +
  (id ? `/ID ${id}\n` : '') +
  `/Prev ${startxref}\n/Index [${numInfo} 2]\n/W [1 4 2]\n/Length ${dados.length}\n>>\nstream\n`;
partes.push(Buffer.from(cabecalho, 'latin1'), dados, Buffer.from(`\nendstream\nendobj\nstartxref\n${posXref}\n%%EOF\n`, 'latin1'));

writeFileSync(saida, Buffer.concat(partes));
console.log(`PDF salvo em ${saida} com metadados.`);
