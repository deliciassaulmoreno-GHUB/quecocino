// Genera imágenes con la API de Gemini (Nano Banana) directamente, sin intermediarios.
// Uso:  node tools/generar-imagenes.mjs <fotos|pasos|todo> [--limit N] [--solo idReceta]
// Requiere la variable de entorno GEMINI_API_KEY (clave de https://aistudio.google.com/apikey).
// Guarda PNG en tools/out/ y no repite las que ya existen, así que se puede relanzar.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'tools', 'out');
const KEY = process.env.GEMINI_API_KEY;
const MODEL = process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image';
const args = process.argv.slice(2);
const mode = args[0];
const opt = n => { const i = args.indexOf('--' + n); return i > -1 ? args[i + 1] : null; };
const limit = +opt('limit') || Infinity, solo = opt('solo');

if (!['fotos', 'pasos', 'todo'].includes(mode)) { console.error('Uso: node tools/generar-imagenes.mjs <fotos|pasos|todo> [--limit N] [--solo id]'); process.exit(1); }
if (!KEY) { console.error('Falta la variable de entorno GEMINI_API_KEY.'); process.exit(1); }

// Carga las recetas de la propia app
const ctx = { window: {} }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'js', 'data.js'), 'utf8'), ctx);
const { RECIPES, ING, STAPLES } = ctx;
const nombre = k => (ING[k] || STAPLES[k] || [k])[0].toLowerCase();

const FOTO = 'Fotografía gastronómica profesional y realista, plato terminado centrado y completo, ángulo de 45 grados, luz natural suave, mesa de madera rústica, poca profundidad de campo. Sin texto ni marcas de agua. Plato: ';
const ANIME = 'Fotograma de un anime de cocina costumbrista: ilustración japonesa de alta calidad, cel shading limpio, luz cálida dorada, colores vivos y apetecibles, cocina doméstica, primer plano de las manos del cocinero, sin caras. Sin texto, sin números, sin bocadillos. ';

const jobs = [];
for (const r of RECIPES) {
  if (solo && r.id !== solo) continue;
  if (mode !== 'pasos') jobs.push({ file: `dish/${r.id}.png`, ratio: '4:3', prompt: `${FOTO}${r.name} (cocina ${r.cuisine.toLowerCase()}), con ${r.ing.filter(i => ING[i.k]).map(i => nombre(i.k)).join(', ')}.` });
  if (mode !== 'fotos') r.steps.forEach((s, i) => {
    if (s.a === 'emplatar') return; // el emplatado usa la foto real del plato
    jobs.push({ file: `steps/${r.id}-${i + 1}.png`, ratio: '16:9', prompt: `${ANIME}Receta: ${r.name}. Escena: ${s.text}${s.items.length ? ' Ingredientes visibles: ' + s.items.map(nombre).join(', ') + '.' : ''}` });
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function generar(job) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': KEY },
    body: JSON.stringify({ contents: [{ parts: [{ text: job.prompt }] }], generationConfig: { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: job.ratio } } })
  });
  if (res.status === 429) return 'espera';
  const json = await res.json();
  if (!res.ok) throw new Error(`${res.status}: ${json.error?.message || 'error desconocido'}`);
  const part = json.candidates?.[0]?.content?.parts?.find(p => p.inlineData);
  if (!part) throw new Error('la respuesta no trae imagen (' + (json.candidates?.[0]?.finishReason || 'sin motivo') + ')');
  const dest = path.join(OUT, job.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, Buffer.from(part.inlineData.data, 'base64'));
  return 'ok';
}

const pendientes = jobs.filter(j => !fs.existsSync(path.join(OUT, j.file))).slice(0, limit);
console.log(`Modelo ${MODEL}. ${jobs.length} imágenes en total, ${pendientes.length} por generar en esta tanda.`);
let hechas = 0, fallos = 0;
for (const job of pendientes) {
  for (let intento = 1; intento <= 4; intento++) {
    try {
      const r = await generar(job);
      if (r === 'ok') { hechas++; console.log(`✓ ${job.file}`); break; }
      console.log(`  límite de peticiones, espero ${20 * intento} s…`); await sleep(20000 * intento);
    } catch (e) {
      console.error(`✗ ${job.file}: ${e.message}`); fallos++;
      if (/API key|permission|billing|quota|not found/i.test(e.message)) { console.error('Error de cuenta o de modelo: paro aquí.'); process.exit(2); }
      break;
    }
  }
}
console.log(`Hecho: ${hechas} generadas, ${fallos} con error.`);
