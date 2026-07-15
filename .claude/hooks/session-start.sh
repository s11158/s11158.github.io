#!/bin/bash
set -euo pipefail

# Устанавливает codebase-memory-mcp при старте удалённой сессии (Claude Code on the web),
# затем настраивает Claude Code и индексирует репозиторий.
# Идемпотентен: если бинарник уже установлен, установка пропускается.

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

BIN_DIR="$HOME/.local/bin"
BIN="$BIN_DIR/codebase-memory-mcp"
CBM_VERSION="v0.9.0"

if [ ! -x "$BIN" ]; then
  mkdir -p "$BIN_DIR"
  # 1) Официальный установщик (качает готовый бинарник с GitHub Releases)
  if ! curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash -s -- --skip-config; then
    # 2) Fallback: в удалённой среде прокси блокирует GitHub Releases (403),
    #    но git-клон доступен — собираем из исходников (~10 минут, один раз:
    #    состояние контейнера кэшируется после успешного хука)
    SRC="$(mktemp -d)"
    trap 'rm -rf "$SRC"' EXIT
    git clone --depth 1 --branch "$CBM_VERSION" \
      https://github.com/DeusData/codebase-memory-mcp "$SRC/cbm"
    make -C "$SRC/cbm" -f Makefile.cbm cbm -j"$(nproc)"
    cp "$SRC/cbm/build/c/codebase-memory-mcp" "$BIN"
    chmod 755 "$BIN"
  fi
fi

# Конфигурация Claude Code (user-level MCP, skill, хуки) и индексация проекта —
# сбои здесь не должны ронять старт сессии
"$BIN" install -y >/dev/null 2>&1 || true
"$BIN" cli index_repository --repo-path "${CLAUDE_PROJECT_DIR:-$PWD}" >/dev/null 2>&1 || true

exit 0
