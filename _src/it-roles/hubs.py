# -*- coding: utf-8 -*-
"""Добавляет новые IT/digital роли в хабы roles/, sitemap.xml, llms.txt и перелинковку software-developer. Идемпотентно."""
import json, glob, os, re, html
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA = [json.load(open(f, encoding='utf-8')) for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), 'data', '*.json')))]
MKT = {'seo-specialist', 'ppc-specialist', 'media-buyer', 'brand-manager', 'product-marketing-manager', 'affiliate-marketing-manager',
       'copywriter', 'community-manager', 'influencer-marketing-manager', 'email-marketing-specialist', 'ux-writer', 'head-of-digital',
       'chief-commercial-officer', 'cbdo', 'ceo'}
CH = 'display:inline-block;border:1px solid #e6dccc;border-radius:100px;padding:9px 16px;font-size:14.5px;color:#6b6155;text-decoration:none;font-weight:600;background:#fff'
import datetime
TODAY = datetime.date.today().isoformat()
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf-8').read()
def wr(p, s): open(os.path.join(ROOT, p), 'w', encoding='utf-8', newline='\n').write(s)

NEWSEC = {'construction': ('Стройка, инжиниринг и обслуживание зданий', 'Construction, engineering and facilities'),
          'logistics': ('Логистика, закупки и склад', 'Logistics, procurement and warehouse'),
          'retail': ('Ритейл, авто и люкс', 'Retail, automotive and luxury'),
          'education': ('Образование, спорт и творчество', 'Education, fitness and creative')}
def hub(d):
    return d.get('hub') or ('salesmkt' if d['slug'] in MKT else 'tech')

for lang, pre in (('ru', ''), ('en', 'en/')):
    p = pre + 'roles/index.html'; s = rd(p)
    for sec in sorted({hub(d) for d in DATA}):
        if f'<section id="{sec}">' not in s:
            t = NEWSEC[sec][0 if lang == 'ru' else 1]
            blk = f'<section id="{sec}"><div class="wrap"><h2>{t}</h2><div style="display:flex;flex-wrap:wrap;gap:10px"></div></div></section>' + chr(10)
            i = s.index('<nav id="sitenav"'); s = s[:i] + blk + s[i:]
        m = re.search(r'(<section id="%s">.*?<div style="display:flex;flex-wrap:wrap;gap:10px">)(.*?)(</div>)' % sec, s, re.S)
        chips = ''.join(f'<a href="/{pre}{d["slug"]}/" style="{CH}">{html.escape(d[lang]["name"])}</a>'
                        for d in DATA if hub(d) == sec and f'href="/{pre}{d["slug"]}/"' not in m.group(2))
        s = s[:m.end(2)] + chips + s[m.end(2):]
    wr(p, s)

sm = rd('sitemap.xml'); add = ''
for d in DATA:
    for u in (f'https://tlnt.ae/en/{d["slug"]}/', f'https://tlnt.ae/{d["slug"]}/'):
        if f'<loc>{u}</loc>' not in sm:
            add += f'  <url><loc>{u}</loc><lastmod>{TODAY}</lastmod></url>\n'
wr('sitemap.xml', sm.replace('</urlset>', add + '</urlset>'))

ll = rd('llms.txt'); anchor = ll.index('\n', ll.index('](https://tlnt.ae/software-developer/)')) + 1; add = ''
for d in DATA:
    for lang, pre in (('en', 'en/'), ('ru', '')):
        u = f'https://tlnt.ae/{pre}{d["slug"]}/'
        if f']({u})' not in ll:
            add += f'- [{d[lang]["title"].replace(" | TLNT", "")}]({u}): {d[lang]["desc"]}\n'
wr('llms.txt', ll[:anchor] + add + ll[anchor:])
print('hubs ok', len(DATA))

# --- отраслевые гайды: попадают в sitemap, llms.txt и каталог гайдов, когда страница уже лежит на диске ---
GUIDES = ['hiring-real-estate-brokers-dubai', 'hotel-restaurant-staffing-dubai', 'hiring-retail-luxury-staff-dubai',
          'hiring-finance-compliance-staff-dubai', 'hiring-teachers-dubai-khda', 'hiring-engineers-construction-dubai',
          'hiring-logistics-warehouse-staff-dubai', 'hiring-tech-talent-dubai']
GL = 'display:block;padding:11px 0;border-top:1px solid #f1ebe1;color:#6b6155;font-weight:600;text-decoration:none;font-size:15.5px'
def meta(p):
    s = rd(p)
    t = re.search(r'<title>(.*?)</title>', s, re.S).group(1).strip()
    d = re.search(r'<meta name="description" content="(.*?)"', s, re.S).group(1)
    return html.unescape(t).replace(' | TLNT', '').replace('TLNT.ae - ', ''), html.unescape(d)
sm, ll = rd('sitemap.xml'), rd('llms.txt'); smadd = lladd = ''
for g in GUIDES:
    for pre in ('', 'en/'):
        p = f'{pre}guides/{g}/index.html'
        if not os.path.exists(os.path.join(ROOT, p)):
            continue
        u = f'https://tlnt.ae/{pre}guides/{g}/'; t, d = meta(p)
        if f'<loc>{u}</loc>' not in sm: smadd += f'  <url><loc>{u}</loc><lastmod>{TODAY}</lastmod></url>\n'
        if f']({u})' not in ll: lladd += f'- [{t}]({u}): {d}\n'
        hp = f'{pre}guides/index.html'; hs = rd(hp)
        if f'href="/{pre}guides/{g}/"' not in hs:
            m = re.search(r'<section id="hiring"><div class="wrap"><h2>[^<]*</h2>', hs)
            hs = hs[:m.end()] + f'<a href="/{pre}guides/{g}/" style="{GL}">{html.escape(t)}</a>' + hs[m.end():]
            wr(hp, hs)
wr('sitemap.xml', sm.replace('</urlset>', smadd + '</urlset>'))
if lladd:
    a = ll.index('\n', ll.index('](https://tlnt.ae/software-developer/)')) + 1
    wr('llms.txt', ll[:a] + lladd + ll[a:])
print('guides ok')
