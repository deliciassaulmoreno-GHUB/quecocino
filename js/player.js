// Ilustraciones de platos + reproductor animado paso a paso (voz, subtítulos, progreso)
(() => {
  const emo = k => (ING[k] || STAPLES[k] || [0, k])[1];
  const T = (x, y, size, ch, cls = '', delay = 0) =>
    `<text x="${x}" y="${y}" font-size="${size}" text-anchor="middle" class="${cls}" style="animation-delay:${delay}s">${ch}</text>`;

  /* ---------- Plato terminado (vista cenital, lienzo 200x150) ---------- */
  const SPOTS = [[100, 88], [74, 76], [126, 76], [84, 104], [116, 104], [100, 64]];
  function dishInner(r) {
    const { v, col, top } = r.art;
    let base;
    if (v === 'bowl') base = `<circle cx="100" cy="78" r="62" fill="#3d5a80"/><circle cx="100" cy="78" r="55" fill="#5578a3"/><circle cx="100" cy="78" r="49" fill="${col}"/>`;
    else if (v === 'pan') base = `<rect x="150" y="72" width="50" height="12" rx="6" fill="#222"/><circle cx="100" cy="78" r="62" fill="#2b2b2b"/><circle cx="100" cy="78" r="53" fill="${col}"/>`;
    else base = `<circle cx="100" cy="78" r="64" fill="#fff" stroke="#e3dccf" stroke-width="3"/><circle cx="100" cy="78" r="48" fill="#f4efe6"/><ellipse cx="100" cy="78" rx="42" ry="38" fill="${col}"/>`;
    const tops = top.map((e, i) => T(SPOTS[i % 6][0], SPOTS[i % 6][1], top.length > 3 ? 24 : 28, e)).join('');
    return base + tops;
  }
  function thumb(r) {
    const c = CUISINES[r.cuisine] || '#999';
    return `<svg viewBox="0 0 200 150" role="img" aria-label="${r.name}"><rect width="200" height="150" fill="#fff7ea"/><rect width="200" height="150" fill="${c}" opacity=".2"/><circle cx="100" cy="82" r="66" fill="#000" opacity=".08"/>${dishInner(r)}</svg>`;
  }

  /* ---------- Escenas ---------- */
  const BG = `<rect width="640" height="360" fill="#fff1dc"/><rect width="640" height="130" fill="#ffe6c4"/><rect y="270" width="640" height="90" fill="#c98b5a"/><rect y="270" width="640" height="8" fill="#a86f43"/>`;
  const STOVE = `<rect x="190" y="262" width="260" height="14" rx="4" fill="#3a3a3a"/>` +
    [240, 290, 340, 390].map((x, i) => T(x, 264, 30, '🔥', 'a-flame', i * .15)).join('');
  const steam = (cx, y) => [-40, 0, 40].map((dx, i) =>
    `<path d="M${cx + dx} ${y} q-12 -18 0 -34 q12 -16 0 -34" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" class="a-steam" style="animation-delay:${i * .5}s"/>`).join('');
  const row = (items, cx, y, size, cls, gap) => items.map((e, i) =>
    T(cx + (i - (items.length - 1) / 2) * gap, y, size, e, cls, i * .3)).join('');

  const SCENES = {
    intro: (it, r) => `<rect width="640" height="360" fill="#fff1dc"/><circle cx="320" cy="150" r="210" fill="${CUISINES[r.cuisine]}" opacity=".15"/>` +
      it.map((e, i) => { const n = it.length, per = Math.min(n, 5), rowi = Math.floor(i / per), inRow = Math.min(per, n - rowi * per);
        return T(320 + ((i % per) - (inRow - 1) / 2) * 96, 150 + rowi * 96, 64, e, 'a-pop', i * .25); }).join('') +
      `<text x="320" y="62" font-size="30" font-weight="700" text-anchor="middle" fill="#5a3a1a">${r.name}</text>`,
    cortar: it => BG + `<rect x="130" y="238" width="380" height="46" rx="12" fill="#e0a96d" stroke="#b47a3f" stroke-width="4"/>` +
      row(it.slice(0, 4), 290, 236, 66, 'a-bob', 82) + T(500, 200, 96, '🔪', 'a-chop'),
    mezclar: (it, r) => BG + row(it.slice(0, 4), 320, 150, 54, 'a-drop', 62) +
      `<path d="M180 180 Q200 300 320 300 Q440 300 460 180 Z" fill="#6aa5cc"/><ellipse cx="320" cy="180" rx="140" ry="24" fill="#4f8db8"/><ellipse cx="320" cy="183" rx="122" ry="16" fill="${r.art.col}"/>` +
      T(330, 175, 96, '🥄', 'a-stir'),
    hervir: it => BG + STOVE + steam(320, 130) +
      `<rect x="180" y="170" width="38" height="14" rx="7" fill="#6b7280"/><rect x="422" y="170" width="38" height="14" rx="7" fill="#6b7280"/><rect x="210" y="150" width="220" height="112" rx="14" fill="#9aa5b1"/><ellipse cx="320" cy="152" rx="110" ry="18" fill="#7b8794"/><ellipse cx="320" cy="154" rx="98" ry="13" fill="#bfe3f5"/>` +
      [260, 300, 345, 385].map((x, i) => `<circle cx="${x}" cy="156" r="${6 + i % 2 * 3}" fill="#fff" opacity=".9" class="a-bubble" style="animation-delay:${i * .35}s"/>`).join('') +
      row(it.slice(0, 3), 320, 160, 50, 'a-bob', 64),
    freir: it => BG + STOVE + steam(310, 170) +
      `<rect x="430" y="228" width="170" height="16" rx="8" fill="#1f1f1f"/><ellipse cx="310" cy="240" rx="146" ry="28" fill="#2b2b2b"/><ellipse cx="310" cy="234" rx="128" ry="19" fill="#555"/>` +
      row(it.slice(0, 4), 310, 244, 52, 'a-jiggle', 60),
    hornear: it => BG + `<rect x="160" y="60" width="320" height="218" rx="16" fill="#6c757d"/><rect x="160" y="60" width="320" height="40" rx="16" fill="#495057"/>` +
      [200, 240, 440].map(x => `<circle cx="${x}" cy="80" r="9" fill="#dee2e6"/>`).join('') +
      `<rect x="190" y="116" width="260" height="140" rx="10" fill="#ff9f1c" class="a-glow"/><rect x="190" y="226" width="260" height="5" fill="#333"/>` +
      row(it.slice(0, 3), 320, 222, 56, 'a-bob', 70) + `<rect x="240" y="104" width="160" height="8" rx="4" fill="#dee2e6"/>`,
    reposar: (it, r) => BG + `<circle cx="470" cy="130" r="66" fill="#fff" stroke="#5a3a1a" stroke-width="8"/><line x1="470" y1="130" x2="470" y2="84" stroke="#e63946" stroke-width="6" stroke-linecap="round" class="a-spin" style="transform-box:view-box;transform-origin:470px 130px"/><line x1="470" y1="130" x2="498" y2="130" stroke="#5a3a1a" stroke-width="6" stroke-linecap="round"/><circle cx="470" cy="130" r="6" fill="#5a3a1a"/>` +
      `<path d="M110 200 Q125 290 220 290 Q315 290 330 200 Z" fill="#6aa5cc"/><ellipse cx="220" cy="200" rx="110" ry="20" fill="#4f8db8"/><ellipse cx="220" cy="202" rx="96" ry="13" fill="${r.art.col}"/>` +
      row(it.slice(0, 2), 220, 206, 44, 'a-bob', 56) + T(300, 120, 44, '💤', 'a-float'),
    triturar: (it, r) => BG + row(it.slice(0, 3), 320, 70, 44, 'a-drop', 50) +
      `<g class="a-shake"><rect x="262" y="232" width="116" height="44" rx="8" fill="#343a40"/><circle cx="320" cy="254" r="9" fill="#e63946"/><path d="M250 76 L390 76 L368 232 L272 232 Z" fill="#e3f4ff" stroke="#8fb3cc" stroke-width="5"/><path d="M261 150 L379 150 L368 232 L272 232 Z" fill="${r.art.col}" class="a-glow"/>` +
      [290, 320, 350].map((x, i) => `<circle cx="${x}" cy="215" r="7" fill="#fff" opacity=".8" class="a-bubble" style="animation-delay:${i * .3}s"/>`).join('') + `</g>`,
    emplatar: (it, r) => `<rect width="640" height="360" fill="#f3d9b1"/><rect width="640" height="360" fill="${CUISINES[r.cuisine]}" opacity=".18"/>` +
      `<g class="a-pop"><g transform="translate(120,12) scale(2.05)">${dishInner(r)}</g></g>` + steam(320, 90) +
      T(110, 90, 48, '✨', 'a-flame') + T(540, 110, 40, '✨', 'a-flame', .4) + T(520, 300, 46, '✨', 'a-flame', .8) + T(100, 290, 60, '🍴')
  };
  const LABEL = { intro: 'Ingredientes', cortar: 'Cortar', mezclar: 'Mezclar', hervir: 'Cocer', freir: 'Sartén', hornear: 'Horno', reposar: 'Reposar', triturar: 'Triturar', emplatar: 'Emplatar' };

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
        <svg class="scene" viewBox="0 0 640 360" aria-hidden="true"></svg>
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
      scene.innerHTML = SCENES[s.a](s.items.map(emo), r);
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
