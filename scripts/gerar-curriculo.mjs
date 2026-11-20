/*
 * Gera o currículo em PDF a partir de curriculo/curriculo.html, usando o Edge
 * que já vem no Windows (sem instalar nada), e grava os metadados de busca.
 * Uso: npm run curriculo
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(existsSync);
if (!EDGE) throw new Error('Microsoft Edge não encontrado');

const html = pathToFileURL(resolve('curriculo/curriculo.html')).href;
const temporario = join(mkdtempSync(join(tmpdir(), 'curriculo-')), 'bruto.pdf');
const perfil = mkdtempSync(join(tmpdir(), 'edge-'));

execFileSync(EDGE, [
  '--headless=new',
  '--disable-gpu',
  `--user-data-dir=${perfil}`,
  '--no-pdf-header-footer',
  `--print-to-pdf=${temporario}`,
  html,
], { stdio: 'ignore' });

// O Edge entrega o PDF alguns segundos depois de o comando terminar: espera o arquivo ficar pronto.
const esperar = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
let tamanho = -1;
for (let i = 0; i < 60; i += 1) {
  esperar(500);
  if (!existsSync(temporario)) continue;
  const atual = statSync(temporario).size;
  if (atual > 0 && atual === tamanho) break;
  tamanho = atual;
}
if (!existsSync(temporario)) throw new Error('O Edge não gerou o PDF');

execFileSync(process.execPath, ['scripts/metadados-pdf.mjs', temporario, 'public/curriculo-renan-pinheiro.pdf'], { stdio: 'inherit' });
