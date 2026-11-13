(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
  const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } };

  const sel = new Set(load('qc_sel', []).filter(k => ING[k]));
  const favs = new Set(load('qc_favs', []).filter(id => RECIPES.some(r => r.id === id)));
  const f = { cuisine: '', dif: 0, maxT: 0, full: false };
  const DIF = ['', 'Fácil', 'Media', 'Difícil'];
  let player = null;

  const match = r => {
    const need = r.ing.filter(i => ING[i.k]);
    const missing = need.filter(i => !sel.has(i.k));
    return { need: need.length, have: need.length - missing.length, missing };
  };

  /* ---------- Selector de ingredientes ---------- */
  function renderPicker() {
    $('#selected').innerHTML = sel.size
      ? [...sel].map(k => `<button class="chip on" data-ing="${k}" title="Quitar">${ING[k][1]} ${ING[k][0]} <b>×</b></button>`).join('') +
        `<button class="link" id="clear">Vaciar</button>`
      : `<span class="muted">Aún no has añadido ingredientes. Escribe o toca los que tengas en casa.</span>`;
    const cats = {};
    Object.entries(ING).forEach(([k, v]) => (cats[v[2]] ??= []).push(k));
    $('#catalog').innerHTML = Object.entries(cats).map(([c, ks]) =>
      `<div class="cat"><h3>${c}</h3><div class="chips">${ks.map(k =>
        `<button class="chip${sel.has(k) ? ' on' : ''}" data-ing="${k}" aria-pressed="${sel.has(k)}">${ING[k][1]} ${ING[k][0]}</button>`).join('')}</div></div>`).join('');
  }
  function suggest() {
    const qv = norm($('#ing-input').value.trim()), box = $('#suggest');
    const hits = qv ? Object.keys(ING).filter(k => !sel.has(k) && norm(ING[k][0]).includes(qv)).slice(0, 6) : [];
    box.innerHTML = hits.map(k => `<button data-ing="${k}">${ING[k][1]} ${ING[k][0]}</button>`).join('') ||
      (qv ? `<span class="muted">No tengo ese ingrediente en el catálogo</span>` : '');
    box.hidden = !qv;
    return hits;
  }
  function toggleIng(k) {
    sel.has(k) ? sel.delete(k) : sel.add(k);
    save('qc_sel', [...sel]);
    $('#ing-input').value = ''; $('#suggest').hidden = true;
    renderPicker(); renderResults();
  }

  /* ---------- Tarjetas y resultados ---------- */
  function card(r) {
    const m = match(r), c = CUISINES[r.cuisine];
    let info = '';
    if (sel.size) {
      const used = r.ing.filter(i => sel.has(i.k)).map(i => ING[i.k][0].toLowerCase()).join(', ');
      info = `<p class="match uses">Usa ${m.have} de los tuyos: ${used}</p>` + (m.missing.length === 0
        ? `<p class="match ok">✓ Tienes todo lo necesario</p>`
        : `<p class="match">Falta: ${m.missing.map(i => ING[i.k][0].toLowerCase()).join(', ')}</p>`);
    }
    return `<article class="card">
      <a href="#/receta/${r.id}" class="thumb">${Art.thumb(r)}</a>
      <button class="fav${favs.has(r.id) ? ' on' : ''}" data-fav="${r.id}" aria-label="Guardar en favoritos" aria-pressed="${favs.has(r.id)}">♥</button>
      <div class="body">
        <span class="tag" style="--c:${c}">${r.cuisine}</span>
        <h3><a href="#/receta/${r.id}">${r.name}</a></h3>
        <p class="meta"><span title="Dificultad"><span class="dots d${r.dif}">${'●'.repeat(r.dif)}${'○'.repeat(3 - r.dif)}</span> ${DIF[r.dif]}</span><span title="Tiempo de preparación">⏱ ${r.time} min</span></p>
        ${info}
      </div></article>`;
  }
  function renderResults() {
    let list = RECIPES.map(r => ({ r, m: match(r) }));
    if (sel.size) list = list.filter(x => x.m.have > 0);
    const cuisines = [...new Set(list.map(x => x.r.cuisine))];
    if (f.cuisine && !cuisines.includes(f.cuisine)) f.cuisine = '';
    $('#cuisines').innerHTML = `<button class="chip${f.cuisine ? '' : ' on'}" data-cuisine="">Todas</button>` +
      cuisines.map(c => `<button class="chip${f.cuisine === c ? ' on' : ''}" data-cuisine="${c}">${c}</button>`).join('');
    list = list.filter(x => (!f.cuisine || x.r.cuisine === f.cuisine) && (!f.dif || x.r.dif === f.dif) &&
      (!f.maxT || x.r.time <= f.maxT) && (!f.full || x.m.missing.length === 0));
    // Primero las que usan más ingredientes de los seleccionados; a igualdad, las que menos piden de más
    if (sel.size) list.sort((a, b) => b.m.have - a.m.have || a.m.missing.length - b.m.missing.length || a.r.time - b.r.time);
    $('#f-full-wrap').hidden = !sel.size;
    $('#results-title').textContent = sel.size
      ? `${list.length} receta${list.length === 1 ? '' : 's'} con tus ingredientes`
      : `Todas las recetas (${list.length})`;
    $('#grid').innerHTML = list.map(x => card(x.r)).join('') ||
      `<p class="empty">Ninguna receta encaja con esos filtros. Prueba a añadir más ingredientes o a quitar algún filtro.</p>`;
  }
  function renderFavs() {
    const list = RECIPES.filter(r => favs.has(r.id));
    $('#fav-grid').innerHTML = list.map(card).join('') ||
      `<p class="empty">Todavía no has guardado ninguna receta. Toca el ♥ de cualquier plato para tenerlo aquí.</p>`;
    $('#fav-count').textContent = favs.size || '';
  }

  /* ---------- Detalle de receta ---------- */
  function renderRecipe(id) {
    const r = RECIPES.find(x => x.id === id), el = $('#view-recipe');
    if (!r) { location.hash = '#/'; return; }
    el.innerHTML = `
      <a class="back" href="#/">← Volver a las recetas</a>
      <header class="r-head">
        <div><span class="tag" style="--c:${CUISINES[r.cuisine]}">${r.cuisine}</span>
          <h1>${r.name}</h1>
          <p class="meta"><span><span class="dots d${r.dif}">${'●'.repeat(r.dif)}${'○'.repeat(3 - r.dif)}</span> ${DIF[r.dif]}</span><span>⏱ ${r.time} min</span><span>🍽 ${r.serv} ${r.serv === 1 ? 'ración' : 'raciones'}</span></p>
        </div>
        <button class="favbtn${favs.has(r.id) ? ' on' : ''}" data-fav="${r.id}" aria-pressed="${favs.has(r.id)}">♥ <span>${favs.has(r.id) ? 'Guardada' : 'Guardar'}</span></button>
      </header>
      <div class="r-layout">
        <div>
          <div id="player"></div>
          <p class="hint" id="voice-hint"></p>
          <section class="transcript"><h2>Transcripción</h2><ol id="transcript"></ol></section>
        </div>
        <aside class="ingredients"><h2>Ingredientes</h2><ul>${r.ing.map(i => {
          const d = ING[i.k] || STAPLES[i.k], st = !ING[i.k] ? 'staple' : sel.has(i.k) ? 'have' : sel.size ? 'miss' : '';
          return `<li class="${st}"><span>${d[1]} ${d[0]}</span><em>${i.q}</em></li>`;
        }).join('')}</ul>
        ${sel.size ? `<p class="legend"><span class="have">●</span> lo tienes <span class="miss">●</span> te falta</p>` : ''}</aside>
      </div>`;
    player = Player.create($('#player'), r, i => {
      document.querySelectorAll('#transcript li').forEach((li, n) => li.classList.toggle('on', n === i));
    });
    $('#transcript').innerHTML = player.timeline.map((s, i) =>
      `<li data-step="${i}"${i === 0 ? ' class="on"' : ''}><b>${s.title} · ${s.label}</b><p>${s.text}</p></li>`).join('');
    $('#voice-hint').textContent = player.hasVoice()
      ? 'La narración usa la voz en español de tu navegador. Puedes silenciarla, ocultar los subtítulos o cambiar la velocidad.'
      : 'Tu navegador no ofrece síntesis de voz: el vídeo se reproduce solo con subtítulos.';
  }

  /* ---------- Rutas ---------- */
  function route() {
    if (player) { player.destroy(); player = null; }
    const h = location.hash, m = h.match(/^#\/receta\/(.+)$/);
    const view = m ? 'recipe' : h === '#/favoritos' ? 'favs' : 'home';
    ['home', 'recipe', 'favs'].forEach(v => $('#view-' + v).hidden = v !== view);
    document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === (view === 'favs' ? '#/favoritos' : '#/')));
    if (view === 'recipe') renderRecipe(m[1]);
    else if (view === 'favs') renderFavs();
    else renderResults();
    if (view !== 'home') scrollTo(0, 0);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener('click', e => {
    const t = e.target;
    const ing = t.closest('[data-ing]'); if (ing) return toggleIng(ing.dataset.ing);
    const fav = t.closest('[data-fav]');
    if (fav) {
      const id = fav.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id);
      save('qc_favs', [...favs]);
      document.querySelectorAll(`[data-fav="${id}"]`).forEach(b => {
        b.classList.toggle('on', favs.has(id)); b.setAttribute('aria-pressed', favs.has(id));
        const s = b.querySelector('span'); if (s) s.textContent = favs.has(id) ? 'Guardada' : 'Guardar';
      });
      $('#fav-count').textContent = favs.size || '';
      if (!$('#view-favs').hidden) renderFavs();
      return;
    }
    const cu = t.closest('[data-cuisine]'); if (cu) { f.cuisine = cu.dataset.cuisine; return renderResults(); }
    if (t.id === 'clear') { sel.clear(); save('qc_sel', []); renderPicker(); return renderResults(); }
    const st = t.closest('[data-step]'); if (st && player) { player.seek(+st.dataset.step); player.play(); }
  });
  $('#ing-input').addEventListener('input', suggest);
  $('#ing-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') { const h = suggest(); if (h[0]) toggleIng(h[0]); }
    if (e.key === 'Escape') $('#suggest').hidden = true;
  });
  $('#f-dif').addEventListener('change', e => { f.dif = +e.target.value; renderResults(); });
  $('#f-time').addEventListener('change', e => { f.maxT = +e.target.value; renderResults(); });
  $('#f-full').addEventListener('change', e => { f.full = e.target.checked; renderResults(); });
  addEventListener('hashchange', route);

  renderPicker();
  $('#fav-count').textContent = favs.size || '';
  route();
})();
