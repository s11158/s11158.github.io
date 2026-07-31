# -*- coding: utf-8 -*-
"""Перевод всех страниц solar/ на фирменный скин solar-beauty.ae.
Карта замен снята с живого сайта (SerifPro/Geist с Tilda CDN проекта, плам/золото/крем).
Идемпотентен: страницы, где уже есть SerifPro, пропускаются."""
import re, sys, io, pathlib
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

ROOT = pathlib.Path(r'C:\Users\LENOVO\Downloads\tlnt-home\solar')
SKIP = {'near-me-ru'}  # уже в скине

FONTFACE = """
  /* ===== SOLAR brand fonts (same CDN files as solar-beauty.ae) ===== */
  @font-face{font-family:'SerifPro';src:url('https://static.tildacdn.net/tild3636-6363-4232-a461-653734356134/SourceSerifPro-Light.woff') format('woff');font-weight:300;font-display:swap}
  @font-face{font-family:'SerifPro';src:url('https://static.tildacdn.net/tild6562-6266-4932-b233-326537346566/SourceSerifPro-Regul.woff') format('woff');font-weight:400;font-display:swap}
  @font-face{font-family:'SerifPro';src:url('https://static.tildacdn.net/tild6232-6433-4262-a534-626164306232/SourceSerifPro-SemiB.woff') format('woff');font-weight:600;font-display:swap}
  @font-face{font-family:'Geist';src:url('https://static.tildacdn.net/tild6636-6631-4133-b230-326266646261/Geist-Light.woff') format('woff');font-weight:300;font-display:swap}
  @font-face{font-family:'Geist';src:url('https://static.tildacdn.net/tild6331-6538-4836-b337-303438643866/Geist-Regular.woff') format('woff');font-weight:400;font-display:swap}
  @font-face{font-family:'Geist';src:url('https://static.tildacdn.net/tild6235-3638-4261-b832-656336376665/Geist-Medium.woff') format('woff');font-weight:500;font-display:swap}
  @font-face{font-family:'Geist';src:url('https://static.tildacdn.net/tild6666-3362-4536-a534-396631303135/Geist-SemiBold.woff') format('woff');font-weight:600;font-display:swap}
"""

LOGO_IMG = '<img src="https://static.tildacdn.net/tild3939-3234-4365-b239-373261353164/image_1.png" alt="SOLAR" style="height:28px;vertical-align:middle;display:inline-block">'

# Литеральные цвета старого скина -> новые (порядок важен: длинные/специфичные раньше)
COLOR_MAP = [
    ('#faf7f2', '#faf8f5'),  # фон
    ('#1c1a17', '#4b1e35'),  # чернила -> плам
    ('#1c1a14', '#60384b'),  # тёмный градиент 1
    ('#332b1d', '#3a1729'),  # тёмный градиент 2
    ('#16140f', '#4b1e35'),  # тёмный -> плам
    ('#6f6a62', '#60384b'),  # muted -> плам-мутед
    ('#e8e1d6', '#ede3db'),  # линии
    ('#b8893f', '#bda07a'),  # золото
    ('#f3ead9', '#f4ede7'),  # золото-софт -> беж
    ('#e7d6b6', '#ebdfd2'),  # борды карточек
    ('#42403a', '#383135'),  # текст
    ('#efe9df', '#f9eddd'),  # светлый на тёмном
    ('#b9b2a4', '#c9a9b8'),  # secondary на тёмном
    ('#c9c0b0', '#d8bcc9'),  # cta muted
    ('#a59c8c', '#c9a9b8'),  # плейсхолдеры на тёмном
    ('#9a948a', '#9b7d8d'),  # дисклеймер
]

FONT_PATTERNS = [
    # тело: любые вариации Helvetica Neue стека -> Geist
    (re.compile(r'font-family:\s*"Helvetica Neue"[^;}]*'), "font-family:'Geist',Arial,sans-serif"),
    # заголовки: Georgia стеки -> SerifPro
    (re.compile(r'font-family:\s*Georgia,\s*"Times New Roman",\s*serif'), "font-family:'SerifPro',Georgia,serif"),
    (re.compile(r'font-family:\s*Georgia,\s*serif'), "font-family:'SerifPro',Georgia,serif"),
]

# вес заголовков 600 -> 400 только в правиле h1..h3/h4 сразу после SerifPro
HEAD_W = re.compile(r"(h1,h2,h3(?:,h4)?\{font-family:'SerifPro',Georgia,serif;font-weight:)600")
RADIUS_ROOT = re.compile(r'(--radius:\s*)\d+px')
PILL = re.compile(r'border-radius:\s*100px')
LOGO_TXT = re.compile(r'>S<span>O</span>LAR<')

changed, skipped, errors = [], [], []
for f in sorted(ROOT.rglob('index.html')):
    rel = f.relative_to(ROOT).as_posix()
    if rel.split('/')[0] in SKIP:
        skipped.append(rel + ' (already skinned)')
        continue
    html = f.read_text(encoding='utf-8')
    if "'SerifPro'" in html or '"SerifPro"' in html:
        skipped.append(rel + ' (has SerifPro)')
        continue
    orig = html
    n = 0
    for old, new in COLOR_MAP:
        c = html.count(old) + html.count(old.upper())
        if c:
            html = html.replace(old, new).replace(old.upper(), new)
            n += c
    for pat, repl in FONT_PATTERNS:
        html, k = pat.subn(repl, html)
        n += k
    html, k = HEAD_W.subn(r'\g<1>400', html); n += k
    html, k = RADIUS_ROOT.subn(r'\g<1>3px', html); n += k
    html, k = PILL.subn('border-radius:3px', html); n += k
    html, k = LOGO_TXT.subn('>' + LOGO_IMG + '<', html); n += k
    # вставка шрифтов после первого <style>
    i = html.find('<style>')
    if i >= 0:
        html = html[:i+7] + FONTFACE + html[i+7:]
        n += 1
    if html != orig:
        f.write_text(html, encoding='utf-8')
        changed.append(f'{rel}: {n} replacements')
    else:
        skipped.append(rel + ' (no matches!)')

print('CHANGED', len(changed))
for c in changed: print(' ', c)
print('SKIPPED', len(skipped))
for s in skipped: print(' ', s)
