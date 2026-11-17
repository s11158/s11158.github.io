# -*- coding: utf-8 -*-
"""Публикует следующую волну ролевых страниц tlnt.ae. Запускается по расписанию на сервере TLNT (schedule.yaml: tlnt-role-waves).

Очередь: _src/it-roles/queue/waveN/ - в ней data/*.json (роли) и pages/** (готовые статьи, копируются в корень сайта как есть).
Шаг: git pull, взять наименьшую waveN, перенести json в data/, скопировать pages/, gen.py + hubs.py + backlinks.py,
закоммитить, запушить, дождаться живого сайта (200 на все новые URL), записать published.log.
Ошибка - ненулевой код выхода (OnFailure=tlnt-alert@ шлёт тревогу)."""
import os, sys, glob, shutil, subprocess, time, urllib.request, json, datetime

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
Q = os.path.join(HERE, 'queue')


def sh(*a):
    print('$', ' '.join(a), flush=True)
    subprocess.run(a, cwd=ROOT, check=True)


def live(url):
    try:
        with urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'tlnt-wave-check'}), timeout=20) as r:
            return r.status
    except Exception as e:
        return getattr(e, 'code', 0)


def main(dry=False):
    sh('git', 'pull', '--rebase', '--autostash', '-q')
    pl = os.path.join(HERE, 'published.log')
    if os.path.exists(pl) and not dry:
        last = open(pl, encoding='utf-8').read().strip().splitlines()[-1][:10]
        gap = (datetime.date.today() - datetime.date.fromisoformat(last)).days
        if gap < 6:
            print(f'прошлая волна {last}, прошло {gap} дн. - ждём минимум 6'); return
    waves = sorted(glob.glob(os.path.join(Q, 'wave*')), key=lambda p: int(p.rsplit('wave', 1)[1]))
    if not waves:
        print('очередь пуста, публиковать нечего'); return
    w = waves[0]; name = os.path.basename(w)
    roles = sorted(glob.glob(os.path.join(w, 'data', '*.json')))
    pages = [p for p in glob.glob(os.path.join(w, 'pages', '**', '*'), recursive=True) if os.path.isfile(p)]
    urls = []
    for f in roles:
        slug = json.load(open(f, encoding='utf-8'))['slug']
        shutil.move(f, os.path.join(HERE, 'data', os.path.basename(f)))
        urls += [f'https://tlnt.ae/{slug}/', f'https://tlnt.ae/en/{slug}/']
    for p in pages:
        rel = os.path.relpath(p, os.path.join(w, 'pages'))
        dst = os.path.join(ROOT, rel); os.makedirs(os.path.dirname(dst), exist_ok=True)
        shutil.copyfile(p, dst)
        if rel.replace('\\', '/').endswith('index.html'):
            urls.append('https://tlnt.ae/' + rel.replace('\\', '/')[:-len('index.html')])
    for s in ('gen.py', 'hubs.py', 'backlinks.py'):
        sh(sys.executable, os.path.join(HERE, s))
    shutil.rmtree(w)
    if dry:
        print('dry run, urls:', len(urls)); return
    new = [u.replace('https://tlnt.ae/', '').rstrip('/') for u in urls]
    sh('git', 'add', '-u')
    sh('git', 'add', '--', '_src/it-roles', *[p for p in new if os.path.isdir(os.path.join(ROOT, p))])
    sh('git', 'commit', '-q', '-m', f'Role pages {name}: {len(roles)} roles (RU+EN), guides, hubs, sitemap, backlinks')
    for i in range(3):
        try:
            sh('git', 'push', '-q'); break
        except subprocess.CalledProcessError:
            sh('git', 'pull', '--rebase', '-q')
    else:
        raise SystemExit('push не прошёл')
    deadline = time.time() + 20 * 60
    while time.time() < deadline:
        bad = [u for u in urls if live(u) != 200]
        if not bad:
            break
        time.sleep(60)
    else:
        raise SystemExit(f'на живом сайте не открываются {len(bad)} URL, например {bad[:3]}')
    with open(os.path.join(HERE, 'published.log'), 'a', encoding='utf-8') as f:
        f.write(f'{datetime.datetime.now():%Y-%m-%d %H:%M} {name} roles={len(roles)} urls={len(urls)} live=200\n')
    print(f'OK {name}: {len(urls)} URL живые')


if __name__ == '__main__':
    main(dry='--dry' in sys.argv)
