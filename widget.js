(function () {
  // ---- Meta Pixel ----
  !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  try { fbq('init', '1742307803770070'); fbq('track', 'PageView'); } catch (e) {}

  // ---- Google tag (gtag.js) ----
  try {
    var gt = document.createElement("script");
    gt.async = true; gt.src = "https://www.googletagmanager.com/gtag/js?id=AW-18241263216";
    document.head.appendChild(gt);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", "AW-18241263216");
  } catch (e) {}

  // ---- Cloudflare Web Analytics ----
  try {
    var cf = document.createElement("script");
    cf.defer = true;
    cf.src = "https://static.cloudflareinsights.com/beacon.min.js";
    cf.setAttribute("data-cf-beacon", '{"token": "d83e13984a6f48269e27fb3b111092dc"}');
    document.head.appendChild(cf);
  } catch (e) {}

  var PHONE = "971585783353";
  var WA_URL = "https://wa.me/" + PHONE + "?text=" + encodeURIComponent("Добрый день, ");
  var TG_URL = "https://t.me/+" + PHONE;
  var WORKER = "https://tlnt-lead-bot.b3gg.workers.dev";

  // ---- source attribution (?from= / utm_source), persisted per session ----
  var SRC = "";
  try {
    var qs = new URLSearchParams(location.search);
    SRC = (qs.get("from") || qs.get("utm_source") || "").slice(0, 60);
    if (SRC) { try { sessionStorage.setItem("tlnt_src", SRC); } catch (e) {} }
    else { try { SRC = sessionStorage.getItem("tlnt_src") || ""; } catch (e) {} }
  } catch (e) {}
  // one "visit" ping per source per session, so seeded visits are logged even без клика
  try {
    if (SRC) {
      var vkey = "tlnt_vis_" + SRC;
      if (!sessionStorage.getItem(vkey)) {
        sessionStorage.setItem(vkey, "1");
        var vp = JSON.stringify({ type: "visit", from: SRC, page: location.pathname });
        navigator.sendBeacon(WORKER, new Blob([vp], { type: "text/plain" }));
      }
    }
  } catch (e) {}

  // ---- styles ----
  var css =
    ".tlnt-fab{position:fixed;right:20px;bottom:24px;z-index:9999;display:flex;flex-direction:column;gap:12px}" +
    ".tlnt-fab a{width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;" +
    "box-shadow:0 8px 22px rgba(0,0,0,.18);transition:transform .18s ease;text-decoration:none}" +
    ".tlnt-fab a:hover{transform:scale(1.08)}" +
    ".tlnt-fab .wa{background:#25D366}.tlnt-fab .tg{background:#229ED9}" +
    ".tlnt-fab .wa{animation:tlntPulse 2.4s infinite}" +
    "@keyframes tlntPulse{0%{box-shadow:0 8px 22px rgba(0,0,0,.18),0 0 0 0 rgba(37,211,102,.5)}" +
    "70%{box-shadow:0 8px 22px rgba(0,0,0,.18),0 0 0 14px rgba(37,211,102,0)}" +
    "100%{box-shadow:0 8px 22px rgba(0,0,0,.18),0 0 0 0 rgba(37,211,102,0)}}" +
    "@media(max-width:820px){.tlnt-fab{bottom:90px;right:16px}}" +
    "a:focus-visible,button:focus-visible,input:focus-visible,textarea:focus-visible,summary:focus-visible{outline:2px solid #9a7038;outline-offset:2px;border-radius:3px}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  // ---- icons ----
  var WA_SVG =
    '<svg viewBox="0 0 32 32" width="30" height="30" fill="#fff" aria-hidden="true"><path d="M16 .4C7.4.4.5 7.3.5 15.9c0 2.8.7 5.4 2 7.8L.4 31.6l8.1-2.1c2.3 1.2 4.8 1.9 7.5 1.9 8.6 0 15.5-6.9 15.5-15.5S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1S29.1 8.7 29.1 16 23.2 28.7 16 28.7zm7.2-9.8c-.4-.2-2.3-1.1-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-.4-.2-1.7-.6-3.2-2-1.2-1.1-2-2.4-2.2-2.8-.2-.4 0-.6.2-.8.2-.2.4-.4.5-.7.2-.3.1-.5 0-.7-.1-.2-.9-2.2-1.3-3-.3-.7-.6-.6-.9-.6h-.7c-.2 0-.6.1-1 .5s-1.4 1.3-1.4 3.3 1.4 3.8 1.6 4.1c.2.3 2.8 4.3 6.8 6 .9.4 1.7.6 2.2.8.9.3 1.8.3 2.4.2.7-.1 2.3-.9 2.6-1.9.3-.9.3-1.7.2-1.9-.1-.1-.3-.2-.7-.4z"/></svg>';
  var TG_SVG =
    '<svg viewBox="0 0 24 24" width="27" height="27" fill="#fff" aria-hidden="true"><path d="M21.9 4.3l-3.1 14.7c-.2 1-.9 1.3-1.8.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.6 13.1l-4.7-1.5c-1-.3-1-1 .2-1.5l18.4-7.1c.8-.3 1.6.2 1.4 1.3z"/></svg>';

  // ---- floating buttons ----
  var box = document.createElement("div");
  box.className = "tlnt-fab";
  box.innerHTML =
    '<a class="tg" href="' + TG_URL + '" target="_blank" rel="noopener" aria-label="Написать в Telegram">' + TG_SVG + "</a>" +
    '<a class="wa" href="' + WA_URL + '" target="_blank" rel="noopener" aria-label="Написать в WhatsApp">' + WA_SVG + "</a>";
  document.body.appendChild(box);

  // ---- inject lead form + sticky mobile CTA on pages that lack them ----
  function tlntInput(n, ph) {
    return '<input name="' + n + '" placeholder="' + ph + '" aria-label="' + ph +
      '" style="padding:14px 16px;border:1px solid #e6dccc;border-radius:12px;font-size:15px;font-family:inherit;background:#fff;color:#3f3a33">';
  }
  try {
    var hasForm = !!document.querySelector("form");
    var hasMcta = !!document.querySelector(".tlnt-mcta");
    if (!hasForm) {
      var sec = document.createElement("section");
      sec.id = "tlnt-lead";
      sec.style.cssText = "background:radial-gradient(120% 130% at 50% 0%,#f6e3df 0%,#f4ece2 50%,#fbf8f3 85%);padding:56px 22px;text-align:center";
      sec.innerHTML =
        '<div style="max-width:520px;margin:0 auto">' +
        '<h2 style="font-family:\'Cormorant Garamond\',serif;font-weight:500;font-size:clamp(28px,4vw,40px);color:#3f3a33;margin:0 0 10px">Расскажите, кого вы ищете</h2>' +
        '<p style="color:#6b6155;margin:0 0 22px">Ответим в течение дня, без спама и обязательств.</p>' +
        '<form id="tlnt-lf" style="display:flex;flex-direction:column;gap:12px;text-align:left">' +
        tlntInput("lname", "Ваше имя") +
        tlntInput("lpos", "Кого ищете? Напр. администратор салона") +
        tlntInput("lcontact", "Ваш WhatsApp / телефон / Telegram") +
        '<button type="submit" id="tlnt-lb" style="background:#986e35;color:#fff;font-weight:700;font-size:16px;padding:15px;border:none;border-radius:100px;cursor:pointer;font-family:inherit;box-shadow:0 10px 24px rgba(152,110,53,.28)">Отправить заявку</button>' +
        '<p style="text-align:center;font-size:13px;line-height:1.6;color:#7a7266;margin:2px 0 0">Ответим в течение дня. Удобнее напрямую? <a href="' + WA_URL + '" style="color:#986e35;font-weight:600">WhatsApp</a> · <a href="' + TG_URL + '" style="color:#986e35;font-weight:600">Telegram</a></p>' +
        "</form>" +
        '<div id="tlnt-ok" style="display:none;padding:16px 0"><div style="font-family:\'Cormorant Garamond\',serif;font-size:28px;color:#3f3a33;margin-bottom:6px">Спасибо! 🤍</div><div style="color:#6b6155;font-size:15px">Заявка получена — свяжемся с вами в течение дня.</div></div>' +
        "</div>";
      var ft = document.querySelector("footer");
      if (ft && ft.parentNode) ft.parentNode.insertBefore(sec, ft);
      else document.body.appendChild(sec);
      var lf = document.getElementById("tlnt-lf");
      lf.addEventListener("submit", function (e) {
        e.preventDefault();
        var b = document.getElementById("tlnt-lb");
        b.disabled = true; b.textContent = "Отправляем…";
        var payload = JSON.stringify({ name: lf.lname.value, position: lf.lpos.value, contact: lf.lcontact.value, message: "страница: " + location.pathname, from: SRC });
        fetch(WORKER, { method: "POST", headers: { "Content-Type": "application/json" }, body: payload })
          .then(function (r) { return r.json(); })
          .then(function (d) { if (!d || !d.ok) throw 0; lf.style.display = "none"; document.getElementById("tlnt-ok").style.display = "block"; })
          .catch(function () { b.disabled = false; b.textContent = "Отправить заявку"; alert("Не получилось отправить. Напишите, пожалуйста, в WhatsApp."); });
      });
    }
    if (!hasMcta) {
      var bar = document.createElement("div");
      bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:9998;background:rgba(251,248,243,.96);backdrop-filter:blur(8px);border-top:1px solid #ece4d8;padding:10px 14px;justify-content:center;gap:10px";
      var anchor = document.getElementById("tlnt-lead") ? "#tlnt-lead" : (WA_URL);
      bar.innerHTML = '<a href="' + anchor + '" style="flex:1;max-width:420px;text-align:center;background:#986e35;color:#fff;font-weight:700;padding:13px;border-radius:100px;text-decoration:none">Оставить заявку</a>';
      document.body.appendChild(bar);
      var mq = window.matchMedia("(max-width:820px)");
      function tlntMctaUpd() { bar.style.display = mq.matches ? "flex" : "none"; document.body.style.paddingBottom = mq.matches ? "66px" : ""; }
      tlntMctaUpd();
      try { mq.addEventListener("change", tlntMctaUpd); } catch (e) { mq.addListener(tlntMctaUpd); }
    }
  } catch (e) {}

  // ---- structured data now lives STATICALLY in each page <head> (not JS-injected) ----

  // ---- click tracking (one ping per channel+page per session) ----
  function track(ch) {
    try {
      var key = "tlnt_clk_" + ch + "_" + location.pathname;
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
      var payload = JSON.stringify({ type: "click", channel: ch, page: location.pathname, from: SRC });
      navigator.sendBeacon(WORKER, new Blob([payload], { type: "text/plain" }));
      try { if (window.fbq) fbq("track", "Lead", { content_name: ch }); } catch (e) {}
      try { if (window.gtag) gtag("event", "conversion", { send_to: "AW-18241263216/suk6CJf-ksgcEPCsjvpD" }); } catch (e) {}
    } catch (e) {}
  }
  // fire Lead on lead-form submit too
  document.addEventListener("submit", function () {
    try { if (window.fbq) fbq("track", "Lead", { content_name: "form" }); } catch (e) {}
    try { if (window.gtag) gtag("event", "conversion", { send_to: "AW-18241263216/suk6CJf-ksgcEPCsjvpD" }); } catch (e) {}
  }, true);
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a) return;
      var h = a.getAttribute("href") || "";
      if (h.indexOf("wa.me") > -1 || h.indexOf("api.whatsapp") > -1) track("whatsapp");
      else if (h.indexOf("t.me") > -1 || h.indexOf("telegram.me") > -1) track("telegram");
    },
    true
  );

  // ---- scroll-reveal animations + smooth anchor scroll (progressive, respects reduced-motion) ----
  try {
    var animCss =
      "html{scroll-behavior:smooth}" +
      ".tlnt-reveal{opacity:0;transform:translateY(22px);transition:opacity .75s cubic-bezier(.2,.65,.2,1),transform .75s cubic-bezier(.2,.65,.2,1)}" +
      ".tlnt-reveal.tlnt-in{opacity:1;transform:none}" +
      "@media(prefers-reduced-motion:reduce){.tlnt-reveal{opacity:1!important;transform:none!important;transition:none!important}html{scroll-behavior:auto}}";
    var as = document.createElement("style");
    as.textContent = animCss;
    document.head.appendChild(as);

    if ("IntersectionObserver" in window &&
        !(window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches)) {
      var vh = window.innerHeight || 800;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("tlnt-in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.06, rootMargin: "0px 0px -48px 0px" });
      var nodes = document.querySelectorAll("section, article, footer");
      Array.prototype.forEach.call(nodes, function (el) {
        var r = el.getBoundingClientRect();
        // leave above-the-fold content visible immediately (no flash), animate the rest on scroll
        if (r.top < vh * 0.88) return;
        el.classList.add("tlnt-reveal");
        io.observe(el);
      });
    }
  } catch (e) {}
})();
