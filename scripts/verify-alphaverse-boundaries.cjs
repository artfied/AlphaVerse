#!/usr/bin/env node
'use strict';
// Identity and upstream-distribution isolation smoke gate.
// This is not a substitute for Rust integration tests or a real desktop install.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const pkg = JSON.parse(read('package.json'));
const tauri = JSON.parse(read('src-tauri/tauri.conf.json'));

assert.equal(pkg.name, 'alphaverse-harness');
assert.equal(pkg.bin.alphaverse, 'bin/alphaverse.js');
assert.equal(pkg.scripts.start, 'node scripts/alphaverse-start.cjs');
assert.equal(tauri.productName, 'AlphaVerse');
assert.equal(tauri.identifier, 'io.github.artfied.alphaverse');
assert.equal(tauri.bundle.createUpdaterArtifacts, false);
assert.deepEqual(tauri.plugins.updater.endpoints, []);
assert.equal(tauri.bundle.publisher, 'AlphaVerse Contributors');

const launcher = read('scripts/alphaverse-start.cjs');
assert.match(launcher, /ALPHAVERSE_WORKSPACES/);
assert.match(launcher, /STARNET_WORKSPACES/); // required legacy backend protocol
assert.match(launcher, /alphaverse-workspaces/);
const hooks = read('src-tauri/installer/hooks.nsh');
assert.match(hooks, /AlphaVerseManualUpgradeInit/);
assert.match(hooks, /alphaverse-desktop/);
assert.doesNotMatch(hooks, /Uninstall\\StarNet|skynet-desktop/);
assert.match(read('src-tauri/src/credentials.rs'), /KEYCHAIN_SERVICE: &str = "io\.github\.artfied\.alphaverse"/);
assert.match(read('src-tauri/src/erase_all.rs'), /OWNED_NAMES: \[&str; 1\] = \["io\.github\.artfied\.alphaverse"\]/);

assert.match(read('frontend/index.html'), /<title>ALPHAVERSE<\/title>/);
assert.match(read('README.md'), /github\.com\/artfied\/AlphaVerse/);
assert.match(read('LICENSE'), /Andrew Sims/); // preserve original copyright

for (const filename of [
  '.github/workflows/release.yml',
  '.github/workflows/release-train.yml',
  '.github/workflows/sync-source-release.yml',
  '.github/workflows/g1-packaged-lifecycle.yml',
  '.github/workflows/t0-clean-install-proof.yml'
]) assert.equal(fs.existsSync(path.join(root, filename)), false, filename + ' must not ship in AlphaVerse');

const builder = read('.github/workflows/desktop-build.yml');
assert.doesNotMatch(builder, /gh release create|publish-test:|starnet-signing -c/);

for (const filename of [
  'scripts/alphaverse-start.cjs', 'bin/alphaverse.js',
  'frontend/app/app.js', 'frontend/app/stationui.js',
  'frontend/app/updates.js', 'frontend/app/bootguard.js',
  'frontend/app/diagnostics.js', 'frontend/app/cloudsave.js',
  'frontend/app/harness.js', 'frontend/app/friendlyerror.js'
]) {
  const checked = spawnSync(process.execPath, ['--check', path.join(root, filename)], { encoding: 'utf8' });
  if (checked.status !== 0) throw new Error('JavaScript syntax check failed for ' + filename + ': ' + checked.stderr);
}

console.log('AlphaVerse identity, isolation, publication and selected syntax smoke checks passed.');
