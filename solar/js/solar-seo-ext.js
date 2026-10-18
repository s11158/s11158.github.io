/* solar-seo-ext v1 (2026-10-19). Moved unchanged from the Tilda HEAD of solar-beauty.ae (project 11916315) to stay under the 65535-byte HEAD limit.
   1) solar-internal-links: related services + blog link before the footer. 2) solar-seo-extras: JSON-LD, hreflang, breadcrumbs, article UI, blog index, image alt.
   Loaded with defer from the HEAD; after editing bump ?v= in the HEAD script tag and republish pages. */
try {
(function () {
var path = location.pathname.replace(/\/+$/, "") || "/";
var isRu = /^\/ru(\/|$)/.test(path);
var key  = path.replace(/^\/ru/, "");

/* --- 1. lang для русских страниц (блог не попадал в старый блок) --- */
if (isRu) document.documentElement.setAttribute("lang", "ru");
if (/^\/ar(\/|$)/.test(path)) document.documentElement.setAttribute("lang", "ar");

/* --- 2. ссылки на редиректы -> сразу на конечный URL --- */
var REDIR = { "/special-offers": "/special", "/portfolio": "/park" };

/* --- 3. карта перелинковки: страница -> [похожие услуги], статья --- */
var T = {
en: {
"/beauty-services/podiatry": "Podiatry",
"/beauty-services/nail-service": "Nail Service",
"/beauty-services/hair-care": "Hair Care & Trichology",
"/beauty-services/haircut-styling": "Haircuts & Styling",
"/beauty-services/hair-coloring": "Hair Coloring",
"/blog/podiatry-when-to-see-a-podiatrist": "Podiatry: when you need a podiatrist rather than a pedicure technician, and what they do",
"/blog/plasma-therapy-hair-loss": "Plasma therapy for hair: how PRP works for hair loss, who it suits and when to expect results",
"/blog/diagnostika-kozhi-golovy-heleo4-dubai": "Scalp check-up in Dubai: trichoscopy, scalp peeling and HELEO4 light therapy, and why hair care starts with the skin",
"/aesthetic-services/aesthetic-cosmetology": "Aesthetic Cosmetology",
"/aesthetic-services/body-sculpting-tesla-former": "EMS Body Sculpting Tesla Former",
"/aesthetic-services/botox": "Botox Injections in Dubai",
"/aesthetic-services/dermal-fillers": "Dermal Fillers in Dubai",
"/aesthetic-services/lip-fillers": "Lip Fillers in Dubai",
"/aesthetic-services/harmony-xl": "Laser Hair Removal in Dubai",
"/aesthetic-services/hydra-facial": "HydraFacial in Dubai",
"/aesthetic-services/lifting-virtue-rf": "Virtue RF Microneedling",
"/aesthetic-services/lymphatic-drainage-icoone": "Lymphatic Drainage Icoone",
"/aesthetic-services/massage-spa": "Massage & SPA",
"/aesthetic-services/mens-menu": "Men's Menu",
"/aesthetic-services/non-surgical-liposuction-ulfit": "Non-Surgical Liposuction ULFIT",
"/aesthetic-services/smas-lifting-ultraformer-mpt": "SMAS Lifting Ultraformer MPT",
"/aesthetic-services/therapy-heleo4": "HELEO4 LED Therapy",
"/blog/botoks-mify-dozirovki": "Botox: myths, dosages and how long results last",
"/blog/harmony-xl-lazernaya-epilyaciya": "Photoepilation in Dubai: how many sessions and does it hurt",
"/blog/hifu-ili-hirurgicheskaya-podtyazhka": "HIFU/SMAS Lifting or Surgical Facelift: What to Choose",
"/blog/hydrafacial-ili-obychnaya-chistka": "HydraFacial or a regular facial: which works better",
"/blog/led-terapiya-heleo4": "LED and photodynamic therapy: how light heals the skin",
"/blog/virtue-rf-mikronidling": "RF Microneedling: Morpheus8, Genius and Virtue RF - What's the Difference",
"/blog/botox-for-sweating-hyperhidrosis": "Botox for sweating: how it works and how long it lasts",
"/blog/stretch-marks-c-section-scar-rf": "Stretch marks and a C-section scar: what RF microneedling can do",
"/blog/tesla-former-muscle-training": "Tesla Former: how EMS muscle training works without a gym",
"/blog/icoone-robotic-massage": "Icoone: how robotic massage for face and body works",
"/blog/nofilters-harmony-skin-rejuvenation": "NoFilters on Alma Harmony: how rejuvenation without filters works",
},
ru: {
"/beauty-services/podiatry": "Подология",
"/beauty-services/nail-service": "Ногтевой сервис",
"/beauty-services/hair-care": "Уход за волосами и трихология",
"/beauty-services/haircut-styling": "Стрижки и укладки",
"/beauty-services/hair-coloring": "Окрашивание волос",
"/blog/podologiya-kogda-nuzhen-podolog": "Подология: когда нужен подолог, а не мастер педикюра, и что он делает",
"/blog/plazmoterapiya-dlya-volos": "Плазмотерапия для волос: как PRP эффективна при выпадении, кому подходит и когда ждать результат",
"/blog/diagnostika-kozhi-golovy-heleo4-dubai": "Чек-ап кожи головы в Дубае: трихоскопия, пилинг и светотерапия HELEO4, почему уход за волосами начинается с кожи",
"/aesthetic-services/aesthetic-cosmetology": "Эстетическая косметология",
"/aesthetic-services/body-sculpting-tesla-former": "Tesla Former - EMS-тренировка мышц",
"/aesthetic-services/botox": "Ботокс в Sobha Hartland",
"/aesthetic-services/dermal-fillers": "Филлеры в Дубае",
"/aesthetic-services/lip-fillers": "Увеличение губ в Дубае",
"/aesthetic-services/harmony-xl": "Лазерная эпиляция Alma Harmony XL",
"/aesthetic-services/hydra-facial": "HydraFacial в Sobha Hartland",
"/aesthetic-services/lifting-virtue-rf": "RF-лифтинг Virtue RF",
"/aesthetic-services/lymphatic-drainage-icoone": "Лимфодренажный массаж Icoone",
"/aesthetic-services/massage-spa": "Массаж и SPA",
"/aesthetic-services/mens-menu": "Мужское меню",
"/aesthetic-services/non-surgical-liposuction-ulfit": "Безоперационная липосакция ULFIT",
"/aesthetic-services/smas-lifting-ultraformer-mpt": "SMAS-лифтинг Ultraformer MPT",
"/aesthetic-services/therapy-heleo4": "Фотодинамическая терапия HELEO4",
"/blog/botoks-mify-dozirovki": "Ботокс: мифы, дозировки и как долго держится эффект",
"/blog/harmony-xl-lazernaya-epilyaciya": "Фотоэпиляция в Дубае: сколько сеансов и больно ли",
"/blog/hifu-ili-hirurgicheskaya-podtyazhka": "HIFU/SMAS-лифтинг или хирургическая подтяжка: что выбрать",
"/blog/hydrafacial-ili-obychnaya-chistka": "HydraFacial или обычная чистка лица: что эффективнее",
"/blog/led-terapiya-heleo4": "LED и фотодинамическая терапия: как свет лечит кожу",
"/blog/virtue-rf-mikronidling": "RF-микронидлинг: Morpheus8, Genius и Virtue RF - в чём разница",
"/blog/botoks-ot-pota-podmyshki": "Ботокс от потливости: как это работает и сколько держится",
"/blog/virtue-rf-rastyazhki-posle-rodov": "Растяжки и шрам после кесарева: что может RF-микронидлинг",
"/blog/tesla-former-trenirovka-bez-sportzala": "Tesla Former: как работает EMS-тренировка мышц без спортзала",
"/blog/icoone-robotizirovannyj-massazh": "Icoone: как устроен роботизированный массаж лица и тела",
"/blog/nofilters-omolozhenie-harmony": "NoFilters на Alma Harmony: как устроено омоложение без фильтров"
}
};

/* английские версии тех же статей: слаги другие, поэтому на английских
страницах русский слаг подменяется своим. */
var POST_EN = {
"/blog/podologiya-kogda-nuzhen-podolog": "/blog/podiatry-when-to-see-a-podiatrist",
"/blog/plazmoterapiya-dlya-volos": "/blog/plasma-therapy-hair-loss",
"/blog/botoks-ot-pota-podmyshki": "/blog/botox-for-sweating-hyperhidrosis",
"/blog/virtue-rf-rastyazhki-posle-rodov": "/blog/stretch-marks-c-section-scar-rf",
"/blog/tesla-former-trenirovka-bez-sportzala": "/blog/tesla-former-muscle-training",
"/blog/icoone-robotizirovannyj-massazh": "/blog/icoone-robotic-massage",
"/blog/nofilters-omolozhenie-harmony": "/blog/nofilters-harmony-skin-rejuvenation",
};

var MAP = {
"/beauty-services/podiatry": {
rel: ["/beauty-services/nail-service", "/aesthetic-services/mens-menu", "/aesthetic-services/massage-spa"],
posts: ["/blog/podologiya-kogda-nuzhen-podolog"] },
"/beauty-services/hair-care": {
rel: ["/aesthetic-services/therapy-heleo4", "/beauty-services/hair-coloring", "/beauty-services/haircut-styling"],
posts: ["/blog/plazmoterapiya-dlya-volos", "/blog/diagnostika-kozhi-golovy-heleo4-dubai"] },
"/aesthetic-services/dermal-fillers": {
rel: ["/aesthetic-services/lip-fillers", "/aesthetic-services/botox", "/aesthetic-services/lifting-virtue-rf"],
posts: [] },
"/aesthetic-services/lip-fillers": {
rel: ["/aesthetic-services/dermal-fillers", "/aesthetic-services/botox", "/aesthetic-services/hydra-facial"],
posts: [] },
"/aesthetic-services/botox": {
rel: ["/aesthetic-services/dermal-fillers", "/aesthetic-services/lip-fillers", "/aesthetic-services/smas-lifting-ultraformer-mpt"],
posts: ["/blog/botoks-mify-dozirovki", "/blog/botoks-ot-pota-podmyshki"] },
"/aesthetic-services/harmony-xl": {
rel: ["/aesthetic-services/aesthetic-cosmetology", "/aesthetic-services/hydra-facial", "/aesthetic-services/mens-menu"],
posts: ["/blog/harmony-xl-lazernaya-epilyaciya", "/blog/nofilters-omolozhenie-harmony"] },
"/aesthetic-services/hydra-facial": {
rel: ["/aesthetic-services/aesthetic-cosmetology", "/aesthetic-services/therapy-heleo4", "/aesthetic-services/botox"],
posts: ["/blog/hydrafacial-ili-obychnaya-chistka"] },
"/aesthetic-services/smas-lifting-ultraformer-mpt": {
rel: ["/aesthetic-services/lifting-virtue-rf", "/aesthetic-services/botox", "/aesthetic-services/non-surgical-liposuction-ulfit"],
posts: ["/blog/hifu-ili-hirurgicheskaya-podtyazhka"] },
"/aesthetic-services/lifting-virtue-rf": {
rel: ["/aesthetic-services/smas-lifting-ultraformer-mpt", "/aesthetic-services/hydra-facial", "/aesthetic-services/therapy-heleo4"],
posts: ["/blog/virtue-rf-mikronidling", "/blog/virtue-rf-rastyazhki-posle-rodov"] },
"/aesthetic-services/therapy-heleo4": {
rel: ["/aesthetic-services/hydra-facial", "/aesthetic-services/lifting-virtue-rf", "/aesthetic-services/aesthetic-cosmetology"],
posts: ["/blog/led-terapiya-heleo4"] },
"/aesthetic-services/aesthetic-cosmetology": {
rel: ["/aesthetic-services/hydra-facial", "/aesthetic-services/botox", "/aesthetic-services/therapy-heleo4"],
posts: ["/blog/hydrafacial-ili-obychnaya-chistka"] },
"/aesthetic-services/non-surgical-liposuction-ulfit": {
rel: ["/aesthetic-services/body-sculpting-tesla-former", "/aesthetic-services/lymphatic-drainage-icoone", "/aesthetic-services/smas-lifting-ultraformer-mpt"],
posts: ["/blog/hifu-ili-hirurgicheskaya-podtyazhka"] },
"/aesthetic-services/body-sculpting-tesla-former": {
rel: ["/aesthetic-services/non-surgical-liposuction-ulfit", "/aesthetic-services/lymphatic-drainage-icoone", "/aesthetic-services/massage-spa"],
posts: ["/blog/tesla-former-trenirovka-bez-sportzala"] },
"/aesthetic-services/lymphatic-drainage-icoone": {
rel: ["/aesthetic-services/massage-spa", "/aesthetic-services/non-surgical-liposuction-ulfit", "/aesthetic-services/body-sculpting-tesla-former"],
posts: ["/blog/icoone-robotizirovannyj-massazh"] },
"/aesthetic-services/massage-spa": {
rel: ["/aesthetic-services/lymphatic-drainage-icoone", "/aesthetic-services/body-sculpting-tesla-former", "/aesthetic-services/aesthetic-cosmetology"],
posts: [] },
"/aesthetic-services/mens-menu": {
rel: ["/aesthetic-services/harmony-xl", "/aesthetic-services/botox", "/aesthetic-services/massage-spa"],
posts: [] }
};

var L = isRu
? { rel: "Похожие услуги", read: "Читайте в блоге" }
: { rel: "Related services", read: "Read in our blog" };

function url(p) { return (isRu ? "/ru" : "") + p; }
function title(p) { return (isRu ? T.ru : T.en)[p] || p; }

function fixRedirectLinks() {
var sel = Object.keys(REDIR).map(function (k) {
return 'a[href="' + k + '"],a[href="/ru' + k + '"],a[href$="' + k + '"]';
}).join(",");
Array.prototype.forEach.call(document.querySelectorAll(sel), function (a) {
var h = a.getAttribute("href") || "";
Object.keys(REDIR).forEach(function (from) {
if (h === from || h === "/ru" + from || h === location.origin + from) {
a.setAttribute("href", (h.indexOf("/ru") === 0 ? "/ru" : "") + REDIR[from]);
}
});
});
}

function injectBlock() {
var cfg = MAP[key];
if (!cfg) return;
if (document.getElementById("solar-related")) return;
var root = document.getElementById("allrecords");
if (!root) return;

var items = cfg.rel.map(function (p) {
return '<li style="margin:0 0 10px"><a href="' + url(p) + '" style="color:#4B1E35;text-decoration:none;border-bottom:1px solid #B8844A">' + title(p) + "</a></li>";
}).join("");

/* Статью показываем только если её заголовок есть в словаре текущего
языка: так ссылка не может уйти в 404. */
var dict = isRu ? T.ru : T.en;
var known = (cfg.posts || []).map(function (p) {
return isRu ? p : (POST_EN[p] || p);
}).filter(function (p) { return !!dict[p]; });
var post = known.length
? '<p style="margin:22px 0 0;font-size:15px;color:#4B1E35"><span style="color:#B8844A">' + L.read + ': </span>' +
known.map(function (p) {
return '<a href="' + url(p) + '" style="color:#4B1E35;border-bottom:1px solid #B8844A;text-decoration:none">' + title(p) + '</a>';
}).join('<span style="color:#B8844A"> - </span>') + '</p>'
: "";

var sec = document.createElement("div");
sec.id = "solar-related";
sec.setAttribute("data-record-type", "custom");
sec.style.cssText = "background:#FAF8F5;padding:44px 20px";
sec.innerHTML =
'<div style="max-width:960px;margin:0 auto;font-family:inherit">' +
'<h2 style="margin:0 0 18px;font-size:24px;font-weight:400;color:#4B1E35">' + L.rel + "</h2>" +
'<ul style="list-style:none;margin:0;padding:0;font-size:17px;line-height:1.5">' + items + "</ul>" +
post +
"</div>";

/* Куда вставлять. Шапка и футер в Tilda приходят из alias-страниц и
помечены data-alias-record-type, поэтому "перед первой alias" даёт
вставку НАД шапкой, а "перед последней записью" - под служебные
пустые блоки. Надёжный якорь: последняя своя (не-alias) запись
заметной высоты - это конец контента страницы. Проверено на
/aesthetic-services/botox и /ru/aesthetic-services/hydra-facial:
следом идёт запись футера "Contacts" / "Контакты". */
var recs = root.querySelectorAll(":scope > .r"), anchor = null;
for (var i = recs.length - 1; i >= 0; i--) {
if (!recs[i].hasAttribute("data-alias-record-type") && recs[i].offsetHeight > 200) {
anchor = recs[i]; break;
}
}
if (anchor && anchor.nextElementSibling) root.insertBefore(sec, anchor.nextElementSibling);
else root.appendChild(sec);
}

function run() { fixRedirectLinks(); injectBlock(); }

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
else run();
window.addEventListener("load", run);
})();
} catch (e) { if (window.console) console.error("solar-internal-links", e); }
try {
(function () {
var ORIGIN = "https://solar-beauty.ae";
var path = location.pathname.replace(/\/+$/, "") || "/";
var isRu = /^\/ru(\/|$)/.test(path);
var key  = path.replace(/^\/ru/, "") || "/";

/* соответствие слагов статей: русский - английский */
var PAIRS = {
"/blog/podologiya-kogda-nuzhen-podolog": "/blog/podiatry-when-to-see-a-podiatrist",
"/blog/plazmoterapiya-dlya-volos": "/blog/plasma-therapy-hair-loss",
"/blog/morpheus-8-ili-virtue-rf": "/blog/morpheus-8-ili-virtue-rf",
"/blog/lechenie-pigmentacii-harmony-dubai": "/blog/lechenie-pigmentacii-harmony-dubai",
"/blog/biorevitalizaciya-dubai": "/blog/biorevitalizaciya-dubai",
"/blog/diagnostika-kozhi-golovy-heleo4-dubai": "/blog/diagnostika-kozhi-golovy-heleo4-dubai",
"/blog/endosfera-terapiya-dubai": "/blog/endosfera-terapiya-dubai",
"/blog/bezinekcionnaya-mezoterapiya-dermadrop-dubai": "/blog/bezinekcionnaya-mezoterapiya-dermadrop-dubai",
"/blog/rf-lifting-kolenej-i-loktej-dubai": "/blog/rf-lifting-kolenej-i-loktej-dubai",
"/blog/botoks-mify-dozirovki": "/blog/botoks-mify-dozirovki",
"/blog/virtue-rf-mikronidling": "/blog/virtue-rf-mikronidling",
"/blog/hydrafacial-ili-obychnaya-chistka": "/blog/hydrafacial-ili-obychnaya-chistka",
"/blog/led-terapiya-heleo4": "/blog/led-terapiya-heleo4",
"/blog/harmony-xl-lazernaya-epilyaciya": "/blog/harmony-xl-lazernaya-epilyaciya",
"/blog/hifu-ili-hirurgicheskaya-podtyazhka": "/blog/hifu-ili-hirurgicheskaya-podtyazhka",
"/blog/botoks-ot-pota-podmyshki": "/blog/botox-for-sweating-hyperhidrosis",
"/blog/virtue-rf-rastyazhki-posle-rodov": "/blog/stretch-marks-c-section-scar-rf",
"/blog/tesla-former-trenirovka-bez-sportzala": "/blog/tesla-former-muscle-training",
"/blog/icoone-robotizirovannyj-massazh": "/blog/icoone-robotic-massage",
"/blog/nofilters-omolozhenie-harmony": "/blog/nofilters-harmony-skin-rejuvenation",
};
var EN2RU = {};
Object.keys(PAIRS).forEach(function (ru) { EN2RU[PAIRS[ru]] = ru; });

/* даты: когда статья вышла. Обновление берём одной датой для всех,
она же стоит в lastmod карты сайта. */
var UPDATED = "2026-08-08";
var PUBLISHED = {
"/blog/podologiya-kogda-nuzhen-podolog": "2026-10-17",
"/blog/plazmoterapiya-dlya-volos": "2026-10-17",
"/blog/morpheus-8-ili-virtue-rf": "2026-08-11",
"/blog/lechenie-pigmentacii-harmony-dubai": "2026-09-08",
"/blog/biorevitalizaciya-dubai": "2026-09-08",
"/blog/diagnostika-kozhi-golovy-heleo4-dubai": "2026-09-08",
"/blog/endosfera-terapiya-dubai": "2026-09-08",
"/blog/bezinekcionnaya-mezoterapiya-dermadrop-dubai": "2026-09-08",
"/blog/rf-lifting-kolenej-i-loktej-dubai": "2026-09-08",
"/blog/botoks-mify-dozirovki": "2026-07-29",
"/blog/virtue-rf-mikronidling": "2026-07-29",
"/blog/hydrafacial-ili-obychnaya-chistka": "2026-07-29",
"/blog/led-terapiya-heleo4": "2026-07-29",
"/blog/harmony-xl-lazernaya-epilyaciya": "2026-07-29",
"/blog/hifu-ili-hirurgicheskaya-podtyazhka": "2026-07-29",
"/blog/botoks-ot-pota-podmyshki": "2026-08-08",
"/blog/virtue-rf-rastyazhki-posle-rodov": "2026-08-08",
"/blog/tesla-former-trenirovka-bez-sportzala": "2026-08-08",
"/blog/icoone-robotizirovannyj-massazh": "2026-08-08",
"/blog/nofilters-omolozhenie-harmony": "2026-08-08",
};

/* заголовки статей для списка на хабе блога */
var POSTS = {
ru: [
["/blog/podologiya-kogda-nuzhen-podolog", "Подология: когда нужен подолог, а не мастер педикюра, и что он делает"],
["/blog/plazmoterapiya-dlya-volos", "Плазмотерапия для волос: как PRP эффективна при выпадении, кому подходит и когда ждать результат"],
["/blog/botoks-mify-dozirovki", "Ботокс: мифы, дозировки и как долго держится эффект"],
["/blog/botoks-ot-pota-podmyshki", "Ботокс от потливости: как это работает и сколько держится"],
["/blog/virtue-rf-mikronidling", "RF-микронидлинг: Morpheus8, Genius и Virtue RF - в чём разница"],
["RF-микронидлинг: какой аппарат выбрать и на что смотреть"],
["/blog/virtue-rf-rastyazhki-posle-rodov", "Растяжки и шрам после кесарева: что может RF-микронидлинг"],
["/blog/hifu-ili-hirurgicheskaya-podtyazhka", "HIFU/SMAS-лифтинг или хирургическая подтяжка: что выбрать"],
["/blog/nofilters-omolozhenie-harmony", "NoFilters на Alma Harmony: как устроено омоложение без фильтров"],
["/blog/harmony-xl-lazernaya-epilyaciya", "Фотоэпиляция в Дубае: сколько сеансов и больно ли"],
["/blog/hydrafacial-ili-obychnaya-chistka", "HydraFacial или обычная чистка лица: что эффективнее"],
["/blog/led-terapiya-heleo4", "LED и фотодинамическая терапия: как свет лечит кожу"],
["/blog/tesla-former-trenirovka-bez-sportzala", "Tesla Former: как работает EMS-тренировка мышц без спортзала"],
["/blog/icoone-robotizirovannyj-massazh", "Icoone: как устроен роботизированный массаж лица и тела"]
],
en: [
["/blog/podiatry-when-to-see-a-podiatrist", "Podiatry: when you need a podiatrist rather than a pedicure technician, and what they do"],
["/blog/plasma-therapy-hair-loss", "Plasma therapy for hair: how PRP works for hair loss, who it suits and when to expect results"],
["/blog/botoks-mify-dozirovki", "Botox: myths, dosages and how long results last"],
["/blog/botox-for-sweating-hyperhidrosis", "Botox for sweating: how it works and how long it lasts"],
["/blog/virtue-rf-mikronidling", "RF Microneedling: Morpheus8, Genius and Virtue RF - What's the Difference"],
["/blog/stretch-marks-c-section-scar-rf", "Stretch marks and a C-section scar: what RF microneedling can do"],
["/blog/hifu-ili-hirurgicheskaya-podtyazhka", "HIFU/SMAS Lifting or Surgical Facelift: What to Choose"],
["/blog/nofilters-harmony-skin-rejuvenation", "NoFilters on Alma Harmony: how rejuvenation without filters works"],
["/blog/harmony-xl-lazernaya-epilyaciya", "Photoepilation in Dubai: how many sessions and does it hurt"],
["/blog/hydrafacial-ili-obychnaya-chistka", "HydraFacial or a regular facial: which works better"],
["/blog/led-terapiya-heleo4", "LED and photodynamic therapy: how light heals the skin"],
["/blog/tesla-former-muscle-training", "Tesla Former: how EMS muscle training works without a gym"],
["/blog/icoone-robotic-massage", "Icoone: how robotic massage for face and body works"]
]
};

var L = isRu ? {
home: "Главная", blog: "Блог", services: "Услуги",
toc: "Содержание", published: "Опубликовано", updated: "обновлено",
share: "Поделиться", copy: "Скопировать ссылку", copied: "Ссылка скопирована",
all: "Все статьи блога"
} : {
home: "Home", blog: "Blog", services: "Services",
toc: "Contents", published: "Published", updated: "updated",
share: "Share", copy: "Copy link", copied: "Link copied",
all: "All blog articles"
};

var MONTHS_RU = ["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"];
var MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];

function human(iso) {
var p = iso.split("-"), m = parseInt(p[1], 10) - 1;
return isRu ? (parseInt(p[2], 10) + " " + MONTHS_RU[m] + " " + p[0])
: (MONTHS_EN[m] + " " + parseInt(p[2], 10) + ", " + p[0]);
}
function url(p) { return ORIGIN + (isRu ? "/ru" : "") + p; }
function esc(s) { return String(s || "").replace(/\s+/g, " ").trim(); }

function addLd(obj) {
var s = document.createElement("script");
s.type = "application/ld+json";
s.setAttribute("data-solar", "1");
s.textContent = JSON.stringify(obj);
document.head.appendChild(s);
}

function addAlternate(hl, href) {
if (document.querySelector('link[rel="alternate"][hreflang="' + hl + '"]')) return;
var l = document.createElement("link");
l.rel = "alternate"; l.hreflang = hl; l.href = href;
document.head.appendChild(l);
}

/* --- 1. hreflang --- */
function hreflang() {
var ruPath = null, enPath = null;
if (/^\/blog\//.test(key)) {
ruPath = EN2RU[key] || (PAIRS[key] ? key : null);
if (!ruPath) return;
enPath = PAIRS[ruPath];
} else if (/^\/aesthetic-services/.test(key) || /^\/beauty-services/.test(key) || key === "/blog") {
ruPath = key; enPath = key;
} else {
return;
}
addAlternate("ru", ORIGIN + "/ru" + ruPath);
addAlternate("en", ORIGIN + enPath);
addAlternate("x-default", ORIGIN + enPath);
}

/* --- 2. хлебные крошки --- */
function breadcrumbs() {
var items = [{ "@type": "ListItem", position: 1, name: L.home, item: ORIGIN + (isRu ? "/ru" : "/") }];
var h1 = document.querySelector("h1");
if (/^\/blog\//.test(key)) {
items.push({ "@type": "ListItem", position: 2, name: L.blog, item: url("/blog") });
items.push({ "@type": "ListItem", position: 3, name: esc(h1 && h1.textContent), item: location.href.split("?")[0] });
} else if (key === "/blog") {
items.push({ "@type": "ListItem", position: 2, name: L.blog, item: url("/blog") });
} else if (/^\/aesthetic-services\//.test(key)) {
items.push({ "@type": "ListItem", position: 2, name: L.services, item: url("/aesthetic-services") });
items.push({ "@type": "ListItem", position: 3, name: esc(h1 && h1.textContent), item: location.href.split("?")[0] });
} else {
return;
}
addLd({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items });
}

/* --- 3. FAQ из текста статьи --- */
function collectFaq() {
var heads = [].slice.call(document.querySelectorAll("h2"));
var faqHead = null;
for (var i = 0; i < heads.length; i++) {
var t = esc(heads[i].textContent).toLowerCase();
if (t === "частые вопросы" || t === "frequently asked questions") { faqHead = heads[i]; break; }
}
if (!faqHead) return null;
var rec = faqHead.closest("[data-record-type]");
var scope = rec && rec.nextElementSibling ? rec.nextElementSibling : null;
/* блок вопросов - аккордеон Tilda (T585): вопрос в .t585__title, ответ в .t585__text */
var acc = scope ? scope.querySelectorAll(".t585__wrapper") : [];
if (acc.length) {
var o = [];
[].forEach.call(acc, function (w) {
var q = esc((w.querySelector(".t585__title") || {}).textContent), a = esc((w.querySelector(".t585__text") || {}).textContent);
if (q.length > 5 && a.length > 20) o.push({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } });
});
if (o.length) return o;
}
var ps = scope ? [].slice.call(scope.querySelectorAll("p")) : [];
var out = [];
ps.forEach(function (p, i) {
var strong = p.querySelector("strong, b");
if (!strong) return;
var q = esc(strong.textContent);
/* ответ бывает в том же абзаце после <br>, а бывает следующим абзацем */
var a = esc(p.textContent).replace(q, "").trim();
if (a.length < 20) {
var next = ps[i + 1];
if (next && !next.querySelector("strong, b")) a = esc(next.textContent);
}
if (q.length > 5 && a.length > 20) {
out.push({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } });
}
});
return out.length ? out : null;
}

/* --- 4. Article и FAQPage --- */
function articleLd() {
var h1 = document.querySelector("h1");
var desc = document.querySelector('meta[name="description"]');
var og = document.querySelector('meta[property="og:image"]');
var base = EN2RU[key] || key;
var pub = PUBLISHED[base] || UPDATED;
var art = {
"@context": "https://schema.org",
"@type": "Article",
headline: esc(h1 && h1.textContent),
description: esc(desc && desc.content),
inLanguage: isRu ? "ru" : "en",
datePublished: pub,
dateModified: (pub > UPDATED ? pub : UPDATED),
mainEntityOfPage: { "@type": "WebPage", "@id": location.href.split("?")[0] },
author: { "@type": "Organization", name: "SOLAR Beauty & Aesthetics Clinic", url: ORIGIN },
publisher: { "@type": "Organization", name: "SOLAR Beauty & Aesthetics Clinic", url: ORIGIN }
};
if (og && og.content) art.image = og.content;
addLd(art);
}

/* --- 5. Service на странице услуги --- */
function serviceLd() {
var h1 = document.querySelector("h1");
var desc = document.querySelector('meta[name="description"]');
addLd({
"@context": "https://schema.org",
"@type": "Service",
name: esc(h1 && h1.textContent),
description: esc(desc && desc.content),
serviceType: esc(h1 && h1.textContent),
areaServed: { "@type": "City", name: "Dubai" },
provider: {
"@type": "HealthAndBeautyBusiness",
name: "SOLAR Beauty & Aesthetics Clinic",
url: ORIGIN,
address: {
"@type": "PostalAddress",
addressLocality: "Dubai",
addressCountry: "AE",
streetAddress: "Sobha Hartland"
}
},
url: location.href.split("?")[0]
});
}

/* --- 6. даты, оглавление и кнопки поделиться --- */
function articleUi() {
if (document.getElementById("solar-meta-line")) return;
var h1 = document.querySelector("h1");
if (!h1) return;
var base = EN2RU[key] || key;
var pub = PUBLISHED[base];
if (!pub) return;

var line = document.createElement("div");
line.id = "solar-meta-line";
line.style.cssText = "max-width:960px;margin:14px auto 0;padding:0 20px;font-size:14px;color:#8a7a80";
line.textContent = L.published + " " + human(pub) + (UPDATED > pub ? ", " + L.updated + " " + human(UPDATED) : "");
var host = h1.closest("[data-record-type]") || h1.parentNode;
if (host && host.parentNode) host.parentNode.insertBefore(line, host.nextSibling);

/* оглавление: только по H2 самой статьи, служебные заголовки пропускаем */
var skip = ["другие процедуры solar", "other solar treatments", "бесплатная консультация в solar", "содержание", "contents"];
var hs = [].slice.call(document.querySelectorAll("h2")).filter(function (h) {
var t = esc(h.textContent);
return t.length > 3 && t.length < 90 && skip.indexOf(t.toLowerCase()) === -1;
});
if (hs.length >= 4) {
var ul = "";
hs.forEach(function (h, i) {
var id = "s" + (i + 1);
h.id = h.id || id;
ul += '<li style="margin:0 0 8px"><a href="#' + h.id + '" style="color:#4B1E35;text-decoration:none;border-bottom:1px solid #B8844A">' + esc(h.textContent) + "</a></li>";
});
var toc = document.createElement("nav");
toc.id = "solar-toc";
toc.style.cssText = "max-width:960px;margin:22px auto 0;padding:20px;background:#FAF8F5;border-radius:6px";
toc.innerHTML = '<div style="font-size:15px;color:#B8844A;margin:0 0 12px">' + L.toc + "</div>" +
'<ul style="list-style:none;margin:0;padding:0;font-size:16px;line-height:1.45">' + ul + "</ul>";
line.parentNode.insertBefore(toc, line.nextSibling);
}

/* поделиться */
var u = encodeURIComponent(location.href.split("?")[0]);
var t = encodeURIComponent(esc(h1.textContent));
var share = document.createElement("div");
share.id = "solar-share";
share.style.cssText = "max-width:960px;margin:28px auto 0;padding:0 20px;font-size:15px";
share.innerHTML = '<span style="color:#B8844A">' + L.share + ": </span>" +
'<a href="https://wa.me/?text=' + t + "%20" + u + '" target="_blank" rel="noopener" style="color:#4B1E35;border-bottom:1px solid #B8844A;text-decoration:none;margin-right:14px">WhatsApp</a>' +
'<a href="https://t.me/share/url?url=' + u + "&text=" + t + '" target="_blank" rel="noopener" style="color:#4B1E35;border-bottom:1px solid #B8844A;text-decoration:none;margin-right:14px">Telegram</a>' +
'<a href="#" id="solar-copy" style="color:#4B1E35;border-bottom:1px solid #B8844A;text-decoration:none">' + L.copy + "</a>";
var anchor = document.getElementById("solar-related");
if (anchor) anchor.parentNode.insertBefore(share, anchor);
else document.getElementById("allrecords") && document.getElementById("allrecords").appendChild(share);
var copy = document.getElementById("solar-copy");
if (copy) copy.addEventListener("click", function (e) {
e.preventDefault();
navigator.clipboard && navigator.clipboard.writeText(location.href.split("?")[0]);
copy.textContent = L.copied;
});
}

/* --- 7. список статей на хабе блога --- */
function blogIndex() {
if (document.getElementById("solar-blog-index")) return;
var root = document.getElementById("allrecords");
if (!root) return;
var list = isRu ? POSTS.ru : POSTS.en;
var items = list.map(function (p) {
return '<li style="margin:0 0 12px"><a href="' + (isRu ? "/ru" : "") + p[0] + '" style="color:#4B1E35;text-decoration:none;border-bottom:1px solid #B8844A">' + p[1] + "</a></li>";
}).join("");
var sec = document.createElement("div");
sec.id = "solar-blog-index";
sec.style.cssText = "background:#FAF8F5;padding:44px 20px";
sec.innerHTML = '<div style="max-width:960px;margin:0 auto">' +
'<h2 style="margin:0 0 18px;font-size:24px;font-weight:400;color:#4B1E35">' + L.all + "</h2>" +
'<ul style="list-style:none;margin:0;padding:0;font-size:17px;line-height:1.5">' + items + "</ul></div>";
var recs = root.querySelectorAll(":scope > .r"), anchor = null;
for (var i = recs.length - 1; i >= 0; i--) {
if (!recs[i].hasAttribute("data-alias-record-type") && recs[i].offsetHeight > 200) { anchor = recs[i]; break; }
}
if (anchor && anchor.nextElementSibling) root.insertBefore(sec, anchor.nextElementSibling);
else root.appendChild(sec);

addLd({
"@context": "https://schema.org",
"@type": "ItemList",
itemListElement: list.map(function (p, i) {
return { "@type": "ListItem", position: i + 1, url: ORIGIN + (isRu ? "/ru" : "") + p[0], name: p[1] };
})
});
}

/* Блоки Tilda дорисовываются скриптом, поэтому FAQ на первом проходе
может ещё не существовать. Каждая часть ставится ровно один раз,
а поиск FAQ повторяется, пока текст не появится. */
var done = { head:false, article:false, service:false, ui:false, index:false, faq:false };
var tries = 0;

function faqLd() {
if (done.faq) return true;
var faq = collectFaq();
if (!faq) return false;
addLd({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faq });
done.faq = true;
return true;
}

/* --- 8. alt контентных картинок ---
Осмысленного alt на сайте нет ни у одной картинки. Точный текст под
каждый файл потребовал бы ручной описи, поэтому alt строится из
заголовка страницы: для иллюстрации услуги это корректная подпись.
Файлы, которые встречаются сразу на нескольких страницах, получают
общий текст про клинику. Иконки интерфейса не трогаем. */
var COMMON = ["Rectangle_33", "Rectangle_44", "Rectangle_60", "Rectangle_63", "Rectangle_590",
"/1.jpg", "/2.jpg", "/11.jpg", "/12.jpg", "/20.jpg"];
var SKIP = [".svg", "Mask_group", "Online_Booking", "logo", "image_1.png"];

function altFor(src) {
for (var i = 0; i < SKIP.length; i++) if (src.indexOf(SKIP[i]) >= 0) return null;
for (var j = 0; j < COMMON.length; j++) {
if (src.indexOf(COMMON[j]) >= 0) {
return isRu ? "Клиника SOLAR Beauty & Aesthetics, Sobha Hartland, Дубай"
: "SOLAR Beauty & Aesthetics Clinic, Sobha Hartland, Dubai";
}
}
var h1 = document.querySelector("h1");
var t = esc(h1 && h1.textContent);
if (!t) return null;
return t + (isRu ? " - клиника SOLAR, Дубай" : " - SOLAR clinic, Dubai");
}

function imageAlt() {
var n = 0;
[].slice.call(document.querySelectorAll("img")).forEach(function (img) {
var src = img.getAttribute("data-original") || img.getAttribute("src") || "";
if (!src || src.indexOf("tildacdn") < 0) return;
if (esc(img.getAttribute("alt"))) return;
var a = altFor(src);
if (a) { img.setAttribute("alt", a); n++; }
});
[].slice.call(document.querySelectorAll(".t-bgimg")).forEach(function (d) {
var src = d.getAttribute("data-original") || "";
if (!src || d.getAttribute("aria-label")) return;
var a = altFor(src);
if (a) { d.setAttribute("role", "img"); d.setAttribute("aria-label", a); n++; }
});
return n;
}

/* --- 9. ссылки на карточки аппаратов ведут на страницы услуг ---
Карточки /park/* закрыты от индексации, но собирали ссылки со всего
сайта: вес уходил в тупик. Теперь ссылка ведёт на страницу услуги,
где та же технология уже описана и продаётся. Пользователю так тоже
полезнее: он попадает на процедуру, а не на карточку железа. */
var PARK = {
"harmony-xl": "/aesthetic-services/harmony-xl",
"zz-old-harmony-xl": "/aesthetic-services/harmony-xl",
"tesla-former": "/aesthetic-services/body-sculpting-tesla-former",
"ulfit": "/aesthetic-services/non-surgical-liposuction-ulfit",
"zz-old-ulfit": "/aesthetic-services/non-surgical-liposuction-ulfit",
"heleo4": "/aesthetic-services/therapy-heleo4",
"zz-old-heleo4": "/aesthetic-services/therapy-heleo4",
"icoon-laser": "/aesthetic-services/lymphatic-drainage-icoone",
"ultraformer-classys": "/aesthetic-services/smas-lifting-ultraformer-mpt",
"zz-old-ultraformer": "/aesthetic-services/smas-lifting-ultraformer-mpt",
"hydrafacial": "/aesthetic-services/hydra-facial",
"zz-old-hydrafacial": "/aesthetic-services/hydra-facial",
"virtue-rf": "/aesthetic-services/lifting-virtue-rf",
"zz-old-virtue-rf": "/aesthetic-services/lifting-virtue-rf",
"dermadrop-tda": "/aesthetic-services/aesthetic-cosmetology",
"skinova-pro": "/aesthetic-services/aesthetic-cosmetology",
"beautylizer": "/aesthetic-services/aesthetic-cosmetology",
"janus3": "/aesthetic-services/aesthetic-cosmetology",
"accent": "/aesthetic-services"
};

function parkLinks() {
var n = 0;
[].slice.call(document.querySelectorAll('a[href*="/park/"]')).forEach(function (a) {
var h = a.getAttribute("href") || "";
var m = h.match(/\/park\/([a-z0-9\-]+)/);
if (!m) return;
var target = PARK[m[1]];
if (!target) return;
a.setAttribute("href", (h.indexOf("/ru/") === 0 ? "/ru" : "") + target);
n++;
});
return n;
}

function run() {
try { imageAlt(); } catch (e) {}
try { parkLinks(); } catch (e) {}
if (!done.head) {
try { hreflang(); } catch (e) {}
try { breadcrumbs(); } catch (e) {}
done.head = true;
}
if (/^\/blog\//.test(key)) {
if (!done.article) { try { articleLd(); done.article = true; } catch (e) {} }
if (!done.ui) { try { articleUi(); done.ui = true; } catch (e) {} }
try { faqLd(); } catch (e) {}
} else if (key === "/blog") {
if (!done.index) { try { blogIndex(); done.index = true; } catch (e) {} }
} else if (/^\/aesthetic-services\//.test(key)) {
if (!done.service) { try { serviceLd(); done.service = true; } catch (e) {} }
try { faqLd(); } catch (e) {}
}
/* картинки подгружаются лениво, поэтому проходов делаем несколько */
if (tries < 8) { tries++; setTimeout(run, 1200); }
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run);
else run();
window.addEventListener("load", run);
})();
} catch (e) { if (window.console) console.error("solar-seo-extras", e); }
