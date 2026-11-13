// Ilustraciones de platos + reproductor animado paso a paso (voz, subtítulos, progreso)
(() => {
  /* ---------- Imágenes: foto real del plato y escenas anime por tipo de paso ---------- */
  const dishSrc = r => `img/dish/${r.id}.jpg?v=5`;
  const thumb = r => `<img src="${dishSrc(r)}" alt="${r.name}" loading="lazy" width="388" height="286">`;

  const has = (s, ...ks) => ks.some(k => s.items.includes(k));
  const CUT = {
    pollo: 'carne', ternera: 'carne', bacon: 'carne', pescado: 'pescado', cebolla: 'cebolla', ajo: 'cebolla', tomate: 'tomate',
    pimiento: 'pimiento', guindilla: 'pimiento', patata: 'patata', cilantro: 'hierbas', perejil: 'hierbas', albahaca: 'hierbas',
    berenjena: 'rodajas', calabacin: 'rodajas', pepino: 'rodajas', aguacate: 'aguacate', champinones: 'setas'
  };
  // Elige la escena anime que mejor encaja con la acción y los ingredientes del paso
  function pick(s) {
    if (s.sc) return s.sc;
    const it = s.items, f = it[0];
    switch (s.a) {
      case 'cortar': return CUT[f] ? 'cortar-' + CUT[f] : 'cortar';
      case 'mezclar': return has(s, 'harina') ? 'mezclar' : has(s, 'aguacate') ? 'aplastar' : has(s, 'pasta') ? 'mezclar-pasta'
        : has(s, 'soja') ? 'salsa-soja' : has(s, 'limon') ? 'exprimir' : has(s, 'yogur') ? 'marinar'
        : has(s, 'pepino', 'aceitunas') ? 'ensalada' : has(s, 'huevo') ? 'batir-huevos' : has(s, 'queso') ? 'espolvorear' : 'mezclar';
      case 'hervir': return f === 'huevo' ? 'cocer-huevos' : f === 'brocoli' ? 'brocoli' : has(s, 'garbanzos', 'lentejas') ? 'legumbres'
        : has(s, 'pasta', 'fideos') ? 'pasta' : (has(s, 'caldo') && has(s, 'arroz')) ? 'caldo-arroz'
        : has(s, 'coco') ? 'coco' : has(s, 'arroz') ? 'arroz'
        : has(s, 'tomate', 'garbanzos', 'pollo', 'lentejas', 'caldo') ? 'guiso' : 'hervir';
      case 'freir':
        if (f === 'tortillas') return has(s, 'queso') ? 'quesadilla' : 'plancha';
        if (f === 'pan') return 'tostar-pan';
        if (f === 'harina') return 'plancha';
        if (it.join() === 'mantequilla') return 'masa';
        return has(s, 'huevo') ? 'huevos' : has(s, 'brocoli') ? 'wok-brocoli' : has(s, 'fideos') ? 'wok-fideos' : f === 'patata' ? 'freir' : has(s, 'gambas') ? 'gambas' : has(s, 'bacon') ? 'bacon'
          : has(s, 'pollo') ? 'dorar-pollo' : has(s, 'ternera') ? 'sellar-ternera' : has(s, 'pescado') ? 'sellar'
          : has(s, 'champinones') ? 'setas' : has(s, 'tomate') ? 'salsa-tomate' : has(s, 'arroz', 'fideos') ? 'wok'
          : (f === 'cebolla' || f === 'ajo') ? 'sofrito' : 'saltear';
      case 'reposar': return f === 'fideos' ? 'remojar' : f === 'arroz' ? 'reposar-paella' : f === 'tomate' ? 'nevera' : 'reposar';
      default: return s.a; // hornear, triturar
    }
  }
  const HOT = 'steam spark';
  const FX = {
    mezclar: 'lines', 'batir-huevos': 'lines', triturar: 'lines shake', wok: 'lines spark steam',
    hervir: 'steam', pasta: 'steam', arroz: 'steam', guiso: 'steam', plancha: 'steam', 'mezclar-pasta': 'steam', 'caldo-arroz': 'steam', coco: 'steam', masa: 'steam',
    saltear: HOT, huevos: HOT, freir: HOT, sellar: HOT, sofrito: HOT, 'salsa-tomate': HOT, bacon: HOT, 'dorar-pollo': HOT, 'sellar-ternera': HOT,
    gambas: HOT, setas: HOT, 'cuajar-tortilla': HOT, quesadilla: HOT,
    hornear: 'glow', exprimir: 'spark', espolvorear: 'spark', ensalada: 'spark', dish: HOT
  };
  const WOK = 'lines spark steam';
  const FX2 = {
    escurrir: 'steam', 'cocer-huevos': 'steam', brocoli: 'steam', legumbres: 'steam', caldo: 'steam', risotto: 'steam', bechamel: 'steam',
    remojar: 'steam', 'reposar-paella': 'steam', hummus: 'lines shake', 'wok-fideos': WOK, 'wok-ternera': WOK, 'wok-gambas': WOK, 'wok-brocoli': WOK,
    'marinar-pescado': 'spark', nevera: '', 'montar-fuente': '', 'formar-hamburguesa': '', reposar: '', aplastar: '', 'salsa-soja': '', marinar: ''
  };
  // Sin entrada propia, una escena se trata como cocción en caliente (vapor y destellos)
  const fxOf = key => key.startsWith('cortar') ? 'lines shake' : key in FX2 ? FX2[key] : key in FX ? FX[key] : HOT;
  function sceneHTML(s, r, n) {
    const real = s.a === 'intro' || s.a === 'emplatar';
    const key = real ? 'dish' : pick(s), fx = fxOf(key);
    const chips = real ? '' : s.items.slice(0, 4).map(k => { const d = ING[k] || STAPLES[k]; return `<li>${d[1]} ${d[0]}</li>`; }).join('');
    return `<div class="cam${fx.includes('shake') ? ' shake' : ''}"><img class="kb kb${n % 2}${real ? ' real' : ''}" src="${real ? dishSrc(r) : `img/anime/${key}.jpg`}" alt=""></div>` +
      (fx.includes('glow') ? '<div class="fx glow"></div>' : '') +
      (fx.includes('lines') ? '<div class="fx lines"></div>' : '') +
      (fx.includes('steam') ? '<div class="fx steam"><i></i><i></i><i></i></div>' : '') +
      (fx.includes('spark') ? '<div class="fx spark"><i>✦</i><i>✦</i><i>✧</i><i>✦</i><i>✧</i></div>' : '') +
      '<div class="vignette"></div><div class="flash"></div>' +
      (chips ? `<ul class="step-items">${chips}</ul>` : '') +
      (s.a === 'intro' ? `<div class="title-card"><small>Cocina ${r.cuisine.toLowerCase()} · ${r.time} min</small><strong>${r.name}</strong></div>` : '') +
      (s.a === 'emplatar' ? `<div class="title-card end"><strong>¡Buen provecho!</strong></div>` : '');
  }
  const LABEL = { intro: 'Presentación', cortar: 'Cortar', mezclar: 'Mezclar', hervir: 'Cocer', freir: 'Sartén', hornear: 'Horno', reposar: 'Reposar', triturar: 'Triturar', emplatar: 'Emplatar' };

  function chunks(text) {
    const out = [];
    (text.match(/[^.!?:]+[.!?:]+|[^.!?:]+$/g) || [text]).forEach(s => {
      s = s.trim(); if (!s) return;
      if (s.length <= 95) return out.push(s);
      const parts = s.split(/,\s+/); let cur = '';
      parts.forEach((p, i) => {
        const piece = p + (i < parts.length - 1 ? ',' : '');
        if (cur && (cur + ' ' + piece).length > 95) { out.push(cur); cur = piece; } else cur = cur ? cur + ' ' + piece : piece;
      });
      if (cur) out.push(cur);
    });
    return out;
  }

  function timeline(r) {
    const names = r.ing.map(i => (ING[i.k] || STAPLES[i.k])[0].toLowerCase());
    const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' y ' + names[names.length - 1] : names[0];
    const intro = { a: 'intro', title: 'Introducción', items: r.ing.filter(i => ING[i.k]).map(i => i.k),
      text: `Hoy preparamos ${r.name}, un plato de cocina ${r.cuisine.toLowerCase()} listo en ${r.time} minutos. Vas a necesitar: ${list}.` };
    return [intro, ...r.steps.map((s, i) => ({ ...s, title: `Paso ${i + 1}` }))]
      .map(s => ({ ...s, label: LABEL[s.a], chunks: chunks(s.text) }));
  }

  function create(root, r, onStep) {
    const synth = window.speechSynthesis || null;
    const tl = timeline(r);
    let si = 0, ci = 0, playing = false, audio = true, subs = true, rate = 1, token = 0, timer = null, utt = null, ended = false;

    root.className = 'player paused';
    root.innerHTML = `
      <div class="stage">
        <div class="scene" aria-hidden="true"></div>
        <div class="step-badge"></div>
        <div class="subs" aria-live="off"></div>
        <button class="bigplay" aria-label="Reproducir">▶</button>
      </div>
      <div class="segs">${tl.map((_, i) => `<button class="seg" data-i="${i}" aria-label="Ir a ${tl[i].title}"><i></i></button>`).join('')}</div>
      <div class="controls">
        <button data-act="prev" title="Paso anterior" aria-label="Paso anterior">⏮</button>
        <button data-act="toggle" class="main" title="Reproducir / pausar" aria-label="Reproducir o pausar">▶</button>
        <button data-act="next" title="Paso siguiente" aria-label="Paso siguiente">⏭</button>
        <span class="count"></span>
        <span class="spacer"></span>
        <button data-act="audio" title="Narración por voz" aria-pressed="true">🔊</button>
        <button data-act="subs" title="Subtítulos" aria-pressed="true" class="txt">CC</button>
        <select data-act="rate" title="Velocidad" aria-label="Velocidad">
          <option value="0.75">0.75×</option><option value="1" selected>1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option>
        </select>
      </div>`;
    const q = s => root.querySelector(s);
    const scene = q('.scene'), badge = q('.step-badge'), subsEl = q('.subs'), mainBtn = q('[data-act=toggle]'), big = q('.bigplay');
    const segs = [...root.querySelectorAll('.seg')];

    const voice = () => { const v = synth ? synth.getVoices() : []; return v.find(x => /^es[-_]ES/i.test(x.lang)) || v.find(x => /^es/i.test(x.lang)) || null; };
    if (synth) synth.getVoices();

    function stop() { token++; clearTimeout(timer); if (utt) utt.onend = utt.onerror = null; if (synth) synth.cancel(); }
    function ui() {
      root.classList.toggle('paused', !playing);
      mainBtn.textContent = ended ? '↻' : playing ? '⏸' : '▶';
      big.hidden = playing; big.textContent = ended ? '↻' : '▶';
      subsEl.hidden = !subs;
    }
    function sub() {
      const s = tl[si];
      subsEl.textContent = s.chunks[ci];
      segs.forEach((el, i) => {
        el.classList.toggle('on', i === si);
        el.firstChild.style.width = (i < si ? 100 : i > si ? 0 : (ci + 1) / s.chunks.length * 100) + '%';
      });
    }
    function show() {
      const s = tl[si];
      scene.innerHTML = sceneHTML(s, r, si);
      badge.textContent = `${s.title} · ${s.label}`;
      q('.count').textContent = `${si + 1} / ${tl.length}`;
      sub(); onStep && onStep(si);
    }
    function next() {
      if (++ci >= tl[si].chunks.length) {
        if (si >= tl.length - 1) { ci--; playing = false; ended = true; stop(); ui(); return; }
        si++; ci = 0; show();
      }
      run();
    }
    function run() {
      stop(); const my = token; sub();
      const text = tl[si].chunks[ci], est = Math.max(1800, text.length * 70) / rate;
      const wait = ms => { timer = setTimeout(() => { if (my === token) next(); }, ms); };
      if (!audio || !synth) return wait(est);
      let started = false;
      const u = utt = new SpeechSynthesisUtterance(text);
      u.lang = 'es-ES'; u.rate = rate; const v = voice(); if (v) u.voice = v;
      u.onstart = () => { started = true; };
      u.onend = () => { if (my === token) { clearTimeout(timer); timer = setTimeout(() => { if (my === token) next(); }, 250); } };
      u.onerror = () => { if (my === token) { clearTimeout(timer); wait(est); } };
      synth.speak(u);
      // Si la voz no arranca (sin voces, bloqueo del navegador) seguimos solo con subtítulos
      timer = setTimeout(() => {
        if (my !== token) return;
        if (!started) { u.onend = u.onerror = null; synth.cancel(); wait(est); }
        else timer = setTimeout(() => { if (my === token) { u.onend = u.onerror = null; synth.cancel(); next(); } }, est * 3 + 4000);
      }, 2500);
    }
    function play() { if (ended) { si = 0; ci = 0; ended = false; show(); } playing = true; ui(); run(); }
    function pause() { playing = false; stop(); ui(); }
    function seek(i) { si = Math.max(0, Math.min(tl.length - 1, i)); ci = 0; ended = false; show(); ui(); playing ? run() : stop(); }

    root.addEventListener('click', e => {
      const seg = e.target.closest('.seg'); if (seg) return seek(+seg.dataset.i);
      if (e.target.closest('.bigplay')) return play();
      const b = e.target.closest('button[data-act]');
      if (!b) { if (e.target.closest('.stage')) playing ? pause() : play(); return; }
      const a = b.dataset.act;
      if (a === 'toggle') playing ? pause() : play();
      else if (a === 'prev') seek(si - 1);
      else if (a === 'next') seek(si + 1);
      else if (a === 'audio') { audio = !audio; b.textContent = audio ? '🔊' : '🔇'; b.setAttribute('aria-pressed', audio); if (playing) run(); }
      else if (a === 'subs') { subs = !subs; b.setAttribute('aria-pressed', subs); ui(); }
    });
    q('[data-act=rate]').addEventListener('change', e => { rate = +e.target.value; if (playing) run(); });

    show(); ui();
    return { timeline: tl, seek, play, pause, destroy: stop, hasVoice: () => !!synth };
  }

  window.Art = { thumb };
  window.Player = { create };
})();
