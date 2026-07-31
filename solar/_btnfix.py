# -*- coding: utf-8 -*-
"""Второй проход: фирменные золотые кнопки SOLAR на всех страницах solar/."""
import sys, io, pathlib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = pathlib.Path(r'C:\Users\LENOVO\Downloads\tlnt-home\solar')
MARK = '/* solar-btn-override */'
BLOCK = ("\n  " + MARK +
         ".btn{background:var(--gold);border-color:var(--gold);color:#fff;"
         "font-family:'SerifPro',Georgia,serif;font-weight:600}"
         ".btn:hover{background:#c18e52;border-color:#c18e52;color:#fff}"
         ".btn-light{background:transparent;color:var(--ink);border-color:var(--ink)}"
         ".btn-light:hover{background:var(--ink);color:#fff}\n")

done, skip = 0, 0
for f in sorted(ROOT.rglob('index.html')):
    rel = f.relative_to(ROOT).as_posix()
    if rel.startswith('near-me-ru') or rel.startswith('hydrafacial-ru'):
        skip += 1; continue
    html = f.read_text(encoding='utf-8')
    if MARK in html or '</style>' not in html:
        skip += 1; continue
    html = html.replace('</style>', BLOCK + '</style>', 1)
    f.write_text(html, encoding='utf-8')
    done += 1
print('btn override added:', done, '| skipped:', skip)
