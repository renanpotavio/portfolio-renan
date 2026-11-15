/*
 * Fundo do site: o "chão" de um ambiente de VR visto em perspectiva.
 * Pontos numa grade que se aproximam conforme a página rola, e alguns
 * pontos em destaque ligados entre si (pessoas, tecnologia e produto).
 * Esta função só desenha um quadro; quem decide quando desenhar é o componente.
 */

export interface Cores {
  ponto: string;
  destaque: string;
}

const COLUNAS = 34; // de -34 a 34
const ESPACO_X = 0.42; // pontos mais juntos na largura, para parecer uma malha
const FILEIRAS = 22;
const ESPACO = 1; // distância entre pontos no "chão"
const ALTURA_CAMERA = 1.6;
const PERTO = 0.6;

// Escolha fixa (sem aleatório) dos pontos em destaque: a cena é sempre a mesma.
function ehDestaque(coluna: number, fileiraAbsoluta: number) {
  const h = Math.sin(coluna * 12.9898 + fileiraAbsoluta * 78.233) * 43758.5453;
  return h - Math.floor(h) > 0.955;
}

export function desenharGrade(
  ctx: CanvasRenderingContext2D,
  largura: number,
  altura: number,
  rolagem: number,
  cores: Cores,
) {
  ctx.clearRect(0, 0, largura, altura);

  // No celular o texto ocupa mais altura: o chão começa mais para baixo.
  const horizonte = altura * (largura < 640 ? 0.64 : 0.5);
  const foco = Math.max(largura, altura) * 0.55;
  const cx = largura / 2;

  // A rolagem anda pelo chão: 600 px de rolagem = 1 fileira.
  const avanco = rolagem / 600;
  const deslocamento = avanco % ESPACO;
  const primeiraFileira = Math.floor(avanco / ESPACO);

  const destaques: { x: number; y: number; a: number }[] = [];

  for (let f = 0; f < FILEIRAS; f += 1) {
    const z = PERTO + f * ESPACO - deslocamento;
    if (z <= 0.05) continue;
    const escala = foco / z;
    const y = horizonte + ALTURA_CAMERA * escala;
    if (y > altura + 20) continue;

    // Some perto do horizonte e perto da borda de baixo.
    const longe = 1 - f / FILEIRAS;
    const alfaBase = Math.min(1, longe * 1.4) * Math.min(1, (y - horizonte) / 40) * Math.min(1, (altura + 20 - y) / 160);
    const raio = Math.max(0.6, Math.min(2.4, escala * 0.012));

    for (let c = -COLUNAS; c <= COLUNAS; c += 1) {
      const x = cx + c * ESPACO_X * escala;
      if (x < -10 || x > largura + 10) continue;

      if (ehDestaque(c, primeiraFileira + f)) {
        destaques.push({ x, y, a: alfaBase });
        continue;
      }
      ctx.globalAlpha = alfaBase * 0.55;
      ctx.fillStyle = cores.ponto;
      ctx.beginPath();
      ctx.arc(x, y, raio, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Liga cada destaque ao vizinho mais próximo (na tela), em linhas finas.
  ctx.strokeStyle = cores.destaque;
  ctx.lineWidth = 1;
  for (let i = 0; i < destaques.length; i += 1) {
    const a = destaques[i];
    let melhor = -1;
    let menor = Infinity;
    for (let j = 0; j < destaques.length; j += 1) {
      if (j === i) continue;
      const d = (destaques[j].x - a.x) ** 2 + (destaques[j].y - a.y) ** 2;
      if (d < menor) {
        menor = d;
        melhor = j;
      }
    }
    if (melhor < 0 || menor > (largura * 0.35) ** 2) continue;
    const b = destaques[melhor];
    ctx.globalAlpha = Math.min(a.a, b.a) * 0.45;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  }

  ctx.fillStyle = cores.destaque;
  for (const d of destaques) {
    ctx.globalAlpha = d.a;
    ctx.beginPath();
    ctx.arc(d.x, d.y, 2.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}
