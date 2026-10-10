const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectDir = path.resolve(__dirname, '..', '..');
const mode = process.argv[2];

function runGit(cmd) {
  try {
    return execSync('git ' + cmd, { cwd: projectDir, stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

function runNpm(cmd) {
  try {
    return execSync('npm ' + cmd, { cwd: projectDir, stdio: ['pipe', 'pipe', 'ignore'], encoding: 'utf8' }).trim();
  } catch (e) {
    return null;
  }
}

const gitRoot = runGit('rev-parse --show-toplevel');

// Calculate relative path from git root to this project's .githooks
let expectedHooksPath = '.githooks';
if (gitRoot) {
  const hooksAbs = path.join(projectDir, '.githooks');
  expectedHooksPath = path.relative(gitRoot, hooksAbs).replace(/\\/g, '/');
}

// 1. --hooks-only (silent, chained before dev, never fails)
if (mode === '--hooks-only') {
  if (gitRoot && fs.existsSync(path.join(projectDir, '.githooks'))) {
    const current = runGit('config --get core.hooksPath');
    if (!current) {
      runGit('config core.hooksPath "' + expectedHooksPath + '"');
    }
  }
  process.exit(0);
}

// 2. --verify (chained before build)
if (mode === '--verify') {
  let ok = true;
  const files = [
    '.githooks/pre-commit',
    '.githooks/pre-push',
    '.claude/hooks/guard_npm_install.py',
    'scripts/npm-guard/check_dependency_changes.py'
  ];
  for (const f of files) {
    if (!fs.existsSync(path.join(projectDir, f))) {
      console.log('npm-guard: MISSING ' + f);
      ok = false;
    }
  }
  const npmrc = path.join(projectDir, '.npmrc');
  const npmrcContent = fs.existsSync(npmrc) ? fs.readFileSync(npmrc, 'utf8') : '';
  const pnpmOnly = fs.existsSync(path.join(projectDir, 'pnpm-lock.yaml')) && !fs.existsSync(path.join(projectDir, 'package-lock.json'));
  for (const key of ['ignore-scripts', pnpmOnly ? 'minimum-release-age' : 'min-release-age']) {
    const regex = new RegExp('^\\s*' + key + '\\s*=', 'm');
    if (!regex.test(npmrcContent)) {
      console.log('npm-guard: .npmrc no longer sets ' + key);
      ok = false;
    }
  }
  if (!ok) {
    console.log('npm-guard: the supply-chain guard was removed or weakened; restore it before building.');
    process.exit(1);
  }
  process.exit(0);
}

// 3. --check (report current status)
if (mode === '--check') {
  let failed = false;
  const currentHooks = runGit('config --get core.hooksPath');
  
  if (currentHooks && (currentHooks === expectedHooksPath || (gitRoot && fs.existsSync(path.resolve(gitRoot, currentHooks))))) {
    console.log('ok:   git hooks enabled');
  } else {
    console.log('MISSING: git hooks (core.hooksPath)');
    failed = true;
  }

  const npmrcPath = path.join(projectDir, '.npmrc');
  const npmrcText = fs.existsSync(npmrcPath) ? fs.readFileSync(npmrcPath, 'utf8') : '';
  const localIgnoreScripts = /^\s*ignore-scripts\s*=\s*true/m.test(npmrcText);
  const globalIgnoreScripts = runNpm('config get ignore-scripts') === 'true';

  if (localIgnoreScripts || globalIgnoreScripts) {
    console.log('ok:   npm ignore-scripts=true');
  } else {
    console.log('MISSING: npm ignore-scripts=true');
    failed = true;
  }

  const pnpmOnly = fs.existsSync(path.join(projectDir, 'pnpm-lock.yaml')) && !fs.existsSync(path.join(projectDir, 'package-lock.json'));
  const pnpmAge = /^\s*minimum-release-age\s*=\s*(\d+)/m.exec(npmrcText);
  if (pnpmOnly) {
    if (pnpmAge && pnpmAge[1] !== '0') {
      console.log('ok:   pnpm minimum-release-age=' + pnpmAge[1] + ' minutes (from .npmrc)');
    } else {
      console.log('MISSING: pnpm minimum-release-age (needs pnpm 10.16+)');
      failed = true;
    }
    process.exit(failed ? 1 : 0);
  }

  const age = runNpm('config get min-release-age');
  const before = runNpm('config get before');
  const localAge = /^\s*min-release-age\s*=\s*(\d+)/m.exec(npmrcText);

  if (age && age !== 'null' && age !== 'undefined' && age !== '0') {
    console.log('ok:   npm min-release-age=' + age + ' days');
  } else if (localAge) {
    console.log('ok:   npm min-release-age=' + localAge[1] + ' days (from .npmrc)');
  } else if (before && before !== 'null' && before !== 'undefined') {
    console.log('ok:   npm min-release-age active (refuses versions newer than ' + before + ')');
  } else {
    console.log('MISSING: npm min-release-age (needs npm 11.10+)');
    failed = true;
  }

  process.exit(failed ? 1 : 0);
}

// 4. Default: setup
console.log('Setting up npm-guard...');
if (gitRoot && fs.existsSync(path.join(projectDir, '.githooks'))) {
  const currentHooks = runGit('config --get core.hooksPath');
  if (currentHooks && currentHooks !== expectedHooksPath) {
    console.log("core.hooksPath is already '" + currentHooks + "'; not overwriting.");
  } else {
    runGit('config core.hooksPath "' + expectedHooksPath + '"');
    console.log('enabled git hooks (' + expectedHooksPath + ') for this repo');
  }
}

try {
  execSync('npm config set ignore-scripts true --global', { stdio: 'inherit' });
  console.log('set global npm ignore-scripts=true');
} catch (e) {
  console.log('Failed to set global ignore-scripts');
}

try {
  execSync('npm config set min-release-age 7 --global', { stdio: 'inherit' });
  console.log('set global npm min-release-age=7 (days)');
} catch (e) {
  console.log('Failed to set global min-release-age');
}

console.log("note: packages that need a build step (esbuild, sharp...) need 'npm rebuild <pkg>'");
