// Наполнение копии шаблона Botox (EN 154434023 / RU 154431743) по карте из tlnt.ae/solar/tilda-plans/<KEY>.json
// Запускать на https://tilda.cc/page/?pageid=<PID>. Перед вызовом задать window.__KEY и window.__PID.
const KEY = window.__KEY, PIDX = window.__PID;
const P = String(window.pageid); if (P !== PIDX) throw new Error('wrong page ' + P);
window.__job = { state: 'run', log: [] };
(async () => {
  const L = m => window.__job.log.push(m);
  try {
    const PLAN = await fetch('https://tlnt.ae/solar/tilda-plans/' + KEY + '.json?' + Date.now()).then(r => r.json());
    if (!PLAN.key || PLAN.key !== KEY) throw new Error('plan key');
    const EN = ['crumbs', 'hero', 'stats', 'what', 'benefits', 'whyTitle', 'whyCards', 'evTitle', 'evCards', 'indTitle', 'indItems', 'stepsTitle', 'steps', 'priceTitle', 'hiddenPrice', 'priceCards', 'resultsTitle', 'results', 'reviewsTitle', 'contra', 'faqTitle', 'cta', 'popup'];
    const ROLES = PLAN.lang === 'en' ? EN : EN.filter(r => r !== 'reviewsTitle');
    const SIG = { crumbs: ['4', /Botox|Ботокс/], hero: ['2', /Botox|Ботокс/], stats: ['1', /3.4/], what: ['11', /Botox|ботокс/], benefits: ['14', /What you get|Что вы получаете/], whyTitle: ['1', /supervision|контролем/], whyCards: ['10', /DHA/], evTitle: ['1', /research|исследования/], evCards: ['14', /RCT|РКИ/], indTitle: ['1', /addresses|решает/], indItems: ['30', /Forehead|лба/], stepsTitle: ['0', /Step|шаг/], steps: ['14', /consultation|Консультация/], priceTitle: ['1', /prices|Цены/], hiddenPrice: ['30', /zone|зона/], priceCards: ['12', /Botulinum|Ботулотоксин/], resultsTitle: ['0', /When|Когда/], results: ['7', /days|дней/], reviewsTitle: ['1', /say/], contra: ['20', /Contraindications|Противопоказания/], faqTitle: ['0', /Honest|честно/], cta: ['5', /Book|Запишитесь/], popup: ['4', /consultation|консультация/] };
    const gz = async rec => { const fd = new FormData(); fd.append('comm', 'getzerocode'); fd.append('pageid', P); fd.append('recordid', rec); return JSON.parse(await fetch('/zero/get/', { method: 'POST', body: fd }).then(r => r.text())) };
    const sz = async (rec, obj) => { const fd = new FormData(); fd.append('comm', 'savezerocode'); fd.append('pageid', P); fd.append('recordid', rec); fd.append('onlythisfield', 'code'); fd.append('fromzero', 'yes'); fd.append('code', JSON.stringify(obj)); fd.append('zb_grid', 'reset'); return (await fetch('/zero/submit/', { method: 'POST', body: fd }).then(r => r.text())).slice(0, 20) };
    const sr = async (rec, field, val) => { const fd = new FormData(); fd.append('comm', 'saverecord'); fd.append('pageid', P); fd.append('recordid', rec); fd.append('onlythisfield', field); fd.append(field, val); return (await fetch('/page/submit/', { method: 'POST', body: fd }).then(r => r.text())).slice(0, 40) };
    const all = [...document.querySelectorAll('[id^=record]')].filter(r => /^record\d+$/.test(r.id));
    const recs = [...new Map(all.map(r => [r.id.slice(6), r.getAttribute('data-record-type')])).entries()];
    const zids = recs.filter(([id, t]) => t === '396').map(([id]) => id);
    if (zids.length !== ROLES.length) throw new Error('count ' + zids.length);
    const J = [];
    for (let i = 0; i < ROLES.length; i++) { const j = await gz(zids[i]); const [el, re] = SIG[ROLES[i]]; const t = ((j[el] || {}).text || (j[el] || {}).caption || '').replace(/#nbsp;/g, ' '); if (!re.test(t)) throw new Error('sig ' + ROLES[i] + ': ' + t.slice(0, 50)); J.push(j); }
    L('sig ok');
    for (let i = 0; i < ROLES.length; i++) { const role = ROLES[i], map = PLAN.zero[role]; if (!map) continue; const j = J[i]; const miss = []; for (const [k, v] of Object.entries(map)) { if (!j[k]) { miss.push(k); continue; } j[k].text = v; } if (role === 'evCards') { for (const k of ['11', '6', '1']) if (j[k]) j[k].link = ''; } const r = await sz(zids[i], j); L(role + ':' + r + (miss.length ? ' miss ' + miss : '')); }
    const faqRec = recs.find(([id, t]) => t === '585')[0];
    const uu = [...new Set([...document.getElementById('record' + faqRec).querySelectorAll('[field^="li_title__"]')].map(e => e.getAttribute('field').slice(10)))];
    L('faq uids ' + uu.length);
    for (let i = 0; i < uu.length && i < PLAN.faq.length; i++) { const a = await sr(faqRec, 'li_title__' + uu[i], PLAN.faq[i][0]); const b = await sr(faqRec, 'li_descr__' + uu[i], PLAN.faq[i][1]); L('faq' + i + ':' + a + '/' + b); }
    const pcId = zids[ROLES.indexOf('priceCards')];
    const fd = new FormData(); fd.append('comm', 'addnewrecord'); fd.append('pageid', P); fd.append('afterid', pcId); fd.append('beforeid', ''); fd.append('tplid', '131'); fd.append('with_code', '');
    const addTxt = await fetch('/page/submit/', { method: 'POST', body: fd }).then(r => r.text());
    const newRec = (addTxt.match(/record(\d{7,})/) || [])[1];
    L('newRec ' + newRec);
    const costCode = PLAN.lang === 'en' ? PLAN.cost : PLAN.cost + PLAN.jsonld;
    if (newRec) { L('cost:' + await sr(newRec, 'code', costCode)); }
    if (PLAN.lang === 'en') { const ld = recs.filter(([id, t]) => t === '131').map(([id]) => id).find(id => /ld\+json/.test(document.getElementById('record' + id).innerText)); L('ld rec ' + ld); if (ld) L('ld:' + await sr(ld, 'code', PLAN.jsonld)); }
    window.__job.state = 'done';
  } catch (e) { window.__job.state = 'error: ' + e.message; }
})();
'started'
