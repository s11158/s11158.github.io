# -*- coding: utf-8 -*-
"""Добавляет новые IT/digital роли в хабы roles/, sitemap.xml, llms.txt и перелинковку software-developer. Идемпотентно."""
import json, glob, os, re, html
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
DATA = [json.load(open(f, encoding='utf-8')) for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), 'data', '*.json')))]
MKT = {'seo-specialist', 'ppc-specialist', 'media-buyer', 'brand-manager', 'product-marketing-manager', 'affiliate-marketing-manager',
       'copywriter', 'community-manager', 'influencer-marketing-manager', 'email-marketing-specialist', 'ux-writer', 'head-of-digital',
       'chief-commercial-officer', 'cbdo', 'ceo'}
CH = 'display:inline-block;border:1px solid #e6dccc;border-radius:100px;padding:9px 16px;font-size:14.5px;color:#6b6155;text-decoration:none;font-weight:600;background:#fff'
TODAY = '2026-11-17'
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf-8').read()
def wr(p, s): open(os.path.join(ROOT, p), 'w', encoding='utf-8', newline='\n').write(s)

for lang, pre in (('ru', ''), ('en', 'en/')):
    p = pre + 'roles/index.html'; s = rd(p)
    for sec, keep in (('tech', lambda x: x not in MKT), ('salesmkt', lambda x: x in MKT)):
        m = re.search(r'(<section id="%s">.*?<div style="display:flex;flex-wrap:wrap;gap:10px">)(.*?)(</div>)' % sec, s, re.S)
        chips = ''.join(f'<a href="/{pre}{d["slug"]}/" style="{CH}">{html.escape(d[lang]["name"])}</a>'
                        for d in DATA if keep(d['slug']) and f'href="/{pre}{d["slug"]}/"' not in m.group(2))
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
