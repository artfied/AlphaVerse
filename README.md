# AlphaVerse

**AlphaVerse** is a local-first, multi-agent AI orchestration platform for coordinating autonomous agents, tools, projects, and workflows.

> **Development fork — not an official StarNet distribution.** AlphaVerse started from the publicly available MIT-licensed source code of [StarNet](https://github.com/androoAGI/starnet), upstream tag `v0.13.2` (commit `54899e5ff3f2b002b457757916b3977818db6fc1`). This fork is independently maintained and is not affiliated with, endorsed by, or supported by the upstream author.

## Status

This repository is being rebranded and separated from the upstream product. The **software code** remains MIT-licensed, but the upstream author retains the rights to their *StarNet* name, logo, sprites, station artwork, and other branding. Some **upstream visual assets are still present as temporary development placeholders** and must be replaced or independently licensed before redistributing a branded app. Do not assume those assets are covered by the MIT code license.

**No official AlphaVerse binary release or auto-updater is published.** The upstream release automation has been removed/disabled and the upstream updater endpoint has been detached. Never install a StarNet installer and present it as AlphaVerse. The inherited hosted billing and remote services are not AlphaVerse services; do not configure them as such. Begin with your own model-provider key or local Ollama.

## Run from source

Prerequisites: Git and Node.js 18 or newer (Node.js 22 is used by the upstream CI). Rust and the [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/) are needed only for the desktop shell.

```bash
git clone https://github.com/artfied/AlphaVerse.git
cd AlphaVerse
npm ci
npm start
```

Open [http://localhost:8787](http://localhost:8787) and configure an API provider or a local Ollama instance.

### Desktop development

```bash
npm ci
npm run desktop:dev
```

To build a local desktop package:

```bash
npm run desktop:build
```

The desktop build has **not yet been verified on Windows/macOS for AlphaVerse**. Read [INSTALL.md](INSTALL.md) and review the open rebranding tasks before distributing binaries.

### Tests

```bash
npm run test:fast
npm run test:http
npm test
```

The original project has extensive tests, but successful upstream CI does not automatically validate changes made in this fork.

## Architecture

- `frontend/` — station UI and client-side interface.
- `sidecar/` — local Node.js agent runtime and APIs.
- `shared/` — shared contracts.
- `src-tauri/` — native desktop shell (Rust/Tauri).
- `test/` and `qa/` — automated verification and evidence.
- `website/` — independent website and a generated application preview.

## Attribution and licensing

The source is based on **StarNet**, copyright © 2026 Andrew Sims and other relevant contributors, licensed under the MIT License. See [LICENSE](LICENSE) and [NOTICE.md](NOTICE.md) for original notices and third-party obligations. *AlphaVerse* is a separate fork. Do not remove upstream copyright notices or third-party attributions.

**Security note:** AI agents can run commands, access files and connect to external services when you grant permissions. Start with least privilege, review tool permissions, and avoid using sensitive directories during development. Report security problems privately rather than posting secrets in public issues.

For project-specific bugs and development, use [AlphaVerse Issues](https://github.com/artfied/AlphaVerse/issues).
