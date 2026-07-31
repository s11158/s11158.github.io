# -*- coding: utf-8 -*-
"""Правка ошибки скина: плам был фоном (подвал/тёмные ленты/CTA) — на живом сайте
плам только ТЕКСТ. Тёмные фоны -> #210312, CTA -> плоское золото #bda07a, без градиентов."""
import sys, io, pathlib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = pathlib.Path(r'C:\Users\LENOVO\Downloads\tlnt-home\solar')
REPL = [
    ('--dark:#4b1e35', '--dark:#210312'),
    ('linear-gradient(135deg,#60384b,#3a1729)', '#bda07a'),
    ('linear-gradient(150deg,#60384b,#4b1e35 55%,#3a1729)', '#bda07a'),
    ('linear-gradient(155deg,#60384b,#4b1e35 62%,#3a1729)', '#ecddcc'),
    ('#d8bcc9', '#f9eddd'),
    ('#c9a9b8', '#f9eddd'),
]
done = 0
for f in sorted(ROOT.rglob('index.html')):
    if 'design-code' in str(f) or 'hydrafacial-ru' in str(f):
        continue
    html = f.read_text(encoding='utf-8')
    orig = html
    for old, new in REPL:
        html = html.replace(old, new)
    if html != orig:
        f.write_text(html, encoding='utf-8')
        done += 1
print('fixed:', done)
