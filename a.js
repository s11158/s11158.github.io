/*! Единая аналитика для сайтов s11158. Подключение:
    <script defer src="https://tlnt.ae/a.js" data-ym="12345678" data-ga="G-XXXXXXXXXX"></script>
    Необязательные атрибуты: data-tmr, data-vk, data-meta, data-name.
    Пустой или отсутствующий атрибут просто не подключается. */
(function () {
  var s = document.currentScript || (function () {
    var all = document.getElementsByTagName('script');
    for (var i = all.length - 1; i >= 0; i--) if ((all[i].src || '').indexOf('/a.js') > -1) return all[i];
    return null;
  })();
  if (!s) return;

  var cfg = {
    ym: (s.getAttribute('data-ym') || '').trim(),
    ga: (s.getAttribute('data-ga') || '').trim(),
    tmr: (s.getAttribute('data-tmr') || '').trim(),
    vk: (s.getAttribute('data-vk') || '').trim(),
    meta: (s.getAttribute('data-meta') || '').trim(),
    name: (s.getAttribute('data-name') || location.hostname).trim()
  };

  // ---- Яндекс Метрика: вебвизор, карта кликов, карта скроллинга, аналитика форм ----
  if (cfg.ym) {
    (function (m, e, t, r, i, k, c) {
      m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments); };
      m[i].l = 1 * new Date();
      for (var j = 0; j < e.scripts.length; j++) if (e.scripts[j].src === r) return;
      k = e.createElement(t); c = e.getElementsByTagName(t)[0];
      k.async = 1; k.src = r; c.parentNode.insertBefore(k, c);
    })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');
    ym(+cfg.ym, 'init', {
      webvisor: true, clickmap: true, trackLinks: true,
      accurateTrackBounce: true, trackHash: true, ecommerce: 'dataLayer'
    });
    var ns = document.createElement('noscript');
    ns.innerHTML = '<div><img src="https://mc.yandex.ru/watch/' + cfg.ym + '" style="position:absolute;left:-9999px" alt=""></div>';
    (document.body || document.documentElement).appendChild(ns);
  }

  // ---- Google Analytics 4 ----
  if (cfg.ga) {
    var g = document.createElement('script');
    g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.ga);
  }

  // ---- Top.Mail.Ru ----
  if (cfg.tmr) {
    window._tmr = window._tmr || [];
    _tmr.push({ id: cfg.tmr, type: 'pageView', start: (new Date()).getTime() });
    var t1 = document.createElement('script');
    t1.async = true; t1.src = 'https://top-fwz1.mail.ru/js/code.js';
    document.head.appendChild(t1);
  }

  // ---- Пиксель ВКонтакте ----
  if (cfg.vk) {
    var v = document.createElement('script');
    v.async = true; v.src = 'https://vk.com/js/api/openapi.js?169';
    v.onload = function () { try { VK.Retargeting.Init(cfg.vk); VK.Retargeting.Hit(); } catch (e) {} };
    document.head.appendChild(v);
  }

  // ---- Пиксель Meta ----
  if (cfg.meta) {
    !function (f, b, e, v, n, t, s2) {
      if (f.fbq) return;
      n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v;
      s2 = b.getElementsByTagName(e)[0]; s2.parentNode.insertBefore(t, s2);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.meta); fbq('track', 'PageView');
  }

  // ---- цели: одинаковые на всех сайтах ----
  function goal(name, params) {
    try { if (window.ym && cfg.ym) ym(+cfg.ym, 'reachGoal', name, params); } catch (e) {}
    try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {}
    try { if (window._tmr) _tmr.push({ id: cfg.tmr, type: 'reachGoal', goal: name }); } catch (e) {}
    try { if (window.fbq && name === 'lead') fbq('track', 'Lead'); } catch (e) {}
  }
  window.trackGoal = goal;

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a');
    if (a) {
      var h = a.getAttribute('href') || '';
      if (/^tel:/i.test(h)) goal('phone', { value: h.replace(/^tel:/i, '') });
      else if (/wa\.me|whatsapp/i.test(h)) goal('whatsapp');
      else if (/t\.me|telegram/i.test(h)) goal('telegram');
      else if (/^mailto:/i.test(h)) goal('email');
      else if (/instagram\.com/i.test(h)) goal('instagram');
      else if (/\.(pdf|docx?|xlsx?|zip|pptx?)(\?|$)/i.test(h)) goal('file_download', { file: h.split('/').pop() });
      else if (/^https?:/i.test(h) && h.indexOf(location.hostname) === -1) goal('outbound', { to: (h.split('/')[2] || '') });
    }
    var b = e.target.closest && e.target.closest('button,[role="button"]');
    if (b && b.textContent) {
      var txt = b.textContent.trim().slice(0, 40);
      if (txt) goal('button_click', { label: txt });
    }
  }, true);

  document.addEventListener('submit', function (e) {
    goal('form_submit', { form: (e.target && (e.target.id || e.target.name)) || 'form' });
    goal('lead');
  }, true);

  // глубина просмотра
  var seen = {};
  window.addEventListener('scroll', function () {
    var h = document.body.scrollHeight - window.innerHeight;
    if (h <= 0) return;
    var p = Math.round(window.scrollY / h * 100);
    [25, 50, 75, 100].forEach(function (k) {
      if (p >= k && !seen[k]) { seen[k] = 1; goal('scroll_' + k); }
    });
  }, { passive: true });

  // время на странице: засчитываем вовлечённый визит
  setTimeout(function () { goal('engaged_15s'); }, 15000);
  setTimeout(function () { goal('engaged_60s'); }, 60000);
})();
