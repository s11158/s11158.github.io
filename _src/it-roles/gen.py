# -*- coding: utf-8 -*-
"""Генератор страниц ролей IT/digital по шаблону software-developer (RU в корне, EN в en/).
Данные: _src/it-roles/data/<slug>.json. Запуск: python _src/it-roles/gen.py"""
import json, re, glob, os, html
from urllib.parse import quote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TPL = {'ru': open(os.path.join(ROOT, 'software-developer/index.html'), encoding='utf-8').read(),
       'en': open(os.path.join(ROOT, 'en/software-developer/index.html'), encoding='utf-8').read()}
E = html.escape
CHIP = 'display:inline-block;border:1px solid #e6dccc;border-radius:100px;padding:8px 15px;font-size:14px;color:#6b6155;text-decoration:none;font-weight:600'
GL = 'display:block;padding:12px 0;border-top:1px solid #f1ebe1;color:#6b6155;font-weight:600;text-decoration:none;font-size:15px'

L = {
 'ru': dict(pre='', home='/', check_h='Что проверить <em>перед наймом</em>', who='Кого помогаем найти', sal='Зарплаты в Дубае',
            lvl='Уровень', aed='Зарплата, AED/мес.', cost='Стоимость найма <em>в Дубае</em>', faq='Частые вопросы',
            tell='Расскажите о вакансии', jobs='Ищете работу?', rel='Похожие позиции',
            cost_lead='Кроме зарплаты работодатель оплачивает разрешение на работу и визу, медосмотр, Emirates ID и обязательную медицинскую страховку. По закону ОАЭ эти расходы нельзя удерживать из зарплаты сотрудника.',
            pills=['Первый шорт-лист в среднем за 2 дня', 'Фиксированное вознаграждение по роли', '10% от вознаграждения на старте', 'Бесплатная замена, если не сложилось', 'Шорт-лист из нашей живой базы'],
            cost_small='Точные расходы на визу и страховку зависят от категории компании, эмирата и тарифа. Подробнее в <a href="/guides/cost-of-hiring-dubai/" style="color:var(--accent);font-weight:600">гайде о стоимости найма</a>, или попросите нас посчитать бюджет под вашу ситуацию.',
            tell_lead='Бесплатный разбор за 15 минут: зарплата, требования и сроки под ваш бизнес.',
            emp_btn='Я работодатель: написать в WhatsApp', links='<a href="/calculator/">Калькулятор</a><a href="/salary-index-2026/">Индекс зарплат 2026</a><a href="/">Все услуги</a>',
            seek_p='Пришлите резюме. Для кандидатов это бесплатно: сохраним его в базе и напишем, когда у работодателя появится вакансия по вашему профилю.',
            cv='/candidates/', cv_btn='Отправить резюме', job_btn='Я ищу работу: написать в WhatsApp', cta_find='Найти специалиста',
            guides=[('/guides/how-to-hire-staff-dubai/', 'Как нанять сотрудника в Дубае'), ('/guides/work-visa-hiring-dubai/', 'Рабочая виза при найме'), ('/salary-index-2026/', 'Индекс зарплат Дубая 2026')],
            fee_q='Сколько стоит поиск через TLNT?',
            fee_a='Вознаграждение фиксированное, сумму по роли называем до старта поиска: 10% от вознаграждения на старте, остальное когда сотрудник вышел на работу. Если не сложилось, бесплатно найдём замену в течение 1 месяца после выхода сотрудника. Решение о найме принимает работодатель.',
            svc='Поиск и оценка кандидатов: ', bc=': поиск и найм', crumb='TLNT · Найм · {} · Дубай',
            wa_emp='Здравствуйте! Ищем специалиста в Дубае: {}', wa_job='Здравствуйте! Ищу работу в Дубае, специальность: {}'),
 'en': dict(pre='/en', home='/en/', check_h='What to check <em>before you hire</em>', who='Who we help you find', sal='Salaries in Dubai',
            lvl='Level', aed='Salary, AED/month', cost='Cost of hiring <em>in Dubai</em>', faq='FAQ',
            tell='Tell us about the role', jobs='Looking for a job?', rel='Related positions',
            cost_lead='On top of salary, the employer pays for the work permit and visa, medical test, Emirates ID and mandatory health insurance. Under UAE law these costs cannot be deducted from the employee\'s salary.',
            pills=['First shortlist in 2 days on average', 'Fixed fee per role', '10% of the fee at the start', 'Free replacement if it does not work out', 'Shortlist from our live database'],
            cost_small='Exact visa and insurance costs depend on company category, emirate and plan. See the <a href="/en/guides/cost-of-hiring-dubai/" style="color:var(--accent);font-weight:600">full cost of hiring guide</a> or ask us for a budget for your case.',
            tell_lead='Free 15-minute review: salary, requirements and timing for your business.',
            emp_btn="I'm hiring: message us on WhatsApp", links='<a href="/en/calculator/">Calculator</a><a href="/en/salary-index-2026/">Salary Index 2026</a><a href="/en/">All services</a>',
            seek_p='Send us your CV. It is free for candidates: we keep it in our database and reach out when an employer has a role that fits your profile.',
            cv='/en/candidates/', cv_btn='Send my CV', job_btn="I'm looking for a job: WhatsApp us", cta_find='Hire this specialist',
            guides=[('/en/guides/how-to-hire-staff-dubai/', 'How to hire staff in Dubai'), ('/en/guides/work-visa-hiring-dubai/', 'Work visa when hiring'), ('/en/salary-index-2026/', 'Dubai Salary Index 2026')],
            fee_q='How much does a search through TLNT cost?',
            fee_a='The fee is fixed and agreed per role before the search starts: 10% of the fee at the start, the rest once the employee has started work. If it does not work out, we find a free replacement within 1 month of the start date. The employer makes the hiring decision.',
            svc='Hiring support: ', bc=' hiring', crumb='TLNT · Hiring · {} · Dubai',
            wa_emp="Hello! I'm looking for a specialist in Dubai: {}", wa_job="Hello! I'm looking for a job in Dubai, role: {}"),
}


HUB_GUIDE = {'salesmkt': 'hiring-real-estate-brokers-dubai', 'hospitality': 'hotel-restaurant-staffing-dubai',
             'retail': 'hiring-retail-luxury-staff-dubai', 'finance': 'hiring-finance-compliance-staff-dubai',
             'education': 'hiring-teachers-dubai-khda', 'construction': 'hiring-engineers-construction-dubai',
             'logistics': 'hiring-logistics-warehouse-staff-dubai', 'tech': 'hiring-tech-talent-dubai'}


def hub_guide(d, lang):
    """Ссылка на отраслевой гайд роли, если гайд уже опубликован (лежит на диске)."""
    g = HUB_GUIDE.get(d.get('hub') or 'tech')
    p = os.path.join(ROOT, *([] if lang == 'ru' else ['en']), 'guides', g or '-', 'index.html')
    if not g or not os.path.exists(p):
        return []
    t = re.search(r'<title>(.*?)</title>', open(p, encoding='utf-8').read(), re.S).group(1)
    return [(f"{'/en' if lang == 'en' else ''}/guides/{g}/", E(html.unescape(t).replace(' | TLNT', '').replace('TLNT.ae - ', '')))]


def names(lang):
    """slug -> короткое имя роли (для чипов похожих позиций) из всех data-файлов."""
    out = {}
    for f in glob.glob(os.path.join(os.path.dirname(__file__), 'data', '*.json')):
        d = json.load(open(f, encoding='utf-8'))
        out[d['slug']] = d[lang]['name']
    return out


def page(d, lang, allnames):
    t, c, s = TPL[lang], d[lang], d['slug']
    l = L[lang]
    url = f"https://tlnt.ae{l['pre']}/{s}/"
    ru_url, en_url = f"https://tlnt.ae/{s}/", f"https://tlnt.ae/en/{s}/"
    head_end = t.index('<link rel="preconnect"')
    style_start = t.index('<link rel="preconnect"')
    org_line = re.search(r'<script type="application/ld\+json">\{"@context": "https://schema.org", "@type": "ProfessionalService".*?</script>', t).group(0)
    style_block = t[style_start:t.index(org_line)]
    analytics = re.search(r'\s*<script defer src="https://tlnt.ae/a.js".*?</script>', t).group(0)
    sitenav = t[t.index('<nav id="sitenav"'):]
    faqs = c['faq'] + [[l['fee_q'], l['fee_a']]]
    ld = lambda o: '<script type="application/ld+json">' + json.dumps(o, ensure_ascii=False) + '</script>'
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": lang,
              "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in faqs]}
    svc_ld = {"@context": "https://schema.org", "@type": "Service", "serviceType": "Hiring consultancy", "name": l['svc'] + c['name'],
              "areaServed": {"@type": "City", "name": "Dubai"}, "url": url, "provider": {"@type": "ProfessionalService", "name": "TLNT", "url": "https://tlnt.ae"}}
    bc_ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "TLNT", "item": "https://tlnt.ae" + l['home']},
        {"@type": "ListItem", "position": 2, "name": c['name'] + l['bc'], "item": url}]}
    other = 'en' if lang == 'ru' else 'ru'
    other_href = f"/{s}/" if lang == 'en' else f"/en/{s}/"
    title, desc = E(c['title']), E(c['desc'])
    h = f'''<!DOCTYPE html>
<html lang="{lang}">
<head>
<meta charset="UTF-8">
<meta name="color-scheme" content="light">
<meta name="theme-color" content="#fbf8f3">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en" href="{en_url}">
<link rel="alternate" hreflang="ru" href="{ru_url}">
<link rel="alternate" hreflang="x-default" href="{en_url}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="https://tlnt.ae/og-image.png">
{style_block}{org_line}
{ld(faq_ld)}
{ld(svc_ld)}
{ld(bc_ld)}{analytics}
</head>
<body>
<nav><div class="wrap"><div class="logo"><b>TLNT</b></div><div class="navr"><a class="lang" href="{other_href}">{other.upper()}</a><a class="back" href="{l['home']}">{'Все услуги' if lang == 'ru' else 'All services'}</a></div></div></nav>

<header>
  <div class="wrap">
    <div class="crumb">{E(l['crumb'].format(c['name']))}</div>
    <h1>{E(c['h1'])} <em>{E(c['h1em'])}</em></h1>
    <p>{E(c['intro'])}</p>
    <a class="cta" href="#start">{l['cta_find']}</a><a class="ghost" href="#jobs">{l['jobs']}</a>
  </div>
</header>

<section>
  <div class="wrap">
    <h2>{l['who']}</h2>
    <p class="lead">{E(c['find_lead'])}</p>
    <ul class="check">
''' + ''.join(f'      <li>{E(x)}</li>\n' for x in c['find']) + f'''    </ul>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>{l['check_h']}</h2>
    <p class="lead">{E(c['check_lead'])}</p>
    <div class="lic">
''' + ''.join(f'      <div class="step"><div class="num">{i}</div><div><b>{E(b)}</b>: {E(x)}</div></div>\n' for i, (b, x) in enumerate(c['steps'], 1)) + f'''    </div>
    <p class="small">{E(c['mistake'])}</p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>{l['sal']}</h2>
    <table>
      <tr><th>{l['lvl']}</th><th>{l['aed']}</th></tr>
''' + ''.join(f'      <tr><td>{E(a)}</td><td class="v">{E(b)}</td></tr>\n' for a, b in c['sal']) + f'''    </table>
    <p class="small">{E(c['sal_note'])}</p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>{l['cost']}</h2>
    <p class="lead">{l['cost_lead']}</p>
    <div>
''' + ''.join(f'      <span class="pill">{p}</span>\n' for p in l['pills']) + f'''    </div>
    <p class="small">{l['cost_small']}</p>
  </div>
</section>

<section>
  <div class="wrap">
    <h2>{l['faq']}</h2>
''' + ''.join(f'    <details{" open" if i == 0 else ""}><summary>{E(q)}</summary><p>{E(a)}</p></details>\n' for i, (q, a) in enumerate(faqs)) + f'''  </div>
</section>

<section id="start" class="endcta">
  <div class="wrap">
    <h2>{l['tell']}</h2>
    <p class="lead" style="max-width:480px;margin:0 auto 8px">{l['tell_lead']}</p>
    <a class="cta" href="https://wa.me/971509851420?text={quote(l['wa_emp'].format(c['name']))}">{l['emp_btn']}</a>
    <div class="links">{l['links']}</div>
  </div>
</section>

<section id="jobs">
  <div class="wrap">
    <div class="seek">
      <h2 style="margin-bottom:10px">{E(c['seek_h2'])}</h2>
      <p class="lead" style="margin-bottom:0">{l['seek_p']}</p>
      <a class="cta" href="{l['cv']}">{l['cv_btn']}</a><a class="ghost" href="https://wa.me/971509851420?text={quote(l['wa_job'].format(c['name']))}">{l['job_btn']}</a>
    </div>
  </div>
</section>

<section style="max-width:720px;margin:0 auto;padding:6px 22px 30px"><div style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#7a7266;margin-bottom:14px">{l['rel']}</div><div style="display:flex;flex-wrap:wrap;gap:10px">''' + ''.join(
        f'<a href="{l["pre"]}/{r}/" style="{CHIP}">{E(allnames[r])}</a>' for r in d['related'] if r in allnames) + '</div><div style="margin-top:20px">' + ''.join(
        f'<a href="{u}" style="{GL}">{n}</a>' for u, n in hub_guide(d, lang) + l['guides']) + '</div></section>\n' + sitenav
    for ch in [chr(c) for c in (0x2014, 0x2013, 0x2192, 0xbb, 0xab)]:
        assert ch not in h.replace(sitenav, ''), (s, lang, repr(ch))
    return h


def existing_names(lang):
    """Имена уже существующих ролей для чипов (из h1-крошек их страниц)."""
    out = {}
    base = ROOT if lang == 'ru' else os.path.join(ROOT, 'en')
    for p in glob.glob(os.path.join(base, '*', 'index.html')):
        txt = open(p, encoding='utf-8').read(4000 * 10)
        m = re.search(r'<div class="crumb">TLNT · (?:Найм|Hiring) · (.*?) · (?:Дубай|Dubai)</div>', txt)
        if m:
            out[os.path.basename(os.path.dirname(p))] = html.unescape(m.group(1))
    return out


if __name__ == '__main__':
    for lang in ('ru', 'en'):
        alln = existing_names(lang); alln.update(names(lang))
        for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), 'data', '*.json'))):
            d = json.load(open(f, encoding='utf-8'))
            out = os.path.join(ROOT, *([] if lang == 'ru' else ['en']), d['slug'], 'index.html')
            os.makedirs(os.path.dirname(out), exist_ok=True)
            open(out, 'w', encoding='utf-8', newline='\n').write(page(d, lang, alln))
            print('ok', lang, d['slug'])
