# CLAUDE.md

Статический сайт (GitHub Pages, домен из CNAME). Русская версия в корне, английская в `en/`, лендинги услуг по подпапкам (`solar/`, `crm/`, `calculator/` и т.д.). Сборки и тестов нет — правки вносятся прямо в HTML/CSS/JS.

## Code intelligence: codebase-memory-mcp

В проекте подключён MCP-сервер [codebase-memory-mcp](https://github.com/DeusData/codebase-memory-mcp) (см. `.mcp.json`) — граф знаний по кодовой базе.

Порядок работы:

1. Если проект ещё не проиндексирован — сначала `index_repository` с путём к корню репозитория.
2. Для исследования кода в первую очередь используй инструменты графа, а не перебор файлов:
   - `search_graph` — поиск функций/классов/файлов по имени или метке;
   - `trace_path` — цепочки вызовов и потоки данных;
   - `get_code_snippet` — точный исходник символа по qualified name;
   - `get_architecture` — обзор структуры проекта;
   - `search_code` — текстовый поиск с graph-аугментацией.
3. Grep/Glob/Read — для конфигов, текстов и точечного чтения перед правкой.

Если бинарник `codebase-memory-mcp` отсутствует в системе, установи его:

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

(в средах, где GitHub Releases недоступен, соберите из исходников: `git clone --depth 1 https://github.com/DeusData/codebase-memory-mcp && make -f Makefile.cbm cbm`, бинарник появится в `build/c/`, скопируйте его в `~/.local/bin/`).
