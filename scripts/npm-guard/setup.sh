#!/bin/sh
# Enable the repo's git hooks and safe npm defaults.
#   scripts/npm-guard/setup.sh              apply (git hooks + global npm settings)
#   scripts/npm-guard/setup.sh --check      report only (exit 1 if not configured)
#   scripts/npm-guard/setup.sh --hooks-only enable git hooks only; silent, never fails (chained before `dev`)
#   scripts/npm-guard/setup.sh --verify     repo files only, no git/npm needed; exit 1 if the guard was removed (chained before `build`)

if [ "$1" = "--hooks-only" ]; then
  root=$(git rev-parse --show-toplevel 2>/dev/null) || exit 0   # no git (CI tarball, Docker): nothing to do
  current=$(git -C "$root" config --get core.hooksPath)
  [ -z "$current" ] && [ -d "$root/.githooks" ] && git -C "$root" config core.hooksPath .githooks
  exit 0
fi

if [ "$1" = "--verify" ]; then
  root=$(cd "$(dirname "$0")/../.." && pwd)
  ok=0
  for f in .githooks/pre-commit .githooks/pre-push .claude/hooks/guard_npm_install.py scripts/npm-guard/check_dependency_changes.py; do
    [ -f "$root/$f" ] || { echo "npm-guard: MISSING $f"; ok=1; }
  done
  agekey=min-release-age
  [ -f "$root/pnpm-lock.yaml" ] && [ ! -f "$root/package-lock.json" ] && agekey=minimum-release-age   # pnpm-only project
  for key in ignore-scripts $agekey; do
    grep -q "^[[:space:]]*$key[[:space:]]*=" "$root/.npmrc" 2>/dev/null || { echo "npm-guard: .npmrc no longer sets $key"; ok=1; }
  done
  [ $ok -eq 0 ] || echo "npm-guard: the supply-chain guard was removed or weakened; restore it before building."
  exit $ok
fi

root=$(git rev-parse --show-toplevel) || exit 1
cd "$root" || exit 1
ok=0

hooks=$(git config --get core.hooksPath)
scripts=$(npm config get ignore-scripts 2>/dev/null)
age=$(npm config get min-release-age 2>/dev/null)
before=$(npm config get before 2>/dev/null)   # npm 11.10+ converts min-release-age into this and reads the original back as null

if [ "$1" = "--check" ]; then
  if [ -f "$root/pnpm-lock.yaml" ] && [ ! -f "$root/package-lock.json" ]; then   # pnpm-only project
    [ "$hooks" = ".githooks" ] && echo "ok:   git hooks enabled" || { echo "MISSING: git hooks (core.hooksPath)"; ok=1; }
    grep -q "^[[:space:]]*ignore-scripts[[:space:]]*=[[:space:]]*true" "$root/.npmrc" 2>/dev/null && echo "ok:   ignore-scripts=true" || { echo "MISSING: ignore-scripts=true"; ok=1; }
    grep -Eq "^[[:space:]]*minimum-release-age[[:space:]]*=[[:space:]]*[1-9]" "$root/.npmrc" 2>/dev/null && echo "ok:   pnpm minimum-release-age (from .npmrc)" || { echo "MISSING: pnpm minimum-release-age (needs pnpm 10.16+)"; ok=1; }
    exit $ok
  fi
  [ "$hooks" = ".githooks" ] && echo "ok:   git hooks enabled" || { echo "MISSING: git hooks (core.hooksPath)"; ok=1; }
  [ "$scripts" = "true" ] && echo "ok:   npm ignore-scripts=true" || { echo "MISSING: npm ignore-scripts=true"; ok=1; }
  case "$age" in
    ''|null|0)
      case "$before" in ''|null|undefined) echo "MISSING: npm min-release-age (needs npm 11.10+)"; ok=1;; *) echo "ok:   npm min-release-age active (refuses versions newer than $before)";; esac;;
    *) echo "ok:   npm min-release-age=$age days";;
  esac
  exit $ok
fi

if [ -n "$hooks" ] && [ "$hooks" != ".githooks" ]; then
  echo "core.hooksPath is already '$hooks'; not overwriting. Call .githooks/pre-commit and .githooks/pre-push from your hooks."
else
  git config core.hooksPath .githooks && echo "enabled git hooks (.githooks) for this repo"
fi
if command -v npm >/dev/null 2>&1; then
  npm config set ignore-scripts true --global && echo "set global npm ignore-scripts=true"
  npm config set min-release-age 7 --global && echo "set global npm min-release-age=7 (days): npm never installs versions newer than that"
  echo "note: packages that need a build step (esbuild, sharp...) need 'npm rebuild <pkg>'"
else
  echo "npm not found: skipped global npm settings"
fi
