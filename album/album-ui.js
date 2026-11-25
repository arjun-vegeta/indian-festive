/* Dadi's photo album, for the Festival Islands hub (index.html).
   A plain script (not a module) so it works from file://. Photos and captions come from album/album.js (window.FESTIVE_ALBUM).
   API: FestiveAlbum.open({ start, done, onGo(islandId), onClose() }), .close(), .isOpen(), and for tests
   .next() .prev() .tab(key) .ask() .advance() .go() .state(). Drawn in the paper-and-ink look of DESIGN.md. */
(function(){
'use strict';

const FEST = [
  { key: 'holi', island: 'holi-prahlad', name: 'Holi', hi: 'होली', when: 'Phalguna, the full moon of spring', tab: '#f4abc0', playable: true,
    line: 'Look at you, all pink and green! Do you know why we light a big fire the night before Holi?',
    story: ['Long ago there was a boy called Prahlad, about your age.', 'His father, the king, wanted everyone to pray only to him.',
            'But Prahlad kept saying Vishnu\'s name, even when his aunt Holika took him into a fire.', 'Do you want to be Prahlad, and see what happened?'] },
  { key: 'ganesh', island: 'ganesh-race', name: 'Ganesh Chaturthi', hi: 'गणेश चतुर्थी', when: 'Bhadrapada, the fourth day', tab: '#f7b04a', playable: true,
    line: 'You carried our little Ganpati all the way to the water. Do you know how Ganesha won a race round the whole world?',
    story: ['One day, a sage brought one special mango to Shiva and Parvati.', 'Their sons, Ganesha and Kartikeya, both wanted it.',
            'Whoever went round the whole world three times first would win it. Kartikeya flew off on his peacock.', 'Ganesha had only a little mouse. Do you want to see how he won?'] },
  { key: 'durga', island: 'durga-mahishasura', name: 'Durga Puja', hi: 'दुर्गा पूजा', when: 'Ashvin, the nine nights', tab: '#ef7157', playable: true,
    line: 'The dhak, the lights, the pandal! Do you know who Durga Maa fought?',
    story: ['A buffalo demon called Mahishasura had a boon: no man and no god could defeat him.', 'He took over heaven, and the gods did not know what to do.',
            'So they joined all their light together, and from it came Durga.', 'Do you want to be Durga, with ten arms and a lion?'] },
  { key: 'dussehra', island: 'dussehra-rama', name: 'Dussehra', hi: 'दशहरा', when: 'Ashvin, the tenth day', tab: '#f7c84a', playable: true,
    line: 'Remember the giant Ravana at the maidan? Do you know why we burn him every Dussehra?',
    story: ['Long ago, Ravana, the king of Lanka, took Sita far away across the sea.', 'Rama had to reach her, but there was no bridge.',
            'So Rama and his friends built one, stone by stone, and even a little squirrel helped.', 'Do you want to be Rama, and build the bridge?'] },
  { key: 'diwali', island: 'diwali-ayodhya', name: 'Diwali', hi: 'दीवाली', when: 'Kartika, the new moon', tab: '#e48e5d', playable: true,
    line: 'So many diyas last Diwali! Do you know who we light them for?',
    story: ['Long ago, Rama was sent away from home for fourteen years.', 'When he finally came back, it was the darkest night of the year.',
            'So all of Ayodhya lit lamps to show him the way.', 'Do you want to walk home with him?'] },
  { key: 'govardhan', island: 'govardhan', name: 'Govardhan Puja', hi: 'गोवर्धन पूजा', when: 'Kartika, the day after Diwali', tab: '#b4d98b', playable: true,
    line: 'Remember the little hill we shaped for Govardhan Puja, and the mountain of food? Do you know why?',
    story: ['In the village of Vraj, a boy called Krishna lived with the cowherds and their cows.', 'One year a terrible storm came, and it rained and rained.',
            'So Krishna lifted the whole Govardhan hill, like a giant umbrella.', 'Do you want to be Krishna, and hold up the hill?'] },
];
const BY = Object.fromEntries(FEST.map(f => [f.key, f]));
const PER = 3;   // photos per spread: two cascading down the left page, one large on the right

const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='240'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .42 0 0 0 0 .37 0 0 0 0 .3 .16 0 0 0 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
const CSS = `
.fa{position:fixed;inset:0;z-index:60;font-family:"Baloo 2",ui-rounded,system-ui,sans-serif;color:#2a2118;animation:faIn .45s ease-out;
  background:rgba(42,33,24,.10)}
.fa-stage{position:absolute;left:50%;top:54%;width:min(880px,66vw);height:min(560px,64vh);transform:translate(-44%,-50%);perspective:1500px;
  perspective-origin:50% -30%}
.fa-cast{position:absolute;inset:10% 0 -6% 6%;background:#4f5f9a;opacity:.38;border-radius:26px;transform:rotateX(26deg) rotateZ(-3deg) translate(14px,22px);
  transform-origin:50% 100%}
.fa[hidden]{display:none}
@keyframes faIn{from{opacity:0}to{opacity:1}}
.fa-book{position:absolute;inset:0;background:#cf5641;border:2px solid #2a2118;border-radius:14px;padding:12px;transform-origin:50% 100%;
  transform:rotateX(26deg) rotateZ(-3deg);transform-style:preserve-3d;animation:faUp .55s cubic-bezier(.2,.8,.25,1.1);
  box-shadow:0 9px 0 #8f3a2b,0 11px 0 #2a2118}
@keyframes faUp{from{transform:rotateX(58deg) rotateZ(-6deg) translateY(120px)}to{transform:rotateX(26deg) rotateZ(-3deg)}}
.fa-book>.k{position:absolute;width:26px;height:26px;background:#d9a32b;border:2px solid #2a2118}
.fa-book>.k.tl{top:-2px;left:-2px;border-radius:12px 0 0 0;clip-path:polygon(0 0,100% 0,0 100%)}
.fa-book>.k.tr{top:-2px;right:-2px;border-radius:0 12px 0 0;clip-path:polygon(0 0,100% 0,100% 100%)}
.fa-book>.k.bl{bottom:-2px;left:-2px;border-radius:0 0 0 12px;clip-path:polygon(0 0,0 100%,100% 100%)}
.fa-book>.k.br{bottom:-2px;right:-2px;border-radius:0 0 12px 0;clip-path:polygon(100% 0,100% 100%,0 100%)}
.fa-pages{position:relative;display:flex;height:100%;overflow:visible;transform-style:preserve-3d}
.fa-page{position:relative;flex:1;min-width:0;background:#f7f2e6;padding:22px 26px 18px;display:flex;flex-direction:column;overflow:hidden}
.fa-page::before{content:"";position:absolute;inset:0;background-image:${GRAIN};mix-blend-mode:multiply;pointer-events:none;opacity:.9}
.fa-left{border-radius:5px 0 0 5px;border:2px solid #2a2118;border-right:none;transform-origin:100% 50%;transform:rotateY(10deg);
  box-shadow:-3px 3px 0 #efe7d4,-4.5px 4.5px 0 #2a2118,-7px 7px 0 #efe7d4,-8.5px 8.5px 0 #2a2118}
.fa-right{border-radius:0 5px 5px 0;border:2px solid #2a2118;border-left:none;transform-origin:0 50%;transform:rotateY(-10deg);
  box-shadow:3px 3px 0 #efe7d4,4.5px 4.5px 0 #2a2118,7px 7px 0 #efe7d4,8.5px 8.5px 0 #2a2118}
.fa-left::after,.fa-right::after{content:"";position:absolute;top:0;bottom:0;width:38px;background:#e8ddc5;pointer-events:none}
.fa-left::after{right:0;border-left:1px solid rgba(42,33,24,.12)}.fa-right::after{left:0;border-right:1px solid rgba(42,33,24,.12)}
.fa-gutter{width:10px;background:#d9ceb4;border-top:2px solid #2a2118;border-bottom:2px solid #2a2118;flex:none}
.fa-flip{position:absolute;top:0;bottom:0;width:calc(50% - 5px);display:none;background:#efe7d4;border:2px solid #2a2118;z-index:5;
  backface-visibility:visible;transform-style:preserve-3d}
.fa-flip.fwd{display:block;left:calc(50% + 5px);transform-origin:-5px 50%;border-radius:0 5px 5px 0;transform:rotateY(-10deg)}
.fa-flip.back{display:block;left:0;transform-origin:calc(100% + 5px) 50%;border-radius:5px 0 0 5px;transform:rotateY(10deg)}
.fa-flip.fwd.go{animation:faF .46s ease-in-out forwards}.fa-flip.back.go{animation:faB .46s ease-in-out forwards}
@keyframes faF{0%{transform:rotateY(-10deg)}50%{transform:rotateY(-90deg) translateZ(30px)}100%{transform:rotateY(-170deg)}}
@keyframes faB{0%{transform:rotateY(10deg)}50%{transform:rotateY(90deg) translateZ(30px)}100%{transform:rotateY(170deg)}}
.fa-head{position:relative;margin:0 0 10px}
.fa-head h2{margin:0;font-size:32px;font-weight:800;line-height:1.05}
.fa-head .hi{font-size:20px;font-weight:700;color:#5a4a36;margin-left:8px}
.fa-head .when{font-size:13px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#8a7f6c;margin-top:2px}
.fa-stamp{position:absolute;right:-4px;top:-6px;transform:rotate(9deg);border:2px solid #2a2118;border-radius:999px;background:#f6b93b;
  font-weight:800;font-size:13px;padding:1px 11px;box-shadow:2px 2px 0 #2a2118}
.fa-photos{position:relative;flex:1;display:flex;flex-direction:column;align-items:flex-start;min-height:0;padding-top:4px}
.fa-left .fa-photos{padding-right:40px}
.fa-left .fa-photos>:nth-child(2){align-self:flex-end;margin-top:2px}
.fa-right .fa-photos{align-items:center;padding-top:10px}
.fa-ph{position:relative;margin:0;flex:none;width:min(52%,27vh);transform:rotate(var(--r,0deg)) translateY(var(--y,0px));background:#fffdf6;
  padding:8px 8px 6px;border:1.5px solid #2a2118;box-shadow:3px 3px 0 rgba(42,33,24,.85)}
.fa-ph .im{position:relative;aspect-ratio:4/3;overflow:hidden;background:#e6dcc5}
.fa-ph.tall{width:min(42%,23vh)}.fa-ph.tall .im{aspect-ratio:3/4}
.fa-right .fa-ph{width:min(68%,40vh)}.fa-right .fa-ph.tall{width:min(48%,29vh)}
.fa-ph img{display:block;width:100%;height:100%;object-fit:cover}
.fa-ph .im::after{content:"";position:absolute;inset:0;background-image:${GRAIN};mix-blend-mode:multiply;opacity:.35;pointer-events:none}
.fa-ph figcaption{font-size:14px;font-weight:500;color:#5a4a36;line-height:1.2;margin-top:5px;text-align:center}
.fa-ph i{position:absolute;width:15px;height:15px;background:#2a2118}
.fa-ph i.a{top:-4px;left:-4px;clip-path:polygon(0 0,100% 0,0 100%)}.fa-ph i.b{top:-4px;right:-4px;clip-path:polygon(0 0,100% 0,100% 100%)}
.fa-ph i.c{bottom:-4px;left:-4px;clip-path:polygon(0 0,0 100%,100% 100%)}.fa-ph i.d{bottom:-4px;right:-4px;clip-path:polygon(100% 0,100% 100%,0 100%)}
.fa-slot{flex:none;width:min(52%,27vh);aspect-ratio:4/3;border:2px dashed rgba(42,33,24,.45);border-radius:6px;display:flex;flex-direction:column;
  align-items:center;justify-content:center;text-align:center;padding:10px;color:#8a7f6c;font-weight:700;font-size:14px;line-height:1.25;
  transform:rotate(var(--r,0deg)) translateY(var(--y,0px))}
.fa-right .fa-slot{width:min(68%,40vh)}
.fa-slot code{font:600 11.5px/1.3 ui-monospace,Menlo,monospace;margin-top:4px;color:#8a7f6c;word-break:break-all}
.fa-say{position:absolute;left:max(18px,3vw);top:max(18px,5vh);width:min(400px,30vw);z-index:7;animation:faSay .5s .15s both ease-out}
@keyframes faSay{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
.fa-dadi{position:relative;display:flex;align-items:flex-start;gap:0}
.fa-face{flex:none;width:54px;height:58px}
.fa-bub{position:relative;flex:1;background:#fffdf6;border:1.7px solid #2a2118;border-radius:14px;box-shadow:3px 3px 0 #2a2118;padding:8px 14px 9px;
  font-size:17px;font-weight:600;line-height:1.3;min-height:58px}
.fa-bub::before{content:"";position:absolute;left:26px;top:-9px;width:14px;height:14px;background:#fffdf6;border-left:1.7px solid #2a2118;
  border-top:1.7px solid #2a2118;transform:rotate(45deg)}
.fa-bub .who{display:block;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#8a7f6c;margin-bottom:1px}
.fa-bub .more{display:block;font-size:12px;font-weight:700;color:#8a7f6c;margin-top:3px}
.fa-bub.click{cursor:pointer}
.fa-row{display:flex;gap:10px;justify-content:flex-start;margin-top:12px;flex-wrap:wrap}
.fa button{font:inherit;font-weight:700;font-size:15px;color:#2a2118;background:#f4efe3;border:1.7px solid #2a2118;border-radius:999px;padding:4px 16px;
  cursor:pointer;line-height:1.4}
.fa button:hover{background:#ece5d4}
.fa button.go{background:#f6b93b;box-shadow:3px 3px 0 #2a2118;transform:translate(-1px,-1px)}
.fa button.go:hover{background:#f8c65a}
.fa button:focus-visible{outline:2px solid #2a2118;outline-offset:3px}
.fa-hand{position:absolute;z-index:6;pointer-events:none;width:170px;height:auto}
.fa-hand.l{left:-92px;top:50%;transform:translateZ(84px)}
.fa-hand.r{right:-96px;top:58%;transform:translateZ(84px) scaleX(-1)}
.fa-tabwrap{position:absolute;top:0;bottom:0;left:calc(50% + 5px);right:0;transform-origin:0 50%;transform:rotateY(-10deg) translateZ(-1px);
  pointer-events:none;transform-style:preserve-3d}
.fa-tabwrap button{pointer-events:auto}
.fa-tabs{position:absolute;right:-130px;top:26px;display:flex;flex-direction:column;gap:7px;width:124px}
.fa-tabs button{text-align:left;border-radius:0 12px 12px 0;padding:3px 10px 3px 14px;font-size:13.5px;line-height:1.15;background:var(--t);
  border-left:none;transform:translateX(-10px);transition:transform .15s}
.fa-tabs button small{display:block;font-size:11.5px;font-weight:600;opacity:.8}
.fa-tabs button.on{transform:translateX(0);box-shadow:3px 3px 0 #2a2118}
.fa-tabs button .tick{float:right;font-weight:800}
.fa-close{position:absolute;top:max(18px,3vh);right:max(18px,2vw);z-index:8}
.fa-arrow{position:absolute;top:56%;transform:translateY(-50%);width:46px;height:46px;padding:0 !important;font-size:26px !important;z-index:8;
  box-shadow:3px 3px 0 #2a2118}
.fa-arrow.p{left:max(14px,2vw)}.fa-arrow.n{right:max(14px,2vw)}
.fa-hint{position:absolute;left:0;right:0;bottom:max(10px,2vh);text-align:center;font-size:13px;font-weight:700;color:#f4efe3;
  text-shadow:0 1px 0 #2a2118,0 0 6px #2a2118}
.fa-pageno{position:absolute;bottom:8px;font-size:12px;font-weight:700;color:#8a7f6c}
.fa-left .fa-pageno{left:16px}.fa-right .fa-pageno{right:16px}
@media (max-width:1100px){.fa-say{top:auto;bottom:max(40px,6vh);width:min(420px,44vw)}.fa-stage{top:44%}}
@media (max-width:760px){.fa-stage{width:94vw;height:62vh;transform:translate(-50%,-50%)}.fa-book{transform:none;animation:none}.fa-cast,.fa-hand{display:none}
  .fa-pages{flex-direction:column;overflow:auto}.fa-gutter{display:none}.fa-say{left:3vw;right:3vw;width:auto}
  .fa-tabs{position:static;flex-direction:row;flex-wrap:wrap;width:auto;margin-top:8px}.fa-tabs button{border-radius:999px;border-left:1.7px solid #2a2118;transform:none}
  .fa-arrow{display:none}}
`;

let root, L, R, SAY, flip, tabsEl, opts = {}, seq = [], pos = 0, mode = 'browse', line = 0, open_ = false, anim = false, lastWheel = 0, downX = null;

function photosOf(key){ const A = (window.FESTIVE_ALBUM && window.FESTIVE_ALBUM[key]) || [];
  return A.filter(p => p && p.src).map(p => ({ src: p.src.includes('/') ? p.src : `album/photos/${key}/${p.src}`, caption: p.caption || '' })); }
function dadiLine(key){ const d = window.FESTIVE_ALBUM && window.FESTIVE_ALBUM.dadi; return (d && d[key]) || BY[key].line; }
function buildSeq(){ seq = []; for (const f of FEST){ const n = Math.max(1, Math.ceil(photosOf(f.key).length/PER)); for (let s = 0; s < n; s++) seq.push({ key: f.key, spread: s, of: n }); } }
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// a steady little tilt per photo, so the page looks pasted by hand but does not jump about between renders
const tilt = (k, i) => { let h = 7; for (const ch of k + i) h = (h*31 + ch.charCodeAt(0)) % 9973; return { r: ((h % 50)/10 - 2.5).toFixed(1), y: (h % 3)*7 }; };

function slotHTML(key, i){ const t = tilt(key, 'e' + i);
  return `<div class="fa-slot" style="--r:${t.r}deg;--y:${t.y}px">No photos yet<code>album/photos/${key}/</code></div>`; }
function photoHTML(p, key, i){ const t = tilt(key, i);
  return `<figure class="fa-ph" style="--r:${t.r}deg;--y:${t.y}px"><div class="im"><img src="${esc(p.src)}" alt="${esc(p.caption)}" loading="lazy"></div>`
    + `<i class="a"></i><i class="b"></i><i class="c"></i><i class="d"></i>${p.caption ? `<figcaption>${esc(p.caption)}</figcaption>` : ''}</figure>`; }

function render(){
  const cur = seq[pos], f = BY[cur.key], ph = photosOf(f.key), slice = ph.slice(cur.spread*PER, cur.spread*PER + PER), done = (opts.done || []).includes(f.key);
  const left = slice.slice(0, 2), right = slice.slice(2, 3);
  const fill = (arr, from) => arr.length ? arr.map((p, i) => photoHTML(p, f.key, from + i)).join('') : '';
  let leftPh = fill(left, 0), rightPh = fill(right, 2);
  if (!ph.length){ leftPh = slotHTML(f.key, 0) + slotHTML(f.key, 1); rightPh = slotHTML(f.key, 2); }
  L.innerHTML = `<div class="fa-head"><h2>${f.name}<span class="hi">${f.hi}</span></h2><div class="when">${f.when}</div>`
    + `${done ? '<span class="fa-stamp">Story walked ✓</span>' : ''}</div><div class="fa-photos">${leftPh}</div>`
    + `<span class="fa-pageno">${pos*2 + 1}</span>`;
  let bub, row;
  if (mode === 'browse'){
    bub = `<span class="who">Dadi</span>${esc(dadiLine(f.key))}`;
    row = `<button class="go" data-a="ask">I want to know about this</button><button data-a="nextf">Next festival →</button>`;
  } else if (mode === 'story'){
    bub = `<span class="who">Dadi</span>${esc(f.story[line])}<span class="more">Click, E or Space to go on ▸</span>`;
    row = `<button data-a="browse">Keep looking</button>`;
  } else {
    bub = `<span class="who">Dadi</span>${esc(f.story[f.story.length - 1])}`;
    row = f.playable ? `<button class="go" data-a="go">Go to the island</button><button data-a="browse">Keep looking</button>`
                     : `<span style="font-weight:700;color:#8a7f6c;align-self:center">That island is still being drawn.</span><button data-a="browse">Keep looking</button>`;
  }
  R.innerHTML = `<div class="fa-photos">${rightPh}</div><span class="fa-pageno">${pos*2 + 2}</span>`;
  SAY.innerHTML = `<div class="fa-dadi"><div class="fa-bub${mode === 'story' ? ' click' : ''}" data-a="${mode === 'story' ? 'adv' : ''}">${bub}</div></div>`
    + `<div class="fa-row">${row}</div>`;
  // a photo that fails to load becomes an empty slot; tall photos get a tall frame
  root.querySelectorAll('.fa-ph img').forEach((img, i) => {
    img.onerror = () => { const fig = img.closest('.fa-ph'); if (fig) fig.outerHTML = slotHTML(f.key, 10 + i); };
    img.onload = () => { if (img.naturalHeight > img.naturalWidth*1.05) img.closest('.fa-ph').classList.add('tall'); }; });
  tabsEl.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.k === f.key));
}

// the state changes at once (so tests and quick clicks see it); the page itself swaps halfway through the flip
function turn(dir, apply){
  apply(); if (anim || !open_ || document.hidden){ render(); return; }
  anim = true; flip.className = 'fa-flip ' + (dir > 0 ? 'fwd' : 'back'); void flip.offsetWidth; flip.classList.add('go');
  setTimeout(render, 220); setTimeout(() => { flip.className = 'fa-flip'; anim = false; render(); }, 470);
}
function goPos(p){ p = Math.max(0, Math.min(seq.length - 1, p)); if (p === pos) return; const dir = p > pos ? 1 : -1; turn(dir, () => { pos = p; mode = 'browse'; line = 0; }); }
function next(){ goPos(pos + 1); }
function prev(){ goPos(pos - 1); }
function tab(key){ const p = seq.findIndex(s => s.key === key); if (p >= 0) goPos(p); }
function nextFestival(){ const k = seq[pos].key, i = FEST.findIndex(f => f.key === k); tab(FEST[(i + 1) % FEST.length].key); }
function ask(){ mode = 'story'; line = 0; render(); }
function advance(){ const f = BY[seq[pos].key]; if (mode !== 'story') return; if (line < f.story.length - 2) line++; else { line = f.story.length - 1; mode = 'end'; } render(); }
function go(){ const f = BY[seq[pos].key]; if (mode !== 'end' || !f.playable) return; const cb = opts.onGo; close(true); if (cb) cb(f.island); }
function browse(){ mode = 'browse'; line = 0; render(); }

function build(){
  const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  root = document.createElement('div'); root.className = 'fa'; root.hidden = true; root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-label', "Dadi's photo album");
  root.innerHTML = `<div class="fa-stage"><div class="fa-cast"></div><div class="fa-book"><span class="k tl"></span><span class="k tr"></span><span class="k bl"></span><span class="k br"></span>`
    + `<div class="fa-pages"><section class="fa-page fa-left"></section><div class="fa-gutter"></div><section class="fa-page fa-right"></section><div class="fa-flip"></div>`
    + `<div class="fa-tabwrap"><nav class="fa-tabs">${FEST.map(f => `<button data-k="${f.key}" style="--t:${f.tab}">${f.name}<small>${f.hi}</small></button>`).join('')}</nav></div></div>`
    + `<svg class="fa-hand l" viewBox="0 0 170 110" aria-hidden="true"><path d="M-6 40C22 30 52 32 70 40L74 96C50 104 18 102 -6 96Z" fill="#fbf7ec" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/><path d="M8 44C30 38 50 39 64 44" fill="none" stroke="#e3dbca" stroke-width="7" stroke-linecap="round"/><path d="M64 38C70 34 78 36 80 40L82 94C76 100 68 99 64 94Z" fill="#e3dbca" stroke="#2a2118" stroke-width="3.2" stroke-linejoin="round"/><path d="M78 42C92 34 106 38 110 48L112 86C104 98 88 100 78 92Z" fill="#c48a5e" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/><path d="M96 46C104 38 128 40 146 47C156 51 156 62 146 64C132 66 112 64 100 60C93 57 91 51 96 46Z" fill="#e1a87b" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/><path d="M101 70C108 74 108 84 101 88" fill="none" stroke="#6d4429" stroke-width="3" stroke-linecap="round"/></svg><svg class="fa-hand r" viewBox="0 0 170 110" aria-hidden="true"><path d="M-6 44C20 38 46 40 66 46L70 92C46 100 16 98 -6 92Z" fill="#fbf7ec" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/><path d="M60 44C66 41 72 42 74 46L76 90C70 95 64 94 60 90Z" fill="#e3dbca" stroke="#2a2118" stroke-width="3.2" stroke-linejoin="round"/><path d="M72 46C86 38 102 42 106 52L108 86C100 96 84 98 74 90Z" fill="#c48a5e" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/><path d="M80 45L84 91" stroke="#2a2118" stroke-width="7.5" stroke-linecap="round"/><path d="M80 45L84 91" stroke="#cf5641" stroke-width="4.5" stroke-linecap="round"/><path d="M86 46L89 90" stroke="#d9a32b" stroke-width="2.4" stroke-linecap="round"/><path d="M94 50C102 42 124 44 140 50C150 54 150 64 140 66C128 68 110 66 98 62C91 59 89 54 94 50Z" fill="#e1a87b" stroke="#2a2118" stroke-width="4" stroke-linejoin="round"/></svg></div></div>`
    + `<div class="fa-say"></div>`
    + `<button class="fa-close" data-a="close">Close ✕</button><button class="fa-arrow p" data-a="prev" aria-label="Previous page">‹</button><button class="fa-arrow n" data-a="next" aria-label="Next page">›</button>`
    + `<div class="fa-hint">← → or drag to turn pages · Esc to close</div>`;
  document.body.appendChild(root);
  L = root.querySelector('.fa-left'); R = root.querySelector('.fa-right'); SAY = root.querySelector('.fa-say'); flip = root.querySelector('.fa-flip'); tabsEl = root.querySelector('.fa-tabs');
  root.addEventListener('click', e => {
    const t = e.target.closest('[data-a],[data-k]');
    if (!t) return;
    if (t.dataset.k) return tab(t.dataset.k);
    ({ close, prev, next, ask, go, browse, adv: advance, nextf: nextFestival })[t.dataset.a]?.();
  });
  root.addEventListener('wheel', e => { e.preventDefault(); const now = performance.now(); if (now - lastWheel < 380 || Math.abs(e.deltaY) < 8) return; lastWheel = now; e.deltaY > 0 ? next() : prev(); }, { passive: false });
  root.addEventListener('pointerdown', e => { if (!e.target.closest('button')) downX = e.clientX; });
  root.addEventListener('pointerup', e => { if (downX === null) return; const dx = e.clientX - downX; downX = null; if (Math.abs(dx) > 70) dx < 0 ? next() : prev(); });
  // while the album is open it owns the keyboard: keys never reach the game underneath
  addEventListener('keydown', e => { if (!open_) return; e.stopImmediatePropagation(); const k = e.code;
    if (['Space', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(k)) e.preventDefault();
    if (mode === 'story'){ if (['KeyE', 'Space', 'Enter', 'ArrowRight', 'KeyD'].includes(k)) advance(); else if (k === 'Escape') browse(); return; }
    if (mode === 'end'){ if (k === 'Enter' || k === 'KeyE' || k === 'Space') go(); else if (k === 'Escape' || k === 'ArrowLeft' || k === 'KeyA') browse(); return; }
    if (k === 'ArrowRight' || k === 'KeyD') next(); else if (k === 'ArrowLeft' || k === 'KeyA') prev();
    else if (k === 'Escape' || k === 'KeyE') close(); else if (k === 'Enter' || k === 'Space') ask(); }, true);
}

function open(o = {}){
  if (!root) build(); opts = o; buildSeq(); mode = 'browse'; line = 0;
  const p = seq.findIndex(s => s.key === o.start); pos = p >= 0 ? p : 0;
  tabsEl.querySelectorAll('button').forEach(b => { const d = (o.done || []).includes(b.dataset.k); b.querySelector('.tick')?.remove(); if (d) b.insertAdjacentHTML('afterbegin', '<span class="tick">✓</span>'); });
  open_ = true; root.hidden = false; document.body.classList.add('fa-open'); render();
  if (document.pointerLockElement) try { document.exitPointerLock(); } catch (e) {}
}
function close(silent){ if (!open_) return; open_ = false; root.hidden = true; document.body.classList.remove('fa-open'); mode = 'browse'; if (!silent && opts.onClose) opts.onClose(); }

window.FestiveAlbum = { open, close: () => close(false), isOpen: () => open_, next, prev, tab, ask, advance, go,
  state: () => open_ || seq.length ? { key: seq[pos]?.key, spread: seq[pos]?.spread, mode, line } : null, FEST };
})();
