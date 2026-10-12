# AlphaVerse fork migration — change log and outstanding work

## Baseline and legal scope

- Source: [androoAGI/starnet](https://github.com/androoAGI/starnet), stable tag **v0.13.2**.
- Original upstream commit: `54899e5ff3f2b002b457757916b3977818db6fc1`.
- The upstream source code is MIT-licensed; **the StarNet name, logo, artwork and sprites are not granted under that license**. Retain [LICENSE](LICENSE), [NOTICE.md](NOTICE.md) and third-party notices.
- This branch contains an **incomplete development rebrand**, not an independent release.

## Completed in this branch

1. Independent npm metadata and lockfile name (`alphaverse-harness`), CLI alias (`alphaverse`), Cargo package name (`alphaverse-desktop`), Tauri display name, publisher label and bundle id (`io.github.artfied.alphaverse`).
2. New README, INSTALL and SECURITY guidance. Removed source repo's release/update publishing/mirroring workflows.
3. Disconnected the inherited Tauri updater endpoint and disabled its UI until AlphaVerse has its own signed releases. Prevented the remaining desktop workflow from publishing upstream or using the original Windows publisher's Azure signing identity.
4. Isolated Rust desktop keychain and data root from the upstream app; narrowed the erase guard so it will not delete upstream user data. Rebranded NSIS hooks and executable name.
5. Added `scripts/alphaverse-start.cjs`: npm `start`, `app`, and `sidecar` explicitly use `alphaverse-workspaces/`, even though the inherited Node runtime still uses technical `STARNET_*` environment variables internally.
6. Updated initial HTML, onboarding, diagnostics, primary UI and numerous agent/workflow interface labels, including the generated website application preview.
7. Public website installer calls to action now state that only source code is available. There are no official AlphaVerse binaries.
8. Preserved existing build tooling, automation tests, model providers and persisted save schema keys unless a change was necessary for isolation.

## Technical identifiers deliberately not renamed

The inherited runtime uses `starnet.*` storage keys, `starnet.save` documents, `STARNET_*` variables, `starnet_* ` native IPC functions, an `x-starnet-token` local header, and `starnet` as a managed provider identifier. Changing these without a coordinated compatibility migration can corrupt workspaces, break tests, or silently remove connectivity.

The old Rust `is_starnet_owned` function name remains internal although its guard now allows only the AlphaVerse bundle ID. Some low-level source filenames and comments also retain upstream naming for provenance.

**Caution:** directly launching `node sidecar/index.js` bypasses the new AlphaVerse start wrapper, so some historical workspace defaults in the inherited large sidecar are still present. Use `npm start` until these are fully audited and isolated.

## Explicitly excluded from rebranding

- StarNet Managed, StarNet Credits and related subscription/account/payment flows refer to an upstream hosted service. They must not be renamed to suggest that AlphaVerse operates that service. Prefer BYOK (bring your own key) or Ollama while this integration is isolated.
- Upstream attribution, original source URLs in legal notices, Git history, saved artifact evidence and third-party copyright names.
- All binary icons, logos, sprites, illustrations and other image assets: **pending separate visual replacement/licensing**. Do not distribute an independently branded installer with these placeholders.

## Housekeeping review — why most large files remain

The inherited tree has approximately **50,404 Git tree entries**, dominated by visual assets. The following are **not safe to blindly delete** without verifying references:

| Directory | Approximate contents | Action |
|---|---|---|
| `frontend/assets/` | ~15,315 files / ~1.3 GB, many live station assets | Retained — runtime dependency likely |
| `website/app/` | ~15,689 files / ~1.3 GB, synced from frontend for a website preview | Retained — `npm run sync:website` / sync test require it |
| `output/agent-animation-study/` | ~10,076 files / ~119 MB, experimental image study | Candidate for later archival/removal, not automatically deleted |
| `docs/station-remaster/` | ~1,433 files / ~521 MB, visual development evidence | Candidate for later archival/removal after reference audit |
| `test/`, `qa/` | Verification and evidence | Retained for reproducibility |
| `LICENSE`, `NOTICE.md` | Licensing / attribution | Required; retained |

Five obsolete/upstream release-oriented GitHub workflows have been removed. The seven fast-gate tests exclusively asserting those removed release workflows/upgrade publishing were commented out of `test/fast.list` rather than silently deleted; they remain as historical source. The new AlphaVerse-specific isolation gate replaces the security assertions about upstream publishing. The remaining `desktop-build.yml` is development-only.

## Required validation before merge or distribution

- [ ] Enable GitHub Actions in the fork (if disabled) and ensure PR tests execute.
- [ ] `npm ci` and `npm run test:fast`.
- [ ] `npm run test:http`.
- [ ] `npm run sync:website` then `npm run sync:website -- --check` (and inspect generated drift).
- [ ] Rust: `cd src-tauri && cargo test`.
- [ ] Verify Windows/macOS `npm run desktop:dev`, data isolation, startup, erase, backup, restore, installer hooks and app identity.
- [ ] Search the full tree for remaining display strings and original hosted-service endpoints.
- [ ] Verify no AlphaVerse build contacts upstream billing, relay or update infrastructure unexpectedly.
- [ ] Replace all non-MIT upstream branding and visual assets or obtain express permission.
- [ ] Choose new independent version numbering, signing identity, release process and secure updater public key.
- [ ] Archive non-runtime animation studies and remove artifacts only after dependency/reference checks.

**Merge policy:** keep the pull request in draft until the new native bundle and both Node and Rust test suites have been validated.
