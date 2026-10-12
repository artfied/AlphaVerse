# AlphaVerse — development setup

AlphaVerse is currently a **source-only development fork**. There are no official AlphaVerse installers or signed update feeds. Do not download upstream StarNet installers as substitutes.

## Requirements

- Git
- Node.js 18+ (prefer Node.js 22)
- For a native desktop shell: Rust, system build tools, and the [Tauri v2 platform prerequisites](https://v2.tauri.app/start/prerequisites/)

## Local browser setup

```bash
git clone https://github.com/artfied/AlphaVerse.git
cd AlphaVerse
npm ci
npm start
```

Open `http://localhost:8787`, then configure an API provider or Ollama. Limit agent permissions while testing.

## Desktop development

```bash
npm ci
npm run desktop:dev
```

A local build can be attempted with `npm run desktop:build`; signing, notarization, distribution and auto-update are **not configured** for AlphaVerse. Validate installers and all permission boundaries before sharing them.

## Data and compatibility

AlphaVerse uses a separate Tauri application identifier: `io.github.artfied.alphaverse`. The inherited runtime may still contain legacy save schema names, environment variables, or workspace migration paths from StarNet and its predecessor. These are **technical compatibility identifiers**, not new AlphaVerse branding. Do not point AlphaVerse at an existing upstream workspace until import and isolation behavior have been tested.

The upstream credit/subscription backend and remote-service integration have **not been transferred** to AlphaVerse. Prefer direct provider keys or a self-hosted model during this phase.

See [README.md](README.md) and the rebranding audit for the remaining work.
