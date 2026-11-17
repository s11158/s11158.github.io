# -*- coding: utf-8 -*-
"""Обратная перелинковка: для каждой опубликованной роли из data/ добавляет её чип в блок
"Похожие позиции" / "Related positions" старых (рукописных) страниц, указанных в её related. Идемпотентно, до 8 чипов в блоке."""
import json, glob, os, re, html
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CHIP = 'display:inline-block;border:1px solid #e6dccc;border-radius:100px;padding:8px 15px;font-size:14px;color:#6b6155;text-decoration:none;font-weight:600'
DATA = [json.load(open(f, encoding='utf-8')) for f in sorted(glob.glob(os.path.join(HERE, 'data', '*.json')))]
GEN = {d['slug'] for d in DATA}
n = 0
for d in DATA:
    for r in d['related']:
        if r in GEN:
            continue  # сгенерированные страницы получают перелинковку через gen.py
        for lang, pre in (('ru', ''), ('en', 'en/')):
            p = os.path.join(ROOT, pre, r, 'index.html')
            if not os.path.exists(p):
                continue
            s = open(p, encoding='utf-8').read()
            m = re.search(r'(>(?:Похожие позиции|Related positions)</div><div style="display:flex;flex-wrap:wrap;gap:10px">)(.*?)(</div>)', s, re.S)
            href = f'href="/{pre}{d["slug"]}/"'
            if not m or href in m.group(2) or m.group(2).count('<a ') >= 8:
                continue
            chip = f'<a {href} style="{CHIP}">{html.escape(d[lang]["name"])}</a>'
            s = s[:m.end(2)] + chip + s[m.end(2):]
            open(p, 'w', encoding='utf-8', newline='\n').write(s); n += 1
print('backlinks added', n)
