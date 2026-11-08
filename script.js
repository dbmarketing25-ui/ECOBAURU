/* =========================================================
   Eco Bauru — interações
   ========================================================= */

/* ---------- Dados: guia de materiais ---------- */
const MATERIALS = [
  {
    id: 'papel', name: 'Papel', bin: 'Lixeira azul', c: '#3b82f6',
    yes: ['Jornais e revistas', 'Caixas de papelão', 'Folhas de caderno', 'Envelopes', 'Embalagem longa vida', 'Rolos de papel higiênico', 'Sacos de papel'],
    no: ['Papel higiênico usado', 'Guardanapo sujo', 'Papel carbono', 'Fotografias', 'Papel metalizado', 'Etiquetas adesivas'],
    tip: 'Caixa de pizza só vai no azul se estiver <b>limpa</b>. A parte engordurada vai no lixo comum.'
  },
  {
    id: 'plastico', name: 'Plástico', bin: 'Lixeira vermelha', c: '#ef4444',
    yes: ['Garrafas PET', 'Potes e tampas', 'Embalagens de limpeza', 'Sacolas plásticas', 'Canos e tubos', 'Tampinhas', 'Isopor limpo'],
    no: ['Cabos de panela', 'Tomadas', 'Embalagem de salgadinho metalizada', 'Esponjas', 'Fraldas', 'Adesivos'],
    tip: 'Deixe a tampinha <b>separada</b> da garrafa — elas são feitas de plásticos diferentes.'
  },
  {
    id: 'vidro', name: 'Vidro', bin: 'Lixeira verde', c: '#22c55e',
    yes: ['Garrafas', 'Potes de conserva', 'Frascos de perfume', 'Copos quebrados', 'Cacos de vidro'],
    no: ['Espelhos', 'Lâmpadas', 'Vidro temperado', 'Cerâmica e porcelana', 'Tubos de TV', 'Óculos'],
    tip: 'Embrulhe cacos em jornal ou caixa e escreva <b>“VIDRO”</b> — protege quem faz a coleta.'
  },
  {
    id: 'metal', name: 'Metal', bin: 'Lixeira amarela', c: '#facc15',
    yes: ['Latas de alumínio', 'Latas de conserva', 'Tampas de metal', 'Panelas sem cabo', 'Arames e pregos', 'Papel alumínio limpo'],
    no: ['Clipes e grampos', 'Esponja de aço', 'Latas de tinta', 'Latas de aerossol cheias', 'Pilhas'],
    tip: 'Amasse as latas de alumínio: ocupam menos espaço e são as mais valorizadas pelas cooperativas.'
  },
  {
    id: 'organico', name: 'Orgânico', bin: 'Lixeira marrom', c: '#a16207',
    yes: ['Cascas de frutas e legumes', 'Restos de comida', 'Borra de café e chá', 'Cascas de ovo', 'Folhas e podas pequenas'],
    no: ['Óleo de cozinha', 'Fezes de animais', 'Carnes em grande volume (para compostagem doméstica)', 'Plásticos “biodegradáveis”'],
    tip: 'Tem quintal ou varanda? Uma <b>composteira</b> transforma esses restos em adubo em poucas semanas.'
  },
  {
    id: 'rejeito', name: 'Não reciclável', bin: 'Lixeira cinza', c: '#9ca3af',
    yes: ['Papel higiênico e absorventes', 'Fraldas', 'Bitucas de cigarro', 'Guardanapos sujos', 'Esponjas', 'Adesivos e fitas'],
    no: ['Pilhas e baterias', 'Eletrônicos', 'Óleo de cozinha', 'Remédios vencidos', 'Lâmpadas'],
    tip: 'Os itens da coluna “não” têm <b>descarte especial</b> — veja na seção abaixo e no mapa.'
  }
];

/* ---------- Dados: busca “Onde eu descarto…” ---------- */
const LOOKUP = [
  { k: ['pilha', 'pilhas', 'bateria', 'baterias'], c: '#f97316', t: 'Coletor de pilhas e baterias', d: 'Nunca no lixo comum. Guarde num pote seco e leve a um ponto de pilhas.', f: 'pilhas' },
  { k: ['oleo', 'óleo', 'oleo de cozinha', 'óleo de cozinha', 'gordura', 'fritura'], c: '#eab308', t: 'Ponto de coleta de óleo', d: 'Espere esfriar, coe e guarde numa garrafa PET fechada.', f: 'oleo' },
  { k: ['celular', 'smartphone', 'carregador', 'cabo', 'fone', 'computador', 'notebook', 'tablet', 'tv', 'televisao', 'televisão', 'eletronico', 'eletrônico', 'eletronicos', 'impressora', 'mouse', 'teclado'], c: '#38bdf8', t: 'Ponto de eletrônicos', d: 'Apague seus dados, tire o chip e leve a um ponto de eletrônicos.', f: 'eletronicos' },
  { k: ['lampada', 'lâmpada', 'lampadas', 'lâmpadas'], c: '#f97316', t: 'Descarte especial (logística reversa)', d: 'Lâmpadas fluorescentes têm mercúrio. Leve inteira, embalada, a um ponto de pilhas/lâmpadas.', f: 'pilhas' },
  { k: ['remedio', 'remédio', 'remedios', 'remédios', 'medicamento', 'seringa', 'agulha'], c: '#f97316', t: 'Farmácias e UBS', d: 'Medicamentos vencidos voltam para farmácias com coletor ou para a unidade de saúde.' },
  { k: ['caixa de pizza', 'pizza'], c: '#3b82f6', t: 'Azul (se limpa) + cinza (parte engordurada)', d: 'Rasgue a parte suja de gordura e jogue no lixo comum; o resto vai no papel.' },
  { k: ['isopor'], c: '#ef4444', t: 'Lixeira vermelha (plástico)', d: 'Isopor é plástico reciclável. Precisa estar limpo e seco.' },
  { k: ['espelho', 'espelhos'], c: '#9ca3af', t: 'Lixo comum, bem embalado', d: 'Espelho não é reciclado com vidro comum. Embrulhe e identifique “cortante”.' },
  { k: ['garrafa pet', 'pet', 'garrafa plastica', 'garrafa plástica', 'pote plastico', 'pote plástico', 'sacola', 'tampinha', 'plastico', 'plástico'], c: '#ef4444', t: 'Lixeira vermelha (plástico)', d: 'Enxágue, seque e amasse. Tampinha separada.' },
  { k: ['garrafa de vidro', 'pote de vidro', 'vidro', 'frasco', 'copo quebrado', 'caco'], c: '#22c55e', t: 'Lixeira verde (vidro)', d: 'Cacos embrulhados em jornal com aviso “VIDRO”.' },
  { k: ['lata', 'latinha', 'aluminio', 'alumínio', 'metal', 'tampa de metal', 'panela'], c: '#facc15', t: 'Lixeira amarela (metal)', d: 'Amasse as latas para ocupar menos espaço.' },
  { k: ['papel', 'papelao', 'papelão', 'jornal', 'revista', 'caderno', 'caixa', 'longa vida', 'caixa de leite', 'tetra pak'], c: '#3b82f6', t: 'Lixeira azul (papel)', d: 'Limpo, seco e, se possível, desmontado.' },
  { k: ['casca', 'resto de comida', 'comida', 'borra de cafe', 'borra de café', 'casca de ovo', 'folhas', 'fruta'], c: '#a16207', t: 'Orgânico (lixeira marrom)', d: 'Ou, melhor ainda, na composteira de casa.' },
  { k: ['papel higienico', 'papel higiênico', 'fralda', 'absorvente', 'bituca', 'cigarro', 'guardanapo', 'esponja'], c: '#9ca3af', t: 'Lixo comum (rejeito)', d: 'Esses itens não são recicláveis. Vão para o saco de rejeitos.' },
  { k: ['sofa', 'sofá', 'colchao', 'colchão', 'movel', 'móvel', 'moveis', 'móveis', 'entulho', 'madeira', 'poda', 'galho'], c: '#84cc16', t: 'Ecoponto', d: 'Volumosos, entulho em pequena quantidade e podas vão para um ecoponto.', f: 'ecoponto' },
  { k: ['tinta', 'lata de tinta', 'solvente', 'veneno', 'inseticida', 'aerossol'], c: '#f97316', t: 'Resíduo perigoso', d: 'Não jogue na pia nem no lixo comum. Procure o ecoponto ou o fabricante.', f: 'ecoponto' },
  { k: ['roupa', 'roupas', 'sapato', 'tecido'], c: '#a78bfa', t: 'Doação ou ecoponto', d: 'Em bom estado? Doe. Rasgados podem ir para pontos que recebem tecido.' }
];

const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();

function answer(q) {
  const out = document.getElementById('askOut');
  const nq = norm(q);
  if (!nq) { out.innerHTML = ''; return; }
  // match mais específico primeiro (chave mais longa)
  let best = null, bestLen = 0;
  for (const item of LOOKUP) for (const k of item.k) {
    const nk = norm(k);
    if ((nq.includes(nk) || nk.includes(nq) && nq.length >= 3) && nk.length > bestLen) { best = item; bestLen = nk.length; }
  }
  if (!best) {
    out.style.setProperty('--c', '#6f7a68');
    out.innerHTML = `<span class="dot"></span><strong>Ainda não temos “${escapeHtml(q)}” no guia.</strong><p>Tente outro nome ou consulte o <a href="#guia">guia completo</a>.</p>`;
    return;
  }
  out.style.setProperty('--c', best.c);
  const link = best.f ? ` <a href="#mapa" data-filter="${best.f}">Ver no mapa →</a>` : '';
  out.innerHTML = `<span class="dot"></span><strong>${best.t}</strong><p>${best.d}${link}</p>`;
}
function escapeHtml(s) { return s.replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch])); }

const askForm = document.getElementById('ask');
const askInput = document.getElementById('askInput');
askForm.addEventListener('submit', e => { e.preventDefault(); answer(askInput.value); });
let askTimer;
askInput.addEventListener('input', () => { clearTimeout(askTimer); askTimer = setTimeout(() => answer(askInput.value), 260); });
document.querySelectorAll('.ask-chips button').forEach(b => b.addEventListener('click', () => { askInput.value = b.dataset.q; answer(b.dataset.q); }));

/* ---------- Guia ---------- */
const tabsEl = document.querySelector('.guide-tabs');
const panel = document.getElementById('guidePanel');
MATERIALS.forEach((m, i) => {
  const b = document.createElement('button');
  b.className = 'gtab'; b.role = 'tab'; b.id = 'tab-' + m.id;
  b.setAttribute('aria-selected', i === 0); b.setAttribute('aria-controls', 'guidePanel');
  b.style.setProperty('--c', m.c);
  b.innerHTML = `<span class="bin"></span><span><span class="t">${m.name}</span><br><span class="s">${m.bin}</span></span>`;
  b.addEventListener('click', () => selectMaterial(i));
  tabsEl.appendChild(b);
});
tabsEl.addEventListener('keydown', e => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
  e.preventDefault();
  const tabs = [...tabsEl.children];
  const cur = tabs.findIndex(t => t.getAttribute('aria-selected') === 'true');
  const next = (cur + (e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
  selectMaterial(next); tabs[next].focus();
});
function selectMaterial(i) {
  const m = MATERIALS[i];
  [...tabsEl.children].forEach((t, j) => t.setAttribute('aria-selected', j === i));
  panel.setAttribute('aria-labelledby', 'tab-' + m.id);
  panel.style.setProperty('--c', m.c);
  panel.innerHTML = `
    <div class="anim">
      <div class="gp-head"><h3>${m.name}</h3><span class="chip">${m.bin}</span></div>
      <div class="gp-cols">
        <div class="gp-yes"><h4><span class="mk">✓</span>Pode</h4><ul>${m.yes.map(x => `<li>${x}</li>`).join('')}</ul></div>
        <div class="gp-no"><h4><span class="mk">✕</span>Não pode</h4><ul>${m.no.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </div>
      <p class="gp-tip"><b>Dica Eco Bauru →</b> ${m.tip}</p>
    </div>`;
}
selectMaterial(0);

/* ---------- Mapa ---------- */
const TYPES = {
  ecoponto:    { label: 'Ecoponto',     c: '#84cc16' },
  reciclaveis: { label: 'Recicláveis',  c: '#3b82f6' },
  eletronicos: { label: 'Eletrônicos',  c: '#38bdf8' },
  pilhas:      { label: 'Pilhas',       c: '#f97316' },
  oleo:        { label: 'Óleo',         c: '#eab308' },
  cooperativa: { label: 'Cooperativa',  c: '#c084fc' }
};
// PONTOS FICTÍCIOS — apenas para demonstração
const POINTS = [
  { n: 'Ecoponto Vila Falcão',          t: 'ecoponto',    ll: [-22.3005, -49.0815], a: 'Rua Fictícia das Acácias, 120 — Vila Falcão',     h: 'Seg a sáb, 7h às 17h', acc: ['Entulho', 'Volumosos', 'Podas', 'Recicláveis'] },
  { n: 'Ecoponto Jardim Redentor',      t: 'ecoponto',    ll: [-22.3470, -49.0665], a: 'Av. Exemplo Verde, 2-40 — Jd. Redentor',           h: 'Seg a sáb, 7h às 17h', acc: ['Entulho', 'Móveis', 'Madeira', 'Pneus'] },
  { n: 'Ecoponto Mary Dota',            t: 'ecoponto',    ll: [-22.2935, -49.0430], a: 'Rua Modelo, 5-55 — Núcleo Mary Dota',              h: 'Ter a dom, 8h às 16h', acc: ['Entulho', 'Volumosos', 'Recicláveis'] },
  { n: 'PEV Praça Central',             t: 'reciclaveis', ll: [-22.3235, -49.0720], a: 'Praça Ilustrativa, s/n — Centro',                  h: 'Todos os dias, 24h',   acc: ['Papel', 'Plástico', 'Vidro', 'Metal'] },
  { n: 'PEV Parque Vitória Régia',      t: 'reciclaveis', ll: [-22.3330, -49.0560], a: 'Av. das Lagoas Fictícias, 1-10 — Jd. Estoril',     h: 'Todos os dias, 6h às 22h', acc: ['Papel', 'Plástico', 'Metal'] },
  { n: 'PEV Bela Vista',                t: 'reciclaveis', ll: [-22.3120, -49.0550], a: 'Rua Demonstração, 9-90 — Bela Vista',              h: 'Todos os dias, 24h',   acc: ['Papel', 'Plástico', 'Vidro', 'Metal'] },
  { n: 'Coleta Tech Universitária',     t: 'eletronicos', ll: [-22.3480, -49.0330], a: 'Campus Fictício, bloco B — Vila Universitária',    h: 'Seg a sex, 8h às 18h', acc: ['Celulares', 'Computadores', 'Cabos', 'Pilhas'] },
  { n: 'Shopping Eco Drop',             t: 'eletronicos', ll: [-22.3365, -49.0880], a: 'Av. Exemplar, 3-33 — Jd. Infante',                 h: 'Todos os dias, 10h às 22h', acc: ['Celulares', 'Pequenos eletros', 'Lâmpadas'] },
  { n: 'Mercado Bom Bairro',            t: 'pilhas',      ll: [-22.3160, -49.0950], a: 'Rua Hipotética, 4-12 — Vila Industrial',           h: 'Todos os dias, 7h às 22h', acc: ['Pilhas', 'Baterias', 'Lâmpadas'] },
  { n: 'Farmácia Saúde Viva',           t: 'pilhas',      ll: [-22.3310, -49.0220], a: 'Av. Fictícia Geisel, 7-70 — Núcleo Geisel',        h: 'Seg a sáb, 8h às 21h', acc: ['Pilhas', 'Baterias', 'Remédios vencidos'] },
  { n: 'Óleo Solidário Nova Esperança', t: 'oleo',        ll: [-22.2890, -49.0710], a: 'Rua Simulada, 1-01 — Nova Esperança',              h: 'Sáb, 8h às 12h',       acc: ['Óleo de cozinha'] },
  { n: 'Escola Amiga do Óleo',          t: 'oleo',        ll: [-22.3400, -49.0475], a: 'Rua das Escolas Fictícias, 2-20 — Jd. Estoril',    h: 'Seg a sex, 7h às 17h', acc: ['Óleo de cozinha', 'Tampinhas'] },
  { n: 'Cooperativa Recicla Bauru',     t: 'cooperativa', ll: [-22.3590, -49.0890], a: 'Estrada Ilustrativa, km 2 — Pq. Jaraguá',          h: 'Seg a sex, 7h às 16h', acc: ['Papel', 'Plástico', 'Metal', 'Vidro', 'Óleo'] },
  { n: 'Cooperativa Mãos Verdes',       t: 'cooperativa', ll: [-22.3040, -49.0400], a: 'Rua Exemplo do Norte, 6-06 — Pq. Santa Cândida',   h: 'Seg a sáb, 7h às 15h', acc: ['Papel', 'Plástico', 'Metal'] }
];

let map, markers = [], activeFilter = 'todos', userLL = null;
const plist = document.getElementById('plist');
const filtersEl = document.getElementById('filters');

function initMap() {
  if (typeof L === 'undefined') { document.getElementById('map').innerHTML = '<p style="padding:24px;color:#a3ad9b">Não foi possível carregar o mapa.</p>'; return; }
  map = L.map('map', { zoomControl: true, scrollWheelZoom: false, attributionControl: true }).setView([-22.326, -49.069], 13);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    maxZoom: 19, className: 'eco-tiles'
  }).addTo(map);
  map.on('focus', () => map.scrollWheelZoom.enable());
  map.on('blur', () => map.scrollWheelZoom.disable());

  POINTS.forEach((p, i) => {
    const ty = TYPES[p.t];
    const icon = L.divIcon({ className: '', html: `<div class="mk-pin" style="--c:${ty.c}"></div>`, iconSize: [22, 22], iconAnchor: [11, 11], popupAnchor: [0, -12] });
    const m = L.marker(p.ll, { icon, title: p.n }).bindPopup(`
      <div style="--c:${ty.c}">
        <div class="pop-type">${ty.label}</div>
        <div class="pop-name">${p.n}</div>
        <div class="pop-addr">${p.a}</div>
        <div class="pop-hours">${p.h}</div>
        <div class="pop-accepts">${p.acc.map(x => `<span>${x}</span>`).join('')}</div>
      </div>`);
    m.on('popupopen', () => highlight(i, true));
    m.on('popupclose', () => highlight(i, false));
    m.data = p; m.idx = i;
    markers.push(m);
  });

  // filtros
  const all = { todos: { label: 'Todos', c: '#eef2e6' }, ...TYPES };
  Object.entries(all).forEach(([k, v]) => {
    const b = document.createElement('button');
    b.type = 'button'; b.dataset.k = k; b.style.setProperty('--c', v.c);
    b.setAttribute('aria-pressed', k === 'todos');
    b.innerHTML = (k === 'todos' ? '' : '<i></i>') + v.label;
    b.addEventListener('click', () => setFilter(k));
    filtersEl.appendChild(b);
  });
  setFilter('todos', false);
  // o mapa pode ser inicializado com tamanho errado (seção ainda fora da tela)
  new IntersectionObserver(([e], obs) => { if (e.isIntersecting) { map.invalidateSize(); setFilter(activeFilter, false); obs.disconnect(); } }).observe(document.getElementById('map'));
}

function setFilter(k, animate = true) {
  activeFilter = k;
  [...filtersEl.children].forEach(b => b.setAttribute('aria-pressed', b.dataset.k === k));
  const vis = markers.filter(m => k === 'todos' || m.data.t === k);
  markers.forEach(m => vis.includes(m) ? m.addTo(map) : m.remove());
  renderList(vis);
  if (!vis.length) return;
  const b = L.latLngBounds(vis.map(m => m.getLatLng())).pad(0.2);
  animate ? map.flyToBounds(b, { duration: .8, maxZoom: 15 }) : map.fitBounds(b, { animate: false, maxZoom: 15 });
}

function renderList(vis) {
  let items = vis.map(m => ({ m, d: userLL ? map.distance(userLL, m.getLatLng()) : null }));
  if (userLL) items.sort((a, b) => a.d - b.d);
  plist.innerHTML = items.length ? '' : '<li class="empty">Nenhum ponto para esse filtro.</li>';
  items.forEach(({ m, d }) => {
    const ty = TYPES[m.data.t];
    const li = document.createElement('li');
    const dist = d != null ? ` · ${(d / 1000).toFixed(1).replace('.', ',')} km` : '';
    li.innerHTML = `<button type="button" data-i="${m.idx}" style="--c:${ty.c}"><span class="pin"></span><span class="nm">${m.data.n}</span><span class="meta">${ty.label}${dist} · ${m.data.h}</span></button>`;
    li.firstChild.addEventListener('click', () => {
      map.flyTo(m.getLatLng(), 15, { duration: .7 });
      setTimeout(() => m.openPopup(), 700);
      if (window.innerWidth < 920) document.getElementById('map').scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    plist.appendChild(li);
  });
}

function highlight(i, on) {
  const el = markers[i].getElement()?.querySelector('.mk-pin');
  if (el) el.classList.toggle('hl', on);
  plist.querySelector(`[data-i="${i}"]`)?.classList.toggle('on', on);
}

document.getElementById('locate').addEventListener('click', e => {
  const btn = e.currentTarget;
  if (!navigator.geolocation) { btn.textContent = 'Localização indisponível'; return; }
  btn.textContent = 'Localizando…';
  navigator.geolocation.getCurrentPosition(pos => {
    userLL = L.latLng(pos.coords.latitude, pos.coords.longitude);
    L.marker(userLL, { icon: L.divIcon({ className: '', html: '<div class="mk-me"></div>', iconSize: [16, 16] }) }).addTo(map).bindPopup('Você está aqui');
    btn.textContent = '◎ Ordenado por distância';
    setFilter(activeFilter);
    map.flyTo(userLL, 14);
  }, () => { btn.textContent = 'Não foi possível localizar'; });
});

// links “ver no mapa” com filtro
document.addEventListener('click', e => {
  const a = e.target.closest('[data-filter]');
  if (a && map) setTimeout(() => setFilter(a.dataset.filter), 450);
});

initMap();

/* ---------- Desafio 7 dias ---------- */
const CHALLENGE = [
  'Separar recicláveis secos dos orgânicos',
  'Enxaguar e secar as embalagens antes de descartar',
  'Juntar pilhas usadas num pote',
  'Guardar o óleo de fritura numa garrafa PET',
  'Recusar uma sacola ou copo descartável',
  'Levar algo a um ponto de coleta do mapa',
  'Ensinar alguém a separar o lixo'
];
const KEY = 'ecobauru-desafio';
let done = [];
try { done = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { done = []; }
const chEl = document.getElementById('challenge');
CHALLENGE.forEach((txt, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<label><span class="d">Dia ${i + 1}</span><span class="tx">${txt}</span><input type="checkbox" ${done.includes(i) ? 'checked' : ''} aria-label="Dia ${i + 1}: ${txt}"></label>`;
  li.querySelector('input').addEventListener('change', ev => {
    done = ev.target.checked ? [...new Set([...done, i])] : done.filter(x => x !== i);
    try { localStorage.setItem(KEY, JSON.stringify(done)); } catch {}
    updateProgress();
  });
  chEl.appendChild(li);
});
function updateProgress() {
  const n = done.length;
  document.getElementById('bar').style.width = (n / CHALLENGE.length * 100) + '%';
  document.getElementById('progressTxt').textContent =
    n === 0 ? 'Comece hoje — um dia de cada vez.' :
    n === CHALLENGE.length ? 'Desafio completo! Bauru agradece 🌱' :
    `${n} de ${CHALLENGE.length} dias concluídos.`;
}
updateProgress();

/* ---------- Globo de partículas (hero) ---------- */
(function globe() {
  const cv = document.getElementById('globe');
  const ctx = cv.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let W, H, R, dpr;
  const N = 900, pts = [];
  // distribuição em espiral de Fibonacci
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
    pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r, s: Math.random(), hot: Math.random() < .07 });
  }
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    R = Math.min(W, H) * .36;
  }
  size(); addEventListener('resize', size);
  let a = 0, visible = true;
  new IntersectionObserver(([e]) => visible = e.isIntersecting).observe(cv);
  function frame(t) {
    if (visible) {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2, tilt = .38, ca = Math.cos(a), sa = Math.sin(a), ct = Math.cos(tilt), st = Math.sin(tilt);
      for (const p of pts) {
        let x = p.x * ca - p.z * sa, z = p.x * sa + p.z * ca, y = p.y;
        const y2 = y * ct - z * st; z = y * st + z * ct; y = y2;
        const depth = (z + 1) / 2;
        const tw = p.hot ? .6 + .4 * Math.sin(t / 400 + p.s * 10) : 1;
        const alpha = (.12 + depth * .85) * tw;
        const r = (p.hot ? 2.1 : 1.1) * (.55 + depth * .8);
        ctx.fillStyle = p.hot ? `rgba(225,255,170,${alpha})` : `rgba(155,220,95,${alpha * .8})`;
        ctx.beginPath(); ctx.arc(cx + x * R, cy + y * R, r, 0, 6.283); ctx.fill();
      }
      const g = ctx.createRadialGradient(cx, cy, R * .2, cx, cy, R * 1.25);
      g.addColorStop(0, 'rgba(160,230,90,.10)'); g.addColorStop(1, 'rgba(160,230,90,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R * 1.25, 0, 6.283); ctx.fill();
      if (!reduce) a += .0022;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

/* ---------- Player de vídeos ---------- */
const player = document.getElementById('player');
const pv = document.getElementById('playerVideo');
let lastThumb = null;
function closePlayer() { pv.pause(); pv.removeAttribute('src'); pv.load(); player.hidden = true; document.body.style.overflow = ''; lastThumb?.focus(); }
document.querySelectorAll('.vid-thumb').forEach(b => b.addEventListener('click', () => {
  lastThumb = b;
  pv.src = b.dataset.src; pv.poster = b.querySelector('img').src;
  player.hidden = false; document.body.style.overflow = 'hidden';
  pv.play().catch(() => {});
  player.querySelector('.player-close').focus();
}));
player.querySelector('.player-close').addEventListener('click', closePlayer);
player.addEventListener('click', e => { if (e.target === player) closePlayer(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !player.hidden) closePlayer(); });

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (Number(el.parentElement.querySelectorAll('.reveal').length > 1 ? [...el.parentElement.children].indexOf(el) : 0) * 70) + 'ms';
  io.observe(el);
});

/* ---------- Nav ---------- */
const nav = document.querySelector('.nav');
const toggle = document.querySelector('.nav-toggle');
const onScroll = () => nav.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-pill a').forEach(a => a.addEventListener('click', () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }));
const sections = [...document.querySelectorAll('.nav-pill a')].map(a => document.querySelector(a.getAttribute('href')));
const navIO = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) document.querySelectorAll('.nav-pill a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && navIO.observe(s));
